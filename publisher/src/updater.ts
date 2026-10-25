import fs from 'fs';
import path from 'path';
import type { EngineeringEntry, ActivityRecord } from './schemas.js';

export function updateEngineeringLogFile(
  filePath: string,
  entry: EngineeringEntry
): void {
  if (!fs.existsSync(filePath)) {
    throw new Error(`File not found: ${filePath}`);
  }

  const content = fs.readFileSync(filePath, 'utf-8');

  // Check if entry id or slug already exists
  if (content.includes(`"${entry.id}"`) || content.includes(`"${entry.slug}"`)) {
    throw new Error(`Entry with ID ${entry.id} or slug ${entry.slug} already exists in ${filePath}`);
  }

  // Format entry as JSON-like JS object
  const entryFormatted = JSON.stringify(entry, null, 2)
    .split('\n')
    .map((line, idx) => (idx === 0 ? `  ${line}` : `  ${line}`))
    .join('\n');

  const target = 'export const engineeringLogData: EngineeringEntry[] = [\n';
  if (!content.includes(target)) {
    throw new Error(`Target export array not found in ${filePath}`);
  }

  const replacement = `${target}${entryFormatted},\n`;
  const updatedContent = content.replace(target, replacement);

  fs.writeFileSync(filePath, updatedContent, 'utf-8');
}

export function updateActivityLogFile(
  filePath: string,
  record: ActivityRecord
): void {
  if (!fs.existsSync(filePath)) {
    throw new Error(`File not found: ${filePath}`);
  }

  let content = fs.readFileSync(filePath, 'utf-8');

  // Check if date already exists in records
  if (content.includes(`"date": "${record.date}"`) || content.includes(`date: "${record.date}"`)) {
    throw new Error(`Activity record for date ${record.date} already exists in ${filePath}`);
  }

  // Format record
  const recordFormatted = JSON.stringify(record, null, 2)
    .split('\n')
    .map((line, idx) => (idx === 0 ? `  ${line}` : `  ${line}`))
    .join('\n');

  const recordsTarget = 'export const activityRecords: ActivityRecord[] = [\n';
  if (!content.includes(recordsTarget)) {
    throw new Error(`Target activityRecords array not found in ${filePath}`);
  }

  content = content.replace(recordsTarget, `${recordsTarget}${recordFormatted},\n`);

  // Also update recentMilestones
  const milestoneTarget = 'export const recentMilestones = [\n';
  if (content.includes(milestoneTarget)) {
    // Format human readable date: e.g. "Oct 25, 2026"
    const dateObj = new Date(record.date + 'T00:00:00');
    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const humanDate = `${monthNames[dateObj.getMonth()]} ${dateObj.getDate()}, ${dateObj.getFullYear()}`;

    const newMilestone = `  {\n    date: "${humanDate}",\n    title: "${record.title}",\n    summary: "${record.summary.replace(/"/g, '\\"')}",\n    exercise: "${record.exercisePath || 'backend'}",\n  },\n`;
    content = content.replace(milestoneTarget, `${milestoneTarget}${newMilestone}`);
  }

  fs.writeFileSync(filePath, content, 'utf-8');
}
