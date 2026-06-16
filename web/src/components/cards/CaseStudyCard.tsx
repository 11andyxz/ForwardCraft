import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { CaseStudy } from "@/types";
import { getIndustry } from "@/data/mock/industries";
import { CoverArt } from "@/components/ui/CoverArt";
import { MockLogo } from "@/components/ui/MockLogo";
import { Badge } from "@/components/ui/Badge";

export function CaseStudyCard({ study, featured = false }: { study: CaseStudy; featured?: boolean }) {
  const industry = getIndustry(study.industry);
  return (
    <Link
      href={`/case-studies/${study.slug}`}
      className={`group flex flex-col overflow-hidden rounded-lg border border-line bg-paper transition-all duration-300 hover:border-line-strong hover:shadow-md ${
        featured ? "md:flex-row" : ""
      }`}
    >
      <div className={`overflow-hidden ${featured ? "md:w-1/2" : ""}`}>
        <CoverArt
          seed={study.slug}
          tone="dark"
          className={`w-full transition-transform duration-500 group-hover:scale-[1.03] ${
            featured ? "aspect-[16/11] md:h-full" : "aspect-[16/10]"
          }`}
        />
      </div>
      <div className={`flex flex-1 flex-col gap-3 p-5 ${featured ? "md:justify-center md:p-8" : ""}`}>
        <div className="flex flex-wrap items-center gap-2">
          {industry ? <Badge tone="neutral">{industry.name}</Badge> : null}
          {study.featured ? <Badge tone="accent">Featured</Badge> : null}
        </div>
        <h3
          className={`font-medium leading-snug text-ink transition-colors group-hover:text-accent ${
            featured ? "text-2xl" : "text-lg"
          }`}
        >
          {study.title}
        </h3>
        <p className="line-clamp-2 text-sm text-ink-muted">{study.summary}</p>
        <div className="mt-auto flex items-center justify-between pt-3">
          <MockLogo name={study.client} seed={study.logoId} />
          <ArrowRight className="size-4 text-ink-subtle transition-transform group-hover:translate-x-0.5" />
        </div>
      </div>
    </Link>
  );
}
