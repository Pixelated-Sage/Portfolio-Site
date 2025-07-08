import React from "react";
import { FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full py-6 sm:py-8 px-4 bg-gradient-to-b from-[#0b0d1a] via-black to-black text-gray-300 text-center relative z-10">
      <div className="flex flex-col sm:flex-row items-center justify-between max-w-5xl mx-auto gap-4">
        {/* Text Section */}
        <div className="text-sm sm:text-base font-orbitron tracking-wider text-center sm:text-left">
          © {currentYear} Abhishek | Crafted with{" "}
          <span className="text-pink-400">♥</span> in Space
        </div>

        {/* Icon Links */}
        <div className="flex gap-5 justify-center text-xl sm:text-2xl">
          <a
            href="mailto:thepixelatedsage@gmail.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-pink-400 transition"
          >
            <FaEnvelope />
          </a>

          <a
            href="https://github.com/Pixelated-Sage"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-purple-400 transition"
          >
            <FaGithub />
          </a>

          <a
            href="https://www.linkedin.com/in/abhishek-sharma-080b2530b/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-blue-400 transition"
          >
            <FaLinkedin />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
