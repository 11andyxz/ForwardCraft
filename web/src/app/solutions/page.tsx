import type { Metadata } from "next";
import { pageMetadata } from "@/lib/site";
import { Section } from "@/components/layout/Section";
import { PageHero } from "@/components/sections/PageHero";
import { SolutionsShowcase } from "@/components/sections/SolutionsShowcase";
import { CTASection } from "@/components/sections/CTASection";

export const metadata: Metadata = pageMetadata({
  title: "Solutions",
  description:
    "Cross-industry AI solutions that clear the last mile from pilot to governed production — automate, decide, and build with agents your team controls.",
  path: "/solutions",
});

export default function SolutionsPage() {
  return (
    <>
      <PageHero
        eyebrow="Solutions"
        title="Outcomes, mapped to your workflows"
        description="Composable solutions across three plays — automate the queue, sharpen decisions, and build new AI-native products. Each one ships behind your security perimeter with human approval gates."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Solutions", href: "/solutions" },
        ]}
      />

      <Section tone="paper" ariaLabel="All solutions">
        <SolutionsShowcase />
      </Section>

      <CTASection
        eyebrow="Get started"
        title="Find the highest-leverage play for your team"
        description="Book a working session and we'll scope the solution that clears your biggest bottleneck first."
      />
    </>
  );
}
