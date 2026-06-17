import type { Metadata } from "next";

/**
 * Central site configuration. Single source of truth for brand strings and
 * the canonical base URL — swap these to rebrand or move domains.
 */
export const site = {
  name: "ForwardCraft",
  legalName: "AndyXiongZheng LLC",
  tagline: "Enterprise AI, engineered into operations.",
  description:
    "ForwardCraft builds custom AI agents, workflow automation, and software integrations for the enterprise — production systems, not pilots.",
  url: "https://forwardcraft.example.com",
  email: "hello@forwardcraft.example.com",
  social: {
    linkedin: "https://www.linkedin.com/company/forwardcraft",
    x: "https://x.com/forwardcraft",
    youtube: "https://www.youtube.com/@forwardcraft",
    github: "https://github.com/forwardcraft",
  },
} as const;

interface PageMetaInput {
  title?: string;
  description?: string;
  path?: string;
  image?: string;
}

/**
 * Builds per-page Next.js Metadata with sensible Open Graph + canonical
 * defaults. Pages call this in `generateMetadata`/`metadata`.
 */
export function pageMetadata({
  title,
  description,
  path = "/",
  image = "/images/og/default.svg",
}: PageMetaInput = {}): Metadata {
  // Bare page title — the root layout's title template appends the brand.
  const ogTitle = title ? `${title} — ${site.name}` : `${site.name} — ${site.tagline}`;
  const desc = description ?? site.description;
  const url = `${site.url}${path}`;

  return {
    title,
    description: desc,
    alternates: { canonical: url },
    openGraph: {
      type: "website",
      siteName: site.name,
      title: ogTitle,
      description: desc,
      url,
      images: [{ url: image, width: 1200, height: 630, alt: site.name }],
    },
    twitter: {
      card: "summary_large_image",
      title: ogTitle,
      description: desc,
      images: [image],
    },
  };
}
