import React, { useState } from 'react'

function Navbar() {
    const [isOpen, setIsOpen] = useState(false);

    const scrollToSection = (id) => {
        setIsOpen(false);
        if (id === 'home') {
            window.scrollTo({ top: 0, behavior: 'smooth' });
            return;
        }
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    const navLinks = [
        { name: "Home", id: "home" },
        { name: "About", id: "about" },
        { name: "Skills", id: "skills" },
        { name: "Projects", id: "projects" },
        { name: "Experience", id: "experience" },
        { name: "Achievements", id: "achievements" },
        { name: "Notes", id: "notes" },
        { name: "Contact", id: "contact" },
      ];

      return (
        <header className="fixed top-6 left-1/2 -translate-x-1/2 w-[95vw] max-w-5xl z-50 rounded-2xl shadow-xl border border-white/50 bg-white/70 backdrop-blur-md transition-all duration-300">
          <div className="px-6 sm:px-8 py-3 flex items-center justify-between">
            {/* Logo or Name */}
            <button 
                onClick={() => scrollToSection('home')} 
                className="text-xl sm:text-2xl font-bold text-gray-900 tracking-tight hover:text-purple-600 transition-colors"
                style={{ fontFamily: "'Dancing Script', cursive" }}
            >
              Abhishek Sharma
            </button>
    
            {/* Desktop Nav */}
            <nav className="hidden md:flex gap-6 lg:gap-8 font-medium text-sm text-gray-700">
              {navLinks.map((link) => (
                <button
                  key={link.name}
                  onClick={() => scrollToSection(link.id)}
                  className="hover:text-purple-600 transition-all duration-200 relative group"
                >
                  {link.name}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-purple-600 transition-all duration-300 group-hover:w-full"></span>
                </button>
              ))}
            </nav>
    
            {/* Hamburger Icon */}
            <button
              className="md:hidden text-gray-900 text-2xl"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? '✕' : '☰'}
            </button>
          </div>
    
          {/* Mobile Menu */}
          {isOpen && (
            <div className="md:hidden px-8 py-6 bg-white/95 backdrop-blur-xl rounded-b-2xl text-gray-900 space-y-4 shadow-lg border-t border-gray-100 absolute w-full left-0 top-full">
              {navLinks.map((link) => (
                <button
                  key={link.name}
                  onClick={() => scrollToSection(link.id)}
                  className="block w-full text-left text-lg font-medium hover:text-purple-600 py-2 border-b border-gray-50 last:border-0"
                >
                  {link.name}
                </button>
              ))}
            </div>
          )}
        </header>
    );
};

export default Navbar