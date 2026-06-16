import type { Metadata } from "next";
import { Building2, Target, Globe2, Trophy, Network, ShieldCheck, MapPin } from "lucide-react";
import { pageMetadata, site } from "@/lib/site";
import { Section } from "@/components/layout/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Reveal } from "@/components/animations/Reveal";
import { PageHero } from "@/components/sections/PageHero";
import { MetricsBand } from "@/components/sections/MetricsBand";
import { TestimonialCarousel } from "@/components/sections/TestimonialCarousel";
import { CTASection } from "@/components/sections/CTASection";
import { team, awards, timeline } from "@/data/mock/team";
import { offices } from "@/data/mock/offices";
import { testimonials } from "@/data/mock/testimonials";
import type { Metric, Office } from "@/types";

export const metadata: Metadata = pageMetadata({
  title: "About",
  description:
    "ForwardCraft engineers enterprise AI into operations — production systems, not pilots. Meet the team, our story, and the principles behind our work.",
  path: "/about",
});

const companyMetrics: Metric[] = [
  { label: "Founded", value: "2019", countTo: 2019 },
  { label: "Production deployments", value: "300+", countTo: 300, suffix: "+" },
  { label: "Vetted domain experts", value: "11K+", countTo: 11000, suffix: "+" },
  { label: "Industries served", value: "10", countTo: 10 },
];

const principles = [
  {
    icon: Target,
    title: "Production over pilots",
    description:
      "A demo proves a model can do something once. We design for the system that does it every day, under load, with owners and budgets attached.",
  },
  {
    icon: ShieldCheck,
    title: "Governed by default",
    description:
      "Permissions, approval gates, and audit trails aren't bolted on at the end. They're how the system works from the first deployment.",
  },
  {
    icon: Network,
    title: "Humans on the hard cases",
    description:
      "Automation handles the routine. A global expert network handles the judgment calls — fast, traceable, and tied back into evaluation.",
  },
  {
    icon: Building2,
    title: "Customers own the outcome",
    description:
      "We hand over systems your team can run, inspect, and extend. No black boxes, no lock-in disguised as a roadmap.",
  },
];

const regionOrder: Office["region"][] = ["Americas", "EMEA", "APAC"];

export default function AboutPage() {
  const officesByRegion = regionOrder.map((region) => ({
    region,
    list: offices.filter((o) => o.region === region),
  }));

  return (
    <>
      <PageHero
        eyebrow="About"
        title="We engineer AI into the work — not into a slide deck"
        description={`${site.name} builds custom agents, workflow automation, and integrations that reach governed production in weeks. Here's who we are and how we think.`}
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "About", href: "/about" },
        ]}
        actions={
          <>
            <Button href="/contact" withArrow>
              Talk to our team
            </Button>
            <Button href="/how-we-work" variant="secondary">
              How we work
            </Button>
          </>
        }
      />

      {/* Mission statement */}
      <Section tone="paper" size="md">
        <Reveal className="mx-auto max-w-3xl text-center">
          <span className="eyebrow">Our mission</span>
          <p className="mt-5 text-2xl font-medium leading-snug tracking-tight text-ink md:text-4xl">
            Close the distance between what AI can do in a demo and what enterprises can{" "}
            <span className="text-accent">trust in production</span> — across the workflows that
            run the business.
          </p>
        </Reveal>
      </Section>

      {/* Our story */}
      <Section tone="surface">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <SectionHeading
            eyebrow="Our story"
            title="Built by operators who were tired of pilots that never shipped"
          />
          <Reveal className="flex flex-col gap-5 text-base leading-relaxed text-ink-muted">
            <p>
              {site.name} started in 2019 with a frustration shared across enterprise teams: AI
              proofs-of-concept were everywhere, and production systems were nowhere. Models looked
              impressive in a notebook, then stalled the moment they met real permissions, real
              data, and real accountability.
            </p>
            <p>
              We took the opposite approach. Instead of starting from the model, we started from the
              workflow — the approvals, the edge cases, the auditors who would eventually ask how a
              decision was made. We built a platform where agents act inside guardrails, where every
              action is logged, and where a network of vetted domain experts handles the cases that
              demand human judgment.
            </p>
            <p>
              Today that thesis runs across ten regulated industries and three continents. The work
              is unglamorous on purpose: evaluations, governance, integration, and the patient craft
              of getting systems into operation and keeping them there. That is the forward craft.
            </p>
          </Reveal>
        </div>
      </Section>

      {/* Company metrics */}
      <Section tone="paper" size="sm">
        <Reveal className="mb-8">
          <p className="eyebrow">By the numbers</p>
        </Reveal>
        <MetricsBand metrics={companyMetrics} />
      </Section>

      {/* Operating philosophy */}
      <Section tone="surface">
        <SectionHeading
          eyebrow="Operating philosophy"
          title="Four principles behind every engagement"
          intro="They sound simple. Holding to them under enterprise constraints is the actual work."
          className="mb-12"
        />
        <div className="grid gap-px overflow-hidden rounded-lg border border-line bg-line sm:grid-cols-2">
          {principles.map((p, i) => {
            const Icon = p.icon;
            return (
              <Reveal key={p.title} delay={i * 0.05} className="flex flex-col gap-4 bg-paper p-8">
                <span className="flex size-10 items-center justify-center rounded-md bg-accent-soft text-accent">
                  <Icon className="size-5" />
                </span>
                <h3 className="text-lg font-medium text-ink">{p.title}</h3>
                <p className="text-sm leading-relaxed text-ink-muted">{p.description}</p>
              </Reveal>
            );
          })}
        </div>
      </Section>

      {/* Leadership */}
      <Section tone="paper">
        <SectionHeading
          eyebrow="Leadership"
          title="The team accountable for the work"
          intro="Operators, engineers, and researchers who have shipped systems into regulated production."
          className="mb-12"
        />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {team.map((member, i) => (
            <Reveal
              key={member.id}
              delay={(i % 4) * 0.05}
              className="flex flex-col gap-4 rounded-lg border border-line bg-paper p-6"
            >
              <span
                aria-hidden="true"
                className="flex size-14 items-center justify-center rounded-lg bg-surface font-mono text-base font-medium tracking-tight text-ink"
              >
                {member.initials}
              </span>
              <div className="flex flex-col gap-1">
                <h3 className="text-base font-medium text-ink">{member.name}</h3>
                <p className="text-sm text-ink-subtle">{member.title}</p>
              </div>
              <p className="text-sm leading-relaxed text-ink-muted">{member.bio}</p>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* Awards */}
      <Section tone="surface">
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <SectionHeading
            eyebrow="Recognition"
            title="Independently recognized for trusted enterprise AI"
            intro="A sample of the awards our work has earned. All mock, like everything else on this demo site."
          />
          <ul className="flex flex-col overflow-hidden rounded-lg border border-line bg-paper">
            {awards.map((award, i) => (
              <Reveal
                as="li"
                key={award.id}
                delay={i * 0.05}
                className="flex items-center gap-4 border-b border-line px-6 py-5 last:border-b-0"
              >
                <span className="flex size-10 shrink-0 items-center justify-center rounded-md bg-surface text-ink-muted">
                  <Trophy className="size-5" />
                </span>
                <div className="flex flex-1 flex-col">
                  <span className="text-base font-medium text-ink">{award.title}</span>
                  <span className="text-sm text-ink-subtle">{award.org}</span>
                </div>
                <Badge tone="outline">{award.year}</Badge>
              </Reveal>
            ))}
          </ul>
        </div>
      </Section>

      {/* Global presence */}
      <Section tone="paper">
        <SectionHeading
          eyebrow="Global presence"
          title="Delivery teams across three regions"
          intro={`${offices.length} locations keep engagements close to customers and within follow-the-sun coverage.`}
          className="mb-12"
        />
        <div className="grid gap-6 lg:grid-cols-3">
          {officesByRegion.map((group, gi) => (
            <Reveal
              key={group.region}
              delay={gi * 0.06}
              className="flex flex-col gap-5 rounded-lg border border-line bg-paper p-6"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <Globe2 className="size-5 text-ink-subtle" />
                  <h3 className="text-base font-medium text-ink">{group.region}</h3>
                </div>
                <Badge tone="neutral">
                  {group.list.length} {group.list.length === 1 ? "location" : "locations"}
                </Badge>
              </div>
              <ul className="flex flex-col gap-3">
                {group.list.map((office) => (
                  <li key={office.id} className="flex items-start gap-3">
                    <MapPin className="mt-0.5 size-4 shrink-0 text-ink-subtle" />
                    <div className="flex flex-1 flex-col">
                      <span className="text-sm font-medium text-ink">
                        {office.city}, {office.country}
                      </span>
                      <span className="text-xs text-ink-subtle">
                        {office.type} · {office.timezone}
                      </span>
                    </div>
                  </li>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* Timeline */}
      <Section tone="surface">
        <SectionHeading
          eyebrow="Company timeline"
          title="From a thesis to a million governed actions a week"
          className="mb-12"
        />
        <ol className="relative flex flex-col">
          {timeline.map((entry, i) => (
            <Reveal
              as="li"
              key={entry.year}
              delay={i * 0.05}
              className="relative grid grid-cols-[auto_1fr] gap-x-6 pb-10 last:pb-0 sm:grid-cols-[7rem_1fr]"
            >
              {/* connector line */}
              {i < timeline.length - 1 ? (
                <span
                  aria-hidden="true"
                  className="absolute left-[5px] top-2 h-full w-px bg-line sm:left-[calc(7rem+5px)]"
                />
              ) : null}
              <div className="flex items-start gap-3 sm:justify-end">
                <span
                  aria-hidden="true"
                  className="mt-1.5 size-2.5 shrink-0 rounded-full bg-accent ring-4 ring-surface sm:order-2"
                />
                <span className="font-mono text-sm font-medium text-ink sm:order-1">
                  {entry.year}
                </span>
              </div>
              <div className="flex flex-col gap-1.5">
                <h3 className="text-base font-medium text-ink">{entry.title}</h3>
                <p className="text-sm leading-relaxed text-ink-muted">{entry.description}</p>
              </div>
            </Reveal>
          ))}
        </ol>
      </Section>

      {/* Testimonial */}
      <Section tone="dark">
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
          <SectionHeading
            eyebrow="In their words"
            title="Why teams choose to build with us"
            invert
          />
          <TestimonialCarousel testimonials={testimonials} tone="dark" />
        </div>
      </Section>

      <CTASection
        eyebrow="Work with us"
        title="Let's scope a workflow worth shipping."
        description="Bring a high-stakes process. We'll map a governed deployment and the path to production."
        primary={{ label: "Book a working session", href: "/contact" }}
        secondary={{ label: "See open roles", href: "/careers" }}
      />
    </>
  );
}
