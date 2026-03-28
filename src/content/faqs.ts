export type FaqItem = {
  id: string;
  question: string;
  answer: string;
};

export const faqs: FaqItem[] = [
  {
    id: "timeline",
    question: "How long does a typical project take?",
    answer:
      "Most website and automation projects are delivered in 2 to 8 weeks depending on scope, integrations, and review cycles. We share a milestone-based timeline before starting."
  },
  {
    id: "pricing",
    question: "How do you price projects?",
    answer:
      "Pricing is based on outcome and complexity, not only development hours. We finalize scope first, then provide a transparent quote with clear deliverables."
  },
  {
    id: "support",
    question: "Do you provide support after launch?",
    answer:
      "Yes. We provide post-launch support for fixes, optimization, and planned improvements. You can choose one-time delivery or ongoing support."
  },
  {
    id: "small-business",
    question: "Do you work with small businesses and freelancers?",
    answer:
      "Yes. Mainext is built to support small and growing businesses that need practical digital systems to improve visibility and operations."
  },
  {
    id: "existing-system",
    question: "Can you improve an existing website or system instead of building from scratch?",
    answer:
      "Absolutely. We can audit your current system, retain what is working, and upgrade only the areas that impact performance, conversion, or maintainability."
  },
  {
    id: "communication",
    question: "How will we communicate during the project?",
    answer:
      "We keep communication simple with regular progress updates and milestone demos. You will always know what is complete, what is next, and what is pending."
  }
];
