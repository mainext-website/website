import siteJson from "@/content/site.json";

export type ProjectCategory = "website" | "erp" | "billing" | "app" | "automation";
export type ProjectStatus = "live" | "in-use" | "in-progress" | "own-product";
export type TileSize = "large" | "wide" | "normal";

export interface ProjectFeature {
  title: string;
  description: string;
}

export interface ProjectImage {
  src: string;
  caption: string;
}

export interface ProjectTestimonial {
  quote: string;
  name: string;
  role: string;
}

export interface Project {
  slug: string;
  title: string;
  client: string;
  industry: string;
  category: ProjectCategory;
  year: string;
  status: ProjectStatus;
  summary: string;
  problem: string;
  solution: string;
  features: ProjectFeature[];
  aiNote: string;
  results: string[];
  stack: string[];
  duration: string;
  testimonial: ProjectTestimonial | null;
  cover: string;
  gallery: ProjectImage[];
  liveUrl: string;
  featured: boolean;
  order: number;
  size: TileSize;
  published: boolean;
}

export const CATEGORY_LABELS: Record<ProjectCategory, string> = {
  website: "Website",
  erp: "ERP & Operations",
  billing: "Billing & Accounts",
  app: "App",
  automation: "AI & Automation",
};

export const STATUS_LABELS: Record<ProjectStatus, string> = {
  live: "Live",
  "in-use": "In daily use",
  "in-progress": "In progress",
  "own-product": "Own product",
};

export const EMPTY_PROJECT: Project = {
  slug: "",
  title: "",
  client: "",
  industry: "",
  category: "website",
  year: String(new Date().getFullYear()),
  status: "in-use",
  summary: "",
  problem: "",
  solution: "",
  features: [],
  aiNote: "",
  results: [],
  stack: [],
  duration: "",
  testimonial: null,
  cover: "",
  gallery: [],
  liveUrl: "",
  featured: true,
  order: 99,
  size: "normal",
  published: true,
};

/** Fill in any missing fields so older or hand-edited JSON never breaks the site. */
export const normalizeProject = (raw: Partial<Project>): Project => {
  const p = { ...EMPTY_PROJECT, ...raw } as Project;
  p.features = Array.isArray(p.features) ? p.features.filter((f) => f && f.title) : [];
  p.results = Array.isArray(p.results) ? p.results.filter(Boolean) : [];
  p.stack = Array.isArray(p.stack) ? p.stack.filter(Boolean) : [];
  p.gallery = Array.isArray(p.gallery) ? p.gallery.filter((g) => g && g.src) : [];
  if (p.testimonial && !p.testimonial.quote) p.testimonial = null;
  if (!(p.category in CATEGORY_LABELS)) p.category = "website";
  if (!(p.status in STATUS_LABELS)) p.status = "in-use";
  return p;
};

export const sortProjects = (list: Project[]) =>
  [...list].sort((a, b) => a.order - b.order || b.year.localeCompare(a.year));

const modules = import.meta.glob<Partial<Project>>("../content/projects/*.json", {
  eager: true,
  import: "default",
});

export const allProjects: Project[] = sortProjects(Object.values(modules).map(normalizeProject));
export const projects: Project[] = allProjects.filter((p) => p.published && p.slug);
export const featuredProjects = projects.filter((p) => p.featured);
export const getProject = (slug: string) => projects.find((p) => p.slug === slug);

export type SiteSettings = typeof siteJson;
export const site: SiteSettings = siteJson;

export const clientNames = Array.from(
  new Set(projects.map((p) => p.client).filter((c) => c && !/own product/i.test(c)).map((c) => c.replace(/\s*\(.*\)\s*$/, ""))),
);

export const stats = {
  years: site.experienceYears,
  freelanceYears: new Date().getFullYear() - site.freelanceSince,
  systems: projects.length,
  clients: clientNames.length,
};

export const whatsappLink = (message = "Hi Parthiban, I saw mainext.in and I'd like to discuss a project.") => {
  const n = site.contact.whatsapp.replace(/\D/g, "");
  return n ? `https://wa.me/${n}?text=${encodeURIComponent(message)}` : "";
};

/** Image path helper: uploaded files live under /public, so they are served from the site root. */
export const assetUrl = (src: string) => {
  if (!src) return "";
  if (/^(https?:|data:|blob:)/.test(src)) return src;
  return src.startsWith("/") ? src : `/${src}`;
};
