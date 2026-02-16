import React from "react";
import { Briefcase, Calendar, MapPin } from "lucide-react";

const experienceList = [
  {
    role: "Full-Stack Developer (Team Lead)",
    company: "Super 60 Team, SVIET",
    duration: "Jan 2024 – Present",
    location: "Banur, Punjab",
    points: [
      "Led frontend development for production apps (ERP, Event Platforms) in an agile environment with 10+ developers.",
      "Established React best practices, code review processes, and architectural standards for junior developers.",
      "Achieved 100% on-time sprint deliveries over 6+ months for critical college infrastructure projects.",
      "Coordinated with cross-functional teams to ensure seamless integration of backend APIs and frontend UI."
    ],
  },
  {
    role: "Web Developer (Contract)",
    company: "MentorKrish",
    duration: "Dec 2023 – Feb 2024",
    location: "Remote",
    points: [
      "Built a comprehensive e-learning platform with CMS capabilities, user authentication, and secure payment integration.",
      "Developed the Next.js frontend from scratch, ensuring high performance and SEO optimization.",
      "Integrated REST APIs for dynamic content delivery, user progress tracking, and course management.",
    ],
  },
];

const ExperienceSection = () => {
  return (
    <section id="experience" className="w-full py-16 sm:py-24 px-4 sm:px-6 md:px-20 bg-slate-50 text-black overflow-hidden relative">
       {/* Background Decoration */}
       <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-purple-100/50 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
       <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-blue-100/50 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>

      <div className="relative z-10 max-w-5xl mx-auto">
        <h2 className="text-4xl sm:text-5xl font-bold text-center mb-16 text-gray-900 tracking-tight">
          Professional <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">Journey</span>
        </h2>

        <div className="space-y-8 sm:space-y-12">
          {experienceList.map((exp, idx) => (
            <div
              key={idx}
              className="relative pl-8 sm:pl-0"
            >
              {/* Timeline connector for larger screens */}
              <div className="hidden sm:block absolute left-[50%] top-0 bottom-0 w-px bg-gray-200 -translate-x-1/2 last:bottom-auto"></div>
              
              <div className={`sm:flex justify-between items-center w-full ${idx % 2 === 0 ? 'flex-row-reverse' : ''} group`}>
                
                {/* Timeline Dot */}
                <div className="absolute sm:static left-0 top-0 sm:left-auto sm:top-auto w-4 h-4 rounded-full bg-white border-4 border-purple-500 z-10 sm:mx-auto -translate-x-[5px] sm:translate-x-0 mt-6 sm:mt-0 shadow-lg group-hover:scale-125 transition-transform duration-300"></div>

                {/* Content Card */}
                <div className="sm:w-[45%] bg-white border border-gray-100 p-6 sm:p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 relative z-10">
                  <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-1">
                    {exp.role}
                  </h3>
                  <h4 className="text-lg font-semibold text-purple-700 mb-4">
                     {exp.company}
                  </h4>
                  
                  <div className="flex flex-wrap gap-4 text-sm text-gray-500 mb-6 border-b border-gray-100 pb-4">
                    <span className="flex items-center gap-1.5 bg-gray-50 px-3 py-1 rounded-full">
                        <Calendar className="w-4 h-4 text-purple-500" /> {exp.duration}
                    </span>
                    <span className="flex items-center gap-1.5 bg-gray-50 px-3 py-1 rounded-full">
                        <MapPin className="w-4 h-4 text-pink-500" /> {exp.location}
                    </span>
                  </div>

                  <ul className="space-y-3">
                    {exp.points.map((point, i) => (
                      <li key={i} className="flex items-start gap-3 text-gray-600 text-sm sm:text-base leading-relaxed">
                        <span className="mt-2 w-1.5 h-1.5 rounded-full bg-purple-500 flex-shrink-0"></span>
                        {point}
                      </li>
                    ))}
                  </ul>
                </div>
                
                {/* Spacer for the other side */}
                <div className="sm:w-[45%]"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;
