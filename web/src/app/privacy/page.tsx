import type { Metadata } from "next";
import { pageMetadata } from "@/lib/site";
import { Section } from "@/components/layout/Section";
import { PageHero } from "@/components/sections/PageHero";

export const metadata: Metadata = pageMetadata({
  title: "Privacy center",
  description:
    "How ForwardCraft handles personal data — what we collect, how we use it, your rights, and how to reach us. Mock content for a design-reference build.",
  path: "/privacy",
});

const LAST_UPDATED = "June 1, 2026";

export default function PrivacyPage() {
  return (
    <>
      <PageHero
        eyebrow="Legal"
        title="Privacy center"
        description="How we collect, use, and protect personal data — and the choices you have along the way."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Privacy center", href: "/privacy" },
        ]}
      />

      <Section tone="paper">
        <div className="mx-auto max-w-3xl">
          <div className="mb-10 rounded-lg border border-line bg-surface p-5 text-sm text-ink-muted">
            <strong className="font-medium text-ink">Mock content.</strong> This is a design-reference
            build. The text below is original placeholder copy written to demonstrate the layout of a
            privacy center — it is not a real privacy policy and creates no legal obligations.
          </div>

          <p className="mb-12 text-sm text-ink-subtle">Last updated: {LAST_UPDATED}</p>

          <div className="flex flex-col gap-12 text-ink-muted">
            <section>
              <h2 className="mb-3 text-xl font-medium tracking-tight text-ink">1. What we collect</h2>
              <p className="leading-relaxed">
                We collect information you give us directly — your name, work email, company, and the
                details you share when you request a demo, subscribe to our newsletter, or apply for a
                role. We also collect limited technical data automatically when you visit the site.
              </p>
              <h3 className="mb-2 mt-6 text-base font-medium text-ink">Categories of data</h3>
              <ul className="list-disc space-y-1.5 pl-5 leading-relaxed">
                <li>Contact details you submit through forms.</li>
                <li>Usage and device data, such as pages viewed and approximate region.</li>
                <li>Communication records when you correspond with our team.</li>
              </ul>
            </section>

            <section>
              <h2 className="mb-3 text-xl font-medium tracking-tight text-ink">2. How we use it</h2>
              <p className="leading-relaxed">
                We use personal data to respond to inquiries, deliver the services you ask for, improve
                the site, and send you communications you have opted into. We do not sell personal data.
              </p>
              <ul className="mt-4 list-disc space-y-1.5 pl-5 leading-relaxed">
                <li>To schedule and run demos and discovery sessions.</li>
                <li>To send newsletters and event updates you subscribe to.</li>
                <li>To understand site performance and prioritize improvements.</li>
              </ul>
            </section>

            <section>
              <h2 className="mb-3 text-xl font-medium tracking-tight text-ink">3. Sharing</h2>
              <p className="leading-relaxed">
                We share personal data only with service providers that help us operate — hosting,
                analytics, and email delivery — under contracts that limit their use of the data. We may
                also disclose data when required by law or to protect our rights.
              </p>
            </section>

            <section>
              <h2 className="mb-3 text-xl font-medium tracking-tight text-ink">4. Your rights</h2>
              <p className="leading-relaxed">
                Depending on where you live, you may have the right to access, correct, export, or delete
                your personal data, and to object to or restrict certain processing. To exercise any of
                these rights, contact us using the details in section 6.
              </p>
              <h3 className="mb-2 mt-6 text-base font-medium text-ink">Retention</h3>
              <p className="leading-relaxed">
                We keep personal data only as long as needed for the purposes described here, or as
                required by applicable law, after which we delete or anonymize it.
              </p>
            </section>

            <section>
              <h2 className="mb-3 text-xl font-medium tracking-tight text-ink">5. Cookies</h2>
              <p className="leading-relaxed">
                We use a small number of cookies to run the site and understand how it is used. You can
                accept all, reject non-essential cookies, or set granular choices at any time using the
                &ldquo;Cookie preferences&rdquo; link in the site footer, which reopens the consent
                manager.
              </p>
            </section>

            <section>
              <h2 className="mb-3 text-xl font-medium tracking-tight text-ink">6. Contact</h2>
              <p className="leading-relaxed">
                Questions about this notice or your data? Reach our privacy team at{" "}
                <span className="text-ink">privacy@forwardcraft.example.com</span>. We aim to respond
                to all requests within 30 days.
              </p>
            </section>
          </div>
        </div>
      </Section>
    </>
  );
}
