import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { pageMetadata } from "@/lib/site";
import { ArticleDetail } from "@/components/resources/ArticleDetail";
import { news, getNews } from "@/data/mock/news";

export function generateStaticParams() {
  return news.map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const item = getNews(slug);
  if (!item) {
    return pageMetadata({ title: "News", path: `/newsroom/${slug}` });
  }
  return pageMetadata({
    title: item.title,
    description: item.excerpt,
    path: `/newsroom/${slug}`,
  });
}

export default async function NewsDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const item = getNews(slug);
  if (!item) notFound();

  return <ArticleDetail article={item} />;
}
