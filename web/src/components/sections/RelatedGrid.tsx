import type { ReactNode } from "react";
import { Section } from "@/components/layout/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";

/** Generic "related content" section wrapper with a heading and a grid. */
export function RelatedGrid({
  eyebrow = "Related",
  title,
  children,
  tone = "surface",
  columns = 3,
}: {
  eyebrow?: string;
  title: string;
  children: ReactNode;
  tone?: "paper" | "surface";
  columns?: 2 | 3;
}) {
  return (
    <Section tone={tone}>
      <SectionHeading eyebrow={eyebrow} title={title} className="mb-12" />
      <div className={columns === 3 ? "grid gap-5 md:grid-cols-2 md:gap-6 lg:grid-cols-3" : "grid gap-5 md:grid-cols-2 md:gap-6"}>
        {children}
      </div>
    </Section>
  );
}
