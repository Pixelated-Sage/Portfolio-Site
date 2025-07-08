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
];

const ExperienceSection = () => {
  return (
    <section className="w-full py-12 sm:py-20 px-4 sm:px-6 md:px-20 bg-white text-black">
      <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-10 sm:mb-12">
        Experience & Roles
      </h2>

      <div className="max-w-3xl sm:max-w-4xl mx-auto space-y-6 sm:space-y-10">
        {experienceList.map((exp, idx) => (
          <div
            key={idx}
            className="bg-white border border-gray-200 p-5 sm:p-6 rounded-xl shadow-md sm:shadow-lg"
          >
            <h3 className="text-xl sm:text-2xl font-semibold text-purple-800 mb-2">
              {exp.role}
            </h3>
            <p className="text-xs sm:text-sm text-gray-600 mb-3">
              {exp.duration} | {exp.location}
            </p>
            <ul className="list-disc pl-5 sm:pl-6 text-sm sm:text-base text-gray-700 space-y-2">
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
