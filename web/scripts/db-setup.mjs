// One-time database setup: creates the `applications` table.
// Reads DATABASE_URL from the environment or from .env.local (so secrets never
// need to be passed on the command line). Run:  npm run db:setup
import { readFileSync, existsSync } from "node:fs";
import path from "node:path";
import mysql from "mysql2/promise";

function loadEnvLocal() {
  const p = path.join(process.cwd(), ".env.local");
  if (!existsSync(p)) return;
  for (const raw of readFileSync(p, "utf8").split("\n")) {
    const m = raw.match(/^\s*([A-Za-z0-9_]+)\s*=\s*(.*)\s*$/);
    if (!m) continue;
    let v = m[2].trim();
    if ((v.startsWith('"') && v.endsWith('"')) || (v.startsWith("'") && v.endsWith("'"))) {
      v = v.slice(1, -1);
    }
    if (!(m[1] in process.env)) process.env[m[1]] = v;
  }
}

const CREATE_TABLE = `
CREATE TABLE IF NOT EXISTS applications (
  id                    VARCHAR(36)  NOT NULL PRIMARY KEY,
  job_id                VARCHAR(255) NOT NULL,
  job_slug              VARCHAR(255) NOT NULL,
  job_title             VARCHAR(255) NOT NULL,
  first_name            VARCHAR(255) NOT NULL,
  last_name             VARCHAR(255) NOT NULL,
  email                 VARCHAR(320) NOT NULL,
  phone                 VARCHAR(64)      NULL,
  location              VARCHAR(255)     NULL,
  linkedin_url          VARCHAR(1024)    NULL,
  portfolio_url         VARCHAR(1024)    NULL,
  github_url            VARCHAR(1024)    NULL,
  work_authorization    VARCHAR(16)      NULL,
  sponsorship_required  VARCHAR(16)      NULL,
  referral_source       VARCHAR(255)     NULL,
  additional_info       TEXT             NULL,
  resume_url            VARCHAR(1024)    NULL,
  resume_filename       VARCHAR(512)     NULL,
  cover_letter_text     TEXT             NULL,
  cover_letter_url      VARCHAR(1024)    NULL,
  status                VARCHAR(32)  NOT NULL DEFAULT 'new',
  submitted_at          DATETIME     NOT NULL,
  created_at            TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at            TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_job_slug (job_slug),
  INDEX idx_status (status),
  INDEX idx_email (email)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
`;

async function main() {
  loadEnvLocal();
  if (!process.env.DATABASE_URL) {
    console.error("✗ DATABASE_URL is not set. Add it to .env.local or the environment.");
    process.exit(1);
  }
  const u = new URL(process.env.DATABASE_URL);
  const ca = process.env.MYSQL_CA_CERT;
  const conn = await mysql.createConnection({
    host: u.hostname,
    port: u.port ? Number(u.port) : 3306,
    user: decodeURIComponent(u.username),
    password: decodeURIComponent(u.password),
    database: u.pathname.replace(/^\//, "").split("?")[0] || "defaultdb",
    ssl: ca && ca.trim() ? { ca, rejectUnauthorized: true } : { rejectUnauthorized: false },
  });
  await conn.query(CREATE_TABLE);
  const [rows] = await conn.query("SHOW TABLES LIKE 'applications'");
  await conn.end();
  console.log(
    Array.isArray(rows) && rows.length
      ? "✓ applications table is ready."
      : "✗ Table creation did not report the expected table.",
  );
}

main().catch((err) => {
  console.error("✗ Setup failed:", err.message);
  process.exit(1);
});
