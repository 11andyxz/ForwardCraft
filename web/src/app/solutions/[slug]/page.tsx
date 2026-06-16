import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { pageMetadata } from "@/lib/site";
import { Section } from "@/components/layout/Section";
import { PageHero } from "@/components/sections/PageHero";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { CoverArt } from "@/components/ui/CoverArt";
import { Reveal } from "@/components/animations/Reveal";
import { WorkflowSteps } from "@/components/sections/WorkflowSteps";
import { CapabilityGrid } from "@/components/sections/CapabilityGrid";
import { MetricsBand } from "@/components/sections/MetricsBand";
import { RelatedGrid } from "@/components/sections/RelatedGrid";
import { FaqSection } from "@/components/sections/FaqSection";
import { CTASection } from "@/components/sections/CTASection";
import { CaseStudyCard } from "@/components/cards/CaseStudyCard";
import { IndustryCard } from "@/components/cards/IndustryCard";
import { solutions, getSolution } from "@/data/mock/solutions";
import { getIndustry } from "@/data/mock/industries";
import { getCaseStudy } from "@/data/mock/caseStudies";

export function generateStaticParams() {
  return solutions.map((solution) => ({ slug: solution.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const solution = getSolution(slug);
  if (!solution) return pageMetadata({ title: "Solution", path: `/solutions/${slug}` });
  return pageMetadata({
    title: solution.name,
    description: solution.summary,
    path: `/solutions/${slug}`,
  });
}

export default async function SolutionDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const solution = getSolution(slug);
  if (!solution) notFound();

  const caseStudy = solution.caseStudySlug ? getCaseStudy(solution.caseStudySlug) : undefined;
  const relatedIndustries = solution.relatedIndustries
    .map((s) => getIndustry(s))
    .filter((i): i is NonNullable<typeof i> => Boolean(i));

  return (
    <>
      <PageHero
        eyebrow={solution.category}
        title={solution.name}
        description={solution.summary}
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Solutions", href: "/solutions" },
          { label: solution.name, href: `/solutions/${solution.slug}` },
        ]}
        actions={
          <Button href="/contact" withArrow>
            Book a demo
          </Button>
        }
        aside={
          <div className="overflow-hidden rounded-xl border border-line bg-paper">
            <CoverArt seed={solution.slug} className="aspect-[16/10] w-full" />
            <div className="border-t border-line p-6">
              <p className="text-base font-medium text-ink">{solution.tagline}</p>
            </div>
          </div>
        }
      />

      {/* The challenge */}
      <Section tone="paper" ariaLabel="The challenge">
        <SectionHeading
          eyebrow="The challenge"
          title="Where teams get stuck"
          intro="The recurring pain points this solution is built to remove."
          className="mb-12"
        />
        <div className="grid gap-px overflow-hidden rounded-lg border border-line bg-line md:grid-cols-2">
          {solution.painPoints.map((pain, i) => (
            <Reveal key={pain.title} delay={i * 0.05} className="flex flex-col gap-2 bg-paper p-6">
              <span className="font-mono text-xs text-ink-subtle">{String(i + 1).padStart(2, "0")}</span>
              <h3 className="text-lg font-medium text-ink">{pain.title}</h3>
              <p className="text-sm text-ink-muted">{pain.description}</p>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* What we build */}
      <Section tone="surface" ariaLabel="What we build">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.2fr] lg:items-start">
          <SectionHeading eyebrow="What we build" title="The solution" />
          <Reveal as="p" className="max-w-2xl text-lg leading-relaxed text-ink-muted">
            {solution.description}
          </Reveal>
        </div>
        <div className="mt-14">
          <CapabilityGrid capabilities={solution.capabilities} columns={2} />
        </div>
      </Section>

      {/* How it works */}
      <Section tone="paper" ariaLabel="How it works">
        <SectionHeading
          eyebrow="Process"
          title="How it works"
          intro="From first assessment to scaled production, with your team in control at every gate."
          className="mb-12"
        />
        <WorkflowSteps steps={solution.workflow} />
      </Section>

      {/* Business outcomes */}
      <Section tone="surface" ariaLabel="Business outcomes">
        <SectionHeading
          eyebrow="Why it matters"
          title="Business outcomes"
          intro="The results that make this solution worth scaling across the organization."
          className="mb-12"
        />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {solution.outcomes.map((outcome, i) => (
            <Reveal
              key={outcome.title}
              delay={i * 0.04}
              className="flex flex-col gap-2 rounded-lg border border-line bg-paper p-6"
            >
              <h3 className="text-base font-medium text-ink">{outcome.title}</h3>
              <p className="text-sm text-ink-muted">{outcome.description}</p>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* Metrics */}
      <Section tone="dark" size="sm" ariaLabel="Metrics">
        <Reveal className="mb-8">
          <p className="eyebrow text-ink-inverse-muted">By the numbers</p>
        </Reveal>
        <MetricsBand metrics={solution.metrics} tone="dark" />
      </Section>

      {/* Featured case study */}
      {caseStudy ? (
        <Section tone="paper" ariaLabel="Featured case study">
          <SectionHeading eyebrow="Proof" title="See it in production" className="mb-10" />
          <CaseStudyCard study={caseStudy} featured />
        </Section>
      ) : null}

      {/* Related industries */}
      {relatedIndustries.length > 0 ? (
        <RelatedGrid eyebrow="Industries" title="Related industries" tone="surface">
          {relatedIndustries.map((industry) => (
            <IndustryCard key={industry.slug} industry={industry} />
          ))}
        </RelatedGrid>
      ) : null}

      <FaqSection faqs={solution.faqs} title={`${solution.name} FAQs`} tone="paper" />

      <CTASection
        title={`Ready to deploy ${solution.name.toLowerCase()}?`}
        description="Book a working session and we'll scope a governed pilot against your highest-volume workflow."
      />
    </>
  );
}
