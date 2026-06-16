import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { pageMetadata } from "@/lib/site";
import { Section } from "@/components/layout/Section";
import { PageHero } from "@/components/sections/PageHero";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/animations/Reveal";
import { MetricsBand } from "@/components/sections/MetricsBand";
import { FaqSection } from "@/components/sections/FaqSection";
import { CTASection } from "@/components/sections/CTASection";
import { getIcon } from "@/lib/icons";
import { aiTrainingProducts } from "@/data/mock/aiTraining";
import type { Faq, Metric } from "@/types";

export const metadata: Metadata = pageMetadata({
  title: "AI Training",
  description:
    "Train, evaluate, and harden frontier models for the enterprise — RL environments, task-specific evaluations, a vetted expert network, governed data, and production agents.",
  path: "/ai-training",
});

const trainingMetrics: Metric[] = [
  { label: "Vetted domain experts", value: "11K+", countTo: 11000, suffix: "+" },
  { label: "Evaluation tasks", value: "2,400+", countTo: 2400, suffix: "+" },
  { label: "RL environments built", value: "500+", countTo: 500, suffix: "+" },
  { label: "Releases gated on evals", value: "100%", countTo: 100, suffix: "%" },
];

const approachSteps: { title: string; description: string }[] = [
  {
    title: "Ground in real work",
    description:
      "We model your actual tasks, tools, and constraints — not generic benchmarks — so what a model learns transfers to production.",
  },
  {
    title: "Keep experts in the loop",
    description:
      "Specialist reviewers grade the hard edges, adjudicate disagreements, and feed corrections back into training.",
  },
  {
    title: "Gate every release",
    description:
      "Task-specific evaluations and regression gates block any model that slips before it reaches your customers.",
  },
];

const trainingFaqs: Faq[] = [
  {
    id: "what-is-ai-training",
    question: "What does ForwardCraft mean by AI training?",
    answer:
      "It is the full loop that turns a base model into a dependable production system for your domain: building environments to train in, curating data, bringing experts in to grade edge cases, evaluating against your own tasks, and deploying agents that act under your controls.",
  },
  {
    id: "adopt-independently",
    question: "Can we adopt these capabilities independently?",
    answer:
      "Yes. Each capability is a discrete stage with its own APIs and exports. Teams often start with evaluations or the expert network, then layer in environments, data, and agents as the program matures.",
  },
  {
    id: "data-handling",
    question: "How is our data and IP protected?",
    answer:
      "Data stays inside your governed environment. Reviewers operate under your policies and access controls, and nothing you share is reused to train shared or third-party models.",
  },
  {
    id: "frontier-models",
    question: "Do you work with our existing models and providers?",
    answer:
      "We are model-agnostic. The training and evaluation stages plug into whatever frontier or open-weight models you already use, matching your existing pipeline and tooling.",
  },
];

export default function AiTrainingPage() {
  return (
    <>
      <PageHero
        eyebrow="AI training"
        title="Train and evaluate frontier models for the enterprise"
        description="Base models are a starting point, not a finished system. We build the environments, data, evaluations, and expert review that turn frontier models into agents you can trust in production."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "AI training", href: "/ai-training" },
        ]}
        actions={
          <>
            <Button href="/contact" withArrow>
              Talk to our team
            </Button>
            <Button href="/how-we-work" variant="secondary">
              See how we work
            </Button>
          </>
        }
      />

      {/* Approach */}
      <Section tone="paper" ariaLabel="Our approach to AI training">
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr]">
          <SectionHeading
            eyebrow="The approach"
            title="Production-grade models are made, not prompted"
            intro="The gap between a capable model and a reliable one is closed with disciplined training and measurement. We run that loop on your tasks, under your governance."
          />
          <ol className="flex flex-col gap-px overflow-hidden rounded-lg border border-line bg-line">
            {approachSteps.map((step, i) => (
              <Reveal
                as="li"
                key={step.title}
                delay={i * 0.06}
                className="flex gap-5 bg-paper p-6"
              >
                <span className="font-mono text-sm text-ink-subtle tabular-nums">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div className="flex flex-col gap-1">
                  <h3 className="text-base font-medium text-ink">{step.title}</h3>
                  <p className="text-sm text-ink-muted">{step.description}</p>
                </div>
              </Reveal>
            ))}
          </ol>
        </div>
      </Section>

      {/* The five capabilities */}
      <Section tone="surface" ariaLabel="AI training capabilities">
        <SectionHeading
          eyebrow="Capabilities"
          title="Five capabilities across the training loop"
          intro="Adopt them independently or as a connected pipeline — each is observable, governable, and owned by your team."
          className="mb-12"
          size="lg"
        />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {aiTrainingProducts.map((product, i) => {
            const Icon = getIcon(product.icon);
            return (
              <Reveal as="div" key={product.slug} delay={i * 0.05}>
                <Link
                  href={`/ai-training/${product.slug}`}
                  className="group flex h-full flex-col gap-4 rounded-lg border border-line bg-paper p-6 transition-all duration-300 hover:border-line-strong hover:shadow-md"
                >
                  <span className="flex size-11 items-center justify-center rounded-lg border border-line bg-surface text-ink">
                    <Icon className="size-5" />
                  </span>
                  <div className="flex flex-col gap-1.5">
                    <h3 className="text-lg font-medium text-ink transition-colors group-hover:text-accent">
                      {product.name}
                    </h3>
                    <p className="text-sm text-ink-muted">{product.tagline}</p>
                  </div>
                  <span className="mt-auto inline-flex items-center gap-1 pt-2 text-sm font-medium text-accent">
                    Explore
                    <ArrowUpRight className="size-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </span>
                </Link>
              </Reveal>
            );
          })}
        </div>
      </Section>

      {/* Headline metrics */}
      <Section tone="paper" size="sm" ariaLabel="AI training by the numbers">
        <Reveal className="mb-8">
          <p className="eyebrow">By the numbers</p>
        </Reveal>
        <MetricsBand metrics={trainingMetrics} />
      </Section>

      <FaqSection
        faqs={trainingFaqs}
        eyebrow="FAQ"
        title="Questions about AI training"
        intro="How the training loop fits into your model development, governance, and existing stack."
        tone="surface"
      />

      <CTASection
        eyebrow="Get started"
        title="Turn a frontier model into a system you can ship"
        description="Book a working session and we'll scope the training and evaluation loop for your highest-stakes task."
      />
    </>
  );
}
