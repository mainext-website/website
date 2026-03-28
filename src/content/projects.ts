import project1 from "@/assets/project-1.png";
import project2 from "@/assets/project-2.png";
import project3 from "@/assets/project-3.png";
import project4 from "@/assets/project-4.png";

export type ProjectCategory = "Full Stack" | "Web App" | "Business App" | "Automation";

export interface Project {
  id: number;
  slug: string;
  title: string;
  category: ProjectCategory;
  industry: string;
  summary: string;
  challenge: string;
  solution: string;
  outcomes: string[];
  stack: string[];
  timeline: string;
  featured: boolean;
  coverImage: string;
  liveUrl?: string;
  codeUrl?: string;
  completedAt: string;
}

export const projects: Project[] = [
  {
    id: 1,
    slug: "ec-recharge-web-app",
    title: "EC Recharge Web App",
    category: "Full Stack",
    industry: "Digital Recharge Services",
    summary:
      "A centralized recharge platform for multi-branch operations with secure static-IP request handling.",
    challenge:
      "The client had branch-level recharge flows without centralized visibility, causing delays in reconciliation and support.",
    solution:
      "Built a secure dashboard-driven system with branch controls, consolidated transactions, and role-based operations.",
    outcomes: [
      "Reduced branch reconciliation effort by 40%",
      "Improved transaction traceability across all branches",
      "Cut support turnaround time for recharge issues"
    ],
    stack: ["React", "Node.js", "SQL", "Security"],
    timeline: "6 weeks",
    featured: true,
    coverImage: project1,
    liveUrl: "https://mainext.in",
    completedAt: "2025-09"
  },
  {
    id: 2,
    slug: "mobile-service-tracker",
    title: "Mobile Service Tracker",
    category: "Web App",
    industry: "Mobile Service and Repair",
    summary:
      "A service lifecycle tracker for mobile shops to monitor intake, repair status, and customer delivery commitments.",
    challenge:
      "Manual tracking created status confusion and delayed customer updates for branch service teams.",
    solution:
      "Implemented a status workflow dashboard with searchable service history and delivery scheduling visibility.",
    outcomes: [
      "Improved daily service status visibility",
      "Reduced missed delivery commitments",
      "Enabled faster customer query resolution"
    ],
    stack: ["React", "Python", "SQL", "Dashboard"],
    timeline: "5 weeks",
    featured: true,
    coverImage: project2,
    completedAt: "2025-11"
  },
  {
    id: 3,
    slug: "invoice-generator-suite",
    title: "Invoice Generator Suite",
    category: "Business App",
    industry: "Wholesale Distribution",
    summary:
      "A custom invoice and billing workflow for distribution vendors handling frequent store-level dispatches.",
    challenge:
      "Invoice generation and edits were repetitive and error-prone when handled manually at scale.",
    solution:
      "Developed a guided invoice creation flow with printable output and vendor/customer record mapping.",
    outcomes: [
      "Reduced invoice preparation time",
      "Improved invoice consistency and audit readiness",
      "Lowered manual billing errors"
    ],
    stack: ["React", "Node.js", "PDF", "Automation"],
    timeline: "4 weeks",
    featured: true,
    coverImage: project3,
    completedAt: "2025-12"
  },
  {
    id: 4,
    slug: "mobile-shop-account-management",
    title: "Mobile Shop Account Management",
    category: "Full Stack",
    industry: "Retail Finance Operations",
    summary:
      "A money-in/money-out and vendor payment system built for multi-branch mobile retail businesses.",
    challenge:
      "Branch transactions were scattered across spreadsheets with delayed payment visibility.",
    solution:
      "Created a centralized accounts dashboard with branch-wise transaction tracking and payment flow clarity.",
    outcomes: [
      "Branch finance visibility improved for owners",
      "Faster vendor payment cycle tracking",
      "Reduced month-end reconciliation confusion"
    ],
    stack: ["React", "Python", "SQL", "Financial"],
    timeline: "6 weeks",
    featured: false,
    coverImage: project4,
    completedAt: "2026-01"
  },
  {
    id: 5,
    slug: "clinic-appointment-billing-suite",
    title: "Clinic Appointment and Billing Suite",
    category: "Web App",
    industry: "Healthcare Services",
    summary:
      "A clinic operations portal to manage appointment slots, patient queues, and billing records.",
    challenge:
      "Front-desk staff needed a single workflow for bookings, waiting list, and invoice handover.",
    solution:
      "Built a role-friendly operations panel with appointment calendar, token management, and billing updates.",
    outcomes: [
      "Reduced patient waiting desk bottlenecks",
      "Improved appointment utilization",
      "Centralized billing lookup for staff"
    ],
    stack: ["React", "Node.js", "PostgreSQL"],
    timeline: "5 weeks",
    featured: false,
    coverImage: project2,
    completedAt: "2026-02"
  },
  {
    id: 6,
    slug: "retail-inventory-sync-portal",
    title: "Retail Inventory Sync Portal",
    category: "Business App",
    industry: "Local Retail",
    summary:
      "A multi-location stock movement and reorder visibility tool for small retail operators.",
    challenge:
      "Retail teams lacked confidence in stock levels and reorder timing across branches.",
    solution:
      "Implemented daily stock sync dashboards, low-stock alerts, and transfer visibility.",
    outcomes: [
      "Improved branch stock availability planning",
      "Reduced stockout incidents",
      "Simplified reorder decisions"
    ],
    stack: ["React", "Python", "SQL", "Reporting"],
    timeline: "4 weeks",
    featured: false,
    coverImage: project1,
    completedAt: "2026-02"
  },
  {
    id: 7,
    slug: "service-request-automation-bot",
    title: "Service Request Automation Bot",
    category: "Automation",
    industry: "Customer Support Workflows",
    summary:
      "An automation pipeline that routes incoming service requests to the right team with status acknowledgements.",
    challenge:
      "Incoming requests from multiple channels caused response delays and task ownership gaps.",
    solution:
      "Designed an automated intake flow with rule-based routing and status notification tracking.",
    outcomes: [
      "Faster first response for support tickets",
      "Clearer ownership of incoming tasks",
      "Better SLA visibility for managers"
    ],
    stack: ["Node.js", "Webhook", "Automation", "Dashboard"],
    timeline: "3 weeks",
    featured: false,
    coverImage: project3,
    completedAt: "2026-03"
  }
];
