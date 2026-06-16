import type { Metadata } from "next";
import { pageMetadata } from "@/lib/site";
import { Section } from "@/components/layout/Section";
import { PageHero } from "@/components/sections/PageHero";
import { CTASection } from "@/components/sections/CTASection";
import { ResourceListing } from "@/components/resources/ResourceListing";
import { categoriesOf } from "@/lib/content";
import { reports } from "@/data/mock/reports";

export const metadata: Metadata = pageMetadata({
  title: "Reports",
  description:
    "Benchmarks and research reports on enterprise AI — adoption patterns, ROI, governance, and industry deep-dives.",
  path: "/reports",
});

export default function ReportsPage() {
  const featured = reports.find((r) => r.featured);

  return (
    <>
      <PageHero
        eyebrow="Reports"
        title="Benchmarks for governed AI"
        description="Data-backed reports on how enterprises move from pilots to production — what works, what stalls, and where the value lands."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Reports", href: "/reports" },
        ]}
      />

      <Section tone="paper" ariaLabel="All reports">
        <ResourceListing
          items={reports}
          categories={categoriesOf(reports)}
          featured={featured}
        />
      </Section>

      <CTASection
        eyebrow="Go deeper"
        title="Turn benchmarks into a deployment plan"
        description="Book a working session. We'll map a high-leverage workflow and scope a governed deployment your team can own."
      />
    </>
  );
}
