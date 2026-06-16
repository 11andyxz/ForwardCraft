import { Link2, Send, Share2 } from "lucide-react";
import type { Article } from "@/types";
import { formatDate, readingTime, slugify } from "@/lib/utils";
import { kindLabel, relatedArticles } from "@/lib/content";
import { Section } from "@/components/layout/Section";
import { Container } from "@/components/layout/Container";
import { PageHero } from "@/components/sections/PageHero";
import { RelatedGrid } from "@/components/sections/RelatedGrid";
import { CoverArt } from "@/components/ui/CoverArt";
import { ArticleCard } from "@/components/cards/ArticleCard";
import { NewsletterForm } from "@/components/forms/NewsletterForm";
import { Reveal } from "@/components/animations/Reveal";
import { ArticleToc } from "@/components/resources/ArticleToc";

interface ArticleDetailProps {
  article: Article;
  /** Listing route + label for the breadcrumb (defaults derived from kind). */
  section?: { label: string; href: string };
}

const kindSection: Record<Article["kind"], { label: string; href: string }> = {
  blog: { label: "Blog", href: "/blog" },
  report: { label: "Reports", href: "/reports" },
  research: { label: "Research", href: "/research" },
  news: { label: "Newsroom", href: "/newsroom" },
};

/** Estimated word count from the body, for a reading-time line. */
function wordCount(article: Article): number {
  return article.body.reduce(
    (sum, block) => sum + block.paragraphs.join(" ").split(/\s+/).filter(Boolean).length,
    0,
  );
}

/** Full article detail: hero, meta row, TOC + body, newsletter CTA, related. */
export function ArticleDetail({ article, section }: ArticleDetailProps) {
  const crumbSection = section ?? kindSection[article.kind];
  const toc = article.body.map((block) => ({
    id: slugify(block.heading),
    heading: block.heading,
  }));
  const related = relatedArticles(article);
  const shareLabel = encodeURIComponent(article.title);

  return (
    <article>
      <PageHero
        eyebrow={`${kindLabel(article.kind)} · ${article.category}`}
        title={article.title}
        description={article.excerpt}
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: crumbSection.label, href: crumbSection.href },
          { label: article.title, href: `${crumbSection.href}/${article.slug}` },
        ]}
        aside={
          <div className="overflow-hidden rounded-xl border border-line bg-paper">
            <CoverArt seed={article.slug} className="aspect-[16/10] w-full" />
          </div>
        }
      />

      {/* Meta row */}
      <Section tone="paper" size="sm" ariaLabel="Article details">
        <div className="flex flex-col gap-4 border-b border-line pb-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-ink-muted">
            <span className="font-medium text-ink">{article.author}</span>
            {article.authorTitle ? (
              <>
                <span aria-hidden>·</span>
                <span>{article.authorTitle}</span>
              </>
            ) : null}
            <span aria-hidden>·</span>
            <time dateTime={article.publishedAt}>{formatDate(article.publishedAt)}</time>
            <span aria-hidden>·</span>
            <span>{readingTime(wordCount(article))}</span>
          </div>

          <div className="flex items-center gap-2">
            <span className="sr-only">Share this article</span>
            <ShareButton label="Share this article" href={`https://www.linkedin.com/sharing/share-offsite/?url=${shareLabel}`}>
              <Share2 className="size-4" />
            </ShareButton>
            <ShareButton label="Share via email" href={`mailto:?subject=${shareLabel}`}>
              <Send className="size-4" />
            </ShareButton>
            <ShareButton label="Copy link" href={`#${toc[0]?.id ?? "top"}`}>
              <Link2 className="size-4" />
            </ShareButton>
          </div>
        </div>
      </Section>

      {/* Body + TOC */}
      <Section tone="paper" size="sm" contained={false} ariaLabel="Article body">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[16rem_1fr] lg:gap-16">
            <aside className="lg:sticky lg:top-28 lg:self-start">
              <ArticleToc items={toc} />
            </aside>

            <div className="flex max-w-2xl flex-col gap-12">
              {article.body.map((block, i) => (
                <Reveal
                  as="section"
                  key={block.heading}
                  id={slugify(block.heading)}
                  delay={i * 0.03}
                  className="scroll-mt-28 flex flex-col gap-4"
                >
                  <h2 className="text-2xl font-medium tracking-tight text-ink">{block.heading}</h2>
                  {block.paragraphs.map((p, j) => (
                    <p key={j} className="text-base leading-relaxed text-ink-muted">
                      {p}
                    </p>
                  ))}
                </Reveal>
              ))}

              {/* Tags */}
              {article.tags.length > 0 ? (
                <div className="flex flex-wrap gap-2 border-t border-line pt-8">
                  {article.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-line-strong px-3 py-1 text-xs text-ink-muted"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              ) : null}
            </div>
          </div>
        </Container>
      </Section>

      {/* Newsletter CTA */}
      <Section tone="surface" ariaLabel="Newsletter signup">
        <div className="mx-auto flex max-w-2xl flex-col items-center gap-5 text-center">
          <span className="eyebrow">The Operating Layer</span>
          <h2 className="text-2xl font-medium tracking-tight text-ink md:text-3xl">
            Get the next issue in your inbox
          </h2>
          <p className="max-w-xl text-base text-ink-muted">
            Field notes on putting AI into governed production — for the operators and engineers who own it.
          </p>
          <NewsletterForm className="w-full max-w-md" />
        </div>
      </Section>

      {/* Related */}
      {related.length > 0 ? (
        <RelatedGrid eyebrow="Keep reading" title="Related resources" tone="paper">
          {related.map((item) => (
            <ArticleCard key={item.slug} article={item} showKind />
          ))}
        </RelatedGrid>
      ) : null}
    </article>
  );
}

/** Simple share anchor with an accessible label (no real share integration). */
function ShareButton({
  label,
  href,
  children,
}: {
  label: string;
  href: string;
  children: React.ReactNode;
}) {
  const external = href.startsWith("http");
  return (
    <a
      href={href}
      aria-label={label}
      title={label}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className="inline-flex size-9 items-center justify-center rounded-md border border-line-strong text-ink-muted transition-colors hover:border-ink-subtle hover:text-ink focus:outline-none focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-1"
    >
      {children}
    </a>
  );
}
