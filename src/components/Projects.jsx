import React from 'react';
import { BsGithub } from "react-icons/bs";
import { TbExternalLink } from "react-icons/tb";
import { motion } from 'framer-motion';

const projects = [
  {
    id: 1,
    title: "SenseiLearn",
    subtitle: "Japanese Language Learning Platform",
    description: "An immersive, beautifully crafted Japanese language learning platform that transforms your journey into an epic adventure. Features Hiragana, Katakana, Kanji lessons, grammar practice, and AI-powered coaching with Gemini AI.",
    technologies: ["TypeScript", "React", "Tailwind CSS", "Supabase", "Gemini AI"],
    image: "/assets/projects/senseilearn.png",
    status: "Live",
    liveUrl: "https://sensei-learn.vercel.app",
    githubUrl: "https://github.com/Pranav7758/SenseiLearn"
  },
  {
    id: 2,
    title: "BUSSPASS",
    subtitle: "Bus Pass Management System",
    description: "A modern bus pass management application that streamlines the process of issuing, managing, and validating bus passes. Built with TypeScript and deployed on Vercel for seamless user experience.",
    technologies: ["TypeScript", "React", "Tailwind CSS", "Vercel"],
    image: "/assets/projects/busspass.png",
    status: "Live",
    liveUrl: "https://busspass-chi.vercel.app",
    githubUrl: "https://github.com/Pranav7758/BUSSPASS"
  },
  {
    id: 3,
    title: "Anime Watchlist Logbook",
    subtitle: "Anime Tracking Web Application",
    description: "A modern web application for tracking your anime watchlist. Keep track of what you're watching, plan to watch, and have completed. Features a clean UI for managing your anime collection.",
    technologies: ["TypeScript", "React", "Tailwind CSS", "Vercel"],
    image: "/assets/projects/anime-watchlist.png",
    status: "Live",
    liveUrl: "https://anime-watchlist-rust.vercel.app",
    githubUrl: "https://github.com/Pranav7758/anime-watchlist-logbook"
  },
  {
    id: 4,
    title: "Digital Setu Hub",
    subtitle: "Digital Connectivity Platform",
    description: "A digital connectivity hub designed to bridge gaps and connect users with essential services. Built with modern web technologies for a smooth and responsive user experience.",
    technologies: ["TypeScript", "React", "Tailwind CSS", "Vercel"],
    image: "/assets/projects/digital-setu.png",
    status: "Live",
    liveUrl: "https://virtual-setu-hub.vercel.app",
    githubUrl: "https://github.com/Pranav7758/digital-setu-hub"
  }
];

export default function Projects() {
  return (
    <div className="bg-black px-5 lg:px-28 py-8 my-8 lg:py-16 lg:my-16" id="projects">
      <h2 className="text-2xl lg:text-4xl text-center text-white">
        My <span className="font-extrabold">Projects</span>
      </h2>

      <div className="lg:mt-16 mt-8 lg:space-y-16 space-y-8 lg:pb-6 pb-3">
        {projects.map((project, index) => (
          <motion.div
            key={project.id}
            className={`flex justify-between items-start flex-col ${index % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"} gap-8`}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 80, damping: 10, delay: index * 0.2 }}
            viewport={{ once: true }}
          >
            <a 
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="lg:w-[500px] w-full rounded-2xl overflow-hidden relative group cursor-pointer"
            >
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-300 flex items-center justify-center">
                <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-white text-black px-4 py-2 rounded-full font-medium text-sm flex items-center gap-2">
                  <TbExternalLink size={18} />
                  View Live
                </span>
              </div>
              <span className="absolute top-4 right-4 px-3 py-1 rounded-full text-sm font-medium bg-green-500/90 text-white">
                {project.status}
              </span>
            </a>

            <div className="lg:w-1/2 lg:space-y-6 space-y-4">
              <h2 className="font-extrabold text-white mt-5 lg:mt-0 text-3xl lg:text-5xl">
                {String(project.id).padStart(2, "0")}
              </h2>
              <p className="font-bold text-white text-xl lg:text-3xl">{project.title}</p>
              <p className="text-[#A1A1AA] text-sm font-medium">{project.subtitle}</p>

              <p className="font-light text-sm/6 lg:text-base text-[#71717A]">
                {project.description}
              </p>

              <div className="flex flex-wrap gap-2">
                {project.technologies.map((tech, i) => (
                  <span key={i} className="px-3 py-1 bg-gray-800 text-gray-300 rounded-full text-sm">
                    {tech}
                  </span>
                ))}
              </div>

              <div className="flex items-center gap-4 mt-4">
                <a 
                  href={project.liveUrl}
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-white text-black px-4 py-2 rounded-full hover:bg-gray-200 transition-colors font-medium text-sm"
                >
                  <TbExternalLink size={18} />
                  Live Demo
                </a>
                <a 
                  href={project.githubUrl}
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 border border-gray-600 text-white px-4 py-2 rounded-full hover:bg-gray-800 transition-colors font-medium text-sm"
                >
                  <BsGithub size={18} />
                  GitHub
                </a>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
