import Link from "next/link";
import type { Article } from "@/types";
import { articleHref, kindLabel } from "@/lib/content";
import { formatDate } from "@/lib/utils";
import { CoverArt } from "@/components/ui/CoverArt";
import { Badge } from "@/components/ui/Badge";

/** Listing card for any long-form content (blog/report/research/news). */
export function ArticleCard({ article, showKind = false }: { article: Article; showKind?: boolean }) {
  return (
    <Link
      href={articleHref(article)}
      className="group flex flex-col overflow-hidden rounded-lg border border-line bg-paper transition-all duration-300 hover:border-line-strong hover:shadow-md"
    >
      <div className="overflow-hidden">
        <CoverArt
          seed={article.slug}
          className="aspect-[16/10] w-full transition-transform duration-500 group-hover:scale-[1.03]"
        />
      </div>
      <div className="flex flex-1 flex-col gap-3 p-5">
        <div className="flex items-center gap-2">
          <Badge tone="neutral">{showKind ? kindLabel(article.kind) : article.category}</Badge>
          <span className="text-xs text-ink-subtle">{article.readMinutes} min read</span>
        </div>
        <h3 className="text-lg font-medium leading-snug text-ink transition-colors group-hover:text-accent">
          {article.title}
        </h3>
        <p className="line-clamp-2 text-sm text-ink-muted">{article.excerpt}</p>
        <div className="mt-auto flex items-center gap-2 pt-2 text-xs text-ink-subtle">
          <span>{article.author}</span>
          <span aria-hidden>·</span>
          <time dateTime={article.publishedAt}>{formatDate(article.publishedAt)}</time>
        </div>
      </div>
    </Link>
  );
}
