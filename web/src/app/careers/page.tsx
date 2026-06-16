import type { Metadata } from "next";
import { Check, Globe2, Heart, MapPin, Sparkles, Users } from "lucide-react";
import type { Metric, Office } from "@/types";
import { pageMetadata } from "@/lib/site";
import { Section } from "@/components/layout/Section";
import { PageHero } from "@/components/sections/PageHero";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Reveal } from "@/components/animations/Reveal";
import { MetricsBand } from "@/components/sections/MetricsBand";
import { CTASection } from "@/components/sections/CTASection";
import { JobBrowser } from "@/components/careers/JobBrowser";
import { jobs, departments, jobLocations } from "@/data/mock/jobs";
import { offices } from "@/data/mock/offices";

export const metadata: Metadata = pageMetadata({
  title: "Careers",
  description:
    "Join ForwardCraft and put enterprise AI into production. Explore open roles across engineering, research, delivery, and go-to-market — remote-friendly and global.",
  path: "/careers",
});

const values = [
  {
    icon: Sparkles,
    title: "Ship into production",
    description:
      "We measure ourselves by what reaches real operations, not what looks good in a demo. Ownership runs end to end.",
  },
  {
    icon: Users,
    title: "Earn trust through rigor",
    description:
      "Our clients operate in regulated, high-stakes environments. We default to evaluation, review, and documentation.",
  },
  {
    icon: Globe2,
    title: "Work in the open",
    description:
      "Clear writing beats meetings. Decisions, tradeoffs, and context live in the open so anyone can move fast.",
  },
  {
    icon: Heart,
    title: "Raise the bar, together",
    description:
      "We give direct feedback, assume good intent, and treat every deployment as a chance to do the best work of our careers.",
  },
];

const benefits = [
  {
    title: "Meaningful equity",
    description: "Every full-time teammate shares in the upside they help build.",
  },
  {
    title: "Comprehensive health",
    description: "Medical, dental, and vision for you and your dependents, globally.",
  },
  {
    title: "Remote flexibility",
    description: "Work from a hub or fully remote in supported regions, with home-office support.",
  },
  {
    title: "Learning budget",
    description: "An annual stipend for courses, conferences, books, and certifications.",
  },
  {
    title: "Recharge sabbatical",
    description: "Four paid weeks to step back and reset after your fourth year.",
  },
  {
    title: "Parental leave",
    description: "Generous, gender-neutral leave plus a phased return-to-work runway.",
  },
];

const stories = [
  {
    name: "Priya Nair",
    role: "Forward Deployed Engineer · San Francisco",
    quote:
      "I joined to ship AI that survives contact with production. Two quarters in, the system I built is grading real work for a Fortune 500 ops team.",
  },
  {
    name: "Marcus Bauer",
    role: "Applied Research Scientist · Remote",
    quote:
      "Research here isn't a sandbox. The evaluation methods I work on transfer straight into deployments — and I see the impact within weeks.",
  },
  {
    name: "Sofia Almeida",
    role: "Technical Program Manager · Toronto",
    quote:
      "The bar is high and the feedback is direct, but it's the most supported I've felt in my career. People genuinely want you to do your best work.",
  },
];

const careerMetrics: Metric[] = [
  { label: "Teammates worldwide", value: "220+", countTo: 220, suffix: "+" },
  { label: "Global offices & hubs", value: "10", countTo: 10 },
  { label: "Countries represented", value: "18", countTo: 18 },
  { label: "Average employee rating", value: "4.7 / 5" },
];

const regionOrder: Office["region"][] = ["Americas", "EMEA", "APAC"];

function initials(name: string): string {
  return name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

export default function CareersPage() {
  const officesByRegion = regionOrder
    .map((region) => ({
      region,
      offices: offices.filter((o) => o.region === region),
    }))
    .filter((group) => group.offices.length > 0);

  return (
    <>
      <PageHero
        eyebrow="Careers"
        title="Build the systems that put AI to work"
        description="ForwardCraft is a global team turning enterprise AI into production — engineered into the operations our clients run every day. Come do the best work of your career."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Careers", href: "/careers" },
        ]}
        actions={
          <>
            <Button href="#roles" withArrow>
              See open roles
            </Button>
            <Button href="/how-we-work" variant="secondary">
              How we work
            </Button>
          </>
        }
      />

      {/* Metrics */}
      <Section tone="paper" size="sm" ariaLabel="By the numbers">
        <MetricsBand metrics={careerMetrics} />
      </Section>

      {/* Culture / values */}
      <Section tone="surface" ariaLabel="Our culture">
        <SectionHeading
          eyebrow="Culture"
          title="How we operate"
          intro="A few principles that shape how we hire, build, and treat one another. They're not posters on a wall — they show up in code review, planning, and the way we ship."
          className="mb-10"
        />
        <div className="grid gap-5 sm:grid-cols-2">
          {values.map((value, i) => {
            const Icon = value.icon;
            return (
              <Reveal key={value.title} delay={i * 0.05}>
                <div className="flex h-full flex-col gap-3 rounded-xl border border-line bg-paper p-6">
                  <span className="flex size-10 items-center justify-center rounded-lg bg-accent-soft text-accent">
                    <Icon className="size-5" />
                  </span>
                  <h3 className="text-lg font-medium text-ink">{value.title}</h3>
                  <p className="text-sm leading-relaxed text-ink-muted">{value.description}</p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </Section>

      {/* Benefits */}
      <Section tone="paper" ariaLabel="Benefits">
        <SectionHeading
          eyebrow="Benefits"
          title="Taken care of, wherever you are"
          intro="We back our team with the time, resources, and security to do their best work for the long run."
          className="mb-10"
        />
        <div className="grid gap-px overflow-hidden rounded-xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
          {benefits.map((benefit, i) => (
            <Reveal key={benefit.title} delay={i * 0.04} className="bg-paper">
              <div className="flex h-full flex-col gap-2.5 p-6">
                <span className="flex size-8 items-center justify-center rounded-md bg-success-soft text-success">
                  <Check className="size-4" />
                </span>
                <h3 className="text-base font-medium text-ink">{benefit.title}</h3>
                <p className="text-sm leading-relaxed text-ink-muted">{benefit.description}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* Global offices */}
      <Section tone="surface" ariaLabel="Global offices">
        <SectionHeading
          eyebrow="Global offices"
          title="Ten hubs, one team"
          intro="We're a remote-friendly company with offices and hubs across three regions. Wherever you are, you're part of one global team."
          className="mb-10"
        />
        <div className="grid gap-6 lg:grid-cols-3">
          {officesByRegion.map((group, i) => (
            <Reveal key={group.region} delay={i * 0.05}>
              <div className="flex h-full flex-col gap-4 rounded-xl border border-line bg-paper p-6">
                <div className="flex items-center justify-between gap-3 border-b border-line pb-3">
                  <h3 className="text-sm font-medium uppercase tracking-wide text-ink">
                    {group.region}
                  </h3>
                  <Badge tone="neutral">{group.offices.length} locations</Badge>
                </div>
                <ul className="flex flex-col gap-3">
                  {group.offices.map((office) => (
                    <li key={office.id} className="flex items-start justify-between gap-3">
                      <span className="flex items-start gap-2 text-sm text-ink">
                        <MapPin className="mt-0.5 size-4 shrink-0 text-ink-subtle" />
                        <span>
                          {office.city}
                          <span className="block text-xs text-ink-subtle">{office.country}</span>
                        </span>
                      </span>
                      <span className="flex shrink-0 items-center gap-2">
                        {office.type === "HQ" ? <Badge tone="accent">HQ</Badge> : null}
                        <span className="text-xs text-ink-subtle">{office.timezone}</span>
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* Employee stories */}
      <Section tone="paper" ariaLabel="Employee stories">
        <SectionHeading
          eyebrow="Life at ForwardCraft"
          title="In their words"
          intro="A few of the people building production AI here. Names and quotes are illustrative mock content."
          className="mb-10"
        />
        <div className="grid gap-6 md:grid-cols-3">
          {stories.map((story, i) => (
            <Reveal key={story.name} delay={i * 0.05}>
              <figure className="flex h-full flex-col gap-5 rounded-xl border border-line bg-surface p-6">
                <blockquote className="text-base leading-relaxed text-ink">
                  &ldquo;{story.quote}&rdquo;
                </blockquote>
                <figcaption className="mt-auto flex items-center gap-3 border-t border-line pt-4">
                  <span
                    aria-hidden="true"
                    className="flex size-10 shrink-0 items-center justify-center rounded-full bg-ink text-sm font-medium text-paper"
                  >
                    {initials(story.name)}
                  </span>
                  <span className="flex flex-col">
                    <span className="text-sm font-medium text-ink">{story.name}</span>
                    <span className="text-xs text-ink-subtle">{story.role}</span>
                  </span>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* Open roles */}
      <Section tone="surface" id="roles" ariaLabel="Open roles">
        <SectionHeading
          eyebrow="Open roles"
          title="Find your role"
          intro="Search and filter our open positions. Don't see an exact match? We're always glad to hear from exceptional people."
          className="mb-10"
        />
        <JobBrowser jobs={jobs} departments={departments} locations={jobLocations} />
      </Section>

      <CTASection
        eyebrow="Join us"
        title="Don't see the right role yet?"
        description="We're growing fast across every team. Tell us what you'd want to build and we'll keep you in mind as new roles open."
        primary={{ label: "Get in touch", href: "/contact" }}
        secondary={{ label: "How we work", href: "/how-we-work" }}
      />
    </>
  );
}
