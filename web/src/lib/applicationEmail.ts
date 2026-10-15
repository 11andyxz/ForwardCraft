import type { Attachment } from "nodemailer";
import { REFERRAL_OPTIONS, YES_NO_OPTIONS, type ApplicationRecord } from "@/lib/applications";
import { sendMail } from "@/lib/mailer";

/**
 * Emails each new application — with the resume / cover letter attached — to the
 * hiring inbox. Override the recipient with APPLICATIONS_NOTIFY_TO.
 */

const DEFAULT_NOTIFY_TO = "andy@adxztech.com";

export function applicationRecipients(): string[] {
  const raw = process.env.APPLICATIONS_NOTIFY_TO?.trim() || DEFAULT_NOTIFY_TO;
  return raw.split(",").map((s) => s.trim()).filter(Boolean);
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function labelOf(options: { value: string; label: string }[], value: string | null): string | null {
  if (!value) return null;
  return options.find((o) => o.value === value)?.label ?? value;
}

/** Only http(s) links are rendered clickable; anything else stays plain text. */
function isHttpUrl(value: string): boolean {
  return /^https?:\/\/[^\s]+$/i.test(value);
}

/** Attachment filename without path separators or control characters. */
function safeFilename(name: string, fallback: string): string {
  const base = name.split(/[\\/]/).pop() ?? "";
  const clean = base.replace(/[\u0000-\u001f\u007f]+/g, " ").trim().slice(0, 200);
  return clean || fallback;
}

async function toAttachment(file: File, fallbackName: string): Promise<Attachment> {
  return {
    filename: safeFilename(file.name, fallbackName),
    content: Buffer.from(await file.arrayBuffer()),
    contentType: file.type || undefined,
  };
}

export interface ApplicationEmailInput {
  record: ApplicationRecord;
  resume: File;
  coverFile: File | null;
  /** Absolute link to the job page the candidate applied on. */
  jobUrl: string;
}

export async function sendApplicationEmail({
  record,
  resume,
  coverFile,
  jobUrl,
}: ApplicationEmailInput): Promise<{ messageId: string }> {
  const name = `${record.first_name} ${record.last_name}`;
  const submitted = record.submitted_at.toLocaleString("en-US", {
    timeZone: "America/New_York",
    dateStyle: "medium",
    timeStyle: "short",
  });

  const rows: [string, string | null, "url" | "email" | "text"][] = [
    ["Role", record.job_title, "text"],
    ["Name", name, "text"],
    ["Email", record.email, "email"],
    ["Phone", record.phone, "text"],
    ["Location", record.location, "text"],
    ["LinkedIn", record.linkedin_url, "url"],
    ["Portfolio / website", record.portfolio_url, "url"],
    ["GitHub", record.github_url, "url"],
    ["Authorized to work in the US", labelOf(YES_NO_OPTIONS, record.work_authorization), "text"],
    ["Requires visa sponsorship (now or future)", labelOf(YES_NO_OPTIONS, record.sponsorship_required), "text"],
    ["How they heard about us", labelOf(REFERRAL_OPTIONS, record.referral_source), "text"],
  ];
  const present = rows.filter(([, value]) => value);

  const attachments = [await toAttachment(resume, "resume")];
  if (coverFile) attachments.push(await toAttachment(coverFile, "cover-letter"));
  const attachmentNames = attachments.map((a) => a.filename as string);

  const longText: [string, string | null][] = [
    ["Cover letter", record.cover_letter_text],
    ["Additional information", record.additional_info],
  ];

  // ---- Plain-text part ----
  const text = [
    `New application for ${record.job_title}`,
    "",
    ...present.map(([label, value]) => `${label}: ${value}`),
    `Attachments: ${attachmentNames.join(", ")}`,
    ...longText.flatMap(([label, value]) => (value ? ["", `${label}:`, value] : [])),
    "",
    `Job page: ${jobUrl}`,
    `Application ID: ${record.id}`,
    `Submitted: ${submitted} ET`,
  ].join("\n");

  // ---- HTML part (every user value is escaped) ----
  const cell = (value: string, kind: "url" | "email" | "text") => {
    const v = escapeHtml(value);
    if (kind === "email") {
      // Percent-encode each part so characters legal in an address (? & =)
      // can't become mailto query fields such as bcc= / body=.
      const at = value.lastIndexOf("@");
      const href = `mailto:${encodeURIComponent(value.slice(0, at))}@${encodeURIComponent(value.slice(at + 1))}`;
      return `<a href="${escapeHtml(href)}">${v}</a>`;
    }
    if (kind === "url" && isHttpUrl(value)) return `<a href="${v}">${v}</a>`;
    return v;
  };
  const tableRows = present
    .map(
      ([label, value, kind]) =>
        `<tr><td style="padding:6px 16px 6px 0;color:#6b6b6b;vertical-align:top;white-space:nowrap">${escapeHtml(label)}</td>` +
        `<td style="padding:6px 0;color:#1a1a1a">${cell(value as string, kind)}</td></tr>`,
    )
    .join("");
  const longBlocks = longText
    .filter(([, value]) => value)
    .map(
      ([label, value]) =>
        `<h3 style="margin:24px 0 8px;font-size:14px;color:#1a1a1a">${escapeHtml(label)}</h3>` +
        `<div style="white-space:pre-wrap;color:#333;line-height:1.5">${escapeHtml(value as string)}</div>`,
    )
    .join("");

  const html = `<!doctype html><html><body style="margin:0;padding:24px;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;font-size:14px;background:#ffffff">
<h2 style="margin:0 0 4px;font-size:18px;color:#1a1a1a">New application: ${escapeHtml(record.job_title)}</h2>
<p style="margin:0 0 16px;color:#6b6b6b">${escapeHtml(name)} · submitted ${escapeHtml(submitted)} ET</p>
<table style="border-collapse:collapse">${tableRows}
<tr><td style="padding:6px 16px 6px 0;color:#6b6b6b;vertical-align:top;white-space:nowrap">Attachments</td><td style="padding:6px 0;color:#1a1a1a">${attachmentNames.map(escapeHtml).join("<br>")}</td></tr>
</table>
${longBlocks}
<p style="margin:24px 0 0;color:#8a8a8a;font-size:12px"><a href="${escapeHtml(jobUrl)}">View job posting</a> · Application ID ${escapeHtml(record.id)}<br>Reply to this email to respond to the candidate directly.</p>
</body></html>`;

  return sendMail({
    to: applicationRecipients(),
    replyTo: { name, address: record.email },
    subject: `New application: ${record.job_title} — ${name}`,
    text,
    html,
    attachments,
  });
}

/**
 * Auto-reply to the candidate confirming receipt. Sent from GMAIL_USER, so a
 * reply lands in the hiring inbox. Only the first name and the job title vary;
 * the first name is capped so the template can't carry arbitrary text.
 */
export async function sendApplicantConfirmation({
  record,
  jobUrl,
}: {
  record: ApplicationRecord;
  jobUrl: string;
}): Promise<{ messageId: string }> {
  const firstName = record.first_name.replace(/\s+/g, " ").trim().slice(0, 50);
  const paragraphs = [
    `Thank you for applying for the ${record.job_title} position at ForwardCraft. We've successfully received your application and resume, and our team is reviewing it now.`,
    "We'll be in touch by email with any updates or next steps. If you have questions in the meantime, simply reply to this message.",
  ];

  const text = [
    `Hi ${firstName},`,
    "",
    ...paragraphs.flatMap((p) => [p, ""]),
    "Best regards,",
    "The ForwardCraft Hiring Team",
    "",
    `Role: ${record.job_title}`,
    `Job posting: ${jobUrl}`,
  ].join("\n");

  const html = `<!doctype html><html><body style="margin:0;padding:24px;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;font-size:15px;line-height:1.6;color:#1a1a1a;background:#ffffff">
<p style="margin:0 0 16px">Hi ${escapeHtml(firstName)},</p>
${paragraphs.map((p) => `<p style="margin:0 0 16px">${escapeHtml(p)}</p>`).join("\n")}
<p style="margin:0 0 24px">Best regards,<br>The ForwardCraft Hiring Team</p>
<p style="margin:0;color:#8a8a8a;font-size:12px">Role: ${escapeHtml(record.job_title)} · <a href="${escapeHtml(jobUrl)}">View job posting</a></p>
</body></html>`;

  return sendMail({
    to: [record.email],
    subject: `We've received your application — ${record.job_title}`,
    text,
    html,
  });
}
