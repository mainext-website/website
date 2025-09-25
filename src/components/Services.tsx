import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Globe, Database, Brain, Smartphone, Palette, Zap } from "lucide-react";

const services = [
  {
    icon: Globe,
    title: "React Development",
    description: "Modern UI development with React for responsive, interactive web applications.",
    features: ["Component Architecture", "State Management", "Responsive Design", "Performance"]
  },
  {
    icon: Database,
    title: "Python & Node.js",
    description: "Scalable backend APIs using Python and Node.js with robust data management solutions.",
    features: ["REST APIs", "Database Design", "Authentication", "Scalable Architecture"]
  },
  {
    icon: Database,
    title: "SQL & Database",
    description: "Robust data management with SQL databases for reliable and efficient data operations.",
    features: ["Database Design", "Query Optimization", "Data Security", "Migration"]
  },
  {
    icon: Globe,
    title: "AWS Cloud",
    description: "Cloud deployment and infrastructure management for scalable, reliable applications.",
    features: ["Server Setup", "Auto Scaling", "Security", "Monitoring"]
  },
  {
    icon: Brain,
    title: "AI Integration",
    description: "Smart features integration in applications using modern AI technologies.",
    features: ["Machine Learning", "Natural Language", "Automation", "Smart Analytics"]
  },
  {
    icon: Zap,
    title: "Custom Solutions",
    description: "Tailored web applications designed specifically for your business needs.",
    features: ["Business Logic", "Custom Features", "Integration", "Support"]
  }
];

const Services = () => {
  return (
    <section className="py-24 bg-secondary/20" id="services">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Our Services
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            We offer comprehensive digital solutions to bring your vision to life
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
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Services;