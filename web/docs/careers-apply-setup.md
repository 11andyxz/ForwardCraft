# Careers application flow — setup

The job detail pages (`/careers/[slug]`) now include an in-page application form
that **emails each application — resume and cover letter attached — to
andy@adxztech.com**, and also **uploads the files to Vercel Blob** and **stores
the application in your Aiven MySQL database**. This requires a few credentials,
which live only in environment variables — they are never committed.

## What you need to provide

| Variable | What it is | Where to get it |
| --- | --- | --- |
| `GMAIL_USER` | Sending Gmail / Workspace mailbox (e.g. andy@adxztech.com) | Same value as the Autoxhs app |
| `GMAIL_APP_PASSWORD` | Google App Password for that mailbox | Google account → Security → App passwords (same as Autoxhs) |
| `GMAIL_FROM_NAME` | Sender display name — optional (default "ForwardCraft Careers") | — |
| `APPLICATIONS_NOTIFY_TO` | Recipient(s), comma-separated — optional (default andy@adxztech.com) | — |
| `DATABASE_URL` | Aiven MySQL Service URI | Aiven console → service → Connection information → "Service URI" |
| `MYSQL_CA_CERT` | Aiven CA certificate (PEM) — optional but recommended | Aiven console → "CA certificate" → Show/Download |
| `BLOB_READ_WRITE_TOKEN` | Vercel Blob token | Created when you add a Blob store to the project (see below) |

> 🔐 **Rotate the database password.** The password was visible in a screenshot,
> so treat it as exposed — use the ↻ (reset) control next to the password in
> Aiven, then update `DATABASE_URL` everywhere below.

## Local development

1. Copy the template and fill in real values (this file is gitignored):
   ```bash
   cp .env.example .env.local
   ```
   Set `GMAIL_USER` and `GMAIL_APP_PASSWORD` to email applications to
   andy@adxztech.com. The archive (Blob files + MySQL row) runs only when BOTH
   `DATABASE_URL` and `BLOB_READ_WRITE_TOKEN` are set — with `DATABASE_URL`
   alone no row is written. Copy `BLOB_READ_WRITE_TOKEN` from the Vercel
   dashboard (Storage → your Blob store → ".env.local" tab); `MYSQL_CA_CERT` is
   optional.
2. Create the database table (reads `.env.local` automatically):
   ```bash
   npm run db:setup
   ```
3. Run the app:
   ```bash
   npm run dev
   ```

## Production (Vercel)

1. **Add a Blob store**: Vercel dashboard → project `forwardcraft-web` → **Storage**
   → **Create** → **Blob**. This automatically adds `BLOB_READ_WRITE_TOKEN` to the
   project's environment variables.
2. **Add the DB variables**: Settings → **Environment Variables** → add
   `DATABASE_URL` (and `MYSQL_CA_CERT` if using strict TLS) for the Production
   (and Preview) environments.
3. **Create the table once** against the same database — either run
   `npm run db:setup` locally with the production `DATABASE_URL`, or paste the
   `CREATE TABLE` from `scripts/db-setup.mjs` into the Aiven query console.
4. **Add the email variables**: Settings → **Environment Variables** → add
   `GMAIL_USER` and `GMAIL_APP_PASSWORD` (optionally `GMAIL_FROM_NAME`,
   `APPLICATIONS_NOTIFY_TO`) for Production.
5. **Redeploy** (push to `main`, or redeploy in the dashboard) so the new
   environment variables are picked up.

## Where data goes

- **Email** → one message per application to `APPLICATIONS_NOTIFY_TO`
  (default andy@adxztech.com), sent from `GMAIL_USER`, with every field in the
  body and the resume / cover-letter files attached. Reply-To is the candidate,
  so replying goes straight to them.
- **Auto-reply** → the candidate gets a confirmation from `GMAIL_USER` ("we've
  received your application and are reviewing it; we'll be in touch with next
  steps"). It is sent after the response, so it never slows down or fails the
  submission. The job title in both emails comes from our own listings, not
  from the submitted form.
- **Applications** → `applications` table (status defaults to `new`).
- **Resume / cover-letter files** → Vercel Blob; the table stores only the file
  **URL** (`resume_url`, `cover_letter_url`), never the file bytes.
- Each row is bound to the job automatically (`job_id`, `job_slug`, `job_title`)
  from the page the candidate applied on — never typed by the user.

## Notes

- The API route is `POST /api/applications` (Node.js runtime).
- Validation runs on both the client and the server.
- Email and archive (Blob + MySQL) run in parallel, each only when its variables
  are set. The candidate sees success once at least one of them has the
  application; if both fail, the form shows an error so they can retry. Failures
  are logged in the Vercel function logs; a channel whose variables are missing
  is skipped without a log line.
- Abuse limits (the endpoint is public and shares the Gmail account's ~2,000
  sends/day): a hidden honeypot field silently drops bot submissions; at most
  100 application emails per 24 h; at most one auto-reply per address per role
  per 24 h (counts come from the `applications` table, so they need the
  archive). Over the cap, applications are still archived, just not emailed.
- Bot protection (both free on the Hobby plan):
  - **Vercel BotID (Basic)** — `src/instrumentation-client.ts` runs an
    invisible challenge on the page and the route calls `checkBotId()`, so
    requests that don't come from the site's own form (curl, scripts) get a
    403. Always passes in local development.
  - **Vercel WAF rate limit** — custom firewall rule "Rate limit applications":
    `POST /api/applications`, 5 requests per IP per 10 minutes, then 429.
    Managed in Vercel → project → Firewall (Hobby allows one rate-limit rule).
- The hiring-inbox email has a 25 s deadline and SMTP timeouts, so a stalled
  Gmail connection can't hold the request past `maxDuration` (60 s).
- Uploads are capped at 3 MB (resume) + 1 MB (cover letter) because Vercel
  Functions reject request bodies over 4.5 MB.
