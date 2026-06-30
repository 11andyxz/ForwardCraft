import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/Button";
import { StaggerText } from "@/components/animations/StaggerText";
import { Reveal } from "@/components/animations/Reveal";
import { HeroGraphic } from "./HeroGraphic";

/** Homepage hero — asymmetric, lots of whitespace, schematic on the right. */
export function HomeHero() {
  return (
    <section className="grain relative overflow-hidden border-b border-line bg-paper">
      <div className="pointer-events-none absolute inset-0 grid-lines" />
      <Container className="relative z-10 py-20 md:py-28">
        <div className="grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="flex flex-col gap-7">
            <Reveal as="span" className="eyebrow">
              Custom AI agents · Workflow automation · Software integration
            </Reveal>

            <h1 className="text-4xl text-ink md:text-6xl">
              <StaggerText
                lines={["Enterprise AI,", "engineered into", "your operations."]}
              />
            </h1>

            <Reveal as="p" delay={0.3} className="max-w-xl text-lg text-ink-muted">
              We build, evaluate, and operate custom AI agents that take real action inside your
              systems — governed, audited, and owned by your team. Production, not pilots.
            </Reveal>

            <Reveal as="div" delay={0.4} className="flex flex-wrap items-center gap-3">
              <Button href="/contact" size="lg" withArrow>
                Book a demo
              </Button>
              <Button href="/how-we-work" variant="secondary" size="lg">
                How we work
              </Button>
            </Reveal>

            <Reveal as="div" delay={0.5} className="flex flex-wrap items-center gap-x-8 gap-y-2.5 border-t border-line pt-6 font-mono text-xs uppercase tracking-[0.1em] text-ink-muted nums-tabular">
              <span className="flex items-center gap-2">
                <span className="size-1.5 rounded-full bg-success shadow-[0_0_0_3px_var(--color-success-soft)]" /> 1.2M+ governed actions / week
              </span>
              <span className="flex items-center gap-2">
                <span className="size-1.5 rounded-full bg-success shadow-[0_0_0_3px_var(--color-success-soft)]" /> SOC 2 · HIPAA · GDPR
              </span>
            </Reveal>
          </div>

          <Reveal
            delay={0.3}
            className="group rounded-2xl border border-line bg-surface/60 p-6 shadow-md backdrop-blur-sm transition-[transform,box-shadow] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-0.5 hover:shadow-lg"
          >
            <HeroGraphic />
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
