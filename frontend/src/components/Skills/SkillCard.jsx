// components/Skills/SkillCard.jsx
import React from "react";
import { motion } from "framer-motion";

const SkillCard = ({ icon, name }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="group relative p-4 bg-opacity-20 bg-purple-900 backdrop-blur-sm border border-purple-600/30 rounded-xl hover:shadow-purple-400/20 transition-all duration-300 hover:scale-105 cursor-pointer"
    >
      <div className="relative z-10">
        <img src={icon} alt={name} className="w-12 h-12 mx-auto filter drop-shadow-glow" />
        <p className="mt-2 text-center text-white text-sm font-medium">{name}</p>
      </div>

      <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-700 to-pink-600 opacity-0 group-hover:opacity-20 blur-lg rounded-xl transition-opacity duration-300" />
      
      {/* Glowing dots */}
      <div className="absolute -top-1 -right-1 w-2 h-2 bg-purple-400 rounded-full opacity-0 group-hover:opacity-70 transition-opacity duration-300" />
      <div className="absolute -bottom-1 -left-1 w-2 h-2 bg-pink-400 rounded-full opacity-0 group-hover:opacity-70 transition-opacity duration-300" />
    </motion.div>
  );
};

export default SkillCard;
