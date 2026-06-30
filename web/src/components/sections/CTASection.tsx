import { Section } from "@/components/layout/Section";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/animations/Reveal";

interface CTASectionProps {
  eyebrow?: string;
  title?: string;
  description?: string;
  primary?: { label: string; href: string };
  secondary?: { label: string; href: string };
}

/** Dark closing call-to-action band reused across pages. */
export function CTASection({
  eyebrow = "Get started",
  title = "Put AI into production, not pilots.",
  description = "Book a working session with our team. We'll map a high-leverage workflow and scope a governed deployment.",
  primary = { label: "Book a demo", href: "/contact" },
  secondary = { label: "See how we work", href: "/how-we-work" },
}: CTASectionProps) {
  return (
    <Section tone="dark" size="lg" className="grain relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 ambient-accent" />
      <div className="pointer-events-none absolute inset-0 grid-lines-dark" />
      <Reveal className="relative z-10 mx-auto flex max-w-3xl flex-col items-center gap-6 text-center">
        <span className="eyebrow text-ink-inverse-muted">{eyebrow}</span>
        <h2 className="text-3xl text-ink-inverse md:text-5xl">{title}</h2>
        <p className="max-w-xl text-lg text-ink-inverse-muted">{description}</p>
        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          <Button href={primary.href} variant="inverse" size="lg" withArrow>
            {primary.label}
          </Button>
          {secondary ? (
            <Button
              href={secondary.href}
              size="lg"
              className="border border-line-inverse bg-transparent text-ink-inverse hover:border-ink-inverse-muted hover:bg-night-2"
            >
              {secondary.label}
            </Button>
          ) : null}
        </div>
      </Reveal>
    </Section>
  );
}
