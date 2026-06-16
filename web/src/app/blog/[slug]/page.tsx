import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { pageMetadata } from "@/lib/site";
import { ArticleDetail } from "@/components/resources/ArticleDetail";
import { getArticle } from "@/data/mock/articles";
import { blogPosts } from "@/lib/content";

export function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article || article.kind !== "blog") {
    return pageMetadata({ title: "Article", path: `/blog/${slug}` });
  }
  return pageMetadata({
    title: article.title,
    description: article.excerpt,
    path: `/blog/${slug}`,
  });
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article || article.kind !== "blog") notFound();

  return <ArticleDetail article={article} />;
}
