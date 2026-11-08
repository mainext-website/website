import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { AnimatePresence, LayoutGroup, motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { CATEGORY_LABELS, type Project, type ProjectCategory } from "@/lib/content";
import ProjectCard, { sizeClass } from "./ProjectCard";
import Reveal from "./Reveal";

interface WorkGridProps {
  items: Project[];
  showAllLink?: boolean;
  title?: string;
  eyebrow?: string;
  intro?: string;
  headingLevel?: "h1" | "h2";
}

const WorkGrid = ({
  items,
  showAllLink,
  eyebrow = "Selected work",
  title = "Software that's running real businesses today.",
  intro,
  headingLevel = "h2",
}: WorkGridProps) => {
  const [filter, setFilter] = useState<ProjectCategory | "all">("all");
  const cats = useMemo(
    () => (Object.keys(CATEGORY_LABELS) as ProjectCategory[]).filter((c) => items.some((p) => p.category === c)),
    [items],
  );
  const shown = filter === "all" ? items : items.filter((p) => p.category === filter);
  const Heading = headingLevel;

  return (
    <section id="work" className="py-20 sm:py-28">
      <div className="container-x">
        <Reveal className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <p className="eyebrow">{eyebrow}</p>
            <Heading className="section-title mt-3">{title}</Heading>
            {intro && <p className="mt-4 text-muted-foreground">{intro}</p>}
          </div>
          {showAllLink && (
            <Link to="/work" className="btn-ghost self-start md:self-auto">
              All projects <ArrowRight className="h-4 w-4" />
            </Link>
          )}
        </Reveal>

        <div className="mt-8 flex flex-wrap gap-2" role="group" aria-label="Filter projects">
          {(["all", ...cats] as const).map((c) => (
            <button
              key={c}
              type="button"
              aria-pressed={filter === c}
              onClick={() => setFilter(c)}
              className="chip transition-colors aria-pressed:border-foreground aria-pressed:bg-foreground aria-pressed:text-background hover:text-foreground"
            >
              {c === "all" ? "All" : CATEGORY_LABELS[c]}
            </button>
          ))}
        </div>

        <LayoutGroup>
          <motion.div layout className="mt-6 grid grid-flow-row-dense auto-rows-[minmax(300px,auto)] grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <AnimatePresence mode="popLayout">
              {shown.map((p) => (
                <motion.div
                  key={p.slug}
                  layout
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.4, ease: [0.2, 0.8, 0.2, 1] }}
                  className={`flex ${sizeClass(p.size)}`}
                >
                  <ProjectCard project={p} className="w-full" />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </LayoutGroup>
      </div>
    </section>
  );
};

export default WorkGrid;
