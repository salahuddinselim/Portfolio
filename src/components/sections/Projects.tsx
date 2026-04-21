"use client";

import { motion } from "framer-motion";
import { Github, ExternalLink } from "lucide-react";

interface Project {
  title: string;
  description?: string | null;
  tech_stack?: string[] | null;
  github_link?: string | null;
  live_link?: string | null;
  image?: string | null;
  featured?: boolean;
}

interface ProjectsProps {
  projects?: Project[];
}

const defaultProjects: Project[] = [
  {
    title: "Automated Fish Pond",
    description: "IoT-based smart water quality monitoring system using Arduino with sensors for temperature, pH, turbidity, and gas. Automated water exchange and feeding system.",
    tech_stack: ["Arduino", "C++", "Sensors", "IoT"],
    github_link: "https://github.com/salahuddinselim",
    image: "https://images.unsplash.com/photo-1518182170546-0766ce6f6a56?w=600&h=400&fit=crop",
    featured: true,
  },
  {
    title: "AI Voice Assistant",
    description: "Python-based voice assistant using SpeechRecognition and Pyttsx3 for executing commands, web search, and automation.",
    tech_stack: ["Python", "AI", "Speech Recognition"],
    github_link: "https://github.com/salahuddinselim",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=600&h=400&fit=crop",
    featured: true,
  },
  {
    title: "TournyMate",
    description: "Full-stack web application using PHP and MySQL to manage tournaments, players, and live scores.",
    tech_stack: ["PHP", "MySQL", "HTML", "CSS"],
    github_link: "https://github.com/salahuddinselim",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c01f?w=600&h=400&fit=crop",
  },
  {
    title: "Multilevel Puzzle Game",
    description: "JavaFX-based team puzzle game with real-time chat, database tracking, and multithreading.",
    tech_stack: ["Java", "JavaFX", "Multithreading"],
    github_link: "https://github.com/salahuddinselim",
    image: "https://images.unsplash.com/photo-1551103782-8ab07afd45d1?w=600&h=400&fit=crop",
  },
];

export default function Projects({ projects = defaultProjects }: ProjectsProps) {
  return (
    <section id="projects" className="min-h-screen py-16 sm:py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6 sm:mb-8"
        >
          Featured <span className="text-gradient">Projects</span>
        </motion.h2>

        <div className="grid sm:grid-cols-2 gap-4 sm:gap-6">
          {(projects.length > 0 ? projects : defaultProjects).map((project, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="glass rounded-2xl overflow-hidden hover:bg-white/[0.06] transition-colors group"
            >
              {project.image && (
                <div className="aspect-video overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
              )}
              <div className="p-4 sm:p-6">
                <div className="flex items-start justify-between mb-2 sm:mb-3">
                  <h3 className="text-lg sm:text-xl font-semibold group-hover:text-cyan-400 transition-colors">
                    {project.title}
                  </h3>
                  <div className="flex gap-2">
                    {project.github_link && (
                      <a
                        href={project.github_link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-1.5 sm:p-2 text-gray-400 hover:text-white transition-colors cursor-pointer"
                        aria-label="Source Code"
                      >
                        <Github size={16} className="sm:w-[18px] sm:h-[18px]" />
                      </a>
                    )}
                    {project.live_link && (
                      <a
                        href={project.live_link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-1.5 sm:p-2 text-gray-400 hover:text-white transition-colors cursor-pointer"
                        aria-label="Live Demo"
                      >
                        <ExternalLink size={16} className="sm:w-[18px] sm:h-[18px]" />
                      </a>
                    )}
                  </div>
                </div>
                <p className="text-gray-400 text-xs sm:text-sm mb-3 sm:mb-4">{project.description}</p>
                <div className="flex flex-wrap gap-1.5 sm:gap-2">
                  {project.tech_stack?.map((tech) => (
                    <span
                      key={tech}
                      className="px-2 sm:px-3 py-1 rounded-lg bg-white/5 text-xs text-gray-400"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}