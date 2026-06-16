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
    <div className="relative flex min-h-[70vh] items-center overflow-hidden bg-paper">
      <div className="pointer-events-none absolute inset-0 grid-lines" aria-hidden="true" />
      <div className="container-page relative">
        <div className="mx-auto flex max-w-2xl flex-col items-center gap-6 py-20 text-center">
          <span className="flex size-12 items-center justify-center rounded-lg border border-line bg-surface text-ink-muted">
            <Search className="size-5" aria-hidden="true" />
          </span>
          <p className="font-mono text-6xl font-medium tracking-tight text-ink md:text-7xl">404</p>
          <h1 className="text-2xl font-medium tracking-tight text-ink md:text-3xl">
            Page not found
          </h1>
          <p className="max-w-md text-ink-muted">
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

          <nav aria-label="Helpful links" className="pt-6">
            <ul className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-sm">
              {helpfulLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-ink-muted underline-offset-4 transition-colors hover:text-ink hover:underline"
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
