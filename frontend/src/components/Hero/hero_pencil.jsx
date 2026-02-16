import React from 'react'
import image from '../../assets/img/img4.webp'
import { ArrowRight, Code, Cpu } from 'lucide-react'
import "../../styles/theme.css"

const Hero_pencil = () => {
  return (
    <div className="bg-bg min-h-screen flex flex-col justify-center items-center px-4 sm:px-0 relative overflow-hidden">
       {/* Background gradients */}
       <div className="absolute top-0 right-0 w-[50%] h-[50%] bg-purple-100/40 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 md:translate-x-0"></div>
       <div className="absolute bottom-0 left-0 w-[50%] h-[50%] bg-blue-100/40 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2 md:translate-x-0"></div>

      <section className="w-full font-sans flex-1 flex items-center justify-center relative z-10">
        <div className="relative w-full max-w-7xl mx-auto min-h-screen flex items-center justify-center">
          {/* Content */}
          <div className="flex flex-col-reverse sm:flex-row items-center justify-center w-full h-full gap-10 sm:gap-16 py-10 sm:py-0">
            {/* Left: Text Content */}
            <div className="flex-1 flex flex-col items-center sm:items-start justify-center text-center sm:text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 border border-slate-200 text-slate-700 text-sm font-medium mb-6 animate-fade-in-up">
                  <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                  Available for new opportunities
              </div>
              
              <div className="text-heading leading-tight mb-4">
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-heading">
                  Hello, I'm
                </h1>
                <span
                  className="block text-5xl sm:text-7xl mt-2 text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-600 pb-2"
                  style={{
                    fontFamily: "'Dancing Script', cursive",
                    fontWeight: 700,
                  }}
                >
                  Abhishek Sharma
                </span>
              </div>
              
              <h2 className="text-xl sm:text-2xl md:text-3xl font-medium text-gray-700 mb-6 flex flex-col sm:flex-row gap-2 items-center">
                <span>Full-Stack Developer</span>
                <span className="hidden sm:inline text-gray-400">|</span>
                <span className="text-purple-600">AI Integration Engineer</span>
              </h2>
              
              <p className="text-gray-600 max-w-xl leading-relaxed text-base sm:text-lg px-2 sm:px-0 mb-8">
                I build high-performance web systems and integrate intelligent agents to solve real-world problems. 
                Focusing on <span className="font-semibold text-gray-900">React, FastAPI, and RAG Pipelines</span> to deliver scalable solutions.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto items-center sm:items-start">
                <button
                  className="group px-8 py-3 bg-gray-900 hover:bg-gray-800 transition-all duration-300 rounded-xl text-white shadow-lg shadow-purple-900/20 w-full sm:w-auto flex items-center justify-center gap-2"
                  onClick={() => {
                    document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                >
                  <Code className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                  View Projects
                </button>
                <button
                  className="group px-8 py-3 border border-gray-300 hover:border-purple-300 hover:bg-purple-50 transition-all duration-300 rounded-xl text-gray-700 hover:text-purple-700 w-full sm:w-auto flex items-center justify-center gap-2"
                  onClick={() => {
                    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                >
                  Contact Me
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
              
              {/* Tech Stack Preview */}
              <div className="mt-12 flex items-center gap-6 text-gray-400 grayscale hover:grayscale-0 transition-all duration-500">
                  {/* You can allow icons here later if needed */}
              </div>
            </div>

            {/* Right: Image */}
            <div className="flex-1 flex items-center justify-center h-auto">
              <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-tr from-purple-600 to-blue-600 rounded-2xl blur-2xl opacity-20 transform rotate-6 scale-95"></div>
                  <img
                    src={image}
                    alt="Abhishek Sharma"
                    className="relative w-72 sm:w-80 md:w-96 h-auto object-cover rounded-2xl shadow-2xl border-4 border-white transform hover:-rotate-2 transition-transform duration-500"
                  />
                  
                  {/* Floating badges */}
                  <div className="absolute -right-6 top-10 bg-white p-3 rounded-xl shadow-lg border border-gray-100 flex items-center gap-3 animate-float-slow hidden sm:flex">
                      <div className="bg-green-100 p-2 rounded-lg">
                          <Cpu className="text-green-600 w-6 h-6" />
                      </div>
                      <div>
                          <p className="text-xs text-gray-500 font-medium">Specialized in</p>
                          <p className="text-sm font-bold text-gray-800">RAG Pipelines</p>
                      </div>
                  </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Hero_pencil
