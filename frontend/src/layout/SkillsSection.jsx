// components/Skills/SkillsSection.jsx
import React from "react";
import SkillCard from "../components/Skills/SkillCard";

const skills = [
  { name: "Python", icon: "/src/assets/icons/python.svg" },
  { name: "C++", icon: "/src/assets/icons/cplusplus.svg" },
  { name: "React.js", icon: "/src/assets/icons/react.svg" },
  { name: "TensorFlow", icon: "/src/assets/icons/tensorflow.svg" },
  { name: "Pandas", icon: "/src/assets/icons/pandas.svg" },
  { name: "Git & GitHub", icon: "/src/assets/icons/github.svg" },
  { name: "Power BI", icon: "/src/assets/icons/powers.svg" },
  { name: "Linux", icon: "/src/assets/icons/linux.svg" },
];

const SkillsSection = () => {
  return (
    <section className="relative w-full py-20 overflow-hidden">
      {/* Meteor Shower Background */}
      <div className="absolute inset-0 overflow-hidden">
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={i}
            className="meteor-shower"
            style={{
              '--delay': `${Math.random() * 10}s`,
              '--top': `${Math.random() * 100}%`,
              '--left': `${Math.random() * 100}%`,
            }}
          />
        ))}
      </div>

      <div className="relative max-w-5xl mx-auto px-4">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 bg-clip-text text-transparent bg-gradient-to-r from-purple-600 via-pink-500 to-blue-600">
          🛠️ Skills & Tools
        </h2>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {skills.map((skill) => (
            <SkillCard key={skill.name} icon={skill.icon} name={skill.name} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
