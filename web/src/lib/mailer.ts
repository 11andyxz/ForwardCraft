import nodemailer, { type Attachment, type Transporter } from "nodemailer";
import { EMAIL_RE } from "@/lib/applications";

/**
 * Server-only email sender over Gmail SMTP (Nodemailer + a Google App Password),
 * the same channel the Autoxhs app uses. Credentials come ONLY from the
 * environment — never hardcoded:
 *   GMAIL_USER          sending mailbox, e.g. andy@adxztech.com (also the SMTP login)
 *   GMAIL_APP_PASSWORD  Google account App Password (requires 2-Step Verification)
 *   GMAIL_FROM_NAME     optional display name (default "ForwardCraft Careers")
 */

export class MailerNotConfiguredError extends Error {}

// A single bare address (see EMAIL_RE): nothing the address parser would split
// or rewrite into a different recipient. The form validates with the same rule,
// so an accepted applicant address is always usable as Reply-To / recipient.
export function isPlainAddress(value: string): boolean {
  return EMAIL_RE.test(value.trim());
}

/** Header-safe single line: strips CR/LF (header injection) and caps length. */
export function sanitizeHeader(value: string, max = 998): string {
  return value.replace(/[\r\n]+/g, " ").trim().slice(0, max);
}

interface MailerConfig {
  user: string;
  pass: string;
  fromName: string;
}

function getConfig(): MailerConfig {
  const user = process.env.GMAIL_USER?.trim();
  // App Passwords are often copied with spaces ("abcd efgh ..."); drop them.
  const pass = process.env.GMAIL_APP_PASSWORD?.replace(/\s+/g, "");
  if (!user || !pass) {
    throw new MailerNotConfiguredError("Gmail is not configured (GMAIL_USER / GMAIL_APP_PASSWORD).");
  }
  const fromName = process.env.GMAIL_FROM_NAME?.trim() || "ForwardCraft Careers";
  return { user, pass, fromName };
}

export function isMailerConfigured(): boolean {
  return !!(process.env.GMAIL_USER?.trim() && process.env.GMAIL_APP_PASSWORD?.trim());
}

let transporter: Transporter | null = null;

function getTransporter(cfg: MailerConfig): Transporter {
  if (transporter) return transporter;
  // Nodemailer's default timeouts run to minutes; keep each phase well inside
  // the route's maxDuration so a stalled connection fails fast instead.
  transporter = nodemailer.createTransport({
    service: "gmail",
    auth: { user: cfg.user, pass: cfg.pass },
    dnsTimeout: 5_000,
    connectionTimeout: 10_000,
    greetingTimeout: 10_000,
    socketTimeout: 20_000,
  });
  return transporter;
}

export interface MailInput {
  to: string[];
  /** Where replies go (e.g. the applicant). Skipped unless it is a bare address. */
  replyTo?: { name: string; address: string };
  subject: string;
  text: string;
  html: string;
  attachments?: Attachment[];
}

/**
 * Send one email. Recipients must be bare addresses; the subject is folded to a
 * single line. Addresses are passed as structured objects so Nodemailer encodes
 * display names safely and never re-parses them into extra recipients.
 */
export async function sendMail(input: MailInput): Promise<{ messageId: string }> {
  const cfg = getConfig();

  const to = input.to.map((t) => t.trim()).filter(Boolean);
  if (!to.length) throw new Error("No recipient configured.");
  for (const t of to) {
    if (!isPlainAddress(t)) throw new Error(`Invalid recipient address: ${t}`);
  }

  const replyTo =
    input.replyTo && isPlainAddress(input.replyTo.address)
      ? { name: sanitizeHeader(input.replyTo.name, 200), address: input.replyTo.address.trim() }
      : undefined;

  const info = await getTransporter(cfg).sendMail({
    from: { name: cfg.fromName, address: cfg.user },
    to: to.map((address) => ({ name: "", address })),
    replyTo,
    subject: sanitizeHeader(input.subject),
    text: input.text,
    html: input.html,
    attachments: input.attachments,
  });

  return { messageId: info.messageId };
}
