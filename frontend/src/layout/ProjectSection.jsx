import React from "react";
import LLM from "../assets/projectimg/llm.webp";
import ERP from "../assets/projectimg/erp.webp";
import Portfolio from "../assets/projectimg/portfolio.webp"
const projects = [
  {
    title: "Local LLM Chatbot",
    description:
      "Built a fully local chatbot system using Mistral-7B, llama.cpp, CUDA (GTX 1650), memory logs, and prompt injection architecture. Fast, offline and ChatGPT-style.",
    tags: ["Python", "C++", "CUDA", "llama.cpp", "Fedora"],
    status: "Completed",
    image: LLM,
    demo: "",
    code: "https://github.com/Pixelated-Sage/local-llm-core",
  },
  {
    title: "ERP 2.0",
    description:
      "A redesigned version of college ERP with responsive UI, real-time updates, and feature enhancements for a modern student workflow.",
    tags: ["React", "Firebase", "Tailwind"],
    status: "Completed",
    image: ERP,
    demo: "",
    code: "https://github.com/Pixelated-Sage/ERP_Inhanced.git",
  },
  {
    title: "React Portfolio Website",
    description:
      "Responsive personal portfolio built with React, Tailwind, and animations. Modular sections, scalable, and deployment-ready.",
    tags: ["React", "Tailwind", "Vercel"],
    status: "Ongoing",
    image: Portfolio,
    demo: "https://yourdomain.vercel.app",
    code: "https://github.com/Pixelated-Sage/portfolio-site",
  },

];

const statusColors = {
  Completed: "text-green-600 border-green-300 bg-green-50",
  Ongoing: "text-yellow-700 border-yellow-400 bg-yellow-50",
  Planned: "text-gray-500 border-gray-300 bg-gray-100",
};

const ProjectsSection = () => {
  return (
    <section id="projects" className=" w-full py-24 px-6 md:px-20 bg-white text-black">
      <h2 className="text-4xl md:text-5xl font-bold text-center mb-16">
        Projects
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 w-[88%] mx-auto">
        {projects.map((project, idx) => (
          <div
            key={idx}
            className="bg-white border border-gray-200 p-6 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 group relative flex flex-col justify-between"
          >
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-44 object-cover rounded-lg mb-4 border border-gray-100"
            />

            <div className="flex justify-between items-center mb-2">
              <h3 className="text-xl font-semibold text-gray-900">
                {project.title}
              </h3>
              <span
                className={`text-xs px-3 py-1 rounded-full border font-medium ${statusColors[project.status]}`}
              >
                {project.status}
              </span>
            </div>

            <p className="text-gray-700 text-sm mb-4 leading-relaxed">
              {project.description}
            </p>

            <div className="flex flex-wrap gap-2 mb-4">
              {project.tags.map((tag, i) => (
                <span
                  key={i}
                  className="text-xs px-2.5 py-1 bg-gray-100 border border-gray-300 rounded-full text-gray-700"
                >
                  {tag}
                </span>
              ))}
            </div>

            <div className="mt-auto flex gap-4">
              {project.demo && (
                <a
                  href={project.demo}
                  target="_blank"
                  rel="noreferrer"
                  className="text-sm text-blue-600 hover:underline"
                >
                  Live Demo
                </a>
              )}
              {project.code && (
                <a
                  href={project.code}
                  target="_blank"
                  rel="noreferrer"
                  className="text-sm text-purple-600 hover:underline"
                >
                  Source Code
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ProjectsSection;
