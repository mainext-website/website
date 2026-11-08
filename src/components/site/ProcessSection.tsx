import { processSteps } from "@/content/services";
import Reveal from "./Reveal";

const ProcessSection = () => (
  <section id="process" className="border-t border-border py-20 sm:py-28">
    <div className="container-x">
      <Reveal className="max-w-2xl">
        <p className="eyebrow">How we work</p>
        <h2 className="section-title mt-3">Four steps. No surprises.</h2>
      </Reveal>
      <ol className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {processSteps.map((s, i) => (
          <Reveal key={s.title} delay={i * 0.08}>
            <li className="panel flex h-full flex-col gap-3 p-6">
              <span className="font-display text-4xl font-extrabold text-primary/80">{i + 1}</span>
              <h3 className="font-display text-lg font-bold">{s.title}</h3>
              <p className="text-sm leading-relaxed text-muted-foreground">{s.text}</p>
            </li>
          </Reveal>
        ))}
      </ol>
    </div>
  </section>
);

export default ProcessSection;
