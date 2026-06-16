import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { pageMetadata } from "@/lib/site";
import { Section } from "@/components/layout/Section";
import { PageHero } from "@/components/sections/PageHero";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { CoverArt } from "@/components/ui/CoverArt";
import { Reveal } from "@/components/animations/Reveal";
import { CountUp } from "@/components/animations/CountUp";
import { WorkflowSteps } from "@/components/sections/WorkflowSteps";
import { CapabilityGrid } from "@/components/sections/CapabilityGrid";
import { MetricsBand } from "@/components/sections/MetricsBand";
import { RelatedGrid } from "@/components/sections/RelatedGrid";
import { FaqSection } from "@/components/sections/FaqSection";
import { CTASection } from "@/components/sections/CTASection";
import { SolutionCard } from "@/components/cards/SolutionCard";
import { CaseStudyCard } from "@/components/cards/CaseStudyCard";
import { getIcon } from "@/lib/icons";
import { industries, getIndustry } from "@/data/mock/industries";
import { getSolution } from "@/data/mock/solutions";
import { getCaseStudy } from "@/data/mock/caseStudies";

export function generateStaticParams() {
  return industries.map((industry) => ({ slug: industry.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const industry = getIndustry(slug);
  if (!industry) return pageMetadata({ title: "Industry", path: `/industries/${slug}` });
  return pageMetadata({
    title: `${industry.name} — ${industry.tagline}`,
    description: industry.summary,
    path: `/industries/${slug}`,
  });
}

export default async function IndustryDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const industry = getIndustry(slug);
  if (!industry) notFound();

  const { heroStat } = industry;
  const relatedSolutions = industry.relatedSolutions
    .map((s) => getSolution(s))
    .filter((s): s is NonNullable<typeof s> => Boolean(s));
  const relatedCaseStudies = industry.relatedCaseStudies
    .map((c) => getCaseStudy(c))
    .filter((c): c is NonNullable<typeof c> => Boolean(c));

  return (
    <>
      <PageHero
        eyebrow={industry.name}
        title={industry.tagline}
        description={industry.summary}
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Industries", href: "/industries" },
          { label: industry.name, href: `/industries/${industry.slug}` },
        ]}
        actions={
          <Button href="/contact" withArrow>
            Book a demo
          </Button>
        }
        aside={
          <div className="overflow-hidden rounded-xl border border-line bg-paper">
            <CoverArt seed={industry.slug} className="aspect-[16/10] w-full" />
            <div className="flex flex-col gap-1.5 border-t border-line p-6">
              <span className="text-4xl font-medium tracking-tight text-ink md:text-5xl">
                {heroStat.countTo !== undefined ? (
                  <CountUp to={heroStat.countTo} prefix={heroStat.prefix} suffix={heroStat.suffix} />
                ) : (
                  heroStat.value
                )}
              </span>
              <span className="text-sm text-ink-muted">{heroStat.label}</span>
              {heroStat.description ? (
                <span className="text-xs text-ink-subtle">{heroStat.description}</span>
              ) : null}
            </div>
          </div>
        }
      />

      {/* Challenges */}
      <Section tone="paper" ariaLabel="Challenges">
        <SectionHeading
          eyebrow="The landscape"
          title="Challenges we tackle"
          intro={`Where ${industry.name.toLowerCase()} teams lose time, money, and confidence — and where governed AI moves the needle.`}
          className="mb-12"
        />
        <div className="grid gap-px overflow-hidden rounded-lg border border-line bg-line md:grid-cols-2">
          {industry.challenges.map((challenge, i) => (
            <Reveal key={challenge.title} delay={i * 0.05} className="flex flex-col gap-2 bg-paper p-6">
              <span className="font-mono text-xs text-ink-subtle">{String(i + 1).padStart(2, "0")}</span>
              <h3 className="text-lg font-medium text-ink">{challenge.title}</h3>
              <p className="text-sm text-ink-muted">{challenge.description}</p>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* AI use cases */}
      <Section tone="surface" ariaLabel="AI use cases">
        <SectionHeading
          eyebrow="Use cases"
          title="AI use cases"
          intro="High-leverage workflows where our agents earn their keep — each scoped, evaluated, and shipped behind your controls."
          className="mb-12"
        />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {industry.useCases.map((useCase, i) => {
            const Icon = getIcon(useCase.icon);
            return (
              <Reveal
                key={useCase.title}
                delay={i * 0.04}
                className="flex flex-col gap-3 rounded-lg border border-line bg-paper p-6"
              >
                <span className="flex size-11 items-center justify-center rounded-lg bg-surface text-ink">
                  <Icon className="size-5" />
                </span>
                <h3 className="text-base font-medium text-ink">{useCase.title}</h3>
                <p className="text-sm text-ink-muted">{useCase.description}</p>
              </Reveal>
            );
          })}
        </div>
      </Section>

      {/* How we deliver */}
      <Section tone="paper" ariaLabel="How we deliver">
        <SectionHeading
          eyebrow="Delivery model"
          title="How we deliver"
          intro="One consistent path from discovery to governed production — built for your security perimeter and your team."
          className="mb-12"
        />
        <WorkflowSteps steps={industry.workflow} />
      </Section>

      {/* Capabilities */}
      <Section tone="surface" ariaLabel="Capabilities">
        <SectionHeading
          eyebrow="What you get"
          title="Core capabilities"
          intro="The building blocks every engagement ships with — observable, governable, and owned by your team."
          className="mb-12"
        />
        <CapabilityGrid capabilities={industry.capabilities} columns={2} />
      </Section>

      {/* Impact + metrics */}
      <Section tone="dark" ariaLabel="Impact">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.2fr] lg:items-center">
          <SectionHeading eyebrow="The impact" title={industry.impact} invert />
          <MetricsBand metrics={industry.metrics} tone="dark" />
        </div>
      </Section>

      {/* Related solutions */}
      {relatedSolutions.length > 0 ? (
        <RelatedGrid eyebrow="Solutions" title="Related solutions" tone="paper">
          {relatedSolutions.map((solution) => (
            <SolutionCard key={solution.slug} solution={solution} />
          ))}
        </RelatedGrid>
      ) : null}

      {/* Related case studies */}
      {relatedCaseStudies.length > 0 ? (
        <RelatedGrid
          eyebrow="Case studies"
          title="Related case studies"
          tone="surface"
          columns={relatedCaseStudies.length === 1 ? 2 : 3}
        >
          {relatedCaseStudies.map((study) => (
            <CaseStudyCard key={study.slug} study={study} />
          ))}
        </RelatedGrid>
      ) : null}

      <FaqSection faqs={industry.faqs} title={`${industry.name} FAQs`} tone="paper" />

      <CTASection
        title={`Bring governed AI to your ${industry.name.toLowerCase()} operations`}
        description="Book a working session. We'll map a high-leverage workflow and scope a deployment your team can own."
      />
    </>
  );
}
