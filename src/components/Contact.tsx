import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, Phone, MapPin, Send, MessageSquare, User } from "lucide-react";
import { Label } from "@/components/ui/label";
import { useRef, useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { trackEvent } from "@/lib/analytics";

type SubmitState = "idle" | "success" | "error";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    projectType: "",
    budgetRange: "",
    timeline: "",
    projectDetails: "",
    website: "",
  });
  const googleFormUrl = "https://docs.google.com/forms/d/e/1FAIpQLSc4wmIqa_tsA_Vl0obncIhREjDFf7ypMLil8R5y_8nLxG9eOQ/formResponse";
  const [isLoading, setIsLoading] = useState(false);
  const [submitState, setSubmitState] = useState<SubmitState>("idle");
  const hasTrackedFormStart = useRef(false);
  const { toast } = useToast();

  const handleFormStart = () => {
    if (hasTrackedFormStart.current) {
      return;
    }

    hasTrackedFormStart.current = true;
    trackEvent("form_start", {
      section: "contact",
      form_name: "project_inquiry",
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    trackEvent("form_submit", {
      section: "contact",
      form_name: "project_inquiry",
      project_type: formData.projectType || "not_specified",
      budget_range: formData.budgetRange || "not_specified",
      timeline: formData.timeline || "not_specified",
    });

    setIsLoading(true);
    setSubmitState("idle");

    // Honeypot field should stay empty in real user submissions.
    if (formData.website.trim().length > 0) {
      setIsLoading(false);
      setSubmitState("success");
      setFormData({
        name: "",
        email: "",
        company: "",
        projectType: "",
        budgetRange: "",
        timeline: "",
        projectDetails: "",
        website: "",
      });
      return;
    }

    console.log("Project inquiry submission:", formData);

    try {
      if (googleFormUrl) {
        const formDataToSend = new FormData();
        const formattedRequirements = [
          `Project Type: ${formData.projectType || "Not specified"}`,
          `Budget Range: ${formData.budgetRange || "Not specified"}`,
          `Timeline: ${formData.timeline || "Not specified"}`,
          "",
          formData.projectDetails,
        ].join("\n");

        formDataToSend.append('entry.1053242332', formData.name);
        formDataToSend.append('entry.1200181153', formData.email);
        formDataToSend.append('entry.1544500804', formData.company);
        formDataToSend.append('entry.554465849', formattedRequirements);

        await fetch(googleFormUrl, {
          method: "POST",
          mode: "no-cors",
          body: formDataToSend,
        });
      }

      setSubmitState("success");
      trackEvent("form_submit_success", {
        section: "contact",
        form_name: "project_inquiry",
        project_type: formData.projectType || "not_specified",
      });

      toast({
        title: "Inquiry sent successfully",
        description: "Thanks for reaching out. Mainext will get back to you within 24 hours.",
      });
    } catch (error) {
      console.error("Error submitting form:", error);
      setSubmitState("error");
      trackEvent("form_submit_error", {
        section: "contact",
        form_name: "project_inquiry",
      });
      toast({
        title: "Submission issue",
        description: "We could not submit your inquiry right now. Please email mainextinnovations@gmail.com.",
        variant: "destructive",
      });
    }

    setIsLoading(false);
    setFormData({
      name: "",
      email: "",
      company: "",
      projectType: "",
      budgetRange: "",
      timeline: "",
      projectDetails: "",
      website: "",
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSelectChange = (field: "projectType" | "budgetRange" | "timeline", value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  return (
    <section className="py-24 bg-secondary/20 defer-section" id="contact">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Let&apos;s Build Your Next Project
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Share your requirements and goals. We will respond with a practical solution approach within 24 hours.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div className="space-y-8 animate-slide-up">
            <Card className="glass bg-card/50 border-primary/20 hover:shadow-glow transition-all duration-500">
              <CardHeader>
                <CardTitle className="text-2xl font-bold mb-4 text-primary">Let's Work Together</CardTitle>
                <CardDescription className="text-muted-foreground text-lg leading-relaxed">
                  From websites to automation workflows, we build reliable digital solutions that support measurable business growth.
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
                Project Inquiry Form
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} onFocusCapture={handleFormStart} className="space-y-6">
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
                    <Label htmlFor="company" className="text-left block">Company / Brand Name</Label>
                    <div className="relative">
                      <Input
                        id="company"
                        name="company"
                        type="text"
                        placeholder="Your business name"
                        value={formData.company}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="projectType" className="text-left block">Project Type</Label>
                    <Select
                      value={formData.projectType}
                      onValueChange={(value) => handleSelectChange("projectType", value)}
                    >
                      <SelectTrigger id="projectType">
                        <SelectValue placeholder="Select project type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="business-website">Business Website</SelectItem>
                        <SelectItem value="landing-page">Landing Page</SelectItem>
                        <SelectItem value="dashboard-webapp">Dashboard / Web App</SelectItem>
                        <SelectItem value="automation-workflow">Automation Workflow</SelectItem>
                        <SelectItem value="support-optimization">Support / Optimization</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="budgetRange" className="text-left block">Budget Range</Label>
                    <Select
                      value={formData.budgetRange}
                      onValueChange={(value) => handleSelectChange("budgetRange", value)}
                    >
                      <SelectTrigger id="budgetRange">
                        <SelectValue placeholder="Select budget range" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="below-25k">Below INR 25,000</SelectItem>
                        <SelectItem value="25k-50k">INR 25,000 - 50,000</SelectItem>
                        <SelectItem value="50k-100k">INR 50,000 - 1,00,000</SelectItem>
                        <SelectItem value="100k-plus">Above INR 1,00,000</SelectItem>
                        <SelectItem value="not-sure">Not Sure Yet</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="timeline" className="text-left block">Preferred Timeline</Label>
                    <Select
                      value={formData.timeline}
                      onValueChange={(value) => handleSelectChange("timeline", value)}
                    >
                      <SelectTrigger id="timeline">
                        <SelectValue placeholder="Select timeline" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="asap">ASAP (Start immediately)</SelectItem>
                        <SelectItem value="2-4-weeks">2 to 4 weeks</SelectItem>
                        <SelectItem value="1-2-months">1 to 2 months</SelectItem>
                        <SelectItem value="2-plus-months">More than 2 months</SelectItem>
                        <SelectItem value="flexible">Flexible timeline</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="projectDetails" className="text-left block">Project Requirements</Label>
                    <Textarea
                        id="projectDetails"
                        name="projectDetails"
                        placeholder="Tell us your project goals, timeline, and current challenges"
                        value={formData.projectDetails}
                        onChange={handleInputChange}
                        className="min-h-[120px]"
                    />
                  </div>

                  <div className="hidden" aria-hidden="true">
                    <Label htmlFor="website">Website</Label>
                    <Input
                      id="website"
                      name="website"
                      type="text"
                      tabIndex={-1}
                      autoComplete="off"
                      value={formData.website}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>

                {submitState === "success" && (
                  <p className="text-sm text-green-600 dark:text-green-400">
                    Inquiry submitted. We typically reply within 24 hours.
                  </p>
                )}

                {submitState === "error" && (
                  <p className="text-sm text-destructive">
                    Submission failed. Please email mainextinnovations@gmail.com directly.
                  </p>
                )}

                <p className="text-sm text-muted-foreground">
                  Prefer email directly? Write to mainextinnovations@gmail.com. Response SLA: within 24 hours.
                </p>

                <Button
                  type="submit"
                  size="lg"
                  className="w-full bg-gradient-to-r from-primary to-accent hover:shadow-glow transition-all duration-300 group"
                  disabled={isLoading}
                >
                  <Send className="w-4 h-4 mr-2" />
                  {isLoading ? "Submitting..." : "Submit Project Inquiry"}
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