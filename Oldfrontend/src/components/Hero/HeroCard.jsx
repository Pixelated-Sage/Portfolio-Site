import React from 'react';
import { motion } from 'framer-motion';
import Typewriter from 'typewriter-effect';
import LottieAstronaut from '../Animations/LottieAstronaut';
import MagneticHover from '../CursorEffects/MagneticHover';

const HeroCard = () => {
  return (
    <section className="relative w-full h-screen flex items-center justify-center overflow-hidden">
      <MagneticHover />

      {/* Container that holds both SVG and Content */}
      <div className="relative w-[90%] h-[80vh] max-w-7xl mx-auto">
        {/* Background SVG */}
        <svg
          viewBox="50 250 750 300"
          xmlns="http://www.w3.org/2000/svg"
          className="absolute inset-0  w-full h-full"
          preserveAspectRatio="xMidYMid meet"
        >
          <defs>
            <linearGradient id="gradient" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="rgba(45, 47, 54, 0.5)" />
              <stop offset="100%" stopColor="rgba(30, 30, 47, 0.5)" />
            </linearGradient>
          </defs>
          <path
            d="
            M 100 250 
            C 150 250 400 250 500 250 
            Q 600 250 600 250 
            C 650 250 600 300 700 300 
            C 750 300 750 300 750 350 
            L 750 500 
            Q 750 550 700 550 
            C 500 550 250 550 200 550 
            C 150 550 200 500 100 500 
            Q 50 500 50 450 
            L 50 300 
            Q 50 250 100 250
            "
            fill="url(#gradient)"
            className="mix-blend-overlay"
          />
        </svg>

        {/* Content Container - Now positioned relative to the container div */}
        <div className="relative z-10 h-full flex flex-col-reverse lg:flex-row items-center justify-center px-6 lg:px-12">
          {/* Left Content */}
          <div className="w-full -mt-20 lg:w-1/2 flex flex-col justify-center items-start space-y-6 pt-10 lg:pt-0">
            {/* Title */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="w-full"
            >
              <h1 className="text-3xl sm:text-5xl lg:text-7xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-500 to-blue-400 drop-shadow-lg font-dancing-script">
                Hey I'm{" "}
                <span className="font-['Pacifico'] block sm:inline">
                  Abhishek
                </span>
              </h1>
            </motion.div>

            {/* Typewriter */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="text-lg sm:text-xl lg:text-2xl text-gray-300"
            >
              <Typewriter
                options={{
                  strings: [
                    'Full Stack Learner',
                    'AI/ML Explorer',
                    'React Enthusiast',
                    'Portfolio in the making'
                  ],
                  autoStart: true,
                  loop: true,
                  delay: 50,
                  deleteSpeed: 30,
                  pauseFor: 1500,
                }}
              />
            </motion.div>

            {/* Tagline */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1, duration: 0.8 }}
              className="text-sm sm:text-base lg:text-lg text-gray-400 max-w-xl font-['orbitron']"
            >
              Blending technology with creativity — coding by day, dreaming like Zoro by night.
            </motion.p>

            {/* Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.5, duration: 0.8 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <button className="px-6 py-2 sm:px-8 sm:py-3 bg-purple-600 hover:bg-purple-700 transition-all duration-300 rounded-lg text-white text-base sm:text-lg shadow-lg hover:scale-105">
                View Projects
              </button>
              <button className="px-6 py-2 sm:px-8 sm:py-3 border-2 border-white hover:bg-white/10 transition-all duration-300 rounded-lg text-white text-base sm:text-lg hover:scale-105">
                Contact Me
              </button>
            </motion.div>
          </div>

            {/* Right: Astronaut */}
          <div className='w-full lg:w-1/2 flex justify-center items-center'>      
            <motion.div
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.8, duration: 1 }}
              className="flex justify-center items-center -mb-45 lg:pb-0"
            >
              <div className="w-[200px] sm:w-[250px] lg:w-[400px]">
                <LottieAstronaut />
              </div>
            </motion.div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, y: [0, 10, 0] }}
          transition={{ 
            delay: 2,
            duration: 1.5,
            repeat: Infinity,
            repeatType: "reverse"
          }}
          className="absolute -bottom-10 left-1/2 transform -translate-x-1/2"
        >
          <div className="w-6 h-10 border-2 border-purple-400 rounded-full p-1">
            <div className="w-2 h-2 bg-purple-400 rounded-full mx-auto animate-bounce" />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroCard;
