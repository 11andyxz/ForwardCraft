import type { Metadata } from "next";
import { pageMetadata } from "@/lib/site";
import { Section } from "@/components/layout/Section";
import { PageHero } from "@/components/sections/PageHero";
import { CTASection } from "@/components/sections/CTASection";
import { IndustryCard } from "@/components/cards/IndustryCard";
import { Reveal } from "@/components/animations/Reveal";
import { industries } from "@/data/mock/industries";

export const metadata: Metadata = pageMetadata({
  title: "Industries",
  description:
    "Domain-deep AI delivery across ten regulated, high-stakes industries — with the controls, integrations, and oversight each one demands.",
  path: "/industries",
});

export default function IndustriesPage() {
  return (
    <>
      <PageHero
        eyebrow="Industries"
        title="Built for regulated, high-stakes work"
        description="Ten industry practices, one consistent delivery model. We pair domain expertise with governed automation so AI ships into the systems your teams already run."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Industries", href: "/industries" },
        ]}
      />

      <Section tone="paper" ariaLabel="All industries">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {industries.map((industry, i) => (
            <Reveal key={industry.slug} delay={i * 0.04}>
              <IndustryCard industry={industry} />
            </Reveal>
          ))}
        </div>
      </Section>

      <CTASection
        eyebrow="Get started"
        title="Don't see your exact workflow?"
        description="Our delivery model adapts to any regulated, high-stakes operation. Tell us where the friction is and we'll map a governed deployment."
      />
    </>
  );
}
