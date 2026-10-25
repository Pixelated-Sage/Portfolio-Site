import { describe, it, expect } from 'vitest';
import { collectLabEvidence } from '../src/gitEvidence.js';
import { config } from '../src/config.js';

describe('Git Evidence Collector Tests', () => {
  it('should successfully inspect the configured engineering-lab repository', () => {
    const evidence = collectLabEvidence(config.labRepoPath);

    expect(evidence.commits.length).toBeGreaterThan(0);
    expect(evidence.latestCommitHash).toBeDefined();
    expect(evidence.latestCommitHash.length).toBe(40);
    expect(evidence.commits[0].shortHash.length).toBe(7);
  });

  it('should detect day folder in changed files', () => {
    const evidence = collectLabEvidence(config.labRepoPath);

    expect(evidence.dayFolder).toBeDefined();
    expect(evidence.dayFolder).toMatch(/backend|databases/);
  });
});
