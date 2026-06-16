import type { CaseStudy } from "@/types";

/** Case studies — all clients, logos, and results are mock content. */
export const caseStudies: CaseStudy[] = [
  {
    id: "cs-atlas",
    slug: "atlas-bank-onboarding",
    title: "Cutting commercial onboarding from a week to an afternoon",
    client: "Atlas Bank",
    logoId: "atlas",
    summary:
      "A regional commercial bank automated KYC and document review with audit-ready agents, cutting onboarding time by 73%.",
    industry: "banking",
    solution: "back-office-automation",
    featured: true,
    readMinutes: 6,
    challenge:
      "Commercial onboarding required reviewers to collect, verify, and re-key documents across three systems. The process took five to seven business days and every step had to be defensible to regulators.",
    approach:
      "We mapped the onboarding workflow with Process Intelligence, then deployed agents to extract and verify documents, with low-confidence cases routed to reviewers. Every action was logged through the Enterprise Agents audit layer.",
    solutionNarrative:
      "Document intake, verification, and system updates were automated end to end behind the bank's security perimeter. Reviewers shifted from data entry to exception handling, and a regression-gated evaluation suite kept extraction accuracy above the bank's threshold.",
    results: [
      { label: "Onboarding time", value: "-73%", countTo: 73, prefix: "-", suffix: "%" },
      { label: "Cases / reviewer", value: "3.1x", countTo: 3.1, suffix: "x" },
      { label: "Audit coverage", value: "100%", countTo: 100, suffix: "%" },
    ],
    testimonial: {
      id: "t-atlas-cs",
      quote: "Onboarding used to take a week. It now takes an afternoon — and every step is auditable.",
      authorName: "Daniel Okafor",
      authorTitle: "COO",
      company: "Atlas Bank",
      logoId: "atlas",
    },
  },
  {
    id: "cs-meridian",
    slug: "meridian-capital-research",
    title: "Doubling analyst coverage with cited, audit-ready research",
    client: "Meridian Capital",
    logoId: "meridian",
    summary:
      "An asset manager compressed research cycles by 60% while keeping every conclusion fully cited and compliant.",
    industry: "asset-management",
    solution: "investment-analysis",
    featured: true,
    readMinutes: 5,
    challenge:
      "Analysts spent the bulk of their week reading filings and transcripts, leaving little time for judgment. Compliance required every claim to be traceable to a source.",
    approach:
      "We deployed Investment Analysis agents grounded in the firm's licensed data, drafting cited summaries and monitoring positions for thesis-breaking events.",
    solutionNarrative:
      "Agents produced first-draft briefs with inline citations, which analysts reviewed and refined. The Data Foundation enforced entitlements so models only used licensed sources, and evaluations gated accuracy before each rollout.",
    results: [
      { label: "Research time", value: "-60%", countTo: 60, prefix: "-", suffix: "%" },
      { label: "Coverage / analyst", value: "2.3x", countTo: 2.3, suffix: "x" },
      { label: "Citation coverage", value: "100%", countTo: 100, suffix: "%" },
    ],
    testimonial: {
      id: "t-meridian-cs",
      quote: "They put agents into our research workflow, gated on evals we trust, and handed us the keys.",
      authorName: "Priya Nair",
      authorTitle: "Head of Research",
      company: "Meridian Capital",
      logoId: "meridian",
    },
  },
  {
    id: "cs-northwind",
    slug: "northwind-claims",
    title: "Settling claims 57% faster with adjusters in the loop",
    client: "Northwind Insurance",
    logoId: "northwind",
    summary:
      "A national insurer automated claims triage and damage assessment while routing judgment calls to expert adjusters.",
    industry: "insurance",
    solution: "computer-vision",
    featured: true,
    readMinutes: 7,
    challenge:
      "Manual claims review delayed settlements and produced inconsistent decisions across regions, straining both adjusters and policyholder trust.",
    approach:
      "Computer Vision estimated damage from submitted photos, agents extracted claim documents, and the Expert Network adjudicated low-confidence cases.",
    solutionNarrative:
      "Straight-through processing handled routine claims within policy, while adjusters focused on complex cases surfaced with full context. Evaluation gates and live monitors kept leakage in check.",
    results: [
      { label: "Cycle time", value: "-57%", countTo: 57, prefix: "-", suffix: "%" },
      { label: "Straight-through", value: "+34pts", countTo: 34, prefix: "+", suffix: "pts" },
      { label: "Leakage", value: "-19%", countTo: 19, prefix: "-", suffix: "%" },
    ],
    testimonial: {
      id: "t-northwind-cs",
      quote: "Claims that need judgment reach an expert in minutes, not days.",
      authorName: "Sofia Marchetti",
      authorTitle: "VP, Claims",
      company: "Northwind Insurance",
      logoId: "northwind",
    },
  },
  {
    id: "cs-harborline",
    slug: "harborline-logistics",
    title: "Forecasting that the planning team actually trusts",
    client: "Harborline Logistics",
    logoId: "harborline",
    summary:
      "A logistics operator cut forecast error by 22% and reduced carrying costs with probabilistic demand models.",
    industry: "consumer",
    solution: "demand-forecasting",
    featured: false,
    readMinutes: 5,
    challenge:
      "Planning ran on spreadsheets that went stale quickly and broke during promotions and seasonal peaks.",
    approach:
      "We built Demand Forecasting models on shipment history plus external signals, writing recommended plans back into the planning system.",
    solutionNarrative:
      "Probabilistic forecasts at the lane level replaced manual guesses, with scenario planning for peak events. Accuracy improvements built planner trust within a quarter.",
    results: [
      { label: "Forecast error", value: "-22%", countTo: 22, prefix: "-", suffix: "%" },
      { label: "Carrying cost", value: "-17%", countTo: 17, prefix: "-", suffix: "%" },
      { label: "Stockouts", value: "-28%", countTo: 28, prefix: "-", suffix: "%" },
    ],
    testimonial: {
      id: "t-harborline-cs",
      quote: "Forecasting accuracy jumped in the first quarter. The team trusts the numbers now.",
      authorName: "Marcus Lindqvist",
      authorTitle: "SVP Operations",
      company: "Harborline Logistics",
      logoId: "harborline",
    },
  },
  {
    id: "cs-vertex",
    slug: "vertex-retail-vision",
    title: "Quadrupling inspection throughput on the line",
    client: "Vertex Retail",
    logoId: "vertex",
    summary:
      "A consumer goods manufacturer scaled visual quality inspection 4x while reducing manual review load by 71%.",
    industry: "consumer",
    solution: "computer-vision",
    featured: false,
    readMinutes: 6,
    challenge:
      "Visual inspection was manual, inconsistent, and unable to keep up with line speed, letting defects slip through.",
    approach:
      "We deployed Computer Vision detection with confidence thresholds that routed uncertain frames to reviewers, gated on the manufacturer's acceptance set.",
    solutionNarrative:
      "Detection ran at line speed, escalating only ambiguous cases. Recall improved while reviewers handled a fraction of the volume.",
    results: [
      { label: "Throughput", value: "4x", countTo: 4, suffix: "x" },
      { label: "Detection recall", value: "+12pts", countTo: 12, prefix: "+", suffix: "pts" },
      { label: "Review load", value: "-71%", countTo: 71, prefix: "-", suffix: "%" },
    ],
  },
  {
    id: "cs-helios",
    slug: "helios-energy-vision",
    title: "Cutting unplanned downtime across the grid",
    client: "Helios Energy",
    logoId: "helios",
    summary:
      "A utility reduced unplanned downtime 31% with predictive maintenance and vision-based asset inspection.",
    industry: "energy",
    solution: "computer-vision",
    featured: false,
    readMinutes: 6,
    challenge:
      "Aging field assets failed unpredictably, and manual drone-image review couldn't keep pace with inspection demand.",
    approach:
      "We combined predictive maintenance forecasts with Computer Vision triage of inspection imagery, coordinating dispatch through agents.",
    solutionNarrative:
      "Failures were forecast from sensor and inspection signals, and imagery was triaged automatically. Field crews were dispatched to the right assets first.",
    results: [
      { label: "Unplanned downtime", value: "-31%", countTo: 31, prefix: "-", suffix: "%" },
      { label: "Inspection throughput", value: "4x", countTo: 4, suffix: "x" },
      { label: "Safety incidents", value: "-26%", countTo: 26, prefix: "-", suffix: "%" },
    ],
  },
  {
    id: "cs-cobalt",
    slug: "cobalt-pharma-evidence",
    title: "Compressing literature review by 70%, with full traceability",
    client: "Cobalt Pharma",
    logoId: "cobalt",
    summary:
      "A life sciences company sped evidence synthesis while keeping every output validated and traceable.",
    industry: "life-sciences",
    solution: "custom-solutions",
    featured: true,
    readMinutes: 7,
    challenge:
      "Literature review and safety reporting were slow and labor-intensive, with strict requirements for validation and traceability.",
    approach:
      "We built a Custom Solution to screen and summarize literature with citations, and to triage adverse-event reports for expert review.",
    solutionNarrative:
      "Reviewers received cited summaries and prioritized cases, cutting time-to-evidence while preserving a complete validation trail.",
    results: [
      { label: "Review time", value: "-70%", countTo: 70, prefix: "-", suffix: "%" },
      { label: "Case processing", value: "3.4x", countTo: 3.4, suffix: "x" },
      { label: "Traceability", value: "100%", countTo: 100, suffix: "%" },
    ],
  },
  {
    id: "cs-sterling",
    slug: "sterling-pe-diligence",
    title: "Compressing diligence timelines by half",
    client: "Sterling Partners",
    logoId: "sterling",
    summary:
      "A private equity firm cut diligence cycle time 55% by automating data-room review and benchmarking.",
    industry: "private-equity",
    solution: "investment-analysis",
    featured: false,
    readMinutes: 5,
    challenge:
      "Short diligence windows forced small deal teams through enormous document volumes under time pressure.",
    approach:
      "We deployed Investment Analysis agents to extract and summarize data-room documents and normalize KPIs across targets.",
    solutionNarrative:
      "Deal teams received cited summaries and comparable metrics within hours of data-room access, freeing time for judgment.",
    results: [
      { label: "Diligence cycle", value: "-55%", countTo: 55, prefix: "-", suffix: "%" },
      { label: "Docs / hour", value: "8x", countTo: 8, suffix: "x" },
      { label: "Coverage", value: "100%", countTo: 100, suffix: "%" },
    ],
  },
  {
    id: "cs-civic",
    slug: "civic-services-modernization",
    title: "Clearing a constituent case backlog by 44%",
    client: "Civic Services Agency",
    logoId: "civic",
    summary:
      "A public agency modernized case management with transparent automation, cutting its backlog and response times.",
    industry: "public-sector",
    solution: "back-office-automation",
    featured: false,
    readMinutes: 6,
    challenge:
      "Constituent requests outpaced limited staff, and legacy systems made every change risky and slow.",
    approach:
      "We automated document processing and case routing with App Modernization bridging legacy systems, keeping every decision transparent.",
    solutionNarrative:
      "Cases were triaged and routed automatically, with self-service handling common requests. All decisions remained explainable and auditable.",
    results: [
      { label: "Case backlog", value: "-44%", countTo: 44, prefix: "-", suffix: "%" },
      { label: "Response time", value: "-58%", countTo: 58, prefix: "-", suffix: "%" },
      { label: "Self-service", value: "+29pts", countTo: 29, prefix: "+", suffix: "pts" },
    ],
  },
];

export function getCaseStudy(slug: string): CaseStudy | undefined {
  return caseStudies.find((c) => c.slug === slug);
}
