import React from "react";
import { FaGithub, FaLinkedin, FaInstagram, FaEnvelope } from "react-icons/fa";

const Footer = () => (
  <footer className="w-full py-8 px-4 bg-gradient-to-b from-[#0b0d1a] via-black to-black text-gray-300 text-center relative z-10">
    <div className="flex flex-col md:flex-row items-center justify-between max-w-5xl mx-auto gap-4">
      <div className="text-lg font-orbitron tracking-wider">
        © {new Date().getFullYear()} Abhishek | Crafted with <span className="text-pink-400">♥</span> in Space
      </div>
      <div className="flex gap-6 justify-center mt-2 md:mt-0 text-2xl">
        <a href="mailto:your@email.com" target="_blank" rel="noopener noreferrer" className="hover:text-pink-400 transition">
          <FaEnvelope />
        </a>
        <a href="https://github.com/yourgithub" target="_blank" rel="noopener noreferrer" className="hover:text-purple-400 transition">
          <FaGithub />
        </a>
        <a href="https://linkedin.com/in/yourlinkedin" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400 transition">
          <FaLinkedin />
        </a>
        <a href="https://instagram.com/yourinstagram" target="_blank" rel="noopener noreferrer" className="hover:text-pink-400 transition">
          <FaInstagram />
        </a>
      </div>
    </div>
  </footer>
);

export default Footer;