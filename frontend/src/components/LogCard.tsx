import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, GitCommit, ArrowUpRight, Lightbulb } from 'lucide-react';
import type { EngineeringEntry } from '../data/engineeringLog';

interface LogCardProps {
  entry: EngineeringEntry;
}

export const LogCard: React.FC<LogCardProps> = ({ entry }) => {
  return (
    <article className="bg-[#FFFFFF] rounded-xl border border-[#E2E6EE] p-5 sm:p-6 hover:border-[#315EFB]/40 hover:shadow-xs transition-all text-left flex flex-col justify-between group">
      <div>
        {/* Top metadata */}
        <div className="flex flex-wrap items-center justify-between gap-2 mb-2.5">
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-[#171B26] text-white">
              Day {entry.dayNumber}
            </span>
            <span className="text-xs font-mono text-[#606978]">{entry.date}</span>
          </div>
          <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-[#EEF2F8] text-[#315EFB] font-medium border border-[#315EFB]/15">
            {entry.topic}
          </span>
        </div>

        {/* Title */}
        <h3 className="text-base sm:text-lg font-semibold text-[#171B26] group-hover:text-[#315EFB] transition-colors">
          <Link to={`/engineering/${entry.slug}`}>{entry.title}</Link>
        </h3>

        {/* Summary */}
        <p className="text-xs sm:text-sm text-[#606978] mt-2 leading-relaxed">
          {entry.summary}
        </p>

        {/* Key Takeaway */}
        <div className="mt-3.5 p-3 rounded-md bg-[#F7F8FA] border border-[#E2E6EE] text-xs text-[#171B26] flex items-start gap-2.5">
          <Lightbulb className="w-4 h-4 text-[#315EFB] shrink-0 mt-0.5" />
          <div className="leading-relaxed">
            <span className="font-semibold text-[#171B26]">Takeaway: </span>
            <span className="text-[#606978]">{entry.keyTakeaway}</span>
          </div>
        </div>
      </div>

      {/* Footer link and commit */}
      <div className="mt-5 pt-3.5 border-t border-[#E2E6EE] flex items-center justify-between">
        {entry.evidenceCommit ? (
          <a
            href={entry.evidenceCommit.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-xs font-mono text-[#606978] hover:text-[#315EFB] transition-colors"
          >
            <GitCommit className="w-3.5 h-3.5 text-[#315EFB]" />
            <span>{entry.evidenceCommit.hash}</span>
            <ArrowUpRight className="w-3 h-3" />
          </a>
        ) : (
          <span className="text-xs font-mono text-[#606978]">Verified Exercise</span>
        )}

        <Link
          to={`/engineering/${entry.slug}`}
          className="text-xs font-medium text-[#315EFB] group-hover:text-[#2449CF] flex items-center gap-1 group-hover:translate-x-0.5 transition-transform"
        >
          <span>Read Entry</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </article>
  );
};
