"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FiGithub, FiExternalLink } from "react-icons/fi";
import { createClient } from "@/lib/supabase";

export default function Projects() {
  const [projects, setProjects] = useState<any[]>([]);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const supabase = createClient();
        const { data } = await supabase.from("projects").select("*");
        if (data) setProjects(data);
      } catch (e) {
        console.error("Error fetching projects:", e);
      }
    };
    fetchProjects();
  }, []);

  return (
    <section id="projects" className="py-24">
      <div className="max-w-6xl mx-auto px-4 md:px-8">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-display text-4xl font-bold mb-12"
        >
          Featured <span className="text-gradient">Projects</span>
        </motion.h2>
        
        {projects.length > 0 ? (
          <div className="grid md:grid-cols-2 gap-6">
            {projects.map((project, i) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -8 }}
                className="glass rounded-2xl p-6 group hover:border-violet-500/30 transition-all"
              >
                {project.image && (
                  <img 
                    src={project.image} 
                    alt={project.title} 
                    className="w-full h-40 object-cover rounded-lg mb-4" 
                  />
                )}
                <h3 className="font-display text-xl font-semibold mb-3 group-hover:text-cyan-400 transition-colors">
                  {project.title}
                </h3>
                <p className="text-slate-400 text-sm mb-4">{project.description}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tech_stack?.map((t: string, idx: number) => (
                    <span key={idx} className="px-3 py-1 text-xs rounded-full bg-violet-500/20 text-violet-300">
                      {t}
                    </span>
                  ))}
                </div>
                <div className="flex items-center gap-4">
                  {project.github_link && (
                    <motion.a
                      href={project.github_link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-sm text-slate-500 hover:text-cyan-400"
                      whileHover={{ x: 5 }}
                    >
                      <FiGithub className="w-4 h-4" />
                      Code
                    </motion.a>
                  )}
                  {project.live_link && (
                    <motion.a
                      href={project.live_link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-sm text-slate-500 hover:text-cyan-400"
                      whileHover={{ x: 5 }}
                    >
                      <FiExternalLink className="w-4 h-4" />
                      Live
                    </motion.a>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 text-slate-500">
            <p>No projects yet.</p>
          </div>
        )}
      </div>
    </section>
  );
}