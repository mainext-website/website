import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { faqs } from "@/content/services";
import Reveal from "./Reveal";

const FaqSection = ({ items = faqs, title = "Questions clients ask." }: { items?: { q: string; a: string }[]; title?: string }) => (
  <section id="faq" className="border-t border-border py-20 sm:py-28">
    <div className="container-x grid gap-10 lg:grid-cols-[1fr_1.5fr]">
      <Reveal>
        <p className="eyebrow">FAQ</p>
        <h2 className="section-title mt-3">{title}</h2>
      </Reveal>
      <Accordion type="single" collapsible className="w-full">
        {items.map((f) => (
          <AccordionItem key={f.q} value={f.q} className="border-border">
            <AccordionTrigger className="py-5 text-left font-display text-lg font-semibold hover:no-underline">{f.q}</AccordionTrigger>
            <AccordionContent className="pb-5 text-base leading-relaxed text-muted-foreground">{f.a}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  </section>
);

export default FaqSection;
