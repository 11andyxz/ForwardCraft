"use client";

import { useMemo, useState } from "react";
import type { Job } from "@/types";
import { SearchInput } from "@/components/ui/SearchInput";
import { Select } from "@/components/ui/Field";
import { EmptyState } from "@/components/ui/EmptyState";
import { JobCard } from "@/components/cards/JobCard";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

type SortKey = "newest" | "az";

interface JobBrowserProps {
  jobs: Job[];
  departments: string[];
  locations: string[];
}

const ALL = "All";

/**
 * Client-side job search + filter UI. Filters on title/summary, department,
 * and location, with a sort toggle. Renders a live result count and a list of
 * JobCards, or an EmptyState (with a clear-filters action) when none match.
 */
export function JobBrowser({ jobs, departments, locations }: JobBrowserProps) {
  const [query, setQuery] = useState("");
  const [department, setDepartment] = useState(ALL);
  const [location, setLocation] = useState(ALL);
  const [sort, setSort] = useState<SortKey>("newest");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    const result = jobs.filter((job) => {
      const matchesQuery =
        q === "" ||
        job.title.toLowerCase().includes(q) ||
        job.summary.toLowerCase().includes(q);
      const matchesDept = department === ALL || job.department === department;
      const matchesLoc = location === ALL || job.location === location;
      return matchesQuery && matchesDept && matchesLoc;
    });

    result.sort((a, b) => {
      if (sort === "az") return a.title.localeCompare(b.title);
      // Newest first by postedAt.
      return b.postedAt.localeCompare(a.postedAt);
    });

    return result;
  }, [jobs, query, department, location, sort]);

  const isFiltered = query.trim() !== "" || department !== ALL || location !== ALL;

  function clearFilters() {
    setQuery("");
    setDepartment(ALL);
    setLocation(ALL);
  }

  const departmentOptions = [
    { value: ALL, label: "All departments" },
    ...departments.map((d) => ({ value: d, label: d })),
  ];
  const locationOptions = [
    { value: ALL, label: "All locations" },
    ...locations.map((l) => ({ value: l, label: l })),
  ];

  return (
    <div className="flex flex-col gap-8">
      {/* Controls */}
      <div className="flex flex-col gap-5 rounded-xl border border-line bg-surface p-5 md:p-6">
        <div className="grid gap-4 md:grid-cols-[1.4fr_1fr_1fr]">
          <div className="flex flex-col gap-1.5">
            <label htmlFor="job-search" className="text-sm font-medium text-ink">
              Search roles
            </label>
            <SearchInput
              value={query}
              onChange={setQuery}
              placeholder="Search by title or keyword…"
              ariaLabel="Search open roles by title or keyword"
            />
          </div>
          <Select
            label="Department"
            name="job-department"
            value={department}
            onChange={(e) => setDepartment(e.target.value)}
            options={departmentOptions}
          />
          <Select
            label="Location"
            name="job-location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            options={locationOptions}
          />
        </div>

        <div className="flex flex-col items-start justify-between gap-3 border-t border-line pt-4 sm:flex-row sm:items-center">
          <p className="text-sm text-ink-muted" aria-live="polite" aria-atomic="true">
            <span className="font-medium text-ink">{filtered.length}</span>{" "}
            {filtered.length === 1 ? "open role" : "open roles"}
            {isFiltered ? " match your filters" : ""}
          </p>
          <fieldset className="flex items-center gap-2">
            <legend className="sr-only">Sort roles</legend>
            <span className="text-xs font-medium uppercase tracking-wide text-ink-subtle">Sort</span>
            <div className="inline-flex overflow-hidden rounded-md border border-line-strong">
              {(
                [
                  { key: "newest", label: "Newest" },
                  { key: "az", label: "A–Z" },
                ] as { key: SortKey; label: string }[]
              ).map((option) => (
                <button
                  key={option.key}
                  type="button"
                  onClick={() => setSort(option.key)}
                  aria-pressed={sort === option.key}
                  className={cn(
                    "px-3.5 py-1.5 text-sm font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-accent",
                    sort === option.key
                      ? "bg-ink text-paper"
                      : "bg-paper text-ink-muted hover:bg-surface-2",
                  )}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </fieldset>
        </div>
      </div>

      {/* Results */}
      {filtered.length > 0 ? (
        <ul className="flex flex-col gap-4">
          {filtered.map((job) => (
            <li key={job.id}>
              <JobCard job={job} />
            </li>
          ))}
        </ul>
      ) : (
        <EmptyState
          title="No roles match your filters"
          message="Try a different keyword, department, or location — or clear your filters to see every open role."
          action={
            <Button variant="secondary" size="sm" onClick={clearFilters}>
              Clear filters
            </Button>
          }
        />
      )}
    </div>
  );
}
