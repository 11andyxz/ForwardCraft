import Link from "next/link";
import { Home, Search } from "lucide-react";
import { Button } from "@/components/ui/Button";

const helpfulLinks = [
  { label: "Industries", href: "/industries" },
  { label: "Solutions", href: "/solutions" },
  { label: "AI training", href: "/ai-training" },
  { label: "Case studies", href: "/case-studies" },
  { label: "Careers", href: "/careers" },
];

/** 404 — page not found. Server component. */
export default function NotFound() {
  return (
    <div className="relative flex min-h-[78vh] items-center overflow-hidden bg-paper">
      <div className="pointer-events-none absolute inset-0 grid-lines" aria-hidden="true" />
      <div className="container-page relative">
        <div className="mx-auto flex max-w-xl flex-col items-center gap-6 py-24 text-center md:py-28">
          <span
            className="flex size-12 items-center justify-center rounded-xl border border-line bg-surface text-ink-muted shadow-sm"
          >
            <Search className="size-5" aria-hidden="true" />
          </span>

          <p className="font-display nums-tabular text-7xl font-medium leading-none tracking-[-0.04em] text-ink md:text-[8.5rem]">
            404
          </p>

          <h1 className="text-3xl tracking-tight text-ink md:text-4xl">
            Page not found
          </h1>
          <p className="max-w-md text-base text-ink-muted">
            The page you&apos;re looking for has moved, been renamed, or never existed. Let&apos;s get
            you back to something useful.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <Button href="/" withArrow>
              <Home className="size-4" aria-hidden="true" />
              Back to home
            </Button>
            <Button href="/contact" variant="secondary">
              Book a demo
            </Button>
          </div>

          <nav
            aria-label="Helpful links"
            className="mt-6 w-full rounded-xl border border-line bg-surface/60 px-5 py-4 shadow-sm backdrop-blur-sm"
          >
            <ul className="flex flex-wrap items-center justify-center gap-x-2 gap-y-1 text-sm">
              {helpfulLinks.map((link, i) => (
                <li key={link.href} className="flex items-center gap-2">
                  {i > 0 ? (
                    <span className="text-line-strong" aria-hidden="true">
                      &middot;
                    </span>
                  ) : null}
                  <Link
                    href={link.href}
                    className="rounded-sm px-1 py-0.5 text-ink-muted underline-offset-4 transition-colors duration-200 ease-[cubic-bezier(0.16,1,0.3,1)] hover:text-accent hover:underline active:translate-y-px"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </div>
  );
}
