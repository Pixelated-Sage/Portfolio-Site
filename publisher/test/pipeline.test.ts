import { describe, it, expect } from 'vitest';
import { runPublishingPipeline } from '../src/pipeline.js';
import type { LabEvidence } from '../src/gitEvidence.js';

describe('Publishing Pipeline Integration Test', () => {
  it('should process daily note and evidence through the 4-stage Ollama pipeline', async () => {
    const rawNote = `Implemented 4 layers of validation in Express using Zod:
1. API / DTO layer with Zod safeParse returning 400
2. Controller layer checking admin role returning 403
3. Service layer checking user existence returning 422
4. Database layer constraints as failsafe.`;

    const mockEvidence: LabEvidence = {
      commits: [
        {
          hash: 'fb8450ea8544f865bffd7898e0adbec6eafc4db5',
          shortHash: 'fb8450e',
          date: '2026-10-25',
          dateTime: new Date('2026-10-25T20:45:03Z'),
          author: 'Pixelated-Sage',
          message: 'validation done , totally loved and enjoyed it (next station automated api testing)',
          changedFiles: [
            'backend/day-21-validation-errors/README.md',
            'backend/day-21-validation-errors/server.js',
          ],
          diffSummary: '2 files changed, 362 insertions(+), 15 deletions(-)',
          keySnippets: [
            {
              filename: 'backend/day-21-validation-errors/server.js',
              snippet: 'const apiValidation = z.object({ name: z.string(), email: z.string().email() });',
            },
          ],
        },
      ],
      latestCommitHash: 'fb8450ea8544f865bffd7898e0adbec6eafc4db5',
      latestCommitDate: new Date('2026-10-25T20:45:03Z'),
      dayFolder: 'backend/day-21-validation-errors',
      dayReadmeContent: '# DAY 21 validations and errors\nRules of Validation:\n- failfast\n- all inputs are unsafe',
    };

    const output = await runPublishingPipeline({
      rawDailyNote: rawNote,
      evidence: mockEvidence,
      currentDayNumber: 21,
      entryDate: '2026-10-25',
    });

    expect(output.entry.id).toBe('day-21');
    expect(output.entry.dayNumber).toBe(21);
    expect(output.entry.date).toBe('2026-10-25');
    expect(output.entry.topic).toBeDefined();
    expect(output.entry.summary.length).toBeGreaterThan(15);
    expect(output.activityRecord.status).toBe('verified');
    expect(output.formattedNote.dayNumber).toBe(21);
    expect(output.auditReport.recommendation).toBeDefined();
  }, 45000); // 45s timeout for local Ollama inference
});
