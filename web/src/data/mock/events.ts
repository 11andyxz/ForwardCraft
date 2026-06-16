import type { EventItem } from "@/types";

/** Upcoming and recent events — mock content. */
export const events: EventItem[] = [
  {
    id: "e-summit",
    slug: "enterprise-ai-summit-2026",
    title: "Enterprise AI Summit 2026",
    type: "Conference",
    date: "2026-09-17",
    location: "New York, NY",
    mode: "In person",
    summary: "A day on putting AI into governed production, with practitioners from regulated industries.",
    registerHref: "/contact",
  },
  {
    id: "e-webinar-evals",
    slug: "webinar-evaluation-as-release-gate",
    title: "Webinar: Evaluation as a release gate",
    type: "Webinar",
    date: "2026-07-09",
    location: "Online",
    mode: "Virtual",
    summary: "How to wire task-specific evaluations into your release pipeline.",
    registerHref: "/contact",
  },
  {
    id: "e-roundtable-finserv",
    slug: "finserv-ai-roundtable-london",
    title: "FinServ AI Roundtable",
    type: "Roundtable",
    date: "2026-07-23",
    location: "London, UK",
    mode: "In person",
    summary: "An invite-only discussion on AI governance for financial services leaders.",
    registerHref: "/contact",
  },
  {
    id: "e-workshop-agents",
    slug: "workshop-governing-production-agents",
    title: "Workshop: Governing production agents",
    type: "Workshop",
    date: "2026-08-05",
    location: "Online",
    mode: "Virtual",
    summary: "A hands-on session on permissions, approval gates, and audit trails for agents.",
    registerHref: "/contact",
  },
  {
    id: "e-healthcare",
    slug: "healthcare-ai-forum-singapore",
    title: "Healthcare AI Forum",
    type: "Conference",
    date: "2026-10-14",
    location: "Singapore",
    mode: "Hybrid",
    summary: "Reducing administrative burden in care with clinician-in-the-loop AI.",
    registerHref: "/contact",
  },
  {
    id: "e-webinar-forecasting",
    slug: "webinar-forecasting-for-operators",
    title: "Webinar: Forecasting for operators",
    type: "Webinar",
    date: "2026-06-25",
    location: "Online",
    mode: "Virtual",
    summary: "Making probabilistic forecasts usable for planning teams.",
    registerHref: "/contact",
  },
];

export function getEvent(slug: string): EventItem | undefined {
  return events.find((e) => e.slug === slug);
}
