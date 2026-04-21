"use client";

import { motion } from "framer-motion";
import { Terminal, ArrowRight, Download, Eye, MapPin, Mail, Github, Linkedin } from "lucide-react";

interface HeroProps {
  profile?: {
    name?: string | null;
    role?: string | null;
    bio?: string | null;
    profile_image?: string | null;
    email?: string | null;
    github_link?: string | null;
    linkedin_link?: string | null;
    location?: string | null;
    status?: string | null;
  };
  onSwitchToTerminal: () => void;
}

const statusColors: Record<string, string> = {
  "Open to Work": "bg-green-500/20 text-green-400 border-green-500/30",
  "Looking for Job": "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
  "Employed": "bg-blue-500/20 text-blue-400 border-blue-500/30",
};

export default function Hero({ profile, onSwitchToTerminal }: HeroProps) {
  const status = profile?.status || "Open to Work";
  const statusColor = statusColors[status] || statusColors["Open to Work"];
  
  return (
    <section className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 pt-20">
      <div className="max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="relative inline-block mb-6"
        >
          <div className="w-28 h-28 sm:w-40 sm:h-40 mx-auto rounded-full overflow-hidden border-2 sm:border-4 border-cyan-500/20 ring-4 ring-cyan-500/10 shadow-lg shadow-cyan-500/20">
            <img
              src={profile?.profile_image || "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face"}
              alt={profile?.name || "Profile"}
              className="w-full h-full object-cover"
            />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <span className="inline-block px-3 py-1 sm:px-4 py-1.5 rounded-full bg-white/5 backdrop-blur-sm text-xs sm:text-sm text-cyan-400 border border-cyan-500/20">
            {profile?.role || "Software Engineer"}
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mt-4 tracking-tight"
        >
          {profile?.name || "Your Name"}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-base sm:text-lg text-gray-400 max-w-2xl mx-auto mt-4 leading-relaxed"
        >
          {profile?.bio || "Computer Science and Engineering student passionate about building impactful solutions."}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.35 }}
          className="mt-3"
        >
          <span className={`inline-block px-3 py-1 rounded-full text-xs border ${statusColor}`}>
            {status}
          </span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="flex flex-wrap gap-3 sm:gap-4 justify-center mt-6"
        >
          <a
            href="#projects"
            className="inline-flex items-center gap-2 px-5 py-2.5 sm:px-6 sm:py-3 rounded-xl bg-gradient-to-r from-cyan-500/10 to-blue-500/10 hover:from-cyan-500/20 hover:to-blue-500/20 text-cyan-400 border border-cyan-500/20 transition-all cursor-pointer text-sm sm:text-base"
          >
            <span>Projects</span>
            <ArrowRight size={16} className="sm:w-4 sm:h-4" />
          </a>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 px-5 py-2.5 sm:px-6 sm:py-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 transition-all cursor-pointer text-sm sm:text-base"
          >
            Contact Me
          </a>
          <button
            onClick={onSwitchToTerminal}
            className="inline-flex items-center gap-2 px-5 py-2.5 sm:px-6 sm:py-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 transition-all cursor-pointer text-sm sm:text-base"
          >
            <Terminal size={16} className="sm:w-4 sm:h-4" />
            <span className="hidden sm:inline">Terminal</span>
          </button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="flex flex-wrap justify-center gap-4 mt-8 text-gray-500 text-sm"
        >
          {profile?.location && (
            <span className="flex items-center gap-1">
              <MapPin size={14} /> {profile.location}
            </span>
          )}
          {profile?.email && (
            <a href={`mailto:${profile.email}`} className="flex items-center gap-1 hover:text-cyan-400 cursor-pointer">
              <Mail size={14} /> {profile.email}
            </a>
          )}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="flex justify-center gap-3 mt-4"
        >
          {profile?.github_link && (
            <a
              href={profile.github_link}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors cursor-pointer"
            >
              <Github size={18} />
            </a>
          )}
          {profile?.linkedin_link && (
            <a
              href={profile.linkedin_link}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors cursor-pointer"
            >
              <Linkedin size={18} />
            </a>
          )}
        </motion.div>
      </div>
    </section>
  );
}