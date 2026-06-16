import type { Metadata } from "next";
import { pageMetadata } from "@/lib/site";
import { Section } from "@/components/layout/Section";
import { PageHero } from "@/components/sections/PageHero";
import { CTASection } from "@/components/sections/CTASection";
import { ResourceListing } from "@/components/resources/ResourceListing";
import { blogPosts, categoriesOf } from "@/lib/content";

export const metadata: Metadata = pageMetadata({
  title: "Blog",
  description:
    "Field notes on putting enterprise AI into governed production — strategy, engineering, operations, and security.",
  path: "/blog",
});

export default function BlogPage() {
  const featured = blogPosts.find((p) => p.featured);

  return (
    <>
      <PageHero
        eyebrow="Blog"
        title="Notes from the last mile"
        description="Practical writing on shipping AI into the systems your teams already run — from evaluation gates to agent governance."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Blog", href: "/blog" },
        ]}
      />

      <Section tone="paper" ariaLabel="All blog posts">
        <ResourceListing
          items={blogPosts}
          categories={categoriesOf(blogPosts)}
          featured={featured}
        />
      </Section>

      <CTASection
        eyebrow="Stay current"
        title="Put these ideas into production"
        description="Book a working session. We'll map a high-leverage workflow and scope a governed deployment your team can own."
      />
    </>
  );
}
