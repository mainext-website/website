import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Check } from "lucide-react";
import { stats } from "@/lib/content";
import Reveal from "./Reveal";

const lines = [
  { t: "$ describe: GST invoice with customer rates", c: "text-muted-foreground" },
  { t: "→ AI drafts screens, data model, tests", c: "text-muted-foreground" },
  { t: "→ I review every line, adjust to your process", c: "text-muted-foreground" },
  { t: "✓ 48 tests passed", c: "text-accent" },
  { t: "✓ backup + access roles configured", c: "text-accent" },
  { t: "✓ deployed · demo link sent on WhatsApp", c: "text-primary" },
];

const Terminal = () => {
  const reduce = useReducedMotion();
  const [n, setN] = useState(reduce ? lines.length : 0);
  useEffect(() => {
    if (reduce) return;
    const t = setInterval(() => setN((v) => (v >= lines.length + 3 ? 0 : v + 1)), 700);
    return () => clearInterval(t);
  }, [reduce]);
  return (
    <div className="panel overflow-hidden font-mono text-[0.78rem] leading-7 shadow-2xl shadow-black/20">
      <div className="flex items-center gap-1.5 border-b border-border px-4 py-2.5">
        <span className="h-2.5 w-2.5 rounded-full bg-foreground/15" />
        <span className="h-2.5 w-2.5 rounded-full bg-foreground/15" />
        <span className="h-2.5 w-2.5 rounded-full bg-foreground/15" />
        <span className="ml-2 text-[0.7rem] text-muted-foreground">mainext · build</span>
      </div>
      <div className="min-h-[220px] p-5">
        {lines.slice(0, Math.min(n, lines.length)).map((l) => (
          <motion.div key={l.t} initial={{ opacity: 0, x: -6 }} animate={{ opacity: 1, x: 0 }} className={l.c}>
            {l.t}
          </motion.div>
        ))}
        <span className="inline-block h-4 w-2 translate-y-0.5 animate-pulse bg-primary" />
      </div>
    </div>
  );
};

const rows = [
  ["Speed", "Weeks, not months. AI handles the repetitive parts of building.", "Slow manual build, or fast and sloppy"],
  ["Quality", `${stats.years}+ years of professional IT habits: code review, testing, backups, security.`, "Works on demo day, breaks next month"],
  ["Who you talk to", "The person who writes the code. In Tamil or English.", "A salesperson, then a stranger"],
  ["After launch", "30 days of free fixes, then an optional care plan.", "Gone after the final payment"],
];

const WhyMe = () => (
  <section className="border-t border-border py-20 sm:py-28">
    <div className="container-x grid items-center gap-12 lg:grid-cols-2">
      <Reveal>
        <p className="eyebrow">Why work with me</p>
        <h2 className="section-title mt-3">AI-fast. Enterprise-careful.</h2>
        <p className="mt-4 max-w-xl text-muted-foreground">
          I've spent {stats.years}+ years in professional IT, where software has to work every day for thousands of
          people. I bring the same discipline to small and growing businesses, and use AI to deliver it faster and at a
          price that makes sense.
        </p>
        <ul className="mt-8 space-y-5">
          {rows.map(([k, me, them]) => (
            <li key={k} className="grid grid-cols-[auto_1fr] gap-3">
              <span className="mt-0.5 grid h-6 w-6 place-items-center rounded-full bg-primary/15 text-primary"><Check className="h-3.5 w-3.5" /></span>
              <div>
                <p className="font-semibold">{k}: <span className="font-normal text-foreground/90">{me}</span></p>
                <p className="mt-0.5 text-sm text-muted-foreground line-through decoration-muted-foreground/40">{them}</p>
              </div>
            </li>
          ))}
        </ul>
      </Reveal>
      <Reveal delay={0.1}>
        <Terminal />
      </Reveal>
    </div>
  </section>
);

export default WhyMe;
