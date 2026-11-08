import SiteLayout from "@/components/site/SiteLayout";
import Hero from "@/components/site/Hero";
import ClientMarquee from "@/components/site/ClientMarquee";
import WorkGrid from "@/components/site/WorkGrid";
import ServicesSection from "@/components/site/ServicesSection";
import WhyMe from "@/components/site/WhyMe";
import Journey from "@/components/site/Journey";
import ProductSpotlight from "@/components/site/ProductSpotlight";
import ProcessSection from "@/components/site/ProcessSection";
import Testimonials from "@/components/site/Testimonials";
import FaqSection from "@/components/site/FaqSection";
import ContactSection from "@/components/site/ContactSection";
import { featuredProjects, projects, site } from "@/lib/content";
import { useMeta } from "@/lib/useMeta";

const Index = () => {
  useMeta(
    "Mainext Innovations · Websites, ERP & Business Software by Parthiban V",
    `${site.person.name} builds websites, billing software, custom ERPs and apps for growing businesses, with an AI-first workflow and ${site.experienceYears}+ years of IT experience.`,
    "/",
  );
  const homeWork = featuredProjects.filter((p) => p.status !== "own-product");
  return (
    <SiteLayout>
      <Hero />
      <ClientMarquee />
      <WorkGrid items={homeWork} showAllLink={projects.length > homeWork.length} />
      <ServicesSection />
      <WhyMe />
      <Journey />
      <ProductSpotlight />
      <ProcessSection />
      <Testimonials />
      <FaqSection />
      <ContactSection />
    </SiteLayout>
  );
};

export default Index;
