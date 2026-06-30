"use client";

import { useId, useRef, useState, type DragEvent } from "react";
import { FileText, Upload, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { formatBytes, validateUpload } from "@/lib/applications";

interface FileDropzoneProps {
  label: string;
  required?: boolean;
  /** Allowed extensions, e.g. [".pdf", ".doc", ".docx"]. */
  exts: readonly string[];
  mimes: string[];
  maxBytes: number;
  file: File | null;
  onFile: (file: File | null) => void;
  /** External (form-level) error to display under the control. */
  error?: string;
  hint?: string;
}

/**
 * Accessible upload control: click or drag-and-drop, validates type + size,
 * shows the selected filename with size, and supports remove / reselect.
 */
export function FileDropzone({
  label,
  required,
  exts,
  mimes,
  maxBytes,
  file,
  onFile,
  error,
  hint,
}: FileDropzoneProps) {
  const inputId = useId();
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragging, setDragging] = useState(false);
  const [localError, setLocalError] = useState<string | null>(null);

  const shownError = error ?? localError ?? undefined;

  function accept(f: File | undefined | null) {
    if (!f) return;
    const err = validateUpload(f, { exts, mimes, maxBytes });
    if (err) {
      setLocalError(err);
      onFile(null);
      return;
    }
    setLocalError(null);
    onFile(f);
  }

  function onDrop(e: DragEvent<HTMLButtonElement>) {
    e.preventDefault();
    setDragging(false);
    accept(e.dataTransfer.files?.[0]);
  }

  function clearFile() {
    setLocalError(null);
    onFile(null);
    if (inputRef.current) inputRef.current.value = "";
  }

  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={inputId} className="text-sm font-medium text-ink">
        {label}
        {required ? <span className="text-danger"> *</span> : null}
      </label>

      <input
        ref={inputRef}
        id={inputId}
        type="file"
        accept={[...exts, ...mimes].join(",")}
        className="sr-only"
        aria-invalid={!!shownError}
        onChange={(e) => accept(e.target.files?.[0])}
      />

      {file ? (
        <div className="flex items-center justify-between gap-3 rounded-lg border border-line-strong bg-paper px-3.5 py-3 shadow-sm transition-[border-color,box-shadow] duration-200 ease-[cubic-bezier(0.16,1,0.3,1)] hover:border-ink-subtle hover:shadow-md">
          <span className="flex min-w-0 items-center gap-3">
            <span className="flex size-9 shrink-0 items-center justify-center rounded-md bg-accent-soft text-accent">
              <FileText className="size-[18px]" strokeWidth={1.75} />
            </span>
            <span className="flex min-w-0 flex-col">
              <span className="truncate text-sm font-medium text-ink">{file.name}</span>
              <span className="font-mono text-xs text-ink-subtle nums-tabular">{formatBytes(file.size)}</span>
            </span>
          </span>
          <span className="flex shrink-0 items-center gap-1">
            <button
              type="button"
              onClick={() => inputRef.current?.click()}
              className="rounded-md px-2.5 py-1.5 text-xs font-medium text-ink-muted transition-[color,background-color,transform] duration-200 ease-[cubic-bezier(0.16,1,0.3,1)] hover:bg-surface hover:text-ink active:translate-y-px"
            >
              Replace
            </button>
            <button
              type="button"
              onClick={clearFile}
              aria-label="Remove file"
              className="rounded-md p-1.5 text-ink-muted transition-[color,background-color,transform] duration-200 ease-[cubic-bezier(0.16,1,0.3,1)] hover:bg-surface hover:text-ink active:scale-90"
            >
              <X className="size-4" />
            </button>
          </span>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          onDragOver={(e) => {
            e.preventDefault();
            setDragging(true);
          }}
          onDragLeave={() => setDragging(false)}
          onDrop={onDrop}
          className={cn(
            "group/drop flex w-full flex-col items-center justify-center gap-2.5 rounded-lg border border-dashed px-4 py-8 text-center transition-[border-color,background-color,box-shadow,transform] duration-200 ease-[cubic-bezier(0.16,1,0.3,1)] active:scale-[0.99]",
            dragging
              ? "border-accent bg-accent-soft shadow-accent"
              : "border-line-strong bg-surface hover:border-ink-subtle hover:bg-surface-2/60 hover:shadow-sm",
            shownError && "border-danger bg-danger-soft/30",
          )}
        >
          <span
            className={cn(
              "flex size-11 items-center justify-center rounded-full transition-[background-color,color,transform] duration-200 ease-[cubic-bezier(0.16,1,0.3,1)]",
              dragging
                ? "bg-accent text-paper"
                : "bg-surface-2 text-ink-muted group-hover/drop:-translate-y-0.5 group-hover/drop:bg-accent-soft group-hover/drop:text-accent",
            )}
          >
            <Upload className="size-[18px]" strokeWidth={1.75} />
          </span>
          <span className="text-sm text-ink">
            <span className="font-medium text-accent">Click to upload</span> or drag and drop
          </span>
          <span className="font-mono text-2xs uppercase tracking-[0.1em] text-ink-subtle">
            {exts.join(", ").toUpperCase()} · up to {formatBytes(maxBytes)}
          </span>
        </button>
      )}

      {shownError ? (
        <p className="text-xs text-danger" role="alert">
          {shownError}
        </p>
      ) : hint ? (
        <p className="text-xs text-ink-subtle">{hint}</p>
      ) : null}
    </div>
  );
}
