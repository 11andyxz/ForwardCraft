import type { Metadata } from "next";
import { Cloud, Cpu, Database, Network, Boxes, Sparkles, Rocket, ShieldCheck, Handshake, Quote } from "lucide-react";
import { pageMetadata, site } from "@/lib/site";
import { Section } from "@/components/layout/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Reveal } from "@/components/animations/Reveal";
import { PageHero } from "@/components/sections/PageHero";
import { LogoWall } from "@/components/sections/LogoWall";
import { CTASection } from "@/components/sections/CTASection";
import { PartnershipForm } from "@/components/forms/PartnershipForm";
import { MockLogo } from "@/components/ui/MockLogo";
import { partners } from "@/data/mock/partners";
import { testimonials } from "@/data/mock/testimonials";
import type { LucideIcon } from "lucide-react";
import type { Partner } from "@/types";

export const metadata: Metadata = pageMetadata({
  title: "Partnerships",
  description:
    "Build with ForwardCraft. Cloud, model, data, systems integrator, and technology partners that help enterprises ship governed AI to production.",
  path: "/partnerships",
});

const categoryOrder: Partner["category"][] = [
  "Cloud",
  "Model",
  "Data",
  "Systems Integrator",
  "Technology",
];

const categoryMeta: Record<Partner["category"], { icon: LucideIcon; description: string }> = {
  Cloud: {
    icon: Cloud,
    description: "Secure infrastructure and private compute for training and inference at scale.",
  },
  Model: {
    icon: Cpu,
    description: "Frontier and specialist models, accessed with enterprise data controls.",
  },
  Data: {
    icon: Database,
    description: "Governed pipelines, connectors, and enrichment that feed reliable systems.",
  },
  "Systems Integrator": {
    icon: Boxes,
    description: "Joint delivery and change management for large-scale enterprise rollouts.",
  },
  Technology: {
    icon: Network,
    description: "Security, orchestration, and compliance tooling that rounds out the stack.",
  },
};

const benefits = [
  {
    icon: Rocket,
    title: "Co-built production wins",
    description:
      "We bring partners into live engagements, not logo slides. Joint customers reach governed production faster.",
  },
  {
    icon: ShieldCheck,
    title: "Governance baked in",
    description:
      "Our permissions, approval gates, and audit trails extend to your integration — so regulated buyers say yes.",
  },
  {
    icon: Network,
    title: "Access to the expert network",
    description:
      "Tap 11,000+ vetted domain experts to validate integrations and handle the judgment-heavy edge cases.",
  },
  {
    icon: Handshake,
    title: "Aligned go-to-market",
    description:
      "Shared pipeline, co-marketing, and field enablement focused on outcomes both teams can stand behind.",
  },
];

// Short, original partner success blurbs (mock).
const successStories = [
  {
    partner: "Cumulus Cloud",
    seed: "cumulus",
    headline: "A regulated bank to production in nine weeks",
    body: "Co-engineering secure deployment on Cumulus let a tier-one bank launch a governed onboarding agent inside its own VPC — with full audit coverage from day one.",
  },
  {
    partner: "Axiom Systems",
    seed: "axiom",
    headline: "A ten-thousand-seat rollout, handled jointly",
    body: "Axiom owned change management while we owned the system. The combination turned a stalled transformation into a phased rollout that actually landed.",
  },
  {
    partner: "DataStream",
    seed: "datastream",
    headline: "Clean inputs, trustworthy outputs",
    body: "Governed pipelines from DataStream gave our agents reliable, lineage-tracked data — cutting exception rates and the manual review that came with them.",
  },
];

export default function PartnershipsPage() {
  const partnersByCategory = categoryOrder.map((category) => ({
    category,
    list: partners.filter((p) => p.category === category),
  }));

  return (
    <>
      <PageHero
        eyebrow="Partnerships"
        title="Build governed AI with us"
        description={`${site.name} partners with cloud, model, data, integration, and technology leaders to get enterprises into production — together.`}
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Partnerships", href: "/partnerships" },
        ]}
        actions={
          <>
            <Button href="#become-a-partner" withArrow>
              Become a partner
            </Button>
            <Button href="/how-we-work" variant="secondary">
              How we work
            </Button>
          </>
        }
      />

      {/* Partner logo wall */}
      <Section tone="surface" size="sm">
        <p className="mb-8 text-center text-sm text-ink-muted">
          A growing ecosystem of {partners.length} partners across the enterprise AI stack
        </p>
        <LogoWall items={partners.map((p) => ({ name: p.name, seed: p.logoId }))} variant="grid" />
      </Section>

      {/* Partnership types */}
      <Section tone="paper">
        <SectionHeading
          eyebrow="Partnership types"
          title="Five ways to build together"
          intro="Each category plays a distinct role in getting customers from pilot to governed production."
          className="mb-12"
        />
        <div className="grid gap-6 lg:grid-cols-2">
          {partnersByCategory.map((group, gi) => {
            const meta = categoryMeta[group.category];
            const Icon = meta.icon;
            return (
              <Reveal
                key={group.category}
                delay={(gi % 2) * 0.05}
                className="flex flex-col gap-5 rounded-lg border border-line bg-paper p-7"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <span className="flex size-10 items-center justify-center rounded-md bg-accent-soft text-accent">
                      <Icon className="size-5" />
                    </span>
                    <h3 className="text-lg font-medium text-ink">{group.category}</h3>
                  </div>
                  <Badge tone="neutral">
                    {group.list.length} {group.list.length === 1 ? "partner" : "partners"}
                  </Badge>
                </div>
                <p className="text-sm leading-relaxed text-ink-muted">{meta.description}</p>
                <ul className="flex flex-col gap-3 border-t border-line pt-5">
                  {group.list.map((partner) => (
                    <li key={partner.id} className="flex flex-col gap-1">
                      <span className="flex items-center gap-2 text-sm font-medium text-ink">
                        <MockLogo name={partner.name} seed={partner.logoId} markOnly />
                        {partner.name}
                      </span>
                      <span className="text-sm text-ink-muted">{partner.blurb}</span>
                    </li>
                  ))}
                </ul>
              </Reveal>
            );
          })}
        </div>
      </Section>

      {/* Benefits */}
      <Section tone="surface">
        <SectionHeading
          eyebrow="Why partner with us"
          title="What you get from the relationship"
          className="mb-12"
        />
        <div className="grid gap-px overflow-hidden rounded-lg border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
          {benefits.map((b, i) => {
            const Icon = b.icon;
            return (
              <Reveal key={b.title} delay={i * 0.05} className="flex flex-col gap-4 bg-paper p-7">
                <span className="flex size-10 items-center justify-center rounded-md bg-accent-soft text-accent">
                  <Icon className="size-5" />
                </span>
                <h3 className="text-base font-medium text-ink">{b.title}</h3>
                <p className="text-sm leading-relaxed text-ink-muted">{b.description}</p>
              </Reveal>
            );
          })}
        </div>
      </Section>

      {/* Partner case studies */}
      <Section tone="paper">
        <SectionHeading
          eyebrow="Partner case studies"
          title="Wins we shipped together"
          intro="Short field notes from joint engagements. All mock companies and outcomes."
          className="mb-12"
        />
        <div className="grid gap-6 md:grid-cols-3">
          {successStories.map((story, i) => (
            <Reveal
              key={story.partner}
              delay={i * 0.05}
              className="flex flex-col gap-4 rounded-lg border border-line bg-paper p-7"
            >
              <MockLogo name={story.partner} seed={story.seed} />
              <h3 className="text-base font-medium leading-snug text-ink">{story.headline}</h3>
              <p className="text-sm leading-relaxed text-ink-muted">{story.body}</p>
            </Reveal>
          ))}
        </div>

        {/* A customer voice from the joint work */}
        {testimonials[0] ? (
          <Reveal className="mt-8 flex flex-col gap-6 rounded-lg border border-line bg-surface p-8 md:p-10">
            <Quote className="size-7 text-ink-subtle" />
            <blockquote className="max-w-3xl text-xl font-medium leading-snug tracking-tight text-ink md:text-2xl">
              “{testimonials[0].quote}”
            </blockquote>
            <footer className="flex items-center justify-between gap-4">
              <div className="flex flex-col">
                <cite className="text-sm font-medium not-italic text-ink">
                  {testimonials[0].authorName}
                </cite>
                <span className="text-sm text-ink-muted">
                  {testimonials[0].authorTitle}, {testimonials[0].company}
                </span>
              </div>
              <MockLogo name={testimonials[0].company} seed={testimonials[0].logoId} />
            </footer>
          </Reveal>
        ) : null}
      </Section>

      {/* Become a partner — form */}
      <Section tone="surface" id="become-a-partner">
        <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
          <div className="flex flex-col gap-6">
            <SectionHeading
              eyebrow="Become a partner"
              title="Tell us how we'd build together"
              intro="Share a little about your platform and the customers you serve. Our partnerships team replies within two business days."
            />
            <ul className="flex flex-col gap-3 text-sm text-ink-muted">
              {[
                "Joint delivery on live engagements",
                "Shared pipeline and co-marketing",
                "Access to the expert network",
                "Governance and security alignment",
              ].map((item) => (
                <li key={item} className="flex items-center gap-2.5">
                  <Sparkles className="size-4 text-accent" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-lg border border-line bg-paper p-7 md:p-9">
            <PartnershipForm />
          </div>
        </div>
      </Section>

      <CTASection
        eyebrow="Let's talk"
        title="Ready to build with ForwardCraft?"
        description="Whether you bring infrastructure, models, data, or delivery muscle, there's a place in the ecosystem."
        primary={{ label: "Start a conversation", href: "/contact" }}
        secondary={{ label: "See how we work", href: "/how-we-work" }}
      />
    </>
  );
}
