import React from "react";

const experienceList = [
  {
    role: "Super 60 Tech Batch – Coordinator",
    duration: "July 2024 – Present",
    location: "SVIET College, Banur, Rajpura",
    points: [
      "Coordinating a group of 60 selected students in a self-led tech initiative under college.",
      "Led and executed the SkillUp Bootcamp — a 5-day technical training event focused on C++ fundamentals.",
      "Worked closely with peers and faculty to organize sessions, manage logistics, and handle internal promotion.",
      "Developed core skills in event organization, team communication, and student-led collaboration.",
    ],
  },
  // Add more roles below as needed
  /*
  {
    role: "Frontend Intern – XYZ Startup",
    duration: "May 2024 – Aug 2024",
    location: "Remote",
    points: [
      "Built responsive components in React with TailwindCSS.",
      "Contributed to scalable UI workflows with Git & API integrations.",
    ],
  },
  */
];

const ExperienceSection = () => {
  return (
    <section className="w-full py-20 px-6 md:px-20 bg-white text-black">
      <h2 className="text-4xl md:text-5xl font-bold text-center mb-12">
        Experience & Roles
      </h2>

      <div className="max-w-4xl mx-auto space-y-10">
        {experienceList.map((exp, idx) => (
          <div
            key={idx}
            className="bg-white border border-gray-200 p-6 rounded-xl shadow-lg"
          >
            <h3 className="text-2xl font-semibold text-purple-800 mb-1">
              {exp.role}
            </h3>
            <p className="text-sm text-gray-600 mb-2">
              {exp.duration} | {exp.location}
            </p>
            <ul className="list-disc pl-6 text-gray-700 space-y-2">
              {exp.points.map((point, i) => (
                <li key={i}>{point}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ExperienceSection;
