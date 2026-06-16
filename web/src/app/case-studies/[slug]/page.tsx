import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Clock } from "lucide-react";
import { pageMetadata } from "@/lib/site";
import { Section } from "@/components/layout/Section";
import { PageHero } from "@/components/sections/PageHero";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/animations/Reveal";
import { CoverArt } from "@/components/ui/CoverArt";
import { MockLogo } from "@/components/ui/MockLogo";
import { MetricsBand } from "@/components/sections/MetricsBand";
import { RelatedGrid } from "@/components/sections/RelatedGrid";
import { CTASection } from "@/components/sections/CTASection";
import { CaseStudyCard } from "@/components/cards/CaseStudyCard";
import { caseStudies, getCaseStudy } from "@/data/mock/caseStudies";
import { getIndustry } from "@/data/mock/industries";
import { getSolution } from "@/data/mock/solutions";

export function generateStaticParams() {
  return caseStudies.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const study = getCaseStudy(slug);
  if (!study) return pageMetadata({ title: "Case Studies" });
  return pageMetadata({
    title: study.title,
    description: study.summary,
    path: `/case-studies/${study.slug}`,
  });
}

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const study = getCaseStudy(slug);
  if (!study) notFound();

  const industry = getIndustry(study.industry);
  const solution = getSolution(study.solution);

  const eyebrow = industry ? `${study.client} · ${industry.name}` : study.client;

  // Related: other studies sharing the same industry or solution, max 3.
  const related = caseStudies
    .filter(
      (c) =>
        c.slug !== study.slug &&
        (c.industry === study.industry || c.solution === study.solution),
    )
    .slice(0, 3);

  const sections: { id: string; title: string; body: string }[] = [
    { id: "challenge", title: "The challenge", body: study.challenge },
    { id: "approach", title: "Our approach", body: study.approach },
    { id: "solution", title: "The solution", body: study.solutionNarrative },
  ];

  return (
    <>
      <PageHero
        tone="dark"
        eyebrow={eyebrow}
        title={study.title}
        description={study.summary}
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Case studies", href: "/case-studies" },
          { label: study.client, href: `/case-studies/${study.slug}` },
        ]}
        actions={
          <>
            <Button href="/contact" variant="inverse" withArrow>
              Book a similar engagement
            </Button>
            <Button
              href="/case-studies"
              className="border border-line-inverse bg-transparent text-ink-inverse hover:bg-night-2"
            >
              All case studies
            </Button>
          </>
        }
        aside={
          <CoverArt
            seed={study.slug}
            tone="dark"
            className="aspect-[4/3] w-full rounded-xl border border-line-inverse"
          />
        }
      />

      {/* Client background / intro */}
      <Section tone="paper" ariaLabel="Client background">
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <div className="flex flex-col gap-4">
            <p className="eyebrow">Client background</p>
            <MockLogo name={study.client} seed={study.logoId} className="text-ink" />
            <dl className="flex flex-col gap-3 pt-2 text-sm">
              {industry ? (
                <div className="flex items-center justify-between gap-4 border-b border-line pb-3">
                  <dt className="text-ink-subtle">Industry</dt>
                  <dd className="font-medium text-ink">{industry.name}</dd>
                </div>
              ) : null}
              {solution ? (
                <div className="flex items-center justify-between gap-4 border-b border-line pb-3">
                  <dt className="text-ink-subtle">Solution</dt>
                  <dd className="font-medium text-ink">{solution.name}</dd>
                </div>
              ) : null}
              <div className="flex items-center justify-between gap-4">
                <dt className="text-ink-subtle">Read time</dt>
                <dd className="inline-flex items-center gap-1.5 font-medium text-ink">
                  <Clock className="size-4 text-ink-subtle" />
                  {study.readMinutes} min
                </dd>
              </div>
            </dl>
          </div>
          <Reveal as="div" className="flex flex-col gap-4">
            <div className="flex flex-wrap gap-2">
              {industry ? <Badge tone="neutral">{industry.name}</Badge> : null}
              {solution ? <Badge tone="outline">{solution.name}</Badge> : null}
              {study.featured ? <Badge tone="accent">Featured</Badge> : null}
            </div>
            <p className="text-xl leading-relaxed text-ink">{study.summary}</p>
          </Reveal>
        </div>
      </Section>

      {/* Narrative: challenge / approach / solution */}
      <Section tone="surface" ariaLabel="Engagement story">
        <div className="mx-auto flex max-w-3xl flex-col gap-14">
          {sections.map((s, i) => (
            <Reveal as="div" key={s.id} delay={i * 0.04} className="flex flex-col gap-4">
              <span className="font-mono text-sm text-ink-subtle tabular-nums">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h2 className="text-2xl font-medium tracking-tight text-ink md:text-3xl">
                {s.title}
              </h2>
              <p className="text-lg leading-relaxed text-ink-muted">{s.body}</p>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* Results */}
      <Section tone="paper" ariaLabel="Results">
        <SectionHeading
          eyebrow="Results"
          title="What changed"
          intro="Measured outcomes from the deployment. Figures are illustrative mock data."
          className="mb-10"
        />
        <MetricsBand metrics={study.results} />
      </Section>

      {/* Testimonial */}
      {study.testimonial ? (
        <Section tone="dark" ariaLabel="Client testimonial">
          <Reveal as="figure" className="mx-auto flex max-w-3xl flex-col items-center gap-8 text-center">
            <blockquote className="text-2xl font-medium leading-snug tracking-tight text-ink-inverse md:text-3xl">
              “{study.testimonial.quote}”
            </blockquote>
            <figcaption className="flex flex-col items-center gap-3">
              <MockLogo
                name={study.testimonial.company}
                seed={study.testimonial.logoId}
                className="text-ink-inverse-muted"
              />
              <div className="text-sm text-ink-inverse-muted">
                <span className="font-medium text-ink-inverse">
                  {study.testimonial.authorName}
                </span>
                {", "}
                {study.testimonial.authorTitle}, {study.testimonial.company}
              </div>
            </figcaption>
          </Reveal>
        </Section>
      ) : null}

      {/* Related stories */}
      {related.length > 0 ? (
        <RelatedGrid eyebrow="Related" title="Related stories" tone="surface">
          {related.map((c) => (
            <CaseStudyCard key={c.slug} study={c} />
          ))}
        </RelatedGrid>
      ) : null}

      <CTASection
        eyebrow="Get started"
        title="Build your own field note"
        description="Book a working session and we'll scope a governed deployment for your highest-leverage workflow."
      />
    </>
  );
}
