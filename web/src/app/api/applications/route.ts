import { NextResponse, after } from "next/server";
import { checkBotId } from "botid/server";
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
import { countApplicationsSince, insertApplication } from "@/lib/db";
import { getJob } from "@/data/mock/jobs";
import { isMailerConfigured } from "@/lib/mailer";
import { sendApplicantConfirmation, sendApplicationEmail } from "@/lib/applicationEmail";

// mysql2 + Blob + SMTP need the Node.js runtime (not edge); POST is always dynamic.
export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const maxDuration = 60;

// This endpoint is public and its emails go out through a Gmail account shared
// with other apps (~2,000 sends/day), so emails are budgeted: at most
// DAILY_EMAIL_CAP application emails a day, and one auto-reply per address per
// role per day. Over budget, applications are still archived.
const DAILY_EMAIL_CAP = 100;
// Upper bound on the hiring-inbox email so the route always answers in time.
const EMAIL_DEADLINE_MS = 25_000;
// Hidden form field that people never see; bots that fill every input do.
const HONEYPOT_FIELD = "hp_field";

/** Rejects if `p` hasn't settled within `ms`. */
function withDeadline<T>(p: Promise<T>, ms: number): Promise<T> {
  let timer: ReturnType<typeof setTimeout> | undefined;
  const deadline = new Promise<never>((_, reject) => {
    timer = setTimeout(() => reject(new Error(`Timed out after ${ms} ms`)), ms);
  });
  return Promise.race([p, deadline]).finally(() => clearTimeout(timer));
}

async function emailBudget(email: string, jobSlug: string): Promise<{ notify: boolean; confirm: boolean }> {
  if (!process.env.DATABASE_URL) return { notify: true, confirm: true };
  try {
    const since = new Date(Date.now() - 24 * 60 * 60 * 1000);
    const { total, fromEmail } = await countApplicationsSince(since, email, jobSlug);
    const notify = total < DAILY_EMAIL_CAP;
    return { notify, confirm: notify && fromEmail === 0 };
  } catch (err) {
    console.error("Email budget check failed:", err);
    return { notify: true, confirm: false };
  }
}

function str(form: FormData, key: string): string {
  const v = form.get(key);
  return typeof v === "string" ? v.trim() : "";
}

function fileOf(form: FormData, key: string): File | null {
  const v = form.get(key);
  return v instanceof File && v.size > 0 ? v : null;
}

export async function POST(request: Request) {
  // Vercel BotID: requests that didn't come from our page (scripts, curl) fail
  // the challenge. Always passes in local development.
  const verification = await checkBotId();
  if (verification.isBot) {
    return NextResponse.json(
      { ok: false, error: "We couldn't verify your browser. Please refresh the page and try again." },
      { status: 403 },
    );
  }

  let form: FormData;
  try {
    form = await request.formData();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid form submission." }, { status: 400 });
  }

  // Bot filled the hidden field: answer like a success, store and send nothing.
  if (str(form, HONEYPOT_FIELD)) {
    return NextResponse.json({ ok: true, applicationId: randomUUID(), email: str(form, "email") });
  }

  const fields = {
    jobSlug: str(form, "jobSlug"),
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
  // Job context comes from our own listings, never from the posted title — the
  // title is echoed into emails, including the auto-reply to the candidate.
  const job = getJob(fields.jobSlug);
  if (!job) {
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
  const safeSlug = job!.slug.replace(/[^a-z0-9-]/gi, "-");
  const jobUrl = `${new URL(request.url).origin}/careers/${safeSlug}`;

  // Field values shared by the archive row and the emails.
  const record: ApplicationRecord = {
    id,
    job_id: job!.id,
    job_slug: job!.slug,
    job_title: job!.title,
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
    resume_url: null,
    resume_filename: resume!.name,
    cover_letter_text: fields.coverLetterText || null,
    cover_letter_url: null,
    status: "new",
    submitted_at: new Date(),
  };

  // ---- Archive: files to Vercel Blob (private), row to MySQL — when configured ----
  async function archive(): Promise<boolean> {
    if (!process.env.BLOB_READ_WRITE_TOKEN || !process.env.DATABASE_URL) return false;
    try {
      const r = await put(`applications/${safeSlug}/${id}/${resume!.name}`, resume!, {
        access: "private",
        addRandomSuffix: true,
      });
      const c = coverFile
        ? await put(`applications/${safeSlug}/${id}/cover-${coverFile.name}`, coverFile, {
            access: "private",
            addRandomSuffix: true,
          })
        : null;
      await insertApplication({ ...record, resume_url: r.url, cover_letter_url: c?.url ?? null });
      return true;
    } catch (err) {
      console.error("Application archive (Blob/DB) failed:", err);
      return false;
    }
  }

  const budget = isMailerConfigured()
    ? await emailBudget(record.email, record.job_slug)
    : { notify: false, confirm: false };
  if (isMailerConfigured() && !budget.notify) {
    console.warn(`Application ${id}: daily email cap (${DAILY_EMAIL_CAP}) reached; not emailing.`);
  }

  // ---- Notify: email the application, files attached, to the hiring inbox ----
  async function notify(): Promise<boolean> {
    if (!budget.notify) return false;
    try {
      await withDeadline(
        sendApplicationEmail({ record, resume: resume!, coverFile, jobUrl }),
        EMAIL_DEADLINE_MS,
      );
      return true;
    } catch (err) {
      console.error("Application email failed:", err);
      return false;
    }
  }

  // The application counts as received once at least one channel has it.
  const [archived, emailed] = await Promise.all([archive(), notify()]);
  if (!archived && !emailed) {
    console.error(`Application ${id} was not delivered (archived=false, emailed=false).`);
    return NextResponse.json(
      { ok: false, error: "We couldn't submit your application. Please try again." },
      { status: 502 },
    );
  }
  if (!emailed) console.warn(`Application ${id} archived but not emailed.`);

  // ---- Auto-reply to the candidate, after the response so it never blocks it ----
  if (budget.confirm) {
    after(async () => {
      try {
        await sendApplicantConfirmation({ record, jobUrl });
      } catch (err) {
        console.error(`Application ${id} confirmation email failed:`, err);
      }
    });
  }

  return NextResponse.json({
    ok: true,
    applicationId: id,
    jobTitle: job!.title,
    email: fields.email,
  });
}
