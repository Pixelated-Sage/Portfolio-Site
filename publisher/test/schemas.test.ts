import { describe, it, expect } from 'vitest';
import {
  EngineeringEntrySchema,
  ActivityRecordSchema,
  FormattedDailyNoteSchema,
  AuditReportSchema,
} from '../src/schemas.js';

describe('Zod Schema Validation Tests', () => {
  it('should validate a correct EngineeringEntry', () => {
    const validEntry = {
      id: 'day-21',
      slug: 'day-21-validation-errors',
      dayNumber: 21,
      date: '2026-10-25',
      title: 'Day 21: Multi-Layer Validation & Error Handling',
      topic: 'Backend Architecture',
      status: 'completed',
      summary: 'Implemented a 4-tier validation strategy across API/DTO, Controller, Domain and Database layers.',
      keyTakeaway: 'Failing fast at the DTO layer with schema parsers prevents invalid types from reaching business logic.',
      details: [
        'Layer 1 (API/DTO): Used Zod schema safeParse to reject syntactically malformed bodies with HTTP 400.',
        'Layer 2 (Controller): Checked administrative authority context before creating privileged users with HTTP 403.',
      ],
      codeSnippet: {
        language: 'javascript',
        code: 'const result = apiValidation.safeParse(req.body);',
        caption: 'DTO layer validation using Zod',
      },
      evidenceCommit: {
        hash: 'fb8450e',
        date: '2026-10-25',
        message: 'validation done',
        url: 'https://github.com/Pixelated-Sage/abhishek-engineering-labs/commit/fb8450e',
      },
      repoPath: 'backend/day-21-validation-errors',
    };

    const result = EngineeringEntrySchema.safeParse(validEntry);
    expect(result.success).toBe(true);
  });

  it('should reject entry with invalid topic', () => {
    const invalidEntry = {
      id: 'day-21',
      slug: 'day-21-validation-errors',
      dayNumber: 21,
      date: '2026-10-25',
      title: 'Day 21: Test',
      topic: 'NonExistentTopic',
      status: 'completed',
      summary: 'Short summary here for testing validation.',
      keyTakeaway: 'Takeaway must be sufficiently long.',
      details: ['detail 1', 'detail 2'],
      repoPath: 'backend/day-21',
    };

    const result = EngineeringEntrySchema.safeParse(invalidEntry);
    expect(result.success).toBe(false);
  });

  it('should reject entry with malformed date format', () => {
    const invalidEntry = {
      id: 'day-21',
      slug: 'day-21-test',
      dayNumber: 21,
      date: '25/10/2026', // wrong format
      title: 'Day 21: Test',
      topic: 'Backend Architecture',
      status: 'completed',
      summary: 'Summary string here for testing date validation.',
      keyTakeaway: 'Takeaway string here.',
      details: ['detail 1', 'detail 2'],
      repoPath: 'backend/day-21',
    };

    const result = EngineeringEntrySchema.safeParse(invalidEntry);
    expect(result.success).toBe(false);
  });

  it('should validate FormattedDailyNoteSchema', () => {
    const validNote = {
      dayNumber: 21,
      date: '2026-10-25',
      title: 'Day 21: Multi-Layer Validation',
      topic: 'Backend Architecture',
      keyLearnings: ['Fail fast', 'Sanitize inputs'],
      strugglesAndFixes: ['Missing return statements caused header errors'],
      formattedMarkdown: '# Day 21 Notes\n\nDaily summary and learnings.',
    };

    const result = FormattedDailyNoteSchema.safeParse(validNote);
    expect(result.success).toBe(true);
  });

  it('should validate AuditReportSchema with evidenceByFile and distinctionAnalysis', () => {
    const validAudit = {
      evidenceByFile: [
        {
          repository: 'abhishek-engineering-labs',
          filePath: 'backend/day-21-validation-errors/server.js',
          category: 'executable_implementation',
          verifiedCapabilities: ['Zod schema validation on DTO inputs returning HTTP 400'],
          relevantCodeSnippet: 'const result = apiValidation.safeParse(req.body);',
        },
        {
          repository: 'abhishek-engineering-labs',
          filePath: 'backend/day-21-validation-errors/README.md',
          category: 'documentation',
          verifiedCapabilities: ['Documented HTTP test cases for status codes 400, 403, 422, 500'],
        },
      ],
      distinctionAnalysis:
        'Executable code in server.js demonstrates 4-tier validation with Zod and Express middleware; README documentation and personal note provide test cases and developer experience.',
      verifiedClaims: ['Claim 1 verified in server.js'],
      flaggedUnsupportedClaims: [],
      recommendation: 'PASS',
      explanation: 'All claims match evidence.',
    };

    const result = AuditReportSchema.safeParse(validAudit);
    expect(result.success).toBe(true);
  });
});
