import React from 'react';
import { motion } from 'framer-motion';
import Typewriter from 'typewriter-effect';

const Hero2 = () => {
  return (
    <div className="relative h-screen w-full flex items-center justify-center">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-black">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-500/5 to-transparent opacity-20" />
        <div className="absolute inset-0" 
          style={{
            backgroundImage: `radial-gradient(circle at 50% 50%, rgba(147, 51, 234, 0.1) 0%, transparent 50%)`,
          }}
        />
      </div>

      {/* Main Content Container */}
      <div className="relative w-full h-full flex flex-col items-center justify-center px-4">
        {/* Handwritten Hey I'm */}
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
          className="absolute top-[15%] left-[10%] md:left-[15%] transform -rotate-12"
        >
          <p className="font-dancing-script text-4xl md:text-5xl lg:text-6xl text-purple-300">
            Hey, I'm
          </p>
        </motion.div>

        {/* Animated Name */}
        <div className="w-full max-w-[90vw] md:max-w-[80vw] lg:max-w-[70vw]">
          <svg 
            className="w-full h-auto"
            viewBox="0 0 1000 300"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <linearGradient id="nameGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#9333EA" />
                <stop offset="50%" stopColor="#EC4899" />
                <stop offset="100%" stopColor="#8B5CF6" />
              </linearGradient>
              <filter id="glow">
                <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
                <feMerge>
                  <feMergeNode in="coloredBlur"/>
                  <feMergeNode in="SourceGraphic"/>
                </feMerge>
              </filter>
            </defs>

            {/* Animated Paths for ABHISHEK */}
            <motion.text
              x="50%"
              y="50%"
              textAnchor="middle"
              dominantBaseline="middle"
              className="font-bold text-[8rem]"
              style={{ 
                fill: 'transparent',
                stroke: 'url(#nameGradient)',
                strokeWidth: '2',
                filter: 'url(#glow)'
              }}
              initial={{ opacity: 0, strokeDasharray: 1000, strokeDashoffset: 1000 }}
              animate={{ 
                opacity: 1,
                strokeDashoffset: 0,
                fill: 'rgba(255, 255, 255, 0.1)'
              }}
              transition={{
                strokeDashoffset: { duration: 3, ease: "easeInOut" },
                fill: { duration: 1, delay: 2.5 }
              }}
            >
              ABHISHEK
            </motion.text>
          </svg>
        </div>

        {/* Typewriter Effect */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 3 }}
          className="mt-8 text-purple-300 text-xl md:text-2xl font-orbitron"
        >
          <Typewriter
            options={{
              strings: [
                'Full Stack Developer',
                'AI/ML Explorer',
                'Creative Coder',
                'Tech Enthusiast'
              ],
              autoStart: true,
              loop: true,
              delay: 50,
              deleteSpeed: 30,
              pauseFor: 1500,
            }}
          />
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0, y: 0 }}
          animate={{ opacity: 1, y: [0, 10, 0] }}
          transition={{ 
            delay: 4,
            duration: 1.5,
            repeat: Infinity,
            repeatType: "reverse"
          }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <div className="w-6 h-10 border-2 border-purple-400 rounded-full p-1">
            <div className="w-2 h-2 bg-purple-400 rounded-full mx-auto" />
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Hero2;