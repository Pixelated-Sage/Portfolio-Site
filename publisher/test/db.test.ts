import { describe, it, expect, afterAll } from 'vitest';
import {
  pool,
  saveRawNote,
  saveFormattedNote,
  createPublishingRecord,
  updatePublishingApproval,
  isEntryDuplicate,
} from '../src/db.js';
import type { EngineeringEntry, AuditReport, FormattedDailyNote } from '../src/schemas.js';

describe('Database publishing records and duplicate handling', () => {
  const testSlug = 'day-test-unique-slug';
  let rawNoteId: number;
  let formattedNoteId: number;
  let recordId1: number;
  let recordId2: number;

  const mockEntry: EngineeringEntry = {
    id: 'day-999',
    slug: testSlug,
    dayNumber: 999,
    date: '2026-10-26',
    title: 'Test Entry',
    status: 'completed',
    topic: 'Backend Architecture',
    summary: 'Testing database idempotency and reruns for testing suite',
    keyTakeaway: 'Idempotency ensures safe reruns without duplicate constraint violations.',
    details: [
      'Detail 1: Testing database integration',
      'Detail 2: Verifying rejection status and rerun flexibility'
    ],
    repoPath: 'backend/day-999-test',
    evidenceCommit: {
      hash: 'abcdef1234567890abcdef1234567890abcdef12',
      date: '2026-10-26',
      message: 'test commit',
      url: 'https://github.com/Pixelated-Sage/abhishek-engineering-labs/commit/abcdef1',
    },
  };

  const mockAudit: AuditReport = {
    verifiedClaims: ['Claim 1'],
    flaggedUnsupportedClaims: [],
    evidenceByFile: [
      {
        repository: 'test-repo',
        filePath: 'test.ts',
        category: 'executable_implementation',
        verifiedCapabilities: ['Capability 1'],
        relevantCodeSnippet: 'const x = 1;',
      },
    ],
    distinctionAnalysis: 'Test distinction',
    recommendation: 'PASS',
    explanation: 'Audit passed cleanly.',
  };

  const mockFormattedNote: FormattedDailyNote = {
    dayNumber: 999,
    date: '2026-10-26',
    title: 'Test Formatted Note',
    topic: 'Backend Architecture',
    keyLearnings: ['Learned X'],
    strugglesAndFixes: ['Fixed issue with types'],
    formattedMarkdown: '# Test Note',
  };

  afterAll(async () => {
    // Clean up test data
    await pool.query('DELETE FROM publishing_records WHERE slug = $1', [testSlug]);
    if (formattedNoteId) {
      await pool.query('DELETE FROM formatted_notes WHERE id = $1', [formattedNoteId]);
    }
    if (rawNoteId) {
      await pool.query('DELETE FROM raw_notes WHERE id = $1', [rawNoteId]);
    }
    await pool.end();
  });

  it('should allow saving raw and formatted notes', async () => {
    const rawRes = await saveRawNote('Test raw daily note content');
    expect(rawRes.id).toBeGreaterThan(0);
    rawNoteId = rawRes.id;

    formattedNoteId = await saveFormattedNote(mockFormattedNote, rawNoteId);
    expect(formattedNoteId).toBeGreaterThan(0);
  });

  it('should allow creating a first draft, rejecting it, and creating a second draft with the same slug (rerun)', async () => {
    // First draft
    recordId1 = await createPublishingRecord({
      entry: mockEntry,
      rawNoteId,
      formattedNoteId,
      auditResults: mockAudit,
      evidenceSources: { test: true },
    });
    expect(recordId1).toBeGreaterThan(0);

    // Reject first draft
    await updatePublishingApproval(recordId1, 'REJECTED');

    // Duplicate check should report false for unapproved/rejected records
    const dupCheckBefore = await isEntryDuplicate(999, '2026-10-26', testSlug);
    expect(dupCheckBefore.duplicate).toBe(false);

    // Second draft (rerun after rejection) MUST succeed without unique key violation
    recordId2 = await createPublishingRecord({
      entry: mockEntry,
      rawNoteId,
      formattedNoteId,
      auditResults: mockAudit,
      evidenceSources: { test: true, attempt: 2 },
    });
    expect(recordId2).toBeGreaterThan(recordId1);
  });

  it('should prevent duplicate approval for the same slug', async () => {
    // Approve the second record
    await updatePublishingApproval(recordId2, 'APPROVED');

    // Duplicate check must now detect the approved entry
    const dupCheckAfter = await isEntryDuplicate(999, '2026-10-26', testSlug);
    expect(dupCheckAfter.duplicate).toBe(true);
    expect(dupCheckAfter.reason).toContain('Record already approved');

    // Attempting to approve recordId1 as well must be rejected by the database unique index
    await expect(updatePublishingApproval(recordId1, 'APPROVED')).rejects.toThrow();
  });
});
