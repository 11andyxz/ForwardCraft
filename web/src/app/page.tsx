import type { Metadata } from "next";
import Link from "next/link";
import { pageMetadata } from "@/lib/site";
import { Section } from "@/components/layout/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/animations/Reveal";
import { HomeHero } from "@/components/sections/HomeHero";
import { LogoWall } from "@/components/sections/LogoWall";
import { PlatformExplorer } from "@/components/sections/PlatformExplorer";
import { SolutionsShowcase } from "@/components/sections/SolutionsShowcase";
import { MetricsBand } from "@/components/sections/MetricsBand";
import { TestimonialCarousel } from "@/components/sections/TestimonialCarousel";
import { CTASection } from "@/components/sections/CTASection";
import { FaqSection } from "@/components/sections/FaqSection";
import { NewsletterForm } from "@/components/forms/NewsletterForm";
import { IndustryCard } from "@/components/cards/IndustryCard";
import { CaseStudyCard } from "@/components/cards/CaseStudyCard";
import { industries } from "@/data/mock/industries";
import { caseStudies } from "@/data/mock/caseStudies";
import { testimonials } from "@/data/mock/testimonials";
import { homeFaqs } from "@/data/mock/faqs";
import type { Metric } from "@/types";

export const metadata: Metadata = pageMetadata({ path: "/" });

const clientLogos = caseStudies.map((c) => ({ name: c.client, seed: c.logoId }));

const companyMetrics: Metric[] = [
  { label: "Governed actions / week", value: "1.2M" },
  { label: "Vetted domain experts", value: "11K+", countTo: 11000, suffix: "+" },
  { label: "Average payback", value: "4.2x", countTo: 4.2, suffix: "x" },
  { label: "Industries served", value: "10", countTo: 10 },
];

const featuredStudies = caseStudies.filter((c) => c.featured).slice(0, 3);

export default function HomePage() {
  return (
    <>
      <HomeHero />

      {/* Client logo wall */}
      <Section size="sm" tone="surface">
        <p className="mb-8 text-center text-sm text-ink-muted">
          Trusted by operators across regulated, high-stakes industries
        </p>
        <LogoWall items={clientLogos} />
      </Section>

      {/* Platform — building blocks */}
      <Section tone="paper">
        <SectionHeading
          eyebrow="The platform"
          title="Building blocks, not black boxes"
          intro="Five composable modules you can adopt independently or together — each observable, governable, and owned by your team."
          className="mb-12 max-w-3xl"
          size="lg"
        />
        <PlatformExplorer />
      </Section>

      {/* Solutions */}
      <Section tone="surface">
        <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
          <SectionHeading
            eyebrow="Solutions"
            title="Outcomes, mapped to your workflows"
            intro="Cross-industry solutions that clear the last mile from pilot to governed production."
          />
          <Button href="/solutions" variant="secondary">
            All solutions
          </Button>
        </div>
        <SolutionsShowcase />
      </Section>

      {/* Industries */}
      <Section tone="paper">
        <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
          <SectionHeading
            eyebrow="Industries"
            title="Built for regulated, high-stakes work"
            intro="Domain depth across ten industries — with the controls each one demands."
          />
          <Button href="/industries" variant="secondary">
            All industries
          </Button>
        </div>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {industries.map((industry) => (
            <IndustryCard key={industry.slug} industry={industry} />
          ))}
        </div>
      </Section>

      {/* Metrics */}
      <Section tone="surface" size="sm">
        <Reveal className="mb-8">
          <p className="eyebrow">By the numbers</p>
        </Reveal>
        <MetricsBand metrics={companyMetrics} />
      </Section>

      {/* Testimonials */}
      <Section tone="dark">
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
          <SectionHeading eyebrow="Customers" title="Teams that ship AI to production" invert />
          <TestimonialCarousel testimonials={testimonials} tone="dark" />
        </div>
      </Section>

      {/* Featured case studies */}
      <Section tone="paper">
        <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
          <SectionHeading eyebrow="Case studies" title="Field notes from production" />
          <Button href="/case-studies" variant="secondary">
            All case studies
          </Button>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {featuredStudies.map((study) => (
            <CaseStudyCard key={study.slug} study={study} />
          ))}
        </div>
      </Section>

      {/* Newsletter */}
      <Section tone="dark" size="md">
        <div className="grid items-center gap-8 lg:grid-cols-2">
          <SectionHeading
            eyebrow="Newsletter"
            title="The Operating Layer"
            intro="Enterprise AI field notes, every other week. Join 30,000+ operators putting AI into production."
            invert
          />
          <div className="w-full lg:max-w-md lg:justify-self-end">
            <NewsletterForm invert />
          </div>
        </div>
      </Section>

      <FaqSection faqs={homeFaqs} title="Questions enterprises ask us" tone="paper" />

      <CTASection />

      <div className="sr-only">
        <Link href="/about">About ForwardCraft</Link>
      </div>
    </>
  );
}
