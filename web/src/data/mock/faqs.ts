import type { Faq } from "@/types";

/** Homepage FAQ — enterprise buyer objections. */
export const homeFaqs: Faq[] = [
  {
    id: "production",
    question: "How is this different from a pilot that never ships?",
    answer:
      "We optimize for the last mile. Engagements are scoped to reach governed production — integrated into your systems, gated on evals, and operated until your team takes ownership.",
  },
  {
    id: "security",
    question: "Where does our data live, and is it used to train models?",
    answer:
      "Deployments run inside your security perimeter with granular access controls. Your data is never used to train shared models, and every action is logged for audit.",
  },
  {
    id: "control",
    question: "Do we keep control of the agents?",
    answer:
      "Yes. You own the workflows, prompts, and permissions. Irreversible actions require human approval, and you can pause or roll back any deployment.",
  },
  {
    id: "roi",
    question: "How do you measure ROI?",
    answer:
      "Before we build, we baseline the workflow's cost, cycle time, and error rate. Every deployment reports against that baseline, so payback is provable.",
  },
  {
    id: "stack",
    question: "Do we have to replace our existing systems?",
    answer:
      "No. We integrate on top of what you run through native connectors and APIs. There is no rip-and-replace requirement.",
  },
  {
    id: "timeline",
    question: "How long until we see value?",
    answer:
      "Most engagements reach a governed production pilot in 8–12 weeks, with measurable impact inside the first two quarters.",
  },
];
