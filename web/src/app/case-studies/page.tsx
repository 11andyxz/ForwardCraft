import type { Metadata } from "next";
import { pageMetadata } from "@/lib/site";
import { Section } from "@/components/layout/Section";
import { PageHero } from "@/components/sections/PageHero";
import { Button } from "@/components/ui/Button";
import { CTASection } from "@/components/sections/CTASection";
import { CaseStudiesBrowser } from "@/components/casestudies/CaseStudiesBrowser";
import { caseStudies } from "@/data/mock/caseStudies";
import { getIndustry } from "@/data/mock/industries";
import { getSolution } from "@/data/mock/solutions";

export const metadata: Metadata = pageMetadata({
  title: "Case Studies",
  description:
    "Field notes from production — how operators in banking, insurance, life sciences, and beyond put governed AI to work, with measurable results.",
  path: "/case-studies",
});

/** Build slug→label maps for the industries and solutions present in the data. */
function buildLabelMap(slugs: string[], resolve: (slug: string) => { name: string } | undefined) {
  const seen = new Map<string, string>();
  for (const slug of slugs) {
    if (seen.has(slug)) continue;
    seen.set(slug, resolve(slug)?.name ?? slug);
  }
  return Array.from(seen, ([slug, label]) => ({ slug, label })).sort((a, b) =>
    a.label.localeCompare(b.label),
  );
}

export default function CaseStudiesPage() {
  const industries = buildLabelMap(
    caseStudies.map((c) => c.industry),
    getIndustry,
  );
  const solutions = buildLabelMap(
    caseStudies.map((c) => c.solution),
    getSolution,
  );

  return (
    <>
      <PageHero
        eyebrow="Case studies"
        title="Field notes from production"
        description="Real-world programs across regulated, high-stakes industries — the challenge, the approach, and the measured outcome. Every client, logo, and figure shown here is illustrative."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Case studies", href: "/case-studies" },
        ]}
        actions={
          <>
            <Button href="/contact" withArrow>
              Book a demo
            </Button>
            <Button href="/solutions" variant="secondary">
              Browse solutions
            </Button>
          </>
        }
      />

      <Section tone="paper" ariaLabel="All case studies">
        <CaseStudiesBrowser
          caseStudies={caseStudies}
          industries={industries}
          solutions={solutions}
        />
      </Section>

      <CTASection
        eyebrow="Get started"
        title="Write the next field note with us"
        description="Book a working session and we'll scope a governed deployment for your highest-leverage workflow."
      />
    </>
  );
}
