import React from "react";

const certifications = [
  {
    title: "Python Basics",
    issuer: "HackerRank",
    year: "2024",
    logo: "/assets/certs/python.jpg",
  },
  {
    title: "Pandas",
    issuer: "Kaggle",
    year: "2024",
    logo: "/assets/certs/pandas.jpg",
  },
  {
    title: "Git & GitHub",
    issuer: "Geekster",
    year: "2024",
    logo: "/assets/certs/git.jpg",
  },
  {
    title: "Power BI",
    issuer: "OfficeMaster",
    year: "2024",
    logo: "/assets/certs/powerbi.jpg",
  },
  {
    title: "AI/ML Fundamentals",
    issuer: "Infosys",
    year: "2024",
    logo: "/assets/certs/aiml.jpg",
  },
  {
    title: "Intro to ML",
    issuer: "Infosys",
    year: "2024",
    logo: "/assets/certs/ml.jpg",
  },
  {
    title: "Super 60 Coordinator",
    issuer: "Your College",
    year: "2024",
    logo: "/assets/certs/super60.jpg",
  },
];

const CertificationsSection = () => {
  return (
    <section className="w-full py-20 px-6 md:px-20 bg-gradient-to-b from-black to-gray-900 text-white">
      <h2 className="text-4xl md:text-5xl font-bold text-center mb-12">
        🎓 Certifications & Achievements
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
        {certifications.map((cert, index) => (
          <div
            key={index}
            className="group relative p-6 bg-white/5 border border-white/10 rounded-2xl backdrop-blur-md shadow-lg hover:scale-105 hover:shadow-2xl transition-all duration-300"
          >
            <img
              src={cert.logo}
              alt={cert.title}
              className="w-16 h-16 mb-4 object-contain"
            />
            <h3 className="text-xl font-semibold text-purple-300 mb-1">
              {cert.title}
            </h3>
            <p className="text-gray-300">{cert.issuer}</p>
            <p className="text-sm text-gray-500 mt-2">{cert.year}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default CertificationsSection;
