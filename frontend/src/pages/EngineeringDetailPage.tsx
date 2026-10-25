import React from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  ArrowLeft,
  Calendar,
  GitCommit,
  ArrowUpRight,
  Lightbulb,
  CheckCircle2,
  FolderGit2,
  Terminal,
} from 'lucide-react';
import { engineeringLogData } from '../data/engineeringLog';
import { CodeBlock } from '../components/CodeBlock';

export const EngineeringDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const currentIndex = engineeringLogData.findIndex((e) => e.slug === slug);
  const entry = engineeringLogData[currentIndex];

  if (!entry) {
    return (
      <div className="py-20 text-center">
        <h2 className="text-2xl font-bold text-[#171B26]">Entry Not Found</h2>
        <p className="text-[#606978] mt-2">The requested engineering log entry does not exist.</p>
        <Link
          to="/engineering"
          className="inline-flex items-center gap-1.5 text-sm font-medium text-[#315EFB] mt-4 hover:underline"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Engineering Log</span>
        </Link>
      </div>
    );
  }

  const prevEntry = currentIndex < engineeringLogData.length - 1 ? engineeringLogData[currentIndex + 1] : null;
  const nextEntry = currentIndex > 0 ? engineeringLogData[currentIndex - 1] : null;

  return (
    <article className="space-y-8 pt-4 sm:pt-8 text-left max-w-3xl mx-auto">
      {/* Back button */}
      <div>
        <Link
          to="/engineering"
          className="inline-flex items-center gap-1.5 text-xs font-mono text-[#606978] hover:text-[#171B26] transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Engineering Log</span>
        </Link>
      </div>

      {/* Header */}
      <div className="border-b border-[#E2E6EE] pb-6">
        <div className="flex flex-wrap items-center gap-2 mb-3">
          <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-[#171B26] text-white">
            Day {entry.dayNumber}
          </span>
          <span className="text-xs font-mono text-[#606978] flex items-center gap-1">
            <Calendar className="w-3.5 h-3.5" />
            {entry.date}
          </span>
          <span className="text-xs font-mono px-2 py-0.5 rounded bg-[#EEF2F8] text-[#315EFB] font-medium border border-[#315EFB]/15">
            {entry.topic}
          </span>
        </div>

        <h1 className="text-2xl sm:text-3xl font-bold text-[#171B26]">
          {entry.title}
        </h1>
        <p className="text-sm sm:text-base text-[#606978] mt-2 leading-relaxed">
          {entry.summary}
        </p>
      </div>

      {/* Key Takeaway Callout */}
      <section className="p-5 rounded-xl bg-[#EEF2F8] border border-[#E2E6EE] flex items-start gap-3">
        <Lightbulb className="w-5 h-5 text-[#315EFB] shrink-0 mt-0.5" />
        <div>
          <div className="text-xs font-mono uppercase tracking-wider text-[#171B26] font-semibold">
            Key Mental Model & Takeaway
          </div>
          <p className="text-sm text-[#171B26] mt-1 font-medium leading-relaxed">
            {entry.keyTakeaway}
          </p>
        </div>
      </section>

      {/* Implementation Details */}
      <section className="space-y-3">
        <h2 className="text-lg font-bold text-[#171B26] flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-[#315EFB]" />
          <span>Implementation & Investigation Steps</span>
        </h2>
        <div className="p-5 rounded-xl bg-[#FFFFFF] border border-[#E2E6EE] space-y-3">
          {entry.details.map((detail, idx) => (
            <div key={idx} className="flex items-start gap-2.5 text-sm text-[#606978]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#315EFB] shrink-0 mt-2"></span>
              <span className="leading-relaxed">{detail}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Code Snippet */}
      {entry.codeSnippet && (
        <section className="space-y-2">
          <h2 className="text-lg font-bold text-[#171B26] flex items-center gap-2">
            <Terminal className="w-4 h-4 text-[#315EFB]" />
            <span>Code / Query Verification</span>
          </h2>
          <CodeBlock
            code={entry.codeSnippet.code}
            language={entry.codeSnippet.language}
            caption={entry.codeSnippet.caption}
          />
        </section>
      )}

      {/* Commit Evidence Box */}
      <section className="p-4 rounded-xl bg-[#FFFFFF] border border-[#E2E6EE] flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs font-mono">
        <div className="flex items-center gap-2 text-[#171B26]">
          <FolderGit2 className="w-4 h-4 text-[#315EFB]" />
          <span>Path: {entry.repoPath}</span>
        </div>

        {entry.evidenceCommit && (
          <a
            href={entry.evidenceCommit.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded bg-[#EEF2F8] text-[#315EFB] hover:bg-[#315EFB] hover:text-white transition-colors"
          >
            <GitCommit className="w-3.5 h-3.5" />
            <span>Commit {entry.evidenceCommit.hash}</span>
            <ArrowUpRight className="w-3 h-3" />
          </a>
        )}
      </section>

      {/* Adjacent Entry Navigation */}
      <div className="pt-6 border-t border-[#E2E6EE] flex items-center justify-between gap-4 text-xs font-mono">
        {prevEntry ? (
          <Link
            to={`/engineering/${prevEntry.slug}`}
            className="text-[#606978] hover:text-[#315EFB] flex items-center gap-1 text-left"
          >
            <span>← Day {prevEntry.dayNumber} ({prevEntry.date})</span>
          </Link>
        ) : (
          <div></div>
        )}

        {nextEntry && (
          <Link
            to={`/engineering/${nextEntry.slug}`}
            className="text-[#606978] hover:text-[#315EFB] flex items-center gap-1 text-right"
          >
            <span>Day {nextEntry.dayNumber} ({nextEntry.date}) →</span>
          </Link>
        )}
      </div>
    </article>
  );
};
