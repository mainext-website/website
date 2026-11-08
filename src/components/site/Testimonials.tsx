import { Link } from "react-router-dom";
import { Quote } from "lucide-react";
import { projects } from "@/lib/content";
import Reveal from "./Reveal";

const Testimonials = () => {
  const items = projects.filter((p) => p.testimonial);
  if (items.length === 0) return null;
  return (
    <section className="border-t border-border py-20 sm:py-28">
      <div className="container-x">
        <Reveal className="max-w-2xl">
          <p className="eyebrow">Clients</p>
          <h2 className="section-title mt-3">In their words.</h2>
        </Reveal>
        <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {items.map((p, i) => (
            <Reveal key={p.slug} delay={i * 0.06}>
              <figure className="panel flex h-full flex-col gap-5 p-6 sm:p-7">
                <Quote className="h-6 w-6 text-primary" />
                <blockquote className="text-lg leading-relaxed">“{p.testimonial!.quote}”</blockquote>
                <figcaption className="mt-auto flex items-end justify-between gap-3 border-t border-border pt-4">
                  <div>
                    <div className="font-semibold">{p.testimonial!.name}</div>
                    <div className="text-sm text-muted-foreground">{p.testimonial!.role}</div>
                  </div>
                  <Link to={`/work/${p.slug}`} className="shrink-0 font-mono text-[0.7rem] text-accent hover:underline">
                    {p.title} →
                  </Link>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
