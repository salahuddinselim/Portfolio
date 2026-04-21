"use client";

import { motion } from "framer-motion";
import { Code2, Database, Wrench, Globe, FileCode, Terminal as TerminalIcon } from "lucide-react";

interface Skill {
  name: string;
  category: string;
}

interface SkillsProps {
  skills?: Skill[];
}

const defaultSkills: Skill[] = [
  { name: "JavaScript", category: "Languages" },
  { name: "React", category: "Frontend" },
  { name: "Next.js", category: "Frontend" },
  { name: "TypeScript", category: "Languages" },
  { name: "Python", category: "Languages" },
  { name: "Node.js", category: "Backend" },
  { name: "PostgreSQL", category: "Database" },
  { name: "MySQL", category: "Database" },
  { name: "Git", category: "Tools" },
  { name: "Arduino", category: "Tools" },
  { name: "C++", category: "Languages" },
  { name: "Java", category: "Languages" },
];

const categoryIcons: Record<string, React.ReactNode> = {
  Frontend: <Code2 size={18} />,
  Backend: <FileCode size={18} />,
  Database: <Database size={18} />,
  Languages: <TerminalIcon size={18} />,
  Tools: <Wrench size={18} />,
};

export default function Skills({ skills = defaultSkills }: SkillsProps) {
  const categories = [...new Set(skills.map((s) => s.category))];

  return (
    <section id="skills" className="min-h-screen py-12 sm:py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6 sm:mb-8"
        >
          Skills <span className="text-gradient">&</span> Tools
        </motion.h2>

        <div className="grid sm:grid-cols-2 gap-4 sm:gap-6">
          {categories.map((category, idx) => (
            <motion.div
              key={category}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
            >
              <h3 className="text-base sm:text-lg font-semibold flex items-center gap-2 mb-3 sm:mb-4">
                <span className="text-cyan-400">{categoryIcons[category]}</span>
                {category}
              </h3>
              <div className="flex flex-wrap gap-2">
                {skills
                  .filter((s) => s.category === category)
                  .map((skill) => (
                    <span
                      key={skill.name}
                      className="px-3 sm:px-4 py-2 rounded-xl glass text-xs sm:text-sm cursor-pointer hover:bg-white/10 transition-colors flex items-center gap-2"
                    >
                      <span className="w-2 h-2 rounded-full bg-cyan-400/50" />
                      {skill.name}
                    </span>
                  ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}