import type {
  InputHTMLAttributes,
  SelectHTMLAttributes,
  TextareaHTMLAttributes,
  ReactNode,
} from "react";
import { cn } from "@/lib/utils";

const fieldBase =
  "w-full rounded-md border bg-paper px-3.5 py-2.5 text-sm text-ink placeholder:text-ink-subtle transition-colors focus:outline-none focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-1";

function controlClasses(error?: boolean) {
  return cn(fieldBase, error ? "border-danger" : "border-line-strong hover:border-ink-subtle");
}

interface LabelWrapProps {
  label: string;
  htmlFor: string;
  required?: boolean;
  error?: string;
  hint?: string;
  children: ReactNode;
}

export function FieldWrap({ label, htmlFor, required, error, hint, children }: LabelWrapProps) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={htmlFor} className="text-sm font-medium text-ink">
        {label}
        {required ? <span className="text-danger"> *</span> : null}
      </label>
      {children}
      {error ? (
        <p className="text-xs text-danger" role="alert">
          {error}
        </p>
      ) : hint ? (
        <p className="text-xs text-ink-subtle">{hint}</p>
      ) : null}
    </div>
  );
}

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  hint?: string;
}

export function Input({ label, error, hint, id, required, ...rest }: InputProps) {
  const fieldId = id ?? rest.name ?? label;
  return (
    <FieldWrap label={label} htmlFor={fieldId} required={required} error={error} hint={hint}>
      <input
        id={fieldId}
        required={required}
        aria-invalid={!!error}
        className={controlClasses(!!error)}
        {...rest}
      />
    </FieldWrap>
  );
}

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  error?: string;
  hint?: string;
}

export function Textarea({ label, error, hint, id, required, rows = 4, ...rest }: TextareaProps) {
  const fieldId = id ?? rest.name ?? label;
  return (
    <FieldWrap label={label} htmlFor={fieldId} required={required} error={error} hint={hint}>
      <textarea
        id={fieldId}
        rows={rows}
        required={required}
        aria-invalid={!!error}
        className={cn(controlClasses(!!error), "resize-y")}
        {...rest}
      />
    </FieldWrap>
  );
}

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  error?: string;
  hint?: string;
  options: { value: string; label: string }[];
  placeholder?: string;
}

export function Select({ label, error, hint, id, required, options, placeholder, ...rest }: SelectProps) {
  const fieldId = id ?? rest.name ?? label;
  return (
    <FieldWrap label={label} htmlFor={fieldId} required={required} error={error} hint={hint}>
      <select
        id={fieldId}
        required={required}
        aria-invalid={!!error}
        className={cn(controlClasses(!!error), "appearance-none bg-[length:16px] pr-9")}
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%2356565d' stroke-width='2'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E\")",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "right 0.75rem center",
        }}
        {...rest}
      >
        {placeholder ? (
          <option value="" disabled>
            {placeholder}
          </option>
        ) : null}
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
    </FieldWrap>
  );
}

interface CheckboxProps extends InputHTMLAttributes<HTMLInputElement> {
  label: ReactNode;
  error?: string;
}

export function Checkbox({ label, error, id, name, ...rest }: CheckboxProps) {
  const fieldId = id ?? name ?? "checkbox";
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={fieldId} className="flex items-start gap-3 text-sm text-ink-muted">
        <input
          id={fieldId}
          name={name}
          type="checkbox"
          aria-invalid={!!error}
          className="mt-0.5 size-4 shrink-0 rounded border-line-strong text-ink accent-ink"
          {...rest}
        />
        <span>{label}</span>
      </label>
      {error ? (
        <p className="text-xs text-danger" role="alert">
          {error}
        </p>
      ) : null}
    </div>
  );
}
