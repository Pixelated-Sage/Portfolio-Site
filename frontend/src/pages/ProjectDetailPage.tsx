import React from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  ArrowLeft,
  CheckCircle2,
  Clock,
  Beaker,
  ShieldCheck,
  ExternalLink,
  GitBranch,
  Layers,
  AlertTriangle,
  Lightbulb,
} from 'lucide-react';
import { projectsData } from '../data/projects';
import { CodeBlock } from '../components/CodeBlock';

export const ProjectDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const project = projectsData.find((p) => p.slug === slug);

  if (!project) {
    return (
      <div className="py-20 text-center">
        <h2 className="text-2xl font-bold text-[#171B26]">Project Not Found</h2>
        <p className="text-[#606978] mt-2">The requested project detail page does not exist.</p>
        <Link
          to="/work"
          className="inline-flex items-center gap-1.5 text-sm font-medium text-[#315EFB] mt-4 hover:underline"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Selected Work</span>
        </Link>
      </div>
    );
  }

  const getStatusBadge = (status: typeof project.status) => {
    switch (status) {
      case 'completed':
        return (
          <span className="inline-flex items-center gap-1 text-xs font-mono font-medium px-2.5 py-1 rounded bg-emerald-50 text-emerald-700 border border-emerald-200">
            <CheckCircle2 className="w-3.5 h-3.5" /> Completed Project
          </span>
        );
      case 'in-progress':
        return (
          <span className="inline-flex items-center gap-1 text-xs font-mono font-medium px-2.5 py-1 rounded bg-[#315EFB]/10 text-[#315EFB] border border-[#315EFB]/20">
            <Clock className="w-3.5 h-3.5" /> Active Development / Ongoing Lab
          </span>
        );
      case 'experiment':
        return (
          <span className="inline-flex items-center gap-1 text-xs font-mono font-medium px-2.5 py-1 rounded bg-amber-50 text-amber-700 border border-amber-200">
            <Beaker className="w-3.5 h-3.5" /> Exploratory Prototype
          </span>
        );
    }
  };

  return (
    <article className="space-y-10 pt-4 sm:pt-8 text-left max-w-4xl mx-auto">
      {/* Back button */}
      <div>
        <Link
          to="/work"
          className="inline-flex items-center gap-1.5 text-xs font-mono text-[#606978] hover:text-[#171B26] transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Selected Work</span>
        </Link>
      </div>

      {/* Header */}
      <div className="border-b border-[#E2E6EE] pb-8">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
          <span className="text-xs font-mono uppercase text-[#315EFB] font-semibold tracking-wider">
            {project.category} • {project.period}
          </span>
          {getStatusBadge(project.status)}
        </div>

        <h1 className="text-3xl sm:text-4xl font-bold text-[#171B26]">
          {project.title}
        </h1>
        <p className="text-base sm:text-lg text-[#606978] mt-2 leading-relaxed">
          {project.tagline}
        </p>

        {/* Evidence Link Buttons */}
        <div className="mt-6 flex flex-wrap gap-3">
          {project.evidenceLinks.map((link, idx) => (
            <a
              key={idx}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-[#FFFFFF] hover:bg-[#EEF2F8] border border-[#E2E6EE] text-xs font-mono text-[#171B26] transition-colors"
            >
              <ExternalLink className="w-3.5 h-3.5 text-[#315EFB]" />
              <span>{link.label}</span>
            </a>
          ))}
        </div>
      </div>

      {/* Actual Contribution Callout (Honesty First) */}
      <section className="p-5 sm:p-6 rounded-xl bg-[#EEF2F8] border border-[#E2E6EE]">
        <div className="flex items-start gap-3">
          <ShieldCheck className="w-5 h-5 text-[#315EFB] shrink-0 mt-0.5" />
          <div>
            <h2 className="text-sm font-semibold uppercase font-mono tracking-wider text-[#171B26]">
              Verified Actual Contribution
            </h2>
            <p className="text-sm text-[#171B26] mt-1.5 leading-relaxed">
              {project.actualContribution}
            </p>
          </div>
        </div>
      </section>

      {/* Problem / Objective */}
      <section className="space-y-3">
        <h2 className="text-xl font-bold text-[#171B26] flex items-center gap-2">
          <Lightbulb className="w-5 h-5 text-[#315EFB]" />
          <span>The Problem & Engineering Objective</span>
        </h2>
        <div className="p-5 rounded-xl bg-[#FFFFFF] border border-[#E2E6EE] text-sm text-[#606978] leading-relaxed">
          {project.problem}
        </div>
      </section>

      {/* Genuine Technologies */}
      <section className="space-y-3">
        <h2 className="text-xl font-bold text-[#171B26] flex items-center gap-2">
          <Layers className="w-5 h-5 text-[#315EFB]" />
          <span>Technologies Genuinely Used</span>
        </h2>
        <div className="flex flex-wrap gap-2">
          {project.technologies.map((tech) => (
            <span
              key={tech}
              className="text-xs font-mono px-3 py-1.5 rounded-lg bg-[#FFFFFF] border border-[#E2E6EE] text-[#171B26]"
            >
              {tech}
            </span>
          ))}
        </div>
      </section>

      {/* Technical Approach */}
      <section className="space-y-3">
        <h2 className="text-xl font-bold text-[#171B26] flex items-center gap-2">
          <GitBranch className="w-5 h-5 text-[#315EFB]" />
          <span>Technical Implementation</span>
        </h2>
        <div className="p-5 rounded-xl bg-[#FFFFFF] border border-[#E2E6EE] space-y-3">
          {project.technicalApproach.map((step, idx) => (
            <div key={idx} className="flex items-start gap-2.5 text-sm text-[#606978]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#315EFB] shrink-0 mt-2"></span>
              <span className="leading-relaxed">{step}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Code Highlight if available */}
      {project.codeHighlight && (
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-[#171B26]">Code Evidence</h2>
          <CodeBlock
            code={project.codeHighlight.code}
            language={project.codeHighlight.language}
            filename={project.codeHighlight.filename}
            caption={project.codeHighlight.caption}
          />
        </section>
      )}

      {/* Design Decisions & Trade-Offs */}
      {project.designDecisions.length > 0 && (
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-[#171B26]">Design Decisions & Trade-offs</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {project.designDecisions.map((item, idx) => (
              <div
                key={idx}
                className="p-5 rounded-xl bg-[#FFFFFF] border border-[#E2E6EE] text-left"
              >
                <div className="text-xs font-mono font-semibold text-[#315EFB] mb-1">
                  Decision
                </div>
                <h3 className="text-sm font-semibold text-[#171B26]">
                  {item.decision}
                </h3>
                <p className="text-xs text-[#606978] mt-2 leading-relaxed">
                  {item.rationale}
                </p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Limitations & Lessons Learned */}
      <section className="space-y-3">
        <h2 className="text-xl font-bold text-[#171B26] flex items-center gap-2">
          <AlertTriangle className="w-5 h-5 text-amber-500" />
          <span>Known Limitations & Lessons</span>
        </h2>
        <div className="p-5 rounded-xl bg-[#FFFFFF] border border-[#E2E6EE] space-y-2.5">
          {project.limitationsAndLessons.map((item, idx) => (
            <div key={idx} className="flex items-start gap-2 text-sm text-[#606978]">
              <span className="text-amber-500 font-bold shrink-0">•</span>
              <span className="leading-relaxed">{item}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Footer link back */}
      <div className="pt-6 border-t border-[#E2E6EE] flex items-center justify-between">
        <Link
          to="/work"
          className="inline-flex items-center gap-1.5 text-xs font-mono text-[#315EFB] hover:underline"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to all projects</span>
        </Link>
        <a
          href="https://github.com/Pixelated-Sage"
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs font-mono text-[#606978] hover:text-[#171B26]"
        >
          GitHub Profile →
        </a>
      </div>
    </article>
  );
};
