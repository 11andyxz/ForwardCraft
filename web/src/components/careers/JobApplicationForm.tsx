"use client";

import { useState, type FormEvent } from "react";
import { CheckCircle2, Loader2 } from "lucide-react";
import { Input, Select, Textarea } from "@/components/ui/Field";
import { Button } from "@/components/ui/Button";
import { FileDropzone } from "./FileDropzone";
import {
  isValidEmail,
  validateUpload,
  YES_NO_OPTIONS,
  REFERRAL_OPTIONS,
  RESUME_EXTENSIONS,
  RESUME_MIME,
  MAX_RESUME_BYTES,
  COVER_EXTENSIONS,
  COVER_MIME,
  MAX_COVER_BYTES,
} from "@/lib/applications";

interface JobRef {
  id: string;
  slug: string;
  title: string;
}

type Status = "idle" | "submitting" | "error";

const initialFields = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  location: "",
  linkedin: "",
  portfolio: "",
  github: "",
  coverLetterText: "",
  workAuthorization: "",
  sponsorship: "",
  referralSource: "",
  additionalInfo: "",
};

type Fields = typeof initialFields;
type Errors = Partial<Record<keyof Fields | "resume" | "coverLetter" | "form", string>>;

export function JobApplicationForm({ job }: { job: JobRef }) {
  const [fields, setFields] = useState<Fields>(initialFields);
  const [resume, setResume] = useState<File | null>(null);
  const [coverFile, setCoverFile] = useState<File | null>(null);
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<Status>("idle");
  const [serverError, setServerError] = useState<string | null>(null);
  const [success, setSuccess] = useState<{ jobTitle: string; email: string } | null>(null);

  function set<K extends keyof Fields>(key: K, value: string) {
    setFields((f) => ({ ...f, [key]: value }));
    if (errors[key]) setErrors((e) => ({ ...e, [key]: undefined }));
  }

  function validate(): Errors {
    const e: Errors = {};
    if (!fields.firstName.trim()) e.firstName = "First name is required.";
    if (!fields.lastName.trim()) e.lastName = "Last name is required.";
    if (!fields.email.trim()) e.email = "Email is required.";
    else if (!isValidEmail(fields.email)) e.email = "Enter a valid email address.";
    if (!fields.workAuthorization) e.workAuthorization = "This field is required.";
    if (!fields.sponsorship) e.sponsorship = "This field is required.";
    if (!resume) {
      e.resume = "A resume / CV is required.";
    } else {
      const re = validateUpload(resume, {
        exts: RESUME_EXTENSIONS,
        mimes: RESUME_MIME,
        maxBytes: MAX_RESUME_BYTES,
      });
      if (re) e.resume = re;
    }
    if (coverFile) {
      const ce = validateUpload(coverFile, {
        exts: COVER_EXTENSIONS,
        mimes: COVER_MIME,
        maxBytes: MAX_COVER_BYTES,
      });
      if (ce) e.coverLetter = ce;
    }
    return e;
  }

  async function onSubmit(ev: FormEvent) {
    ev.preventDefault();
    if (status === "submitting") return; // guard against double submit
    setServerError(null);
    const found = validate();
    setErrors(found);
    if (Object.keys(found).length > 0) return;

    setStatus("submitting");
    try {
      const body = new FormData();
      body.set("jobId", job.id);
      body.set("jobSlug", job.slug);
      body.set("jobTitle", job.title);
      (Object.keys(fields) as (keyof Fields)[]).forEach((k) => body.set(k, fields[k]));
      if (resume) body.set("resume", resume);
      if (coverFile) body.set("coverLetterFile", coverFile);

      const res = await fetch("/api/applications", { method: "POST", body });
      const data = await res.json().catch(() => ({}));

      if (res.ok && data.ok) {
        setSuccess({ jobTitle: data.jobTitle ?? job.title, email: data.email ?? fields.email });
        return;
      }
      if (res.status === 400 && data.errors) {
        setErrors(data.errors as Errors);
        setStatus("idle");
        return;
      }
      setServerError(data.error || "Something went wrong. Please try again.");
      setStatus("error");
    } catch {
      setServerError("Network error. Please check your connection and try again.");
      setStatus("error");
    }
  }

  if (success) {
    return (
      <div
        className="mx-auto flex max-w-2xl flex-col items-center gap-6 rounded-2xl border border-line bg-surface px-6 py-14 text-center shadow-md"
        role="status"
      >
        <span className="flex size-16 items-center justify-center rounded-full bg-success-soft text-success ring-8 ring-success-soft/40">
          <CheckCircle2 className="size-9" strokeWidth={1.75} />
        </span>
        <h3 className="text-2xl font-medium tracking-tight text-ink">Application submitted</h3>
        <p className="max-w-md text-base leading-relaxed text-ink-muted">
          Thank you for applying to ForwardCraft. We&apos;ve received your application and will
          contact you if your experience matches the role.
        </p>
        <dl className="flex w-full max-w-sm flex-col gap-px overflow-hidden rounded-lg border border-line bg-line text-left text-sm">
          <div className="flex items-center justify-between gap-4 bg-paper px-4 py-3">
            <dt className="font-mono text-2xs uppercase tracking-[0.1em] text-ink-subtle">Role</dt>
            <dd className="text-right font-medium text-ink">{success.jobTitle}</dd>
          </div>
          <div className="flex items-center justify-between gap-4 bg-paper px-4 py-3">
            <dt className="font-mono text-2xs uppercase tracking-[0.1em] text-ink-subtle">Candidate email</dt>
            <dd className="text-right font-medium text-ink">{success.email}</dd>
          </div>
        </dl>
        <div className="flex flex-wrap items-center justify-center gap-3 pt-1">
          <Button href="/careers" variant="secondary">
            Back to Careers
          </Button>
          <Button href="/">Back to home</Button>
        </div>
      </div>
    );
  }

  const submitting = status === "submitting";

  return (
    <form onSubmit={onSubmit} noValidate className="mx-auto flex max-w-2xl flex-col gap-5">
      {errors.form ? (
        <p className="rounded-lg border border-danger/30 bg-danger-soft px-4 py-3 text-sm text-danger shadow-sm" role="alert">
          {errors.form}
        </p>
      ) : null}

      <div className="grid gap-5 sm:grid-cols-2">
        <Input label="First name" name="firstName" required value={fields.firstName}
          onChange={(e) => set("firstName", e.target.value)} error={errors.firstName} autoComplete="given-name" />
        <Input label="Last name" name="lastName" required value={fields.lastName}
          onChange={(e) => set("lastName", e.target.value)} error={errors.lastName} autoComplete="family-name" />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <Input label="Email" name="email" type="email" required value={fields.email}
          onChange={(e) => set("email", e.target.value)} error={errors.email} autoComplete="email" />
        <Input label="Phone number" name="phone" type="tel" value={fields.phone}
          onChange={(e) => set("phone", e.target.value)} error={errors.phone} autoComplete="tel" />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <Input label="Current location" name="location" value={fields.location}
          onChange={(e) => set("location", e.target.value)} hint="City, country" />
        <Input label="LinkedIn profile" name="linkedin" type="url" value={fields.linkedin}
          onChange={(e) => set("linkedin", e.target.value)} placeholder="https://linkedin.com/in/…" />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <Input label="Personal website / portfolio" name="portfolio" type="url" value={fields.portfolio}
          onChange={(e) => set("portfolio", e.target.value)} placeholder="https://…" />
        <Input label="GitHub profile" name="github" type="url" value={fields.github}
          onChange={(e) => set("github", e.target.value)} placeholder="https://github.com/…" />
      </div>

      <FileDropzone
        label="Resume / CV"
        required
        exts={RESUME_EXTENSIONS}
        mimes={RESUME_MIME}
        maxBytes={MAX_RESUME_BYTES}
        file={resume}
        onFile={(f) => {
          setResume(f);
          if (errors.resume) setErrors((e) => ({ ...e, resume: undefined }));
        }}
        error={errors.resume}
      />

      <div className="flex flex-col gap-3">
        <Textarea label="Cover letter" name="coverLetterText" rows={5} value={fields.coverLetterText}
          onChange={(e) => set("coverLetterText", e.target.value)}
          hint="Write your cover letter here, and/or attach a file below. Both are optional." />
        <FileDropzone
          label="Cover letter file (optional)"
          exts={COVER_EXTENSIONS}
          mimes={COVER_MIME}
          maxBytes={MAX_COVER_BYTES}
          file={coverFile}
          onFile={(f) => {
            setCoverFile(f);
            if (errors.coverLetter) setErrors((e) => ({ ...e, coverLetter: undefined }));
          }}
          error={errors.coverLetter}
        />
      </div>

      <Select label="Are you legally authorized to work in the United States?" name="workAuthorization"
        required placeholder="Select…" options={YES_NO_OPTIONS} value={fields.workAuthorization}
        onChange={(e) => set("workAuthorization", e.target.value)} error={errors.workAuthorization} />

      <Select label="Will you now or in the future require employment visa sponsorship?" name="sponsorship"
        required placeholder="Select…" options={YES_NO_OPTIONS} value={fields.sponsorship}
        onChange={(e) => set("sponsorship", e.target.value)} error={errors.sponsorship} />

      <Select label="How did you hear about this opportunity?" name="referralSource"
        placeholder="Select…" options={REFERRAL_OPTIONS} value={fields.referralSource}
        onChange={(e) => set("referralSource", e.target.value)} />

      <Textarea label="Additional information" name="additionalInfo" rows={4} value={fields.additionalInfo}
        onChange={(e) => set("additionalInfo", e.target.value)}
        hint="Anything else you'd like us to know (optional)." />

      {serverError ? (
        <p className="rounded-lg border border-danger/30 bg-danger-soft px-4 py-3 text-sm text-danger shadow-sm" role="alert">
          {serverError}
        </p>
      ) : null}

      <div className="flex flex-col gap-3 border-t border-line pt-6">
        <Button type="submit" size="lg" disabled={submitting} className="w-full sm:w-auto">
          {submitting ? (
            <>
              <Loader2 className="size-4 animate-spin" /> Submitting…
            </>
          ) : (
            "Submit application"
          )}
        </Button>
        <p className="font-mono text-2xs uppercase tracking-[0.1em] text-ink-subtle">Fields marked with * are required.</p>
      </div>
    </form>
  );
}
