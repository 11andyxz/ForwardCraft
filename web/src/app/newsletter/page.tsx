import type { Metadata } from "next";
import { Calendar, Inbox, Users, Sparkles } from "lucide-react";
import { pageMetadata } from "@/lib/site";
import { Section } from "@/components/layout/Section";
import { PageHero } from "@/components/sections/PageHero";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { CTASection } from "@/components/sections/CTASection";
import { NewsletterForm } from "@/components/forms/NewsletterForm";
import { ArticleCard } from "@/components/cards/ArticleCard";
import { Reveal } from "@/components/animations/Reveal";
import { blogPosts } from "@/lib/content";

export const metadata: Metadata = pageMetadata({
  title: "The Operating Layer — Newsletter",
  description:
    "Join 30,000+ operators and engineers. The Operating Layer is a twice-monthly newsletter on putting enterprise AI into governed production.",
  path: "/newsletter",
});

const valueProps = [
  {
    icon: Inbox,
    title: "What you get",
    description:
      "One focused read on the operational reality of enterprise AI — integration, evaluation, governance, and the metrics that survive a CFO review.",
  },
  {
    icon: Calendar,
    title: "Cadence",
    description:
      "Twice a month. Short enough to finish over coffee, substantive enough to forward to your team. No filler, no spam.",
  },
  {
    icon: Users,
    title: "Who reads it",
    description:
      "More than 30,000 operators, engineers, and leaders at enterprises moving AI from pilots to production.",
  },
];

export default function NewsletterPage() {
  // A few recent issues, newest first.
  const recentIssues = [...blogPosts]
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
    .slice(0, 3);

  return (
    <>
      <PageHero
        eyebrow="Newsletter"
        title="The Operating Layer"
        description="Field notes on putting enterprise AI into governed production — for the operators and engineers who own it. Join 30,000+ subscribers."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Newsletter", href: "/newsletter" },
        ]}
        aside={
          <div className="flex flex-col gap-4 rounded-xl border border-line bg-paper p-6 md:p-8">
            <div className="flex items-center gap-2 text-ink">
              <Sparkles className="size-5 text-accent" />
              <span className="text-sm font-medium">Subscribe free</span>
            </div>
            <p className="text-sm text-ink-muted">
              Get the next issue in your inbox. Unsubscribe anytime.
            </p>
            <NewsletterForm />
          </div>
        }
      />

      {/* Value props */}
      <Section tone="paper" ariaLabel="What you get">
        <SectionHeading
          eyebrow="Why subscribe"
          title="Signal, not noise"
          intro="The Operating Layer exists to make one hard thing easier: actually running AI in production."
          className="mb-12"
        />
        <div className="grid gap-px overflow-hidden rounded-lg border border-line bg-line md:grid-cols-3">
          {valueProps.map((prop, i) => {
            const Icon = prop.icon;
            return (
              <Reveal key={prop.title} delay={i * 0.05} className="flex flex-col gap-3 bg-paper p-6 md:p-8">
                <span className="flex size-11 items-center justify-center rounded-lg bg-surface text-ink">
                  <Icon className="size-5" />
                </span>
                <h3 className="text-base font-medium text-ink">{prop.title}</h3>
                <p className="text-sm text-ink-muted">{prop.description}</p>
              </Reveal>
            );
          })}
        </div>
      </Section>

      {/* Prominent signup band */}
      <Section tone="dark" ariaLabel="Subscribe">
        <div className="mx-auto flex max-w-2xl flex-col items-center gap-6 text-center">
          <span className="eyebrow text-ink-inverse-muted">Join 30,000+ operators</span>
          <h2 className="text-3xl font-medium tracking-tight text-ink-inverse md:text-4xl">
            Two issues a month. Zero fluff.
          </h2>
          <p className="max-w-xl text-lg text-ink-inverse-muted">
            Enter your work email and we&apos;ll add you to the next send.
          </p>
          <NewsletterForm invert className="w-full max-w-md" />
        </div>
      </Section>

      {/* Recent issues */}
      <Section tone="paper" ariaLabel="Recent issues">
        <SectionHeading
          eyebrow="From the archive"
          title="Recent issues"
          intro="A sample of what lands in your inbox."
          className="mb-10"
        />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {recentIssues.map((issue) => (
            <ArticleCard key={issue.slug} article={issue} />
          ))}
        </div>
      </Section>

      <CTASection
        eyebrow="Beyond the inbox"
        title="Ready to put it into production?"
        description="Book a working session. We'll map a high-leverage workflow and scope a governed deployment your team can own."
      />
    </>
  );
}
