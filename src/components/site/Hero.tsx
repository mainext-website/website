import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { AnimatePresence, animate, motion, useInView, useReducedMotion } from "framer-motion";
import { ArrowRight, MessageCircle } from "lucide-react";
import { featuredProjects, site, stats, whatsappLink } from "@/lib/content";
import ProjectVisual from "./ProjectVisual";
import { scrollToHash } from "./SiteNav";
import { trackEvent } from "@/lib/analytics";

const CountUp = ({ to, suffix = "" }: { to: number; suffix?: string }) => {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const reduce = useReducedMotion();
  const [val, setVal] = useState(reduce ? to : 0);
  useEffect(() => {
    if (!inView || reduce) return;
    const c = animate(0, to, { duration: 1.4, ease: "easeOut", onUpdate: (v) => setVal(Math.round(v)) });
    return () => c.stop();
  }, [inView, to, reduce]);
  return <span ref={ref}>{val}{suffix}</span>;
};

const RotatingWord = ({ words }: { words: string[] }) => {
  const [i, setI] = useState(0);
  const reduce = useReducedMotion();
  useEffect(() => {
    if (reduce || words.length < 2) return;
    const t = setInterval(() => setI((v) => (v + 1) % words.length), 2400);
    return () => clearInterval(t);
  }, [words.length, reduce]);
  return (
    <span className="relative inline-grid text-primary">
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={words[i]}
          initial={{ y: "45%", opacity: 0, filter: "blur(6px)" }}
          animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
          exit={{ y: "-45%", opacity: 0, filter: "blur(6px)" }}
          transition={{ duration: 0.32, ease: [0.2, 0.8, 0.2, 1] }}
          className="col-start-1 row-start-1 whitespace-nowrap"
        >
          {words[i]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
};

/** Three real project screens stacked like windows, cycling to the front. */
const AppStack = () => {
  // One project per kind (ERP, billing, website, app…) so the stack shows range, not three dashboards.
  const items = featuredProjects
    .filter((p, i, all) => all.findIndex((x) => x.category === p.category) === i)
    .slice(0, 3);
  const [front, setFront] = useState(0);
  const reduce = useReducedMotion();
  useEffect(() => {
    if (reduce || items.length < 2) return;
    const t = setInterval(() => setFront((v) => (v + 1) % items.length), 3000);
    return () => clearInterval(t);
  }, [items.length, reduce]);

  return (
    <div className="relative mx-auto aspect-[4/3] w-full max-w-[520px] pr-10 pt-10 sm:pr-14 sm:pt-14">
      {items.map((p, idx) => {
        const pos = (idx - front + items.length) % items.length;
        return (
          <motion.div
            key={p.slug}
            className="absolute bottom-0 left-0 right-10 top-10 sm:right-14 sm:top-14"
            animate={{
              x: pos * 22,
              y: pos * -22,
              scale: 1 - pos * 0.05,
              opacity: pos === 0 ? 1 : pos === 1 ? 0.75 : 0.45,
              zIndex: 10 - pos,
            }}
            transition={{ duration: 0.7, ease: [0.2, 0.8, 0.2, 1] }}
          >
            <div className="flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-2xl shadow-black/30">
              <div className="flex items-center gap-1.5 border-b border-border px-3 py-2">
                <span className="h-2 w-2 rounded-full bg-foreground/15" />
                <span className="h-2 w-2 rounded-full bg-foreground/15" />
                <span className="h-2 w-2 rounded-full bg-foreground/15" />
                <span className="ml-2 truncate font-mono text-[10px] text-muted-foreground">{p.title}</span>
              </div>
              <div className="min-h-0 flex-1 p-2">
                <ProjectVisual project={p} eager className="border-0" />
              </div>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
};

const Hero = () => {
  const wa = whatsappLink();
  return (
    <section className="relative overflow-hidden pt-28 sm:pt-32" id="home">
      <div className="grid-bg glow-bg pointer-events-none absolute inset-0 [mask-image:linear-gradient(to_bottom,#000_60%,transparent)]" />
      <div className="container-x relative grid items-center gap-12 pb-16 lg:grid-cols-[1.1fr_1fr] lg:pb-24">
        <div className="min-w-0">
          <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="eyebrow">
            {site.person.name} · {stats.years}+ years in IT · AI-first engineer
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="mt-5 font-display text-[2.6rem] font-extrabold leading-[1.02] tracking-[-0.03em] sm:text-6xl lg:text-[4.2rem]"
          >
            I build the
            <br />
            <RotatingWord words={site.hero.words} />
            <br />
            your business runs on.
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground"
          >
            {site.hero.subtitle}
          </motion.p>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.3 }} className="mt-8 flex flex-wrap gap-3">
            <Link
              to="/#work"
              onClick={(e) => {
                e.preventDefault();
                trackEvent("hero_primary_cta_click", { section: "hero", target: "work" });
                scrollToHash("work");
              }}
              className="btn-primary group"
            >
              See the work <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
            {wa ? (
              <a href={wa} target="_blank" rel="noreferrer" className="btn-ghost" onClick={() => trackEvent("hero_secondary_cta_click", { section: "hero", target: "whatsapp" })}>
                <MessageCircle className="h-4 w-4" /> WhatsApp me
              </a>
            ) : (
              <Link
                to="/#contact"
                onClick={(e) => {
                  e.preventDefault();
                  trackEvent("hero_secondary_cta_click", { section: "hero", target: "contact" });
                  scrollToHash("contact");
                }}
                className="btn-ghost"
              >
                Book a free call
              </Link>
            )}
          </motion.div>
          <dl className="mt-10 grid max-w-lg grid-cols-2 gap-x-6 gap-y-5 sm:grid-cols-4">
            {[
              { n: stats.years, s: "+", l: "years in IT" },
              { n: stats.freelanceYears, s: "", l: "years freelancing" },
              { n: stats.systems, s: "", l: "systems shipped" },
              { n: stats.clients, s: "+", l: "business clients" },
            ].map((x) => (
              <div key={x.l}>
                <dt className="sr-only">{x.l}</dt>
                <dd className="font-display text-3xl font-bold tabular-nums"><CountUp to={x.n} suffix={x.s} /></dd>
                <dd className="text-xs text-muted-foreground">{x.l}</dd>
              </div>
            ))}
          </dl>
        </div>
        <motion.div initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.9, delay: 0.25 }} className="min-w-0">
          <AppStack />
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
