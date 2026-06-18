import { NextResponse } from "next/server";
import { put } from "@vercel/blob";
import { randomUUID } from "node:crypto";
import {
  isValidEmail,
  validateUpload,
  RESUME_EXTENSIONS,
  RESUME_MIME,
  MAX_RESUME_BYTES,
  COVER_EXTENSIONS,
  COVER_MIME,
  MAX_COVER_BYTES,
  type ApplicationRecord,
} from "@/lib/applications";
import { insertApplication } from "@/lib/db";

// mysql2 + Blob need the Node.js runtime (not edge); POST is always dynamic.
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function str(form: FormData, key: string): string {
  const v = form.get(key);
  return typeof v === "string" ? v.trim() : "";
}

function fileOf(form: FormData, key: string): File | null {
  const v = form.get(key);
  return v instanceof File && v.size > 0 ? v : null;
}

export async function POST(request: Request) {
  let form: FormData;
  try {
    form = await request.formData();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid form submission." }, { status: 400 });
  }

  const fields = {
    jobId: str(form, "jobId"),
    jobSlug: str(form, "jobSlug"),
    jobTitle: str(form, "jobTitle"),
    firstName: str(form, "firstName"),
    lastName: str(form, "lastName"),
    email: str(form, "email"),
    phone: str(form, "phone"),
    location: str(form, "location"),
    linkedin: str(form, "linkedin"),
    portfolio: str(form, "portfolio"),
    github: str(form, "github"),
    workAuthorization: str(form, "workAuthorization"),
    sponsorship: str(form, "sponsorship"),
    referralSource: str(form, "referralSource"),
    additionalInfo: str(form, "additionalInfo"),
    coverLetterText: str(form, "coverLetterText"),
  };
  const resume = fileOf(form, "resume");
  const coverFile = fileOf(form, "coverLetterFile");

  // ---- Server-side validation (mirrors the client) ----
  const errors: Record<string, string> = {};
  if (!fields.firstName) errors.firstName = "First name is required.";
  if (!fields.lastName) errors.lastName = "Last name is required.";
  if (!fields.email) errors.email = "Email is required.";
  else if (!isValidEmail(fields.email)) errors.email = "Enter a valid email address.";
  if (!fields.workAuthorization) errors.workAuthorization = "This field is required.";
  if (!fields.sponsorship) errors.sponsorship = "This field is required.";
  if (!fields.jobId || !fields.jobSlug || !fields.jobTitle) {
    errors.form = "Missing job context. Please reopen the role and try again.";
  }
  if (!resume) {
    errors.resume = "A resume / CV is required.";
  } else {
    const e = validateUpload(resume, {
      exts: RESUME_EXTENSIONS,
      mimes: RESUME_MIME,
      maxBytes: MAX_RESUME_BYTES,
    });
    if (e) errors.resume = e;
  }
  if (coverFile) {
    const e = validateUpload(coverFile, {
      exts: COVER_EXTENSIONS,
      mimes: COVER_MIME,
      maxBytes: MAX_COVER_BYTES,
    });
    if (e) errors.coverLetter = e;
  }

  if (Object.keys(errors).length > 0) {
    return NextResponse.json({ ok: false, errors }, { status: 400 });
  }

  const id = randomUUID();

  // ---- Upload files to Vercel Blob (secure storage; DB keeps only URLs) ----
  let resumeUrl: string | null = null;
  let coverUrl: string | null = null;
  try {
    const safeSlug = fields.jobSlug.replace(/[^a-z0-9-]/gi, "-");
    const r = await put(`applications/${safeSlug}/${id}/${resume!.name}`, resume!, {
      access: "public",
      addRandomSuffix: true,
    });
    resumeUrl = r.url;
    if (coverFile) {
      const c = await put(`applications/${safeSlug}/${id}/cover-${coverFile.name}`, coverFile, {
        access: "public",
        addRandomSuffix: true,
      });
      coverUrl = c.url;
    }
  } catch (err) {
    console.error("Blob upload failed:", err);
    return NextResponse.json(
      {
        ok: false,
        error: "We couldn't upload your file. Please try again.",
        detail: err instanceof Error ? err.message : String(err),
        tokenPresent: !!process.env.BLOB_READ_WRITE_TOKEN,
      },
      { status: 502 },
    );
  }

  // ---- Persist to the database ----
  const record: ApplicationRecord = {
    id,
    job_id: fields.jobId,
    job_slug: fields.jobSlug,
    job_title: fields.jobTitle,
    first_name: fields.firstName,
    last_name: fields.lastName,
    email: fields.email,
    phone: fields.phone || null,
    location: fields.location || null,
    linkedin_url: fields.linkedin || null,
    portfolio_url: fields.portfolio || null,
    github_url: fields.github || null,
    work_authorization: fields.workAuthorization || null,
    sponsorship_required: fields.sponsorship || null,
    referral_source: fields.referralSource || null,
    additional_info: fields.additionalInfo || null,
    resume_url: resumeUrl,
    resume_filename: resume!.name,
    cover_letter_text: fields.coverLetterText || null,
    cover_letter_url: coverUrl,
    status: "new",
    submitted_at: new Date(),
  };

  try {
    await insertApplication(record);
  } catch (err) {
    console.error("DB insert failed:", err);
    return NextResponse.json(
      {
        ok: false,
        error: "We couldn't save your application. Please try again.",
        detail: err instanceof Error ? err.message : String(err),
      },
      { status: 500 },
    );
  }

  return NextResponse.json({
    ok: true,
    applicationId: id,
    jobTitle: fields.jobTitle,
    email: fields.email,
  });
}
