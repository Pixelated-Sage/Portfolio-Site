import React from "react";

const projects = [
  {
    title: "Cargi Delivery Robot",
    description: "Arduino-based obstacle-avoiding robot designed for campus delivery systems.",
    tags: ["Arduino", "Sensors", "Robotics"],
    image: "/assets/projects/cargi.png",
    demo: "#", // Optional
    code: "#", // GitHub or source
  },
  {
    title: "ERP 2.0",
    description: "Revamped student ERP system with better UI, performance, and new features.",
    tags: ["React", "Firebase", "Vite"],
    image: "/assets/projects/erp.png",
    demo: "#",
    code: "#",
  },
  {
    title: "Line-Following Cart",
    description: "Arduino-powered cart that follows black line paths for indoor automation.",
    tags: ["Automation", "Robotics", "Sensors"],
    image: "/assets/projects/linecart.png",
    demo: "#",
    code: "#",
  },
  {
    title: "Power BI Dashboard",
    description: "Interactive dashboards with visuals for sales, students, and productivity.",
    tags: ["Power BI", "Data Analysis", "Charts"],
    image: "/assets/projects/bi.png",
    demo: "#",
    code: "#",
  },
];

const ProjectsSection = () => {
  return (
    <section className="w-full py-20 px-6 md:px-20 bg-white text-black">
      <h2 className="text-4xl md:text-5xl font-bold text-center mb-12">
        💻 Projects Showcase
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
        {projects.map((project, idx) => (
          <div
            key={idx}
            className="bg-white/5 border border-white/10 p-6 rounded-2xl shadow-xl hover:scale-[1.03] transition-all duration-300 group relative backdrop-blur"
          >
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-40 object-cover rounded-lg mb-4 border border-white/10"
            />
            <h3 className="text-xl font-semibold text-purple-700 mb-1">{project.title}</h3>
            <p className="text-gray-700 text-sm">{project.description}</p>

            <div className="flex flex-wrap gap-2 mt-4">
              {project.tags.map((tag, i) => (
                <span
                  key={i}
                  className="text-xs px-3 py-1 bg-purple-800/30 border border-purple-500/30 rounded-full text-purple-800"
                >
                  {tag}
                </span>
              ))}
            </div>

            <div className="mt-4 flex gap-4">
              {project.demo && (
                <a
                  href={project.demo}
                  target="_blank"
                  className="text-sm text-cyan-600 hover:underline"
                >
                  Live Demo
                </a>
              )}
              {project.code && (
                <a
                  href={project.code}
                  target="_blank"
                  className="text-sm text-yellow-600 hover:underline"
                >
                  Source Code
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ProjectsSection;
