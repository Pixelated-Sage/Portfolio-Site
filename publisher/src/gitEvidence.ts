import { execSync } from 'child_process';
import path from 'path';
import fs from 'fs';

export interface CommitEvidence {
  hash: string;
  shortHash: string;
  date: string; // YYYY-MM-DD
  dateTime: Date;
  author: string;
  message: string;
  changedFiles: string[];
  diffSummary: string;
  keySnippets: { filename: string; snippet: string }[];
}

export interface LabEvidence {
  commits: CommitEvidence[];
  latestCommitHash: string;
  latestCommitDate: Date;
  dayFolder?: string;
  dayReadmeContent?: string;
}

export function collectLabEvidence(
  labRepoPath: string,
  sinceHash?: string
): LabEvidence {
  if (!fs.existsSync(labRepoPath)) {
    throw new Error(`Engineering lab repository not found at: ${labRepoPath}`);
  }

  // Determine git log range
  let logRange = '-n 5';
  if (sinceHash) {
    try {
      // Check if sinceHash is valid in repo
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

  if (!logOutput) {
    // If no commits in range, grab HEAD
    const headOutput = execSync(
      `git -C "${labRepoPath}" log -n 1 --date=iso --pretty=format:"${format}"`,
      { encoding: 'utf-8' }
    ).trim();
    if (!headOutput) {
      throw new Error('No commits found in engineering lab repository.');
    }
    return parseCommits([headOutput], labRepoPath);
  }

  const commitLines = logOutput.split('\n').filter(Boolean);
  return parseCommits(commitLines, labRepoPath);
}

function parseCommits(commitLines: string[], labRepoPath: string): LabEvidence {
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

    // Extract small key snippets for source evidence
    const keySnippets: { filename: string; snippet: string }[] = [];
    for (const file of changedFiles.slice(0, 3)) {
      const fullPath = path.join(labRepoPath, file);
      if (fs.existsSync(fullPath) && fs.statSync(fullPath).isFile()) {
        try {
          const content = fs.readFileSync(fullPath, 'utf-8');
          // Bound snippet to first 30 lines
          const snippet = content.split('\n').slice(0, 35).join('\n');
          keySnippets.push({ filename: file, snippet });
        } catch {
          // ignore binary or unreadable files
        }
      }
    }

    commits.push({
      hash,
      shortHash,
      date,
      dateTime,
      author,
      message,
      changedFiles,
      diffSummary: diffStat,
      keySnippets,
    });
  }

  const latestCommit = commits[0];

  // Try to locate the relevant day folder
  let dayFolder: string | undefined;
  let dayReadmeContent: string | undefined;

  for (const c of commits) {
    for (const f of c.changedFiles) {
      const match = f.match(/((?:backend|databases)\/[^/]+)/);
      if (match) {
        dayFolder = match[1];
        const readmePath = path.join(labRepoPath, dayFolder, 'README.md');
        if (fs.existsSync(readmePath)) {
          dayReadmeContent = fs.readFileSync(readmePath, 'utf-8');
        }
        break;
      }
    }
    if (dayFolder) break;
  }

  return {
    commits,
    latestCommitHash: latestCommit.hash,
    latestCommitDate: latestCommit.dateTime,
    dayFolder,
    dayReadmeContent,
  };
}
