import React from 'react';
import { Code, Database, Palette, Users, Brain, Terminal, Server } from 'lucide-react';

const SkillsSection = () => {
  const skillCategories = [
    {
      title: 'Languages',
      icon: <Terminal className="w-6 h-6" />,
      skills: [
        'Python', 'JavaScript', 'TypeScript', 'C++', 'SQL', 'Bash'
      ]
    },
    {
      title: 'Frontend',
      icon: <Code className="w-6 h-6" />,
      skills: [
        'Next.js', 'React', 'React Native', 'Tailwind CSS'
      ]
    },
    {
      title: 'Backend',
      icon: <Server className="w-6 h-6" />,
      skills: [
        'FastAPI', 'Node.js', 'Express.js', 'REST APIs', 'WebSockets'
      ]
    },
    {
      title: 'AI / ML',
      icon: <Brain className="w-6 h-6" />,
      skills: [
        'PyTorch', 'LangChain', 'RAG', 'sentence-transformers', 'LSTM', 'XGBoost', 'Gemini API'
      ]
    },
    {
      title: 'Databases',
      icon: <Database className="w-6 h-6" />,
      skills: [
        'PostgreSQL', 'MongoDB', 'SQLite', 'ChromaDB'
      ]
    },
    {
      title: 'DevOps & Tools',
      icon: <Users className="w-6 h-6" />, // Using Users as a placeholder for DevOps/Team tools, or could import another icon
      skills: [
        'Docker', 'Git', 'Vercel', 'Railway', 'Linux (Arch)', 'GCP'
      ]
    }
  ];

  return (
    <section id="skills" className="py-16 sm:py-24 px-4 sm:px-6 w-full bg-slate-50 relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute -top-[20%] -right-[10%] w-[50%] h-[50%] bg-purple-200/30 rounded-full blur-3xl"></div>
        <div className="absolute top-[30%] -left-[10%] w-[40%] h-[40%] bg-blue-200/30 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 text-center mb-12 sm:mb-16">
        <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6 tracking-tight">
          Technical <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-600">Arsenal</span>
        </h2>
        <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto px-4 leading-relaxed">
          From crafting pixel-perfect frontends to architecting scalable AI pipelines, I bring a full spectrum of technical expertise to every project.
        </p>
      </div>

      <div className="relative z-10 grid gap-6 sm:gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 w-full sm:w-[95%] md:w-[85%] mx-auto">
        {skillCategories.map((category, index) => (
          <div
            key={index}
            className="group bg-white/70 backdrop-blur-xl rounded-2xl p-6 shadow-lg hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 border border-white/50"
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="p-3 bg-gradient-to-br from-purple-500 to-blue-500 rounded-xl text-white shadow-lg group-hover:scale-110 transition-transform duration-300">
                {category.icon}
              </div>
              <h3 className="text-xl font-bold text-gray-900 tracking-tight">
                {category.title}
              </h3>
            </div>

            <div className="flex flex-wrap gap-2.5">
              {category.skills.map((skill, skillIndex) => (
                <span
                  key={skillIndex}
                  className="px-3 py-1.5 bg-white border border-gray-200 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-50 hover:border-purple-300 hover:text-purple-700 transition-all duration-200 shadow-sm"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default SkillsSection;
