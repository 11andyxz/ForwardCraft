import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowUpRight } from "lucide-react";
import { pageMetadata } from "@/lib/site";
import { Section } from "@/components/layout/Section";
import { PageHero } from "@/components/sections/PageHero";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/animations/Reveal";
import { CoverArt } from "@/components/ui/CoverArt";
import { CapabilityGrid } from "@/components/sections/CapabilityGrid";
import { MetricsBand } from "@/components/sections/MetricsBand";
import { FaqSection } from "@/components/sections/FaqSection";
import { RelatedGrid } from "@/components/sections/RelatedGrid";
import { CTASection } from "@/components/sections/CTASection";
import { getIcon } from "@/lib/icons";
import { aiTrainingProducts, getAiTrainingProduct } from "@/data/mock/aiTraining";

export function generateStaticParams() {
  return aiTrainingProducts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = getAiTrainingProduct(slug);
  if (!product) return pageMetadata({ title: "AI Training" });
  return pageMetadata({
    title: `${product.name} — AI Training`,
    description: product.summary,
    path: `/ai-training/${product.slug}`,
  });
}

export default async function AiTrainingProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = getAiTrainingProduct(slug);
  if (!product) notFound();

  const related = aiTrainingProducts.filter((p) => p.slug !== product.slug);

  return (
    <>
      <PageHero
        eyebrow={product.name}
        title={product.tagline}
        description={product.summary}
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "AI training", href: "/ai-training" },
          { label: product.name, href: `/ai-training/${product.slug}` },
        ]}
        actions={
          <>
            <Button href="/contact" withArrow>
              Talk to our team
            </Button>
            <Button href="/ai-training" variant="secondary">
              All capabilities
            </Button>
          </>
        }
        aside={
          <CoverArt
            seed={product.slug}
            tone="light"
            className="aspect-[4/3] w-full rounded-xl border border-line"
          />
        }
      />

      {/* Overview prose */}
      <Section tone="paper" ariaLabel={`About ${product.name}`}>
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <SectionHeading eyebrow="Overview" title={`What ${product.name} does`} />
          <Reveal as="div" className="flex flex-col gap-6">
            <p className="text-xl leading-relaxed text-ink">{product.description}</p>
            <p className="text-base leading-relaxed text-ink-muted">
              {product.name} runs inside your governed environment as a discrete
              stage of the training loop, with APIs and exports that match your
              existing pipeline. Adopt it on its own or compose it with the other
              AI training capabilities.
            </p>
          </Reveal>
        </div>
      </Section>

      {/* Capabilities */}
      <Section tone="surface" ariaLabel={`${product.name} capabilities`}>
        <SectionHeading
          eyebrow="Capabilities"
          title="What's inside"
          intro={`The building blocks that make ${product.name} dependable in production.`}
          className="mb-12"
        />
        <CapabilityGrid capabilities={product.capabilities} columns={2} />
      </Section>

      {/* Metrics */}
      <Section tone="paper" size="sm" ariaLabel={`${product.name} by the numbers`}>
        <Reveal className="mb-8">
          <p className="eyebrow">By the numbers</p>
        </Reveal>
        <MetricsBand metrics={product.metrics} />
      </Section>

      <FaqSection
        faqs={product.faqs}
        eyebrow="FAQ"
        title={`${product.name} questions`}
        tone="surface"
      />

      {/* Related AI training */}
      <RelatedGrid eyebrow="Keep exploring" title="More AI training" tone="paper">
        {related.map((p) => {
          const Icon = getIcon(p.icon);
          return (
            <Link
              key={p.slug}
              href={`/ai-training/${p.slug}`}
              className="group flex h-full flex-col gap-4 rounded-lg border border-line bg-paper p-6 transition-all duration-300 hover:border-line-strong hover:shadow-md"
            >
              <span className="flex size-11 items-center justify-center rounded-lg border border-line bg-surface text-ink">
                <Icon className="size-5" />
              </span>
              <div className="flex flex-col gap-1.5">
                <h3 className="text-lg font-medium text-ink transition-colors group-hover:text-accent">
                  {p.name}
                </h3>
                <p className="text-sm text-ink-muted">{p.tagline}</p>
              </div>
              <span className="mt-auto inline-flex items-center gap-1 pt-2 text-sm font-medium text-accent">
                Explore
                <ArrowUpRight className="size-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </span>
            </Link>
          );
        })}
      </RelatedGrid>

      <CTASection
        eyebrow="Get started"
        title={`Put ${product.name} to work`}
        description="Book a working session and we'll scope how this fits your model development and governance."
      />
    </>
  );
}
