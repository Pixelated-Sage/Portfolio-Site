import React from 'react'
import image from '../../assets/img/img4.png'

const Hero_casual = () => {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-white">
      <section className="w-full font-sans flex-1 flex items-center justify-center">
        <div className="relative w-full max-w-7xl mx-auto h-[600px] flex items-center justify-center">
          {/* Content */}
          <div className="flex flex-col sm:flex-row items-center justify-center w-full h-full gap-10">
            {/* Left: Text Content */}
            <div className="flex-1 flex flex-col items-start justify-center text-left">
              <h1 className="text-5xl sm:text-6xl font-bold text-black leading-tight mb-4">
                Hey, I'm Abhishek
              </h1>
              <h2 className="text-2xl sm:text-3xl text-purple-400 mb-6">
                AI & Robotics Developer • Tech Organizer • Futurist
              </h2>
              <p className="text-gray-700 max-w-2xl leading-relaxed text-base sm:text-lg">
                I turn ideas into intelligent systems — from ML-powered apps and automation to visual web experiences.
                Currently managing the <strong>Super 60</strong> tech batch, building tools like <strong>SkillMatcher</strong>, and exploring <strong>React + AI</strong> fusion.
              </p>
              <p className="text-sm text-gray-800 mt-2 max-w-xl">
                Talk to me about AI, web systems, or motivation. Inspired by <em>Zoro</em>, I build with focus, creativity, and grit.
              </p>
              <div className="mt-6 flex gap-4">
                <button className="px-6 py-2 bg-purple-600 hover:bg-purple-700 transition-all duration-300 rounded-lg text-white shadow-md">
                  View Projects
                </button>
                <button className="px-6 py-2 border border-white hover:bg-white hover:text-black transition-all duration-300 rounded-lg text-white">
                  Contact Me
                </button>
              </div>
            </div>
            {/* Right: Image */}
            <div className="flex-1 flex items-center justify-center">
              <img
                src= {image}
                alt="Abhishek headshot"
                className="w-78 h-112 object-cover rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Hero_casual