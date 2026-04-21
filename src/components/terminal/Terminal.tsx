"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { jsPDF } from "jspdf";

interface TerminalProps {
  onSwitchToGUI: () => void;
}

interface CommandOutput {
  id: string;
  command: string;
  output: React.ReactNode;
}

const bootLines = [
  { text: "Initializing system...", delay: 0 },
  { text: "Loading portfolio...", delay: 800 },
  { text: "Access granted.", delay: 1600 },
];

const profile = {
  name: "Salah Uddin Selim",
  role: "Software Engineer",
  shortBio: "CSE student at United International University. Passionate about building impactful solutions with modern technologies.",
  skills: [
    "Programming: C, C++, Java, Python, JavaScript",
    "Web Development: HTML, CSS, Bootstrap, PHP, MySQL",
    "Tools: Arduino, JavaFX, Git, GitHub",
  ],
  projects: [
    { name: "Automated Fish Pond", desc: "IoT-based smart water quality monitoring system" },
    { name: "AI Voice Assistant", desc: "Python-based voice assistant with speech recognition" },
    { name: "TournyMate", desc: "Full-stack tournament management web application" },
    { name: "Multilevel Puzzle Game", desc: "JavaFX-based team puzzle game with real-time chat" },
  ],
  contact: {
    email: "selimsalahuddin19@gmail.com",
    github: "https://github.com/salahuddinselim",
    linkedin: "https://linkedin.com/in/salahuddinselim",
    location: "Vatara, Dhaka, Bangladesh",
  },
};

const commands = [
  { cmd: "help", desc: "Show this help message" },
  { cmd: "about", desc: "About me" },
  { cmd: "skills", desc: "List my skills" },
  { cmd: "projects", desc: "Show my projects" },
  { cmd: "contact", desc: "Contact information" },
  { cmd: "resume", desc: "Download resume" },
  { cmd: "clear", desc: "Clear terminal" },
  { cmd: "gui", desc: "Switch to Website Mode" },
];

export default function Terminal({ onSwitchToGUI }: TerminalProps) {
  const [bootIndex, setBootIndex] = useState(-1);
  const [input, setInput] = useState("");
  const [outputs, setOutputs] = useState<CommandOutput[]>([]);
  const [showCursor, setShowCursor] = useState(true);
  const [isReady, setIsReady] = useState(false);
  const [suggestion, setSuggestion] = useState<string>("");
  const inputRef = useRef<HTMLInputElement>(null);
  const terminalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setInterval(() => setShowCursor(v => !v), 530);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (bootIndex < bootLines.length - 1) {
      const timeout = setTimeout(() => setBootIndex(i => i + 1), bootLines[bootIndex + 1]?.delay || 500);
      return () => clearTimeout(timeout);
    } else if (bootIndex === bootLines.length - 1) {
      setTimeout(() => setIsReady(true), 300);
    }
  }, [bootIndex]);

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [outputs]);

  useEffect(() => {
    if (input.length > 0 && isReady) {
      const matched = commands.find(c => c.cmd.startsWith(input.toLowerCase()));
      if (matched && matched.cmd !== input.toLowerCase()) {
        setSuggestion(matched.cmd);
      } else {
        setSuggestion("");
      }
    } else {
      setSuggestion("");
    }
  }, [input, isReady]);

  const generateResumePDF = useCallback(() => {
    const doc = new jsPDF();
    
    doc.setFontSize(20);
    doc.setFont("helvetica", "bold");
    doc.text("SALAH UDDIN SELIM", 20, 20);
    
    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(100);
    doc.text("Email: selimsalahuddin19@gmail.com | Location: Vatara, Dhaka, Bangladesh", 20, 28);
    doc.text("GitHub: github.com/salahuddinselim", 20, 34);
    
    doc.setDrawColor(200);
    doc.line(20, 40, 190, 40);
    
    doc.setFontSize(12);
    doc.setTextColor(0);
    doc.setFont("helvetica", "bold");
    doc.text("PROFESSIONAL SUMMARY", 20, 48);
    
    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    doc.text("Computer Science and Engineering student with strong skills in programming, software", 20, 54);
    doc.text("development, and problem-solving. Experienced in IoT, AI, and full-stack web development.", 20, 60);
    
    doc.setFontSize(12);
    doc.setFont("helvetica", "bold");
    doc.text("EDUCATION", 20, 72);
    
    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    doc.text("BSc in Computer Science & Engineering | United International University | 2022 - Present", 20, 78);
    doc.text("HSC | Pirganj Govt. College | 2018 - 2020 | GPA: 5.00", 20, 84);
    doc.text("SSC | Pirganj Pilot High School | 2013 - 2018 | GPA: 5.00", 20, 90);
    
    doc.setFontSize(12);
    doc.setFont("helvetica", "bold");
    doc.text("SKILLS", 20, 102);
    
    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    doc.text("Programming: C, C++, Java, Python, JavaScript", 20, 108);
    doc.text("Web Development: HTML, CSS, Bootstrap, PHP, MySQL", 20, 114);
    doc.text("Tools: Arduino, JavaFX, Git, GitHub", 20, 120);
    
    doc.setFontSize(12);
    doc.setFont("helvetica", "bold");
    doc.text("PROJECTS", 20, 132);
    
    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    doc.text("1. Automated Fish Pond - IoT water quality monitoring system", 20, 138);
    doc.text("2. AI Voice Assistant - Python-based voice assistant", 20, 144);
    doc.text("3. TournyMate - Full-stack tournament management web app", 20, 150);
    doc.text("4. Multilevel Puzzle Game - JavaFX team puzzle game", 20, 156);
    
    doc.setFontSize(12);
    doc.setFont("helvetica", "bold");
    doc.text("EXPERIENCE", 20, 168);
    
    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    doc.text("Full-Stack Developer | Freelance | 2022 - Present", 20, 174);
    doc.text("Building web applications and IoT solutions for clients worldwide.", 20, 180);
    
    doc.save("Salah_Uddin_Selim_Resume.pdf");
  }, []);

  const commandsOutput: Record<string, React.ReactNode> = {
    help: (
      <div className="space-y-2">
        <div className="text-cyan-400 mb-2">Available commands:</div>
        {commands.map(c => (
          <div key={c.cmd}>
            <span className="text-purple-400 font-mono">{c.cmd.padEnd(10)}</span>
            <span className="text-gray-400">- {c.desc}</span>
          </div>
        ))}
        <div className="text-gray-500 mt-3 text-sm">Press Tab to autocomplete</div>
      </div>
    ),
    about: (
      <div className="space-y-2">
        <div className="text-xl font-bold text-gradient">{profile.name}</div>
        <div className="text-cyan-400">{profile.role}</div>
        <div className="text-gray-300 mt-2">{profile.shortBio}</div>
      </div>
    ),
    skills: (
      <div className="space-y-2">
        <div className="text-purple-400 font-semibold">Skills:</div>
        {profile.skills.map((skill, i) => (
          <div key={i} className="text-gray-300">{skill}</div>
        ))}
      </div>
    ),
    projects: (
      <div className="space-y-2">
        <div className="text-purple-400 font-semibold mb-2">Projects:</div>
        {profile.projects.map((project, i) => (
          <div key={i} className="ml-2">
            <span className="text-cyan-400">▸</span> <span className="font-medium">{project.name}</span>
            <div className="text-gray-400 ml-4 text-sm">{project.desc}</div>
          </div>
        ))}
      </div>
    ),
    contact: (
      <div className="space-y-2">
        <div className="text-purple-400 font-semibold">Contact:</div>
        <div>Email: <span className="text-cyan-400">{profile.contact.email}</span></div>
        <div>GitHub: <span className="text-cyan-400">{profile.contact.github}</span></div>
        <div>Location: <span className="text-cyan-400">{profile.contact.location}</span></div>
      </div>
    ),
    resume: (
      <div className="space-y-3">
        <div className="text-purple-400 font-semibold">Resume:</div>
        <button 
          onClick={generateResumePDF}
          className="mt-2 px-4 py-2 rounded-lg bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-400 cursor-pointer transition-colors"
        >
          ⬇ Download Resume
        </button>
      </div>
    ),
    gui: (
      <span className="text-green-400">[+] Switching to Website Mode...</span>
    ),
  };

  const handleCommand = useCallback((cmd: string) => {
    const trimmed = cmd.trim().toLowerCase();
    const command = trimmed.split(" ")[0];
    
    if (!command) return;
    
    if (command === "clear") {
      setOutputs([]);
      return;
    }
    
    if (command === "gui") {
      setOutputs(prev => [...prev, { id: Date.now().toString(), command: cmd, output: commandsOutput.gui }]);
      setTimeout(() => onSwitchToGUI(), 500);
      return;
    }
    
    if (command === "resume") {
      setOutputs(prev => [...prev, { id: Date.now().toString(), command: cmd, output: commandsOutput.resume }]);
      generateResumePDF();
      return;
    }
    
    const output = commandsOutput[command];
    if (output) {
      setOutputs(prev => [...prev, { id: Date.now().toString(), command: cmd, output }]);
    } else {
      setOutputs(prev => [...prev, { 
        id: Date.now().toString(), 
        command: cmd, 
        output: <span className="text-red-400">Command not found: '{command}'. Type 'help' for available commands.</span>
      }]);
    }
  }, [commandsOutput, onSwitchToGUI, generateResumePDF]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (suggestion) {
      setInput(suggestion);
      setSuggestion("");
    } else if (input.trim()) {
      handleCommand(input);
      setInput("");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Tab" && suggestion) {
      e.preventDefault();
      setInput(suggestion);
      setSuggestion("");
    }
  };

  const focusInput = () => inputRef.current?.focus();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.key === "`") {
        e.preventDefault();
        onSwitchToGUI();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onSwitchToGUI]);

  return (
    <div 
      className="min-h-screen bg-[#0a0a0a] flex items-center justify-center p-4"
    >
      <div 
        ref={terminalRef}
        className="w-full max-w-3xl h-[70vh] bg-[#111111] border border-white/10 rounded-2xl overflow-hidden flex flex-col shadow-2xl shadow-black/50 font-mono"
      >
        <AnimatePresence mode="wait">
          {!isReady ? (
            <motion.div
              key="boot"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex-1 flex items-center justify-center"
            >
              <div className="text-center space-y-4">
                <div className="w-16 h-16 mx-auto rounded-full bg-cyan-500/20 flex items-center justify-center">
                  <span className="text-2xl">⚡</span>
                </div>
                <div className="space-y-2">
                  {bootLines.map((line, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: i <= bootIndex ? 1 : 0 }}
                      transition={{ duration: 0.3 }}
                      className="text-gray-500 text-sm"
                    >
                      {line.text}
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="terminal"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex-1 overflow-y-auto p-4 space-y-1"
            >
              <div className="text-purple-400 mb-4">
                <span className="text-cyan-400">➜</span> {profile.name}
                <div className="text-gray-500 ml-1">{profile.role}</div>
              </div>
              
              <div className="text-gray-500 mb-4 text-sm">
                Type <span className="text-cyan-400">help</span> to see commands or <span className="text-cyan-400">gui</span> for website
              </div>

              {outputs.map(({ id, command, output }) => (
                <div key={id} className="space-y-1">
                  <div>
                    <span className="text-purple-400">guest@portfolio</span>
                    <span className="text-gray-600">:$ </span>
                    <span className="text-gray-200">{command}</span>
                  </div>
                  <div className="ml-2 text-gray-300">{output}</div>
                </div>
              ))}

              <form onSubmit={handleSubmit} className="flex items-center">
                <span className="text-purple-400">guest@portfolio</span>
                <span className="text-gray-600">:$ </span>
                <div className="relative flex-1">
                  <input
                    ref={inputRef}
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    className="w-full bg-transparent outline-none text-white ml-0"
                    autoFocus
                    autoComplete="off"
                    spellCheck={false}
                  />
                  {showCursor && input && (
                    <span className="absolute right-0 w-2 h-5 bg-cyan-400 animate-pulse" />
                  )}
                </div>
              </form>
              
              {suggestion && input && (
                <div className="text-gray-500 text-sm mt-1">
                  Suggestion: <span className="text-cyan-400 cursor-pointer" onClick={() => { setInput(suggestion); setSuggestion(""); }}>{suggestion}</span> (Press Tab)
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}