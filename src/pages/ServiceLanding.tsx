import { Link, useParams } from "react-router-dom";
import { ArrowLeft, Check } from "lucide-react";
import SiteLayout from "@/components/site/SiteLayout";
import Reveal from "@/components/site/Reveal";
import ProjectCard from "@/components/site/ProjectCard";
import FaqSection from "@/components/site/FaqSection";
import ContactSection from "@/components/site/ContactSection";
import { getService } from "@/content/services";
import { projects } from "@/lib/content";
import { useMeta } from "@/lib/useMeta";
import NotFound from "./NotFound";

const ServiceLanding = () => {
  const { slug = "" } = useParams();
  const s = getService(slug);
  useMeta(s ? `${s.title} · Mainext Innovations` : "Not found · Mainext", s?.short, s ? `/services/${s.slug}` : undefined);
  if (!s) return <NotFound />;
  const proof = s.proofCategory ? projects.filter((p) => p.category === s.proofCategory).slice(0, 3) : [];

  return (
    <SiteLayout>
      <section className="relative overflow-hidden pb-16 pt-28 sm:pt-32">
        <div className="grid-bg glow-bg pointer-events-none absolute inset-0 [mask-image:linear-gradient(to_bottom,#000_50%,transparent)]" />
        <div className="container-x relative">
          <Link to="/#services" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
            <ArrowLeft className="h-4 w-4" /> All services
          </Link>
          <p className="eyebrow mt-6">Service</p>
          <h1 className="mt-3 max-w-3xl font-display text-4xl font-extrabold leading-[1.05] sm:text-6xl">{s.title}</h1>
          <p className="mt-5 max-w-2xl text-lg text-muted-foreground sm:text-xl">{s.intro}</p>
          <div className="mt-6 flex flex-wrap gap-2">
            <span className="chip">{s.timeline}</span>
            {s.startingPrice && <span className="chip !text-primary">from {s.startingPrice}</span>}
          </div>
        </div>
      </section>
      <section className="container-x grid gap-6 md:grid-cols-2">
        <Reveal className="panel p-6 sm:p-8">
          <p className="eyebrow">What you get</p>
          <ul className="mt-4 space-y-3">
            {s.includes.map((x) => (
              <li key={x} className="flex gap-3"><Check className="mt-1 h-4 w-4 shrink-0 text-accent" />{x}</li>
            ))}
          </ul>
        </Reveal>
        <Reveal delay={0.05} className="panel p-6 sm:p-8">
          <p className="eyebrow">Best for</p>
          <ul className="mt-4 space-y-3">
            {s.bestFor.map((x) => (
              <li key={x} className="flex gap-3"><Check className="mt-1 h-4 w-4 shrink-0 text-primary" />{x}</li>
            ))}
          </ul>
        </Reveal>
      </section>
      {proof.length > 0 && (
        <section className="container-x py-20">
          <h2 className="font-display text-2xl font-bold sm:text-3xl">Related work</h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {proof.map((p) => <ProjectCard key={p.slug} project={{ ...p, size: "normal" }} />)}
          </div>
        </section>
      )}
      {s.faqs.length > 0 && <FaqSection items={s.faqs} title={`About ${s.title.toLowerCase()}.`} />}
      <ContactSection />
    </SiteLayout>
  );
};

export default ServiceLanding;
