import type { PlatformModule } from "@/types";

/**
 * The five composable building blocks of the ForwardCraft platform. Names and
 * copy are original mock content.
 */
export const platformModules: PlatformModule[] = [
  {
    id: "data-foundation",
    name: "Data Foundation",
    kicker: "Ingest & ground",
    shortDescription: "Connect, clean, and govern the data your agents reason over.",
    description:
      "A governed data layer that unifies documents, systems, and events into retrieval-ready context. Lineage, access controls, and freshness guarantees are built in — so models are grounded in the right facts and nothing they shouldn't see.",
    icon: "database",
    metrics: [
      { label: "Connectors", value: "120+", countTo: 120, suffix: "+" },
      { label: "Indexing latency", value: "<2s", description: "p95 freshness" },
      { label: "PII redaction", value: "99.9%", countTo: 99.9, suffix: "%" },
    ],
    capabilities: [
      "Source connectors for warehouses, SaaS, and file stores",
      "Row- and document-level access controls",
      "Automatic PII detection and redaction",
      "Lineage and freshness tracking",
    ],
    diagram: { nodes: ["Sources", "Normalize", "Govern", "Index", "Context API"] },
    href: "/ai-training/data-platform",
  },
  {
    id: "process-intelligence",
    name: "Process Intelligence",
    kicker: "Map & measure",
    shortDescription: "Turn how work actually happens into models agents can act on.",
    description:
      "Process Intelligence observes real operational flows — tickets, approvals, handoffs — and renders them as measurable, editable workflows. It surfaces where time and money leak, then targets automation where the payback is provable.",
    icon: "workflow",
    metrics: [
      { label: "Cycle-time visibility", value: "100%", countTo: 100, suffix: "%" },
      { label: "Avg. payback", value: "4.2x", countTo: 4.2, suffix: "x" },
      { label: "Steps mapped", value: "8.4M", description: "across deployments" },
    ],
    capabilities: [
      "Process mining from system logs",
      "Bottleneck and rework detection",
      "Opportunity scoring by ROI",
      "Editable workflow blueprints",
    ],
    diagram: { nodes: ["Observe", "Mine", "Score", "Blueprint", "Automate"] },
    href: "/solutions/back-office-automation",
  },
  {
    id: "expert-network",
    name: "Expert Network",
    kicker: "Humans in the loop",
    shortDescription: "Specialist reviewers that grade, correct, and harden models.",
    description:
      "A vetted network of domain experts — clinicians, analysts, claims adjusters — who label edge cases, adjudicate disagreements, and keep quality high where automation alone is not enough. Reviewers are matched to your domain and bound by your policies.",
    icon: "users",
    metrics: [
      { label: "Vetted experts", value: "11K+", countTo: 11000, suffix: "+" },
      { label: "Domains", value: "40+", countTo: 40, suffix: "+" },
      { label: "Review SLA", value: "<30m", description: "median pickup" },
    ],
    capabilities: [
      "Domain-matched reviewer pools",
      "Consensus and adjudication flows",
      "Policy- and rubric-driven grading",
      "Continuous quality scoring",
    ],
    diagram: { nodes: ["Route", "Review", "Adjudicate", "Score", "Feedback"] },
    href: "/ai-training/expert-network",
  },
  {
    id: "ai-evaluation",
    name: "AI Evaluation",
    kicker: "Trust & verify",
    shortDescription: "Continuous evals that gate every model before it ships.",
    description:
      "Offline and online evaluation harnesses that measure accuracy, safety, and cost on your tasks — not generic benchmarks. Regression gates block releases that slip, and live monitors catch drift before customers do.",
    icon: "gauge",
    metrics: [
      { label: "Eval tasks", value: "2,400+", countTo: 2400, suffix: "+" },
      { label: "Regression gate", value: "100%", countTo: 100, suffix: "%", description: "of releases" },
      { label: "Drift alerts", value: "Real-time" },
    ],
    capabilities: [
      "Task-specific golden sets",
      "Safety and hallucination checks",
      "Release regression gating",
      "Live drift and cost monitoring",
    ],
    diagram: { nodes: ["Golden set", "Run", "Score", "Gate", "Monitor"] },
    href: "/ai-training/evaluations",
  },
  {
    id: "enterprise-agents",
    name: "Enterprise Agents",
    kicker: "Deploy & operate",
    shortDescription: "Production agents wired into your systems and controls.",
    description:
      "Agents that take real actions in your stack — with role-based permissions, full audit trails, and human approval gates on anything irreversible. Deployed behind your VPC, observable end to end, and owned by your team.",
    icon: "cpu",
    metrics: [
      { label: "Actions / week", value: "1.2M", description: "in production" },
      { label: "Audit coverage", value: "100%", countTo: 100, suffix: "%" },
      { label: "Uptime", value: "99.95%", countTo: 99.95, suffix: "%" },
    ],
    capabilities: [
      "Tool and system integrations",
      "Role-based action permissions",
      "Human approval gates",
      "End-to-end audit logging",
    ],
    diagram: { nodes: ["Plan", "Permit", "Act", "Approve", "Audit"] },
    href: "/ai-training/agents",
  },
];
