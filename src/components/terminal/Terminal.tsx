"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { createClient } from "@/lib/supabase";
import { generateResumePDF } from "@/lib/resume";

interface Profile {
  name?: string;
  role?: string;
  email?: string;
  location?: string;
  bio?: string;
  github_link?: string;
  linkedin_link?: string;
}

interface Skill {
  id: string;
  name: string;
  category: string;
}

interface Project {
  id: string;
  title: string;
  description: string;
  tech_stack: string[];
  github_link?: string;
  live_link?: string;
}

interface Education {
  id: string;
  institution: string;
  degree: string;
  field_of_study?: string;
  start_date: string;
  end_date?: string;
  currently_studying?: boolean;
}

interface Experience {
  id: string;
  company: string;
  position: string;
  start_date: string;
  end_date?: string;
  currently_working?: boolean;
  description?: string;
}

interface TerminalData {
  profile: Profile | null;
  skills: Skill[];
  projects: Project[];
  education: Education[];
  experience: Experience[];
}

const commands = {
  help: { description: "Show all available commands", usage: "help" },
  about: { description: "Learn about me and my background", usage: "about" },
  skills: { description: "View my technical skills and expertise", usage: "skills" },
  projects: { description: "Browse my featured projects", usage: "projects" },
  contact: { description: "Get my contact information", usage: "contact" },
  resume: { description: "View resume info", usage: "resume" },
  "resume download": { description: "Download resume as PDF", usage: "resume download" },
  github: { description: "Visit my GitHub profile", usage: "github" },
  linkedin: { description: "Visit my LinkedIn profile", usage: "linkedin" },
  gui: { description: "Switch to visual interface mode", usage: "gui" },
  clear: { description: "Clear the terminal screen", usage: "clear" },
  whoami: { description: "Display current user info", usage: "whoami" },
  date: { description: "Show current date and time", usage: "date" },
  neofetch: { description: "System information display", usage: "neofetch" },
  education: { description: "View my education background", usage: "education" },
  experience: { description: "View my work experience", usage: "experience" },
};

const BootSequence = ({ onComplete }: { onComplete: () => void }) => {
  const lines = [
    { text: "INITIALIZING SYSTEM...", delay: 0 },
    { text: "LOADING KERNEL MODULES...", delay: 800 },
    { text: "ESTABLISHING SECURE CONNECTION...", delay: 1600 },
    { text: "FETCHING DATABASE...", delay: 2000 },
    { text: "ACCESS GRANTED", delay: 2400, success: true },
  ];

  useEffect(() => {
    const timer = setTimeout(onComplete, 3200);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div className="font-mono text-sm space-y-1">
      {lines.map((line, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: line.delay / 1000 }}
          className={line.success ? "text-cyan-400" : "text-slate-500"}
        >
          {line.success ? "✓" : ">"} {line.text}
          {line.success && (
            <span className="ml-2 text-violet-400">[ COMPLETE ]</span>
          )}
        </motion.div>
      ))}
    </div>
  );
};

export default function Terminal({ onSwitchToGui }: { onSwitchToGui: () => void }) {
  const [history, setHistory] = useState<{ type: "input" | "output"; content: string }[]>([]);
  const [input, setInput] = useState("");
  const [booted, setBooted] = useState(false);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showHelp, setShowHelp] = useState(false);
  const [showGuiPreview, setShowGuiPreview] = useState(false);
  const [data, setData] = useState<TerminalData>({
    profile: null,
    skills: [],
    projects: [],
    education: [],
    experience: [],
  });
  const [loading, setLoading] = useState(true);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const supabase = createClient();
        const [profileRes, skillsRes, projectsRes, eduRes, expRes] = await Promise.all([
          supabase.from("profiles").select("*").limit(1).maybeSingle(),
          supabase.from("skills").select("*"),
          supabase.from("projects").select("*"),
          supabase.from("education").select("*"),
          supabase.from("experience").select("*"),
        ]);

        setData({
          profile: profileRes.data || null,
          skills: skillsRes.data || [],
          projects: projectsRes.data || [],
          education: eduRes.data || [],
          experience: expRes.data || [],
        });
      } catch (e) {
        console.error("Error fetching terminal data:", e);
      }
      setLoading(false);
    };
    fetchData();
  }, []);

  const processCommand = useCallback((cmd: string): string => {
    const command = cmd.trim().toLowerCase();
    const { profile, skills, projects, education, experience } = data;

    const name = profile?.name || "User";
    const role = profile?.role || "Developer";
    const location = profile?.location || "Unknown";
    const email = profile?.email || "";
    const bio = profile?.bio || "";
    const github = profile?.github_link || "";
    const linkedin = profile?.linkedin_link || "";

    switch (command) {
      case "help":
        setShowHelp(true);
        return `AVAILABLE COMMANDS:
─────────────────────────────────────────
about      - Learn about me
skills     - View my technical skills
projects   - Browse featured projects
experience - View work experience
education  - View education background
contact    - Get contact information
resume     - Download/view my resume
github     - Visit GitHub profile
linkedin   - Visit LinkedIn profile
gui        - Switch to visual mode
neofetch   - System info
whoami     - Current user
date       - Current date/time
clear      - Clear screen
─────────────────────────────────────────`;

      case "about":
        return `ABOUT ME
═══════════════════════════════════════
Name:     ${name}
Role:     ${role}
Location: ${location}

${bio || "No bio available."}

Education: Type 'education' for details
Experience: Type 'experience' for details`;

      case "skills":
        if (skills.length === 0) return "No skills found in database.";
        const grouped = skills.reduce((acc, skill) => {
          acc[skill.category] = acc[skill.category] || [];
          acc[skill.category].push(skill.name);
          return acc;
        }, {} as Record<string, string[]>);
        let skillsOutput = `TECHNICAL SKILLS
═══════════════════════════════════════`;
        Object.entries(grouped).forEach(([cat, items]) => {
          skillsOutput += `\n${cat.toUpperCase()}: ${items.join(", ")}`;
        });
        skillsOutput += `\n\nType 'gui' to see skills with icons.`;
        return skillsOutput;

      case "projects":
        if (projects.length === 0) return "No projects found in database.";
        let projectsOutput = `FEATURED PROJECTS
═══════════════════════════════════════`;
        projects.forEach((proj, i) => {
          projectsOutput += `\n\n${i + 1}. ${proj.title}`;
          projectsOutput += `\n   ${proj.description?.slice(0, 80)}${proj.description?.length > 80 ? "..." : ""}`;
          if (proj.tech_stack?.length > 0) {
            projectsOutput += `\n   Tech: ${proj.tech_stack.join(", ")}`;
          }
        });
        projectsOutput += `\n\nUse 'gui' for full details with links.`;
        return projectsOutput;

      case "experience":
        if (experience.length === 0) return "No experience found in database.";
        let expOutput = `WORK EXPERIENCE
═══════════════════════════════════════`;
        experience.forEach((exp) => {
          expOutput += `\n\n${exp.position}`;
          expOutput += `\n${exp.company} | ${exp.start_date} - ${exp.currently_working ? "Present" : exp.end_date || ""}`;
          if (exp.description) {
            expOutput += `\n${exp.description.slice(0, 100)}${exp.description.length > 100 ? "..." : ""}`;
          }
        });
        return expOutput;

      case "education":
        if (education.length === 0) return "No education found in database.";
        let eduOutput = `EDUCATION
═══════════════════════════════════════`;
        education.forEach((edu) => {
          eduOutput += `\n\n${edu.degree}${edu.field_of_study ? ` in ${edu.field_of_study}` : ""}`;
          eduOutput += `\n${edu.institution}`;
          eduOutput += `\n${edu.start_date} - ${edu.currently_studying ? "Present" : edu.end_date || ""}`;
        });
        return eduOutput;

      case "contact":
        return `CONTACT INFORMATION
═══════════════════════════════════════
Email:    ${email || "Not provided"}
GitHub:   ${github || "Not provided"}
LinkedIn: ${linkedin || "Not provided"}
Location: ${location}`;

      case "resume":
        return `RESUME
═══════════════════════════════════════
Type 'resume download' to download PDF directly,
or use 'gui' and visit Resume section.`;

      case "resume download":
        (async () => {
          try {
            const blob = await generateResumePDF({ profile, skills, projects, education, experience });
            const url = URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            const fileName = (profile?.name || 'resume') + '.pdf';
            link.download = fileName;
            link.click();
            URL.revokeObjectURL(url);
          } catch (e) {
            console.error("Error generating PDF:", e);
          }
        })();
        return "Generating and downloading resume PDF...";

      case "github":
        if (github) {
          window.open(github, "_blank");
          return `Opening ${github}...`;
        }
        return "GitHub link not configured.";

      case "linkedin":
        if (linkedin) {
          window.open(linkedin, "_blank");
          return `Opening ${linkedin}...`;
        }
        return "LinkedIn link not configured.";

      case "gui":
        setShowGuiPreview(true);
        onSwitchToGui();
        return "";

      case "clear":
        setHistory([]);
        return "";

      case "whoami":
        return "guest@" + (profile?.name?.toLowerCase().replace(" ", "-") || "portfolio");

      case "date":
        return new Date().toLocaleString("en-US", {
          weekday: "long",
          year: "numeric",
          month: "long",
          day: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        });

      case "neofetch":
        return `╭──���───────────────────────────────╮
│  ${profile?.name?.toUpperCase() || "PORTFOLIO"}         │
│  ${profile?.role || "Developer"}      │
╰──────────────────────────────────╯
  OS:       Next.js 15.3
  Host:     ${profile?.location || "Unknown"}
  Contact:  ${profile?.email || "N/A"}
  Projects: ${projects.length}
  Skills:   ${skills.length}
  v1.0.0`;

      case "":
        return "";

      default:
        return `Command not found: ${command}
Type 'help' for available commands.`;
    }
  }, [data, onSwitchToGui]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    
    const output = processCommand(input);
    if (output && !showHelp) {
      setHistory([...history, { type: "input", content: input }, { type: "output", content: output }]);
    } else if (showHelp || input.toLowerCase().startsWith("help")) {
      setHistory([...history, { type: "input", content: input }, { type: "output", content: output }]);
      setShowHelp(false);
    }
    setInput("");
    setSuggestions([]);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInput(value);
    
    if (value.length > 0) {
      const matches = Object.keys(commands).filter(cmd => cmd.startsWith(value.toLowerCase()));
      setSuggestions(matches.slice(0, 5));
    } else {
      setSuggestions([]);
    }
  };

  const selectSuggestion = (suggestion: string) => {
    setInput(suggestion);
    setSuggestions([]);
    inputRef.current?.focus();
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 font-mono p-4 md:p-8">
        <div className="max-w-4xl mx-auto">
          <p className="text-slate-500">Loading database...</p>
        </div>
      </div>
    );
  }

  const handleGuiPreviewDownload = async () => {
    try {
      const { profile, skills, projects, education, experience } = data;
      const blob = await generateResumePDF({ profile, skills, projects, education, experience });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      const fileName = (profile?.name || 'resume') + '.pdf';
      link.download = fileName;
      link.click();
      URL.revokeObjectURL(url);
    } catch (e) {
      console.error("Error generating PDF:", e);
    }
  };

  if (showGuiPreview) {
    const { profile, skills, projects, education, experience } = data;
    return (
      <div className="min-h-screen bg-slate-950 font-mono p-4 md:p-8">
        <div className="max-w-4xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }}
            className="glass rounded-2xl p-8"
          >
            <h2 className="text-xl font-bold text-slate-200 mb-4">CV Preview</h2>
            
            {/* Header */}
            <div className="border-b border-white/10 pb-4 mb-4">
              <h3 className="text-lg font-bold text-slate-200">{profile?.name || "Your Name"}</h3>
              <p className="text-cyan-400 text-sm">{profile?.role || "Full Stack Developer"}</p>
              <div className="text-xs text-slate-400 mt-2 space-y-1">
                {profile?.email && <p>Email: {profile.email}</p>}
                {profile?.location && <p>Location: {profile.location}</p>}
              </div>
            </div>

            {/* Summary */}
            {profile?.bio && (
              <div className="mb-4">
                <h4 className="text-sm font-semibold text-slate-300 mb-1">Summary</h4>
                <p className="text-xs text-slate-400">{profile.bio.slice(0, 150)}...</p>
              </div>
            )}

            {/* Skills */}
            {skills.length > 0 && (
              <div className="mb-4">
                <h4 className="text-sm font-semibold text-slate-300 mb-1">Skills</h4>
                <p className="text-xs text-slate-400">{skills.map(s => s.name).join(", ")}</p>
              </div>
            )}

            {/* Projects count */}
            {projects.length > 0 && (
              <div className="mb-4">
                <h4 className="text-sm font-semibold text-slate-300 mb-1">Projects</h4>
                <p className="text-xs text-slate-400">{projects.map(p => p.title).join(", ")}</p>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex gap-4 mt-6 pt-4 border-t border-white/10">
              <button
                onClick={handleGuiPreviewDownload}
                className="px-4 py-2 bg-cyan-500 text-slate-950 text-sm font-medium rounded hover:bg-cyan-400"
              >
                Download PDF
              </button>
              <button
                onClick={() => setShowGuiPreview(false)}
                className="px-4 py-2 glass text-slate-300 text-sm rounded hover:bg-white/10"
              >
                Back to Terminal
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 font-mono p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        {!booted ? (
          <BootSequence onComplete={() => setBooted(true)} />
        ) : (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-3 h-3 rounded-full bg-red-500/80" />
              <div className="w-3 h-3 rounded-full bg-amber-500/80" />
              <div className="w-3 h-3 rounded-full bg-green-500/80" />
              <span className="ml-4 text-slate-500 text-sm">
                guest@{data.profile?.name?.toLowerCase().replace(" ", "-") || "portfolio"} ~
              </span>
            </div>

            <AnimatePresence>
              {history.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="mb-2"
                >
                  {item.type === "input" ? (
                    <div className="flex">
                      <span className="text-cyan-400 mr-2">$</span>
                      <span className="text-slate-200">{item.content}</span>
                    </div>
                  ) : (
                    <pre className="text-slate-400 whitespace-pre-wrap text-sm">{item.content}</pre>
                  )}
                </motion.div>
              ))}
            </AnimatePresence>

            <form onSubmit={handleSubmit} className="relative">
              <div className="flex items-center">
                <span className="text-cyan-400 mr-2">$</span>
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={handleInputChange}
                  className="flex-1 bg-transparent outline-none text-slate-200 placeholder-slate-600"
                  placeholder="Type 'help' for commands"
                  autoFocus
                />
              </div>
              
              <AnimatePresence>
                {suggestions.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute top-full left-0 mt-2 bg-slate-900/90 backdrop-blur-sm rounded-lg overflow-hidden z-10 border border-slate-800"
                  >
                    {suggestions.map((suggestion) => (
                      <button
                        key={suggestion}
                        type="button"
                        onClick={() => selectSuggestion(suggestion)}
                        className="w-full px-4 py-2 text-left text-sm hover:bg-slate-800 transition-colors flex items-center justify-between"
                      >
                        <span className="text-cyan-400">{suggestion}</span>
                        <span className="text-slate-500 text-xs">{commands[suggestion as keyof typeof commands]?.description}</span>
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </form>

            <div className="mt-4 text-slate-600 text-xs">
              <span className="text-cyan-400">Tip:</span> Type 'help' for commands, 'gui' for visual mode
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}