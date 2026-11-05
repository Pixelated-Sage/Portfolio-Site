import fs from 'fs';
import path from 'path';
import readline from 'readline';
import { config } from './config.js';
import {
  saveRawNote,
  saveFormattedNote,
  createPublishingRecord,
  updatePublishingApproval,
  getLastCheckpoint,
  saveCheckpoint,
  isEntryDuplicate,
} from './db.js';
import { collectLabEvidence, extractDayFolderFromCommit } from './gitEvidence.js';
import { runPublishingPipeline } from './pipeline.js';
import { updateEngineeringLogFile, updateActivityLogFile } from './updater.js';
import {
  assertCleanPortfolioGit,
  runDryRunBuild,
  commitAndPushApprovedContent,
} from './verifier.js';

async function askQuestion(query: string): Promise<string> {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  return new Promise((resolve) =>
    rl.question(query, (ans) => {
      rl.close();
      resolve(ans.trim().toLowerCase());
    })
  );
}

function displayReviewSummary(entry: any, auditReport: any) {
  console.log('\n========================================================');
  console.log('📋 PROPOSED ENGINEERING LOG ENTRY FOR REVIEW');
  console.log('========================================================');
  console.log(`ID:           ${entry.id}`);
  console.log(`Title:        ${entry.title}`);
  console.log(`Date:         ${entry.date}`);
  console.log(`Topic:        ${entry.topic}`);
  console.log(`Status:       ${entry.status}`);
  console.log(`Summary:      ${entry.summary}`);
  console.log(`Key Takeaway: ${entry.keyTakeaway}`);
  console.log('Details:');
  entry.details.forEach((d: string) => console.log(`  • ${d}`));
  if (entry.codeSnippet) {
    console.log(`\nCode Snippet (${entry.codeSnippet.language}): ${entry.codeSnippet.caption}`);
    console.log('--------------------------------------------------------');
    console.log(entry.codeSnippet.code);
    console.log('--------------------------------------------------------');
  }
  if (entry.evidenceCommit) {
    console.log(`Evidence Commit: ${entry.evidenceCommit.hash} - "${entry.evidenceCommit.message}"`);
    console.log(`Commit URL:      ${entry.evidenceCommit.url}`);
  }

  console.log('\n========================================================');
  console.log('🛡️  EVIDENCE AUDIT REPORT (Code vs Documentation)');
  console.log('========================================================');
  console.log(`Audit Recommendation: ${auditReport.recommendation}`);
  console.log(`Audit Explanation:    ${auditReport.explanation}`);
  console.log(`\n🔬 Distinction Analysis:`);
  console.log(`   ${auditReport.distinctionAnalysis}`);

  console.log(`\n📂 Evidence by Repository & File Path:`);
  if (auditReport.evidenceByFile.length > 0) {
    auditReport.evidenceByFile.forEach((ef: any, idx: number) => {
      console.log(`\n  [File ${idx + 1}] ${ef.repository} ➔ ${ef.filePath}`);
      console.log(`  Category:     ${ef.category.toUpperCase().replace('_', ' ')}`);
      console.log(`  Capabilities Verified:`);
      ef.verifiedCapabilities.forEach((cap: string) => console.log(`    ✓ ${cap}`));
      if (ef.relevantCodeSnippet) {
        console.log(`  Relevant Code / Evidence:`);
        console.log(`  ----------------------------------------------------`);
        console.log(
          ef.relevantCodeSnippet
            .split('\n')
            .map((line: string) => `    ${line}`)
            .join('\n')
        );
        console.log(`  ----------------------------------------------------`);
      }
    });
  } else {
    console.log('  (No file-level breakdown supplied by model)');
  }

  console.log('\nVerified Claims:');
  auditReport.verifiedClaims.forEach((c: string) => console.log(`  ✓ ${c}`));
  if (auditReport.flaggedUnsupportedClaims.length > 0) {
    console.log('\n⚠️ Flagged Unsupported Claims:');
    auditReport.flaggedUnsupportedClaims.forEach((c: string) => console.log(`  ✗ ${c}`));
  }
  console.log('========================================================\n');
}

export async function main() {
  console.log('\n========================================================');
  console.log('🚀 Abhishek Sharma Portfolio V2.1 — AI Publishing Engine');
  console.log('========================================================\n');

  // 1. Verify Portfolio Git Status
  console.log('🔍 Checking portfolio git status...');
  assertCleanPortfolioGit(config.portfolioRepoPath);
  console.log('✅ Portfolio git working tree is clean.');

  // 2. Inspect Engineering Lab Evidence
  console.log(`🔍 Inspecting engineering lab repository at ${config.labRepoPath}...`);
  const checkpoint = await getLastCheckpoint('abhishek-engineering-labs');
  const sinceHash = checkpoint?.hash;

  if (sinceHash) {
    console.log(`📌 Found previous checkpoint commit: ${sinceHash.slice(0, 7)} (${checkpoint.date.toISOString().split('T')[0]})`);
  } else {
    console.log('📌 No previous checkpoint found in database; fetching recent commits.');
  }

  const evidence = collectLabEvidence(config.labRepoPath, sinceHash);
  console.log(`✅ Collected ${evidence.commits.length} commit(s) of evidence.`);
  evidence.commits.forEach((c) => {
    console.log(`   • ${c.shortHash} (${c.date}) - ${c.message}`);
  });

  if (evidence.commits.length === 0) {
    console.log('\n✨ No new commits found since last checkpoint. Portfolio is up to date!');
    process.exit(0);
  }

  // Paths
  const engineeringLogPath = path.join(
    config.portfolioRepoPath,
    'frontend/src/data/engineeringLog.ts'
  );
  const activityLogPath = path.join(
    config.portfolioRepoPath,
    'frontend/src/data/activityLog.ts'
  );
  const inputNotePath = path.resolve(config.inputNotePath);

  // Process commits chronologically (oldest first)
  const commitsToProcess = [...evidence.commits].reverse();
  console.log(`\n📋 Processing ${commitsToProcess.length} commit(s) in chronological order:`);

  for (let i = 0; i < commitsToProcess.length; i++) {
    const commit = commitsToProcess[i];
    console.log('\n========================================================');
    console.log(`🔄 Processing Commit [${i + 1}/${commitsToProcess.length}]: ${commit.shortHash} (${commit.date})`);
    console.log(`   Message: "${commit.message}"`);
    console.log('========================================================');

    // Read existing engineering log to find current max day number
    const logContent = fs.readFileSync(engineeringLogPath, 'utf-8');
    const dayMatches = Array.from(logContent.matchAll(/"?dayNumber"?:\s*(\d+)/g));
    const maxDay = dayMatches.reduce((max, m) => Math.max(max, parseInt(m[1], 10)), 0);
    const targetDay = maxDay + 1;
    const entryDate = commit.date;

    console.log(`📅 Target Entry: Day ${targetDay} (${entryDate})`);

    // Extract day folder for this commit
    const dayFolder = extractDayFolderFromCommit(commit, targetDay);

    // Determine note for this commit
    let rawDailyNote = '';
    if (fs.existsSync(inputNotePath)) {
      const todayText = fs.readFileSync(inputNotePath, 'utf-8');
      const dayMatch = todayText.match(/DAY\s*(\d+)/i);
      if (dayMatch && parseInt(dayMatch[1], 10) === targetDay) {
        rawDailyNote = todayText;
        console.log(`📄 Using input/today.md for Day ${targetDay}`);
      }
    }
    if (!rawDailyNote && dayFolder) {
      const readmePath = path.join(config.labRepoPath, dayFolder, 'README.md');
      if (fs.existsSync(readmePath)) {
        rawDailyNote = fs.readFileSync(readmePath, 'utf-8');
        console.log(`📄 Using ${dayFolder}/README.md as notes for Day ${targetDay}`);
      }
    }
    if (!rawDailyNote) {
      rawDailyNote = `# Day ${targetDay}\n\nWork done in commit ${commit.shortHash}: ${commit.message}`;
      console.log(`📄 Using commit details as notes for Day ${targetDay}`);
    }

    // Save Raw Daily Note Privately to PostgreSQL
    console.log('💾 Saving raw daily note to local PostgreSQL...');
    const { id: rawNoteId } = await saveRawNote(rawDailyNote);
    console.log(`✅ Raw note saved privately (raw_note_id: ${rawNoteId}).`);

    // Scoped evidence for this commit & dayFolder
    const dayEvidence = collectLabEvidence(config.labRepoPath, undefined, commit, dayFolder);

    // Check for Duplicates
    const folderName = dayEvidence.dayFolder ? path.basename(dayEvidence.dayFolder) : `day-${targetDay}`;
    const slug = folderName.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
    const dupCheck = await isEntryDuplicate(targetDay, entryDate, slug);
    if (dupCheck.duplicate) {
      console.warn(`⚠️ Warning: Duplicate detected: ${dupCheck.reason}`);
      const proceed = await askQuestion('Do you want to proceed anyway? (y/N): ');
      if (proceed !== 'y' && proceed !== 'yes') {
        console.log('Skipping this commit.');
        continue;
      }
    }

    // Run AI Pipeline
    console.log(`\n🤖 Running AI pipeline with Ollama (${config.ollamaModel})...`);
    console.log('   [1/4] Extracting factual claims with source attribution...');
    console.log('   [2/4] Generating Engineering Log entry & Formatted Daily Note...');
    console.log('   [3/4] Auditing claims against repository commits and code diffs...');
    console.log('   [4/4] Validating schema constraints with Zod...');

    const pipelineResult = await runPublishingPipeline({
      rawDailyNote,
      evidence: dayEvidence,
      currentDayNumber: targetDay,
      entryDate,
      slug,
    });

    const { entry, activityRecord, formattedNote, auditReport } = pipelineResult;

    // Save Formatted Note
    console.log('💾 Preserving formatted daily note to local PostgreSQL...');
    const formattedNoteId = await saveFormattedNote(formattedNote, rawNoteId);
    console.log(`✅ Formatted note preserved privately (formatted_note_id: ${formattedNoteId}).`);

    // Create Pending Publishing Record
    const recordId = await createPublishingRecord({
      entry,
      rawNoteId,
      formattedNoteId,
      auditResults: auditReport,
      evidenceSources: {
        commitsCount: 1,
        latestHash: commit.hash,
        dayFolder: dayEvidence.dayFolder,
      },
    });

    // Run Dry-Run Build
    runDryRunBuild(config.portfolioRepoPath);

    // Display Review Summary
    displayReviewSummary(entry, auditReport);

    // Interactive Approval
    const approval = await askQuestion(
      `👉 Do you approve publishing Day ${targetDay} (${entryDate}) to your live portfolio? (y/N): `
    );

    if (approval !== 'y' && approval !== 'yes') {
      console.log(`\n❌ Publication of Day ${targetDay} rejected by user.`);
      await updatePublishingApproval(recordId, 'REJECTED');
      console.log('Both raw note and formatted note remain safely preserved in local PostgreSQL.');
      if (i < commitsToProcess.length - 1) {
        const continueRemaining = await askQuestion('Continue with remaining commits? (y/N): ');
        if (continueRemaining !== 'y' && continueRemaining !== 'yes') {
          break;
        }
      }
      continue;
    }

    // Apply Changes & Publish
    console.log('\n📝 Updating portfolio data files...');
    updateEngineeringLogFile(engineeringLogPath, entry);
    updateActivityLogFile(activityLogPath, activityRecord);
    console.log('✅ Content files updated.');

    // Update DB Approval Status
    await updatePublishingApproval(recordId, 'APPROVED');

    // Commit & Push
    console.log('📦 Staging, committing and pushing to Git...');
    commitAndPushApprovedContent({
      portfolioRepoPath: config.portfolioRepoPath,
      dayNumber: entry.dayNumber,
      title: entry.title,
      remote: config.gitRemote,
      branch: config.gitBranch,
    });

    // Advance Checkpoint
    console.log('📌 Advancing commit checkpoint in PostgreSQL...');
    await saveCheckpoint(
      'abhishek-engineering-labs',
      config.labRepoPath,
      commit.hash,
      commit.dateTime
    );
    console.log(`✅ Checkpoint updated to commit ${commit.shortHash} (${commit.date})`);

    console.log('\n========================================================');
    console.log(`🎉 SUCCESS: Day ${entry.dayNumber} published to live portfolio!`);
    console.log('========================================================\n');
  }

  console.log('\n🏁 Multi-commit publishing queue completed.');
  console.log('Vercel will automatically rebuild and deploy the approved entries.');
}

// Execute when invoked directly
if (import.meta.url === `file://${process.argv[1]}`) {
  main().catch((err) => {
    console.error('\n❌ Fatal publishing error:', err.message);
    process.exit(1);
  });
}