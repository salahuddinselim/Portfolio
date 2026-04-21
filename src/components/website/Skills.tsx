"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { createClient } from "@/lib/supabase";
import { 
  FaReact, FaNodeJs, FaPython, FaGitAlt, FaDocker, FaAws, 
  FaJs, FaHtml5, FaCss3Alt, FaJava, FaLinux, FaDatabase, FaCode
} from "react-icons/fa";
import { 
  SiNextdotjs, SiTypescript, SiMongodb, SiPostgresql, SiTailwindcss, 
  SiRedis, SiFirebase, SiFigma, SiVercel, SiNetlify,
  SiWebpack, SiVite, SiJest, SiExpress, SiPrisma
} from "react-icons/si";

const iconMap: Record<string, any> = {
  react: FaReact, "next.js": SiNextdotjs, nextjs: SiNextdotjs,
  nodejs: FaNodeJs, node: FaNodeJs, python: FaPython,
  javascript: FaJs, js: FaJs, typescript: SiTypescript, ts: SiTypescript,
  html: FaHtml5, css: FaCss3Alt, java: FaJava,
  mongodb: SiMongodb, mongo: SiMongodb, postgresql: SiPostgresql,
  postgres: SiPostgresql, sql: FaDatabase, redis: SiRedis,
  firebase: SiFirebase, tailwind: SiTailwindcss, figma: SiFigma,
  git: FaGitAlt, docker: FaDocker, aws: FaAws,
  vercel: SiVercel, netlify: SiNetlify, linux: FaLinux,
};

export default function Skills() {
  const [skills, setSkills] = useState<any[]>([]);

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const supabase = createClient();
        const { data } = await supabase.from("skills").select("*");
        if (data) setSkills(data);
      } catch (e) {
        console.error("Error fetching skills:", e);
      }
    };
    fetchSkills();
  }, []);

  const categories = [...new Set(skills.map(s => s.category))];
  const grouped = categories.map(cat => ({
    name: cat,
    skills: skills.filter(s => s.category === cat)
  }));

  return (
    <section id="skills" className="py-24">
      <div className="max-w-6xl mx-auto px-4 md:px-8">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-display text-4xl font-bold mb-12"
        >
          Technical <span className="text-gradient">Skills</span>
        </motion.h2>
        
        <div className="grid md:grid-cols-3 gap-6">
          {grouped.map((category, i) => (
            <motion.div
              key={category.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -8 }}
              className="glass rounded-2xl p-6"
            >
              <h3 className="font-display text-lg font-semibold mb-4 text-slate-200">{category.name}</h3>
              <div className="flex flex-wrap gap-3">
                {category.skills.map((skill) => {
                  const IconComponent = iconMap[skill.name?.toLowerCase()] || FaCode;
                  return (
                    <motion.div
                      key={skill.id}
                      className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
                      whileHover={{ x: 5 }}
                    >
                      <IconComponent className="w-5 h-5 text-cyan-400" />
                      <span className="text-slate-400 text-sm">{skill.name}</span>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}