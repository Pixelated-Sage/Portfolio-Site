import React from "react";
import { Trophy, GitCommit, Rocket, Terminal, Star } from "lucide-react";

const achievements = [
  {
    title: "RAG Sprint Champion",
    description: "Built and deployed a production-grade RAG application in a 24-hour sprint with zero infrastructure cost.",
    icon: <Rocket className="w-8 h-8 text-white" />,
    color: "from-orange-500 to-red-500",
  },
  {
    title: "Open Source Contributor",
    description: "467+ GitHub contributions in the last year. Authored comprehensive technical documentation for all major projects.",
    icon: <GitCommit className="w-8 h-8 text-white" />,
    color: "from-green-500 to-emerald-500",
  },
  {
    title: "Self-Taught Architect",
    description: "Mastered RAG pipelines, vector embeddings, Async Python, FastAPI, and Cloud Architecture through independent research.",
    icon: <Star className="w-8 h-8 text-white" />,
    color: "from-purple-500 to-indigo-500",
  },
  {
    title: "System Power User",
    description: "Arch Linux daily driver with custom automation scripts. Proficient in Docker containerization and system optimization.",
    icon: <Terminal className="w-8 h-8 text-white" />,
    color: "from-blue-500 to-cyan-500",
  },
];

const CertificationsSection = () => {
  return (
    <section id="achievements" className="w-full py-16 sm:py-24 px-4 sm:px-6 md:px-20 bg-white text-black">
      <div className="text-center mb-16">
        <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6 tracking-tight">
          Key <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 to-orange-500">Achievements</span>
        </h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Milestones that define my technical journey and dedication to excellence.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 max-w-5xl mx-auto">
        {achievements.map((achievement, index) => (
          <div
            key={index}
            className="group bg-white border border-gray-100 rounded-2xl p-6 sm:p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex items-start gap-6"
          >
            <div className={`p-4 rounded-xl bg-gradient-to-br ${achievement.color} shadow-lg group-hover:scale-110 transition-transform duration-300 shrink-0`}>
              {achievement.icon}
            </div>
            
            <div>
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">
                {achievement.title}
              </h3>
              <p className="text-gray-600 text-base leading-relaxed">
                {achievement.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default CertificationsSection;
