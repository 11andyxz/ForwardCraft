import type { Metadata } from "next";
import { Check, Globe2, Mail, ShieldCheck } from "lucide-react";
import { pageMetadata, site } from "@/lib/site";
import { Section } from "@/components/layout/Section";
import { PageHero } from "@/components/sections/PageHero";
import { Badge } from "@/components/ui/Badge";
import { Reveal } from "@/components/animations/Reveal";
import { ContactForm } from "@/components/forms/ContactForm";
import { offices } from "@/data/mock/offices";

export const metadata: Metadata = pageMetadata({
  title: "Book a demo",
  description:
    "Book a working session with the ForwardCraft team. We'll map a high-leverage workflow and scope a governed, production-ready AI deployment for your enterprise.",
  path: "/contact",
});

const expectations = [
  {
    title: "A working session, not a pitch",
    description:
      "We map one of your highest-leverage workflows and sketch how a governed deployment would actually run.",
  },
  {
    title: "A response within one business day",
    description:
      "A senior member of our team reviews every request and follows up to schedule a time that works for you.",
  },
  {
    title: "No pressure, no obligation",
    description:
      "We'll be candid about fit. If AI isn't the right tool for your problem yet, we'll tell you.",
  },
];

const trustBadges = ["SOC 2 Type II", "HIPAA-aligned", "GDPR-compliant"];

const regions = Array.from(new Set(offices.map((o) => o.region)));

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Book a demo"
        description="Tell us about the workflow you want to put AI to work on. We'll come prepared with a point of view and a path from pilot to production."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Contact", href: "/contact" },
        ]}
      />

      <Section tone="paper" ariaLabel="Book a demo">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          {/* Left column: value props + details */}
          <div className="flex flex-col gap-10">
            <Reveal className="flex flex-col gap-6">
              <h2 className="text-2xl font-medium tracking-tight text-ink">What to expect</h2>
              <ul className="flex flex-col gap-5">
                {expectations.map((item) => (
                  <li key={item.title} className="flex items-start gap-3">
                    <span className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full bg-success-soft text-success">
                      <Check className="size-3.5" />
                    </span>
                    <span className="flex flex-col gap-1">
                      <span className="text-base font-medium text-ink">{item.title}</span>
                      <span className="text-sm leading-relaxed text-ink-muted">
                        {item.description}
                      </span>
                    </span>
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal className="flex flex-col gap-4 border-t border-line pt-8" delay={0.05}>
              <h2 className="text-sm font-medium uppercase tracking-wide text-ink-subtle">
                Other ways to reach us
              </h2>
              <a
                href={`mailto:${site.email}`}
                className="flex items-center gap-3 text-sm text-ink transition-colors hover:text-accent"
              >
                <span className="flex size-9 items-center justify-center rounded-md border border-line bg-surface text-ink-subtle">
                  <Mail className="size-4" />
                </span>
                {site.email}
              </a>
              <div className="flex items-start gap-3 text-sm text-ink">
                <span className="flex size-9 shrink-0 items-center justify-center rounded-md border border-line bg-surface text-ink-subtle">
                  <Globe2 className="size-4" />
                </span>
                <span className="flex flex-col gap-0.5">
                  <span>Offices across {regions.join(", ")}</span>
                  <span className="text-xs text-ink-subtle">
                    {offices.length} hubs worldwide — we&apos;ll match you with the right region.
                  </span>
                </span>
              </div>
            </Reveal>

            <Reveal className="flex flex-col gap-3 border-t border-line pt-8" delay={0.1}>
              <h2 className="flex items-center gap-2 text-sm font-medium uppercase tracking-wide text-ink-subtle">
                <ShieldCheck className="size-4" />
                Enterprise-grade by default
              </h2>
              <div className="flex flex-wrap gap-2">
                {trustBadges.map((badge) => (
                  <Badge key={badge} tone="outline">
                    {badge}
                  </Badge>
                ))}
              </div>
              <p className="text-xs leading-relaxed text-ink-subtle">
                Security and compliance posture shown is illustrative mock content for this
                demonstration site.
              </p>
            </Reveal>
          </div>

          {/* Right column: the form */}
          <Reveal delay={0.1}>
            <div className="rounded-2xl border border-line bg-paper p-6 md:p-8">
              <div className="mb-6 flex flex-col gap-1.5">
                <h2 className="text-xl font-medium tracking-tight text-ink">Request a demo</h2>
                <p className="text-sm text-ink-muted">
                  Fields marked <span className="text-danger">*</span> are required.
                </p>
              </div>
              <ContactForm />
            </div>
          </Reveal>
        </div>
      </Section>

      {/* Reassurance footer — this is the conversion page, so no closing CTA. */}
      <Section tone="surface" size="sm" ariaLabel="Reassurance">
        <Reveal className="mx-auto flex max-w-2xl flex-col items-center gap-2 text-center">
          <p className="text-base font-medium text-ink">
            Your details stay yours.
          </p>
          <p className="text-sm leading-relaxed text-ink-muted">
            We only use what you share to prepare for your session and to follow up about your
            request. No spam, no resale — and you can ask us to delete your information at any time.
          </p>
        </Reveal>
      </Section>
    </>
  );
}
