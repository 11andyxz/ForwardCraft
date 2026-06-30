"use client";

import { useMemo, useState } from "react";
import type { CaseStudy } from "@/types";
import { cn } from "@/lib/utils";
import { SearchInput } from "@/components/ui/SearchInput";
import { EmptyState } from "@/components/ui/EmptyState";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/animations/Reveal";
import { CaseStudyCard } from "@/components/cards/CaseStudyCard";

interface LabelOption {
  slug: string;
  label: string;
}

interface CaseStudiesBrowserProps {
  caseStudies: CaseStudy[];
  industries: LabelOption[];
  solutions: LabelOption[];
}

type SortKey = "newest" | "az";

const sortOptions: { id: SortKey; label: string }[] = [
  { id: "newest", label: "Newest" },
  { id: "az", label: "A–Z" },
];

const ALL = "all";

/**
 * Client-side browser for the case studies listing: featured study on top,
 * then search + industry/solution filters + sort over the remaining set.
 */
export function CaseStudiesBrowser({
  caseStudies,
  industries,
  solutions,
}: CaseStudiesBrowserProps) {
  const [query, setQuery] = useState("");
  const [industry, setIndustry] = useState<string>(ALL);
  const [solution, setSolution] = useState<string>(ALL);
  const [sort, setSort] = useState<SortKey>("newest");

  const featured = useMemo(
    () => caseStudies.find((c) => c.featured),
    [caseStudies],
  );

  // Only show filter pills for industries actually represented in the data.
  const industryOptions = useMemo(() => {
    const present = new Set(caseStudies.map((c) => c.industry));
    return industries.filter((o) => present.has(o.slug));
  }, [caseStudies, industries]);

  const solutionOptions = useMemo(() => {
    const present = new Set(caseStudies.map((c) => c.solution));
    return solutions.filter((o) => present.has(o.slug));
  }, [caseStudies, solutions]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    const result = caseStudies.filter((c) => {
      if (industry !== ALL && c.industry !== industry) return false;
      if (solution !== ALL && c.solution !== solution) return false;
      if (q) {
        const haystack = `${c.title} ${c.summary} ${c.client}`.toLowerCase();
        if (!haystack.includes(q)) return false;
      }
      return true;
    });

    if (sort === "az") {
      result.sort((a, b) => a.title.localeCompare(b.title));
    } else {
      // "Newest" — preserve curated source order (newest first by convention).
      result.sort(
        (a, b) =>
          caseStudies.indexOf(a) - caseStudies.indexOf(b),
      );
    }
    return result;
  }, [caseStudies, query, industry, solution, sort]);

  const hasActiveFilters =
    query.trim() !== "" || industry !== ALL || solution !== ALL;

  const resetFilters = () => {
    setQuery("");
    setIndustry(ALL);
    setSolution(ALL);
  };

  return (
    <div className="flex flex-col gap-12">
      {/* Featured */}
      {featured ? (
        <Reveal as="section" aria-label="Featured case study">
          <p className="eyebrow mb-5">Featured story</p>
          <CaseStudyCard study={featured} featured />
        </Reveal>
      ) : null}

      {/* Controls */}
      <section aria-label="Filter case studies" className="flex flex-col gap-6">
        <SearchInput
          value={query}
          onChange={setQuery}
          placeholder="Search by title, summary, or client…"
          ariaLabel="Search case studies"
          className="max-w-xl"
        />

        <div className="flex flex-col gap-5">
          <FilterRow
            legend="Industry"
            options={industryOptions}
            value={industry}
            onChange={setIndustry}
            allLabel="All industries"
          />
          <FilterRow
            legend="Solution"
            options={solutionOptions}
            value={solution}
            onChange={setSolution}
            allLabel="All solutions"
          />

          <div className="flex flex-wrap items-center justify-between gap-4 border-t border-line pt-5">
            <fieldset className="flex flex-wrap items-center gap-2">
              <legend className="sr-only">Sort case studies</legend>
              <span className="eyebrow mr-1">
                Sort
              </span>
              {sortOptions.map((opt) => (
                <Pill
                  key={opt.id}
                  selected={sort === opt.id}
                  onClick={() => setSort(opt.id)}
                >
                  {opt.label}
                </Pill>
              ))}
            </fieldset>
            <p aria-live="polite" className="text-sm text-ink-muted">
              <span className="nums-tabular font-medium text-ink">{filtered.length}</span> {filtered.length === 1 ? "story" : "stories"}
            </p>
          </div>
        </div>
      </section>

      {/* Results */}
      {filtered.length > 0 ? (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filtered.map((study) => (
            <CaseStudyCard key={study.slug} study={study} />
          ))}
        </div>
      ) : (
        <EmptyState
          title="No case studies match"
          message="Try a different search term or clear the active filters."
          action={
            hasActiveFilters ? (
              <Button variant="secondary" size="sm" onClick={resetFilters}>
                Clear filters
              </Button>
            ) : null
          }
        />
      )}
    </div>
  );
}

function FilterRow({
  legend,
  options,
  value,
  onChange,
  allLabel,
}: {
  legend: string;
  options: LabelOption[];
  value: string;
  onChange: (next: string) => void;
  allLabel: string;
}) {
  return (
    <fieldset className="flex flex-wrap items-center gap-2">
      <legend className="sr-only">Filter by {legend.toLowerCase()}</legend>
      <span className="eyebrow mr-1">
        {legend}
      </span>
      <Pill selected={value === ALL} onClick={() => onChange(ALL)}>
        {allLabel}
      </Pill>
      {options.map((opt) => (
        <Pill
          key={opt.slug}
          selected={value === opt.slug}
          onClick={() => onChange(opt.slug)}
        >
          {opt.label}
        </Pill>
      ))}
    </fieldset>
  );
}

function Pill({
  selected,
  onClick,
  children,
}: {
  selected: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={selected}
      className={cn(
        "rounded-full border px-3.5 py-1.5 text-sm font-medium transition-[color,background-color,border-color,box-shadow,transform] duration-200 ease-[cubic-bezier(0.16,1,0.3,1)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent active:translate-y-px",
        selected
          ? "border-ink bg-ink text-paper shadow-sm"
          : "border-line-strong bg-paper text-ink-muted hover:border-ink-subtle hover:bg-surface hover:text-ink",
      )}
    >
      {children}
    </button>
  );
}
