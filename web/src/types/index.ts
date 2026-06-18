/**
 * Shared content types for ForwardCraft. All mock data in src/data/mock/*
 * conforms to these so pages stay decoupled from data shape. Replacing the
 * mock layer with a CMS/API later only requires matching these interfaces.
 */

import type { LucideIcon } from "lucide-react";

/* ---------------- Primitives ---------------- */

export interface Metric {
  label: string;
  value: string; // display value, e.g. "42%", "3.4x"
  /** Optional numeric target used by the count-up animation. */
  countTo?: number;
  prefix?: string;
  suffix?: string;
  description?: string;
}

export interface Faq {
  id: string;
  question: string;
  answer: string;
  category?: string;
}

export interface Testimonial {
  id: string;
  quote: string;
  authorName: string;
  authorTitle: string;
  company: string;
  /** Mock company mark id (maps to an abstract generated logo). */
  logoId?: string;
}

export interface WorkflowStep {
  step: number;
  title: string;
  description: string;
}

export interface Capability {
  title: string;
  description: string;
  icon?: string; // lucide icon name
}

export interface NavLeaf {
  label: string;
  href: string;
  description?: string;
  icon?: string;
}

export interface NavGroup {
  /** Optional group label (heading is the displayed text). */
  label?: string;
  /** Heading shown above a column in the mega menu. */
  heading?: string;
  leaves: NavLeaf[];
}

export interface NavItem {
  label: string;
  href?: string;
  /** When present, renders a mega-menu panel instead of a plain link. */
  groups?: NavGroup[];
  /** Optional promo/feature card shown alongside the mega-menu columns. */
  feature?: {
    eyebrow: string;
    title: string;
    description: string;
    href: string;
    cta: string;
  };
}

/* ---------------- Marketing entities ---------------- */

export interface Industry {
  slug: string;
  name: string;
  icon: string;
  tagline: string;
  summary: string;
  heroStat: Metric;
  challenges: { title: string; description: string }[];
  useCases: { title: string; description: string; icon?: string }[];
  workflow: WorkflowStep[];
  capabilities: Capability[];
  impact: string;
  metrics: Metric[];
  relatedSolutions: string[]; // solution slugs
  relatedCaseStudies: string[]; // case study slugs
  faqs: Faq[];
}

export interface Solution {
  slug: string;
  name: string;
  category: string;
  icon: string;
  tagline: string;
  summary: string;
  painPoints: { title: string; description: string }[];
  description: string;
  workflow: WorkflowStep[];
  capabilities: Capability[];
  outcomes: { title: string; description: string }[];
  metrics: Metric[];
  caseStudySlug?: string;
  faqs: Faq[];
  relatedIndustries: string[];
}

export interface PlatformModule {
  id: string;
  name: string;
  kicker: string;
  shortDescription: string;
  description: string;
  icon: string;
  metrics: Metric[];
  capabilities: string[];
  /** Mock workflow nodes for the schematic diagram. */
  diagram: { nodes: string[] };
  href: string;
}

export interface AiTrainingProduct {
  slug: string;
  name: string;
  icon: string;
  tagline: string;
  summary: string;
  description: string;
  capabilities: Capability[];
  metrics: Metric[];
  faqs: Faq[];
}

export interface CaseStudy {
  id: string;
  slug: string;
  title: string;
  client: string; // mock client name
  logoId: string; // abstract mock logo
  summary: string;
  industry: string; // industry slug
  solution: string; // solution slug
  featured: boolean;
  readMinutes: number;
  challenge: string;
  approach: string;
  solutionNarrative: string;
  results: Metric[];
  testimonial?: Testimonial;
}

export type ArticleKind = "blog" | "report" | "research" | "news";

export interface Article {
  id: string;
  slug: string;
  kind: ArticleKind;
  title: string;
  excerpt: string;
  category: string;
  author: string;
  authorTitle?: string;
  publishedAt: string; // ISO
  readMinutes: number;
  featured?: boolean;
  /** Mock body composed of section blocks for the detail page. */
  body: { heading: string; paragraphs: string[] }[];
  tags: string[];
}

export interface EventItem {
  id: string;
  slug: string;
  title: string;
  type: "Conference" | "Webinar" | "Roundtable" | "Workshop";
  date: string; // ISO
  location: string;
  mode: "In person" | "Virtual" | "Hybrid";
  summary: string;
  registerHref: string;
}

export interface TeamMember {
  id: string;
  name: string;
  title: string;
  bio: string;
  initials: string;
}

export interface Job {
  id: string;
  slug: string;
  title: string;
  department: string;
  location: string;
  type: "Full-time" | "Contract" | "Internship";
  remote: boolean;
  postedAt: string; // ISO
  summary: string;
  responsibilities: string[];
  requirements: string[];
  niceToHave: string[];
  /** Optional — rendered on the job page only when present. */
  compensation?: string;
  benefits?: string[];
}

export interface Office {
  id: string;
  city: string;
  country: string;
  region: "Americas" | "EMEA" | "APAC";
  type: "HQ" | "Office" | "Hub";
  timezone: string;
}

export interface Partner {
  id: string;
  name: string;
  logoId: string;
  category: "Cloud" | "Model" | "Data" | "Systems Integrator" | "Technology";
  blurb: string;
}

export interface Award {
  id: string;
  title: string;
  org: string;
  year: number;
}

export interface TimelineEntry {
  year: string;
  title: string;
  description: string;
}

/** Map of lucide icon names used across mock data (resolved at render). */
export type IconName = string;
export type { LucideIcon };
