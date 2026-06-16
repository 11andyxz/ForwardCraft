import type { Metadata } from "next";
import { pageMetadata } from "@/lib/site";
import { Section } from "@/components/layout/Section";
import { PageHero } from "@/components/sections/PageHero";
import { CTASection } from "@/components/sections/CTASection";
import { ResourceListing } from "@/components/resources/ResourceListing";
import { researchPosts, categoriesOf } from "@/lib/content";

export const metadata: Metadata = pageMetadata({
  title: "Research",
  description:
    "Applied research from the ForwardCraft team — evaluation methods, RL environments, and safe grounding at enterprise scale.",
  path: "/research",
});

export default function ResearchPage() {
  const featured = researchPosts.find((p) => p.featured);

  return (
    <>
      <PageHero
        eyebrow="Research"
        title="Applied research, production-first"
        description="Work from our applied research team on the methods that decide whether enterprise AI holds up in production — not just on a benchmark."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Research", href: "/research" },
        ]}
      />

      <Section tone="paper" ariaLabel="All research">
        <ResourceListing
          items={researchPosts}
          categories={categoriesOf(researchPosts)}
          featured={featured}
        />
      </Section>

      <CTASection
        eyebrow="Collaborate"
        title="Apply this research to your operations"
        description="Book a working session. We'll map a high-leverage workflow and scope a governed deployment your team can own."
      />
    </>
  );
}
