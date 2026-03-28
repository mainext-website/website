import { useMemo, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ExternalLink, Github } from "lucide-react";
import { projects } from "@/content/projects";
import { trackEvent } from "@/lib/analytics";

const Portfolio = () => {
  const [activeCategory, setActiveCategory] = useState("All");

  const categories = useMemo(() => {
    const allCategories = Array.from(new Set(projects.map((project) => project.category)));
    return ["All", ...allCategories];
  }, []);

  const visibleProjects = useMemo(() => {
    if (activeCategory === "All") {
      return projects;
    }
    return projects.filter((project) => project.category === activeCategory);
  }, [activeCategory]);

  return (
    <section className="py-24 bg-background defer-section" id="portfolio">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Our Portfolio
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Outcome-focused case studies from real projects delivered for growing businesses.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-3 mb-10">
          {categories.map((category) => (
            <Button
              key={category}
              size="sm"
              variant={category === activeCategory ? "default" : "outline"}
              className={
                category === activeCategory
                  ? "bg-gradient-to-r from-primary to-accent"
                  : "border-primary/40 hover:bg-primary/10"
              }
              onClick={() => setActiveCategory(category)}
            >
              {category}
            </Button>
          ))}
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {visibleProjects.map((project, index) => (
            <Card 
              key={project.id} 
              className="glass bg-card/50 overflow-hidden group hover:shadow-glow transition-all duration-500 animate-slide-up border-primary/20"
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              <div className="relative overflow-hidden">
                <img
                  src={project.coverImage}
                  alt={project.title}
                  loading="lazy"
                  decoding="async"
                  fetchPriority="low"
                  className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute top-4 right-4">
                  <span className="px-3 py-1 bg-primary text-primary-foreground text-sm rounded-full">
                    {project.category}
                  </span>
                </div>
              </div>
              
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors">
                  {project.title}
                </h3>
                <p className="text-sm text-primary mb-2">{project.industry}</p>
                <p className="text-muted-foreground mb-4 leading-relaxed">
                  {project.summary}
                </p>

                <div className="space-y-3 text-sm mb-5">
                  <p className="text-muted-foreground">
                    <span className="text-foreground font-semibold">Challenge:</span> {project.challenge}
                  </p>
                  <p className="text-muted-foreground">
                    <span className="text-foreground font-semibold">Solution:</span> {project.solution}
                  </p>
                  <p className="text-muted-foreground">
                    <span className="text-foreground font-semibold">Timeline:</span> {project.timeline}
                  </p>
                </div>

                <div className="mb-5">
                  <p className="text-xs font-semibold uppercase tracking-wide text-primary mb-2">Key outcomes</p>
                  <ul className="space-y-1 text-sm text-muted-foreground">
                    {project.outcomes.slice(0, 2).map((outcome) => (
                      <li key={outcome}>• {outcome}</li>
                    ))}
                  </ul>
                </div>
                
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.stack.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 bg-secondary text-secondary-foreground text-sm rounded-full border border-primary/20"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                
                <div className="flex gap-3">
                  <Button
                    size="sm"
                    className="bg-gradient-to-r from-primary to-accent hover:shadow-glow transition-all duration-300 group/btn"
                    asChild
                    disabled={!project.liveUrl}
                  >
                    <a
                      href={project.liveUrl ?? "#"}
                      target="_blank"
                      rel="noreferrer"
                      onClick={() =>
                        trackEvent("project_card_click", {
                          section: "portfolio",
                          project_id: project.id,
                          project_title: project.title,
                          click_target: "live_project",
                        })
                      }
                    >
                      <ExternalLink className="w-4 h-4 mr-2 group-hover/btn:translate-x-1 transition-transform" />
                      Live Project
                    </a>
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-primary/50 hover:bg-primary/10"
                    asChild
                    disabled={!project.codeUrl}
                  >
                    <a
                      href={project.codeUrl ?? "#"}
                      target="_blank"
                      rel="noreferrer"
                      onClick={() =>
                        trackEvent("project_card_click", {
                          section: "portfolio",
                          project_id: project.id,
                          project_title: project.title,
                          click_target: "code",
                        })
                      }
                    >
                      <Github className="w-4 h-4 mr-2" />
                      Code
                    </a>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <div className="text-center mt-12 animate-fade-in">
          <Button size="lg" variant="outline" className="border-primary/50 hover:bg-primary/10 transition-smooth" asChild>
            <a
              href="#contact"
              onClick={() =>
                trackEvent("project_card_click", {
                  section: "portfolio",
                  click_target: "discuss_project_cta",
                })
              }
            >
              Discuss Your Project
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Portfolio;