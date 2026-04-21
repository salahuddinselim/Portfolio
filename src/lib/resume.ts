"use client";

import { jsPDF } from "jspdf";

export function generateResumePDF(profile?: {
  name?: string | null;
  email?: string | null;
  location?: string | null;
  github_link?: string | null;
  linkedin_link?: string | null;
}, education?: any[], skills?: any[], projects?: any[], experience?: any[]) {
  const doc = new jsPDF();
  
  const name = profile?.name || "Your Name";
  const email = profile?.email || "email@example.com";
  const location = profile?.location || "Location";
  
  doc.setFontSize(20);
  doc.setFont("helvetica", "bold");
  doc.text(name, 20, 20);
  
  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(100);
  doc.text(`Email: ${email} | Location: ${location}`, 20, 28);
  
  if (profile?.github_link || profile?.linkedin_link) {
    let links = "Links: ";
    if (profile?.github_link) links += profile.github_link;
    if (profile?.linkedin_link) links += " | " + profile.linkedin_link;
    doc.text(links, 20, 34);
  }
  
  doc.setDrawColor(200);
  doc.line(20, 40, 190, 40);
  
  doc.setFontSize(12);
  doc.setTextColor(0);
  doc.setFont("helvetica", "bold");
  doc.text("PROFESSIONAL SUMMARY", 20, 48);
  
  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");
  const summary = "Computer Science and Engineering student with strong skills in programming, software development, and problem-solving. Experienced in IoT systems, AI applications, and full-stack web development.";
  const summaryLines = doc.splitTextToSize(summary, 170);
  doc.text(summaryLines, 20, 54);
  
  let yPos = 54 + summaryLines.length * 5 + 10;
  
  doc.setFontSize(12);
  doc.setFont("helvetica", "bold");
  doc.text("EDUCATION", 20, yPos);
  yPos += 6;
  
  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");
  
  const eduList = [
    { level: "BSc in Computer Science & Engineering", school: "United International University", year: "2022 - Present" },
    { level: "HSC", school: "Pirganj Govt. College", year: "2018 - 2020 | GPA: 5.00" },
    { level: "SSC", school: "Pirganj Pilot High School", year: "2013 - 2018 | GPA: 5.00" },
  ];
  
  eduList.forEach(edu => {
    doc.setFont("helvetica", "bold");
    doc.text(edu.level, 20, yPos);
    doc.setFont("helvetica", "normal");
    doc.text(`${edu.school} | ${edu.year}`, 20, yPos + 5);
    yPos += 12;
  });
  
  doc.setFontSize(12);
  doc.setFont("helvetica", "bold");
  doc.text("SKILLS", 20, yPos);
  yPos += 6;
  
  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");
  const skillList = ["Programming: C, C++, Java, Python, JavaScript", "Web: HTML, CSS, Bootstrap, PHP, MySQL", "Tools: Arduino, JavaFX, Git, GitHub"];
  skillList.forEach(skill => {
    doc.text(skill, 20, yPos);
    yPos += 5;
  });
  
  yPos += 5;
  doc.setFontSize(12);
  doc.setFont("helvetica", "bold");
  doc.text("PROJECTS", 20, yPos);
  yPos += 6;
  
  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");
  
  const projList = [
    { name: "Automated Fish Pond", desc: "IoT-based smart water quality monitoring system using Arduino" },
    { name: "AI Voice Assistant", desc: "Python-based voice assistant using SpeechRecognition" },
    { name: "TournyMate", desc: "Full-stack tournament management web application" },
    { name: "Multilevel Puzzle Game", desc: "JavaFX-based team puzzle game" },
  ];
  
  projList.forEach(proj => {
    doc.setFont("helvetica", "bold");
    doc.text(proj.name, 20, yPos);
    doc.setFont("helvetica", "normal");
    const descLines = doc.splitTextToSize(proj.desc, 170);
    doc.text(descLines, 20, yPos + 5);
    yPos += 5 + descLines.length * 5 + 3;
  });
  
  yPos += 5;
  doc.setFontSize(12);
  doc.setFont("helvetica", "bold");
  doc.text("EXPERIENCE", 20, yPos);
  yPos += 6;
  
  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");
  doc.text("Full-Stack Developer | Freelance | 2022 - Present", 20, yPos);
  yPos += 5;
  doc.setFont("helvetica", "normal");
  const expDesc = "Building web applications and IoT solutions for clients worldwide.";
  const expLines = doc.splitTextToSize(expDesc, 170);
  doc.text(expLines, 20, yPos);
  
  doc.save(`${name.replace(/\s+/g, '_')}_Resume.pdf`);
}