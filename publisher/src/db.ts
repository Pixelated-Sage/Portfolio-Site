import pg from 'pg';
import crypto from 'crypto';
import { config } from './config.js';
import type { FormattedDailyNote, EngineeringEntry, AuditReport } from './schemas.js';

const { Pool } = pg;

export const pool = new Pool({
  host: config.pgHost,
  port: config.pgPort,
  user: config.pgUser,
  password: config.pgPassword || undefined,
  database: config.pgDatabase,
});

export async function saveRawNote(content: string): Promise<{ id: number; hash: string }> {
  const hash = crypto.createHash('sha256').update(content.trim()).digest('hex');
  const res = await pool.query(
    `INSERT INTO raw_notes (content, content_hash)
     VALUES ($1, $2)
     RETURNING id;`,
    [content, hash]
  );
  return { id: res.rows[0].id, hash };
}

export async function saveFormattedNote(
  note: FormattedDailyNote,
  rawNoteId: number
): Promise<number> {
  const res = await pool.query(
    `INSERT INTO formatted_notes (raw_note_id, day_number, date, title, topic, key_learnings, formatted_markdown)
     VALUES ($1, $2, $3, $4, $5, $6, $7)
     RETURNING id;`,
    [
      rawNoteId,
      note.dayNumber,
      note.date,
      note.title,
      note.topic,
      note.keyLearnings,
      note.formattedMarkdown,
    ]
  );
  return res.rows[0].id;
}

export async function createPublishingRecord(params: {
  entry: EngineeringEntry;
  rawNoteId: number;
  formattedNoteId: number;
  auditResults: AuditReport;
  evidenceSources: Record<string, unknown>;
}): Promise<number> {
  const { entry, rawNoteId, formattedNoteId, auditResults, evidenceSources } = params;
  const res = await pool.query(
    `INSERT INTO publishing_records 
     (entry_id, slug, day_number, entry_date, title, topic, status, approval_status, commit_hash, evidence_sources, audit_results, full_entry, raw_note_id, formatted_note_id)
     VALUES ($1, $2, $3, $4, $5, $6, $7, 'PENDING', $8, $9, $10, $11, $12, $13)
     RETURNING id;`,
    [
      entry.id,
      entry.slug,
      entry.dayNumber,
      entry.date,
      entry.title,
      entry.topic,
      entry.status,
      entry.evidenceCommit?.hash || null,
      JSON.stringify(evidenceSources),
      JSON.stringify(auditResults),
      JSON.stringify(entry),
      rawNoteId,
      formattedNoteId,
    ]
  );
  return res.rows[0].id;
}

export async function updatePublishingApproval(
  recordId: number,
  status: 'APPROVED' | 'REJECTED'
): Promise<void> {
  const publishedAtClause = status === 'APPROVED' ? 'NOW()' : 'NULL';
  await pool.query(
    `UPDATE publishing_records
     SET approval_status = $1,
         published_at = ${publishedAtClause}
     WHERE id = $2;`,
    [status, recordId]
  );
}

export async function getLastCheckpoint(
  repoName: string
): Promise<{ hash: string; date: Date } | null> {
  const res = await pool.query(
    `SELECT last_commit_hash, last_commit_date 
     FROM checkpoints 
     WHERE repo_name = $1;`,
    [repoName]
  );
  if (res.rows.length === 0) return null;
  return {
    hash: res.rows[0].last_commit_hash,
    date: new Date(res.rows[0].last_commit_date),
  };
}

export async function saveCheckpoint(
  repoName: string,
  repoPath: string,
  hash: string,
  date: Date
): Promise<void> {
  await pool.query(
    `INSERT INTO checkpoints (repo_name, repo_path, last_commit_hash, last_commit_date, updated_at)
     VALUES ($1, $2, $3, $4, NOW())
     ON CONFLICT (repo_name) 
     DO UPDATE SET 
       last_commit_hash = EXCLUDED.last_commit_hash,
       last_commit_date = EXCLUDED.last_commit_date,
       updated_at = NOW();`,
    [repoName, repoPath, hash, date.toISOString()]
  );
}

export async function isEntryDuplicate(
  dayNumber: number,
  date: string,
  slug: string
): Promise<{ duplicate: boolean; reason?: string }> {
  const res = await pool.query(
    `SELECT id, day_number, entry_date, slug, approval_status 
     FROM publishing_records 
     WHERE (day_number = $1 OR entry_date = $2 OR slug = $3)
       AND approval_status = 'APPROVED';`,
    [dayNumber, date, slug]
  );
  if (res.rows.length > 0) {
    const row = res.rows[0];
    return {
      duplicate: true,
      reason: `Record already approved with id=${row.id}, Day ${row.day_number}, date=${row.entry_date}, slug=${row.slug}`,
    };
  }
  return { duplicate: false };
}
