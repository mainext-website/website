import SiteLayout from "@/components/site/SiteLayout";
import WorkGrid from "@/components/site/WorkGrid";
import ContactSection from "@/components/site/ContactSection";
import { projects } from "@/lib/content";
import { useMeta } from "@/lib/useMeta";

const WorkIndex = () => {
  useMeta("Work · Mainext Innovations", "Websites, billing software, ERPs and apps built by Parthiban V for real businesses.", "/work");
  return (
    <SiteLayout>
      <div className="pt-16">
        <WorkGrid
          items={projects}
          headingLevel="h1"
          eyebrow="All work"
          title="Every system, from the first one."
          intro="Websites, billing and accounts software, ERPs and apps. Most of them are still in daily use."
        />
      </div>
      <ContactSection />
    </SiteLayout>
  );
};

export default WorkIndex;
