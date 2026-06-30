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
      className="group flex flex-col overflow-hidden rounded-xl border border-line bg-surface transition-[transform,box-shadow,border-color] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-0.5 hover:border-line-strong hover:shadow-md active:translate-y-px"
    >
      <div className="overflow-hidden">
        <CoverArt
          seed={article.slug}
          className="aspect-[16/10] w-full transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04]"
        />
      </div>
      <div className="flex flex-1 flex-col gap-3 p-6">
        <div className="flex items-center gap-2.5">
          <Badge tone="neutral">{showKind ? kindLabel(article.kind) : article.category}</Badge>
          <span className="font-mono text-2xs uppercase tracking-[0.1em] text-ink-subtle nums-tabular">
            {article.readMinutes} min read
          </span>
        </div>
        <h3 className="text-lg font-medium leading-snug text-ink transition-colors duration-200 group-hover:text-accent">
          {article.title}
        </h3>
        <p className="line-clamp-2 text-sm text-ink-muted">{article.excerpt}</p>
        <div className="mt-auto flex items-center gap-2 border-t border-line pt-4 text-xs text-ink-subtle">
          <span className="font-medium text-ink-muted">{article.author}</span>
          <span aria-hidden className="text-line-strong">·</span>
          <time dateTime={article.publishedAt} className="nums-tabular">{formatDate(article.publishedAt)}</time>
        </div>
      </div>
    </Link>
  );
}
