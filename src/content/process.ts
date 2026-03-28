export type ProcessStep = {
  id: string;
  step: string;
  title: string;
  description: string;
  deliverables: string[];
};

export const processSteps: ProcessStep[] = [
  {
    id: "discovery",
    step: "Step 1",
    title: "Discovery and Scope",
    description:
      "We understand your goals, audience, current gaps, and delivery constraints before writing any code.",
    deliverables: [
      "Requirement summary",
      "Execution plan with milestones",
      "Feature and timeline alignment"
    ]
  },
  {
    id: "build",
    step: "Step 2",
    title: "Design and Build",
    description:
      "We design practical user flows and build a solution focused on conversion, speed, and maintainability.",
    deliverables: [
      "UI implementation",
      "Core feature development",
      "Internal review checkpoints"
    ]
  },
  {
    id: "launch",
    step: "Step 3",
    title: "Test and Launch",
    description:
      "Before launch, we run quality checks, fix issues, and ensure the final output is stable on real devices.",
    deliverables: [
      "Cross-device QA",
      "Deployment and go-live",
      "Post-launch sanity checks"
    ]
  },
  {
    id: "support",
    step: "Step 4",
    title: "Support and Iterate",
    description:
      "After launch, we continue improving based on feedback, analytics, and business priorities.",
    deliverables: [
      "Performance and reliability fixes",
      "Feature iteration support",
      "Ongoing technical guidance"
    ]
  }
];
