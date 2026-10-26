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
      repositoryName: 'abhishek-engineering-labs',
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
        },
      ],
      latestCommitHash: 'fb8450ea8544f865bffd7898e0adbec6eafc4db5',
      latestCommitDate: new Date('2026-10-25T20:45:03Z'),
      dayFolder: 'backend/day-21-validation-errors',
      executableFiles: [
        {
          repository: 'abhishek-engineering-labs',
          filePath: 'backend/day-21-validation-errors/server.js',
          category: 'executable_implementation',
          content: 'const apiValidation = z.object({ name: z.string().min(5), email: z.string().email(), role: z.enum(["user", "admin"]) });',
          relevantSections: [
            {
              title: 'Zod DTO Validation Schema',
              snippet: 'const apiValidation = z.object({ name: z.string().min(5), email: z.string().email(), role: z.enum(["user", "admin"]) });',
            },
            {
              title: 'Route Handler POST /users',
              snippet: 'app.post("/users", (req, res, next) => { const result = apiValidation.safeParse(req.body); if(!result.success) return res.status(400).json({ success:false, error: result.error.format() }); if(role === "admin") return res.status(403).json({ error: "Unauthorized" }); if(users.find(u => u.email === email)) return res.status(422).json({ error: "user exists" }); users.push({name, email, role}); return res.status(201).json({ success:true }); });',
            },
          ],
        },
      ],
      schemaFiles: [],
      documentationFiles: [
        {
          repository: 'abhishek-engineering-labs',
          filePath: 'backend/day-21-validation-errors/README.md',
          category: 'documentation',
          content: '# DAY 21 validations and errors\nRules:\n- failfast\n- all inputs unsafe\n## Test Cases\n### For 400 bad request Name\nstatus: 400 Bad Request',
          relevantSections: [
            {
              title: 'Validation Rules',
              snippet: 'Rules of Validation:\n- failfast\n- all inputs are unsafe',
            },
            {
              title: 'Documented Test Cases',
              snippet: '400 Bad Request for missing name and email\n403 Forbidden for admin role\n422 Unprocessable for duplicate user',
            },
          ],
        },
      ],
      dependenciesUsed: ['express', 'cors', 'zod'],
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
    expect(output.auditReport.distinctionAnalysis).toBeDefined();
    expect(output.auditReport.distinctionAnalysis.length).toBeGreaterThan(10);
  }, 120000); // 120s timeout for local Ollama inference
});
