import Link from "next/link";
import { footerColumns } from "@/data/mock/navigation";
import { site } from "@/lib/site";
import { Logo } from "./Logo";
import { NewsletterForm } from "@/components/forms/NewsletterForm";
import { Accordion } from "@/components/ui/Accordion";
import { CookiePrefsButton } from "@/components/ui/CookieConsent";

const compliance = ["SOC 2 Type II", "HIPAA", "GDPR", "ISO 27001"];

function ColumnLinks({ leaves }: { leaves: { label: string; href: string }[] }) {
  return (
    <ul className="flex flex-col gap-2.5">
      {leaves.map((leaf) => (
        <li key={leaf.href}>
          <Link href={leaf.href} className="text-sm text-ink-inverse-muted transition-colors hover:text-ink-inverse">
            {leaf.label}
          </Link>
        </li>
      ))}
    </ul>
  );
}

export function Footer() {
  const year = 2026;

  return (
    <footer className="bg-night text-ink-inverse">
      <div className="container-page py-16 md:py-20">
        <div className="grid gap-12 lg:grid-cols-[1.1fr_2fr]">
          {/* Brand + newsletter */}
          <div className="flex flex-col gap-6">
            <Logo invert />
            <p className="max-w-xs text-sm text-ink-inverse-muted">{site.description}</p>
            <div className="flex flex-col gap-3">
              <p className="eyebrow text-ink-inverse-muted">The Operating Layer — newsletter</p>
              <NewsletterForm invert className="max-w-sm" />
            </div>
            <div className="flex items-center gap-2">
              {[
                { href: site.social.linkedin, label: "LinkedIn", short: "in" },
                { href: site.social.x, label: "X", short: "X" },
                { href: site.social.youtube, label: "YouTube", short: "YT" },
                { href: site.social.github, label: "GitHub", short: "GH" },
              ].map(({ href, label, short }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="flex size-9 items-center justify-center rounded-md border border-line-inverse font-mono text-xs font-medium text-ink-inverse-muted transition-colors hover:border-ink-inverse-muted hover:text-ink-inverse"
                >
                  {short}
                </a>
              ))}
            </div>
          </div>

          {/* Link columns — grid on desktop, accordion on mobile */}
          <div>
            <div className="hidden grid-cols-2 gap-8 md:grid lg:grid-cols-5">
              {footerColumns.map((col) => (
                <div key={col.heading} className="flex flex-col gap-3">
                  <p className="text-2xs font-medium uppercase tracking-wider text-ink-inverse">{col.heading}</p>
                  <ColumnLinks leaves={col.leaves} />
                </div>
              ))}
            </div>
            <div className="md:hidden">
              <Accordion
                items={footerColumns.map((col) => ({
                  id: col.heading,
                  trigger: <span className="text-ink-inverse">{col.heading}</span>,
                  content: <ColumnLinks leaves={col.leaves} />,
                }))}
                className="border-line-inverse [&>div]:border-line-inverse"
              />
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-14 flex flex-col gap-6 border-t border-line-inverse pt-8">
          <div className="flex flex-wrap items-center gap-2">
            {compliance.map((c) => (
              <span
                key={c}
                className="rounded-md border border-line-inverse px-2.5 py-1 text-2xs font-medium tracking-wide text-ink-inverse-muted"
              >
                {c}
              </span>
            ))}
          </div>
          <div className="flex flex-col gap-4 text-sm text-ink-inverse-muted sm:flex-row sm:items-center sm:justify-between">
            <p>
              © {year} AndyXiongZheng LLC. ForwardCraft is a business brand of AndyXiongZheng LLC.
            </p>
            <nav className="flex flex-wrap items-center gap-x-5 gap-y-2" aria-label="Legal">
              <Link href="/privacy" className="hover:text-ink-inverse">
                Privacy center
              </Link>
              <Link href="/terms" className="hover:text-ink-inverse">
                Terms
              </Link>
              <CookiePrefsButton className="hover:text-ink-inverse">Cookie preferences</CookiePrefsButton>
              <Link href="/about" className="hover:text-ink-inverse">
                Modern slavery statement
              </Link>
            </nav>
          </div>
        </div>
      </div>
    </footer>
  );
}
