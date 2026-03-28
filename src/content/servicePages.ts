export type ServicePageSection = {
  title: string;
  description: string;
  points: string[];
};

export type ServicePageContent = {
  slug: string;
  title: string;
  shortDescription: string;
  heroDescription: string;
  bestFor: string[];
  outcomes: string[];
  process: string[];
  deliverables: string[];
  faqs: ServicePageSection[];
};

export const servicePages: ServicePageContent[] = [
  {
    slug: "website-landing-systems",
    title: "Website and Landing Systems",
    shortDescription: "Conversion-focused websites that improve trust, visibility, and lead generation.",
    heroDescription:
      "We design and build growth-ready websites that are fast, mobile-first, and structured to convert real business inquiries.",
    bestFor: ["Startups", "Local businesses", "Service providers", "Personal brands"],
    outcomes: [
      "Clear positioning in the first screen",
      "Better lead quality from contact flow",
      "Improved mobile usability and page speed",
      "SEO-ready metadata and schema baseline",
    ],
    process: [
      "Discovery workshop and content mapping",
      "Wireframe and UI direction approval",
      "Development, QA, and responsive hardening",
      "Deployment, analytics setup, and handoff",
    ],
    deliverables: [
      "Production-ready website",
      "Section-level conversion copy",
      "Analytics event instrumentation",
      "Technical documentation for updates",
    ],
    faqs: [
      {
        title: "How long does this usually take?",
        description: "Typical delivery timeline depends on content readiness and revision rounds.",
        points: ["1 to 2 weeks for focused landing pages", "2 to 4 weeks for full portfolio/business sites"],
      },
      {
        title: "Can you improve an existing site instead of rebuilding?",
        description: "Yes, when the existing structure is salvageable and aligned with your goals.",
        points: ["Audit-first approach", "Prioritized refactor roadmap", "Preserves SEO equity where possible"],
      },
    ],
  },
  {
    slug: "business-process-automation",
    title: "Business Process Automation",
    shortDescription: "Workflow automation that reduces repetitive work and improves operational reliability.",
    heroDescription:
      "We automate repetitive workflows and integrate your tools so your team spends less time on manual tasks and more time on growth.",
    bestFor: ["Operations teams", "Founders managing repeat tasks", "Support-heavy workflows", "Data entry pipelines"],
    outcomes: [
      "Reduced manual data entry",
      "Faster turnaround time across teams",
      "Lower error rates in recurring processes",
      "Clear visibility through connected reporting",
    ],
    process: [
      "Process mapping and bottleneck identification",
      "Integration and automation architecture",
      "Implementation with staged rollout",
      "Monitoring and optimization",
    ],
    deliverables: [
      "Automation workflows",
      "Third-party integrations",
      "Error handling and fallback paths",
      "Usage documentation and training notes",
    ],
    faqs: [
      {
        title: "Will automation replace current tools?",
        description: "Usually no. We connect and streamline your current stack first.",
        points: ["Tool-agnostic approach", "Minimal disruption rollout", "Optional migration only when needed"],
      },
      {
        title: "How do we track automation success?",
        description: "We define measurable outcomes before implementation.",
        points: ["Saved hours per week", "Error reduction", "Process completion time"],
      },
    ],
  },
  {
    slug: "technical-support-optimization",
    title: "Technical Support and Optimization",
    shortDescription: "Focused engineering support to improve speed, stability, and delivery confidence.",
    heroDescription:
      "We help teams improve application performance and reliability with practical engineering support, faster fixes, and maintainable delivery practices.",
    bestFor: ["Growing products", "Teams with backlog pressure", "Performance issues", "Legacy code maintenance"],
    outcomes: [
      "Faster page and API response time",
      "Reduced production incidents",
      "More predictable release cycles",
      "Cleaner code quality for future scaling",
    ],
    process: [
      "Technical audit and priority matrix",
      "Sprint-based optimization execution",
      "Performance and quality validation",
      "Documentation and handover",
    ],
    deliverables: [
      "Issue resolution backlog",
      "Performance tuning updates",
      "Refactoring recommendations",
      "Support plan with SLAs",
    ],
    faqs: [
      {
        title: "Can this run alongside our internal team?",
        description: "Yes, this support model is built for collaboration.",
        points: ["Works with your existing sprint cycle", "Shared backlog visibility", "Clear ownership boundaries"],
      },
      {
        title: "Do you provide ongoing support?",
        description: "Yes, retainer and milestone-based support options are both available.",
        points: ["Weekly support windows", "Priority issue handling", "Monthly optimization reviews"],
      },
    ],
  },
];

export const getServicePageBySlug = (slug: string) => servicePages.find((service) => service.slug === slug);