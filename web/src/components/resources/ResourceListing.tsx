"use client";

import { useMemo, useState } from "react";
import type { Article } from "@/types";
import { cn } from "@/lib/utils";
import { articleHref, kindLabel } from "@/lib/content";
import { Container } from "@/components/layout/Container";
import { SearchInput } from "@/components/ui/SearchInput";
import { Pagination } from "@/components/ui/Pagination";
import { EmptyState } from "@/components/ui/EmptyState";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { CoverArt } from "@/components/ui/CoverArt";
import { ArticleCard } from "@/components/cards/ArticleCard";

type SortKey = "newest" | "oldest" | "az";

const PAGE_SIZE = 6;

interface ResourceListingProps {
  items: Article[];
  categories: string[];
  showKind?: boolean;
  featured?: Article;
}

/**
 * Reusable, fully client-side listing for any Article[] set. Supports search
 * (title/excerpt), category filtering, sorting, and pagination. An optional
 * featured article is pinned above the grid and excluded from it.
 */
export function ResourceListing({ items, categories, showKind = false, featured }: ResourceListingProps) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");
  const [sort, setSort] = useState<SortKey>("newest");
  const [page, setPage] = useState(1);

  // Items eligible for the grid (featured is rendered separately above).
  const pool = useMemo(
    () => (featured ? items.filter((a) => a.slug !== featured.slug) : items),
    [items, featured],
  );

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    const result = pool.filter((a) => {
      const matchesCategory = category === "All" || a.category === category;
      const matchesQuery =
        q === "" ||
        a.title.toLowerCase().includes(q) ||
        a.excerpt.toLowerCase().includes(q);
      return matchesCategory && matchesQuery;
    });

    result.sort((a, b) => {
      if (sort === "az") return a.title.localeCompare(b.title);
      const da = new Date(a.publishedAt).getTime();
      const db = new Date(b.publishedAt).getTime();
      return sort === "newest" ? db - da : da - db;
    });

    return result;
  }, [pool, query, category, sort]);

  const pageCount = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  // Clamp the page if filters shrank the result set below the current page.
  const safePage = Math.min(page, pageCount);
  const pageItems = filtered.slice((safePage - 1) * PAGE_SIZE, safePage * PAGE_SIZE);

  function resetToFirstPage() {
    setPage(1);
  }

  const selectClasses =
    "h-11 rounded-md border border-line-strong bg-paper px-3 text-sm text-ink shadow-sm transition-[border-color,box-shadow] duration-200 ease-[cubic-bezier(0.16,1,0.3,1)] hover:border-ink-subtle focus:border-accent focus:shadow-accent focus:outline-none focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-1";

  const allCategories = ["All", ...categories];

  return (
    <Container>
      <div className="flex flex-col gap-10">
        {featured ? (
          <section aria-label="Featured" className="flex flex-col gap-4">
            <span className="eyebrow">Featured</span>
            <FeaturedArticle article={featured} showKind={showKind} />
          </section>
        ) : null}

        {/* Controls */}
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
            <SearchInput
              value={query}
              onChange={(v) => {
                setQuery(v);
                resetToFirstPage();
              }}
              placeholder="Search by title or summary…"
              ariaLabel="Search resources"
              className="lg:max-w-sm lg:flex-1"
            />
            <div className="flex items-center gap-3">
              <label className="sr-only" htmlFor="resource-category">
                Filter by category
              </label>
              <select
                id="resource-category"
                value={category}
                onChange={(e) => {
                  setCategory(e.target.value);
                  resetToFirstPage();
                }}
                className={cn(selectClasses, "lg:hidden")}
              >
                {allCategories.map((c) => (
                  <option key={c} value={c}>
                    {c === "All" ? "All categories" : c}
                  </option>
                ))}
              </select>

              <label className="sr-only" htmlFor="resource-sort">
                Sort
              </label>
              <select
                id="resource-sort"
                value={sort}
                onChange={(e) => setSort(e.target.value as SortKey)}
                className={selectClasses}
              >
                <option value="newest">Newest first</option>
                <option value="oldest">Oldest first</option>
                <option value="az">Title A–Z</option>
              </select>
            </div>
          </div>

          {/* Category pills (desktop) */}
          {categories.length > 0 ? (
            <div
              className="hidden flex-wrap gap-2 lg:flex"
              role="group"
              aria-label="Filter by category"
            >
              {allCategories.map((c) => {
                const active = c === category;
                return (
                  <button
                    key={c}
                    type="button"
                    aria-pressed={active}
                    onClick={() => {
                      setCategory(c);
                      resetToFirstPage();
                    }}
                    className={cn(
                      "rounded-full border px-3.5 py-1.5 text-sm transition-[color,background-color,border-color,box-shadow,transform] duration-200 ease-[cubic-bezier(0.16,1,0.3,1)] focus:outline-none focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-1 active:translate-y-px",
                      active
                        ? "border-ink bg-ink text-paper shadow-sm"
                        : "border-line-strong text-ink-muted hover:border-ink-subtle hover:bg-surface hover:text-ink",
                    )}
                  >
                    {c}
                  </button>
                );
              })}
            </div>
          ) : null}
        </div>

        {/* Results */}
        {pageItems.length > 0 ? (
          <>
            <p className="sr-only" role="status" aria-live="polite">
              {filtered.length} {filtered.length === 1 ? "result" : "results"}
            </p>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {pageItems.map((article) => (
                <ArticleCard key={article.slug} article={article} showKind={showKind} />
              ))}
            </div>
            <Pagination page={safePage} pageCount={pageCount} onPageChange={setPage} />
          </>
        ) : (
          <EmptyState
            title="No resources found"
            message="Try a different search term or clear the active category filter."
            action={
              <Button
                onClick={() => {
                  setQuery("");
                  setCategory("All");
                  resetToFirstPage();
                }}
                variant="secondary"
                size="sm"
              >
                Clear filters
              </Button>
            }
          />
        )}
      </div>
    </Container>
  );
}

/** Large horizontal feature block built from an Article. */
function FeaturedArticle({ article, showKind }: { article: Article; showKind: boolean }) {
  return (
    <div className="group overflow-hidden rounded-2xl border border-line bg-surface shadow-sm transition-[transform,box-shadow,border-color] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-0.5 hover:border-line-strong hover:shadow-md">
      <div className="grid items-stretch md:grid-cols-2">
        <div className="order-1 overflow-hidden md:order-2">
          <div className="h-56 w-full md:h-full md:min-h-[20rem]">
            <CoverArt
              seed={article.slug}
              className="size-full transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.03]"
            />
          </div>
        </div>
        <div className="order-2 flex flex-col gap-4 p-6 md:order-1 md:p-10">
          <div className="flex flex-wrap items-center gap-2 text-xs text-ink-subtle">
            <Badge tone="neutral">{showKind ? kindLabel(article.kind) : article.category}</Badge>
            <span>{article.author}</span>
            <span aria-hidden>·</span>
            <span className="font-mono nums-tabular">{article.readMinutes} min read</span>
          </div>
          <h3 className="text-2xl font-medium leading-tight tracking-tight text-ink transition-colors duration-200 group-hover:text-accent md:text-3xl">
            {article.title}
          </h3>
          <p className="text-base text-ink-muted">{article.excerpt}</p>
          <div className="mt-2">
            <Button href={articleHref(article)} withArrow variant="secondary" size="md">
              Read more
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
