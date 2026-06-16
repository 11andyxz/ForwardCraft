import Link from "next/link";
import type { ReactNode } from "react";
import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { Container } from "@/components/layout/Container";
import { Reveal } from "@/components/animations/Reveal";

interface Crumb {
  label: string;
  href: string;
}

interface PageHeroProps {
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  breadcrumbs?: Crumb[];
  actions?: ReactNode;
  aside?: ReactNode;
  tone?: "light" | "dark";
  /** Title size. */
  size?: "md" | "lg";
}

/** Generic inner-page hero with optional breadcrumb, actions, and aside. */
export function PageHero({
  eyebrow,
  title,
  description,
  breadcrumbs,
  actions,
  aside,
  tone = "light",
  size = "md",
}: PageHeroProps) {
  const dark = tone === "dark";
  return (
    <section className={cn("relative overflow-hidden border-b", dark ? "bg-night border-line-inverse" : "bg-paper border-line")}>
      <div className={cn("pointer-events-none absolute inset-0", dark ? "grid-lines-dark" : "grid-lines")} />
      <Container className="relative py-16 md:py-24">
        <div className={cn("grid items-center gap-10", aside ? "lg:grid-cols-[1.2fr_1fr]" : "")}>
          <div className="flex flex-col gap-5">
            {breadcrumbs ? (
              <nav aria-label="Breadcrumb">
                <ol className="flex flex-wrap items-center gap-1 text-xs">
                  {breadcrumbs.map((c, i) => (
                    <li key={c.href} className="flex items-center gap-1">
                      {i > 0 ? <ChevronRight className={cn("size-3", dark ? "text-ink-inverse-muted" : "text-ink-subtle")} /> : null}
                      <Link
                        href={c.href}
                        className={cn(
                          "transition-colors",
                          dark ? "text-ink-inverse-muted hover:text-ink-inverse" : "text-ink-subtle hover:text-ink",
                        )}
                      >
                        {c.label}
                      </Link>
                    </li>
                  ))}
                </ol>
              </nav>
            ) : null}

            {eyebrow ? <Reveal as="span" className={cn("eyebrow", dark && "text-ink-inverse-muted")}>{eyebrow}</Reveal> : null}

            <Reveal as="div" delay={0.05}>
              <h1
                className={cn(
                  "font-medium tracking-tight",
                  size === "lg" ? "text-4xl md:text-6xl" : "text-3xl md:text-5xl",
                  dark ? "text-ink-inverse" : "text-ink",
                )}
              >
                {title}
              </h1>
            </Reveal>

            {description ? (
              <Reveal as="p" delay={0.1} className={cn("max-w-2xl text-lg", dark ? "text-ink-inverse-muted" : "text-ink-muted")}>
                {description}
              </Reveal>
            ) : null}

            {actions ? (
              <Reveal as="div" delay={0.15} className="flex flex-wrap items-center gap-3 pt-2">
                {actions}
              </Reveal>
            ) : null}
          </div>

          {aside ? <Reveal as="div" delay={0.2}>{aside}</Reveal> : null}
        </div>
      </Container>
    </section>
  );
}
