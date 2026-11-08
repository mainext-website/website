import type { ProjectCategory } from "@/lib/content";

export interface Service {
  slug: string;
  title: string;
  short: string;
  intro: string;
  bestFor: string[];
  includes: string[];
  timeline: string;
  /** Leave empty to hide the price. Example: "₹25,000" */
  startingPrice: string;
  /** Which project category to show as proof on the service page */
  proofCategory: ProjectCategory | null;
  faqs: { q: string; a: string }[];
}

export const services: Service[] = [
  {
    slug: "business-websites",
    title: "Business websites",
    short: "Fast, mobile-first websites that bring in WhatsApp and phone enquiries.",
    intro:
      "A website your customers can find on Google and trust in five seconds. Built for phones first, with enquiry buttons where people actually tap.",
    bestFor: ["Travel agencies", "Manufacturers and suppliers", "Shops and showrooms", "Clinics and services"],
    includes: [
      "Design and copy for every page",
      "WhatsApp, call and form enquiries",
      "Google Search and Maps basics",
      "Hosting setup and domain connection",
      "Easy updates after launch",
    ],
    timeline: "1–3 weeks",
    startingPrice: "",
    proofCategory: "website",
    faqs: [
      { q: "Can you redo my existing site?", a: "Yes. I keep what works, fix what doesn't, and keep your Google ranking safe during the move." },
      { q: "Do I need to write the content?", a: "No. Share what you know about your business on a call; I draft the content and you approve it." },
    ],
  },
  {
    slug: "billing-accounts-software",
    title: "Billing & accounts software",
    short: "GST invoices, stock, payments and daily accounts without Excel.",
    intro:
      "Invoice in minutes, know who owes what, and close the month without a headache. Software shaped around how your business already bills.",
    bestFor: ["Distributors and wholesalers", "Manufacturers", "Retail shops", "Multi-branch businesses"],
    includes: [
      "GST-ready invoices and print layouts",
      "Customers, products and rate lists",
      "Payments, dues and vendor balances",
      "Daily and monthly reports",
      "Data backup",
    ],
    timeline: "3–5 weeks",
    startingPrice: "",
    proofCategory: "billing",
    faqs: [
      { q: "Will it work offline or on multiple computers?", a: "Both are possible. We pick the setup that fits your shop or office." },
      { q: "Can my old data be moved in?", a: "Yes. Customer, product and opening balance data can be imported from Excel." },
    ],
  },
  {
    slug: "custom-erp",
    title: "Custom ERP",
    short: "Orders, production, stock, dispatch and staff in one system built for your process.",
    intro:
      "Off-the-shelf ERPs make you change how you work. A custom ERP follows your process, starts with what hurts most, and grows with you.",
    bestFor: ["Manufacturing units", "Trading companies", "Growing multi-branch businesses"],
    includes: [
      "Process mapping with your team",
      "Modules built in phases, most urgent first",
      "Roles and permissions",
      "Owner dashboard and reports",
      "Training and support",
    ],
    timeline: "6–12 weeks for the first phase",
    startingPrice: "",
    proofCategory: "erp",
    faqs: [
      { q: "Why not Tally or a ready-made ERP?", a: "Keep Tally for accounting if you like. A custom ERP covers the operations that ready-made tools don't fit." },
      { q: "Can we start small?", a: "Yes. Most clients start with one module and add more once it is in daily use." },
    ],
  },
  {
    slug: "web-mobile-apps",
    title: "Web & mobile apps",
    short: "From idea to launched product: web apps, Android and iOS.",
    intro: "Have an app idea or an internal tool in mind? I take it from rough idea to a working, launched product.",
    bestFor: ["Founders with a product idea", "Businesses needing a customer app", "Internal tools"],
    includes: ["Product scoping and screens", "Web, Android and iOS builds", "Admin panel", "Store publishing", "Analytics"],
    timeline: "Quoted after a call",
    startingPrice: "",
    proofCategory: "app",
    faqs: [{ q: "Who owns the code?", a: "You do. Full source code and accounts are handed over." }],
  },
  {
    slug: "ai-automation",
    title: "AI & automation",
    short: "Cut repetitive work: WhatsApp replies, auto reports, Excel to system, AI on your data.",
    intro:
      "If someone on your team does the same task every day, it can probably be automated. I connect your tools and add AI where it saves real time.",
    bestFor: ["Teams drowning in manual entry", "Businesses answering the same questions daily", "Owners wanting daily reports"],
    includes: [
      "WhatsApp and email automations",
      "Scheduled reports to your phone",
      "AI assistants trained on your documents",
      "Connections between the tools you already use",
    ],
    timeline: "1–2 weeks",
    startingPrice: "",
    proofCategory: "automation",
    faqs: [{ q: "Is my data safe with AI?", a: "Yes. I use business-grade AI services that don't train on your data, and keep access limited." }],
  },
  {
    slug: "care-plan",
    title: "Care plan",
    short: "Monthly support, backups, fixes and small changes for software already running.",
    intro: "Software needs care after launch. A care plan keeps it backed up, secure and improving, with a direct line to me.",
    bestFor: ["Existing clients", "Businesses with software built by someone else"],
    includes: ["Regular backups", "Bug fixes", "Small changes each month", "Priority WhatsApp support"],
    timeline: "Monthly",
    startingPrice: "",
    proofCategory: null,
    faqs: [{ q: "Can you support software you didn't build?", a: "Usually yes, after a short code review." }],
  },
];

/** Old URLs from the previous site, kept so existing links still land somewhere useful. */
export const legacyServiceSlugs: Record<string, string> = {
  "website-landing-systems": "business-websites",
  "business-process-automation": "ai-automation",
  "technical-support-optimization": "care-plan",
};

export const getService = (slug: string) => services.find((s) => s.slug === (legacyServiceSlugs[slug] ?? slug));

export const processSteps = [
  { title: "Free call", text: "20 minutes on WhatsApp or Meet. You explain the problem in your own words, in Tamil or English." },
  { title: "Clear quote", text: "Within 48 hours: what I'll build, the timeline and a fixed price. No surprises later." },
  { title: "Build with weekly demos", text: "You see working software every week, not just at the end." },
  { title: "Launch and support", text: "Training for your team and 30 days of free fixes after launch." },
];

export const faqs = [
  { q: "How much does a project cost?", a: "It depends on scope. After a short call you get a fixed quote in writing, broken into milestones." },
  { q: "Who owns the code and data?", a: "You do. Source code, hosting accounts and data are handed over at the end." },
  { q: "How does AI make the work better?", a: "AI handles the repetitive parts of building, like boilerplate code, test data and first drafts. That frees time for understanding your business and testing properly, and makes delivery faster." },
  { q: "Do you support the software after launch?", a: "Yes. 30 days of free fixes are included, then an optional monthly care plan." },
  { q: "Can we talk in Tamil?", a: "Yes. Calls, demos and training can be in Tamil or English." },
  { q: "Can you improve software we already have?", a: "Yes. I review what exists, keep what works and improve the rest instead of starting over by default." },
];
