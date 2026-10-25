import { execSync } from 'child_process';
import path from 'path';

export function assertCleanPortfolioGit(portfolioRepoPath: string): void {
  // Check tracked status (ignore untracked files outside frontend/src/data)
  const statusOutput = execSync(`git -C "${portfolioRepoPath}" status --porcelain`, {
    encoding: 'utf-8',
  }).trim();

  if (!statusOutput) return;

  const lines = statusOutput.split('\n');
  const dirtyTracked = lines.filter((l) => {
    const code = l.slice(0, 2);
    // Ignore untracked ?? unless it's in frontend/src/data
    if (code.includes('?')) {
      return l.includes('frontend/src/data/');
    }
    // Flag any modified tracked files
    return true;
  });

  if (dirtyTracked.length > 0) {
    throw new Error(
      `Portfolio repository has uncommitted changes in tracked files:\n${dirtyTracked.join('\n')}\nPlease commit or stash changes before publishing.`
    );
  }
}

export function runDryRunBuild(portfolioRepoPath: string): void {
  const frontendDir = path.join(portfolioRepoPath, 'frontend');
  console.log('⚡ Running dry-run website build (tsc -b && vite build)...');
  try {
    execSync('npm run build', {
      cwd: frontendDir,
      stdio: 'inherit',
    });
    console.log('✅ Website build succeeded cleanly!');
  } catch {
    throw new Error('Dry-run website build failed. Halting publication.');
  }
}

export function commitAndPushApprovedContent(params: {
  portfolioRepoPath: string;
  dayNumber: number;
  title: string;
  remote?: string;
  branch?: string;
}): void {
  const { portfolioRepoPath, dayNumber, title, remote = 'origin', branch = 'master' } = params;

  // Stage ONLY the two content data files
  execSync(
    `git -C "${portfolioRepoPath}" add frontend/src/data/engineeringLog.ts frontend/src/data/activityLog.ts`,
    { stdio: 'inherit' }
  );

  // Commit
  const commitMsg = `docs(engineering-log): publish Day ${dayNumber} — ${title}`;
  execSync(`git -C "${portfolioRepoPath}" commit -m "${commitMsg}"`, {
    stdio: 'inherit',
  });

  // Push
  console.log(`🚀 Pushing changes to ${remote}/${branch}...`);
  execSync(`git -C "${portfolioRepoPath}" push ${remote} ${branch}`, {
    stdio: 'inherit',
  });
  console.log('✅ Successfully published and pushed to deployment branch!');
}
