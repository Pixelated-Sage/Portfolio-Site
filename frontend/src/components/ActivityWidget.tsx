import React, { useState } from 'react';
import { Calendar as CalendarIcon, GitCommit, ShieldCheck, Flame, ArrowUpRight, CheckCircle2 } from 'lucide-react';
import { computeStreakStats, recentMilestones } from '../data/activityLog';
import type { ActivityRecord } from '../data/activityLog';

export const ActivityWidget: React.FC = () => {
  const stats = computeStreakStats();
  const [selectedRecord, setSelectedRecord] = useState<ActivityRecord | null>(
    stats.daysLookup[stats.latestVerifiedDate] || null
  );

  // Generate calendar days covering the lab period from Sept 14, 2026 to Oct 25, 2026
  const calendarDays: { dateStr: string; dayNum: number; record?: ActivityRecord }[] = [];
  const startDate = new Date(2026, 8, 14); // Sep 14, 2026 (Monday)
  const endDate = new Date(2026, 9, 25);   // Oct 25, 2026 (Sunday)

  const cur = new Date(startDate);
  while (cur <= endDate) {
    const year = cur.getFullYear();
    const month = String(cur.getMonth() + 1).padStart(2, '0');
    const day = String(cur.getDate()).padStart(2, '0');
    const dateStr = `${year}-${month}-${day}`;
    calendarDays.push({
      dateStr,
      dayNum: cur.getDate(),
      record: stats.daysLookup[dateStr],
    });
    cur.setDate(cur.getDate() + 1);
  }

  return (
    <div className="bg-[#FFFFFF] rounded-xl border border-[#E2E6EE] p-5 sm:p-6 shadow-xs">
      {/* Header & Metrics */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-[#E2E6EE] gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-md bg-[#EEF2F8] text-[#315EFB]">
              <CalendarIcon className="w-4 h-4" />
            </span>
            <h3 className="font-semibold text-sm sm:text-base text-[#171B26]">
              Verified Engineering Learning Activity
            </h3>
          </div>
          <p className="text-xs text-[#606978] mt-1">
            Date-indexed lab progress backed by verified code implementations and Git commits.
          </p>
        </div>

        {/* Dynamic Streak Metrics */}
        <div className="flex items-center gap-3">
          <div className="px-3 py-1.5 rounded-lg bg-[#EEF2F8] border border-[#E2E6EE] text-left">
            <div className="text-[10px] uppercase font-mono text-[#606978] tracking-wider">
              Documented
            </div>
            <div className="text-sm sm:text-base font-bold font-mono text-[#171B26] flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-[#315EFB]" />
              {stats.totalVerifiedDays} Days
            </div>
          </div>

          <div className="px-3 py-1.5 rounded-lg bg-[#315EFB]/10 border border-[#315EFB]/30 text-left">
            <div className="text-[10px] uppercase font-mono text-[#315EFB] font-semibold tracking-wider">
              Current Streak
            </div>
            <div className="text-sm sm:text-base font-bold font-mono text-[#315EFB] flex items-center gap-1">
              <Flame className="w-3.5 h-3.5 text-[#315EFB]" />
              {stats.currentStreakDays} Days
            </div>
          </div>
        </div>
      </div>

      {/* Calendar Grid Representation */}
      <div className="pt-5">
        <div className="flex items-center justify-between text-xs text-[#606978] mb-2 font-mono">
          <span>Sept 14 — Oct 25, 2026</span>
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-sm bg-[#EEF2F8] border border-[#E2E6EE] inline-block"></span>
              <span>Unrecorded</span>
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-sm bg-[#315EFB] inline-block"></span>
              <span className="text-[#171B26] font-medium">Verified Lab</span>
            </span>
          </div>
        </div>

        {/* 7-column calendar grid (Mon-Sun) */}
        <div className="grid grid-cols-7 gap-1.5 text-center">
          {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((day, idx) => (
            <div key={idx} className="text-[10px] font-mono text-[#606978] py-0.5">
              {day}
            </div>
          ))}
          {calendarDays.map((item) => {
            const isVerified = !!item.record;
            const isSelected = selectedRecord?.date === item.dateStr;

            return (
              <button
                key={item.dateStr}
                type="button"
                onClick={() => item.record && setSelectedRecord(item.record)}
                title={
                  isVerified
                    ? `${item.dateStr}: ${item.record?.title}`
                    : `${item.dateStr}: No lab entry recorded`
                }
                className={`relative h-8 rounded text-xs font-mono transition-all flex flex-col items-center justify-center ${
                  isVerified
                    ? 'bg-[#315EFB] text-white hover:bg-[#2449CF] cursor-pointer font-medium shadow-xs'
                    : 'bg-[#EEF2F8] text-[#606978]/60 cursor-default'
                } ${isSelected ? 'ring-2 ring-offset-2 ring-[#315EFB]' : ''}`}
              >
                <span>{item.dayNum}</span>
                {isVerified && (
                  <span className="w-1 h-1 bg-white rounded-full mt-0.5"></span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Selected Day Detail Box */}
      {selectedRecord && (
        <div className="mt-5 p-3.5 rounded-lg bg-[#F7F8FA] border border-[#E2E6EE] text-left">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 pb-2 border-b border-[#E2E6EE]">
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-semibold px-2 py-0.5 rounded bg-[#315EFB]/10 text-[#315EFB]">
                {selectedRecord.date}
              </span>
              <span className="text-xs font-mono text-[#606978]">
                {selectedRecord.topic}
              </span>
            </div>
            {selectedRecord.commitHash && (
              <a
                href={selectedRecord.commitUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-mono text-[#315EFB] hover:text-[#2449CF] flex items-center gap-1"
              >
                <GitCommit className="w-3.5 h-3.5" />
                <span>{selectedRecord.commitHash}</span>
                <ArrowUpRight className="w-3 h-3" />
              </a>
            )}
          </div>
          <div className="pt-2">
            <h4 className="text-sm font-semibold text-[#171B26]">
              {selectedRecord.title}
            </h4>
            <p className="text-xs text-[#606978] mt-1 leading-relaxed">
              {selectedRecord.summary}
            </p>
          </div>
        </div>
      )}

      {/* Recent Milestones List */}
      <div className="mt-5 pt-4 border-t border-[#E2E6EE]">
        <div className="text-xs font-mono uppercase text-[#606978] font-semibold tracking-wider mb-2.5">
          Recent Meaningful Milestones
        </div>
        <div className="space-y-2">
          {recentMilestones.map((milestone, idx) => (
            <div
              key={idx}
              className="flex items-start gap-2.5 text-xs text-[#171B26] p-2 rounded-md hover:bg-[#F7F8FA] transition-colors"
            >
              <CheckCircle2 className="w-4 h-4 text-[#315EFB] shrink-0 mt-0.5" />
              <div>
                <div className="font-medium flex items-center gap-2">
                  <span>{milestone.title}</span>
                  <span className="text-[11px] font-mono text-[#606978] font-normal">
                    ({milestone.date})
                  </span>
                </div>
                <div className="text-[#606978] mt-0.5">{milestone.summary}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Integrity Footnote */}
      <div className="mt-4 pt-3 border-t border-[#E2E6EE] text-[11px] font-mono text-[#606978] flex items-center justify-between">
        <span>Verified from date-indexed activity records. Zero gap-filling.</span>
        <a
          href="https://github.com/Pixelated-Sage/abhishek-engineering-labs"
          target="_blank"
          rel="noopener noreferrer"
          className="text-[#315EFB] hover:underline flex items-center gap-1"
        >
          View Lab Repository
          <ArrowUpRight className="w-3 h-3" />
        </a>
      </div>
    </div>
  );
};
