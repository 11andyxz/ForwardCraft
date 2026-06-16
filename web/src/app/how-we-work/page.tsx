import type { Metadata } from "next";
import { Lock, ShieldCheck, FileSearch, Gauge, Network, Target, GitBranch, Check } from "lucide-react";
import { pageMetadata, site } from "@/lib/site";
import { Section } from "@/components/layout/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/animations/Reveal";
import { PageHero } from "@/components/sections/PageHero";
import { WorkflowSteps } from "@/components/sections/WorkflowSteps";
import { MetricsBand } from "@/components/sections/MetricsBand";
import { CTASection } from "@/components/sections/CTASection";
import type { Metric, WorkflowStep } from "@/types";

export const metadata: Metadata = pageMetadata({
  title: "How We Work",
  description:
    "Our production-first delivery model: Discover, Design, Build, Evaluate, Operate — governed and auditable at every step.",
  path: "/how-we-work",
});

const steps: WorkflowStep[] = [
  {
    step: 1,
    title: "Discover",
    description:
      "We map the workflow end to end — owners, data, decisions, edge cases — and pick the slice with the highest payback and the clearest path to production.",
  },
  {
    step: 2,
    title: "Design",
    description:
      "We define the target system: where agents act, where humans decide, which guardrails apply, and the evaluations that gate every release.",
  },
  {
    step: 3,
    title: "Build",
    description:
      "We integrate against real systems and data behind your permissions, wiring approval gates and audit logging in from the first commit.",
  },
  {
    step: 4,
    title: "Evaluate",
    description:
      "We measure against your acceptance criteria with offline and online evals, expert review on hard cases, and a clear bar to pass before launch.",
  },
  {
    step: 5,
    title: "Operate",
    description:
      "We hand over a system your team owns — monitored, documented, and tuned — then keep improving it against live signals.",
  },
];

const deliveryMetrics: Metric[] = [
  { label: "Time to first production", value: "8–12wk" },
  { label: "Average payback", value: "4.2x", countTo: 4.2, suffix: "x" },
  { label: "Audit coverage", value: "100%", countTo: 100, suffix: "%" },
  { label: "Actions governed / week", value: "1.2M" },
];

const differentiators = [
  {
    icon: Target,
    title: "We start from the workflow",
    description:
      "Not the model. We scope the slice of work that pays for itself and design the whole system around it — approvals, fallbacks, and all.",
  },
  {
    icon: Network,
    title: "A human expert network",
    description:
      "11,000+ vetted domain experts handle the judgment calls in minutes. Their decisions flow back into evaluation, so the system keeps learning.",
  },
  {
    icon: Gauge,
    title: "Evaluation is the gate",
    description:
      "Nothing ships on a vibe. Every release clears measurable acceptance criteria, and regressions block the gate automatically.",
  },
  {
    icon: GitBranch,
    title: "You own what we build",
    description:
      "We deliver systems your engineers can read, run, and extend. No black boxes, no dependency on us to keep the lights on.",
  },
];

const controls = [
  {
    icon: Lock,
    title: "Scoped permissions",
    description:
      "Agents act under least-privilege identities. They only touch the systems and records a given task requires.",
  },
  {
    icon: Check,
    title: "Approval gates",
    description:
      "High-impact actions pause for human sign-off. Thresholds are configurable per workflow and per role.",
  },
  {
    icon: FileSearch,
    title: "Audit trails",
    description:
      "Every action — inputs, decision, output, reviewer — is logged immutably and exportable for compliance.",
  },
  {
    icon: Gauge,
    title: "Continuous evals",
    description:
      "Offline and online evaluations run on every change, catching drift and regressions before they reach users.",
  },
];

const complianceBadges = ["SOC 2 Type II", "HIPAA", "GDPR"];

export default function HowWeWorkPage() {
  return (
    <>
      <PageHero
        eyebrow="How we work"
        title="A production-first delivery model"
        description={`${site.name} runs every engagement through five disciplined phases — built so AI reaches governed production, not a pilot graveyard.`}
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "How we work", href: "/how-we-work" },
        ]}
        actions={
          <>
            <Button href="/contact" withArrow>
              Scope an engagement
            </Button>
            <Button href="/case-studies" variant="secondary">
              See the results
            </Button>
          </>
        }
      />

      {/* Narrative */}
      <Section tone="paper">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <SectionHeading
            eyebrow="The model"
            title="Production is the deliverable — everything else is in service of it"
          />
          <Reveal className="flex flex-col gap-5 text-base leading-relaxed text-ink-muted">
            <p>
              Most AI projects die in the gap between a promising demo and a system the business can
              actually depend on. We close that gap by treating production as the goal from day one,
              not a phase we get to later.
            </p>
            <p>
              That means we design backwards from the workflow as it really runs: the approvals, the
              exceptions, the auditors, the people who own the outcome. Agents handle the routine
              work inside guardrails. A network of domain experts handles the judgment calls. And
              evaluation — not optimism — decides what ships.
            </p>
            <p>
              The result is a system your team owns and operates, with every action governed and
              traceable. Below is the path we run, and the controls that make it safe in regulated
              environments.
            </p>
          </Reveal>
        </div>
      </Section>

      {/* Workflow steps */}
      <Section tone="surface">
        <SectionHeading
          eyebrow="Delivery process"
          title="Five phases, from discovery to operation"
          intro="Each phase has clear exit criteria. We don't advance until the prior one is met."
          className="mb-12"
        />
        <WorkflowSteps steps={steps} />
      </Section>

      {/* Differentiators */}
      <Section tone="paper">
        <SectionHeading
          eyebrow="What makes us different"
          title="Four things teams notice within the first month"
          className="mb-12"
        />
        <div className="grid gap-px overflow-hidden rounded-lg border border-line bg-line sm:grid-cols-2">
          {differentiators.map((d, i) => {
            const Icon = d.icon;
            return (
              <Reveal key={d.title} delay={i * 0.05} className="flex flex-col gap-4 bg-paper p-8">
                <span className="flex size-10 items-center justify-center rounded-md bg-accent-soft text-accent">
                  <Icon className="size-5" />
                </span>
                <h3 className="text-lg font-medium text-ink">{d.title}</h3>
                <p className="text-sm leading-relaxed text-ink-muted">{d.description}</p>
              </Reveal>
            );
          })}
        </div>
      </Section>

      {/* Governance & security */}
      <Section tone="dark">
        <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
          <div className="flex flex-col gap-6">
            <SectionHeading
              eyebrow="Governance & security"
              title="Controls that let regulated teams say yes"
              intro="The guardrails are part of the product, not a checklist we attach at the end."
              invert
            />
            <div className="flex flex-wrap gap-2.5">
              {complianceBadges.map((badge) => (
                <span
                  key={badge}
                  className="inline-flex items-center gap-2 rounded-full border border-line-inverse px-3.5 py-1.5 text-xs font-medium text-ink-inverse"
                >
                  <ShieldCheck className="size-3.5 text-ink-inverse-muted" />
                  {badge}
                </span>
              ))}
            </div>
          </div>
          <div className="grid gap-px overflow-hidden rounded-lg border border-line-inverse bg-line-inverse sm:grid-cols-2">
            {controls.map((c, i) => {
              const Icon = c.icon;
              return (
                <Reveal key={c.title} delay={i * 0.05} className="flex flex-col gap-3 bg-night p-6">
                  <span className="flex size-9 items-center justify-center rounded-md bg-night-2 text-ink-inverse">
                    <Icon className="size-4" />
                  </span>
                  <h3 className="text-base font-medium text-ink-inverse">{c.title}</h3>
                  <p className="text-sm leading-relaxed text-ink-inverse-muted">{c.description}</p>
                </Reveal>
              );
            })}
          </div>
        </div>
      </Section>

      {/* Delivery metrics */}
      <Section tone="surface" size="sm">
        <Reveal className="mb-8">
          <p className="eyebrow">Outcomes we hold ourselves to</p>
        </Reveal>
        <MetricsBand metrics={deliveryMetrics} />
      </Section>

      <CTASection
        eyebrow="Get started"
        title="Bring a workflow. We'll bring the production plan."
        description="A short working session is enough to scope the first slice and the evaluations that gate it."
        primary={{ label: "Book a working session", href: "/contact" }}
        secondary={{ label: "Explore the platform", href: "/" }}
      />
    </>
  );
}
