import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ExternalLink, Github } from "lucide-react";

// Import project images
import project1 from "@/assets/project-1.png";
import project2 from "@/assets/project-2.png";
import project3 from "@/assets/project-3.png";
import project4 from "@/assets/project-4.png";

const projects = [
  {
    id: 1,
    title: "EC Recharge Web App",
    description: "A robust recharge platform supporting multiple branches with centralized dashboard and static IP-based secure request handling.",
    image: project1,
    tags: ["React", "Node.js", "SQL", "Security"],
    category: "Full Stack"
  },
  {
    id: 2,
    title: "Mobile Service Tracker",
    description: "Track mobile servicing status, history, and delivery schedules—built for mobile shops with branches.",
    image: project2,
    tags: ["React", "Python", "SQL", "Dashboard"],
    category: "Web App"
  },
  {
    id: 3,
    title: "Invoice Generator",
    description: "Custom invoice app designed for Eclipse and other vendors to manage product invoices for innerwear distribution to stores and customers.",
    image: project3,
    tags: ["React", "Node.js", "PDF", "Automation"],
    category: "Business App"
  },
  {
    id: 4,
    title: "Mobile Shop Account Management",
    description: "Money in/out flow, vendor payments, and multi-branch transaction handling for mobile shops.",
    image: project4,
    tags: ["React", "Python", "SQL", "Financial"],
    category: "Full Stack"
  }
];

const Portfolio = () => {
  return (
    <section className="py-24 bg-background" id="portfolio">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Our Portfolio
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Showcasing our latest projects and successful implementations
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <Card 
              key={project.id} 
              className="glass bg-card/50 overflow-hidden group hover:shadow-glow transition-all duration-500 animate-slide-up border-primary/20"
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              <div className="relative overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
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
                <p className="text-muted-foreground mb-4 leading-relaxed">
                  {project.description}
                </p>
                
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 bg-secondary text-secondary-foreground text-sm rounded-full border border-primary/20"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                
                <div className="flex gap-3">
                  <Button size="sm" className="bg-gradient-to-r from-primary to-accent hover:shadow-glow transition-all duration-300 group/btn">
                    <ExternalLink className="w-4 h-4 mr-2 group-hover/btn:translate-x-1 transition-transform" />
                    Live Demo
                  </Button>
                  <Button variant="outline" size="sm" className="border-primary/50 hover:bg-primary/10">
                    <Github className="w-4 h-4 mr-2" />
                    Code
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <div className="text-center mt-12 animate-fade-in">
          <Button size="lg" variant="outline" className="border-primary/50 hover:bg-primary/10 transition-smooth">
            View All Projects
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Portfolio;