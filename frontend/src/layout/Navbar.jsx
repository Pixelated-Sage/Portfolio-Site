import React from 'react'
import { useState } from "react"
import {Link} from "react-router-dom"

function Navbar() {
    const [isOpen, setIsOpen] = useState(false);

    const navLinks = [
        { name: "Home", path: "/" },
        { name: "About", path: "/about" },
        { name: "Skills", path: "/skills" },
        { name: "Projects", path: "/projects" },
        { name: "Experience", path: "/experience" },
        { name: "Blog", path: "/blog" },
        { name: "Contact", path: "/contact" },
      ];
      return (
        <header className="fixed top-6 left-1/2 -translate-x-1/2 w-[95vw] max-w-5xl z-50 rounded-2xl shadow-2xl border border-white/30 bg-white/30 backdrop-blur-xl">
          <div className="px-8 py-3 flex items-center justify-between">
            {/* Logo or Name */}
            <Link to="/" className="text-2xl font-bold font-orbitron text-gray-900 drop-shadow-sm">
              Abhishek
            </Link>
    
            {/* Desktop Nav */}
            <nav className="hidden md:flex gap-8 font-orbitron text-gray-900">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className="hover:text-cyan-500 transition-all duration-200"
                >
                  {link.name}
                </Link>
              ))}
            </nav>
    
            {/* Hamburger Icon */}
            <button
              className="md:hidden text-gray-900 text-2xl"
              onClick={() => setIsOpen(!isOpen)}
            >
              ☰
            </button>
          </div>
    
          {/* Mobile Menu */}
          {isOpen && (
            <div className="md:hidden px-8 py-4 bg-white/80 backdrop-blur-xl rounded-b-2xl text-gray-900 font-orbitron space-y-2 shadow-lg border-t border-white/30">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className="block hover:text-cyan-500"
                  onClick={() => setIsOpen(false)}
                >
                  {link.name}
                </Link>
              ))}
            </div>
          )}
        </header>
    );
};

export default Navbar