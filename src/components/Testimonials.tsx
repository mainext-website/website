import { Card, CardContent } from "@/components/ui/card";
import { Quote, Star, BadgeCheck, ExternalLink } from "lucide-react";
import { reviews } from "@/content/reviews";
import { testimonials } from "@/content/testimonials";
import { trackEvent } from "@/lib/analytics";

const formatReviewDate = (value: string) =>
  new Date(value).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric"
  });

const Testimonials = () => {
  const totalReviews = reviews.length;
  const averageRating = totalReviews
    ? (reviews.reduce((sum, review) => sum + review.rating, 0) / totalReviews).toFixed(1)
    : "0.0";

  return (
    <section className="py-24 bg-secondary/20 defer-section" id="testimonials">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Reviews and Client Feedback
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Verified social proof from project delivery and ongoing client support.
          </p>
        </div>

        <Card className="glass bg-card/60 border-primary/20 mb-10 animate-slide-up">
          <CardContent className="p-6 md:p-8 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div>
              <p className="text-sm uppercase tracking-wide text-muted-foreground mb-2">Google Review Snapshot</p>
              <div className="flex items-center gap-3">
                <div className="text-4xl font-bold text-foreground">{averageRating}</div>
                <div>
                  <div className="flex items-center gap-1">
                    {Array.from({ length: 5 }).map((_, index) => (
                      <Star
                        key={index}
                        className={`w-4 h-4 ${index < Math.round(Number(averageRating)) ? "fill-yellow-400 text-yellow-400" : "text-muted-foreground/40"}`}
                      />
                    ))}
                  </div>
                  <p className="text-sm text-muted-foreground">Based on {totalReviews} verified reviews</p>
                </div>
              </div>
            </div>

            <div className="text-sm text-muted-foreground max-w-md">
              We keep this section updated with real customer feedback. Add your latest Google review URL in the review content file to publish automatically.
            </div>
          </CardContent>
        </Card>

        <div className="mb-14">
          <h3 className="text-2xl font-semibold mb-6">Google Reviews</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {reviews.map((review, index) => (
              <Card
                key={review.id}
                className="glass bg-card/50 border-primary/20 hover:shadow-glow transition-all duration-500 animate-slide-up"
                style={{ animationDelay: `${index * 0.08}s` }}
              >
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-1">
                      {Array.from({ length: review.rating }).map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                    {review.verified ? (
                      <span className="inline-flex items-center gap-1 text-xs text-emerald-600">
                        <BadgeCheck className="w-4 h-4" />
                        Verified
                      </span>
                    ) : null}
                  </div>

                  <p className="text-muted-foreground leading-relaxed mb-5">"{review.reviewText}"</p>

                  <div className="flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-r from-primary to-accent text-white flex items-center justify-center font-semibold">
                        {review.reviewerName.charAt(0)}
                      </div>
                      <div>
                        <p className="font-semibold text-foreground leading-none">{review.reviewerName}</p>
                        <p className="text-xs text-muted-foreground mt-1">{formatReviewDate(review.date)}</p>
                      </div>
                    </div>
                    <a
                      href={review.sourceUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-sm text-primary hover:text-primary/80 transition-colors"
                      onClick={() =>
                        trackEvent("review_source_click", {
                          section: "testimonials",
                          review_id: review.id,
                          reviewer_name: review.reviewerName,
                          rating: review.rating,
                        })
                      }
                    >
                      Source
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <h3 className="text-2xl font-semibold mb-6">Client Testimonials</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card
              key={testimonial.id}
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
                    <div className="text-xs text-muted-foreground mt-1">
                      {testimonial.project} · {formatReviewDate(testimonial.date)}
                    </div>
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