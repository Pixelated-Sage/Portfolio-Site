import React from 'react';
import {
  GraduationCap,
  Award,
  ShieldCheck,
  FileText,
  Mail,
  MessageCircle,
  ArrowUpRight,
  CheckCircle2,
  AlertCircle,
  HeartHandshake,
} from 'lucide-react';
import { GithubIcon, LinkedinIcon } from '../components/Icons';
import { profileData } from '../data/profile';

export const AboutPage: React.FC = () => {
  return (
    <div className="space-y-12 pt-4 sm:pt-8 text-left max-w-3xl mx-auto">
      {/* Header & Bio */}
      <div className="border-b border-[#E2E6EE] pb-8">
        <div className="text-xs font-mono uppercase text-[#315EFB] font-semibold tracking-wider">
          Background & Philosophy
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold text-[#171B26] mt-1">
          About Abhishek Sharma
        </h1>
        <p className="text-base text-[#606978] mt-2 leading-relaxed">
          {profileData.tagline}
        </p>
      </div>

      {/* Engineering Journey */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-[#171B26]">
          The Engineering Journey
        </h2>
        <div className="space-y-3.5 text-sm sm:text-base text-[#606978] leading-relaxed">
          {profileData.bioLong.map((para, idx) => (
            <p key={idx}>{para}</p>
          ))}
        </div>
      </section>

      {/* Education */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-[#171B26] flex items-center gap-2">
          <GraduationCap className="w-5 h-5 text-[#315EFB]" />
          <span>Education</span>
        </h2>
        <div className="p-5 sm:p-6 rounded-xl bg-[#FFFFFF] border border-[#E2E6EE]">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
            <h3 className="font-semibold text-base text-[#171B26]">
              {profileData.education.degree}
            </h3>
            <span className="text-xs font-mono text-[#606978]">
              {profileData.education.period}
            </span>
          </div>
          <div className="text-xs sm:text-sm text-[#606978] mt-1">
            {profileData.education.institution} • {profileData.education.location}
          </div>
          <div className="mt-3 inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-[#EEF2F8] border border-[#E2E6EE] text-xs font-mono font-medium text-[#171B26]">
            <span>Recorded CGPA:</span>
            <span className="text-[#315EFB] font-bold">{profileData.education.cgpa}</span>
          </div>
        </div>
      </section>

      {/* Honest Capability Boundaries */}
      <section className="space-y-4">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-5 h-5 text-[#315EFB]" />
          <h2 className="text-xl font-bold text-[#171B26]">
            Capability Boundaries & Transparency
          </h2>
        </div>
        <p className="text-xs sm:text-sm text-[#606978] leading-relaxed">
          A clear, grounded breakdown of what I can confidently design and defend independently, versus tools explored with AI assistance.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Core Skills */}
          <div className="p-5 rounded-xl bg-[#FFFFFF] border border-[#E2E6EE]">
            <div className="flex items-center gap-1.5 text-xs font-mono uppercase text-[#315EFB] font-bold mb-2">
              <CheckCircle2 className="w-4 h-4 text-[#315EFB]" />
              Core Proficiencies
            </div>
            <ul className="space-y-1.5 text-xs text-[#171B26]">
              {profileData.capabilityBoundaries.coreSkills.map((s) => (
                <li key={s} className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#315EFB]"></span>
                  <span>{s}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Actively Building */}
          <div className="p-5 rounded-xl bg-[#FFFFFF] border border-[#E2E6EE]">
            <div className="flex items-center gap-1.5 text-xs font-mono uppercase text-[#315EFB] font-bold mb-2">
              <span className="w-2 h-2 rounded-full bg-[#315EFB]"></span>
              Actively Deepening
            </div>
            <ul className="space-y-1.5 text-xs text-[#171B26]">
              {profileData.capabilityBoundaries.activelyBuilding.map((s) => (
                <li key={s} className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#315EFB] shrink-0 mt-1.5"></span>
                  <span>{s}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Explored with AI Assistance */}
          <div className="p-5 rounded-xl bg-[#FFFFFF] border border-[#E2E6EE]">
            <div className="flex items-center gap-1.5 text-xs font-mono uppercase text-amber-600 font-bold mb-2">
              <AlertCircle className="w-4 h-4 text-amber-500" />
              Explored / AI-Assisted
            </div>
            <ul className="space-y-1.5 text-xs text-[#606978]">
              {profileData.capabilityBoundaries.familiarWithAssistance.map((s) => (
                <li key={s} className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400 shrink-0 mt-1.5"></span>
                  <span>{s}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Explicit Non-Claims */}
          <div className="p-5 rounded-xl bg-[#FFFFFF] border border-[#E2E6EE]">
            <div className="flex items-center gap-1.5 text-xs font-mono uppercase text-slate-600 font-bold mb-2">
              <span className="w-2 h-2 rounded-full bg-slate-400"></span>
              Explicit Non-Claims
            </div>
            <ul className="space-y-1.5 text-xs text-[#606978]">
              {profileData.capabilityBoundaries.explicitNonClaims.map((s) => (
                <li key={s} className="flex items-start gap-2">
                  <span className="text-slate-400 font-bold shrink-0">•</span>
                  <span>{s}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Verified Achievements & Leadership */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-[#171B26] flex items-center gap-2">
          <Award className="w-5 h-5 text-[#315EFB]" />
          <span>Achievements & Leadership</span>
        </h2>
        <div className="space-y-3">
          {profileData.achievements.map((item, idx) => (
            <div
              key={idx}
              className="p-5 rounded-xl bg-[#FFFFFF] border border-[#E2E6EE] text-left"
            >
              <div className="flex flex-wrap items-center justify-between gap-2">
                <h3 className="font-semibold text-sm sm:text-base text-[#171B26]">
                  {item.title}
                </h3>
                {item.badge && (
                  <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-[#EEF2F8] text-[#315EFB] font-semibold border border-[#315EFB]/20">
                    {item.badge}
                  </span>
                )}
              </div>
              <p className="text-xs sm:text-sm text-[#606978] mt-1.5 leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Verified Resume Section */}
      <section className="p-6 rounded-xl bg-[#FFFFFF] border border-[#E2E6EE] space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="text-xs font-mono uppercase text-[#315EFB] font-semibold tracking-wider">
              Selected Resume Document
            </div>
            <h2 className="text-lg font-bold text-[#171B26] mt-0.5">
              Curated Backend Engineering Resume
            </h2>
            <p className="text-xs sm:text-sm text-[#606978] mt-1">
              Verified against current capabilities and real project ownership ({profileData.resume.verifiedDate}).
            </p>
          </div>

          <a
            href={profileData.resume.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-[#315EFB] hover:bg-[#2449CF] text-white text-xs font-mono font-medium transition-colors shrink-0 shadow-xs"
          >
            <FileText className="w-4 h-4" />
            <span>Download PDF</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </a>
        </div>

        <div className="p-3 rounded-lg bg-[#F7F8FA] border border-[#E2E6EE] text-xs text-[#606978] leading-relaxed">
          <span className="font-semibold text-[#171B26]">Resume Curation Note: </span>
          Older historical drafts included inflated technology lists and AI-assisted experiments. This selected resume reflects strictly verified proficiencies, honest project scopes, and active backend learning.
        </div>
      </section>

      {/* Direct Contact Channels */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-[#171B26] flex items-center gap-2">
          <HeartHandshake className="w-5 h-5 text-[#315EFB]" />
          <span>Direct Contact Channels</span>
        </h2>
        <p className="text-xs sm:text-sm text-[#606978]">
          Feel free to reach out directly regarding backend engineering roles, internships, or technical collaborations:
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
          <a
            href={profileData.socialLinks.email}
            className="p-4 rounded-xl bg-[#FFFFFF] border border-[#E2E6EE] hover:border-[#315EFB] hover:bg-[#EEF2F8]/30 transition-all flex items-center gap-3 group"
          >
            <div className="p-2 rounded-lg bg-[#EEF2F8] text-[#315EFB] group-hover:bg-[#315EFB] group-hover:text-white transition-colors">
              <Mail className="w-4 h-4" />
            </div>
            <div className="text-left">
              <div className="text-[11px] font-mono text-[#606978]">Email</div>
              <div className="text-xs sm:text-sm font-medium text-[#171B26]">
                abhisheks.ai.dev@gmail.com
              </div>
            </div>
          </a>

          <a
            href={profileData.socialLinks.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="p-4 rounded-xl bg-[#FFFFFF] border border-[#E2E6EE] hover:border-[#315EFB] hover:bg-[#EEF2F8]/30 transition-all flex items-center gap-3 group"
          >
            <div className="p-2 rounded-lg bg-[#EEF2F8] text-[#315EFB] group-hover:bg-[#315EFB] group-hover:text-white transition-colors">
              <MessageCircle className="w-4 h-4" />
            </div>
            <div className="text-left">
              <div className="text-[11px] font-mono text-[#606978]">WhatsApp</div>
              <div className="text-xs sm:text-sm font-medium text-[#171B26]">
                +91 78888 16472
              </div>
            </div>
          </a>

          <a
            href={profileData.socialLinks.github}
            target="_blank"
            rel="noopener noreferrer"
            className="p-4 rounded-xl bg-[#FFFFFF] border border-[#E2E6EE] hover:border-[#315EFB] hover:bg-[#EEF2F8]/30 transition-all flex items-center gap-3 group"
          >
            <div className="p-2 rounded-lg bg-[#EEF2F8] text-[#315EFB] group-hover:bg-[#315EFB] group-hover:text-white transition-colors">
              <GithubIcon className="w-4 h-4" />
            </div>
            <div className="text-left">
              <div className="text-[11px] font-mono text-[#606978]">GitHub Profile</div>
              <div className="text-xs sm:text-sm font-medium text-[#171B26]">
                @Pixelated-Sage
              </div>
            </div>
          </a>

          <a
            href={profileData.socialLinks.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="p-4 rounded-xl bg-[#FFFFFF] border border-[#E2E6EE] hover:border-[#315EFB] hover:bg-[#EEF2F8]/30 transition-all flex items-center gap-3 group"
          >
            <div className="p-2 rounded-lg bg-[#EEF2F8] text-[#315EFB] group-hover:bg-[#315EFB] group-hover:text-white transition-colors">
              <LinkedinIcon className="w-4 h-4" />
            </div>
            <div className="text-left">
              <div className="text-[11px] font-mono text-[#606978]">LinkedIn</div>
              <div className="text-xs sm:text-sm font-medium text-[#171B26]">
                abhishek-sharma-080b2530b
              </div>
            </div>
          </a>
        </div>
      </section>
    </div>
  );
};
