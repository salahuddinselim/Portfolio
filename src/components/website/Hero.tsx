"use client";

import { useEffect, useState, useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import Link from "next/link";
import { createClient } from "@/lib/supabase";
import { FiGithub, FiLinkedin, FiMail, FiExternalLink } from "react-icons/fi";

export default function Hero() {
  const [profile, setProfile] = useState<any>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  const springConfig = { damping: 20, stiffness: 300 };
  const targetX = useSpring(mouseX, springConfig);
  const targetY = useSpring(mouseY, springConfig);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;
        targetX.set(x * 20);
        targetY.set(y * -20);
      }
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener("mousemove", handleMouseMove);
    }

    const fetchData = async () => {
      try {
        const supabase = createClient();
        const { data } = await supabase.from("profiles").select("*").limit(1).maybeSingle();
        if (data) setProfile(data);
      } catch (e) {
        console.error("Error fetching data:", e);
      }
    };
    fetchData();

    return () => {
      if (container) {
        container.removeEventListener("mousemove", handleMouseMove);
      }
    };
  }, [targetX, targetY]);

  const name = profile?.name || "Your Name";
  const role = profile?.role || "Full Stack Developer";
  const bio = profile?.bio || "A passionate developer focused on building scalable web applications.";
  const github_link = profile?.github_link;
  const linkedin_link = profile?.linkedin_link;
  const email = profile?.email;
  const profile_image = profile?.profile_image;

  return (
    <section id="hero" className="min-h-screen flex items-center justify-center pt-20 overflow-hidden" ref={containerRef}>
      <div className="max-w-6xl mx-auto px-4 md:px-8 grid md:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-6 order-2 md:order-1"
        >
          <motion.p 
            className="text-cyan-400 font-mono text-sm"
          >
            Hello, I am
          </motion.p>
          
          <h1 className="font-display text-5xl md:text-7xl font-bold leading-tight">
            <span className="text-slate-200">{name}</span>
          </h1>
          
          <p className="text-slate-400 text-lg">{role}</p>
          <p className="text-slate-500 text-lg max-w-md">{bio}</p>
          
          <div className="flex flex-wrap gap-4">
            <Link href="#projects" className="px-6 py-3 bg-cyan-500 text-slate-950 font-medium rounded-lg hover:bg-cyan-400">
              View Projects
            </Link>
            <Link href="#contact" className="px-6 py-3 bg-white/5 border border-white/10 text-slate-200 rounded-lg hover:bg-white/10">
              Contact Me
            </Link>
          </div>
          
          <div className="flex items-center gap-6 pt-4" role="list" aria-label="Social links">
            {github_link && (
              <a href={github_link} target="_blank" rel="noopener noreferrer" aria-label="GitHub Profile" className="text-slate-500 hover:text-cyan-400">
                <FiGithub className="w-6 h-6" aria-hidden="true" />
              </a>
            )}
            {linkedin_link && (
              <a href={linkedin_link} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn Profile" className="text-slate-500 hover:text-cyan-400">
                <FiLinkedin className="w-6 h-6" aria-hidden="true" />
              </a>
            )}
            {email && (
              <a href={`mailto:${email}`} aria-label="Send Email" className="text-slate-500 hover:text-cyan-400">
                <FiMail className="w-6 h-6" aria-hidden="true" />
              </a>
            )}
          </div>
        </motion.div>
        
        <motion.div
          style={{ x: targetX, y: targetY }}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="flex justify-center order-1 md:order-2"
        >
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/30 to-violet-500/30 rounded-full blur-3xl" />
            <div className="relative w-72 h-72 md:w-96 md:h-96 rounded-full overflow-hidden bg-slate-800 border border-white/10">
              {profile_image ? (
                <img 
                  src={profile_image} 
                  alt={`${name} - ${role}`} 
                  className="w-full h-full object-cover"
                  loading="eager"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-slate-600" aria-label="Profile placeholder">
                  <FiExternalLink className="w-20 h-20" />
                </div>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}