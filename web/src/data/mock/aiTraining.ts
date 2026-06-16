import type { AiTrainingProduct, Faq } from "@/types";

function faqs(name: string): Faq[] {
  return [
    {
      id: "how",
      question: `How does ${name} fit into model development?`,
      answer:
        "It plugs into your training and release pipeline as a discrete stage, with APIs and exports that match your existing tooling.",
    },
    {
      id: "security",
      question: "How is our data handled?",
      answer:
        "Data stays within your governed environment. Reviewers operate under your policies, and nothing is reused to train shared models.",
    },
  ];
}

export const aiTrainingProducts: AiTrainingProduct[] = [
  {
    slug: "rl-environments",
    name: "RL Environments",
    icon: "orbit",
    tagline: "Train agents in faithful simulations of your work.",
    summary:
      "Reinforcement-learning environments that model your real tasks, tools, and constraints — so agents learn behaviors that transfer to production.",
    description:
      "We build high-fidelity environments that mirror the systems and rules your agents must operate within, complete with reward models, verifiers, and adversarial cases. Agents learn safe, effective policies before they ever touch production.",
    capabilities: [
      { title: "Faithful simulators", description: "Model real tools, APIs, and constraints.", icon: "circuit" },
      { title: "Reward modeling", description: "Encode what 'good' means for your task.", icon: "target" },
      { title: "Verifiers", description: "Automatic checks on agent trajectories.", icon: "shield-check" },
      { title: "Adversarial cases", description: "Stress-test against rare failures.", icon: "radar" },
    ],
    metrics: [
      { label: "Environments built", value: "500+", countTo: 500, suffix: "+" },
      { label: "Sim-to-real transfer", value: "+27pts", countTo: 27, prefix: "+", suffix: "pts" },
      { label: "Failure coverage", value: "3.5x", countTo: 3.5, suffix: "x" },
    ],
    faqs: faqs("RL Environments"),
  },
  {
    slug: "evaluations",
    name: "Evaluations",
    icon: "gauge",
    tagline: "Measure what actually matters on your tasks.",
    summary:
      "Task-specific evaluation suites — accuracy, safety, cost — that gate every model release and monitor for drift in production.",
    description:
      "Generic benchmarks don't predict production performance. We build golden sets and rubrics for your tasks, run automated and expert-graded evals, and gate releases on regressions. Live monitors flag drift before customers feel it.",
    capabilities: [
      { title: "Golden sets", description: "Curated, versioned task datasets.", icon: "database" },
      { title: "Rubric grading", description: "Expert and automated scoring.", icon: "users" },
      { title: "Regression gates", description: "Block releases that slip.", icon: "shield-check" },
      { title: "Drift monitoring", description: "Catch degradation live.", icon: "activity" },
    ],
    metrics: [
      { label: "Eval tasks", value: "2,400+", countTo: 2400, suffix: "+" },
      { label: "Releases gated", value: "100%", countTo: 100, suffix: "%" },
      { label: "Drift detection", value: "Real-time" },
    ],
    faqs: faqs("Evaluations"),
  },
  {
    slug: "expert-network",
    name: "Expert Network",
    icon: "users",
    tagline: "Specialist humans, in the loop, at scale.",
    summary:
      "A vetted network of 11,000+ domain experts who label, grade, and adjudicate the cases automation can't yet handle alone.",
    description:
      "Frontier models still need expert judgment on the hard edges. Our network spans clinicians, analysts, engineers, and adjusters — matched to your domain, bound by your policies, and integrated into your review flows with consensus and adjudication built in.",
    capabilities: [
      { title: "Domain matching", description: "Right experts for your tasks.", icon: "target" },
      { title: "Consensus flows", description: "Multiple reviews, adjudicated.", icon: "git-branch" },
      { title: "Policy binding", description: "Reviewers follow your rules.", icon: "lock" },
      { title: "Quality scoring", description: "Continuous reviewer calibration.", icon: "gauge" },
    ],
    metrics: [
      { label: "Vetted experts", value: "11K+", countTo: 11000, suffix: "+" },
      { label: "Domains", value: "40+", countTo: 40, suffix: "+" },
      { label: "Median pickup", value: "<30m" },
    ],
    faqs: faqs("Expert Network"),
  },
  {
    slug: "data-platform",
    name: "Data Platform",
    icon: "database",
    tagline: "Retrieval-ready, governed context for every model.",
    summary:
      "Connect, clean, and govern enterprise data into a grounding layer with lineage, access controls, and freshness guarantees.",
    description:
      "The Data Platform unifies your documents, systems, and events into a governed, retrieval-ready layer. Access controls, PII redaction, and lineage are built in — so models are grounded in the right facts, and only the facts they're allowed to see.",
    capabilities: [
      { title: "Connectors", description: "120+ sources out of the box.", icon: "network" },
      { title: "Governance", description: "Row/document access controls.", icon: "lock" },
      { title: "Redaction", description: "Automatic PII detection.", icon: "shield-check" },
      { title: "Lineage", description: "Trace every fact to its source.", icon: "git-branch" },
    ],
    metrics: [
      { label: "Connectors", value: "120+", countTo: 120, suffix: "+" },
      { label: "Freshness p95", value: "<2s" },
      { label: "PII redaction", value: "99.9%", countTo: 99.9, suffix: "%" },
    ],
    faqs: faqs("Data Platform"),
  },
  {
    slug: "agents",
    name: "Agents",
    icon: "cpu",
    tagline: "Production agents that take real action.",
    summary:
      "Deploy agents wired into your systems with role-based permissions, approval gates, and end-to-end audit trails.",
    description:
      "Our agent runtime turns evaluated models into systems that do work — calling tools, updating records, and coordinating handoffs. Permissions are role-based, irreversible actions require approval, and every step is logged for audit.",
    capabilities: [
      { title: "Tool use", description: "Call your systems and APIs.", icon: "settings" },
      { title: "Permissions", description: "Role-based action control.", icon: "lock" },
      { title: "Approval gates", description: "Humans confirm risky steps.", icon: "shield-check" },
      { title: "Audit trails", description: "Every action recorded.", icon: "file-search" },
    ],
    metrics: [
      { label: "Actions / week", value: "1.2M" },
      { label: "Audit coverage", value: "100%", countTo: 100, suffix: "%" },
      { label: "Uptime", value: "99.95%", countTo: 99.95, suffix: "%" },
    ],
    faqs: faqs("Agents"),
  },
];

export function getAiTrainingProduct(slug: string): AiTrainingProduct | undefined {
  return aiTrainingProducts.find((p) => p.slug === slug);
}
