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

  if (fs.existsSync(dayFolderPath)) {
    const folderEntries = fs.readdirSync(dayFolderPath);

    // 1. Inspect Package.json dependencies
    if (folderEntries.includes('package.json')) {
      try {
        const pkgContent = fs.readFileSync(path.join(dayFolderPath, 'package.json'), 'utf-8');
        const pkg = JSON.parse(pkgContent);
        if (pkg.dependencies) {
          dependenciesUsed.push(...Object.keys(pkg.dependencies));
        }
      } catch {
        // ignore
      }
    }

    // 2. Inspect Executable Implementation (server.js, *.js, *.ts)
    const executableCandidates = folderEntries.filter(
      (f) =>
        (f.endsWith('.js') || f.endsWith('.ts')) &&
        !f.includes('test') &&
        !f.includes('.config.')
    );

    for (const fileName of executableCandidates) {
      const fullPath = path.join(dayFolderPath, fileName);
      const relativePath = path.join(dayFolder, fileName);
      const content = fs.readFileSync(fullPath, 'utf-8');

      const sections: { title: string; snippet: string }[] = [];

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

    // 3. Inspect Database Schemas (*.sql, schema.sql, queries.sql)
    const sqlCandidates = folderEntries.filter((f) => f.endsWith('.sql'));
    for (const fileName of sqlCandidates) {
      const fullPath = path.join(dayFolderPath, fileName);
      const relativePath = path.join(dayFolder, fileName);
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

    // 4. Inspect Documentation (README.md)
    if (folderEntries.includes('README.md')) {
      const fullPath = path.join(dayFolderPath, 'README.md');
      const relativePath = path.join(dayFolder, 'README.md');
      const content = fs.readFileSync(fullPath, 'utf-8');

      const sections: { title: string; snippet: string }[] = [];

      // Extract rules of validation
      const rulesMatch = content.match(/##\s*Rules of Validation[\s\S]*?(?=##|$)/i);
      if (rulesMatch) {
        sections.push({
          title: 'Validation Rules',
          snippet: rulesMatch[0].trim(),
        });
      }

      // Extract test cases
      const testCasesMatch = content.match(/##\s*Test Cases[\s\S]*?(?=##|$)/i);
      if (testCasesMatch) {
        sections.push({
          title: 'Documented Test Cases',
          snippet: testCasesMatch[0].slice(0, 1000).trim(),
        });
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
  };
}
