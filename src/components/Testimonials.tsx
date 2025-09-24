import { Card, CardContent } from "@/components/ui/card";
import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    name: "Gandhi",
    role: "Business Owner",
    company: "Eclipse Innerwear",
    content: "Outstanding service! The invoice management system they built has streamlined our entire distribution process. Their attention to detail and technical expertise is remarkable.",
    rating: 5,
    image: "/api/placeholder/60/60"
  },
  {
    name: "Logu",
    role: "Shop Owner",
    company: "Sakthi Mobiles",
    content: "The service tracking app has revolutionized how we manage mobile repairs. Customers love the real-time updates, and we've seen significant improvement in our workflow efficiency.",
    rating: 5,
    image: "/api/placeholder/60/60"
  },
  {
    name: "MK Logu",
    role: "Manager",
    company: "Sakthi Mobiles",
    content: "Their recharge platform handles our multi-branch operations flawlessly. The centralized dashboard and secure API integration exceeded our expectations. Highly recommended!",
    rating: 5,
    image: "/api/placeholder/60/60"
  }
];

const Testimonials = () => {
  return (
    <section className="py-24 bg-secondary/20" id="testimonials">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              What Our Clients Say
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Don't just take our word for it - hear from our satisfied clients
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card
              key={testimonial.name}
              className="glass bg-card/50 border-primary/20 hover:shadow-glow transition-all duration-500 animate-slide-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardContent className="p-6">
                <div className="flex items-center gap-1 mb-4">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>

                <div className="relative mb-6">
                  <Quote className="absolute -top-2 -left-2 w-8 h-8 text-primary/20" />
                  <p className="text-muted-foreground leading-relaxed pl-6">
                    "{testimonial.content}"
                  </p>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-primary to-accent rounded-full flex items-center justify-center">
                    <span className="text-white font-bold text-lg">
                      {testimonial.name.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <div className="font-semibold text-foreground">{testimonial.name}</div>
                    <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                    <div className="text-xs text-primary">{testimonial.company}</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;