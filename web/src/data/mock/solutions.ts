import type { Solution, WorkflowStep, Faq } from "@/types";

/** Seven cross-industry solutions, each with a full detail-page payload. */

const sharedWorkflow: WorkflowStep[] = [
  { step: 1, title: "Assess", description: "Quantify the workflow's volume, cost, and error profile." },
  { step: 2, title: "Integrate", description: "Wire into source systems behind your security perimeter." },
  { step: 3, title: "Pilot", description: "Run a governed pilot with human approval gates." },
  { step: 4, title: "Evaluate", description: "Gate the release on accuracy, safety, and cost." },
  { step: 5, title: "Scale", description: "Expand coverage and hand operations to your team." },
];

function faqsFor(name: string): Faq[] {
  return [
    {
      id: "fit",
      question: `Is ${name} a fit for our stack?`,
      answer:
        "We integrate with your existing systems through native connectors and APIs. There is no rip-and-replace — agents operate on top of what you already run.",
    },
    {
      id: "accuracy",
      question: "How do you guarantee quality?",
      answer:
        "Every release is gated on task-specific evaluations, and domain experts review edge cases. Live monitors catch drift in production.",
    },
    {
      id: "ownership",
      question: "Who owns the solution afterward?",
      answer:
        "You do. Workflows, prompts, and permissions are documented and handed to your team, with ongoing support available.",
    },
  ];
}

interface Seed {
  slug: string;
  name: string;
  category: string;
  icon: string;
  tagline: string;
  summary: string;
  painPoints: Solution["painPoints"];
  description: string;
  capabilities: Solution["capabilities"];
  outcomes: Solution["outcomes"];
  metrics: Solution["metrics"];
  caseStudySlug?: string;
  relatedIndustries: string[];
}

const seeds: Seed[] = [
  {
    slug: "back-office-automation",
    name: "Back-office Automation",
    category: "Automate",
    icon: "workflow",
    tagline: "Clear the queue without growing the team.",
    summary: "Automate document-heavy operations — intake, review, reconciliation — with governed agents and human approval gates.",
    painPoints: [
      { title: "Repetitive manual work", description: "Teams spend days on copy-paste between systems." },
      { title: "Backlogs", description: "Volume outpaces headcount during peaks." },
      { title: "Error and rework", description: "Manual handling introduces costly mistakes." },
    ],
    description:
      "Back-office Automation maps your operational workflows, then deploys agents that read documents, update systems, and route exceptions to people. Everything runs within your controls, with a full audit trail on every action.",
    capabilities: [
      { title: "Document intake", description: "Extract structured data from any document.", icon: "file-search" },
      { title: "System updates", description: "Write back to core systems via connectors.", icon: "network" },
      { title: "Exception routing", description: "Escalate low-confidence cases to humans.", icon: "users" },
      { title: "Audit logging", description: "Every action is logged and reversible.", icon: "shield-check" },
    ],
    outcomes: [
      { title: "Lower cost to serve", description: "Handle more volume per person." },
      { title: "Faster cycle times", description: "Cut turnaround from days to hours." },
      { title: "Fewer errors", description: "Consistent, policy-bound handling." },
    ],
    metrics: [
      { label: "Cycle-time reduction", value: "-68%", countTo: 68, prefix: "-", suffix: "%" },
      { label: "Cost to serve", value: "-44%", countTo: 44, prefix: "-", suffix: "%" },
      { label: "Straight-through rate", value: "+39pts", countTo: 39, prefix: "+", suffix: "pts" },
    ],
    caseStudySlug: "atlas-bank-onboarding",
    relatedIndustries: ["banking", "healthcare", "public-sector"],
  },
  {
    slug: "computer-vision",
    name: "Computer Vision",
    category: "Decide",
    icon: "scan-eye",
    tagline: "Turn images and video into decisions.",
    summary: "Inspect, classify, and measure from imagery and video — with expert review where it counts.",
    painPoints: [
      { title: "Manual inspection", description: "Visual review is slow and inconsistent." },
      { title: "Volume", description: "Imagery accumulates faster than teams can process." },
      { title: "Edge cases", description: "Rare defects are easy to miss." },
    ],
    description:
      "Computer Vision pipelines detect, classify, and measure objects and conditions from photos and video. Confidence thresholds route uncertain cases to expert reviewers, and every model is gated on your acceptance criteria before release.",
    capabilities: [
      { title: "Detection & classification", description: "Identify objects, defects, and conditions.", icon: "eye" },
      { title: "Measurement", description: "Estimate dimensions and severity.", icon: "target" },
      { title: "Expert review", description: "Route uncertain frames to reviewers.", icon: "users" },
      { title: "Evaluation gates", description: "Validate against your acceptance set.", icon: "gauge" },
    ],
    outcomes: [
      { title: "Higher throughput", description: "Process imagery at machine speed." },
      { title: "Consistent quality", description: "Standardize visual judgments." },
      { title: "Earlier detection", description: "Catch issues before they escalate." },
    ],
    metrics: [
      { label: "Inspection throughput", value: "4x", countTo: 4, suffix: "x" },
      { label: "Detection recall", value: "+12pts", countTo: 12, prefix: "+", suffix: "pts" },
      { label: "Review load", value: "-71%", countTo: 71, prefix: "-", suffix: "%" },
    ],
    caseStudySlug: "vertex-retail-vision",
    relatedIndustries: ["insurance", "energy", "sports"],
  },
  {
    slug: "contact-center",
    name: "Contact Center",
    category: "Automate",
    icon: "headset",
    tagline: "Resolve more, escalate the right things.",
    summary: "Deflect routine contacts and assist agents in real time, with safe handoff to people.",
    painPoints: [
      { title: "High volume", description: "Routine questions dominate agent time." },
      { title: "Inconsistent answers", description: "Quality varies across agents and shifts." },
      { title: "Long handle times", description: "Agents hunt across systems for answers." },
    ],
    description:
      "Contact Center automation resolves common requests end to end and gives live agents grounded suggestions on harder ones. Sensitive or low-confidence interactions hand off cleanly to humans with full context.",
    capabilities: [
      { title: "Self-service resolution", description: "Handle routine contacts safely.", icon: "headset" },
      { title: "Agent assist", description: "Real-time grounded suggestions.", icon: "sparkles" },
      { title: "Safe escalation", description: "Hand off with full context.", icon: "users" },
      { title: "Quality monitoring", description: "Score every interaction.", icon: "gauge" },
    ],
    outcomes: [
      { title: "Higher deflection", description: "Resolve more without an agent." },
      { title: "Shorter handle times", description: "Agents answer faster." },
      { title: "Better CSAT", description: "Consistent, accurate responses." },
    ],
    metrics: [
      { label: "Contact deflection", value: "48%", countTo: 48, suffix: "%" },
      { label: "Handle time", value: "-33%", countTo: 33, prefix: "-", suffix: "%" },
      { label: "CSAT", value: "+11pts", countTo: 11, prefix: "+", suffix: "pts" },
    ],
    caseStudySlug: "harborline-logistics",
    relatedIndustries: ["consumer", "banking", "public-sector"],
  },
  {
    slug: "demand-forecasting",
    name: "Demand Forecasting",
    category: "Decide",
    icon: "line-chart",
    tagline: "Plan with signal, not gut feel.",
    summary: "Probabilistic forecasts at the granularity you operate on — SKU, store, region, or asset.",
    painPoints: [
      { title: "Spreadsheet planning", description: "Forecasts are manual and quickly stale." },
      { title: "Demand volatility", description: "Promotions and events break naive models." },
      { title: "Costly errors", description: "Over- and under-stocking erode margin." },
    ],
    description:
      "Demand Forecasting builds probabilistic models on your history plus external signals — promotions, weather, events — and delivers forecasts and recommended actions into your planning systems.",
    capabilities: [
      { title: "Granular forecasts", description: "SKU/store/region level detail.", icon: "line-chart" },
      { title: "External signals", description: "Incorporate weather, events, promos.", icon: "radar" },
      { title: "Scenario planning", description: "Compare what-if scenarios.", icon: "git-branch" },
      { title: "System write-back", description: "Push plans to your tools.", icon: "network" },
    ],
    outcomes: [
      { title: "Lower forecast error", description: "Tighten plans against reality." },
      { title: "Less waste", description: "Reduce overstock and spoilage." },
      { title: "Better availability", description: "Avoid stockouts on demand." },
    ],
    metrics: [
      { label: "Forecast error", value: "-22%", countTo: 22, prefix: "-", suffix: "%" },
      { label: "Inventory carrying", value: "-17%", countTo: 17, prefix: "-", suffix: "%" },
      { label: "Stockout rate", value: "-28%", countTo: 28, prefix: "-", suffix: "%" },
    ],
    caseStudySlug: "harborline-logistics",
    relatedIndustries: ["consumer", "energy", "sports"],
  },
  {
    slug: "custom-solutions",
    name: "Custom Solutions",
    category: "Build",
    icon: "puzzle",
    tagline: "When the workflow is uniquely yours.",
    summary: "Bespoke agents and pipelines engineered to your domain, data, and controls.",
    painPoints: [
      { title: "Off-the-shelf gaps", description: "Generic tools miss your domain specifics." },
      { title: "Integration complexity", description: "Your stack is unique and interconnected." },
      { title: "Build vs. buy", description: "Internal teams lack AI delivery capacity." },
    ],
    description:
      "When your problem doesn't fit a template, we engineer it. Custom Solutions pairs our delivery team with your experts to design, build, and operate bespoke AI systems — grounded in your data and governed by your controls.",
    capabilities: [
      { title: "Discovery & design", description: "Scope the problem and the payback.", icon: "target" },
      { title: "Bespoke engineering", description: "Build to your domain and stack.", icon: "settings" },
      { title: "Eval frameworks", description: "Define success on your terms.", icon: "gauge" },
      { title: "Managed operation", description: "Run it until your team owns it.", icon: "shield-check" },
    ],
    outcomes: [
      { title: "Fit-for-purpose", description: "Built exactly to your workflow." },
      { title: "Faster delivery", description: "Skip the internal ramp-up." },
      { title: "Owned by you", description: "Documented and transferred." },
    ],
    metrics: [
      { label: "Time to production", value: "8–12 wk", description: "typical pilot" },
      { label: "Avg. payback", value: "4.2x", countTo: 4.2, suffix: "x" },
      { label: "Solutions shipped", value: "300+", countTo: 300, suffix: "+" },
    ],
    caseStudySlug: "cobalt-pharma-evidence",
    relatedIndustries: ["life-sciences", "private-equity", "asset-management"],
  },
  {
    slug: "app-modernization",
    name: "App Modernization",
    category: "Automate",
    icon: "recycle",
    tagline: "Modernize legacy without the rewrite risk.",
    summary: "Wrap, migrate, and automate legacy applications with AI-assisted engineering.",
    painPoints: [
      { title: "Legacy lock-in", description: "Critical systems are old and brittle." },
      { title: "Tribal knowledge", description: "Few people understand the code." },
      { title: "Migration risk", description: "Big-bang rewrites routinely fail." },
    ],
    description:
      "App Modernization uses AI-assisted engineering to document, refactor, and incrementally migrate legacy applications — reducing risk by automating the understanding and translation work that bottlenecks every project.",
    capabilities: [
      { title: "Code understanding", description: "Map and document legacy systems.", icon: "file-search" },
      { title: "Assisted refactor", description: "Modernize modules incrementally.", icon: "git-branch" },
      { title: "Test generation", description: "Build safety nets before changes.", icon: "shield-check" },
      { title: "Integration layer", description: "Bridge old and new systems.", icon: "network" },
    ],
    outcomes: [
      { title: "Lower risk", description: "Incremental, tested migration." },
      { title: "Faster delivery", description: "Automate the tedious work." },
      { title: "Knowledge captured", description: "Documentation as a byproduct." },
    ],
    metrics: [
      { label: "Migration timeline", value: "-45%", countTo: 45, prefix: "-", suffix: "%" },
      { label: "Test coverage", value: "+52pts", countTo: 52, prefix: "+", suffix: "pts" },
      { label: "Incidents post-cutover", value: "-60%", countTo: 60, prefix: "-", suffix: "%" },
    ],
    caseStudySlug: "atlas-bank-onboarding",
    relatedIndustries: ["public-sector", "banking", "insurance"],
  },
  {
    slug: "investment-analysis",
    name: "Investment Analysis",
    category: "Decide",
    icon: "file-search",
    tagline: "From data room to decision, faster.",
    summary: "Synthesize filings, transcripts, and data rooms into cited, decision-ready analysis.",
    painPoints: [
      { title: "Document overload", description: "Diligence and research bury analysts." },
      { title: "Citation burden", description: "Every claim must be traceable." },
      { title: "Time pressure", description: "Decisions can't wait for manual review." },
    ],
    description:
      "Investment Analysis reads the documents your analysts can't get to, extracting comparable metrics and drafting cited summaries — so teams spend their time on judgment, not retrieval.",
    capabilities: [
      { title: "Document synthesis", description: "Summarize filings and transcripts.", icon: "file-search" },
      { title: "Metric extraction", description: "Pull comparable KPIs at scale.", icon: "line-chart" },
      { title: "Cited drafting", description: "Every claim links to a source.", icon: "shield-check" },
      { title: "Monitoring", description: "Watch positions for new signals.", icon: "radar" },
    ],
    outcomes: [
      { title: "More coverage", description: "Analysts cover more names." },
      { title: "Full traceability", description: "Audit every conclusion." },
      { title: "Faster decisions", description: "Compress research cycles." },
    ],
    metrics: [
      { label: "Research time", value: "-60%", countTo: 60, prefix: "-", suffix: "%" },
      { label: "Coverage / analyst", value: "2.3x", countTo: 2.3, suffix: "x" },
      { label: "Citation coverage", value: "100%", countTo: 100, suffix: "%" },
    ],
    caseStudySlug: "meridian-capital-research",
    relatedIndustries: ["asset-management", "private-equity", "banking"],
  },
];

export const solutions: Solution[] = seeds.map((s) => ({
  ...s,
  workflow: sharedWorkflow,
  faqs: faqsFor(s.name),
}));

export function getSolution(slug: string): Solution | undefined {
  return solutions.find((s) => s.slug === slug);
}
