import React from "react";

const notes = [
  {
    title: "Local LLM Core",
    description: "Detailed documentation and architecture notes of setting up Mistral-7B on your personal machine using llama.cpp + CUDA.",
    repo: "https://github.com/Pixelated-Sage/local-llm-core.git",
    tags: ["LLM", "CUDA", "Mistral", "llama.cpp"],
  },
  {
    title: "ML Learning Vault",
    description: "Curated resources and structured notes for Machine Learning — concepts, algorithms, data pipelines, and more.",
    repo: "https://github.com/Pixelated-Sage/ML-Learning.git",
    tags: ["ML", "NLP","Theory", "Python Libraries"],
  },
  {
    title: "Django Backend Notes",
    description: "All about Django REST Framework, views, serializers, routers, middleware — with project-based examples.",
    repo: "https://github.com/Pixelated-Sage/Django-Backend.git",
    tags: ["Django", "API", "Backend", "DRF"],
  },
  {
    title: "Python DSA Prep",
    description: "Daily practice notes of Data Structures & Algorithms using Python — for interviews and problem-solving.",
    repo: "https://github.com/Pixelated-Sage/python-DSA.git",
    tags: ["Python", "DSA", "Algorithms", "Leetcode"],
  },
];

const NotesSection = () => {
  return (
    <section className="w-full py-20 px-6 md:px-20 bg-white text-black">
      <h2 className="text-4xl md:text-5xl font-bold text-center mb-16">
        Personal Knowledge Vault
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 max-w-7xl mx-auto">
        {notes.map((note, index) => (
          <div
            key={index}
            className="bg-white border border-gray-200 p-6 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300"
          >
            <h3 className="text-xl font-bold text-purple-700 mb-2">{note.title}</h3>
            <p className="text-gray-700 text-sm mb-4">{note.description}</p>

            <div className="flex flex-wrap gap-2 mb-4">
              {note.tags.map((tag, idx) => (
                <span
                  key={idx}
                  className="bg-purple-100 text-purple-800 text-xs px-3 py-1 rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>

            <a
              href={note.repo}
              target="_blank"
              className="text-sm font-medium text-blue-600 hover:underline"
            >
              View Repository →
            </a>
          </div>
        ))}
      </div>
    </section>
  );
};

export default NotesSection;
