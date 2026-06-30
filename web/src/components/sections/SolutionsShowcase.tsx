"use client";

import { useMemo } from "react";
import { solutions } from "@/data/mock/solutions";
import { Tabs } from "@/components/ui/Tabs";
import { SolutionCard } from "@/components/cards/SolutionCard";

const categories = ["Automate", "Decide", "Build"];

/** Tabbed solutions grid filtered by category. */
export function SolutionsShowcase() {
  const tabs = useMemo(() => [{ id: "all", label: "All solutions" }, ...categories.map((c) => ({ id: c, label: c }))], []);

  return (
    <Tabs tabs={tabs} variant="pill" ariaLabel="Solution categories">
      {(activeId) => {
        const filtered = activeId === "all" ? solutions : solutions.filter((s) => s.category === activeId);
        return (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
            {filtered.map((s) => (
              <SolutionCard key={s.slug} solution={s} />
            ))}
          </div>
        );
      }}
    </Tabs>
  );
}
