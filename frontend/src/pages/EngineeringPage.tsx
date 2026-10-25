import React, { useState, useMemo } from 'react';
import { engineeringLogData } from '../data/engineeringLog';
import { LogCard } from '../components/LogCard';
import { Terminal, Search, ChevronLeft, ChevronRight, Filter } from 'lucide-react';

export const EngineeringPage: React.FC = () => {
  const [selectedTopic, setSelectedTopic] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 6;

  const topics = [
    'All',
    'PostgreSQL & SQL',
    'Transactions & Integrity',
    'Backend Architecture',
    'Concurrency & Locking',
    'HTTP & Node.js',
    'Database Design',
  ];

  const filteredEntries = useMemo(() => {
    return engineeringLogData.filter((entry) => {
      const matchesTopic =
        selectedTopic === 'All' || entry.topic === selectedTopic;
      const matchesSearch =
        searchQuery === '' ||
        entry.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        entry.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
        entry.details.some((d) => d.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchesTopic && matchesSearch;
    });
  }, [selectedTopic, searchQuery]);

  // Reset to page 1 when filter/search changes
  const totalPages = Math.ceil(filteredEntries.length / itemsPerPage) || 1;
  const validPage = Math.min(currentPage, totalPages);
  const startIndex = (validPage - 1) * itemsPerPage;
  const paginatedEntries = filteredEntries.slice(startIndex, startIndex + itemsPerPage);

  const handleTopicChange = (topic: string) => {
    setSelectedTopic(topic);
    setCurrentPage(1);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1);
  };

  return (
    <div className="space-y-8 pt-4 sm:pt-8 text-left">
      {/* Page Header */}
      <div className="border-b border-[#E2E6EE] pb-6">
        <div className="flex items-center gap-2 text-xs font-mono uppercase text-[#315EFB] font-semibold tracking-wider">
          <Terminal className="w-3.5 h-3.5" />
          <span>Curated Learning Archive</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold text-[#171B26] mt-1">
          Engineering Log
        </h1>
        <p className="text-sm sm:text-base text-[#606978] mt-2 max-w-2xl leading-relaxed">
          A paginated, permanent record of daily backend experiments, database internals, concurrency investigations, and lessons learned.
        </p>

        {/* Search & Topic Bar */}
        <div className="mt-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          {/* Topic Filters */}
          <div className="flex flex-wrap gap-1.5">
            {topics.map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => handleTopicChange(t)}
                className={`px-2.5 py-1 rounded-md text-xs font-mono transition-all ${
                  selectedTopic === t
                    ? 'bg-[#315EFB] text-white font-medium shadow-xs'
                    : 'bg-[#FFFFFF] text-[#606978] border border-[#E2E6EE] hover:bg-[#EEF2F8] hover:text-[#171B26]'
                }`}
              >
                {t}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative min-w-[200px] sm:w-64">
            <Search className="w-4 h-4 text-[#606978] absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search log entries..."
              value={searchQuery}
              onChange={handleSearchChange}
              className="w-full pl-9 pr-3 py-1.5 text-xs font-mono rounded-lg bg-[#FFFFFF] border border-[#E2E6EE] focus:border-[#315EFB] focus:ring-1 focus:ring-[#315EFB] text-[#171B26] placeholder-[#606978]/60 transition-all outline-hidden"
            />
          </div>
        </div>
      </div>

      {/* Results Meta Info */}
      <div className="flex items-center justify-between text-xs font-mono text-[#606978]">
        <span>
          Showing {paginatedEntries.length} of {filteredEntries.length} entries
        </span>
        <span>
          Page {validPage} of {totalPages}
        </span>
      </div>

      {/* Entries List */}
      {paginatedEntries.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {paginatedEntries.map((entry) => (
            <LogCard key={entry.id} entry={entry} />
          ))}
        </div>
      ) : (
        <div className="py-16 text-center bg-[#FFFFFF] rounded-xl border border-[#E2E6EE] p-8">
          <Filter className="w-8 h-8 text-[#606978] mx-auto mb-2 opacity-50" />
          <h3 className="text-base font-semibold text-[#171B26]">No entries matched</h3>
          <p className="text-xs text-[#606978] mt-1">
            Try resetting your topic filter or search keyword.
          </p>
          <button
            type="button"
            onClick={() => {
              setSelectedTopic('All');
              setSearchQuery('');
              setCurrentPage(1);
            }}
            className="mt-4 px-3 py-1.5 text-xs font-mono rounded bg-[#EEF2F8] text-[#315EFB] hover:bg-[#315EFB] hover:text-white transition-colors"
          >
            Reset Filters
          </button>
        </div>
      )}

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="pt-6 border-t border-[#E2E6EE] flex items-center justify-between">
          <button
            type="button"
            disabled={validPage <= 1}
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono rounded-md bg-[#FFFFFF] border border-[#E2E6EE] text-[#171B26] hover:bg-[#EEF2F8] disabled:opacity-40 disabled:hover:bg-[#FFFFFF] disabled:cursor-not-allowed transition-colors"
          >
            <ChevronLeft className="w-3.5 h-3.5" />
            <span>Previous</span>
          </button>

          <div className="flex items-center gap-1">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((num) => (
              <button
                key={num}
                type="button"
                onClick={() => setCurrentPage(num)}
                className={`w-8 h-8 text-xs font-mono rounded-md transition-colors ${
                  validPage === num
                    ? 'bg-[#315EFB] text-white font-medium'
                    : 'bg-[#FFFFFF] text-[#606978] border border-[#E2E6EE] hover:bg-[#EEF2F8] hover:text-[#171B26]'
                }`}
              >
                {num}
              </button>
            ))}
          </div>

          <button
            type="button"
            disabled={validPage >= totalPages}
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono rounded-md bg-[#FFFFFF] border border-[#E2E6EE] text-[#171B26] hover:bg-[#EEF2F8] disabled:opacity-40 disabled:hover:bg-[#FFFFFF] disabled:cursor-not-allowed transition-colors"
          >
            <span>Next</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>
      )}
    </div>
  );
};
