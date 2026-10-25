import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle2, Clock, Beaker, ShieldCheck } from 'lucide-react';
import type { ProjectDetail } from '../data/projects';

interface ProjectCardProps {
  project: ProjectDetail;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  const getStatusBadge = (status: ProjectDetail['status']) => {
    switch (status) {
      case 'completed':
        return (
          <span className="inline-flex items-center gap-1 text-[11px] font-mono font-medium px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200">
            <CheckCircle2 className="w-3 h-3" /> Completed
          </span>
        );
      case 'in-progress':
        return (
          <span className="inline-flex items-center gap-1 text-[11px] font-mono font-medium px-2 py-0.5 rounded bg-[#315EFB]/10 text-[#315EFB] border border-[#315EFB]/20">
            <Clock className="w-3 h-3" /> In Progress
          </span>
        );
      case 'experiment':
        return (
          <span className="inline-flex items-center gap-1 text-[11px] font-mono font-medium px-2 py-0.5 rounded bg-amber-50 text-amber-700 border border-amber-200">
            <Beaker className="w-3 h-3" /> Experiment
          </span>
        );
    }
  };

  return (
    <article className="bg-[#FFFFFF] rounded-xl border border-[#E2E6EE] p-5 sm:p-6 hover:border-[#315EFB]/40 hover:shadow-xs transition-all flex flex-col justify-between text-left group">
      <div>
        <div className="flex items-center justify-between gap-2 mb-2.5">
          <span className="text-xs font-mono uppercase text-[#606978] tracking-wider font-medium">
            {project.category}
          </span>
          {getStatusBadge(project.status)}
        </div>

        <h3 className="text-lg sm:text-xl font-semibold text-[#171B26] group-hover:text-[#315EFB] transition-colors flex items-center justify-between">
          <span>{project.title}</span>
        </h3>

        <p className="text-xs sm:text-sm text-[#606978] mt-2 leading-relaxed">
          {project.summary}
        </p>

        {/* Honest Contribution Callout */}
        <div className="mt-3.5 p-2.5 rounded-md bg-[#EEF2F8] border border-[#E2E6EE] text-xs text-[#171B26] flex items-start gap-2">
          <ShieldCheck className="w-3.5 h-3.5 text-[#315EFB] shrink-0 mt-0.5" />
          <div className="text-[12px] leading-snug line-clamp-2">
            <span className="font-semibold">Actual contribution: </span>
            {project.actualContribution}
          </div>
        </div>

        {/* Genuine Technologies */}
        <div className="mt-4 flex flex-wrap gap-1.5">
          {project.technologies.slice(0, 5).map((tech) => (
            <span
              key={tech}
              className="text-[11px] font-mono px-2 py-0.5 rounded bg-[#F7F8FA] text-[#171B26] border border-[#E2E6EE]"
            >
              {tech}
            </span>
          ))}
          {project.technologies.length > 5 && (
            <span className="text-[11px] font-mono px-1.5 py-0.5 text-[#606978]">
              +{project.technologies.length - 5}
            </span>
          )}
        </div>
      </div>

      <div className="mt-5 pt-4 border-t border-[#E2E6EE] flex items-center justify-between">
        <span className="text-xs font-mono text-[#606978]">{project.period}</span>
        <Link
          to={`/work/${project.slug}`}
          className="text-xs font-medium text-[#315EFB] group-hover:text-[#2449CF] flex items-center gap-1 group-hover:translate-x-0.5 transition-transform"
        >
          <span>Deep Dive</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </article>
  );
};
