import { callOllama } from './ollamaClient.js';
import type { LabEvidence } from './gitEvidence.js';
import {
  EngineeringEntrySchema,
  ActivityRecordSchema,
  FormattedDailyNoteSchema,
  AuditReportSchema,
  type EngineeringEntry,
  type ActivityRecord,
  type FormattedDailyNote,
  type AuditReport,
} from './schemas.js';

export interface PipelineOutput {
  entry: EngineeringEntry;
  activityRecord: ActivityRecord;
  formattedNote: FormattedDailyNote;
  auditReport: AuditReport;
  rawClaims: string[];
}

export async function runPublishingPipeline(params: {
  rawDailyNote: string;
  evidence: LabEvidence;
  currentDayNumber?: number;
  entryDate?: string;
}): Promise<PipelineOutput> {
  const { rawDailyNote, evidence, currentDayNumber = 21, entryDate = new Date().toISOString().split('T')[0] } = params;

  // Prepare evidence context
  const commitsContext = evidence.commits
    .map(
      (c) =>
        `- Commit ${c.shortHash} (${c.date}): ${c.message}\n  Changed: ${c.changedFiles.join(', ')}`
    )
    .join('\n');

  const snippetContext = evidence.commits
    .flatMap((c) => c.keySnippets)
    .slice(0, 3)
    .map((s) => `### File: ${s.filename}\n\`\`\`\n${s.snippet}\n\`\`\``)
    .join('\n\n');

  const readmeContext = evidence.dayReadmeContent
    ? evidence.dayReadmeContent.slice(0, 2000)
    : 'No README found in changed folder.';

  // STAGE 1: Extract Factual Claims
  const stage1Prompt = `You are an evidence extraction assistant.
Extract only factual claims from the author's daily note and the Git commit evidence.
Do not invent or exaggerate claims. Retain source references (Note or Commit).

[DAILY NOTE]
${rawDailyNote}

[COMMITS EVIDENCE]
${commitsContext}

[CODE SNIPPETS]
${snippetContext}

Output JSON format:
{
  "claims": [
    "Implemented 4 layers of validation in Express using Zod (Source: Note & server.js)",
    "Added HTTP 400 Bad Request error response for missing fields (Source: Note & Commit fb8450e)"
  ]
}`;

  const stage1Response = await callOllama(
    [
      { role: 'system', content: 'You extract verified factual claims strictly in JSON.' },
      { role: 'user', content: stage1Prompt },
    ],
    true
  );

  let rawClaims: string[] = [];
  try {
    const parsed = JSON.parse(stage1Response);
    rawClaims = Array.isArray(parsed.claims) ? parsed.claims : [];
  } catch {
    rawClaims = ['Extracted general engineering implementation claims.'];
  }

  // STAGE 2: Generate Entry and Formatted Daily Note
  const latestCommit = evidence.commits[0];
  const stage2Prompt = `You are a technical editorial assistant for a software engineer's portfolio.
Generate an Engineering Log entry and a clean Formatted Daily Note based strictly on the factual claims and Git evidence.

Rules:
1. ID must be "day-${currentDayNumber}".
2. Slug must be lowercase alphanumeric with hyphens (e.g. "day-${currentDayNumber}-validation-errors").
3. Day number is ${currentDayNumber}.
4. Date is "${entryDate}".
5. Topic MUST be one of: "PostgreSQL & SQL", "Transactions & Integrity", "Backend Architecture", "Concurrency & Locking", "HTTP & Node.js", "Database Design".
6. Status is "completed".
7. Genuine mental models and real code takeaways only. No buzzwords.
8. Include a code snippet from the evidence if relevant.

[CLAIMS]
${JSON.stringify(rawClaims, null, 2)}

[README EXCERPT]
${readmeContext}

[LATEST COMMIT]
Hash: ${latestCommit?.hash || 'unknown'}
ShortHash: ${latestCommit?.shortHash || 'unknown'}
Message: ${latestCommit?.message || 'unknown'}
RepoPath: ${evidence.dayFolder || 'backend/'}

Output JSON format:
{
  "entry": {
    "id": "day-${currentDayNumber}",
    "slug": "day-${currentDayNumber}-validation-errors",
    "dayNumber": ${currentDayNumber},
    "date": "${entryDate}",
    "title": "Day ${currentDayNumber}: Multi-Layer Validation & Error Handling",
    "topic": "Backend Architecture",
    "status": "completed",
    "summary": "Implemented a 4-tier validation strategy across API/DTO, Controller, Domain and Database layers using Zod in Express.",
    "keyTakeaway": "Failing fast at the DTO layer with schema parsers prevents invalid or malicious types from reaching business logic and database queries.",
    "details": [
      "Layer 1 (API/DTO): Used Zod schema safeParse to reject syntactically malformed bodies with HTTP 400.",
      "Layer 2 (Controller): Checked administrative authority context before creating privileged users with HTTP 403.",
      "Layer 3 (Domain): Validated entity uniqueness in business memory before creating records with HTTP 422.",
      "Layer 4 (Database): Relied on database constraints as the ultimate failsafe for storage integrity."
    ],
    "codeSnippet": {
      "language": "javascript",
      "caption": "DTO layer validation using Zod safeParse in Express",
      "code": "const result = apiValidation.safeParse(req.body);\\nif (!result.success) {\\n  return res.status(400).json({\\n    success: false,\\n    Message: 'Your input values are wrong',\\n    error: result.error.format()\\n  });\\n}"
    },
    "evidenceCommit": {
      "hash": "${latestCommit?.shortHash || 'fb8450e'}",
      "date": "${entryDate}",
      "message": "${latestCommit?.message || 'validation done'}",
      "url": "https://github.com/Pixelated-Sage/abhishek-engineering-labs/commit/${latestCommit?.hash || 'fb8450e'}"
    },
    "repoPath": "${evidence.dayFolder || 'backend/day-21-validation-errors'}"
  },
  "activityRecord": {
    "date": "${entryDate}",
    "title": "Multi-Layer Validation & Zod Schema Defense",
    "topic": "Backend Architecture",
    "commitHash": "${latestCommit?.shortHash || 'fb8450e'}",
    "commitMessage": "${latestCommit?.message || 'validation done'}",
    "commitUrl": "https://github.com/Pixelated-Sage/abhishek-engineering-labs/commit/${latestCommit?.hash || 'fb8450e'}",
    "exercisePath": "${evidence.dayFolder || 'backend/day-21-validation-errors'}",
    "status": "verified",
    "summary": "Implemented 4-layer validation strategy in Express using Zod schemas and verified failure codes."
  },
  "formattedNote": {
    "dayNumber": ${currentDayNumber},
    "date": "${entryDate}",
    "title": "Day ${currentDayNumber}: Multi-Tier Validation & Error Handling",
    "topic": "Backend Architecture",
    "keyLearnings": [
      "Fail fast: validate structure and types before triggering business transactions.",
      "Never trust client payloads; always sanitize strings and validate data formats.",
      "Clean error formatting helps clients understand validation violations without exposing stack traces."
    ],
    "strugglesAndFixes": [
      "Missing return statements after sending error responses caused Express headers errors.",
      "Handled undefined inputs by adding required error messages to Zod schema."
    ],
    "formattedMarkdown": "# Day ${currentDayNumber} Notes\\n\\nImplemented multi-layer validation with Zod and clean error status codes."
  }
}`;

  const stage2Response = await callOllama(
    [
      { role: 'system', content: 'You produce strictly valid JSON matching the exact schema requested.' },
      { role: 'user', content: stage2Prompt },
    ],
    true
  );

  const parsedStage2 = JSON.parse(stage2Response);

  // STAGE 3: Audit Claims Against Evidence
  const stage3Prompt = `You are a strict code evidence auditor.
Compare the proposed engineering log entry against the actual Git commits and source code snippets.
Check if every technical claim is substantiated by the evidence.
Flag any claim that is exaggerated, unverified, or missing in the code.

[PROPOSED ENTRY]
${JSON.stringify(parsedStage2.entry, null, 2)}

[COMMITS AND SNIPPETS]
${commitsContext}
${snippetContext}

Output JSON format:
{
  "verifiedClaims": [
    "Express server implements Zod schema validation",
    "400 Bad Request returned on schema failures"
  ],
  "flaggedUnsupportedClaims": [],
  "recommendation": "PASS",
  "explanation": "All technical claims are verified in server.js and the commit history."
}`;

  const stage3Response = await callOllama(
    [
      { role: 'system', content: 'You audit technical claims against code evidence strictly in JSON.' },
      { role: 'user', content: stage3Prompt },
    ],
    true
  );

  const parsedAudit = JSON.parse(stage3Response);

  // Normalize recommendation to strict PASS | WARN | FAIL enum
  if (typeof parsedAudit.recommendation === 'string') {
    const rec = parsedAudit.recommendation.toUpperCase();
    if (rec.includes('PASS')) parsedAudit.recommendation = 'PASS';
    else if (rec.includes('FAIL')) parsedAudit.recommendation = 'FAIL';
    else parsedAudit.recommendation = 'WARN';
  } else {
    parsedAudit.recommendation = 'WARN';
  }

  // Ensure arrays exist
  if (!Array.isArray(parsedAudit.verifiedClaims)) parsedAudit.verifiedClaims = [];
  if (!Array.isArray(parsedAudit.flaggedUnsupportedClaims)) parsedAudit.flaggedUnsupportedClaims = [];
  if (!parsedAudit.explanation) parsedAudit.explanation = 'Claims audited against repository evidence.';

  // STAGE 4: Zod Schema Validation
  const validatedEntry = EngineeringEntrySchema.parse(parsedStage2.entry);
  const validatedActivity = ActivityRecordSchema.parse(parsedStage2.activityRecord);
  const validatedNote = FormattedDailyNoteSchema.parse(parsedStage2.formattedNote);
  const validatedAudit = AuditReportSchema.parse(parsedAudit);

  return {
    entry: validatedEntry,
    activityRecord: validatedActivity,
    formattedNote: validatedNote,
    auditReport: validatedAudit,
    rawClaims,
  };
}
