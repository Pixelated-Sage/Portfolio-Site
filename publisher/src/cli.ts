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
import { collectLabEvidence } from './gitEvidence.js';
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

export async function main() {
  console.log('\n========================================================');
  console.log('🚀 Abhishek Sharma Portfolio V2.1 — AI Publishing Engine');
  console.log('========================================================\n');

  // 1. Verify Note Input File
  const inputNotePath = path.resolve(config.inputNotePath);
  if (!fs.existsSync(inputNotePath)) {
    console.error(`❌ Input note file not found at: ${inputNotePath}`);
    console.error(`Please create it or copy your Notion daily note into ${inputNotePath}`);
    process.exit(1);
  }

  const rawDailyNote = fs.readFileSync(inputNotePath, 'utf-8').trim();
  if (!rawDailyNote) {
    console.error(`❌ Input note file is empty at: ${inputNotePath}`);
    console.error(`Please paste your daily note from Notion into ${inputNotePath}`);
    process.exit(1);
  }

  console.log(`📄 Loaded daily note (${rawDailyNote.length} characters) from ${inputNotePath}`);

  // 2. Verify Portfolio Git Status
  console.log('🔍 Checking portfolio git status...');
  assertCleanPortfolioGit(config.portfolioRepoPath);
  console.log('✅ Portfolio git working tree is clean.');

  // 3. Inspect Engineering Lab Evidence
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

  // 4. Save Raw Daily Note Privately to PostgreSQL
  console.log('💾 Saving raw daily note to local PostgreSQL...');
  const { id: rawNoteId } = await saveRawNote(rawDailyNote);
  console.log(`✅ Raw note saved privately (raw_note_id: ${rawNoteId}).`);

  // 5. Determine Day Number & Date
  const engineeringLogPath = path.join(
    config.portfolioRepoPath,
    'frontend/src/data/engineeringLog.ts'
  );
  const activityLogPath = path.join(
    config.portfolioRepoPath,
    'frontend/src/data/activityLog.ts'
  );

  // Read existing engineering log to find current max day number
  const logContent = fs.readFileSync(engineeringLogPath, 'utf-8');
  const dayMatches = Array.from(logContent.matchAll(/dayNumber:\s*(\d+)/g));
  const maxDay = dayMatches.reduce((max, m) => Math.max(max, parseInt(m[1], 10)), 0);
  const targetDay = maxDay + 1;
  const entryDate = evidence.commits[0]?.date || new Date().toISOString().split('T')[0];

  console.log(`📅 Target Entry: Day ${targetDay} (${entryDate})`);

  // 6. Check for Duplicates
  const slug = `day-${targetDay}-validation-errors`;
  const dupCheck = await isEntryDuplicate(targetDay, entryDate, slug);
  if (dupCheck.duplicate) {
    console.warn(`⚠️ Warning: Duplicate detected: ${dupCheck.reason}`);
    const proceed = await askQuestion('Do you want to proceed anyway? (y/N): ');
    if (proceed !== 'y' && proceed !== 'yes') {
      console.log('Publication halted.');
      process.exit(0);
    }
  }

  // 7. Run AI Pipeline (Extract -> Generate -> Audit -> Validate)
  console.log(`\n🤖 Running AI pipeline with Ollama (${config.ollamaModel})...`);
  console.log('   [1/4] Extracting factual claims with source attribution...');
  console.log('   [2/4] Generating Engineering Log entry & Formatted Daily Note...');
  console.log('   [3/4] Auditing claims against repository commits and code diffs...');
  console.log('   [4/4] Validating schema constraints with Zod...');

  const pipelineResult = await runPublishingPipeline({
    rawDailyNote,
    evidence,
    currentDayNumber: targetDay,
    entryDate,
  });

  const { entry, activityRecord, formattedNote, auditReport } = pipelineResult;

  // 8. Save Formatted Daily Note Privately to PostgreSQL
  console.log('💾 Preserving formatted daily note to local PostgreSQL...');
  const formattedNoteId = await saveFormattedNote(formattedNote, rawNoteId);
  console.log(`✅ Formatted note preserved privately (formatted_note_id: ${formattedNoteId}).`);

  // 9. Create Pending Publishing Record
  const recordId = await createPublishingRecord({
    entry,
    rawNoteId,
    formattedNoteId,
    auditResults: auditReport,
    evidenceSources: {
      commitsCount: evidence.commits.length,
      latestHash: evidence.latestCommitHash,
      dayFolder: evidence.dayFolder,
    },
  });

  // 10. Run Dry-Run Build
  runDryRunBuild(config.portfolioRepoPath);

  // 11. Display Review Summary
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
  entry.details.forEach((d) => console.log(`  • ${d}`));
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
    auditReport.evidenceByFile.forEach((ef, idx) => {
      console.log(`\n  [File ${idx + 1}] ${ef.repository} ➔ ${ef.filePath}`);
      console.log(`  Category:     ${ef.category.toUpperCase().replace('_', ' ')}`);
      console.log(`  Capabilities Verified:`);
      ef.verifiedCapabilities.forEach((cap) => console.log(`    ✓ ${cap}`));
      if (ef.relevantCodeSnippet) {
        console.log(`  Relevant Code / Evidence:`);
        console.log(`  ----------------------------------------------------`);
        console.log(
          ef.relevantCodeSnippet
            .split('\n')
            .map((line) => `    ${line}`)
            .join('\n')
        );
        console.log(`  ----------------------------------------------------`);
      }
    });
  } else {
    console.log('  (No file-level breakdown supplied by model)');
  }

  console.log('\nVerified Claims:');
  auditReport.verifiedClaims.forEach((c) => console.log(`  ✓ ${c}`));
  if (auditReport.flaggedUnsupportedClaims.length > 0) {
    console.log('\n⚠️ Flagged Unsupported Claims:');
    auditReport.flaggedUnsupportedClaims.forEach((c) => console.log(`  ✗ ${c}`));
  }
  console.log('========================================================\n');

  // 12. Interactive Approval
  const approval = await askQuestion(
    '👉 Do you approve publishing this entry to your live portfolio? (y/N): '
  );

  if (approval !== 'y' && approval !== 'yes') {
    console.log('\n❌ Publication rejected by user.');
    await updatePublishingApproval(recordId, 'REJECTED');
    console.log('Both raw note and formatted note remain safely preserved in local PostgreSQL.');
    process.exit(0);
  }

  // 13. Apply Changes & Publish
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
    evidence.latestCommitHash,
    evidence.latestCommitDate
  );
  console.log('✅ Checkpoint updated to commit', evidence.latestCommitHash.slice(0, 7));

  console.log('\n========================================================');
  console.log(`🎉 SUCCESS: Day ${entry.dayNumber} published to live portfolio!`);
  console.log('Vercel will automatically rebuild and deploy the new entry.');
  console.log('========================================================\n');
}

// Execute when invoked directly
if (import.meta.url === `file://${process.argv[1]}`) {
  main().catch((err) => {
    console.error('\n❌ Fatal publishing error:', err.message);
    process.exit(1);
  });
}
