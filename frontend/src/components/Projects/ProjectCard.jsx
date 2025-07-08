// components/Projects/ProjectCard.jsx
import React from "react";

const ProjectCard = ({ title, description, image, tech, github, demo }) => {
  return (
    <div className="bg-[#0d1025] border border-purple-700 rounded-xl overflow-hidden shadow-lg hover:shadow-pink-500/30 transition-all duration-300 group">
      <img src={image} alt={title} className="w-full h-40 object-cover group-hover:scale-105 transition-transform duration-300" />

      <div className="p-4">
        <h3 className="text-xl font-semibold text-white mb-2">{title}</h3>
        <p className="text-sm text-gray-300 mb-3">{description}</p>

        <div className="flex flex-wrap gap-2 mb-4">
          {tech.map((item, idx) => (
            <span key={idx} className="bg-purple-800/50 text-xs text-white px-2 py-1 rounded-full">
              {item}
            </span>
          ))}
        </div>

        <div className="flex gap-4">
          {github && (
            <a href={github} target="_blank" className="text-sm text-blue-400 hover:underline">
              GitHub
            </a>
          )}
          {demo && (
            <a href={demo} target="_blank" className="text-sm text-green-400 hover:underline">
              Live Demo
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
