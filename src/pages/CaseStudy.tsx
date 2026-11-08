import { Link, useParams } from "react-router-dom";
import { ArrowLeft, ArrowRight, ArrowUpRight, Check, Quote, Sparkles } from "lucide-react";
import SiteLayout from "@/components/site/SiteLayout";
import ProjectVisual from "@/components/site/ProjectVisual";
import Reveal from "@/components/site/Reveal";
import ContactSection from "@/components/site/ContactSection";
import { assetUrl, CATEGORY_LABELS, getProject, projects, STATUS_LABELS, type Project } from "@/lib/content";
import { useMeta } from "@/lib/useMeta";
import NotFound from "./NotFound";

/** The case-study layout. Exported so the admin preview renders exactly what visitors will see. */
export const CaseStudyBody = ({ project: p, preview }: { project: Project; preview?: boolean }) => {
  const idx = projects.findIndex((x) => x.slug === p.slug);
  const next = !preview && projects.length > 1 ? projects[(idx + 1) % projects.length] : null;
  const facts = [
    ["Client", p.client],
    ["Industry", p.industry],
    ["Year", p.year],
    ["Timeline", p.duration],
    ["Status", STATUS_LABELS[p.status]],
  ].filter(([, v]) => v);

  return (
    <article>
      <header className="relative overflow-hidden pb-12 pt-28 sm:pt-32">
        <div className="grid-bg glow-bg pointer-events-none absolute inset-0 [mask-image:linear-gradient(to_bottom,#000_50%,transparent)]" />
        <div className="container-x relative">
          {!preview && (
            <Link to="/work" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
              <ArrowLeft className="h-4 w-4" /> All work
            </Link>
          )}
          <p className="eyebrow mt-6">{[CATEGORY_LABELS[p.category], p.industry].filter(Boolean).join(" · ")}</p>
          <h1 className="mt-3 max-w-4xl font-display text-4xl font-extrabold leading-[1.05] tracking-[-0.02em] sm:text-6xl">{p.title || "Untitled project"}</h1>
          <p className="mt-5 max-w-2xl text-lg text-muted-foreground sm:text-xl">{p.summary}</p>
          <dl className="mt-8 flex flex-wrap gap-x-10 gap-y-4">
            {facts.map(([k, v]) => (
              <div key={k}>
                <dt className="font-mono text-[0.68rem] uppercase tracking-[0.12em] text-muted-foreground">{k}</dt>
                <dd className="mt-1 font-semibold">{v}</dd>
              </div>
            ))}
          </dl>
          {p.liveUrl && (
            <a href={p.liveUrl} target="_blank" rel="noreferrer" className="btn-ghost mt-8">
              Visit live site <ArrowUpRight className="h-4 w-4" />
            </a>
          )}
        </div>
      </header>

      <div className="container-x">
        {p.cover ? (
          <Reveal className="aspect-[16/9] w-full max-w-full overflow-hidden rounded-2xl border border-border bg-card p-2 sm:p-3">
            <ProjectVisual project={p} eager className="border-0" />
          </Reveal>
        ) : (
          <Reveal className="grid-bg glow-bg grid place-items-center overflow-hidden rounded-2xl border border-border px-4 py-10 sm:py-14">
            <div className="h-[240px] w-full max-w-[380px] shadow-2xl shadow-black/30 sm:[zoom:1.6]">
              <ProjectVisual project={p} eager />
            </div>
          </Reveal>
        )}
      </div>

      <div className="container-x mt-16 grid gap-10 md:grid-cols-2 md:gap-16">
        {p.problem && (
          <Reveal>
            <p className="eyebrow">The problem</p>
            <p className="mt-3 text-lg leading-relaxed">{p.problem}</p>
          </Reveal>
        )}
        {p.solution && (
          <Reveal delay={0.05}>
            <p className="eyebrow">What I built</p>
            <p className="mt-3 text-lg leading-relaxed">{p.solution}</p>
          </Reveal>
        )}
      </div>

      {p.features.length > 0 && (
        <div className="container-x mt-16">
          <h2 className="font-display text-2xl font-bold sm:text-3xl">Key features</h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {p.features.map((f, i) => (
              <Reveal key={f.title + i} delay={i * 0.05}>
                <div className="panel h-full p-6">
                  <span className="font-mono text-xs text-primary">{String(i + 1).padStart(2, "0")}</span>
                  <h3 className="mt-2 font-display text-lg font-bold">{f.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{f.description}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      )}

      {p.gallery.length > 0 && (
        <div className="container-x mt-16 grid gap-6 sm:grid-cols-2">
          {p.gallery.map((g, i) => (
            <Reveal key={g.src + i} className={i === 0 && p.gallery.length % 2 === 1 ? "sm:col-span-2" : ""}>
              <figure>
                <img src={assetUrl(g.src)} alt={g.caption || `${p.title} screen ${i + 1}`} loading="lazy" className="w-full rounded-2xl border border-border" />
                {g.caption && <figcaption className="mt-2 text-sm text-muted-foreground">{g.caption}</figcaption>}
              </figure>
            </Reveal>
          ))}
        </div>
      )}

      <div className="container-x mt-16 grid gap-6 lg:grid-cols-[1.3fr_1fr]">
        {p.results.length > 0 && (
          <Reveal className="panel p-6 sm:p-8">
            <p className="eyebrow">Results</p>
            <ul className="mt-4 space-y-3">
              {p.results.map((r) => (
                <li key={r} className="flex gap-3 text-lg">
                  <Check className="mt-1 h-5 w-5 shrink-0 text-accent" /> {r}
                </li>
              ))}
            </ul>
          </Reveal>
        )}
        <div className="flex flex-col gap-6">
          {p.aiNote && (
            <Reveal className="rounded-2xl border border-primary/40 bg-primary/10 p-6">
              <p className="flex items-center gap-2 font-mono text-[0.72rem] uppercase tracking-[0.12em] text-primary">
                <Sparkles className="h-4 w-4" /> How AI helped
              </p>
              <p className="mt-2 leading-relaxed">{p.aiNote}</p>
            </Reveal>
          )}
          {p.stack.length > 0 && (
            <Reveal className="panel p-6">
              <p className="eyebrow">Built with</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {p.stack.map((s) => <span key={s} className="chip !text-foreground">{s}</span>)}
              </div>
            </Reveal>
          )}
        </div>
      </div>

      {p.testimonial && (
        <div className="container-x mt-16">
          <Reveal>
            <figure className="mx-auto max-w-3xl text-center">
              <Quote className="mx-auto h-8 w-8 text-primary" />
              <blockquote className="mt-4 font-display text-2xl font-semibold leading-snug sm:text-3xl">“{p.testimonial.quote}”</blockquote>
              <figcaption className="mt-5 text-muted-foreground">
                <span className="font-semibold text-foreground">{p.testimonial.name}</span> · {p.testimonial.role}
              </figcaption>
            </figure>
          </Reveal>
        </div>
      )}

      {next && (
        <div className="container-x mt-20">
          <Link to={`/work/${next.slug}`} className="group panel flex items-center justify-between gap-4 p-6 transition-colors hover:border-primary sm:p-8">
            <div className="min-w-0">
              <p className="font-mono text-[0.7rem] uppercase tracking-[0.12em] text-muted-foreground">Next project</p>
              <p className="mt-1 truncate font-display text-2xl font-bold">{next.title}</p>
            </div>
            <ArrowRight className="h-6 w-6 shrink-0 text-primary transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      )}
    </article>
  );
};

const CaseStudy = () => {
  const { slug = "" } = useParams();
  const project = getProject(slug);
  useMeta(project ? `${project.title} · Case study · Mainext` : "Not found · Mainext", project?.summary, `/work/${slug}`);
  if (!project) return <NotFound />;
  return (
    <SiteLayout>
      <CaseStudyBody project={project} />
      <div className="mt-20">
        <ContactSection />
      </div>
    </SiteLayout>
  );
};

export default CaseStudy;
