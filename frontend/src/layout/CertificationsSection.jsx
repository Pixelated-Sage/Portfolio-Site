import React from "react";
import PythonCert from "../assets/certs/python.webp";
import AimlCert from "../assets/certs/aiml.webp";
import Git from "../assets/certs/git.webp";
import Ml from "../assets/certs/ml.webp";
import Pandas from "../assets/certs/pandas.webp";
import PowerBi from "../assets/certs/powerbi.webp";
import Frontend from "../assets/certs/Frontend.webp";
import Django from "../assets/certs/Django.webp";
import Machine from "../assets/certs/Machine.webp";

const certifications = [
  {
    title: "Python Basics",
    issuer: "HackerRank",
    year: "2024",
    logo: PythonCert,
  },
  {
    title: "Pandas",
    issuer: "Kaggle",
    year: "2024",
    logo: Pandas,
  },
  {
    title: "Git & GitHub",
    issuer: "Geekster",
    year: "2024",
    logo: Git,
  },
  {
    title: "Frontend Development",
    issuer: "SVIET College",
    year: "2024",
    logo: Frontend,
  },
  {
    title: "Machine Learning Fundamentals",
    issuer: "SVIET College",
    year: "2024",
    logo: Machine,
  },
  {
    title: "Django",
    issuer: "Udemy",
    year: "2025",
    logo: Django,
  },
];

const CertificationsSection = () => {
  return (
    <section className="w-full py-12 sm:py-20 px-4 sm:px-6 md:px-20 bg-white text-black">
      <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-10 sm:mb-16">
        Certifications & Achievements
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 max-w-7xl mx-auto">
        {certifications.map((cert, index) => (
          <div
            key={index}
            className="group bg-white/80 border border-gray-200 rounded-2xl p-4 backdrop-blur-md shadow-md hover:shadow-xl transition-all duration-300 flex flex-col items-center"
          >
            <div className="w-full flex justify-center">
              <img
                src={cert.logo}
                alt={cert.title}
                className="w-full h-44 sm:h-56 object-contain rounded-xl border-2 border-purple-200 shadow mb-3 bg-white"
              />
            </div>
            <h3 className="text-base sm:text-lg font-semibold text-purple-800 text-center mt-2">
              {cert.title}
            </h3>
            <p className="text-xs sm:text-sm text-gray-600 text-center">
              {cert.issuer}
            </p>
            <p className="text-xs text-gray-500 text-center mt-1">
              {cert.year}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default CertificationsSection;
