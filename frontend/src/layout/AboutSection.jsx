import React from 'react';
import { Code, Database, Palette, Users, Brain } from 'lucide-react';

const SkillSection = () => {
  const skillCategories = [
    {
      title: 'Frontend Development',
      icon: <Code className="w-6 h-6" />,
      skills: [
        'HTML', 'CSS', 'Tailwind CSS', 'JavaScript', 'React.js',
        'Next.js (Learning)', 'Vite', 'GSAP', 'Firebase (Basics)',
        'Figma (UI Design)'
      ]
    },
    {
      title: 'Backend & Systems',
      icon: <Database className="w-6 h-6" />,
      skills: [
        'Python', 'C++', 'SQL (Basics)', 'Django', 'Django REST Framework',
        'PostgreSQL (Learning)', 'Git', 'GitHub', 'Linux (Fedora)', 'Bash CLI'
      ]
    },
    {
      title: 'AI, ML & Data',
      icon: <Brain className="w-6 h-6" />,
      skills: [
        'NumPy', 'Pandas', 'Matplotlib', 'Seaborn (Learning)',
        'llama.cpp (LLM Inference)', 'GGUF Models', 'Prompt Engineering',
        'Local LLM Setup (Mistral-7B)', 'CUDA Toolchain (Basic)',
        'Memory Logs System (CLI Chat)'
      ]
    },
    {
      title: 'Design & Creative Tools',
      icon: <Palette className="w-6 h-6" />,
      skills: [
        'Canva', 'Photoshop', 'Illustrator', 'Premiere Pro (Basics)'
      ]
    },
    {
      title: 'Soft Skills & Leadership',
      icon: <Users className="w-6 h-6" />,
      skills: [
        'Team Coordination', 'Public Speaking', 'Event Management',
        'Focus & Grit (Inspired by Zoro)', 'Emotional Intelligence',
        'Motivation & Initiative', 'Communication', 'Discipline'
      ]
    }
  ];

  return (
    <section className="py-16 px-4 max-w-6xl mx-auto">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold text-gray-900 mb-4">
          Skills & Expertise
        </h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          I’m a builder by nature — from intelligent tools to visual web experiences. I work across the stack, love clean UI, and dive deep into AI & automation using Python. Here’s what I’m good at and still mastering.
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {skillCategories.map((category, index) => (
          <div
            key={index}
            className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-100"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-blue-100 rounded-lg text-blue-600">
                {category.icon}
              </div>
              <h3 className="text-xl font-semibold text-gray-900">
                {category.title}
              </h3>
            </div>
            
            <div className="flex flex-wrap gap-2">
              {category.skills.map((skill, skillIndex) => (
                <span
                  key={skillIndex}
                  className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm font-medium hover:bg-gray-200 transition-colors duration-200"
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

export default SkillSection;
