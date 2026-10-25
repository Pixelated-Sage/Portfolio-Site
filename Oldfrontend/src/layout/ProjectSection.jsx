import React from "react";
import LLM from "../assets/projectimg/llm.webp";
import ERP from "../assets/projectimg/erp.webp";
import Portfolio from "../assets/projectimg/portfolio.webp";
import { ExternalLink, Github, ArrowRight } from "lucide-react";

const projects = [
  {
    title: "ChatPDF - AI Document Q&A",
    description:
      "A full-stack RAG pipeline processing 100+ page PDFs with cited answers. Features real-time streaming via Server-Sent Events (SSE) and sub-2-second response times.",
    tags: ["Next.js 14", "FastAPI", "LangChain", "ChromaDB", "Gemini Pro"],
    status: "Live",
    image: LLM,
    demo: "https://chat-pdf-neon.vercel.app",
    code: "", // Add repo link if available, otherwise leave empty or use a placeholder
  },
  {
    title: "Super 60 ERP & Event Platform",
    description:
      "Comprehensive ERP system serving 100+ users. Includes real-time collaboration, authentication, user profiles, and an admin dashboard. Mobile-first design.",
    tags: ["React", "Node.js", "MongoDB", "Express.js", "Tailwind CSS"],
    status: "Live",
    image: ERP,
    demo: "https://supersixty.in",
    code: "",
  },
  {
    title: "Stock Market Prediction",
    description:
      "Time-series forecasting for crypto and stocks using LSTM and XGBoost. Includes an ETL pipeline and a FastAPI backend with async endpoints for real-time predictions.",
    tags: ["PyTorch", "LSTM", "XGBoost", "FastAPI", "React Native"],
    status: "ML Project",
    image: Portfolio, // Using Portfolio image as placeholder for Stock Market project
    demo: "",
    code: "",
  },
];

const statusColors = {
  Live: "bg-green-100 text-green-700 border-green-200",
  "ML Project": "bg-blue-100 text-blue-700 border-blue-200",
  Ongoing: "bg-yellow-100 text-yellow-700 border-yellow-200",
};

const ProjectsSection = () => {
  return (
    <section id="projects" className="w-full py-16 sm:py-24 px-4 sm:px-6 md:px-20 bg-white text-black">
      <div className="text-center mb-16">
        <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6 tracking-tight">
          Featured <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600">Projects</span>
        </h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          A showcase of my recent work in AI, Full-Stack Development, and System Architecture.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10 w-full sm:w-[95%] md:w-[90%] mx-auto">
        {projects.map((project, idx) => (
          <div
            key={idx}
            className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:-translate-y-2 flex flex-col"
          >
            <div className="relative overflow-hidden h-52 sm:h-60">
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${statusColors[project.status]} bg-white/90 backdrop-blur-sm border-0`}>
                  {project.status}
                </span>
              </div>
            </div>

            <div className="p-6 sm:p-8 flex flex-col flex-grow">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-2xl font-bold text-gray-900 leading-tight group-hover:text-purple-700 transition-colors">
                  {project.title}
                </h3>
              </div>

              <p className="text-gray-600 text-base mb-6 leading-relaxed flex-grow">
                {project.description}
              </p>

              <div className="flex flex-wrap gap-2 mb-8">
                {project.tags.map((tag, i) => (
                  <span
                    key={i}
                    className="text-xs px-3 py-1.5 bg-gray-50 border border-gray-200 rounded-full text-gray-600 font-medium"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <div className="flex items-center gap-4 mt-auto">
                {project.demo && (
                  <a
                    href={project.demo}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-2 px-4 py-2 bg-gray-900 text-white rounded-lg text-sm font-semibold hover:bg-gray-800 transition-colors"
                  >
                    <ExternalLink className="w-4 h-4" /> Live Demo
                  </a>
                )}
                {project.code && (
                  <a
                    href={project.code}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg text-sm font-semibold hover:bg-gray-50 transition-colors"
                  >
                    <Github className="w-4 h-4" /> Code
                  </a>
                )}
                {!project.demo && !project.code && (
                   <span className="text-sm text-gray-400 italic flex items-center gap-2">
                     In Development <ArrowRight className="w-4 h-4" />
                   </span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ProjectsSection;
