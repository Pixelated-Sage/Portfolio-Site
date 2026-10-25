import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import fs from 'fs';
import path from 'path';
import os from 'os';
import { updateEngineeringLogFile, updateActivityLogFile } from '../src/updater.js';
import type { EngineeringEntry, ActivityRecord } from '../src/schemas.js';

describe('Updater Tests', () => {
  let tmpDir: string;
  let tmpLogPath: string;
  let tmpActivityPath: string;

  beforeEach(() => {
    tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'portfolio-test-'));
    tmpLogPath = path.join(tmpDir, 'engineeringLog.ts');
    tmpActivityPath = path.join(tmpDir, 'activityLog.ts');

    fs.writeFileSync(
      tmpLogPath,
      `export interface EngineeringEntry { id: string; }
export const engineeringLogData: EngineeringEntry[] = [
  {
    id: "day-20",
    slug: "day-20-test",
    dayNumber: 20
  }
];`
    );

    fs.writeFileSync(
      tmpActivityPath,
      `export const activityRecords: ActivityRecord[] = [
  {
    date: "2026-10-23",
    title: "Day 20"
  }
];
export const recentMilestones = [
  {
    date: "Oct 23, 2026",
    title: "Milestone 20"
  }
];`
    );
  });

  afterEach(() => {
    fs.rmSync(tmpDir, { recursive: true, force: true });
  });

  it('should safely prepend a new engineering entry', () => {
    const newEntry: EngineeringEntry = {
      id: 'day-21',
      slug: 'day-21-validation',
      dayNumber: 21,
      date: '2026-10-25',
      title: 'Day 21: Validation',
      topic: 'Backend Architecture',
      status: 'completed',
      summary: 'Testing summary statement here for updater.',
      keyTakeaway: 'Key takeaway statement for updater.',
      details: ['detail 1', 'detail 2'],
      repoPath: 'backend/day-21',
    };

    updateEngineeringLogFile(tmpLogPath, newEntry);
    const content = fs.readFileSync(tmpLogPath, 'utf-8');

    expect(content).toContain('"day-21"');
    expect(content.indexOf('"day-21"')).toBeLessThan(content.indexOf('"day-20"'));
  });

  it('should throw an error if entry ID already exists (duplicate prevention)', () => {
    const dupEntry: EngineeringEntry = {
      id: 'day-20',
      slug: 'day-20-different-slug',
      dayNumber: 20,
      date: '2026-10-23',
      title: 'Day 20 duplicate',
      topic: 'Backend Architecture',
      status: 'completed',
      summary: 'Testing summary duplicate.',
      keyTakeaway: 'Key takeaway duplicate.',
      details: ['detail 1', 'detail 2'],
      repoPath: 'backend/day-20',
    };

    expect(() => updateEngineeringLogFile(tmpLogPath, dupEntry)).toThrow(
      /already exists/
    );
  });

  it('should safely prepend an activity record and milestone', () => {
    const record: ActivityRecord = {
      date: '2026-10-25',
      title: 'Day 21 Validation',
      topic: 'Backend Architecture',
      commitHash: 'fb8450e',
      status: 'verified',
      summary: 'Verified 4-tier validation with Zod schemas in Express.',
    };

    updateActivityLogFile(tmpActivityPath, record);
    const content = fs.readFileSync(tmpActivityPath, 'utf-8');

    expect(content).toContain('"2026-10-25"');
    expect(content).toContain('Day 21 Validation');
  });
});
