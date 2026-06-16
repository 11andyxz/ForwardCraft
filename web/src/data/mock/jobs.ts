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

export const jobs: Job[] = seeds.map((s) => ({
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

export const departments = Array.from(new Set(jobs.map((j) => j.department))).sort();
export const jobLocations = Array.from(new Set(jobs.map((j) => j.location))).sort();

export function getJob(slug: string): Job | undefined {
  return jobs.find((j) => j.slug === slug);
}
