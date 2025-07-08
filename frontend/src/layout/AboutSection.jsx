import React from "react";
import Lottie from "lottie-react";
import thinkingAnimation from "../assets/lottie/thingking.json";

const AboutSection = () => {
  return (
    <section className="w-full flex justify-center items-center py-10 sm:py-20 px-4 bg-white">
      <div className="w-full sm:w-[90%] md:w-[80%] max-w-[1920px] bg-white/90 rounded-2xl shadow-2xl border border-gray-200 backdrop-blur-lg flex flex-col-reverse md:flex-row items-center p-6 sm:p-10 md:p-12 gap-10 sm:gap-12">
        {/* Left: Content (80%) */}
        <div className="w-full md:flex-[8] flex flex-col justify-center items-start text-left">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4 sm:mb-6">About Me</h2>
          <p className="text-gray-800 text-base sm:text-lg mb-4 leading-relaxed">
            I’m <span className="font-semibold">Abhishek Sharma</span> — an AI and systems developer who believes in building with intention and executing with clarity.
          </p>
          <p className="text-gray-700 text-sm sm:text-base mb-4 leading-relaxed">
            I’ve led college-scale programs, automated workflows, trained local LLMs, and built web systems that connect skills to outcomes. From offline ChatGPT clones to project dashboards and React-based portals — I work across the full stack with a machine-mindset and a creative heart.
          </p>
          <p className="text-gray-700 text-sm sm:text-base mb-4 leading-relaxed">
            I’m not here to build noise — I build tools that solve, scale, and serve. Inspired by Zoro’s silence and focus, I believe in self-reliance, learning in public, and putting power in the hands of builders.
          </p>
          <div className="mb-4 sm:mb-6">
            <span className="inline-block text-lg sm:text-xl mb-2"><span className="font-semibold">Currently working with:</span></span>
            <div className="flex flex-wrap gap-2 mt-2">
              {[
                "Python", "React.js", "Django", "Tailwind", "Llama.cpp",
                "Pandas", "Obsidian", "GitHub", "Fedora"
              ].map((tech) => (
                <span
                  key={tech}
                  className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-xs sm:text-sm font-medium"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
          <p className="text-gray-800 text-sm sm:text-base mt-2">
            Let’s connect if you’re building something worth sweating for.
          </p>
        </div>

        {/* Right: Lottie Animation (20%) */}
        <div className="w-full md:flex-[2] flex justify-center items-center mb-8 md:mb-0">
          <Lottie
            animationData={thinkingAnimation}
            loop
            className="w-52 h-52 sm:w-64 sm:h-64 md:w-[22rem] md:h-[22rem]"
          />
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
