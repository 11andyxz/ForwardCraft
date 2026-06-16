import { articles } from "@/data/mock/articles";
import { reports } from "@/data/mock/reports";
import { news } from "@/data/mock/news";
import type { Article } from "@/types";

/** All long-form content in one pool, for related-content lookups. */
export const allArticles: Article[] = [...articles, ...reports, ...news];

/** Route base per content kind. */
const kindBase: Record<Article["kind"], string> = {
  blog: "/blog",
  report: "/reports",
  research: "/research",
  news: "/newsroom",
};

const kindLabels: Record<Article["kind"], string> = {
  blog: "Article",
  report: "Report",
  research: "Research",
  news: "News",
};

export function articleHref(a: Article): string {
  return `${kindBase[a.kind]}/${a.slug}`;
}

export function kindLabel(kind: Article["kind"]): string {
  return kindLabels[kind];
}

export const blogPosts = articles.filter((a) => a.kind === "blog");
export const researchPosts = articles.filter((a) => a.kind === "research");

/** Resolve an article of any kind by slug. */
export function getAnyArticle(slug: string): Article | undefined {
  return allArticles.find((a) => a.slug === slug);
}

/** Related content by shared tags/category, excluding the current slug. */
export function relatedArticles(current: Article, limit = 3): Article[] {
  return allArticles
    .filter((a) => a.slug !== current.slug)
    .map((a) => {
      const sharedTags = a.tags.filter((t) => current.tags.includes(t)).length;
      const sameCategory = a.category === current.category ? 1 : 0;
      const sameKind = a.kind === current.kind ? 1 : 0;
      return { a, score: sharedTags * 2 + sameCategory + sameKind };
    })
    .sort((x, y) => y.score - x.score)
    .slice(0, limit)
    .map((x) => x.a);
}

/** Unique, sorted categories for a set of articles. */
export function categoriesOf(items: Article[]): string[] {
  return Array.from(new Set(items.map((i) => i.category))).sort();
}
