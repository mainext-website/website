// Runs after `vite build`. Writes one HTML file per route so that:
//  - direct links like /work/eclipse-invoicing work on GitHub Pages
//  - each page has its own title, description and share preview
//  - sitemap.xml always matches the projects that exist
import { readFileSync, writeFileSync, mkdirSync, readdirSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const dist = join(root, "dist");
const SITE = "https://mainext.in";
const template = readFileSync(join(dist, "index.html"), "utf8");

const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

const render = ({ path, title, description, image, noindex }) => {
  let html = template
    .replace(/<title>.*?<\/title>/s, `<title>${esc(title)}</title>`)
    .replace(/(<meta name="description"\s+content=")[^"]*(")/s, `$1${esc(description)}$2`)
    .replace(/(<meta property="og:title" content=")[^"]*(")/, `$1${esc(title)}$2`)
    .replace(/(<meta property="og:description"\s+content=")[^"]*(")/s, `$1${esc(description)}$2`)
    .replace(/(<meta name="twitter:title" content=")[^"]*(")/, `$1${esc(title)}$2`)
    .replace(/(<meta name="twitter:description"\s+content=")[^"]*(")/s, `$1${esc(description)}$2`)
    .replace(/(<meta property="og:url" content=")[^"]*(")/, `$1${SITE}${path}$2`)
    .replace(/(<link rel="canonical" href=")[^"]*(")/, `$1${SITE}${path}$2`);
  if (image) {
    html = html
      .replace(/(<meta property="og:image" content=")[^"]*(")/, `$1${SITE}${image}$2`)
      .replace(/(<meta name="twitter:image" content=")[^"]*(")/, `$1${SITE}${image}$2`);
  }
  if (noindex) html = html.replace(/(<meta name="robots" content=")[^"]*(")/, `$1noindex, nofollow$2`);
  const dir = join(dist, path);
  mkdirSync(dir, { recursive: true });
  writeFileSync(join(dir, "index.html"), html);
};

const projectsDir = join(root, "src/content/projects");
const projects = readdirSync(projectsDir)
  .filter((f) => f.endsWith(".json"))
  .map((f) => JSON.parse(readFileSync(join(projectsDir, f), "utf8")))
  .filter((p) => p.slug && p.published !== false);

const servicesSrc = readFileSync(join(root, "src/content/services.ts"), "utf8");
const services = [...servicesSrc.matchAll(/slug:\s*"([^"]+)",\s*title:\s*"([^"]+)",\s*short:\s*\n?\s*"([^"]+)"/g)].map((m) => ({
  slug: m[1],
  title: m[2],
  short: m[3],
}));
const legacy = [...servicesSrc.matchAll(/"([a-z-]+)":\s*"([a-z-]+)",/g)].map((m) => m[1]);

render({ path: "/work", title: "Work · Mainext Innovations", description: "Websites, billing software, ERPs and apps built by Parthiban V for real businesses." });
for (const p of projects) {
  render({
    path: `/work/${p.slug}`,
    title: `${p.title} · Case study · Mainext`,
    description: p.summary || `${p.title} by Mainext Innovations`,
    image: p.cover || undefined,
  });
}
for (const s of services) {
  render({ path: `/services/${s.slug}`, title: `${s.title} · Mainext Innovations`, description: s.short });
}
for (const slug of legacy) {
  const target = servicesSrc.match(new RegExp(`"${slug}":\\s*"([a-z-]+)"`))?.[1];
  const s = services.find((x) => x.slug === target);
  if (s) render({ path: `/services/${slug}`, title: `${s.title} · Mainext Innovations`, description: s.short, noindex: true });
}
render({ path: "/admin", title: "Admin · Mainext", description: "Admin", noindex: true });
writeFileSync(join(dist, "404.html"), template.replace(/(<meta name="robots" content=")[^"]*(")/, `$1noindex$2`));

const today = new Date().toISOString().slice(0, 10);
const urls = ["/", "/work", ...projects.map((p) => `/work/${p.slug}`), ...services.map((s) => `/services/${s.slug}`)];
writeFileSync(
  join(dist, "sitemap.xml"),
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls
    .map((u) => `  <url><loc>${SITE}${u === "/" ? "/" : u}</loc><lastmod>${today}</lastmod></url>`)
    .join("\n")}\n</urlset>\n`,
);
console.log(`prerender: ${projects.length} projects, ${services.length} services, ${urls.length} sitemap URLs`);
