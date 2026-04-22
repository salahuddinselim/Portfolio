"use client";

import { motion } from "framer-motion";
import Navbar from "./Navbar";
import Hero from "./Hero";
import About from "./About";
import Skills from "./Skills";
import Experience from "./Experience";
import Projects from "./Projects";
import Resume from "./Resume";
import Contact from "./Contact";

export default function Website({ onSwitchToTerminal }: { onSwitchToTerminal: () => void }) {
  return (
    <div className="min-h-screen bg-slate-950">
      {/* Terminal Toggle Button - Fixed, Sticky, Visible */}
      <motion.button
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        onClick={onSwitchToTerminal}
        className="fixed top-1/2 -translate-y-1/2 right-4 z-50 px-4 py-3 bg-cyan-500 text-slate-950 font-medium rounded-full text-sm shadow-lg shadow-cyan-500/20 hover:bg-cyan-400 flex items-center gap-2"
        aria-label="Switch to Terminal mode"
      >
        <span>Terminal</span>
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l3 3m0 0l-3 3m3-3H5a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-6a2 2 0 00-2-2H8z" />
        </svg>
      </motion.button>
      
      <Navbar />
      
      <main id="main-content" role="main">
        <Hero />
        <About />
        <Skills />
        <Experience />
        <Projects />
        <Resume />
        <Contact />
      </main>
    </div>
  );
}