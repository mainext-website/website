import { Link, useParams } from "react-router-dom";
import { ArrowLeft, ArrowRight, CheckCircle2 } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getServicePageBySlug } from "@/content/servicePages";
import { getScrollBehavior } from "@/lib/utils";

const ServiceLanding = () => {
  const { slug } = useParams();
  const service = slug ? getServicePageBySlug(slug) : undefined;

  const scrollToContact = () => {
    document.getElementById("contact")?.scrollIntoView({ behavior: getScrollBehavior() });
  };

  if (!service) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <main className="container mx-auto px-6 pt-28 pb-24">
          <Card className="max-w-2xl mx-auto border-primary/20 bg-card/70">
            <CardHeader>
              <CardTitle className="text-2xl">Service page not found</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                The requested service page is not available yet. You can return to the main page and continue from there.
              </p>
              <Button asChild>
                <Link to="/">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Home
                </Link>
              </Button>
            </CardContent>
          </Card>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <section className="pt-28 pb-16 bg-secondary/20">
          <div className="container mx-auto px-6 max-w-5xl">
            <Link to="/#services" className="inline-flex items-center text-sm text-primary hover:underline mb-6">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Services
            </Link>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">{service.title}</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl">{service.heroDescription}</p>
            <div className="mt-8 flex flex-col sm:flex-row gap-3">
              <Button onClick={scrollToContact} className="bg-gradient-to-r from-primary to-accent">
                Discuss Your Requirements
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
              <Button variant="outline" asChild>
                <Link to="/">View Full Portfolio</Link>
              </Button>
            </div>
          </div>
        </section>

        <section className="py-16" id="contact">
          <div className="container mx-auto px-6 max-w-5xl grid grid-cols-1 lg:grid-cols-2 gap-8">
            <Card className="border-primary/20 bg-card/60">
              <CardHeader>
                <CardTitle>Best fit for</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {service.bestFor.map((item) => (
                    <li key={item} className="flex items-start text-muted-foreground">
                      <CheckCircle2 className="w-4 h-4 mr-2 mt-1 text-primary" />
                      {item}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card className="border-primary/20 bg-card/60">
              <CardHeader>
                <CardTitle>Expected outcomes</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {service.outcomes.map((item) => (
                    <li key={item} className="flex items-start text-muted-foreground">
                      <CheckCircle2 className="w-4 h-4 mr-2 mt-1 text-accent" />
                      {item}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card className="border-primary/20 bg-card/60">
              <CardHeader>
                <CardTitle>Delivery process</CardTitle>
              </CardHeader>
              <CardContent>
                <ol className="space-y-3 list-decimal pl-5 text-muted-foreground">
                  {service.process.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ol>
              </CardContent>
            </Card>

            <Card className="border-primary/20 bg-card/60">
              <CardHeader>
                <CardTitle>What you get</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {service.deliverables.map((item) => (
                    <li key={item} className="flex items-start text-muted-foreground">
                      <CheckCircle2 className="w-4 h-4 mr-2 mt-1 text-primary" />
                      {item}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        </section>

        <section className="pb-24">
          <div className="container mx-auto px-6 max-w-5xl">
            <h2 className="text-2xl md:text-3xl font-bold mb-6">Common questions</h2>
            <div className="space-y-4">
              {service.faqs.map((faq) => (
                <Card key={faq.title} className="border-primary/20 bg-card/60">
                  <CardHeader>
                    <CardTitle className="text-xl">{faq.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <p className="text-muted-foreground">{faq.description}</p>
                    <ul className="space-y-2">
                      {faq.points.map((point) => (
                        <li key={point} className="flex items-start text-muted-foreground">
                          <CheckCircle2 className="w-4 h-4 mr-2 mt-1 text-accent" />
                          {point}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default ServiceLanding;