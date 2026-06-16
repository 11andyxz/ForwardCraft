import type { Industry, WorkflowStep, Capability, Faq } from "@/types";

/**
 * Ten industry verticals. The delivery workflow and core capabilities are
 * shared (ForwardCraft runs one consistent delivery model), while challenges,
 * use cases, metrics, and impact are differentiated per industry.
 */

const deliveryWorkflow: WorkflowStep[] = [
  { step: 1, title: "Discover", description: "Map the highest-leverage workflows and the data that powers them." },
  { step: 2, title: "Design", description: "Scope agents, guardrails, and human approval gates against your controls." },
  { step: 3, title: "Build", description: "Integrate with source systems and ship behind your security perimeter." },
  { step: 4, title: "Evaluate", description: "Gate every release on task-specific accuracy, safety, and cost." },
  { step: 5, title: "Operate", description: "Monitor in production, retrain on edge cases, and expand coverage." },
];

const baseCapabilities: Capability[] = [
  { title: "System integration", description: "Native connectors into your core platforms and data stores.", icon: "network" },
  { title: "Governed automation", description: "Role-based permissions and audit trails on every action.", icon: "shield-check" },
  { title: "Human-in-the-loop", description: "Domain experts review edge cases and adjudicate disagreements.", icon: "users" },
  { title: "Continuous evaluation", description: "Regression gates and live drift monitoring on your tasks.", icon: "gauge" },
];

function faqsFor(name: string): Faq[] {
  return [
    {
      id: "data",
      question: `How is our ${name.toLowerCase()} data kept secure?`,
      answer:
        "Deployments run inside your security perimeter with row- and document-level access controls. Nothing is used to train shared models, and every action is logged for audit.",
    },
    {
      id: "timeline",
      question: "How long until we see production value?",
      answer:
        "Most engagements reach a governed production pilot in 8–12 weeks, with measurable payback inside the first two quarters.",
    },
    {
      id: "control",
      question: "Can our team keep control of the agents?",
      answer:
        "Yes. Workflows, prompts, and permissions are owned by your team, with approval gates on anything irreversible and a full audit trail.",
    },
  ];
}

interface Seed {
  slug: string;
  name: string;
  icon: string;
  tagline: string;
  summary: string;
  heroStat: Industry["heroStat"];
  challenges: Industry["challenges"];
  useCases: Industry["useCases"];
  impact: string;
  metrics: Industry["metrics"];
  relatedSolutions: string[];
  relatedCaseStudies: string[];
}

const seeds: Seed[] = [
  {
    slug: "asset-management",
    name: "Asset Management",
    icon: "chart-line",
    tagline: "Research at the speed of the market.",
    summary:
      "Compress research cycles and surface signal across filings, transcripts, and alternative data — without compromising compliance.",
    heroStat: { label: "Faster research cycles", value: "60%", countTo: 60, suffix: "%" },
    challenges: [
      { title: "Information overload", description: "Analysts drown in filings, transcripts, and news with no time to synthesize." },
      { title: "Fragmented data", description: "Signal is scattered across vendors, spreadsheets, and inboxes." },
      { title: "Compliance drag", description: "Every model output must be explainable and auditable." },
    ],
    useCases: [
      { title: "Filing summarization", description: "Structured briefs from 10-Ks, transcripts, and broker notes.", icon: "file-search" },
      { title: "Thesis monitoring", description: "Agents watch positions and flag thesis-breaking events.", icon: "radar" },
      { title: "Alt-data signals", description: "Normalize alternative data into comparable factors.", icon: "line-chart" },
      { title: "IC memo drafting", description: "First-draft investment memos grounded in cited sources.", icon: "file-search" },
    ],
    impact: "Analysts cover more names with deeper, fully-cited research and a defensible audit trail.",
    metrics: [
      { label: "Research time saved", value: "60%", countTo: 60, suffix: "%" },
      { label: "Names covered / analyst", value: "2.3x", countTo: 2.3, suffix: "x" },
      { label: "Citations per memo", value: "100%", countTo: 100, suffix: "%" },
      { label: "Compliance exceptions", value: "0", countTo: 0 },
    ],
    relatedSolutions: ["investment-analysis", "custom-solutions"],
    relatedCaseStudies: ["meridian-capital-research", "atlas-bank-onboarding"],
  },
  {
    slug: "banking",
    name: "Banking",
    icon: "landmark",
    tagline: "AI that survives audit season.",
    summary:
      "Automate onboarding, servicing, and compliance review with agents built for regulated environments and end-to-end auditability.",
    heroStat: { label: "Onboarding time cut", value: "73%", countTo: 73, suffix: "%" },
    challenges: [
      { title: "Manual onboarding", description: "KYC and document review are slow, repetitive, and error-prone." },
      { title: "Regulatory exposure", description: "Every decision must be explainable to regulators." },
      { title: "Legacy systems", description: "Core banking platforms resist modern automation." },
    ],
    useCases: [
      { title: "KYC automation", description: "Document extraction and verification with exception routing.", icon: "shield-check" },
      { title: "Dispute resolution", description: "Agents triage and draft resolutions for servicing teams.", icon: "headset" },
      { title: "AML review", description: "Prioritize alerts and assemble case files for investigators.", icon: "radar" },
      { title: "Statement reconciliation", description: "Reconcile transactions across systems automatically.", icon: "workflow" },
    ],
    impact: "Faster onboarding and servicing with a complete, regulator-ready audit trail on every action.",
    metrics: [
      { label: "Onboarding time", value: "-73%", countTo: 73, prefix: "-", suffix: "%" },
      { label: "Cases / reviewer", value: "3.1x", countTo: 3.1, suffix: "x" },
      { label: "Audit coverage", value: "100%", countTo: 100, suffix: "%" },
      { label: "False positives", value: "-41%", countTo: 41, prefix: "-", suffix: "%" },
    ],
    relatedSolutions: ["back-office-automation", "contact-center"],
    relatedCaseStudies: ["atlas-bank-onboarding", "northwind-claims"],
  },
  {
    slug: "consumer",
    name: "Consumer",
    icon: "shopping-bag",
    tagline: "Operations that scale with demand.",
    summary:
      "Forecast demand, automate support, and personalize experiences across millions of customers without growing headcount linearly.",
    heroStat: { label: "Support deflection", value: "48%", countTo: 48, suffix: "%" },
    challenges: [
      { title: "Spiky demand", description: "Seasonal peaks overwhelm planning and support teams." },
      { title: "Thin margins", description: "Every point of operational cost matters at scale." },
      { title: "Channel sprawl", description: "Customers expect consistency across every touchpoint." },
    ],
    useCases: [
      { title: "Demand planning", description: "SKU-level forecasts that account for promotions and weather.", icon: "line-chart" },
      { title: "Support automation", description: "Resolve common tickets end-to-end with safe escalation.", icon: "headset" },
      { title: "Catalog enrichment", description: "Generate and QA product attributes at scale.", icon: "boxes" },
      { title: "Returns triage", description: "Automate returns decisions within policy.", icon: "recycle" },
    ],
    impact: "Leaner operations that flex with demand and keep service consistent across channels.",
    metrics: [
      { label: "Support deflection", value: "48%", countTo: 48, suffix: "%" },
      { label: "Forecast error", value: "-22%", countTo: 22, prefix: "-", suffix: "%" },
      { label: "Time to enrich SKU", value: "-90%", countTo: 90, prefix: "-", suffix: "%" },
      { label: "CSAT", value: "+11pts", countTo: 11, prefix: "+", suffix: "pts" },
    ],
    relatedSolutions: ["demand-forecasting", "contact-center"],
    relatedCaseStudies: ["harborline-logistics", "vertex-retail-vision"],
  },
  {
    slug: "energy",
    name: "Energy",
    icon: "zap",
    tagline: "Intelligence for the grid and the field.",
    summary:
      "Apply forecasting and computer vision to assets, grids, and field operations — safely, and within strict regulatory bounds.",
    heroStat: { label: "Unplanned downtime", value: "-31%", countTo: 31, prefix: "-", suffix: "%" },
    challenges: [
      { title: "Aging assets", description: "Field equipment fails unpredictably and inspections are manual." },
      { title: "Volatile demand", description: "Load forecasting drives costly dispatch decisions." },
      { title: "Safety & regulation", description: "Operations must meet exacting safety standards." },
    ],
    useCases: [
      { title: "Predictive maintenance", description: "Forecast failures from sensor and inspection data.", icon: "activity" },
      { title: "Asset inspection", description: "Computer vision triages drone and field imagery.", icon: "scan-eye" },
      { title: "Load forecasting", description: "Short- and long-horizon demand forecasts.", icon: "line-chart" },
      { title: "Outage response", description: "Agents coordinate field dispatch and updates.", icon: "workflow" },
    ],
    impact: "Fewer outages, safer inspections, and tighter dispatch decisions backed by audit trails.",
    metrics: [
      { label: "Unplanned downtime", value: "-31%", countTo: 31, prefix: "-", suffix: "%" },
      { label: "Inspection throughput", value: "4x", countTo: 4, suffix: "x" },
      { label: "Forecast accuracy", value: "+18%", countTo: 18, prefix: "+", suffix: "%" },
      { label: "Safety incidents", value: "-26%", countTo: 26, prefix: "-", suffix: "%" },
    ],
    relatedSolutions: ["demand-forecasting", "computer-vision"],
    relatedCaseStudies: ["helios-energy-vision", "harborline-logistics"],
  },
  {
    slug: "healthcare",
    name: "Healthcare",
    icon: "stethoscope",
    tagline: "Lower the administrative burden of care.",
    summary:
      "Automate prior authorization, coding, and intake with clinician-in-the-loop review and HIPAA-grade controls.",
    heroStat: { label: "Prior-auth turnaround", value: "-64%", countTo: 64, prefix: "-", suffix: "%" },
    challenges: [
      { title: "Administrative load", description: "Clinicians spend hours on paperwork instead of patients." },
      { title: "Coding complexity", description: "Medical coding is error-prone and revenue-critical." },
      { title: "Strict compliance", description: "PHI demands the highest privacy and audit standards." },
    ],
    useCases: [
      { title: "Prior authorization", description: "Assemble and submit auth packets with clinician review.", icon: "shield-check" },
      { title: "Medical coding", description: "Suggest codes from notes with confidence scoring.", icon: "file-search" },
      { title: "Patient intake", description: "Structure intake forms and route to the right team.", icon: "workflow" },
      { title: "Claims status", description: "Automate payer follow-ups and status checks.", icon: "headset" },
    ],
    impact: "Clinicians reclaim time, revenue cycles tighten, and PHI stays governed end to end.",
    metrics: [
      { label: "Prior-auth turnaround", value: "-64%", countTo: 64, prefix: "-", suffix: "%" },
      { label: "Coding accuracy", value: "+9pts", countTo: 9, prefix: "+", suffix: "pts" },
      { label: "Admin hours saved", value: "12K/mo", description: "per health system" },
      { label: "PHI exposure events", value: "0", countTo: 0 },
    ],
    relatedSolutions: ["back-office-automation", "custom-solutions"],
    relatedCaseStudies: ["northwind-claims", "cobalt-pharma-evidence"],
  },
  {
    slug: "insurance",
    name: "Insurance",
    icon: "shield",
    tagline: "Underwrite and settle with confidence.",
    summary:
      "Speed up underwriting and claims with computer vision, document automation, and adjuster-in-the-loop review.",
    heroStat: { label: "Claims cycle time", value: "-57%", countTo: 57, prefix: "-", suffix: "%" },
    challenges: [
      { title: "Slow claims", description: "Manual review delays settlements and frustrates policyholders." },
      { title: "Inconsistent decisions", description: "Underwriting varies across teams and regions." },
      { title: "Fraud pressure", description: "Sophisticated fraud strains investigation teams." },
    ],
    useCases: [
      { title: "Claims triage", description: "Severity scoring and document extraction at intake.", icon: "workflow" },
      { title: "Damage assessment", description: "Computer vision estimates from photos.", icon: "scan-eye" },
      { title: "Underwriting support", description: "Risk summaries grounded in submitted documents.", icon: "file-search" },
      { title: "Fraud signals", description: "Flag anomalies for investigator review.", icon: "radar" },
    ],
    impact: "Faster, more consistent decisions with adjusters focused on the cases that need judgment.",
    metrics: [
      { label: "Claims cycle time", value: "-57%", countTo: 57, prefix: "-", suffix: "%" },
      { label: "Straight-through rate", value: "+34pts", countTo: 34, prefix: "+", suffix: "pts" },
      { label: "Leakage reduction", value: "-19%", countTo: 19, prefix: "-", suffix: "%" },
      { label: "Adjuster capacity", value: "2.6x", countTo: 2.6, suffix: "x" },
    ],
    relatedSolutions: ["computer-vision", "back-office-automation"],
    relatedCaseStudies: ["northwind-claims", "vertex-retail-vision"],
  },
  {
    slug: "life-sciences",
    name: "Life Sciences",
    icon: "flask",
    tagline: "Accelerate evidence, safely.",
    summary:
      "Automate literature review, safety reporting, and regulatory documentation with validated, traceable AI.",
    heroStat: { label: "Literature review time", value: "-70%", countTo: 70, prefix: "-", suffix: "%" },
    challenges: [
      { title: "Evidence backlog", description: "Reviewing literature and trial data is painstakingly slow." },
      { title: "Regulatory rigor", description: "Documentation must be validated and traceable." },
      { title: "Safety obligations", description: "Adverse-event processing is time-critical." },
    ],
    useCases: [
      { title: "Literature review", description: "Screen and summarize publications with citations.", icon: "file-search" },
      { title: "Pharmacovigilance", description: "Triage adverse-event reports for review.", icon: "shield-check" },
      { title: "Reg submissions", description: "Draft sections of regulatory documents.", icon: "workflow" },
      { title: "Trial matching", description: "Match patients to protocols from records.", icon: "target" },
    ],
    impact: "Evidence reaches reviewers faster with full traceability and validation built in.",
    metrics: [
      { label: "Literature review time", value: "-70%", countTo: 70, prefix: "-", suffix: "%" },
      { label: "Case processing", value: "3.4x", countTo: 3.4, suffix: "x" },
      { label: "Traceability", value: "100%", countTo: 100, suffix: "%" },
      { label: "Submission rework", value: "-38%", countTo: 38, prefix: "-", suffix: "%" },
    ],
    relatedSolutions: ["custom-solutions", "back-office-automation"],
    relatedCaseStudies: ["cobalt-pharma-evidence", "meridian-capital-research"],
  },
  {
    slug: "private-equity",
    name: "Private Equity",
    icon: "trending",
    tagline: "Diligence and value creation, accelerated.",
    summary:
      "Speed diligence and portfolio operations with agents that read data rooms, benchmark performance, and standardize reporting.",
    heroStat: { label: "Diligence cycle", value: "-55%", countTo: 55, prefix: "-", suffix: "%" },
    challenges: [
      { title: "Compressed timelines", description: "Diligence windows are short and document-heavy." },
      { title: "Portfolio sprawl", description: "Reporting differs across every portfolio company." },
      { title: "Talent leverage", description: "Deal teams are small relative to the work." },
    ],
    useCases: [
      { title: "Data-room review", description: "Extract and summarize diligence documents.", icon: "file-search" },
      { title: "Performance benchmarking", description: "Normalize KPIs across portfolio companies.", icon: "line-chart" },
      { title: "Value-creation tracking", description: "Monitor initiatives against the thesis.", icon: "radar" },
      { title: "Reporting standardization", description: "Auto-generate LP and board reporting.", icon: "workflow" },
    ],
    impact: "Deal teams move faster on diligence and run portfolios on consistent, real-time data.",
    metrics: [
      { label: "Diligence cycle", value: "-55%", countTo: 55, prefix: "-", suffix: "%" },
      { label: "Docs reviewed / hr", value: "8x", countTo: 8, suffix: "x" },
      { label: "Reporting effort", value: "-62%", countTo: 62, prefix: "-", suffix: "%" },
      { label: "Portfolio coverage", value: "100%", countTo: 100, suffix: "%" },
    ],
    relatedSolutions: ["investment-analysis", "custom-solutions"],
    relatedCaseStudies: ["meridian-capital-research", "atlas-bank-onboarding"],
  },
  {
    slug: "public-sector",
    name: "Public Sector",
    icon: "building",
    tagline: "Serve constituents at the speed they expect.",
    summary:
      "Modernize case management and constituent services with secure, transparent automation built for accountability.",
    heroStat: { label: "Case backlog", value: "-44%", countTo: 44, prefix: "-", suffix: "%" },
    challenges: [
      { title: "Service backlogs", description: "Constituent requests pile up against limited staff." },
      { title: "Legacy modernization", description: "Decades-old systems are hard to evolve." },
      { title: "Accountability", description: "Every decision must be transparent and explainable." },
    ],
    useCases: [
      { title: "Case management", description: "Triage and route constituent cases automatically.", icon: "workflow" },
      { title: "Document processing", description: "Extract data from forms and applications.", icon: "file-search" },
      { title: "Constituent services", description: "Answer questions across channels safely.", icon: "headset" },
      { title: "Benefits eligibility", description: "Assist eligibility checks within policy.", icon: "shield-check" },
    ],
    impact: "Backlogs shrink and service improves while every decision stays transparent and auditable.",
    metrics: [
      { label: "Case backlog", value: "-44%", countTo: 44, prefix: "-", suffix: "%" },
      { label: "Response time", value: "-58%", countTo: 58, prefix: "-", suffix: "%" },
      { label: "Self-service rate", value: "+29pts", countTo: 29, prefix: "+", suffix: "pts" },
      { label: "Audit coverage", value: "100%", countTo: 100, suffix: "%" },
    ],
    relatedSolutions: ["back-office-automation", "app-modernization"],
    relatedCaseStudies: ["northwind-claims", "harborline-logistics"],
  },
  {
    slug: "sports",
    name: "Sports",
    icon: "trophy",
    tagline: "Edge on and off the field.",
    summary:
      "Bring computer vision and forecasting to performance, scouting, and fan operations across the organization.",
    heroStat: { label: "Video tagging time", value: "-85%", countTo: 85, prefix: "-", suffix: "%" },
    challenges: [
      { title: "Manual video work", description: "Tagging and analyzing footage is enormously time-consuming." },
      { title: "Fragmented data", description: "Performance and fan data live in silos." },
      { title: "Tight calendars", description: "Decisions must happen between games, fast." },
    ],
    useCases: [
      { title: "Video analysis", description: "Auto-tag plays and events from game footage.", icon: "scan-eye" },
      { title: "Scouting intelligence", description: "Synthesize scouting reports and stats.", icon: "file-search" },
      { title: "Fan operations", description: "Forecast demand and automate fan support.", icon: "headset" },
      { title: "Injury insight", description: "Surface load and risk signals for staff.", icon: "activity" },
    ],
    impact: "Coaches and front offices get faster insight, and fan operations scale on game day.",
    metrics: [
      { label: "Video tagging time", value: "-85%", countTo: 85, prefix: "-", suffix: "%" },
      { label: "Scouting throughput", value: "5x", countTo: 5, suffix: "x" },
      { label: "Fan response time", value: "-49%", countTo: 49, prefix: "-", suffix: "%" },
      { label: "Insight latency", value: "Real-time" },
    ],
    relatedSolutions: ["computer-vision", "demand-forecasting"],
    relatedCaseStudies: ["vertex-retail-vision", "helios-energy-vision"],
  },
];

export const industries: Industry[] = seeds.map((s) => ({
  ...s,
  workflow: deliveryWorkflow,
  capabilities: baseCapabilities,
  faqs: faqsFor(s.name),
}));

export function getIndustry(slug: string): Industry | undefined {
  return industries.find((i) => i.slug === slug);
}
