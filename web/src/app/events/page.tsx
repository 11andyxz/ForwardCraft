import type { Metadata } from "next";
import { pageMetadata } from "@/lib/site";
import { Section } from "@/components/layout/Section";
import { PageHero } from "@/components/sections/PageHero";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { CTASection } from "@/components/sections/CTASection";
import { EventCard } from "@/components/cards/EventCard";
import { NewsletterForm } from "@/components/forms/NewsletterForm";
import { EmptyState } from "@/components/ui/EmptyState";
import { Reveal } from "@/components/animations/Reveal";
import { events } from "@/data/mock/events";

export const metadata: Metadata = pageMetadata({
  title: "Events",
  description:
    "Conferences, webinars, roundtables, and workshops from ForwardCraft — where practitioners share how to put AI into governed production.",
  path: "/events",
});

// Reference "today" for splitting upcoming vs. past, per the build spec.
const TODAY = new Date("2026-06-16").getTime();

export default function EventsPage() {
  const byDateAsc = [...events].sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime(),
  );
  const upcoming = byDateAsc.filter((e) => new Date(e.date).getTime() >= TODAY);
  // Most recent past event first.
  const past = byDateAsc
    .filter((e) => new Date(e.date).getTime() < TODAY)
    .reverse();

  return (
    <>
      <PageHero
        eyebrow="Events"
        title="Meet us where the work happens"
        description="Conferences, webinars, roundtables, and workshops — practical sessions on shipping AI into governed production, led by the people who do it."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Events", href: "/events" },
        ]}
      />

      <Section tone="paper" ariaLabel="Upcoming events">
        <SectionHeading
          eyebrow="Upcoming"
          title="Where we'll be next"
          intro="Reserve a seat — most sessions run small so the conversation stays useful."
          className="mb-10"
        />
        {upcoming.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {upcoming.map((event, i) => (
              <Reveal key={event.id} delay={i * 0.04}>
                <EventCard event={event} />
              </Reveal>
            ))}
          </div>
        ) : (
          <EmptyState
            title="No upcoming events"
            message="Nothing on the calendar right now. Subscribe below and we'll let you know when the next one opens."
          />
        )}
      </Section>

      {past.length > 0 ? (
        <Section tone="surface" ariaLabel="Past events">
          <SectionHeading
            eyebrow="On demand"
            title="Past events"
            intro="Missed one? Reach out and we'll share recordings or materials where available."
            className="mb-10"
          />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {past.map((event, i) => (
              <Reveal key={event.id} delay={i * 0.04}>
                <EventCard event={event} />
              </Reveal>
            ))}
          </div>
        </Section>
      ) : null}

      {/* Newsletter CTA */}
      <Section tone="paper" ariaLabel="Event updates signup">
        <div className="mx-auto flex max-w-2xl flex-col items-center gap-5 text-center">
          <span className="eyebrow">Stay in the loop</span>
          <h2 className="text-2xl font-medium tracking-tight text-ink md:text-3xl">
            Get event invitations first
          </h2>
          <p className="max-w-xl text-base text-ink-muted">
            Subscribe to The Operating Layer and we&apos;ll send new sessions before they fill up.
          </p>
          <NewsletterForm className="w-full max-w-md" />
        </div>
      </Section>

      <CTASection
        eyebrow="Can't make it?"
        title="Bring the session to your team"
        description="We run private roundtables and workshops for enterprise teams. Tell us what you're working on and we'll tailor an agenda."
      />
    </>
  );
}
