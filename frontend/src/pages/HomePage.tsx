import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ArrowUpRight, FileText, CheckCircle2, ShieldCheck, Database, Server, GitBranch, Terminal } from 'lucide-react';
import { profileData } from '../data/profile';
import { projectsData } from '../data/projects';
import { engineeringLogData } from '../data/engineeringLog';
import { ProjectCard } from '../components/ProjectCard';
import { LogCard } from '../components/LogCard';
import { ActivityWidget } from '../components/ActivityWidget';

export const HomePage: React.FC = () => {
  const featuredProjects = projectsData.filter((p) => p.featured).slice(0, 3);
  const recentLogs = engineeringLogData.filter((l) => l.featuredOnHome).slice(0, 3);

  return (
    <div className="space-y-16 sm:space-y-20">
      {/* Hero Section */}
      <section className="pt-8 sm:pt-14 pb-4">
        <div className="flex flex-col-reverse md:flex-row items-start md:items-center justify-between gap-8 sm:gap-12">
          <div className="flex-1 text-left">
            {/* Status Pill */}
            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-[#EEF2F8] border border-[#E2E6EE] text-xs font-mono text-[#171B26] mb-5">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span>Available for Backend Engineering Roles & Internships</span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#171B26] leading-tight">
              {profileData.tagline}
            </h1>

            <p className="mt-4 text-base sm:text-lg text-[#606978] leading-relaxed max-w-2xl">
              I am <span className="font-semibold text-[#171B26]">Abhishek Sharma</span>, a Computer Science engineering student at SVIET, Punjab. I am deliberately moving from AI-assisted application building toward understanding underlying code, databases, transactions, and system behavior independently.
            </p>

            {/* Current Focus Pills */}
            <div className="mt-6 pt-5 border-t border-[#E2E6EE]">
              <div className="text-xs font-mono uppercase text-[#606978] font-semibold tracking-wider mb-2.5">
                Current Engineering Focus
              </div>
              <div className="flex flex-wrap gap-2 text-xs font-mono">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-[#FFFFFF] border border-[#E2E6EE] text-[#171B26]">
                  <Server className="w-3.5 h-3.5 text-[#315EFB]" />
                  Node.js / Express HTTP Architecture
                </span>
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-[#FFFFFF] border border-[#E2E6EE] text-[#171B26]">
                  <Database className="w-3.5 h-3.5 text-[#315EFB]" />
                  PostgreSQL & Relational Data Modeling
                </span>
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-[#FFFFFF] border border-[#E2E6EE] text-[#171B26]">
                  <GitBranch className="w-3.5 h-3.5 text-[#315EFB]" />
                  Transactions, MVCC & Row Locking
                </span>
              </div>
            </div>

            {/* CTAs */}
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Link
                to="/work"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-[#315EFB] hover:bg-[#2449CF] text-white text-sm font-medium transition-colors shadow-xs"
              >
                <span>Selected Work</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to="/engineering"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-[#FFFFFF] hover:bg-[#EEF2F8] text-[#171B26] border border-[#E2E6EE] text-sm font-medium transition-colors"
              >
                <Terminal className="w-4 h-4 text-[#315EFB]" />
                <span>Engineering Log</span>
              </Link>
              <a
                href={profileData.resume.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-[#FFFFFF] hover:bg-[#EEF2F8] text-[#606978] hover:text-[#171B26] border border-[#E2E6EE] text-sm font-medium transition-colors"
              >
                <FileText className="w-4 h-4" />
                <span>Verified Resume</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-[#315EFB]" />
              </a>
            </div>
          </div>

          {/* Profile Asset */}
          <div className="shrink-0 self-center md:self-auto">
            <div className="relative">
              <div className="w-36 h-36 sm:w-44 sm:h-44 rounded-2xl overflow-hidden border-2 border-[#E2E6EE] shadow-sm bg-gradient-to-b from-[#EEF2F8] to-[#FFFFFF]">
                <img
                  src="/assets/abhishek-profile.webp"
                  alt="Abhishek Sharma"
                  className="w-full h-full object-cover object-top"
                  loading="eager"
                />
              </div>
              <div className="absolute -bottom-2.5 -right-2.5 px-2 py-1 rounded bg-[#171B26] text-white text-[10px] font-mono flex items-center gap-1 shadow-xs">
                <ShieldCheck className="w-3 h-3 text-[#315EFB]" />
                <span>Verified Profile</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Verified Activity & Streak Widget */}
      <section>
        <ActivityWidget />
      </section>

      {/* Featured Projects Section */}
      <section className="text-left">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 pb-4 border-b border-[#E2E6EE] gap-2">
          <div>
            <div className="text-xs font-mono uppercase text-[#315EFB] font-semibold tracking-wider">
              Curated Portfolio
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#171B26] mt-1">
              Selected Work
            </h2>
            <p className="text-xs sm:text-sm text-[#606978] mt-1">
              Authentic projects highlighting genuine technical contributions, architectural choices, and lessons learned.
            </p>
          </div>
          <Link
            to="/work"
            className="text-xs sm:text-sm font-medium text-[#315EFB] hover:text-[#2449CF] flex items-center gap-1 shrink-0"
          >
            <span>View All Work</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featuredProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </section>

      {/* Recent Engineering Entries */}
      <section className="text-left">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 pb-4 border-b border-[#E2E6EE] gap-2">
          <div>
            <div className="text-xs font-mono uppercase text-[#315EFB] font-semibold tracking-wider">
              Learning Evidence
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#171B26] mt-1">
              Recent Engineering Entries
            </h2>
            <p className="text-xs sm:text-sm text-[#606978] mt-1">
              Curated entries from the hands-on engineering lab documenting real tests, edge cases, and code evidence.
            </p>
          </div>
          <Link
            to="/engineering"
            className="text-xs sm:text-sm font-medium text-[#315EFB] hover:text-[#2449CF] flex items-center gap-1 shrink-0"
          >
            <span>Browse Full Archive ({engineeringLogData.length} entries)</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {recentLogs.map((entry) => (
            <LogCard key={entry.id} entry={entry} />
          ))}
        </div>
      </section>

      {/* Ground-Truth Values Strip */}
      <section className="p-6 sm:p-8 rounded-xl bg-[#FFFFFF] border border-[#E2E6EE] text-left">
        <div className="max-w-3xl">
          <h3 className="text-lg font-semibold text-[#171B26] flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-[#315EFB]" />
            Engineering Philosophy
          </h3>
          <p className="text-xs sm:text-sm text-[#606978] mt-2 leading-relaxed">
            I believe that software engineering is not about blindly stitching together AI output or framework boilerplates. It is about understanding what the computer and database are doing under load, handling concurrency safely, designing clean boundaries, and producing readable, maintainable software.
          </p>
          <div className="mt-4 flex flex-wrap gap-4 text-xs font-mono text-[#171B26]">
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#315EFB]"></span>
              Implementation First
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#315EFB]"></span>
              Inspect Database Query Plans
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#315EFB]"></span>
              Defend Against Race Conditions
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#315EFB]"></span>
              Honest Capability Boundaries
            </span>
          </div>
        </div>
      </section>
    </div>
  );
};
