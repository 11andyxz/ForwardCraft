import type { Metadata } from "next";
import { pageMetadata } from "@/lib/site";
import { Section } from "@/components/layout/Section";
import { PageHero } from "@/components/sections/PageHero";

export const metadata: Metadata = pageMetadata({
  title: "Terms of service",
  description:
    "The terms that govern use of the ForwardCraft website and services. Mock content for a design-reference build.",
  path: "/terms",
});

const LAST_UPDATED = "June 1, 2026";

export default function TermsPage() {
  return (
    <>
      <PageHero
        eyebrow="Legal"
        title="Terms of service"
        description="The terms that govern your access to and use of the ForwardCraft website and services."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Terms of service", href: "/terms" },
        ]}
      />

      <Section tone="paper">
        <div className="mx-auto max-w-3xl">
          <div className="mb-10 rounded-lg border border-line bg-surface p-5 text-sm text-ink-muted">
            <strong className="font-medium text-ink">Mock content.</strong> This is a design-reference
            build. The text below is original placeholder copy written to demonstrate the layout of a
            terms page — it is not a real or binding agreement and creates no legal obligations.
          </div>

          <p className="mb-12 text-sm text-ink-subtle">Last updated: {LAST_UPDATED}</p>

          <div className="flex flex-col gap-12 text-ink-muted">
            <section>
              <h2 className="mb-3 text-xl font-medium tracking-tight text-ink">1. Acceptance</h2>
              <p className="leading-relaxed">
                By accessing this website or using our services, you agree to these terms. If you are
                using the services on behalf of an organization, you represent that you have authority
                to bind that organization. If you do not agree, please do not use the services.
              </p>
            </section>

            <section>
              <h2 className="mb-3 text-xl font-medium tracking-tight text-ink">2. Use of services</h2>
              <p className="leading-relaxed">
                You may use the services only for lawful purposes and in line with these terms. You agree
                not to misuse the services or interfere with their normal operation.
              </p>
              <ul className="mt-4 list-disc space-y-1.5 pl-5 leading-relaxed">
                <li>No attempts to disrupt, probe, or gain unauthorized access to our systems.</li>
                <li>No use of the services to infringe the rights of others.</li>
                <li>No automated scraping or resale of content without permission.</li>
              </ul>
            </section>

            <section>
              <h2 className="mb-3 text-xl font-medium tracking-tight text-ink">3. Accounts</h2>
              <p className="leading-relaxed">
                Some features may require an account. You are responsible for the accuracy of the
                information you provide and for keeping your credentials secure. Notify us promptly of any
                unauthorized use of your account.
              </p>
            </section>

            <section>
              <h2 className="mb-3 text-xl font-medium tracking-tight text-ink">
                4. Intellectual property
              </h2>
              <p className="leading-relaxed">
                The website, its design, and its original content are owned by ForwardCraft or its
                licensors and are protected by applicable law. These terms do not grant you any right to
                our trademarks, logos, or brand elements without prior written consent.
              </p>
            </section>

            <section>
              <h2 className="mb-3 text-xl font-medium tracking-tight text-ink">5. Disclaimers</h2>
              <p className="leading-relaxed">
                The services are provided &ldquo;as is&rdquo; without warranties of any kind, whether
                express or implied, including fitness for a particular purpose and non-infringement. We do
                not warrant that the services will be uninterrupted or error-free.
              </p>
            </section>

            <section>
              <h2 className="mb-3 text-xl font-medium tracking-tight text-ink">
                6. Limitation of liability
              </h2>
              <p className="leading-relaxed">
                To the maximum extent permitted by law, ForwardCraft will not be liable for any indirect,
                incidental, or consequential damages arising from your use of the services. Nothing in
                these terms limits liability that cannot be limited under applicable law.
              </p>
            </section>

            <section>
              <h2 className="mb-3 text-xl font-medium tracking-tight text-ink">7. Contact</h2>
              <p className="leading-relaxed">
                Questions about these terms? Reach our legal team at{" "}
                <span className="text-ink">legal@forwardcraft.example.com</span>. We may update these
                terms from time to time; the &ldquo;last updated&rdquo; date above reflects the latest
                version.
              </p>
            </section>
          </div>
        </div>
      </Section>
    </>
  );
}
