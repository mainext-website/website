import { useCallback, useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  AlertTriangle, CheckCircle2, Download, ExternalLink, Eye, FileJson, Github, Loader2, LogOut, Pencil, Plus, RefreshCw, Rocket, Settings, Trash2,
} from "lucide-react";
import {
  allProjects, CATEGORY_LABELS, EMPTY_PROJECT, normalizeProject, site as bundledSite, sortProjects, type Project, type SiteSettings,
} from "@/lib/content";
import { commitFiles, listDir, readText, utf8ToBase64, verifyAccess, type FileChange, type GitHubConfig } from "@/lib/github";
import ProjectCard from "@/components/site/ProjectCard";
import { CaseStudyBody } from "@/pages/CaseStudy";
import ProjectEditor, { type PendingUploads } from "./ProjectEditor";
import SettingsEditor from "./SettingsEditor";
import { inputCls } from "./fields";
import { cn } from "@/lib/utils";

const CFG_KEY = "mainext-admin-github";
const DEFAULT_CFG: GitHubConfig = { owner: "mainext-website", repo: "website", branch: "main", token: "" };
const PROJECTS_DIR = "src/content/projects";
const SITE_FILE = "src/content/site.json";

const loadCfg = (): GitHubConfig => {
  for (const store of [localStorage, sessionStorage]) {
    try {
      const raw = store.getItem(CFG_KEY);
      if (raw) return { ...DEFAULT_CFG, ...JSON.parse(raw) };
    } catch {
      /* storage blocked */
    }
  }
  return DEFAULT_CFG;
};

const saveCfg = (cfg: GitHubConfig, remember: boolean) => {
  try {
    localStorage.removeItem(CFG_KEY);
    sessionStorage.removeItem(CFG_KEY);
    (remember ? localStorage : sessionStorage).setItem(CFG_KEY, JSON.stringify(cfg));
  } catch {
    /* storage blocked: stays in memory for this tab */
  }
};

const projectJson = (p: Project) => JSON.stringify(normalizeProject(p), null, 2) + "\n";

const downloadFile = (name: string, text: string) => {
  const url = URL.createObjectURL(new Blob([text], { type: "application/json" }));
  const a = document.createElement("a");
  a.href = url;
  a.download = name;
  a.click();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
};

type Selection = { kind: "project"; slug: string | null } | { kind: "settings" };
type Notice = { type: "ok" | "error" | "info"; text: string; link?: string } | null;

const Admin = () => {
  const [cfg, setCfg] = useState<GitHubConfig>(loadCfg);
  const [remember, setRemember] = useState(true);
  const [connected, setConnected] = useState(false);
  const [connecting, setConnecting] = useState(false);
  const [showConnect, setShowConnect] = useState(false);

  const [list, setList] = useState<Project[]>(allProjects);
  const [siteSettings, setSiteSettings] = useState<SiteSettings>(bundledSite);
  const [source, setSource] = useState<"bundled" | "github">("bundled");
  const [loading, setLoading] = useState(false);

  const [sel, setSel] = useState<Selection>({ kind: "project", slug: allProjects[0]?.slug ?? null });
  const [draft, setDraft] = useState<Project>(allProjects[0] ?? { ...EMPTY_PROJECT });
  const [settingsDraft, setSettingsDraft] = useState<SiteSettings>(bundledSite);
  const [isNew, setIsNew] = useState(false);
  const [dirty, setDirty] = useState(false);
  const [pending, setPending] = useState<PendingUploads>({});
  const [tab, setTab] = useState<"edit" | "preview">("edit");
  const [busy, setBusy] = useState(false);
  const [notice, setNotice] = useState<Notice>(null);
  const [confirmDelete, setConfirmDelete] = useState(false);

  useEffect(() => {
    document.title = "Admin · Mainext";
    const meta = document.createElement("meta");
    meta.name = "robots";
    meta.content = "noindex, nofollow";
    document.head.appendChild(meta);
    return () => meta.remove();
  }, []);

  useEffect(() => {
    const warn = (e: BeforeUnloadEvent) => {
      if (dirty) e.preventDefault();
    };
    window.addEventListener("beforeunload", warn);
    return () => window.removeEventListener("beforeunload", warn);
  }, [dirty]);

  const loadFromGitHub = useCallback(async (c: GitHubConfig) => {
    setLoading(true);
    try {
      const files = (await listDir(c, PROJECTS_DIR)).filter((f) => f.name.endsWith(".json"));
      const loaded = await Promise.all(files.map(async (f) => normalizeProject(JSON.parse(await readText(c, f.path)))));
      const s = JSON.parse(await readText(c, SITE_FILE)) as SiteSettings;
      setList(sortProjects(loaded));
      setSiteSettings(s);
      setSettingsDraft(s);
      setSource("github");
      return sortProjects(loaded);
    } finally {
      setLoading(false);
    }
  }, []);

  const connect = async (c: GitHubConfig) => {
    setConnecting(true);
    setNotice(null);
    try {
      const name = await verifyAccess(c);
      saveCfg(c, remember);
      setConnected(true);
      setShowConnect(false);
      const loaded = await loadFromGitHub(c);
      if (!dirty) selectProject(loaded[0]?.slug ?? null, loaded);
      setNotice({ type: "ok", text: `Connected to ${name} (${c.branch}). Showing the latest saved content.` });
    } catch (e) {
      setConnected(false);
      setNotice({ type: "error", text: e instanceof Error ? e.message : "Couldn't connect." });
    } finally {
      setConnecting(false);
    }
  };

  useEffect(() => {
    if (cfg.token) connect(cfg);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const disconnect = () => {
    try {
      localStorage.removeItem(CFG_KEY);
      sessionStorage.removeItem(CFG_KEY);
    } catch {
      /* ignore */
    }
    setCfg({ ...cfg, token: "" });
    setConnected(false);
    setSource("bundled");
    setList(allProjects);
    setNotice({ type: "info", text: "Disconnected. The token was removed from this browser." });
  };

  const okToLeave = () => !dirty || window.confirm("You have unsaved changes. Discard them?");

  function selectProject(slug: string | null, from = list) {
    const p = from.find((x) => x.slug === slug);
    setSel({ kind: "project", slug });
    setDraft(p ? structuredClone(p) : { ...EMPTY_PROJECT });
    setIsNew(false);
    setDirty(false);
    setConfirmDelete(false);
    setTab("edit");
  }

  const newProject = () => {
    if (!okToLeave()) return;
    const maxOrder = list.reduce((m, p) => Math.max(m, p.order), 0);
    setSel({ kind: "project", slug: null });
    setDraft({ ...EMPTY_PROJECT, order: maxOrder + 1 });
    setIsNew(true);
    setDirty(false);
    setTab("edit");
    setNotice(null);
  };

  const editDraft = (p: Project) => {
    setDraft(p);
    setDirty(true);
  };

  const previewProject = useMemo<Project>(() => {
    const map = (src: string) => pending[src]?.previewUrl ?? src;
    return normalizeProject({ ...draft, cover: map(draft.cover), gallery: draft.gallery.map((g) => ({ ...g, src: map(g.src) })) });
  }, [draft, pending]);

  const takenSlugs = list.map((p) => p.slug);

  const validate = (): string | null => {
    if (!draft.title.trim()) return "Add a project title.";
    if (!draft.slug) return "Add a page address.";
    if (isNew && takenSlugs.includes(draft.slug)) return "Another project already uses this page address. Change the title or address.";
    if (!draft.summary.trim()) return "Add a one-line summary.";
    return null;
  };

  const publishProject = async () => {
    const err = validate();
    if (err) return setNotice({ type: "error", text: err });
    setBusy(true);
    setNotice(null);
    try {
      const clean = normalizeProject(draft);
      const used = new Set([clean.cover, ...clean.gallery.map((g) => g.src)].filter(Boolean));
      const changes: FileChange[] = [{ path: `${PROJECTS_DIR}/${clean.slug}.json`, base64: utf8ToBase64(projectJson(clean)) }];
      Object.entries(pending).forEach(([path, data]) => {
        if (used.has(path) && !data.committed) changes.push({ path: `public${path}`, base64: data.base64 });
      });
      const commit = await commitFiles(cfg, changes, `${isNew ? "Add" : "Update"} project: ${clean.title}`);
      const nextList = sortProjects([...list.filter((p) => p.slug !== clean.slug), clean]);
      setList(nextList);
      setPending((p) => Object.fromEntries(Object.entries(p).map(([k, v]) => [k, used.has(k) ? { ...v, committed: true } : v])));
      setSel({ kind: "project", slug: clean.slug });
      setDraft(clean);
      setIsNew(false);
      setDirty(false);
      setNotice({
        type: "ok",
        text: `Published "${clean.title}". The live site updates in about 2–3 minutes, once the build finishes.`,
        link: `https://github.com/${cfg.owner}/${cfg.repo}/actions`,
      });
      void commit;
    } catch (e) {
      setNotice({ type: "error", text: e instanceof Error ? e.message : "Publishing failed." });
    } finally {
      setBusy(false);
    }
  };

  const deleteProject = async () => {
    if (isNew) {
      selectProject(list[0]?.slug ?? null);
      return;
    }
    setBusy(true);
    try {
      const changes: FileChange[] = [{ path: `${PROJECTS_DIR}/${draft.slug}.json`, base64: null }];
      try {
        const imgs = await listDir(cfg, `public/uploads/projects/${draft.slug}`);
        imgs.forEach((f) => changes.push({ path: f.path, base64: null }));
      } catch {
        /* no image folder */
      }
      await commitFiles(cfg, changes, `Remove project: ${draft.title}`);
      const nextList = list.filter((p) => p.slug !== draft.slug);
      setList(nextList);
      setNotice({ type: "ok", text: `Removed "${draft.title}". The live site updates in a few minutes.` });
      setDirty(false);
      selectProject(nextList[0]?.slug ?? null, nextList);
    } catch (e) {
      setNotice({ type: "error", text: e instanceof Error ? e.message : "Delete failed." });
    } finally {
      setBusy(false);
      setConfirmDelete(false);
    }
  };

  const publishSettings = async () => {
    setBusy(true);
    setNotice(null);
    try {
      await commitFiles(cfg, [{ path: SITE_FILE, base64: utf8ToBase64(JSON.stringify(settingsDraft, null, 2) + "\n") }], "Update site settings");
      setSiteSettings(settingsDraft);
      setDirty(false);
      setNotice({ type: "ok", text: "Settings published. The live site updates in about 2–3 minutes.", link: `https://github.com/${cfg.owner}/${cfg.repo}/actions` });
    } catch (e) {
      setNotice({ type: "error", text: e instanceof Error ? e.message : "Publishing failed." });
    } finally {
      setBusy(false);
    }
  };

  const onSettingsPage = sel.kind === "settings";

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="sticky top-0 z-30 border-b border-border bg-background/90 backdrop-blur">
        <div className="mx-auto flex h-14 max-w-[1400px] items-center justify-between gap-3 px-4">
          <div className="flex items-center gap-3">
            <Link to="/" className="font-display text-lg font-extrabold">mainext<span className="text-primary">.</span></Link>
            <span className="rounded-md bg-secondary px-2 py-0.5 font-mono text-[0.7rem]">admin</span>
          </div>
          <div className="flex items-center gap-2">
            {connected ? (
              <>
                <span className="hidden items-center gap-2 font-mono text-xs text-muted-foreground sm:flex">
                  <span className="h-2 w-2 rounded-full bg-green-400" /> {cfg.owner}/{cfg.repo} · {cfg.branch}
                </span>
                <button type="button" onClick={() => okToLeave() && loadFromGitHub(cfg).then((l) => selectProject(sel.kind === "project" ? sel.slug : null, l))} className="grid h-9 w-9 place-items-center rounded-lg hover:bg-secondary" aria-label="Reload from GitHub">
                  <RefreshCw className={cn("h-4 w-4", loading && "animate-spin")} />
                </button>
                <button type="button" onClick={disconnect} className="grid h-9 w-9 place-items-center rounded-lg hover:bg-secondary" aria-label="Disconnect GitHub">
                  <LogOut className="h-4 w-4" />
                </button>
              </>
            ) : (
              <button type="button" onClick={() => setShowConnect((v) => !v)} className="btn-primary !px-3 !py-2">
                <Github className="h-4 w-4" /> Connect GitHub
              </button>
            )}
          </div>
        </div>
      </header>

      {(showConnect || !connected) && (
        <div className="border-b border-border bg-card">
          <form
            className="mx-auto grid max-w-[1400px] gap-4 px-4 py-5 lg:grid-cols-[1.2fr_1fr]"
            onSubmit={(e) => {
              e.preventDefault();
              connect(cfg);
            }}
          >
            <div className="space-y-2 text-sm">
              <h2 className="font-display text-lg font-bold">Connect to publish</h2>
              <p className="text-muted-foreground">
                Publishing saves your changes to the website's GitHub repository. The site then rebuilds itself in 2–3 minutes. You can
                still edit and preview without connecting.
              </p>
              <ol className="list-decimal space-y-1 pl-5 text-muted-foreground">
                <li>
                  Open{" "}
                  <a className="text-primary underline" href="https://github.com/settings/personal-access-tokens/new" target="_blank" rel="noreferrer">
                    GitHub → Fine-grained token
                  </a>
                  .
                </li>
                <li>Repository access: only <b className="text-foreground">{cfg.owner}/{cfg.repo}</b>.</li>
                <li>Permissions → Contents: <b className="text-foreground">Read and write</b>. Expiry: 90 days or more.</li>
                <li>Copy the token and paste it here. It stays only in this browser.</li>
                <li className="list-none pt-1 text-xs">
                  If the organization blocks fine-grained tokens, a classic token with the <b className="text-foreground">repo</b> scope also works.
                </li>
              </ol>
            </div>
            <div className="grid gap-3 sm:grid-cols-3">
              <input aria-label="Owner" className={inputCls} value={cfg.owner} onChange={(e) => setCfg({ ...cfg, owner: e.target.value.trim() })} />
              <input aria-label="Repository" className={inputCls} value={cfg.repo} onChange={(e) => setCfg({ ...cfg, repo: e.target.value.trim() })} />
              <input aria-label="Branch" className={inputCls} value={cfg.branch} onChange={(e) => setCfg({ ...cfg, branch: e.target.value.trim() })} />
              <input aria-label="GitHub token" type="password" placeholder="github_pat_…" className={cn(inputCls, "sm:col-span-3")} value={cfg.token} onChange={(e) => setCfg({ ...cfg, token: e.target.value.trim() })} autoComplete="off" />
              <label className="flex items-center gap-2 text-sm sm:col-span-2">
                <input type="checkbox" checked={remember} onChange={(e) => setRemember(e.target.checked)} /> Remember on this device
              </label>
              <button type="submit" disabled={!cfg.token || connecting} className="btn-primary !py-2.5 disabled:opacity-50">
                {connecting ? <Loader2 className="h-4 w-4 animate-spin" /> : <Github className="h-4 w-4" />} Connect
              </button>
            </div>
          </form>
        </div>
      )}

      {notice && (
        <div className={cn("border-b px-4 py-3 text-sm", notice.type === "error" ? "border-destructive/30 bg-destructive/10 text-destructive" : notice.type === "ok" ? "border-accent/30 bg-accent/10" : "border-border bg-secondary")}>
          <div className="mx-auto flex max-w-[1400px] items-start gap-2">
            {notice.type === "error" ? <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0" /> : <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-accent" />}
            <span className="flex-1">
              {notice.text}{" "}
              {notice.link && <a href={notice.link} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 underline">Watch the build <ExternalLink className="h-3 w-3" /></a>}
            </span>
            <button type="button" onClick={() => setNotice(null)} className="text-xs opacity-70 hover:opacity-100">Dismiss</button>
          </div>
        </div>
      )}

      <div className="mx-auto grid max-w-[1400px] gap-6 px-4 py-6 lg:grid-cols-[280px_1fr]">
        <aside className="space-y-3 lg:sticky lg:top-20 lg:self-start">
          <button type="button" onClick={newProject} className="btn-primary w-full">
            <Plus className="h-4 w-4" /> New project
          </button>
          <p className="px-1 font-mono text-[0.68rem] uppercase tracking-[0.12em] text-muted-foreground">
            Projects · {list.length} {source === "bundled" && "· from this build"}
          </p>
          <nav className="max-h-[50vh] space-y-1 overflow-y-auto pr-1 lg:max-h-[60vh]">
            {isNew && <div className="rounded-lg border border-primary bg-primary/10 px-3 py-2 text-sm font-semibold">{draft.title || "New project"}</div>}
            {list.map((p) => (
              <button
                key={p.slug}
                type="button"
                onClick={() => okToLeave() && selectProject(p.slug)}
                className={cn(
                  "flex w-full items-center justify-between gap-2 rounded-lg px-3 py-2 text-left text-sm transition-colors",
                  sel.kind === "project" && sel.slug === p.slug && !isNew ? "bg-secondary font-semibold" : "hover:bg-secondary/60",
                )}
              >
                <span className="min-w-0">
                  <span className="block truncate">{p.title}</span>
                  <span className="block truncate font-mono text-[0.65rem] text-muted-foreground">{CATEGORY_LABELS[p.category]}</span>
                </span>
                {!p.published ? <span className="rounded bg-muted px-1.5 py-0.5 text-[0.6rem]">draft</span> : !p.featured ? <span className="rounded bg-muted px-1.5 py-0.5 text-[0.6rem]">work page</span> : null}
              </button>
            ))}
          </nav>
          <button
            type="button"
            onClick={() => {
              if (!okToLeave()) return;
              setSel({ kind: "settings" });
              setSettingsDraft(siteSettings);
              setIsNew(false);
              setDirty(false);
            }}
            className={cn("flex w-full items-center gap-2 rounded-lg border border-border px-3 py-2.5 text-sm", onSettingsPage && "border-primary bg-primary/10 font-semibold")}
          >
            <Settings className="h-4 w-4" /> Site settings
          </button>
          <button type="button" onClick={() => downloadFile("project-template.json", projectJson({ ...EMPTY_PROJECT, slug: "my-new-project", title: "My new project" }))} className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm text-muted-foreground hover:text-foreground">
            <FileJson className="h-4 w-4" /> Download blank template
          </button>
        </aside>

        <main className="min-w-0 space-y-5 pb-28">
          {onSettingsPage ? (
            <>
              <h1 className="font-display text-2xl font-bold">Site settings</h1>
              <SettingsEditor value={settingsDraft} onChange={(v) => { setSettingsDraft(v); setDirty(true); }} />
            </>
          ) : sel.slug === null && !isNew ? (
            <p className="text-muted-foreground">No projects yet. Click "New project".</p>
          ) : (
            <>
              <div className="flex flex-wrap items-center justify-between gap-3">
                <h1 className="font-display text-2xl font-bold">{isNew ? "New project" : draft.title || "Untitled"}</h1>
                <div className="flex rounded-lg border border-border p-1">
                  {(["edit", "preview"] as const).map((t) => (
                    <button key={t} type="button" onClick={() => setTab(t)} className={cn("inline-flex items-center gap-1.5 rounded-md px-3 py-1.5 text-sm", tab === t && "bg-secondary font-semibold")}>
                      {t === "edit" ? <Pencil className="h-3.5 w-3.5" /> : <Eye className="h-3.5 w-3.5" />} {t === "edit" ? "Edit" : "Preview"}
                    </button>
                  ))}
                </div>
              </div>
              {tab === "edit" ? (
                <div className="grid gap-6 xl:grid-cols-[1fr_340px]">
                  <ProjectEditor
                    draft={draft}
                    setDraft={editDraft}
                    isNew={isNew}
                    takenSlugs={takenSlugs}
                    pending={pending}
                    addPending={(path, data) => setPending((p) => ({ ...p, [path]: data }))}
                  />
                  <div className="hidden xl:block">
                    <div className="sticky top-20 space-y-2">
                      <p className="font-mono text-[0.68rem] uppercase tracking-[0.12em] text-muted-foreground">Card preview</p>
                      <div className="h-[340px]"><ProjectCard project={{ ...previewProject, size: "normal" }} asStatic className="h-full" /></div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="space-y-6">
                  <div className="h-[340px] max-w-sm"><ProjectCard project={{ ...previewProject, size: "normal" }} asStatic className="h-full" /></div>
                  <div className="overflow-hidden rounded-2xl border border-border pb-12">
                    <CaseStudyBody project={previewProject} preview />
                  </div>
                </div>
              )}
            </>
          )}
        </main>
      </div>

      <div className="fixed inset-x-0 bottom-0 z-30 border-t border-border bg-background/95 pb-[env(safe-area-inset-bottom)] backdrop-blur">
        <div className="mx-auto flex max-w-[1400px] flex-wrap items-center justify-between gap-3 px-4 py-3">
          <span className="text-sm text-muted-foreground">
            {dirty ? "Unsaved changes" : "No unsaved changes"}
            {!connected && " · Connect GitHub to publish"}
          </span>
          <div className="flex flex-wrap items-center gap-2">
            {!onSettingsPage && sel.kind === "project" && (sel.slug || isNew) && (
              <>
                {confirmDelete ? (
                  <span className="flex items-center gap-2 text-sm">
                    Delete permanently?
                    <button type="button" disabled={busy || (!connected && !isNew)} onClick={deleteProject} className="rounded-lg bg-destructive px-3 py-2 font-semibold text-destructive-foreground disabled:opacity-50">Delete</button>
                    <button type="button" onClick={() => setConfirmDelete(false)} className="rounded-lg px-3 py-2 hover:bg-secondary">Cancel</button>
                  </span>
                ) : (
                  <button type="button" onClick={() => setConfirmDelete(true)} className="inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-destructive hover:bg-destructive/10">
                    <Trash2 className="h-4 w-4" /> {isNew ? "Discard" : "Delete"}
                  </button>
                )}
                <button type="button" onClick={() => downloadFile(`${draft.slug || "project"}.json`, projectJson(draft))} className="btn-ghost !py-2">
                  <Download className="h-4 w-4" /> JSON
                </button>
              </>
            )}
            <button
              type="button"
              disabled={!connected || busy || (!dirty && !isNew)}
              onClick={onSettingsPage ? publishSettings : publishProject}
              className="btn-primary !py-2 disabled:opacity-50"
            >
              {busy ? <Loader2 className="h-4 w-4 animate-spin" /> : <Rocket className="h-4 w-4" />} Publish to site
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin;
