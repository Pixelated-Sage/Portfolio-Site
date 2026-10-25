import React, { useState } from 'react';
import { projectsData } from '../data/projects';
import { ProjectCard } from '../components/ProjectCard';
import { Info } from 'lucide-react';

export const WorkPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = ['All', 'Backend & Systems', 'AI & Information Retrieval', 'Full-Stack & Mobile'];

  const filteredProjects =
    selectedCategory === 'All'
      ? projectsData
      : projectsData.filter((p) => p.category === selectedCategory);

  return (
    <div className="space-y-10 pt-4 sm:pt-8 text-left">
      {/* Page Header */}
      <div className="border-b border-[#E2E6EE] pb-6">
        <div className="text-xs font-mono uppercase text-[#315EFB] font-semibold tracking-wider">
          Engineering Showcase
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold text-[#171B26] mt-1">
          Selected Work
        </h1>
        <p className="text-sm sm:text-base text-[#606978] mt-2 max-w-2xl leading-relaxed">
          A curated collection of projects highlighting my actual contributions, technical architecture, and honest capability boundaries.
        </p>

        {/* Category Filters */}
        <div className="mt-6 flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all ${
                selectedCategory === cat
                  ? 'bg-[#315EFB] text-white font-medium shadow-xs'
                  : 'bg-[#FFFFFF] text-[#606978] border border-[#E2E6EE] hover:bg-[#EEF2F8] hover:text-[#171B26]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {filteredProjects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>

      {/* Ground-Truth Integrity Notice */}
      <div className="p-4 sm:p-5 rounded-xl bg-[#FFFFFF] border border-[#E2E6EE] text-xs text-[#606978] flex items-start gap-3">
        <Info className="w-4 h-4 text-[#315EFB] shrink-0 mt-0.5" />
        <div className="leading-relaxed">
          <span className="font-semibold text-[#171B26]">About Project Selection: </span>
          Only projects with verified, personal technical contributions are included. Historical prototypes developed with extensive AI assistance are explicitly disclosed, and commercial ventures (such as unreleased Teaching Platform functionality and OXLATE strategy) remain confidential.
        </div>
      </div>
    </div>
  );
};
