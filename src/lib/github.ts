/**
 * Minimal GitHub client used by the admin page.
 * Publishing = one commit to the repo with the changed JSON and images.
 * A GitHub Action then rebuilds and deploys the site.
 */
export interface GitHubConfig {
  owner: string;
  repo: string;
  branch: string;
  token: string;
}

export interface FileChange {
  path: string;
  /** base64 content; null deletes the file */
  base64: string | null;
}

const API = "https://api.github.com";

export const utf8ToBase64 = (text: string) => {
  const bytes = new TextEncoder().encode(text);
  let bin = "";
  bytes.forEach((b) => (bin += String.fromCharCode(b)));
  return btoa(bin);
};

export class GitHubError extends Error {
  status: number;
  constructor(message: string, status: number) {
    super(message);
    this.status = status;
  }
}

const request = async <T>(cfg: GitHubConfig, path: string, init: RequestInit = {}, raw = false): Promise<T> => {
  const res = await fetch(`${API}${path}`, {
    ...init,
    headers: {
      Accept: raw ? "application/vnd.github.raw+json" : "application/vnd.github+json",
      Authorization: `Bearer ${cfg.token}`,
      "X-GitHub-Api-Version": "2022-11-28",
      ...(init.body ? { "Content-Type": "application/json" } : {}),
    },
    cache: "no-store",
  });
  if (!res.ok) {
    let msg = res.statusText;
    try {
      msg = (await res.json()).message || msg;
    } catch {
      /* keep status text */
    }
    const hint =
      res.status === 401 ? "The token is wrong or expired." :
      res.status === 403 ? "The token doesn't have permission. It needs Contents: Read and write on this repository." :
      res.status === 404 ? "Repository, branch or file not found. Check owner, repo and branch, and that the token can access this repo." :
      res.status === 409 || res.status === 422 ? "The branch changed while publishing. Reload projects and try again." : "";
    throw new GitHubError(`${msg}${hint ? ` — ${hint}` : ""}`, res.status);
  }
  return (raw ? res.text() : res.json()) as Promise<T>;
};

const repoPath = (cfg: GitHubConfig) => `/repos/${cfg.owner}/${cfg.repo}`;

export const verifyAccess = async (cfg: GitHubConfig) => {
  const repo = await request<{ full_name: string; permissions?: { push?: boolean } }>(cfg, repoPath(cfg));
  await request(cfg, `${repoPath(cfg)}/branches/${encodeURIComponent(cfg.branch)}`);
  if (repo.permissions && !repo.permissions.push) {
    throw new GitHubError("Connected, but this token can't write to the repository.", 403);
  }
  return repo.full_name;
};

export const readText = (cfg: GitHubConfig, path: string) =>
  request<string>(cfg, `${repoPath(cfg)}/contents/${path}?ref=${encodeURIComponent(cfg.branch)}`, {}, true);

export const listDir = async (cfg: GitHubConfig, path: string) => {
  const items = await request<{ name: string; path: string; type: string }[]>(
    cfg,
    `${repoPath(cfg)}/contents/${path}?ref=${encodeURIComponent(cfg.branch)}`,
  );
  return items.filter((i) => i.type === "file");
};

/** Commit several files at once (Git Data API), so one publish = one commit = one deploy. */
export const commitFiles = async (cfg: GitHubConfig, changes: FileChange[], message: string) => {
  const base = repoPath(cfg);
  const ref = await request<{ object: { sha: string } }>(cfg, `${base}/git/ref/heads/${encodeURIComponent(cfg.branch)}`);
  const parentSha = ref.object.sha;
  const parent = await request<{ tree: { sha: string } }>(cfg, `${base}/git/commits/${parentSha}`);

  const tree = [];
  for (const c of changes) {
    if (c.base64 === null) {
      tree.push({ path: c.path, mode: "100644", type: "blob", sha: null });
      continue;
    }
    const blob = await request<{ sha: string }>(cfg, `${base}/git/blobs`, {
      method: "POST",
      body: JSON.stringify({ content: c.base64, encoding: "base64" }),
    });
    tree.push({ path: c.path, mode: "100644", type: "blob", sha: blob.sha });
  }

  const newTree = await request<{ sha: string }>(cfg, `${base}/git/trees`, {
    method: "POST",
    body: JSON.stringify({ base_tree: parent.tree.sha, tree }),
  });
  const commit = await request<{ sha: string; html_url: string }>(cfg, `${base}/git/commits`, {
    method: "POST",
    body: JSON.stringify({ message, tree: newTree.sha, parents: [parentSha] }),
  });
  await request(cfg, `${base}/git/refs/heads/${encodeURIComponent(cfg.branch)}`, {
    method: "PATCH",
    body: JSON.stringify({ sha: commit.sha }),
  });
  return commit;
};
