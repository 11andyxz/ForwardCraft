import type { NavItem, NavGroup } from "@/types";

/**
 * Primary navigation drives both the desktop mega menu and the mobile
 * accordion. Footer columns reuse the same leaves (see footerColumns).
 */

const industriesGroups: NavGroup[] = [
  {
    heading: "Financial services",
    leaves: [
      { label: "Asset management", href: "/industries/asset-management", icon: "chart-line" },
      { label: "Banking", href: "/industries/banking", icon: "landmark" },
      { label: "Insurance", href: "/industries/insurance", icon: "shield" },
      { label: "Private equity", href: "/industries/private-equity", icon: "trending" },
    ],
  },
  {
    heading: "Industry & public",
    leaves: [
      { label: "Energy", href: "/industries/energy", icon: "zap" },
      { label: "Healthcare", href: "/industries/healthcare", icon: "stethoscope" },
      { label: "Life sciences", href: "/industries/life-sciences", icon: "flask" },
      { label: "Public sector", href: "/industries/public-sector", icon: "building" },
    ],
  },
  {
    heading: "Consumer",
    leaves: [
      { label: "Consumer", href: "/industries/consumer", icon: "shopping-bag" },
      { label: "Sports", href: "/industries/sports", icon: "trophy" },
    ],
  },
];

const solutionsGroups: NavGroup[] = [
  {
    heading: "Automate",
    leaves: [
      { label: "Back-office automation", href: "/solutions/back-office-automation", icon: "workflow" },
      { label: "Contact center", href: "/solutions/contact-center", icon: "headset" },
      { label: "App modernization", href: "/solutions/app-modernization", icon: "recycle" },
    ],
  },
  {
    heading: "Decide",
    leaves: [
      { label: "Demand forecasting", href: "/solutions/demand-forecasting", icon: "line-chart" },
      { label: "Investment analysis", href: "/solutions/investment-analysis", icon: "file-search" },
      { label: "Computer vision", href: "/solutions/computer-vision", icon: "scan-eye" },
    ],
  },
  {
    heading: "Build",
    leaves: [
      { label: "Custom solutions", href: "/solutions/custom-solutions", icon: "puzzle" },
    ],
  },
];

const aiTrainingGroups: NavGroup[] = [
  {
    heading: "Overview",
    leaves: [
      { label: "AI training overview", href: "/ai-training", icon: "brain" },
      { label: "Expert network", href: "/ai-training/expert-network", icon: "users" },
    ],
  },
  {
    heading: "Capabilities",
    leaves: [
      { label: "RL environments", href: "/ai-training/rl-environments", icon: "orbit" },
      { label: "Evaluations", href: "/ai-training/evaluations", icon: "gauge" },
      { label: "Data platform", href: "/ai-training/data-platform", icon: "database" },
      { label: "Agents", href: "/ai-training/agents", icon: "cpu" },
    ],
  },
];

const resourcesGroups: NavGroup[] = [
  {
    heading: "Read",
    leaves: [
      { label: "Blog", href: "/blog", icon: "file-search" },
      { label: "Reports", href: "/reports", icon: "chart-line" },
      { label: "Research", href: "/research", icon: "flask" },
    ],
  },
  {
    heading: "Stay current",
    leaves: [
      { label: "Case studies", href: "/case-studies", icon: "trophy" },
      { label: "Newsroom", href: "/newsroom", icon: "globe" },
      { label: "Events", href: "/events", icon: "users" },
      { label: "Newsletter", href: "/newsletter", icon: "sparkles" },
    ],
  },
];

const companyGroups: NavGroup[] = [
  {
    heading: "Company",
    leaves: [
      { label: "About", href: "/about", icon: "building" },
      { label: "How we work", href: "/how-we-work", icon: "workflow" },
      { label: "Partnerships", href: "/partnerships", icon: "network" },
    ],
  },
  {
    heading: "Join & connect",
    leaves: [
      { label: "Careers", href: "/careers", icon: "users" },
      { label: "Contact", href: "/contact", icon: "globe" },
    ],
  },
];

export const navigation: NavItem[] = [
  {
    label: "Industries",
    groups: industriesGroups,
    feature: {
      eyebrow: "Featured",
      title: "AI that survives audit season",
      description: "How regulated enterprises put agents into production without losing control.",
      href: "/industries/banking",
      cta: "See banking",
    },
  },
  {
    label: "Solutions",
    groups: solutionsGroups,
    feature: {
      eyebrow: "Featured",
      title: "From pilot to production",
      description: "A delivery model built to clear the last mile — integration, evals, and rollout.",
      href: "/how-we-work",
      cta: "How we work",
    },
  },
  {
    label: "AI training",
    groups: aiTrainingGroups,
    feature: {
      eyebrow: "Expert network",
      title: "Specialist humans in the loop",
      description: "Domain experts that grade, correct, and harden frontier models.",
      href: "/ai-training/expert-network",
      cta: "Meet the network",
    },
  },
  {
    label: "Resources",
    groups: resourcesGroups,
    feature: {
      eyebrow: "Newsletter",
      title: "The Operating Layer",
      description: "Enterprise AI field notes, every other week. Join 30,000+ operators.",
      href: "/newsletter",
      cta: "Subscribe",
    },
  },
  {
    label: "Company",
    groups: companyGroups,
  },
];

/** Footer columns — flattened groupings of the same destinations. */
export const footerColumns: { heading: string; leaves: { label: string; href: string }[] }[] = [
  {
    heading: "Industries",
    leaves: industriesGroups.flatMap((g) => g.leaves).map(({ label, href }) => ({ label, href })),
  },
  {
    heading: "Solutions",
    leaves: solutionsGroups.flatMap((g) => g.leaves).map(({ label, href }) => ({ label, href })),
  },
  {
    heading: "AI training",
    leaves: aiTrainingGroups.flatMap((g) => g.leaves).map(({ label, href }) => ({ label, href })),
  },
  {
    heading: "Resources",
    leaves: resourcesGroups.flatMap((g) => g.leaves).map(({ label, href }) => ({ label, href })),
  },
  {
    heading: "Company",
    leaves: companyGroups.flatMap((g) => g.leaves).map(({ label, href }) => ({ label, href })),
  },
];
