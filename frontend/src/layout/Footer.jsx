import React from "react";
import { FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full py-8 px-4 bg-gradient-to-b from-[#0b0d1a] via-black to-black text-gray-300 text-center relative z-10">
      <div className="flex flex-col md:flex-row items-center justify-between max-w-5xl mx-auto gap-4">
        <div className="text-lg font-orbitron tracking-wider">
          © {currentYear} Abhishek | Crafted with{" "}
          <span className="text-pink-400">♥</span> in Space
        </div>

        <div className="flex gap-6 justify-center mt-2 md:mt-0 text-2xl">
          {/* ✅ EMAIL – this works everywhere */}
          <a
            href="mailto:thepixelatedsage@gmail.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-pink-400 transition"
          >
            <FaEnvelope />
          </a>

          {/* ✅ GitHub – no change needed */}
          <a
            href="https://github.com/Pixelated-Sage"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-purple-400 transition"
          >
            <FaGithub />
          </a>

          {/* ✅ LinkedIn – fully working */}
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
