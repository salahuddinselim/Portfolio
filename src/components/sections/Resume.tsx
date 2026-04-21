"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { FileText, Download, Eye, Mail, MapPin, Github, Linkedin, X, ExternalLink } from "lucide-react";
import { jsPDF } from "jspdf";

interface ResumeProps {
  profile?: {
    name?: string | null;
    email?: string | null;
    location?: string | null;
    github_link?: string | null;
    linkedin_link?: string | null;
  };
}

const education = [
  { institution: "United International University", degree: "BSc", field: "Computer Science & Engineering", period: "2022 - Present" },
  { institution: "Pirganj Govt. College", degree: "HSC", period: "2018 - 2020", grade: "GPA: 5.00 / 5.00" },
  { institution: "Pirganj Pilot High School", degree: "SSC", period: "2013 - 2018", grade: "GPA: 5.00 / 5.00" },
];

const skills = [
  { category: "Programming", items: ["C", "C++", "Java", "Python", "JavaScript"] },
  { category: "Web", items: ["HTML", "CSS", "Bootstrap", "PHP", "MySQL"] },
  { category: "Tools", items: ["Arduino", "JavaFX", "Git", "GitHub"] },
];

const projects = [
  { name: "Automated Fish Pond", desc: "IoT-based smart water quality monitoring system" },
  { name: "AI Voice Assistant", desc: "Python-based voice assistant" },
  { name: "TournyMate", desc: "Full-stack tournament management" },
  { name: "Multilevel Puzzle Game", desc: "JavaFX team puzzle game" },
];

const generatePDF = (profile?: { name?: string | null; email?: string | null; location?: string | null }) => {
  const doc = new jsPDF();
  const name = profile?.name || "Your Name";
  
  doc.setFontSize(20);
  doc.setFont("helvetica", "bold");
  doc.text(name, 20, 20);
  
  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(100);
  if (profile?.email) doc.text(`Email: ${profile.email}`, 20, 28);
  if (profile?.location) doc.text(`Location: ${profile.location}`, 20, profile?.email ? 34 : 28);
  
  let y = profile?.email && profile?.location ? 42 : (profile?.email || profile?.location ? 38 : 28);
  
  doc.setDrawColor(200);
  doc.line(20, y, 190, y);
  y += 10;
  
  doc.setFontSize(12);
  doc.setTextColor(0);
  doc.setFont("helvetica", "bold");
  doc.text("PROFESSIONAL SUMMARY", 20, y);
  y += 6;
  
  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");
  doc.text("Computer Science and Engineering student with strong skills in programming,", 20, y);
  y += 5;
  doc.text("software development, and problem-solving. Experienced in IoT, AI, and web dev.", 20, y);
  y += 10;
  
  doc.setFontSize(12);
  doc.setFont("helvetica", "bold");
  doc.text("EDUCATION", 20, y);
  y += 6;
  
  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");
  education.forEach(edu => {
    doc.setFont("helvetica", "bold");
    doc.text(`${edu.degree} in ${edu.field}`, 20, y);
    doc.setFont("helvetica", "normal");
    doc.text(`${edu.institution} | ${edu.period}`, 20, y + 5);
    if (edu.grade) doc.text(edu.grade, 20, y + 10);
    y += edu.grade ? 18 : 14;
  });
  
  y += 4;
  doc.setFontSize(12);
  doc.setFont("helvetica", "bold");
  doc.text("SKILLS", 20, y);
  y += 6;
  
  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");
  skills.forEach(skill => {
    doc.text(`${skill.category}: ${skill.items.join(", ")}`, 20, y);
    y += 5;
  });
  
  y += 4;
  doc.setFontSize(12);
  doc.setFont("helvetica", "bold");
  doc.text("PROJECTS", 20, y);
  y += 6;
  
  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");
  projects.forEach((proj, i) => {
    doc.setFont("helvetica", "bold");
    doc.text(`${i + 1}. ${proj.name}`, 20, y);
    doc.setFont("helvetica", "normal");
    doc.text(proj.desc, 20, y + 5);
    y += 12;
  });
  
  y += 4;
  doc.setFontSize(12);
  doc.setFont("helvetica", "bold");
  doc.text("EXPERIENCE", 20, y);
  y += 6;
  
  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");
  doc.text("Full-Stack Developer | Freelance | 2022 - Present", 20, y);
  y += 5;
  doc.setFont("helvetica", "normal");
  doc.text("Building web applications and IoT solutions.", 20, y);
  
  doc.save(`${name.replace(/\s+/g, "_")}_Resume.pdf`);
};

export default function Resume({ profile }: ResumeProps) {
  const [showPreview, setShowPreview] = useState(false);

  return (
    <section id="resume" className="min-h-screen py-16 sm:py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4"
        >
          My <span className="text-gradient">Resume</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-gray-400 mb-8 text-sm sm:text-base"
        >
          Preview or download my resume in PDF format
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-wrap gap-3 sm:gap-4 justify-center mb-8"
        >
          <button
            onClick={() => setShowPreview(true)}
            className="inline-flex items-center gap-2 px-4 sm:px-6 py-2.5 sm:py-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 transition-colors cursor-pointer text-sm sm:text-base"
          >
            <Eye size={16} className="sm:w-4 sm:h-4" />
            Preview
          </button>
          <button
            onClick={() => generatePDF(profile)}
            className="inline-flex items-center gap-2 px-4 sm:px-6 py-2.5 sm:py-3 rounded-xl bg-gradient-to-r from-cyan-500/10 to-blue-500/10 hover:from-cyan-500/20 hover:to-blue-500/20 text-cyan-400 border border-cyan-500/20 transition-colors cursor-pointer text-sm sm:text-base"
          >
            <Download size={16} className="sm:w-4 sm:h-4" />
            Download PDF
          </button>
        </motion.div>

        {showPreview && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/80 backdrop-blur-sm overflow-auto"
            onClick={() => setShowPreview(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-[#0a0a0a] border border-white/10 rounded-2xl p-4 sm:p-8 max-w-2xl w-full max-h-[90vh] overflow-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl sm:text-2xl font-bold">Resume Preview</h3>
                <button
                  onClick={() => setShowPreview(false)}
                  className="p-2 text-gray-400 hover:text-white transition-colors cursor-pointer"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="text-left space-y-4">
                <div className="border-b border-white/10 pb-4">
                  <h4 className="text-xl font-bold">{profile?.name || "Your Name"}</h4>
                  <div className="flex flex-wrap gap-3 sm:gap-4 text-xs sm:text-sm text-gray-400 mt-2">
                    {profile?.email && (
                      <span className="flex items-center gap-1">
                        <Mail size={12} /> {profile.email}
                      </span>
                    )}
                    {profile?.location && (
                      <span className="flex items-center gap-1">
                        <MapPin size={12} /> {profile.location}
                      </span>
                    )}
                  </div>
                </div>

                <div>
                  <h5 className="font-semibold text-cyan-400 mb-2">Education</h5>
                  {education.map((edu, i) => (
                    <div key={i} className="mb-2">
                      <div className="font-medium text-sm sm:text-base">{edu.degree} in {edu.field}</div>
                      <div className="text-gray-400 text-xs sm:text-sm">{edu.institution} | {edu.period}</div>
                    </div>
                  ))}
                </div>

                <div>
                  <h5 className="font-semibold text-cyan-400 mb-2">Skills</h5>
                  <div className="flex flex-wrap gap-2">
                    {skills.flatMap(s => s.items).map((skill) => (
                      <span key={skill} className="px-2 sm:px-3 py-1 rounded-lg bg-white/5 text-xs sm:text-sm">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <h5 className="font-semibold text-cyan-400 mb-2">Projects</h5>
                  {projects.map((proj, i) => (
                    <div key={i} className="mb-2">
                      <div className="font-medium text-sm sm:text-base">{proj.name}</div>
                      <div className="text-gray-400 text-xs sm:text-sm">{proj.desc}</div>
                    </div>
                  ))}
                </div>

                <div>
                  <h5 className="font-semibold text-cyan-400 mb-2">Experience</h5>
                  <div className="mb-2">
                    <div className="font-medium text-sm sm:text-base">Full-Stack Developer</div>
                    <div className="text-gray-400 text-xs sm:text-sm">Freelance | 2022 - Present</div>
                    <div className="text-gray-500 text-xs sm:text-sm">Building web applications and IoT solutions</div>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap gap-3 sm:gap-4 justify-center mt-6">
                <button
                  onClick={() => { generatePDF(profile); setShowPreview(false); }}
                  className="inline-flex items-center gap-2 px-4 sm:px-6 py-2.5 sm:py-3 rounded-xl bg-gradient-to-r from-cyan-500/10 to-blue-500/10 text-cyan-400 border border-cyan-500/20 transition-colors cursor-pointer text-sm sm:text-base"
                >
                  <Download size={16} className="sm:w-4 sm:h-4" />
                  Download PDF
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </div>
    </section>
  );
}