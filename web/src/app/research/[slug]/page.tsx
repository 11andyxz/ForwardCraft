import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { pageMetadata } from "@/lib/site";
import { ArticleDetail } from "@/components/resources/ArticleDetail";
import { getArticle } from "@/data/mock/articles";
import { researchPosts } from "@/lib/content";

export function generateStaticParams() {
  return researchPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article || article.kind !== "research") {
    return pageMetadata({ title: "Research", path: `/research/${slug}` });
  }
  return pageMetadata({
    title: article.title,
    description: article.excerpt,
    path: `/research/${slug}`,
  });
}

export default async function ResearchDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article || article.kind !== "research") notFound();

  return <ArticleDetail article={article} />;
}
