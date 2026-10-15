/**
 * Shared constants + validators for the job application flow. Imported by both
 * the client form and the server route so validation rules stay in sync.
 */

// Vercel Functions reject request bodies over 4.5 MB, so both files together
// (plus the text fields) must stay below that.
export const MAX_RESUME_BYTES = 3 * 1024 * 1024; // 3 MB
export const MAX_COVER_BYTES = 1 * 1024 * 1024; // 1 MB

export const RESUME_EXTENSIONS = [".pdf", ".doc", ".docx"] as const;
export const RESUME_MIME = [
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
];

export const COVER_EXTENSIONS = [".pdf", ".doc", ".docx", ".txt"] as const;
export const COVER_MIME = [...RESUME_MIME, "text/plain"];

export const YES_NO_OPTIONS = [
  { value: "yes", label: "Yes" },
  { value: "no", label: "No" },
];

export const REFERRAL_OPTIONS = [
  { value: "linkedin", label: "LinkedIn" },
  { value: "job-board", label: "Job board" },
  { value: "referral", label: "Referral from someone at ForwardCraft" },
  { value: "event", label: "Event or conference" },
  { value: "search", label: "Search engine" },
  { value: "social", label: "Social media" },
  { value: "other", label: "Other" },
];

// One bare address (RFC 5322 dot-atom local part, hostname with an alphabetic or
// punycode TLD). No , ; < > " ( ) : or whitespace, so it can never be split into
// extra recipients. Shared with the mailer, which uses it for To / Reply-To.
export const EMAIL_RE =
  /^[A-Za-z0-9.!#$%&'*+/=?^_`{|}~-]+@(?:[A-Za-z0-9-]+\.)+(?:[A-Za-z]{2,}|xn--[A-Za-z0-9-]+)$/;

export function isValidEmail(value: string): boolean {
  return EMAIL_RE.test(value.trim());
}

export function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

function hasExtension(name: string, exts: readonly string[]): boolean {
  const lower = name.toLowerCase();
  return exts.some((e) => lower.endsWith(e));
}

/**
 * Validate an uploaded file against allowed extensions, mime types, and size.
 * Returns an error message, or null when valid. Used client- and server-side.
 */
export function validateUpload(
  file: { name: string; size: number; type: string },
  opts: { exts: readonly string[]; mimes: string[]; maxBytes: number },
): string | null {
  const extOk = hasExtension(file.name, opts.exts);
  // Some browsers send an empty/!generic mime — accept when the extension matches.
  const mimeOk = !file.type || opts.mimes.includes(file.type);
  if (!extOk || !mimeOk) {
    return `Unsupported file type. Allowed: ${opts.exts.join(", ")}.`;
  }
  if (file.size > opts.maxBytes) {
    return `File is too large (max ${formatBytes(opts.maxBytes)}).`;
  }
  if (file.size === 0) {
    return "File appears to be empty.";
  }
  return null;
}

/** The fields persisted for an application (snake_case maps to DB columns). */
export interface ApplicationRecord {
  id: string;
  job_id: string;
  job_slug: string;
  job_title: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string | null;
  location: string | null;
  linkedin_url: string | null;
  portfolio_url: string | null;
  github_url: string | null;
  work_authorization: string | null;
  sponsorship_required: string | null;
  referral_source: string | null;
  additional_info: string | null;
  resume_url: string | null;
  resume_filename: string | null;
  cover_letter_text: string | null;
  cover_letter_url: string | null;
  status: string;
  submitted_at: Date;
}
