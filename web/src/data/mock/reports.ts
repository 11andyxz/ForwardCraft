import type { Article } from "@/types";

function body(intro: string): Article["body"] {
  return [
    { heading: "Executive summary", paragraphs: [intro, "Mock report content for a design reference build — used to populate the report detail template."] },
    { heading: "Key findings", paragraphs: ["Enterprises that gate releases on task-specific evaluations report markedly higher trust in production systems.", "Integration depth — not model choice — is the strongest predictor of sustained value."] },
    { heading: "Methodology", paragraphs: ["Findings are illustrative and synthetic. In a real report this section would describe sample, instruments, and limitations."] },
  ];
}

export const reports: Article[] = [
  {
    id: "rep-state-2026",
    slug: "state-of-enterprise-ai-2026",
    kind: "report",
    title: "The State of Enterprise AI 2026",
    excerpt: "How 400 enterprises are moving from pilots to governed production — benchmarks and patterns.",
    category: "Benchmark",
    author: "ForwardCraft Research",
    publishedAt: "2026-05-01",
    readMinutes: 18,
    featured: true,
    body: body("Adoption is no longer the question. Operationalization is."),
    tags: ["benchmark", "adoption"],
  },
  {
    id: "rep-roi",
    slug: "roi-benchmarks-back-office-automation",
    kind: "report",
    title: "ROI Benchmarks: Back-office Automation",
    excerpt: "Cycle-time, cost, and quality benchmarks across 120 automation deployments.",
    category: "Benchmark",
    author: "ForwardCraft Research",
    publishedAt: "2026-03-15",
    readMinutes: 14,
    body: body("Automation payback clusters tightly when deployments are scoped to a measurable baseline."),
    tags: ["roi", "automation"],
  },
  {
    id: "rep-trust",
    slug: "building-trust-in-production-agents",
    kind: "report",
    title: "Building Trust in Production Agents",
    excerpt: "The controls regulated enterprises require before agents take action.",
    category: "Governance",
    author: "ForwardCraft Research",
    publishedAt: "2026-02-01",
    readMinutes: 16,
    featured: true,
    body: body("Trust in autonomous systems is engineered, not assumed."),
    tags: ["governance", "trust", "agents"],
  },
  {
    id: "rep-finserv",
    slug: "ai-in-financial-services-2026",
    kind: "report",
    title: "AI in Financial Services 2026",
    excerpt: "Where banks, insurers, and asset managers are deploying — and what's working.",
    category: "Industry",
    author: "ForwardCraft Research",
    publishedAt: "2026-01-12",
    readMinutes: 15,
    body: body("Financial services lead on governance maturity and lag on speed-to-production."),
    tags: ["finance", "industry"],
  },
  {
    id: "rep-vision",
    slug: "computer-vision-in-operations",
    kind: "report",
    title: "Computer Vision in Operations",
    excerpt: "Throughput and quality outcomes from vision deployments across industries.",
    category: "Industry",
    author: "ForwardCraft Research",
    publishedAt: "2025-12-04",
    readMinutes: 12,
    body: body("Vision delivers most where confidence thresholds route the hard frames to experts."),
    tags: ["computer-vision", "operations"],
  },
  {
    id: "rep-talent",
    slug: "ai-talent-and-the-expert-network",
    kind: "report",
    title: "AI Talent and the Expert Network Model",
    excerpt: "How enterprises augment scarce expertise with vetted reviewer networks.",
    category: "Workforce",
    author: "ForwardCraft Research",
    publishedAt: "2025-11-06",
    readMinutes: 11,
    body: body("Expertise, not labeling capacity, is the binding constraint on quality."),
    tags: ["workforce", "expert-network"],
  },
];

export function getReport(slug: string): Article | undefined {
  return reports.find((r) => r.slug === slug);
}
