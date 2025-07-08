import React from 'react'
import image from '../../assets/img/img4.png'

// Add this to your public/index.html <head> section:


const Hero_casual = () => {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-white">
      <section className="w-full font-sans flex-1 flex items-center justify-center">
        <div className="relative w-full max-w-7xl mx-auto min-h-screen flex items-center justify-center">
          {/* Content */}
          <div className="flex flex-col sm:flex-row items-center justify-center w-full h-full gap-10">
            {/* Left: Text Content */}
            <div className="flex-1 flex flex-col items-start justify-center text-left">
              <div className="text-black leading-tight mb-4">
                <h1 className="text-3xl font-bold tracking-tight">
                  Hey, I'm
                </h1>
                <span
                  className="block text-4xl sm:text-5xl mt-2"
                  style={{
                    fontFamily: "'Dancing Script', cursive",
                    // color: '#7c3aed', // Tailwind purple-600
                    fontWeight: 700,
                    letterSpacing: '1px',
                  }}
                >
                  Abhishek Sharma
                </span>
              </div>
              <h2 className="text-1xl sm:text-2xl text-purple-400 mb-6">
                AI Enthusiast • Full-Stack Builder • Systems Thinker 
              </h2>
              <p className="text-gray-700 max-w-2xl leading-relaxed text-base sm:text-lg">
                I craft intelligent solutions that merge automation, design, and real-world impact - from <strong>ML-powered tools</strong> to <strong>lightning-fast web apps</strong>.  
                Driven by <strong>curiosity</strong>, executed with <strong>focus</strong>. Currently mastering the art of building AI-native products using Python, React, and LLMs.
              </p>
              <p className="text-sm text-gray-800 mt-4 max-w-xl">
                Let’s talk about creating value — through code, systems, and resilience.
              </p>
              <div className="mt-6 flex gap-4">
                <button
                  className="px-6 py-2 bg-purple-600 hover:bg-purple-700 transition-all duration-300 rounded-lg text-white shadow-md"
                  onClick={() => {
                    document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                >
                  View Projects
                </button>
                <button
                  className="px-6 py-2 border border-gray-300 hover:bg-purple-200 hover:text-purple-800 transition-all duration-300 rounded-lg text-purple-600"
                  onClick={() => {
                    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                >
                  Contact Me
                </button>
              </div>
            </div>
            {/* Right: Image */}
            <div className="flex-1 flex items-center justify-center h-full min-h-screen">
              <img
                src={image}
                alt="Abhishek headshot"
                className="h-full w-auto object-cover shadow-lg "
                style={{ minHeight: '400px', maxHeight: '100vh' }}
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Hero_casual