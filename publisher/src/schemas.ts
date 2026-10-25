import { z } from 'zod';

export const TopicEnum = z.enum([
  'PostgreSQL & SQL',
  'Transactions & Integrity',
  'Backend Architecture',
  'Concurrency & Locking',
  'HTTP & Node.js',
  'Database Design',
]);

export const StatusEnum = z.enum(['completed', 'in-progress', 'experiment']);

export const CodeSnippetSchema = z.object({
  language: z.string().min(1),
  code: z.string().min(5),
  caption: z.string().min(3),
});

export const EvidenceCommitSchema = z.object({
  hash: z.string().min(7),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Date must be YYYY-MM-DD'),
  message: z.string().min(1),
  url: z.string().url(),
});

export const EngineeringEntrySchema = z.object({
  id: z.string().regex(/^day-\d+$/, 'ID must follow day-N pattern'),
  slug: z.string().regex(/^[a-z0-9-]+$/, 'Slug must be lowercase alphanumeric with hyphens'),
  dayNumber: z.number().int().positive(),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Date must be YYYY-MM-DD'),
  title: z.string().min(5),
  topic: TopicEnum,
  status: StatusEnum,
  summary: z.string().min(15),
  keyTakeaway: z.string().min(10),
  details: z.array(z.string().min(5)).min(2),
  codeSnippet: CodeSnippetSchema.optional(),
  evidenceCommit: EvidenceCommitSchema.optional(),
  repoPath: z.string().min(3),
  featuredOnHome: z.boolean().optional(),
});

export type EngineeringEntry = z.infer<typeof EngineeringEntrySchema>;

export const ActivityRecordSchema = z.object({
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Date must be YYYY-MM-DD'),
  title: z.string().min(3),
  topic: z.string().min(3),
  commitHash: z.string().optional(),
  commitMessage: z.string().optional(),
  commitUrl: z.string().url().optional(),
  exercisePath: z.string().optional(),
  status: z.literal('verified'),
  summary: z.string().min(10),
});

export type ActivityRecord = z.infer<typeof ActivityRecordSchema>;

export const FormattedDailyNoteSchema = z.object({
  dayNumber: z.number().int().positive(),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Date must be YYYY-MM-DD'),
  title: z.string().min(5),
  topic: z.string().min(3),
  keyLearnings: z.array(z.string().min(3)).min(1),
  strugglesAndFixes: z.array(z.string().min(3)).default([]),
  formattedMarkdown: z.string().min(20),
});

export type FormattedDailyNote = z.infer<typeof FormattedDailyNoteSchema>;

export const AuditReportSchema = z.object({
  verifiedClaims: z.array(z.string()),
  flaggedUnsupportedClaims: z.array(z.string()),
  recommendation: z.enum(['PASS', 'WARN', 'FAIL']),
  explanation: z.string(),
});

export type AuditReport = z.infer<typeof AuditReportSchema>;
