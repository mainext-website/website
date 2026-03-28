import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { processSteps } from "@/content/process";

const Process = () => {
  return (
    <section className="py-24 bg-background defer-section" id="process">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              How We Deliver Projects
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            A clear step-by-step delivery model so you know exactly what happens from first discussion to launch and beyond.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {processSteps.map((item, index) => (
            <Card
              key={item.id}
              className="glass bg-card/50 border-primary/20 hover:shadow-glow transition-all duration-500 animate-slide-up"
              style={{ animationDelay: `${index * 0.08}s` }}
            >
              <CardHeader>
                <p className="text-sm uppercase tracking-wide text-primary font-semibold">{item.step}</p>
                <CardTitle className="text-2xl">{item.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed mb-5">{item.description}</p>
                <ul className="space-y-2">
                  {item.deliverables.map((deliverable) => (
                    <li key={deliverable} className="flex items-center text-sm text-muted-foreground">
                      <span className="w-1.5 h-1.5 bg-accent rounded-full mr-3" />
                      {deliverable}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Process;
