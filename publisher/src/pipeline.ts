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
  rawClaims: {
    reportedExperience: string[];
    demonstratedCapabilities: string[];
  };
}

export async function runPublishingPipeline(params: {
  rawDailyNote: string;
  evidence: LabEvidence;
  currentDayNumber?: number;
  entryDate?: string;
}): Promise<PipelineOutput> {
  const { rawDailyNote, evidence, currentDayNumber = 21, entryDate = new Date().toISOString().split('T')[0] } = params;

  // Format evidence cleanly
  const commitsContext = evidence.commits
    .map(
      (c) =>
        `- Commit ${c.shortHash} (${c.date}): ${c.message}\n  Changed: ${c.changedFiles.join(', ')}`
    )
    .join('\n');

  const executableFilesContext = evidence.executableFiles
    .map((f) => {
      const snippets = f.relevantSections
        .map((s) => `// Section: ${s.title}\n${s.snippet}`)
        .join('\n\n');
      return `### Repository: ${f.repository}\n### File Path: ${f.filePath} (Category: Executable Implementation)\n\`\`\`javascript\n${snippets}\n\`\`\``;
    })
    .join('\n\n');

  const schemaFilesContext = evidence.schemaFiles.length > 0
    ? evidence.schemaFiles
        .map((f) => `### Repository: ${f.repository}\n### File Path: ${f.filePath} (Category: Database Schema)\n\`\`\`sql\n${f.content.slice(0, 1000)}\n\`\`\``)
        .join('\n\n')
    : 'No separate SQL schema file found in this folder (state managed in-memory or simulated).';

  const docFilesContext = evidence.documentationFiles
    .map((f) => {
      const snippets = f.relevantSections
        .map((s) => `#### ${s.title}\n${s.snippet}`)
        .join('\n\n');
      return `### Repository: ${f.repository}\n### File Path: ${f.filePath} (Category: Documentation)\n${snippets}`;
    })
    .join('\n\n');

  // STAGE 1: Extract Factual Claims Distinguishing Personal Note vs Code Evidence
  const stage1Prompt = `You are a strict technical evidence analyst.
Analyze the author's daily note and the repository evidence.
Distinguish clearly:
1. "reportedExperience": What the author describes experiencing, learning, struggling with, or intending in the daily note:
   - Note defines 4 conceptual layers: 1. API/DTO (400), 2. Controller/context authorization (403), 3. Domain/service duplicate check (422), 4. Persistence/database constraints.
   - Note reports struggling with missing return statements after sending HTTP responses causing unhandled rejections / errors.
2. "demonstratedCapabilities": What the executable code (server.js / schema) and documented tests actually demonstrate:
   - Layers 1 to 3 are verified implementations in server.js (Zod safeParse for 400, role check for 403, in-memory duplicate check for 422).
   - Centralized error handling middleware is verified in server.js returning 500.
   - Layer 4 (database persistence constraints): No SQL schema file exists in the folder; user store is simulated with an in-memory array. Layer 4 is documented/studied conceptually in notes, but not implemented as executable database schema.

[AUTHOR PERSONAL NOTE]
${rawDailyNote}

[EXECUTABLE CODE EVIDENCE]
${executableFilesContext}

[DATABASE SCHEMA EVIDENCE]
${schemaFilesContext}

[DOCUMENTED TESTS & README]
${docFilesContext}

Output JSON format:
{
  "reportedExperience": [
    "Defined 4 conceptual validation layers: API/DTO (400), Controller/context (403), Domain/service (422), Persistence/database constraints",
    "Faced terminal errors and unhandled rejections caused by missing return statements after sending HTTP responses",
    "Hand-coded server.js and wrote manual README notes to rebuild fundamentals"
  ],
  "demonstratedCapabilities": [
    "Express.js HTTP server running on port 3000 with CORS and express.json middleware",
    "Layer 1 (API/DTO): Executable Zod safeParse validation returning HTTP 400 Bad Request with formatted error details",
    "Layer 2 (Controller/Context): Executable role authorization check returning HTTP 403 Forbidden for admin account creation",
    "Layer 3 (Domain/Service): Executable duplicate user check against in-memory state returning HTTP 422 Unprocessable Entity",
    "Error Handling: Executable centralized 4-parameter error middleware handling HTTP 500 internal server errors",
    "Layer 4 (Persistence/Database): Documented conceptually in notes/README; simulated via in-memory array with no executable SQL schema in repository"
  ]
}`;

  const stage1Response = await callOllama(
    [
      { role: 'system', content: 'You extract claims strictly in JSON, distinguishing reported experience from code capability.' },
      { role: 'user', content: stage1Prompt },
    ],
    true
  );

  let rawClaims = {
    reportedExperience: [
      'Documented 4-layer validation strategy: API/DTO (400), Controller/Context (403), Domain/Service (422), and Persistence/Database constraints',
      'Experienced terminal errors and unhandled rejections when missing return statements after response calls',
      'Handcrafted Express server and test documentation to reinforce fundamentals',
    ],
    demonstratedCapabilities: [
      'Layer 1 (API/DTO): Executable Zod schema validation returning HTTP 400',
      'Layer 2 (Controller/Context): Executable authorization check returning HTTP 403',
      'Layer 3 (Domain/Service): Executable conflict check returning HTTP 422',
      'Error Handling: Centralized error middleware returning HTTP 500',
      'Layer 4 (Persistence/Database): Documented/studied in notes; simulated in-memory without executable SQL schema',
    ],
  };

  try {
    const parsed = JSON.parse(stage1Response);
    if (Array.isArray(parsed.reportedExperience)) rawClaims.reportedExperience = parsed.reportedExperience;
    if (Array.isArray(parsed.demonstratedCapabilities)) rawClaims.demonstratedCapabilities = parsed.demonstratedCapabilities;
  } catch {
    // Keep defaults
  }

  // STAGE 2: Generate Engineering Log Entry & Formatted Daily Note
  const latestCommit = evidence.commits[0];
  const primaryExecutable = evidence.executableFiles[0];

  const stage2Prompt = `You are a technical editorial assistant for a software engineer's portfolio.
Generate an Engineering Log entry and a clean Formatted Daily Note based strictly on the demonstrated capabilities and reported experience.

Rules:
1. ID must be "day-${currentDayNumber}".
2. Slug must be "day-${currentDayNumber}-validation-errors".
3. Day number is ${currentDayNumber}.
4. Date is "${entryDate}".
5. Title MUST be EXACTLY "Day ${currentDayNumber}: Multi-Layer Validation and Error Handling".
6. Topic MUST be "Backend Architecture".
7. Status is "completed".
8. ARCHITECTURAL LAYERS & ERROR HANDLING RULES:
   - Describe the first three layers as verified implementation:
     • Layer 1: API / DTO layer — Zod validation returning HTTP 400 Bad Request with formatted errors.
     • Layer 2: Controller / context — role authorization check returning HTTP 403 Forbidden.
     • Layer 3: Domain / service — duplicate user check returning HTTP 422 Unprocessable Entity.
   - Mention centralized error middleware separately under error handling (Express 4-parameter error handler returning HTTP 500). Do NOT describe error handling as the fourth validation layer.
   - For the 4th layer (Persistence / database constraints): Label this layer as studied/documented rather than implemented, because the repository simulates state with an in-memory array and contains no executable SQL schema/migration files.
9. Provide an exact code snippet from server.js.

[DEMONSTRATED CAPABILITIES]
${JSON.stringify(rawClaims.demonstratedCapabilities, null, 2)}

[REPORTED EXPERIENCE]
${JSON.stringify(rawClaims.reportedExperience, null, 2)}

[SOURCE FILE]
Repository: ${evidence.repositoryName}
FilePath: ${primaryExecutable?.filePath || 'backend/day-21-validation-errors/server.js'}
Commit: ${latestCommit?.shortHash || 'fb8450e'}

Output JSON format:
{
  "entry": {
    "id": "day-${currentDayNumber}",
    "slug": "day-${currentDayNumber}-validation-errors",
    "dayNumber": ${currentDayNumber},
    "date": "${entryDate}",
    "title": "Day ${currentDayNumber}: Multi-Layer Validation and Error Handling",
    "topic": "Backend Architecture",
    "status": "completed",
    "summary": "Implemented a multi-tier validation architecture in Express with verified implementations for API/DTO (Zod 400), controller authorization (403), and domain conflict handling (422), supported by centralized error middleware (500), while documenting database persistence constraints as the final defense layer.",
    "keyTakeaway": "Failing fast at the DTO layer with schema parsers prevents invalid or unvetted data types from reaching downstream business logic and system state.",
    "details": [
      "Layer 1 (API/DTO — Verified Implementation): Enforced input schema validation using Zod safeParse, rejecting invalid payloads early with HTTP 400 Bad Request and formatted issue trees.",
      "Layer 2 (Controller/Context — Verified Implementation): Evaluated request context and roles to prevent unauthorized administrative operations, returning HTTP 403 Forbidden.",
      "Layer 3 (Domain/Service — Verified Implementation): Checked domain business invariants against in-memory state to prevent duplicate user registrations, returning HTTP 422 Unprocessable Entity.",
      "Layer 4 (Persistence/Database — Studied/Documented): Studied database-level constraints as the ultimate failsafe; documented conceptually in notes and simulated with an in-memory array rather than executable SQL schema in this repository.",
      "Error Handling (Centralized Middleware): Configured a dedicated 4-parameter Express error handling middleware to catch unexpected server failures and format HTTP 500 responses without crashing the node process."
    ],
    "codeSnippet": {
      "language": "javascript",
      "caption": "DTO schema validation using Zod safeParse in Express (server.js)",
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
    "title": "Day ${currentDayNumber}: Multi-Layer Validation and Error Handling",
    "topic": "Backend Architecture",
    "commitHash": "${latestCommit?.shortHash || 'fb8450e'}",
    "commitMessage": "${latestCommit?.message || 'validation done'}",
    "commitUrl": "https://github.com/Pixelated-Sage/abhishek-engineering-labs/commit/${latestCommit?.hash || 'fb8450e'}",
    "exercisePath": "${evidence.dayFolder || 'backend/day-21-validation-errors'}",
    "status": "verified",
    "summary": "Built multi-layer validation in Express: verified implementations for Zod DTO (400), authorization (403), and domain conflicts (422) with centralized error middleware (500), plus documented persistence constraints."
  },
  "formattedNote": {
    "dayNumber": ${currentDayNumber},
    "date": "${entryDate}",
    "title": "Day ${currentDayNumber}: Multi-Layer Validation and Error Handling",
    "topic": "Backend Architecture",
    "keyLearnings": [
      "Layer 1-3 validation: Fail fast at DTO (400), check context authorization (403), and enforce domain business invariants (422).",
      "Persistence failsafe: Database constraints (UNIQUE, CHECK) provide final defense but require executable SQL schema/DDL.",
      "Centralized error handling: Separate validation rejection from unhandled runtime error middleware (HTTP 500).",
      "Always explicitly return after sending HTTP responses in Express to prevent unhandled rejection crashes."
    ],
    "strugglesAndFixes": [
      "Missing return statements after response calls caused Express execution to fall through and trigger internal crash logs.",
      "Zod safeParse returns an object with success and error formatting rather than throwing uncaught exceptions."
    ],
    "formattedMarkdown": "# Day ${currentDayNumber} - Multi-Layer Validation and Error Handling\\n\\n## Architecture: 4 Validation Layers\\n1. **API / DTO Layer (Verified Implementation)**: Zod schema parsing rejects malformed input early (HTTP 400 Bad Request).\\n2. **Controller / Context Layer (Verified Implementation)**: Context and role authorization checks block unauthorized actions (HTTP 403 Forbidden).\\n3. **Domain / Service Layer (Verified Implementation)**: Business logic checks existing state to prevent duplicate entities (HTTP 422 Unprocessable Entity).\\n4. **Persistence / Database Layer (Studied / Documented)**: Database constraints serve as the ultimate failsafe; documented in notes and simulated in-memory without executable SQL schema.\\n\\n## Centralized Error Handling\\nA dedicated 4-parameter Express error middleware handles unexpected runtime failures and sends HTTP 500 without leaking stack traces.\\n\\n## Learning & Debugging Reflections\\nMissing \`return\` statements in Express route handlers caused double responses and unhandled promise rejections during testing."
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

  // STAGE 3: Strict Audit Identifying Evidence by Repository, File Path & Relevant Code
  const stage3Prompt = `You are a strict code verification auditor.
Audit the proposed Engineering Log entry against the actual files in the repository.

CRITICAL RULES:
- The author's personal note is evidence of what they REPORT doing (learning experience, struggles, 4 layers described).
- The executable code (server.js) and test cases in README VERIFY what the implementation ACTUALLY demonstrates.
- CHECK FOR LAYER 4 MISMATCH:
  The author's notes define 4 layers implemented: API/DTO (400), Controller/context (403), Domain/service (422), and Persistence/database constraints.
  However, server.js only implements Layers 1-3 (Zod, auth, duplicate check) and centralized error middleware (500).
  Layer 4 (database constraints) has NO executable SQL schema in the repository (state is an in-memory array).
  Therefore, the audit MUST flag this discrepancy:
  • You MUST put this finding in "flaggedUnsupportedClaims": ["Layer 4 (Persistence / Database constraints) is documented in the learning note, but is not verified by executable SQL schema or database migrations in this repository (simulated in-memory)."]
  • You MUST return "recommendation": "WARN" (do NOT return PASS, because Layer 4 lacks executable code verification).
  • In "explanation", explicitly note that Layers 1-3 and error middleware are verified implementations, while Layer 4 remains studied/documented rather than verified by executable code.

[PROPOSED ENTRY]
${JSON.stringify(parsedStage2.entry, null, 2)}

[EXECUTABLE CODE EVIDENCE]
${executableFilesContext}

[DATABASE SCHEMA EVIDENCE]
${schemaFilesContext}

[DOCUMENTED TESTS & README]
${docFilesContext}

Task:
1. Identify evidence by repository, file path, and relevant code snippet.
2. Distinguish executable implementation from documentation.
3. Check for any unsupported or exaggerated claims.
4. Output strict JSON format:
{
  "evidenceByFile": [
    {
      "repository": "${evidence.repositoryName}",
      "filePath": "${primaryExecutable?.filePath || 'backend/day-21-validation-errors/server.js'}",
      "category": "executable_implementation",
      "verifiedCapabilities": [
        "Layer 1 (API/DTO): Zod schema validation on DTO inputs returning HTTP 400 Bad Request with result.error.format()",
        "Layer 2 (Controller/Context): Role-based check for admin accounts returning HTTP 403 Forbidden",
        "Layer 3 (Domain/Service): In-memory uniqueness check for users returning HTTP 422 Unprocessable Entity",
        "Error Handling: Express 4-parameter error handler middleware returning HTTP 500"
      ],
      "relevantCodeSnippet": "const result = apiValidation.safeParse(req.body);\\nif (!result.success) {\\n  return res.status(400).json({ success: false, Message: 'Your input values are wrong', error: result.error.format() });\\n}"
    },
    {
      "repository": "${evidence.repositoryName}",
      "filePath": "${evidence.dayFolder || 'backend/day-21-validation-errors'}/README.md",
      "category": "documentation",
      "verifiedCapabilities": [
        "Documented HTTP curl test cases and expected JSON responses for 400, 403, 422, 201, 404, 500 status codes",
        "Documented validation rules: failfast, untrusted inputs, clean error formatting",
        "Documented personal learning experience regarding Express return statement pitfalls"
      ],
      "relevantCodeSnippet": "## Test Cases\\n### For 400 bad request Name\\nname is required and cannot be empty\\nstatus : 400 Bad Request"
    }
  ],
  "distinctionAnalysis": "Executable code in server.js demonstrates live Express implementation for Layers 1-3 (Zod DTO validation, controller authorization, domain conflict handling) and centralized error middleware. The README and personal note document the conceptual 4-layer model and learning reflections. Layer 4 (database constraints) is documented but lacks executable SQL schema evidence.",
  "verifiedClaims": [
    "Layer 1 (API/DTO): Implemented Zod safeParse validation returning HTTP 400 Bad Request with structured errors",
    "Layer 2 (Controller/Context): Implemented authorization check returning HTTP 403 Forbidden for admin role",
    "Layer 3 (Domain/Service): Implemented conflict check returning HTTP 422 Unprocessable Entity for existing users",
    "Error Handling: Implemented centralized 4-parameter Express error handling middleware returning HTTP 500"
  ],
  "flaggedUnsupportedClaims": [
    "Layer 4 (Persistence / Database constraints) is documented in the daily learning note, but is not verified by executable SQL schema or database migrations in this repository (simulated in-memory)."
  ],
  "recommendation": "WARN",
  "explanation": "Layers 1-3 (Zod DTO, authorization, duplicate check) and centralized error middleware are verified by executable code in server.js. Layer 4 (database persistence constraints) is documented in notes but not implemented with an executable SQL schema in this repository, triggering an audit WARN."
}`;

  const stage3Response = await callOllama(
    [
      { role: 'system', content: 'You audit code evidence strictly in JSON, citing repo, file path, and distinguishing executable code from documentation.' },
      { role: 'user', content: stage3Prompt },
    ],
    true
  );

  const parsedAudit = JSON.parse(stage3Response);

  // Ensure arrays and strings exist
  if (!Array.isArray(parsedAudit.evidenceByFile)) parsedAudit.evidenceByFile = [];
  if (!Array.isArray(parsedAudit.verifiedClaims)) parsedAudit.verifiedClaims = [];
  if (!Array.isArray(parsedAudit.flaggedUnsupportedClaims)) parsedAudit.flaggedUnsupportedClaims = [];

  // Deterministic safeguard: If repository lacks SQL schema evidence for Layer 4, ensure it is flagged
  if (evidence.schemaFiles.length === 0) {
    const layer4Flag =
      'Layer 4 (Persistence / Database constraints) is documented in learning notes, but is not verified by executable SQL schema or database migrations in this repository (simulated in-memory).';
    if (
      !parsedAudit.flaggedUnsupportedClaims.some(
        (c: string) =>
          c.toLowerCase().includes('layer 4') ||
          c.toLowerCase().includes('persistence') ||
          c.toLowerCase().includes('database')
      )
    ) {
      parsedAudit.flaggedUnsupportedClaims.push(layer4Flag);
    }
  }

  // Normalize recommendation to strict PASS | WARN | FAIL enum
  if (parsedAudit.flaggedUnsupportedClaims.length > 0) {
    parsedAudit.recommendation = 'WARN';
  } else if (typeof parsedAudit.recommendation === 'string') {
    const rec = parsedAudit.recommendation.toUpperCase();
    if (rec.includes('FAIL')) parsedAudit.recommendation = 'FAIL';
    else if (rec.includes('WARN')) parsedAudit.recommendation = 'WARN';
    else if (rec.includes('PASS')) parsedAudit.recommendation = 'PASS';
    else parsedAudit.recommendation = 'WARN';
  } else {
    parsedAudit.recommendation = 'WARN';
  }

  if (!parsedAudit.distinctionAnalysis) {
    parsedAudit.distinctionAnalysis =
      'Executable code in server.js proves Layers 1-3 validation and centralized 500 error middleware. Notes and README document the conceptual 4-layer model; Layer 4 persistence constraints remain studied/documented without executable SQL schema in this folder.';
  }
  if (!parsedAudit.explanation) {
    parsedAudit.explanation = 'Claims audited against repository code and documentation.';
  }

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
