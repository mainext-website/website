import { Link } from "react-router-dom";
import { ArrowUpRight, Bot, Boxes, Globe, LifeBuoy, ReceiptIndianRupee, Smartphone } from "lucide-react";
import { services } from "@/content/services";
import Reveal from "./Reveal";

const icons = [Globe, ReceiptIndianRupee, Boxes, Smartphone, Bot, LifeBuoy];

const ServicesSection = () => (
  <section id="services" className="border-t border-border py-20 sm:py-28">
    <div className="container-x">
      <Reveal className="max-w-2xl">
        <p className="eyebrow">Services</p>
        <h2 className="section-title mt-3">One person who can build the whole thing.</h2>
        <p className="mt-4 text-muted-foreground">
          From a five-page website to the ERP your factory runs on. You talk to the person writing the code, every time.
        </p>
      </Reveal>
      <div className="mt-12 grid gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
        {services.map((s, i) => {
          const Icon = icons[i % icons.length];
          return (
            <Reveal key={s.slug} delay={i * 0.05} className="bg-background">
              <Link to={`/services/${s.slug}`} className="group flex h-full flex-col gap-4 p-6 transition-colors hover:bg-card sm:p-8">
                <div className="flex items-start justify-between">
                  <span className="grid h-11 w-11 place-items-center rounded-xl border border-border text-primary transition-colors group-hover:border-primary">
                    <Icon className="h-5 w-5" />
                  </span>
                  <ArrowUpRight className="h-5 w-5 text-muted-foreground transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-primary" />
                </div>
                <h3 className="font-display text-xl font-bold">{s.title}</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">{s.short}</p>
                <div className="mt-auto flex flex-wrap gap-2 pt-2">
                  <span className="chip">{s.timeline}</span>
                  {s.startingPrice && <span className="chip !text-primary">from {s.startingPrice}</span>}
                </div>
              </Link>
            </Reveal>
          );
        })}
      </div>
    </div>
  </section>
);

export default ServicesSection;
