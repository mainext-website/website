export interface Testimonial {
  id: number;
  name: string;
  role: string;
  company: string;
  content: string;
  rating: number;
  date: string;
  project: string;
}

export const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Gandhi",
    role: "Business Owner",
    company: "Eclipse Innerwear",
    content:
      "Outstanding service. The invoice management system streamlined our distribution process and reduced manual confusion for our team.",
    rating: 5,
    date: "2025-12-05",
    project: "Invoice Generator Suite"
  },
  {
    id: 2,
    name: "Logu",
    role: "Shop Owner",
    company: "Sakthi Mobiles",
    content:
      "The service tracking app improved how we handle repairs. Customers receive clearer updates and our front desk runs smoother.",
    rating: 5,
    date: "2026-01-18",
    project: "Mobile Service Tracker"
  },
  {
    id: 3,
    name: "MK Logu",
    role: "Manager",
    company: "Sakthi Mobiles",
    content:
      "Their recharge platform simplified multi-branch operations. The dashboard gave us clear control over daily transactions.",
    rating: 5,
    date: "2026-02-10",
    project: "EC Recharge Web App"
  }
];
