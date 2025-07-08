import React from "react";
import PythonCert from "../assets/certs/python.jpg";
import AimlCert from "../assets/certs/aiml.jpg"
import Git from "../assets/certs/git.jpg";
import Ml from "../assets/certs/ml.jpg";
import Pandas from "../assets/certs/pandas.jpg";
import PowerBi from "../assets/certs/powerbi.jpg";
import Frontend from "../assets/certs/Frontend.png";
import Django from "../assets/certs/Django.jpg"
import Machine from "../assets/certs/Machine.jpg"
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
		<section className="w-full py-20 px-6 md:px-20 bg-white text-black">
			<h2 className="text-4xl md:text-5xl font-bold text-center mb-16">
				Certifications & Achievements
			</h2>

			<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 max-w-7xl mx-auto">
				{certifications.map((cert, index) => (
					<div
						key={index}
						className="group relative bg-white/80 border border-gray-200 rounded-2xl p-4 backdrop-blur-md shadow-md hover:shadow-xl transition-all duration-300 flex flex-col items-center"
					>
						{/* Certificate Image (full certificate, not logo) */}
						<div className="w-full flex justify-center">
							<img
								src={cert.logo}
								alt={cert.title}
								className="w-full h-56 object-contain rounded-xl border-2 border-purple-200 shadow mb-4 bg-white"
							/>
						</div>
						{/* Content below image */}
						<h3 className="text-lg font-semibold text-purple-800 text-center mt-2">
							{cert.title}
						</h3>
						<p className="text-sm text-gray-600 text-center">
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
