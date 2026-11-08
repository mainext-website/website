import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { site, stats } from "@/lib/content";
import Reveal from "./Reveal";

const Journey = () => {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 75%", "end 55%"] });
  const scaleY = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section id="journey" className="border-t border-border py-20 sm:py-28">
      <div className="container-x grid gap-12 lg:grid-cols-[1fr_1.4fr]">
        <Reveal className="lg:sticky lg:top-28 lg:self-start">
          <p className="eyebrow">The journey</p>
          <h2 className="section-title mt-3">From one mobile shop to {stats.systems} systems.</h2>
          <p className="mt-4 max-w-md text-muted-foreground">
            No ads, no agency. Each client came from the last one's word. That's the only marketing I've needed, and the
            standard I hold every project to.
          </p>
        </Reveal>
        <div ref={ref} className="relative pl-8">
          <div className="absolute bottom-2 left-[7px] top-2 w-0.5 bg-border" />
          <motion.div
            className="absolute bottom-2 left-[7px] top-2 w-0.5 origin-top bg-primary"
            style={{ scaleY: reduce ? 1 : scaleY }}
          />
          <ol className="space-y-10">
            {site.journey.map((j, i) => (
              <Reveal key={i} delay={0.03 * i}>
                <li className="relative">
                  <span className="absolute -left-8 top-1 h-4 w-4 rounded-full border-2 border-primary bg-background" />
                  <p className="font-mono text-xs text-primary">{j.when}</p>
                  <h3 className="mt-1 font-display text-xl font-bold">{j.title}</h3>
                  <p className="mt-1 max-w-lg text-muted-foreground">{j.text}</p>
                </li>
              </Reveal>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
};

export default Journey;
