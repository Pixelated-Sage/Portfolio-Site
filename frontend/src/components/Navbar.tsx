import React, { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './Icons';
import { profileData } from '../data/profile';

export const Navbar: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Selected Work', path: '/work' },
    { name: 'Engineering Log', path: '/engineering' },
    { name: 'About', path: '/about' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-[#FFFFFF]/90 backdrop-blur-md border-b border-[#E2E6EE]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Brand / Logo */}
        <Link to="/" className="flex items-center gap-2 group text-left">
          <div className="w-8 h-8 rounded-full bg-[#171B26] text-white flex items-center justify-center font-mono font-bold text-sm tracking-tight group-hover:bg-[#315EFB] transition-colors">
            AS
          </div>
          <div>
            <div className="font-semibold text-sm sm:text-base text-[#171B26] tracking-tight group-hover:text-[#315EFB] transition-colors">
              {profileData.name}
            </div>
            <div className="text-[11px] font-mono text-[#606978] leading-none">
              Backend & Systems
            </div>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-1 sm:gap-2">
          {navLinks.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === '/'}
              className={({ isActive }) =>
                `px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                  isActive
                    ? 'text-[#315EFB] bg-[#EEF2F8] font-semibold'
                    : 'text-[#606978] hover:text-[#171B26] hover:bg-[#F7F8FA]'
                }`
              }
            >
              {item.name}
            </NavLink>
          ))}
        </nav>

        {/* External Action Links */}
        <div className="hidden sm:flex items-center gap-3">
          <a
            href={profileData.socialLinks.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub Profile"
            className="p-2 text-[#606978] hover:text-[#171B26] hover:bg-[#EEF2F8] rounded-md transition-colors"
          >
            <GithubIcon className="w-4 h-4" />
          </a>
          <a
            href={profileData.socialLinks.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn Profile"
            className="p-2 text-[#606978] hover:text-[#171B26] hover:bg-[#EEF2F8] rounded-md transition-colors"
          >
            <LinkedinIcon className="w-4 h-4" />
          </a>
          <a
            href={profileData.resume.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-xs font-mono font-medium text-[#315EFB] bg-[#EEF2F8] hover:bg-[#315EFB] hover:text-white px-2.5 py-1.5 rounded border border-[#315EFB]/20 transition-all"
          >
            <span>Resume</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* Mobile Hamburger Toggle */}
        <button
          type="button"
          aria-label="Toggle menu"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 text-[#606978] hover:text-[#171B26] rounded-md hover:bg-[#EEF2F8]"
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-[#E2E6EE] bg-[#FFFFFF] px-4 pt-2 pb-4 space-y-1">
          {navLinks.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === '/'}
              onClick={() => setMobileMenuOpen(false)}
              className={({ isActive }) =>
                `block px-3 py-2 rounded-md text-sm font-medium ${
                  isActive
                    ? 'text-[#315EFB] bg-[#EEF2F8] font-semibold'
                    : 'text-[#606978] hover:text-[#171B26] hover:bg-[#F7F8FA]'
                }`
              }
            >
              {item.name}
            </NavLink>
          ))}
          <div className="pt-3 border-t border-[#E2E6EE] flex items-center justify-between">
            <div className="flex items-center gap-3">
              <a
                href={profileData.socialLinks.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-mono text-[#606978] flex items-center gap-1 hover:text-[#171B26]"
              >
                <GithubIcon className="w-3.5 h-3.5" /> GitHub
              </a>
              <a
                href={profileData.socialLinks.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-mono text-[#606978] flex items-center gap-1 hover:text-[#171B26]"
              >
                <LinkedinIcon className="w-3.5 h-3.5" /> LinkedIn
              </a>
            </div>
            <a
              href={profileData.resume.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-mono font-medium text-[#315EFB] bg-[#EEF2F8] px-2 py-1 rounded"
            >
              Resume PDF
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
