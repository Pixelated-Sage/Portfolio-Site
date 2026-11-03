import { execSync } from 'child_process';
import path from 'path';
import fs from 'fs';

export interface InspectedFileEvidence {
  repository: string;
  filePath: string;
  category: 'executable_implementation' | 'database_schema' | 'documentation';
  content: string;
  relevantSections: { title: string; snippet: string }[];
}

export interface CommitEvidence {
  hash: string;
  shortHash: string;
  date: string; // YYYY-MM-DD
  dateTime: Date;
  author: string;
  message: string;
  changedFiles: string[];
  diffSummary: string;
}

export interface LabEvidence {
  repositoryName: string;
  commits: CommitEvidence[];
  latestCommitHash: string;
  latestCommitDate: Date;
  dayFolder?: string;
  executableFiles: InspectedFileEvidence[];
  schemaFiles: InspectedFileEvidence[];
  documentationFiles: InspectedFileEvidence[];
  dependenciesUsed: string[];
  testExecutionSummary?: string;
}

function getFilesRecursively(dir: string, baseDir: string = dir): string[] {
  let results: string[] = [];
  if (!fs.existsSync(dir)) return results;
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    if (entry.name === 'node_modules' || entry.name === '.git' || entry.name === 'dist') continue;
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      results = results.concat(getFilesRecursively(fullPath, baseDir));
    } else {
      results.push(path.relative(baseDir, fullPath));
    }
  }
  return results;
}

export function collectLabEvidence(
  labRepoPath: string,
  sinceHash?: string
): LabEvidence {
  if (!fs.existsSync(labRepoPath)) {
    throw new Error(`Engineering lab repository not found at: ${labRepoPath}`);
  }

  const repositoryName = 'abhishek-engineering-labs';

  // Determine git log range
  let logRange = '-n 5';
  if (sinceHash) {
    try {
      execSync(`git -C "${labRepoPath}" rev-parse --verify "${sinceHash}"`, {
        stdio: 'ignore',
      });
      logRange = `${sinceHash}..HEAD`;
    } catch {
      logRange = '-n 5';
    }
  }

  // Get commits list
  const format = '%H|%an|%ad|%s';
  const logOutput = execSync(
    `git -C "${labRepoPath}" log ${logRange} --date=iso --pretty=format:"${format}"`,
    { encoding: 'utf-8' }
  ).trim();

  const commitLines = logOutput ? logOutput.split('\n').filter(Boolean) : [];
  if (commitLines.length === 0) {
    const headOutput = execSync(
      `git -C "${labRepoPath}" log -n 1 --date=iso --pretty=format:"${format}"`,
      { encoding: 'utf-8' }
    ).trim();
    if (!headOutput) {
      throw new Error('No commits found in engineering lab repository.');
    }
    commitLines.push(headOutput);
  }

  const commits: CommitEvidence[] = [];
  for (const line of commitLines) {
    const [hash, author, dateStr, message] = line.split('|');
    if (!hash) continue;

    const dateTime = new Date(dateStr);
    const date = dateTime.toISOString().split('T')[0];
    const shortHash = hash.slice(0, 7);

    // Get changed files
    const filesOutput = execSync(
      `git -C "${labRepoPath}" show --name-only --oneline "${hash}"`,
      { encoding: 'utf-8' }
    );
    const changedFiles = filesOutput
      .split('\n')
      .slice(1)
      .map((f) => f.trim())
      .filter(Boolean);

    // Get concise diff summary
    const diffStat = execSync(
      `git -C "${labRepoPath}" show --stat --oneline "${hash}"`,
      { encoding: 'utf-8' }
    )
      .split('\n')
      .slice(1, 15)
      .join('\n');

    commits.push({
      hash,
      shortHash,
      date,
      dateTime,
      author,
      message,
      changedFiles,
      diffSummary: diffStat,
    });
  }

  const latestCommit = commits[0];

  // Locate the relevant day folder
  let dayFolder: string | undefined;
  for (const c of commits) {
    for (const f of c.changedFiles) {
      const match = f.match(/((?:backend|databases)\/[^/]+)/);
      if (match) {
        dayFolder = match[1];
        break;
      }
    }
    if (dayFolder) break;
  }

  // If day folder not in latest commits, fallback to most recently modified folder
  if (!dayFolder) {
    dayFolder = 'backend/day-21-validation-errors';
  }

  const dayFolderPath = path.join(labRepoPath, dayFolder);
  const executableFiles: InspectedFileEvidence[] = [];
  const schemaFiles: InspectedFileEvidence[] = [];
  const documentationFiles: InspectedFileEvidence[] = [];
  const dependenciesUsed: string[] = [];
  let testExecutionSummary: string | undefined;

  if (fs.existsSync(dayFolderPath)) {
    const allRelativeFiles = getFilesRecursively(dayFolderPath);

    // 1. Inspect Package.json dependencies
    if (allRelativeFiles.includes('package.json')) {
      try {
        const pkgContent = fs.readFileSync(path.join(dayFolderPath, 'package.json'), 'utf-8');
        const pkg = JSON.parse(pkgContent);
        if (pkg.dependencies) {
          dependenciesUsed.push(...Object.keys(pkg.dependencies));
        }
        if (pkg.devDependencies) {
          dependenciesUsed.push(...Object.keys(pkg.devDependencies));
        }
      } catch {
        // ignore
      }
    }

    // 2. Inspect Executable Implementation & Automated Tests
    const codeCandidates = allRelativeFiles.filter(
      (f) => (f.endsWith('.js') || f.endsWith('.ts')) && !f.includes('.config.')
    );

    for (const relativeInDay of codeCandidates) {
      const fullPath = path.join(dayFolderPath, relativeInDay);
      const relativePath = path.join(dayFolder, relativeInDay);
      const content = fs.readFileSync(fullPath, 'utf-8');

      const sections: { title: string; snippet: string }[] = [];

      // Extract Automated Test suites & test cases
      if (relativeInDay.includes('test') || relativeInDay.includes('spec')) {
        const testMatches = content.match(/(?:describe|it|test)\s*\(\s*['"`]([\s\S]*?)['"`]\s*,\s*(?:async\s*)?\(\s*\)\s*=>/g);
        if (testMatches) {
          for (const t of testMatches) {
            sections.push({
              title: `Test Case (${t.replace(/,\s*(?:async\s*)?\(\s*\)\s*=>/, '').trim()})`,
              snippet: t,
            });
          }
        }
        const assertions = content.match(/expect\([\s\S]*?\)\.(?:toBe|toEqual|toMatchObject|toThrow)\([\s\S]*?\);?/g);
        if (assertions && assertions.length > 0) {
          sections.push({
            title: `Assertions (${assertions.length} assertion checks found)`,
            snippet: assertions.slice(0, 5).join('\n'),
          });
        }
      }

      // Extract Zod validation schema definition
      const zodMatch = content.match(/const\s+\w*validation\w*\s*=\s*z\.object\([\s\S]*?\n\s*\);?/i);
      if (zodMatch) {
        sections.push({
          title: 'Zod DTO Validation Schema',
          snippet: zodMatch[0],
        });
      }

      // Extract Route handlers
      const routeMatches = content.match(/app\.(post|get|put|delete)\([\s\S]*?\n\}\);?/g);
      if (routeMatches) {
        for (const r of routeMatches) {
          sections.push({
            title: `Route Handler (${r.slice(0, 30).trim()}...)`,
            snippet: r.slice(0, 500),
          });
        }
      }

      // Extract Error handling middleware
      const errHandlerMatch = content.match(/app\.use\(\(err,\s*req,\s*res,\s*next\)[\s\S]*?\n\}\);?/);
      if (errHandlerMatch) {
        sections.push({
          title: 'Centralized Error Handling Middleware',
          snippet: errHandlerMatch[0],
        });
      }

      executableFiles.push({
        repository: repositoryName,
        filePath: relativePath,
        category: 'executable_implementation',
        content,
        relevantSections: sections.length > 0 ? sections : [{ title: 'Source Code', snippet: content.slice(0, 800) }],
      });
    }

    // 3. Inspect Automated Test Suite Execution (if tests are present)
    const hasTests = allRelativeFiles.some((f) => f.includes('test') && (f.endsWith('.js') || f.endsWith('.ts')));
    if (hasTests) {
      try {
        const testRunOutput = execSync(`cd "${dayFolderPath}" && npx vitest run`, {
          encoding: 'utf-8',
          timeout: 15000,
          stdio: ['ignore', 'pipe', 'pipe'],
        });
        const passedMatch = testRunOutput.match(/Tests\s+(\d+\s+passed(?:\s*\(\d+\))?)/i);
        if (passedMatch) {
          testExecutionSummary = `Vitest automated run: ${passedMatch[1]}`;
        }
      } catch {
        // Test run optional, don't fail evidence collection
      }
    }

    // 4. Inspect Database Schemas (*.sql, schema.sql, queries.sql)
    const sqlCandidates = allRelativeFiles.filter((f) => f.endsWith('.sql'));
    for (const relativeInDay of sqlCandidates) {
      const fullPath = path.join(dayFolderPath, relativeInDay);
      const relativePath = path.join(dayFolder, relativeInDay);
      const content = fs.readFileSync(fullPath, 'utf-8');

      const sections: { title: string; snippet: string }[] = [];
      const tableMatch = content.match(/CREATE\s+TABLE[\s\S]*?\);?/gi);
      if (tableMatch) {
        for (const t of tableMatch) {
          sections.push({ title: 'SQL Table Definition', snippet: t });
        }
      }

      schemaFiles.push({
        repository: repositoryName,
        filePath: relativePath,
        category: 'database_schema',
        content,
        relevantSections: sections.length > 0 ? sections : [{ title: 'SQL Queries', snippet: content.slice(0, 600) }],
      });
    }

    // 5. Inspect Documentation (*.md, README.md)
    const mdCandidates = allRelativeFiles.filter((f) => f.endsWith('.md'));
    for (const relativeInDay of mdCandidates) {
      const fullPath = path.join(dayFolderPath, relativeInDay);
      const relativePath = path.join(dayFolder, relativeInDay);
      const content = fs.readFileSync(fullPath, 'utf-8');

      const sections: { title: string; snippet: string }[] = [];

      // Extract major markdown headings (## Section Title)
      const headingMatches = Array.from(content.matchAll(/##\s*([^\n]+)\n([\s\S]*?)(?=##|$)/g));
      if (headingMatches.length > 0) {
        for (const h of headingMatches) {
          sections.push({
            title: h[1].trim(),
            snippet: h[2].trim().slice(0, 800),
          });
        }
      }

      documentationFiles.push({
        repository: repositoryName,
        filePath: relativePath,
        category: 'documentation',
        content,
        relevantSections: sections.length > 0 ? sections : [{ title: 'README Overview', snippet: content.slice(0, 800) }],
      });
    }
  }

  return {
    repositoryName,
    commits,
    latestCommitHash: latestCommit.hash,
    latestCommitDate: latestCommit.dateTime,
    dayFolder,
    executableFiles,
    schemaFiles,
    documentationFiles,
    dependenciesUsed,
    testExecutionSummary,
  };
}
