import React from "react";
import { Mail, Github, Linkedin } from "lucide-react";

const ContactSection = () => {
  return (
    <section id="contact" className="contact w-full py-20 px-6 md:px-20 bg-white text-black border-t border-gray-200">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-4xl md:text-5xl font-bold mb-6">Let's Connect</h2>
        <p className="text-gray-700 text-lg mb-10">
          Whether it's collaborating on an AI project, discussing dev tools, or
          just geeking out over tech — I'm always open to meaningful connections.
        </p>

        <div className="flex justify-center items-center gap-6 flex-wrap">
          <a
            href="mailto:thepixelatedsage@gmail.com"
            className="flex items-center gap-2 text-gray-800 hover:text-purple-700 transition"
          >
            <Mail size={20} />
            <span>Email</span>
          </a>

          <a
            href="https://github.com/Pixelated-Sage"
            target="_blank"
            className="flex items-center gap-2 text-gray-800 hover:text-purple-700 transition"
          >
            <Github size={20} />
            <span>GitHub</span>
          </a>

          <a
            href="https://www.linkedin.com/in/abhishek-sharma-080b2530b/"
            target="_blank"
            className="flex items-center gap-2 text-gray-800 hover:text-purple-700 transition"
          >
            <Linkedin size={20} />
            <span>LinkedIn</span>
          </a>
        </div>

        <p className="text-sm text-gray-400 mt-10">
          Portfolio handcrafted by Abhishek Sharma – 2025
        </p>
      </div>
    </section>
  );
};

export default ContactSection;
