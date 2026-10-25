import React from "react";
import { Mail, Github, Linkedin, ArrowUpRight } from "lucide-react";

const ContactSection = () => {
  return (
    <section id="contact" className="contact w-full py-20 px-6 md:px-20 bg-white text-black border-t border-gray-100 relative overflow-hidden">
        {/* Background blobs */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-50 rounded-full blur-3xl -z-10 opacity-50"></div>

      <div className="max-w-4xl mx-auto text-center relative z-10">
        <h2 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight text-gray-900">Let's Connect</h2>
        <p className="text-gray-600 text-lg mb-12 max-w-2xl mx-auto leading-relaxed">
          Whether it's collaborating on an AI project, discussing dev tools, or
          just geeking out over tech — I'm always open to meaningful connections.
        </p>

        <div className="flex justify-center items-center gap-4 sm:gap-6 flex-wrap">
          <a
            href="mailto:thepixelatedsage@gmail.com"
            className="flex items-center gap-3 px-6 py-3 bg-white border border-gray-200 rounded-xl hover:border-purple-500 hover:text-purple-700 hover:shadow-lg transition-all duration-300 group"
          >
            <div className="p-2 bg-gray-50 rounded-lg group-hover:bg-purple-50 transition-colors">
                <Mail size={20} className="text-gray-600 group-hover:text-purple-600" />
            </div>
            <span className="font-medium">Email</span>
          </a>

          <a
            href="https://github.com/Pixelated-Sage"
            target="_blank"
            className="flex items-center gap-3 px-6 py-3 bg-white border border-gray-200 rounded-xl hover:border-gray-800 hover:text-gray-900 hover:shadow-lg transition-all duration-300 group"
          >
             <div className="p-2 bg-gray-50 rounded-lg group-hover:bg-gray-100 transition-colors">
                <Github size={20} className="text-gray-600 group-hover:text-gray-900" />
            </div>
            <span className="font-medium">GitHub</span>
            <ArrowUpRight size={16} className="text-gray-400 group-hover:text-gray-900 opacity-0 group-hover:opacity-100 transition-opacity" />
          </a>

          <a
            href="https://www.linkedin.com/in/abhishek-sharma-080b2530b/"
            target="_blank"
            className="flex items-center gap-3 px-6 py-3 bg-white border border-gray-200 rounded-xl hover:border-blue-600 hover:text-blue-700 hover:shadow-lg transition-all duration-300 group"
          >
             <div className="p-2 bg-gray-50 rounded-lg group-hover:bg-blue-50 transition-colors">
                <Linkedin size={20} className="text-gray-600 group-hover:text-blue-600" />
            </div>
            <span className="font-medium">LinkedIn</span>
             <ArrowUpRight size={16} className="text-gray-400 group-hover:text-blue-700 opacity-0 group-hover:opacity-100 transition-opacity" />
          </a>
        </div>

        <p className="text-sm text-gray-400 mt-16 font-medium">
          © 2026 Abhishek Sharma. Driven by Code & Coffee.
        </p>
      </div>
    </section>
  );
};

export default ContactSection;
