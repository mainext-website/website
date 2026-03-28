import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, Globe, Settings, Zap } from "lucide-react";
import { Link } from "react-router-dom";
import { trackEvent } from "@/lib/analytics";
import { getScrollBehavior } from "@/lib/utils";

const services = [
  {
    icon: Globe,
    slug: "website-landing-systems",
    title: "Website and Landing Systems",
    description: "High-performing websites designed to build trust, rank better, and convert visitors into leads.",
    bestFor: "Best for: startups, local businesses, service providers",
    features: ["Conversion-focused pages", "Mobile-first UX", "SEO-ready setup", "Fast deployment"]
  },
  {
    icon: Settings,
    slug: "business-process-automation",
    title: "Business Process Automation",
    description: "Automate repetitive tasks and connect your tools so your team can save time and reduce manual errors.",
    bestFor: "Best for: operations-heavy teams and growing businesses",
    features: ["Workflow automation", "API integrations", "Data sync", "Reporting dashboards"]
  },
  {
    icon: Zap,
    slug: "technical-support-optimization",
    title: "Technical Support and Optimization",
    description: "Improve reliability, speed, and maintainability of your existing product with focused engineering support.",
    bestFor: "Best for: teams needing ongoing technical partner support",
    features: ["Performance tuning", "Bug fixes", "Feature enhancement", "Release support"]
  }
];

const scrollToContact = () => {
  trackEvent("service_cta_click", {
    section: "services",
    target: "contact",
    cta_label: "Get a Tailored Solution Plan",
  });
  document.getElementById("contact")?.scrollIntoView({ behavior: getScrollBehavior() });
};

const Services = () => {
  return (
    <section className="py-24 bg-secondary/20 defer-section" id="services">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Services Built for Business Outcomes
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            We combine product thinking and engineering to help you launch faster, operate better, and grow consistently.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <Card 
              key={service.title} 
              className="glass bg-card/50 hover:shadow-glow transition-all duration-500 group animate-slide-up border-primary/20"
              style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardHeader>
                <div className="w-12 h-12 bg-gradient-to-r from-primary to-accent rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Icon className="w-6 h-6 text-white" />
                </div>
                  <CardTitle className="text-xl font-bold text-foreground group-hover:text-primary transition-colors">
                    {service.title}
                  </CardTitle>
                  <CardDescription className="text-muted-foreground leading-relaxed">
                    {service.description}
                  </CardDescription>
                  <p className="text-sm text-foreground/80 font-medium mt-2">{service.bestFor}</p>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {service.features.map((feature) => (
                      <li key={feature} className="flex items-center text-sm text-muted-foreground">
                        <div className="w-1.5 h-1.5 bg-accent rounded-full mr-3" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <Button variant="link" className="px-0 mt-4" asChild>
                    <Link to={`/services/${service.slug}`}>Learn more</Link>
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="mt-12 text-center">
          <Button
            size="lg"
            className="bg-gradient-to-r from-primary to-accent hover:shadow-glow transition-all duration-300 group"
            onClick={scrollToContact}
          >
            Get a Tailored Solution Plan
            <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Services;