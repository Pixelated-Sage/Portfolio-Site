import React from 'react'
import image from '../../assets/img/img4.webp'

import "../../styles/theme.css"

const Hero_pencil = () => {
  return (
    <div className="bg-bg min-h-screen flex flex-col justify-center items-center px-4 sm:px-0">
      <section className="w-full font-sans flex-1 flex items-center justify-center">
        <div className="relative w-full max-w-7xl mx-auto min-h-screen flex items-center justify-center">
          {/* Content */}
          <div className="flex flex-col-reverse sm:flex-row items-center justify-center w-full h-full gap-10 sm:gap-16 py-10 sm:py-0">
            {/* Left: Text Content */}
            <div className="flex-1 flex flex-col items-center sm:items-start justify-center text-center sm:text-left">
              <div className="text-heading leading-tight mb-4">
                <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-heading">
                  Hey, I'm
                </h1>
                <span
                  className="block text-3xl sm:text-5xl mt-2 text-primary"
                  style={{
                    fontFamily: "'Dancing Script', cursive",
                    fontWeight: 700,
                    letterSpacing: '1px',
                  }}
                >
                  Abhishek Sharma
                </span>
              </div>
              <h2 className="text-md sm:text-2xl text-subheading mb-4 sm:mb-6">
                AI Enthusiast • Full-Stack Builder • Systems Thinker
              </h2>
              <p className="text-text max-w-xl leading-relaxed text-sm sm:text-lg px-2 sm:px-0">
                I craft intelligent solutions that merge automation, design, and real-world impact —
                from <strong>ML-powered tools</strong> to <strong>lightning-fast web apps</strong>.
                Driven by <strong>curiosity</strong>, executed with <strong>focus</strong>. Currently
                mastering the art of building AI-native products using Python, React, and LLMs.
              </p>
              <p className="text-sm text-text mt-4 max-w-md px-2 sm:px-0">
                Let’s talk about creating value — through code, systems, and resilience.
              </p>
              <div className="mt-6 flex flex-col sm:flex-row gap-4 w-full sm:w-auto items-center sm:items-start">
                <button
                  className="px-6 py-2 bg-primary hover:bg-secondary transition-all duration-300 rounded-lg text-white shadow-md w-full sm:w-auto"
                  onClick={() => {
                    document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                >
                  View Projects
                </button>
                <button
                  className="px-6 py-2 border border-border hover:bg-accent hover:text-white transition-all duration-300 rounded-lg text-primary w-full sm:w-auto"
                  onClick={() => {
                    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                >
                  Contact Me
                </button>
              </div>
            </div>

            {/* Right: Image */}
            <div className="flex-1 flex items-center justify-center h-auto sm:min-h-screen">
              <img
                src={image}
                alt="Abhishek headshot"
                className="w-64 h-86 sm:h-178 sm:w-auto object-cover rounded-xl shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Hero_pencil
