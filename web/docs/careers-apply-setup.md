# Careers application flow — setup

The job detail pages (`/careers/[slug]`) now include an in-page application form
that **uploads the resume to Vercel Blob** and **stores the application in your
Aiven MySQL database**. This requires a few credentials, which live only in
environment variables — they are never committed.

## What you need to provide

| Variable | What it is | Where to get it |
| --- | --- | --- |
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
   Set `DATABASE_URL` (and optionally `MYSQL_CA_CERT`). For local file uploads,
   add `BLOB_READ_WRITE_TOKEN` from the Vercel dashboard (Storage → your Blob
   store → ".env.local" tab).
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
4. **Redeploy** (push to `main`, or redeploy in the dashboard) so the new
   environment variables are picked up.

## Where data goes

- **Applications** → `applications` table (status defaults to `new`).
- **Resume / cover-letter files** → Vercel Blob; the table stores only the file
  **URL** (`resume_url`, `cover_letter_url`), never the file bytes.
- Each row is bound to the job automatically (`job_id`, `job_slug`, `job_title`)
  from the page the candidate applied on — never typed by the user.

## Notes

- The API route is `POST /api/applications` (Node.js runtime).
- Validation runs on both the client and the server.
- If `BLOB_READ_WRITE_TOKEN` or `DATABASE_URL` is missing, the form surfaces a
  clear error instead of silently failing.
