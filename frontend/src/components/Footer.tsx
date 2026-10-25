import React from 'react';
import { Mail, MessageCircle } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './Icons';
import { profileData } from '../data/profile';

export const Footer: React.FC = () => {
  return (
    <footer className="mt-20 border-t border-[#E2E6EE] bg-[#FFFFFF] py-12 text-[#606978]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 pb-8 border-b border-[#E2E6EE]">
          <div>
            <div className="font-semibold text-base text-[#171B26]">
              {profileData.name}
            </div>
            <p className="text-xs text-[#606978] mt-0.5">
              Software Engineer — Computer Science Engineering, SVIET (2023–2027)
            </p>
          </div>

          <div className="flex items-center gap-4 text-sm">
            <a
              href={profileData.socialLinks.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 hover:text-[#315EFB] transition-colors"
            >
              <GithubIcon className="w-4 h-4" />
              <span>GitHub</span>
            </a>
            <a
              href={profileData.socialLinks.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 hover:text-[#315EFB] transition-colors"
            >
              <LinkedinIcon className="w-4 h-4" />
              <span>LinkedIn</span>
            </a>
            <a
              href={profileData.socialLinks.email}
              className="flex items-center gap-1.5 hover:text-[#315EFB] transition-colors"
            >
              <Mail className="w-4 h-4" />
              <span>Email</span>
            </a>
            <a
              href={profileData.socialLinks.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 hover:text-[#315EFB] transition-colors"
            >
              <MessageCircle className="w-4 h-4" />
              <span>WhatsApp</span>
            </a>
          </div>
        </div>

        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-[#606978]">
          <div>
            © {new Date().getFullYear()} Abhishek Sharma • Portfolio V2.0 (Light Editorial)
          </div>
          <div className="flex items-center gap-3">
            <span>Static Deployment</span>
            <span>•</span>
            <span className="text-[#171B26]">Evidence-Driven Engineering</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
