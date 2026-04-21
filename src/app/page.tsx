"use client";

import { useState, useEffect, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { AdminProvider } from "@/context/AdminContext";
import Terminal from "@/components/terminal/Terminal";
import Header from "@/components/layout/Header";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Skills from "@/components/sections/Skills";
import Projects from "@/components/sections/Projects";
import Resume from "@/components/sections/Resume";
import Contact from "@/components/sections/Contact";

const profile = {
  name: "Salah Uddin Selim",
  role: "Software Engineer",
  bio: "Computer Science and Engineering student at United International University with strong skills in programming, software development, and problem-solving. Experienced in IoT systems, AI-based applications, and full-stack web development. Passionate about building impactful solutions and continuously learning modern technologies.",
  vision: "Passionate about building impactful solutions and continuously learning modern technologies.",
  location: "Vatara, Dhaka, Bangladesh",
  email: "selimsalahuddin19@gmail.com",
  profile_image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face",
  github_link: "https://github.com/salahuddinselim",
  linkedin_link: "https://linkedin.com/in/salahuddinselim",
  twitter_link: "",
  facebook_link: "https://facebook.com/salahuddinselim",
  instagram_link: "https://instagram.com/salahuddinselim",
};

function PortfolioContent() {
  const [isTerminalMode, setIsTerminalMode] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const savedMode = localStorage.getItem("portfolio-mode");
    if (savedMode) {
      setIsTerminalMode(savedMode === "terminal");
    }
  }, []);

  useEffect(() => {
    if (mounted) {
      localStorage.setItem("portfolio-mode", isTerminalMode ? "terminal" : "website");
    }
  }, [isTerminalMode, mounted]);

  const handleSwitchToGUI = useCallback(() => {
    setIsTerminalMode(false);
  }, []);

  const handleSwitchToTerminal = useCallback(() => {
    setIsTerminalMode(true);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.key === "`") {
        e.preventDefault();
        setIsTerminalMode((prev) => !prev);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  if (!mounted) return null;

  return (
    <>
      <AnimatePresence mode="wait">
        {isTerminalMode ? (
          <motion.div
            key="terminal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50"
          >
            <Terminal onSwitchToGUI={handleSwitchToGUI} />
          </motion.div>
        ) : (
          <motion.div
            key="website"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Header 
              onToggleMode={() => setIsTerminalMode(!isTerminalMode)} 
              isTerminalMode={isTerminalMode}
              profile={profile}
            />
            <div className="pt-20">
              <Hero 
                profile={profile} 
                onSwitchToTerminal={handleSwitchToTerminal} 
              />
              <About profile={profile} />
              <Skills />
              <Projects />
              <Resume profile={profile} />
              <Contact profile={profile} />
              <footer className="py-8 text-center text-gray-500 text-sm">
                <p>© {new Date().getFullYear()} {profile.name}. All rights reserved.</p>
              </footer>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default function HomePage() {
  return (
    <AdminProvider>
      <PortfolioContent />
    </AdminProvider>
  );
}