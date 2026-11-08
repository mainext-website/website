import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { CATEGORY_LABELS, STATUS_LABELS, type Project } from "@/lib/content";
import ProjectVisual from "./ProjectVisual";
import { cn } from "@/lib/utils";
import { trackEvent } from "@/lib/analytics";

export const sizeClass = (size: Project["size"]) =>
  size === "large" ? "sm:col-span-2 sm:row-span-2" : size === "wide" ? "sm:col-span-2" : "";

/** Bento tile. `asStatic` renders without a link (used for previews in the admin). */
const ProjectCard = ({ project, asStatic, className }: { project: Project; asStatic?: boolean; className?: string }) => {
  const large = project.size === "large";
  const inner = (
    <>
      <div className="relative z-10 flex flex-col gap-1.5">
        <div className="flex items-center justify-between gap-2">
          <span className="font-mono text-[0.65rem] uppercase tracking-[0.12em] text-accent">
            {[CATEGORY_LABELS[project.category], project.industry].filter(Boolean).join(" · ")}
          </span>
          <ArrowUpRight className="h-4 w-4 shrink-0 text-muted-foreground transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-primary" />
        </div>
        <h3 className={cn("font-display font-bold leading-tight", large ? "text-2xl sm:text-3xl" : "text-lg")}>{project.title || "Untitled project"}</h3>
        <p className={cn("text-sm text-muted-foreground", large ? "max-w-sm" : "line-clamp-2")}>{project.summary}</p>
      </div>
      <div
        className={cn(
          "relative mt-4 overflow-hidden transition-transform duration-500 ease-out group-hover:-translate-y-1",
          large ? "min-h-[180px] flex-1 sm:min-h-0" : "h-36",
        )}
      >
        <ProjectVisual project={project} className="transition-transform duration-700 group-hover:scale-[1.03]" />
      </div>
      <div className="relative z-10 mt-3 flex items-center justify-between font-mono text-[0.68rem] text-muted-foreground">
        <span>{project.client}</span>
        <span className="text-primary">{STATUS_LABELS[project.status]}{project.year ? ` · ${project.year}` : ""}</span>
      </div>
    </>
  );

  const classes = cn(
    "group panel relative flex min-w-0 flex-col p-4 transition-colors duration-300 hover:border-primary/60 sm:p-5",
    sizeClass(project.size),
    className,
  );

  if (asStatic) return <div className={classes}>{inner}</div>;
  return (
    <Link
      to={`/work/${project.slug}`}
      className={classes}
      onClick={() => trackEvent("project_card_click", { project: project.slug })}
    >
      {inner}
    </Link>
  );
};

export default ProjectCard;
