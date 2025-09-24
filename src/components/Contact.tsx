import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, Phone, MapPin, Send, MessageSquare, User } from "lucide-react";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    projectDetails: "",
  });
  const [webhookUrl, setWebhookUrl] = useState("");
  const [googleFormUrl, setGoogleFormUrl] = useState("https://docs.google.com/forms/d/e/1FAIpQLSc4wmIqa_tsA_Vl0obncIhREjDFf7ypMLil8R5y_8nLxG9eOQ/formResponse");
  const [showWebhookInput, setShowWebhookInput] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    console.log("Waitlist submission:", formData);

    try {
      const promises = [];

      // Send to Google Form if provided
      if (googleFormUrl) {
        const formDataToSend = new FormData();
        // Note: Replace these entry IDs with your actual Google Form field IDs
        formDataToSend.append('entry.1053242332', formData.name);
        formDataToSend.append('entry.1200181153', formData.email);
        formDataToSend.append('entry.554465849', formData.projectDetails);

        promises.push(
          fetch(googleFormUrl, {
            method: "POST",
            mode: "no-cors",
            body: formDataToSend,
          })
        );
      }

      // Wait for all submissions to complete
      if (promises.length > 0) {
        await Promise.all(promises);
      }

      let successMessage = "You'll be notified when we launch!";
      if (webhookUrl && googleFormUrl) {
        successMessage = "Data sent to both Zapier and Google Forms. You'll receive notifications!";
      } else if (webhookUrl) {
        successMessage = "Zapier webhook triggered. You'll receive email notifications!";
      } else if (googleFormUrl) {
        successMessage = "Response saved to Google Forms. You'll be notified!";
      }

      toast({
        title: "Successfully joined the waitlist!",
        description: successMessage,
      });
    } catch (error) {
      console.error("Error submitting form:", error);
      toast({
        title: "Joined waitlist",
        description: "Submission recorded. Please check your integration settings.",
        variant: "destructive",
      });
    }

    setIsSubmitted(true);
    setIsLoading(false);
    setFormData({ name: "", email: "", projectDetails: "" });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <section className="py-24 bg-secondary/20" id="contact">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Get In Touch
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Ready to start your next project? Let's discuss how we can bring your ideas to life.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div className="space-y-8 animate-slide-up">
            <Card className="glass bg-card/50 border-primary/20 hover:shadow-glow transition-all duration-500">
              <CardHeader>
                <CardTitle className="text-2xl font-bold mb-4 text-primary">Let's Work Together</CardTitle>
                <CardDescription className="text-muted-foreground text-lg leading-relaxed">
                  We're here to help you transform your digital vision into reality.
                  Reach out to discuss your project requirements and get a personalized quote.
                </CardDescription>
              </CardHeader>
            </Card>

            <div className="space-y-6">
              <div className="flex items-center gap-4 p-4 glass bg-card/50 rounded-lg border border-primary/20 hover:shadow-glow transition-all duration-300">
                <div className="w-12 h-12 bg-gradient-to-r from-primary to-accent rounded-lg flex items-center justify-center">
                  <Mail className="w-6 h-6 text-white" />
                </div>
                <div>
                  <div className="font-medium text-foreground">Email</div>
                  <div className="text-muted-foreground">mainextinnovations@gmail.com</div>
                </div>
              </div>

              <div className="flex items-center gap-4 p-4 glass bg-card/50 rounded-lg border border-primary/20 hover:shadow-glow transition-all duration-300">
                <div className="w-12 h-12 bg-gradient-to-r from-primary to-accent rounded-lg flex items-center justify-center">
                  <Phone className="w-6 h-6 text-white" />
                </div>
                <div>
                  <div className="font-medium text-foreground">Phone</div>
                  <div className="text-muted-foreground">+91 75022 87204</div>
                </div>
              </div>

              <div className="flex items-center gap-4 p-4 glass bg-card/50 rounded-lg border border-primary/20 hover:shadow-glow transition-all duration-300">
                <div className="w-12 h-12 bg-gradient-to-r from-primary to-accent rounded-lg flex items-center justify-center">
                  <MapPin className="w-6 h-6 text-white" />
                </div>
                <div>
                  <div className="font-medium text-foreground">Location</div>
                  <div className="text-muted-foreground">India & Global Remote</div>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <Card className="glass bg-card/50 border-primary/20 hover:shadow-glow transition-all duration-500 animate-slide-up" style={{ animationDelay: '0.2s' }}>
            <CardHeader>
              <CardTitle className="text-xl font-bold flex items-center gap-2">
                <MessageSquare className="w-5 h-5 text-primary" />
                Send us a message
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-left block">Full Name</Label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                      <Input
                        id="name"
                        name="name"
                        type="text"
                        placeholder="Enter your name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        className="pl-10"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-left block">Email Address</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="Enter your email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className="pl-10"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-left block">Tell about your projects</Label>
                    <div className="relative">
                      <Input
                        id="projectDetails"
                        name="projectDetails"
                        type="text"
                        // placeholder="Enter your email"
                        value={formData.projectDetails}
                        onChange={handleInputChange}
                      // required
                      // className="pl-10"
                      />
                      {/* <Textarea
                        // placeholder="Tell us about your project..."
                        id="subject"
                        name="subject"
                        value={formData.projectDetails}
                      // onChange={handleInputChange}
                      // className="bg-background/50 border-primary/30 focus:border-primary transition-colors min-h-[120px]"
                      /> */}
                    </div>
                  </div>
                </div>

                <Button
                  type="submit"
                  size="lg"
                  className="w-full bg-gradient-to-r from-primary to-accent hover:shadow-glow transition-all duration-300 group"
                  disabled={isLoading}
                >
                  {isLoading ? "Submitting..." : "Send Message"}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default Contact;