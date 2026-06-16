import type { TeamMember, Award, TimelineEntry } from "@/types";

/** Leadership — all mock names, titles, and bios. */
export const team: TeamMember[] = [
  { id: "ceo", name: "Elena Vasquez", title: "Chief Executive Officer", initials: "EV", bio: "Former enterprise operations leader; founded ForwardCraft to close the gap between AI demos and production systems." },
  { id: "cto", name: "Raj Patel", title: "Chief Technology Officer", initials: "RP", bio: "Built large-scale ML platforms; leads the agent runtime, evaluation, and data foundation teams." },
  { id: "coo", name: "Maya Thompson", title: "Chief Operating Officer", initials: "MT", bio: "Scales delivery so every engagement reaches production with measurable payback." },
  { id: "cpo", name: "David Kim", title: "Chief Product Officer", initials: "DK", bio: "Shapes the platform so enterprises can own and operate their AI systems." },
  { id: "head-network", name: "Amara Diallo", title: "Head of Expert Network", initials: "AD", bio: "Runs the global network of domain experts that keeps quality high on the hard cases." },
  { id: "head-security", name: "Tomáš Novák", title: "Chief Information Security Officer", initials: "TN", bio: "Owns the controls that let regulated enterprises deploy with confidence." },
  { id: "head-research", name: "Grace Liu", title: "Head of Applied Research", initials: "GL", bio: "Translates frontier capabilities into reliable, evaluated enterprise systems." },
  { id: "head-people", name: "Samuel Adeyemi", title: "Head of People", initials: "SA", bio: "Builds the team and culture behind every deployment." },
];

export const awards: Award[] = [
  { id: "a1", title: "Enterprise AI Company of the Year", org: "Applied Intelligence Awards", year: 2025 },
  { id: "a2", title: "Most Trusted AI Vendor", org: "FinServ AI Forum", year: 2025 },
  { id: "a3", title: "Best Workflow Automation Platform", org: "Operations Excellence Council", year: 2024 },
  { id: "a4", title: "Top 50 AI Companies to Watch", org: "Frontier Tech Review", year: 2024 },
];

export const timeline: TimelineEntry[] = [
  { year: "2019", title: "Founded", description: "ForwardCraft starts with a thesis: enterprises need AI in production, not pilots." },
  { year: "2020", title: "First deployments", description: "Back-office automation goes live for early banking and insurance clients." },
  { year: "2022", title: "Expert Network", description: "The human-in-the-loop network scales past 1,000 vetted experts." },
  { year: "2023", title: "Platform launch", description: "The five composable modules ship as a unified platform." },
  { year: "2024", title: "Global delivery", description: "Offices open across EMEA and APAC; deployments span ten industries." },
  { year: "2025", title: "1M+ actions / week", description: "Agents cross a million governed production actions per week." },
];
