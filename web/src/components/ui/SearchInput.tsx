"use client";

import { Search, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
  ariaLabel?: string;
}

/** Controlled search box with icon and clear button. */
export function SearchInput({ value, onChange, placeholder = "Search…", className, ariaLabel = "Search" }: SearchInputProps) {
  return (
    <div className={cn("group relative", className)}>
      <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-ink-subtle transition-colors duration-200 group-focus-within:text-accent" />
      <input
        type="search"
        value={value}
        aria-label={ariaLabel}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="h-11 w-full rounded-md border border-line-strong bg-paper pl-9 pr-9 text-sm text-ink shadow-sm transition-[border-color,box-shadow] duration-200 ease-[cubic-bezier(0.16,1,0.3,1)] placeholder:text-ink-subtle hover:border-ink-subtle focus:border-accent focus:shadow-accent focus:outline-none focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-1 [&::-webkit-search-cancel-button]:appearance-none"
      />
      {value ? (
        <button
          type="button"
          onClick={() => onChange("")}
          aria-label="Clear search"
          className="absolute right-2.5 top-1/2 flex size-6 -translate-y-1/2 items-center justify-center rounded-full text-ink-subtle transition-[color,background-color,transform] duration-200 ease-[cubic-bezier(0.16,1,0.3,1)] hover:bg-surface-2 hover:text-ink active:scale-90"
        >
          <X className="size-4" />
        </button>
      ) : null}
    </div>
  );
}
