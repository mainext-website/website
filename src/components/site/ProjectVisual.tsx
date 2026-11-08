import { useState } from "react";
import { assetUrl, type Project } from "@/lib/content";
import MockScreen from "./MockScreen";
import { cn } from "@/lib/utils";

/** Real cover image when uploaded, otherwise (or if it fails to load) a drawn mock screen for the category. */
const ProjectVisual = ({ project, className, eager }: { project: Project; className?: string; eager?: boolean }) => {
  const [failed, setFailed] = useState<string | null>(null);
  const showImage = project.cover && failed !== project.cover;
  return showImage ? (
    <img
      src={assetUrl(project.cover)}
      alt={`${project.title} screenshot`}
      loading={eager ? "eager" : "lazy"}
      onError={() => setFailed(project.cover)}
      className={cn("h-full w-full rounded-xl border border-border object-cover object-top", className)}
    />
  ) : (
    <MockScreen category={project.category} title={project.title} className={className} />
  );
};

export default ProjectVisual;
