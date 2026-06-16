import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { pageMetadata } from "@/lib/site";
import { ArticleDetail } from "@/components/resources/ArticleDetail";
import { reports, getReport } from "@/data/mock/reports";

export function generateStaticParams() {
  return reports.map((report) => ({ slug: report.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const report = getReport(slug);
  if (!report) {
    return pageMetadata({ title: "Report", path: `/reports/${slug}` });
  }
  return pageMetadata({
    title: report.title,
    description: report.excerpt,
    path: `/reports/${slug}`,
  });
}

export default async function ReportDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const report = getReport(slug);
  if (!report) notFound();

  return <ArticleDetail article={report} />;
}
