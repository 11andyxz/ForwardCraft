import mysql from "mysql2/promise";
import type { ApplicationRecord } from "@/lib/applications";

/**
 * MySQL connection pool (Aiven). Credentials come ONLY from the environment —
 * never hardcoded. Set DATABASE_URL (the Aiven service URI) and, for strict TLS
 * verification, MYSQL_CA_CERT (the Aiven CA certificate, PEM).
 */

declare global {
  var __fcMysqlPool: mysql.Pool | undefined;
}

function buildSsl(): mysql.PoolOptions["ssl"] {
  const ca = process.env.MYSQL_CA_CERT;
  if (ca && ca.trim()) {
    return { ca, rejectUnauthorized: true };
  }
  // Aiven uses a private CA; without it we still use TLS but cannot verify the
  // chain. Provide MYSQL_CA_CERT in production for full verification.
  return { rejectUnauthorized: false };
}

export function getPool(): mysql.Pool {
  if (!process.env.DATABASE_URL) {
    throw new Error("DATABASE_URL is not set");
  }
  if (global.__fcMysqlPool) return global.__fcMysqlPool;

  const u = new URL(process.env.DATABASE_URL);
  const pool = mysql.createPool({
    host: u.hostname,
    port: u.port ? Number(u.port) : 3306,
    user: decodeURIComponent(u.username),
    password: decodeURIComponent(u.password),
    database: u.pathname.replace(/^\//, "").split("?")[0] || "defaultdb",
    ssl: buildSsl(),
    connectionLimit: 5,
    waitForConnections: true,
    enableKeepAlive: true,
  });
  global.__fcMysqlPool = pool;
  return pool;
}

export const CREATE_APPLICATIONS_TABLE = `
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

/** Insert one application row. Returns the new application id. */
export async function insertApplication(rec: ApplicationRecord): Promise<void> {
  const pool = getPool();
  await pool.execute(
    `INSERT INTO applications
      (id, job_id, job_slug, job_title, first_name, last_name, email, phone,
       location, linkedin_url, portfolio_url, github_url, work_authorization,
       sponsorship_required, referral_source, additional_info, resume_url,
       resume_filename, cover_letter_text, cover_letter_url, status, submitted_at)
     VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,
    [
      rec.id,
      rec.job_id,
      rec.job_slug,
      rec.job_title,
      rec.first_name,
      rec.last_name,
      rec.email,
      rec.phone,
      rec.location,
      rec.linkedin_url,
      rec.portfolio_url,
      rec.github_url,
      rec.work_authorization,
      rec.sponsorship_required,
      rec.referral_source,
      rec.additional_info,
      rec.resume_url,
      rec.resume_filename,
      rec.cover_letter_text,
      rec.cover_letter_url,
      rec.status,
      rec.submitted_at,
    ],
  );
}
