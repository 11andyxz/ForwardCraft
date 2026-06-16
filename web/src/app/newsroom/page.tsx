import type { Metadata } from "next";
import { pageMetadata } from "@/lib/site";
import { Section } from "@/components/layout/Section";
import { PageHero } from "@/components/sections/PageHero";
import { CTASection } from "@/components/sections/CTASection";
import { ResourceListing } from "@/components/resources/ResourceListing";
import { categoriesOf } from "@/lib/content";
import { news } from "@/data/mock/news";

export const metadata: Metadata = pageMetadata({
  title: "Newsroom",
  description:
    "Company news from ForwardCraft — funding, partnerships, product launches, compliance milestones, and team growth.",
  path: "/newsroom",
});

export default function NewsroomPage() {
  const featured = news.find((n) => n.featured);

  return (
    <>
      <PageHero
        eyebrow="Newsroom"
        title="What's new at ForwardCraft"
        description="Announcements and milestones — from new offices and partnerships to product launches and compliance certifications."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Newsroom", href: "/newsroom" },
        ]}
      />

      <Section tone="paper" ariaLabel="All news">
        <ResourceListing
          items={news}
          categories={categoriesOf(news)}
          featured={featured}
        />
      </Section>

      <CTASection
        eyebrow="Press"
        title="Working on a story?"
        description="Reach our communications team for briefings, executive commentary, and media assets."
        primary={{ label: "Contact press", href: "/contact" }}
        secondary={{ label: "About ForwardCraft", href: "/about" }}
      />
    </>
  );
}
