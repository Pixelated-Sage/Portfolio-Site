import React from "react";
import { BookOpen, ExternalLink, Database, Brain, Code, Server } from "lucide-react";

const notes = [
  {
    title: "Local LLM Core",
    description:
      "Detailed documentation and architecture notes of setting up Mistral-7B on your personal machine using llama.cpp + CUDA.",
    repo: "https://github.com/Pixelated-Sage/local-llm-core.git",
    tags: ["LLM", "CUDA", "Mistral", "llama.cpp"],
    icon: <Brain className="w-5 h-5 text-purple-600" />,
  },
  {
    title: "ML Learning Vault",
    description:
      "Curated resources and structured notes for Machine Learning — concepts, algorithms, data pipelines, and more.",
    repo: "https://github.com/Pixelated-Sage/ML-Learning.git",
    tags: ["ML", "NLP", "Theory", "Python Libraries"],
    icon: <Database className="w-5 h-5 text-blue-600" />,
  },
  {
    title: "Django Backend Notes",
    description:
      "All about Django REST Framework, views, serializers, routers, middleware — with project-based examples.",
    repo: "https://github.com/Pixelated-Sage/Django-Backend.git",
    tags: ["Django", "API", "Backend", "DRF"],
    icon: <Server className="w-5 h-5 text-green-600" />,
  },
  {
    title: "Python DSA Prep",
    description:
      "Daily practice notes of Data Structures & Algorithms using Python — for interviews and problem-solving.",
    repo: "https://github.com/Pixelated-Sage/python-DSA.git",
    tags: ["Python", "DSA", "Algorithms", "Leetcode"],
    icon: <Code className="w-5 h-5 text-orange-600" />,
  },
];

const NotesSection = () => {
  return (
    <section id="notes" className="w-full py-16 sm:py-24 px-4 sm:px-6 md:px-20 bg-slate-50 text-black">
      <div className="text-center mb-16">
        <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6 tracking-tight">
          Knowledge <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-indigo-600">Vault</span>
        </h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          "I believe in learning in public." — A collection of my technical notes, documentation, and research.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6 sm:gap-8 max-w-6xl mx-auto">
        {notes.map((note, index) => (
          <div
            key={index}
            className="group bg-white border border-gray-100 p-6 sm:p-8 rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-20 transition-opacity transform group-hover:scale-150 duration-500">
                {note.icon}
            </div>
            
            <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-gray-50 rounded-lg group-hover:bg-gray-100 transition-colors">
                    {note.icon}
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-gray-900 group-hover:text-purple-700 transition-colors">
                {note.title}
                </h3>
            </div>
            
            <p className="text-gray-600 text-base mb-6 leading-relaxed relative z-10">
              {note.description}
            </p>

            <div className="flex flex-wrap gap-2 mb-6 relative z-10">
              {note.tags.map((tag, idx) => (
                <span
                  key={idx}
                  className="bg-gray-50 border border-gray-200 text-gray-600 text-xs px-3 py-1 rounded-lg font-medium"
                >
                  {tag}
                </span>
              ))}
            </div>

            <a
              href={note.repo}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm font-semibold text-purple-600 hover:text-purple-800 transition-colors relative z-10"
            >
              <BookOpen className="w-4 h-4" /> View Repository <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        ))}
      </div>
    </section>
  );
};

export default NotesSection;
