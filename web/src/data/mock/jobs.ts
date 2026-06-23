import type { Job } from "@/types";

/** Open roles — mock listings used by the careers search/filter UI. */

interface Seed {
  slug: string;
  title: string;
  department: string;
  location: string;
  type: Job["type"];
  remote: boolean;
  postedAt: string;
  summary: string;
}

const seeds: Seed[] = [
  { slug: "senior-ml-engineer", title: "Senior ML Engineer", department: "Engineering", location: "New York, NY", type: "Full-time", remote: false, postedAt: "2026-06-09", summary: "Build the agent runtime and evaluation systems behind production deployments." },
  { slug: "forward-deployed-engineer", title: "Forward Deployed Engineer", department: "Delivery", location: "San Francisco, CA", type: "Full-time", remote: false, postedAt: "2026-06-05", summary: "Embed with enterprise clients to integrate and ship AI into their systems." },
  { slug: "applied-research-scientist", title: "Applied Research Scientist", department: "Research", location: "Remote — Americas", type: "Full-time", remote: true, postedAt: "2026-06-01", summary: "Advance evaluation and RL-environment methods that transfer to real work." },
  { slug: "product-designer", title: "Product Designer", department: "Design", location: "London, UK", type: "Full-time", remote: false, postedAt: "2026-05-28", summary: "Design the platform surfaces enterprises use to own and operate their AI." },
  { slug: "solutions-architect", title: "Solutions Architect", department: "Delivery", location: "Remote — EMEA", type: "Full-time", remote: true, postedAt: "2026-05-22", summary: "Scope and architect bespoke solutions across regulated industries." },
  { slug: "security-engineer", title: "Security Engineer", department: "Security", location: "New York, NY", type: "Full-time", remote: false, postedAt: "2026-05-18", summary: "Own the controls that let regulated enterprises deploy with confidence." },
  { slug: "data-platform-engineer", title: "Data Platform Engineer", department: "Engineering", location: "Bangalore, India", type: "Full-time", remote: false, postedAt: "2026-05-15", summary: "Build the governed, retrieval-ready data layer that grounds every model." },
  { slug: "expert-network-lead", title: "Expert Network Operations Lead", department: "Operations", location: "Remote — Global", type: "Full-time", remote: true, postedAt: "2026-05-11", summary: "Scale reviewer matching, quality scoring, and adjudication flows." },
  { slug: "enterprise-account-executive", title: "Enterprise Account Executive", department: "Go-to-Market", location: "Singapore", type: "Full-time", remote: false, postedAt: "2026-05-07", summary: "Partner with enterprise leaders to move them from pilots to production." },
  { slug: "technical-program-manager", title: "Technical Program Manager", department: "Delivery", location: "Toronto, Canada", type: "Full-time", remote: false, postedAt: "2026-05-03", summary: "Drive complex, multi-team deployments to measurable outcomes." },
  { slug: "ml-eval-intern", title: "ML Evaluation Intern", department: "Research", location: "Remote — Americas", type: "Internship", remote: true, postedAt: "2026-04-29", summary: "Help build golden sets and grading rubrics for enterprise tasks." },
  { slug: "frontend-engineer", title: "Frontend Engineer", department: "Engineering", location: "Berlin, Germany", type: "Full-time", remote: false, postedAt: "2026-04-25", summary: "Craft the operator-facing product UI used to run agent fleets." },
  { slug: "people-partner", title: "People Partner", department: "People", location: "New York, NY", type: "Full-time", remote: false, postedAt: "2026-04-21", summary: "Support the teams behind every deployment as we scale globally." },
  { slug: "contract-vision-specialist", title: "Computer Vision Specialist (Contract)", department: "Delivery", location: "Remote — Global", type: "Contract", remote: true, postedAt: "2026-04-17", summary: "Deliver vision pipelines for inspection and assessment use cases." },
];

const seededJobs: Job[] = seeds.map((s) => ({
  id: s.slug,
  slug: s.slug,
  title: s.title,
  department: s.department,
  location: s.location,
  type: s.type,
  remote: s.remote,
  postedAt: s.postedAt,
  summary: s.summary,
  responsibilities: [
    `Own ${s.title.toLowerCase()} outcomes end to end, from scoping to production.`,
    "Collaborate across delivery, research, and security to ship governed systems.",
    "Instrument your work so impact is measurable against a baseline.",
    "Raise the quality bar through evaluation, review, and documentation.",
  ],
  requirements: [
    "5+ years of relevant experience (less for internship/contract roles).",
    "A track record of shipping real systems, not just prototypes.",
    "Strong written communication and a bias toward ownership.",
    "Comfort operating in regulated, security-conscious environments.",
  ],
  niceToHave: [
    "Experience with enterprise AI or workflow automation.",
    "Domain expertise in a regulated industry.",
    "Familiarity with evaluation and human-in-the-loop systems.",
  ],
}));

/**
 * Fully-specified role (real content, not the shared template above).
 * Location / employment type / department are defaults — adjust as needed.
 */
const technicalProductAnalyst: Job = {
  id: "technical-product-analyst",
  slug: "technical-product-analyst",
  title: "Technical Product Analyst — AI & Market Intelligence Platform",
  department: "Product",
  location: "Remote — Americas",
  type: "Full-time",
  remote: true,
  postedAt: "2026-06-23",
  summary:
    "Help build an AI-powered market intelligence platform — turning fragmented public and alternative data into structured datasets, AI research workflows, dashboards, and product-ready intelligence.",
  about: [
    "The Technical Product Analyst supports the development of an AI-powered market intelligence and data analytics platform — helping turn fragmented public data, alternative data, product information, digital activity, and market-related content into structured datasets, internal analytics, dashboard prototypes, AI-assisted research workflows, and product-ready intelligence outputs.",
    "This is a full-cycle technical product role spanning product research, data source evaluation, data collection, data processing, analytics logic design, AI workflow testing, dashboard prototyping, documentation, and weekly product iteration. The role does not involve trade execution, portfolio management, investment advisory services, or handling client assets.",
  ],
  responsibilities: [
    "Product research & intelligence system design — define use cases for the platform across public market information, alternative data, product/category trends, online activity, news/media content, and business intelligence signals.",
    "Data source discovery & evaluation — identify, evaluate, and document APIs, public datasets, website data, product data, and social/media data that may support platform features.",
    "Data collection & processing — build and maintain lightweight collection/processing workflows in Python, SQL, APIs, and automation; clean, validate, normalize, and organize data for analysis and product use.",
    "AI-assisted analysis workflows — design and test workflows for information extraction, topic classification, summarization, sentiment analysis, entity tagging, market-brief generation, and QC of AI outputs.",
    "Analytics logic & insight generation — develop frameworks that turn raw data into insights: trend monitoring, event tracking, category analysis, signal interpretation, and structured market-intelligence summaries.",
    "Dashboard & product prototype development — support internal dashboards, front-end prototypes, reporting interfaces, and visualization tools that present data and insights in a product-ready format.",
    "Technical documentation — document product requirements, data schemas, source assumptions, processing logic, AI workflow design, dashboard features, limitations, and future improvements.",
    "Weekly product deliverables — submit weekly progress updates covering product research, code, data pipelines, dashboard improvements, AI workflow testing, documentation, and next steps.",
    "Cross-functional product support — work with your supervisor to translate business needs into product requirements, technical tasks, prototype features, and measurable weekly deliverables.",
  ],
  requirements: [
    "Bachelor's or Master's in a STEM field — Financial Engineering, Mathematics, Computer Science, Data Science, Statistics, Engineering, or a related quantitative discipline.",
    "Experience with Python, SQL, data analysis, APIs, automation, or software/product development.",
    "Strong quantitative, analytical, and technical problem-solving ability.",
    "Ability to work across the full product lifecycle: research, data processing, product design, analytics, documentation, and iteration.",
    "Ability to communicate technical progress clearly through written updates and documentation.",
    "Interest in AI products, market intelligence systems, alternative data, business intelligence, and data-driven software platforms.",
  ],
  niceToHave: [
    "Experience with financial data, market data, alternative data, product analytics, or digital platform analytics.",
    "Experience with FastAPI, Flask, Streamlit, React, JavaScript, SQLite, PostgreSQL, or similar tools.",
    "Familiarity with LLM applications, prompt testing, AI evaluation workflows, text classification, summarization, or automated reporting.",
    "Prior experience in quantitative research, market risk analytics, dashboard development, data products, or technical product prototyping.",
  ],
  deliverables: [
    "Product research notes and platform feature proposals.",
    "Data source documentation and data-quality reviews.",
    "Python scripts, SQL queries, API integrations, or automation tools.",
    "Cleaned and structured datasets for internal use.",
    "AI workflow testing notes, prompt evaluation results, or classification/summarization outputs.",
    "Dashboard prototypes, reporting interfaces, or data visualization updates.",
    "Weekly written summaries of completed work, technical challenges, supervisor feedback, and next-step plans.",
  ],
};

export const jobs: Job[] = [technicalProductAnalyst, ...seededJobs];

export const departments = Array.from(new Set(jobs.map((j) => j.department))).sort();
export const jobLocations = Array.from(new Set(jobs.map((j) => j.location))).sort();

export function getJob(slug: string): Job | undefined {
  return jobs.find((j) => j.slug === slug);
}
