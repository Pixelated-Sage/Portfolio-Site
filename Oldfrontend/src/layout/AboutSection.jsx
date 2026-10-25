import React from "react";
import Lottie from "lottie-react";
import thinkingAnimation from "../assets/lottie/thingking.json";
import { Download, Terminal, Cpu, Globe } from "lucide-react";

const AboutSection = () => {
  return (
    <section id="about" className="w-full flex justify-center items-center py-16 sm:py-24 px-4 bg-white relative overflow-hidden">
        {/* Background blobs */}
        <div className="absolute top-0 left-0 w-64 h-64 bg-purple-100 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-blue-100 rounded-full blur-3xl translate-x-1/2 translate-y-1/2"></div>

      <div className="w-full sm:w-[95%] md:w-[85%] max-w-7xl bg-white/80 rounded-3xl shadow-2xl border border-gray-100 backdrop-blur-xl flex flex-col-reverse md:flex-row items-center p-8 sm:p-12 gap-12 sm:gap-16 relative z-10">
        
        {/* Left: Content */}
        <div className="w-full md:flex-[1.2] flex flex-col justify-center items-start text-left">
          <div className="flex items-center gap-2 mb-4">
             <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm font-medium">About Me</span>
          </div>
          
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
             Building the Bridge Between <br className="hidden lg:block"/>
             <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-600">Complex AI & User Experience</span>
          </h2>
          
          <p className="text-gray-700 text-base sm:text-lg mb-6 leading-relaxed">
            I’m <span className="font-semibold text-gray-900">Abhishek Sharma</span>, a Final Year CSE Student and Full-Stack Developer specializing in <span className="text-purple-700 font-medium">AI Integration</span>. My work sits at the intersection of robust backend systems and intuitive, high-performance fontends.
          </p>
          
          <p className="text-gray-600 text-base sm:text-lg mb-8 leading-relaxed">
            I don't just write code; I engineer solutions. From deploying production-ready <strong>RAG pipelines</strong> in record time to leading agile teams delivering <strong>enterprise ERP systems</strong>, I thrive on solving hard problems with clean, scalable architecture. I'm a self-taught practitioner who values speed, precision, and the power of open source.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8 w-full">
              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg border border-gray-100">
                  <Cpu className="text-purple-600 w-5 h-5" />
                  <span className="text-gray-700 font-medium">AI/ML Integration</span>
              </div>
              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg border border-gray-100">
                  <Globe className="text-blue-600 w-5 h-5" />
                  <span className="text-gray-700 font-medium">Full-Stack Architecture</span>
              </div>
              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg border border-gray-100">
                  <Terminal className="text-green-600 w-5 h-5" />
                  <span className="text-gray-700 font-medium">System Optimization</span>
              </div>
          </div>
          
          <button className="flex items-center gap-2 px-6 py-3 bg-gray-900 hover:bg-gray-800 text-white rounded-xl font-semibold transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-1">
            <Download className="w-4 h-4" /> Download Resume
          </button>
        </div>

        {/* Right: Lottie Animation */}
        <div className="w-full md:flex-[0.8] flex justify-center items-center">
          <div className="relative w-full max-w-[400px]">
             <div className="absolute inset-0 bg-gradient-to-br from-purple-200 to-blue-200 rounded-full blur-3xl opacity-50"></div>
             <Lottie
                animationData={thinkingAnimation}
                loop
                className="w-full h-auto relative z-10"
              />
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
