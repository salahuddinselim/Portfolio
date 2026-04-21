import { jsPDF } from "jspdf";

export async function generateResumePDF(data: {
  profile: any;
  education: any[];
  experience: any[];
  skills: any[];
  projects: any[];
}) {
  const { profile, education, experience, skills, projects } = data;
  const doc = new jsPDF();
  
  const primaryColor = "#06b6d4";
  const textColor = "#1e293b";
  const grayColor = "#64748b";
  
  let y = 20;
  const leftMargin = 20;
  const pageWidth = 170;
  
  // Name
  doc.setFontSize(22);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(textColor);
  doc.text(profile?.name || "Your Name", leftMargin, y);
  y += 8;
  
  // Role
  doc.setFontSize(12);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(primaryColor);
  doc.text(profile?.role || "Full Stack Developer", leftMargin, y);
  y += 8;
  
  // Contact Info
  doc.setFontSize(9);
  doc.setTextColor(grayColor);
  let contactLine = "";
  if (profile?.email) contactLine += `${profile.email}  |  `;
  if (profile?.location) contactLine += `${profile.location}  |  `;
  if (profile?.github_link) contactLine += `GitHub: ${profile.github_link}  |  `;
  if (profile?.linkedin_link) contactLine += `LinkedIn: ${profile.linkedin_link}`;
  doc.text(contactLine, leftMargin, y);
  y += 10;
  
  // Divider
  doc.setDrawColor(200, 200, 200);
  doc.line(leftMargin, y, leftMargin + pageWidth, y);
  y += 8;
  
  // Summary
  if (profile?.bio) {
    doc.setFontSize(11);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(textColor);
    doc.text("Summary", leftMargin, y);
    y += 6;
    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    const summaryLines = doc.splitTextToSize(profile.bio, pageWidth);
    doc.text(summaryLines, leftMargin, y);
    y += summaryLines.length * 5 + 8;
  }
  
  // Education
  if (education?.length > 0) {
    doc.setFontSize(11);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(textColor);
    doc.text("Education", leftMargin, y);
    y += 6;
    
    education.forEach((edu: any) => {
      doc.setFontSize(10);
      doc.setFont("helvetica", "bold");
      doc.setTextColor(textColor);
      doc.text(edu.institution || "", leftMargin, y);
      y += 5;
      
      doc.setFont("helvetica", "normal");
      doc.setTextColor(grayColor);
      let eduLine = edu.degree || "";
      if (edu.field_of_study) eduLine += ` in ${edu.field_of_study}`;
      doc.text(eduLine, leftMargin, y);
      y += 5;
      
      let dateLine = " ";
      if (edu.start_date) dateLine += edu.start_date;
      if (edu.end_date || edu.currently_studying) {
        dateLine += " - " + (edu.currently_studying ? "Present" : edu.end_date || "");
      }
      if (edu.grade) dateLine += ` | Grade: ${edu.grade}`;
      doc.setFontSize(9);
      doc.text(dateLine, leftMargin, y);
      y += 8;
    });
  }
  
  // Experience
  if (experience?.length > 0) {
    doc.setFontSize(11);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(textColor);
    doc.text("Experience", leftMargin, y);
    y += 6;
    
    experience.forEach((exp: any) => {
      doc.setFontSize(10);
      doc.setFont("helvetica", "bold");
      doc.setTextColor(textColor);
      doc.text(exp.position || "", leftMargin, y);
      
      doc.setFont("helvetica", "normal");
      doc.setTextColor(grayColor);
      const dateLine = exp.start_date + " - " + (exp.currently_working ? "Present" : exp.end_date || "");
      const dateWidth = doc.getTextWidth(dateLine);
      doc.text(dateLine, leftMargin + pageWidth - dateWidth, y);
      y += 5;
      
      doc.setFont("helvetica", "normal");
      doc.setTextColor(grayColor);
      doc.text(exp.company || "", leftMargin, y);
      y += 5;
      
      if (exp.description) {
        doc.setFontSize(9);
        const descLines = doc.splitTextToSize(exp.description, pageWidth);
        doc.text(descLines, leftMargin, y);
        y += descLines.length * 4 + 4;
      }
      y += 4;
    });
  }
  
  // Skills
  if (skills?.length > 0) {
    doc.setFontSize(11);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(textColor);
    doc.text("Technical Skills", leftMargin, y);
    y += 6;
    
    doc.setFontSize(9);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(textColor);
    const skillNames = skills.map((s: any) => s.name).join(", ");
    const skillsLines = doc.splitTextToSize(skillNames, pageWidth);
    doc.text(skillsLines, leftMargin, y);
    y += skillsLines.length * 5 + 8;
  }
  
  // Projects
  if (projects?.length > 0) {
    doc.setFontSize(11);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(textColor);
    doc.text("Projects", leftMargin, y);
    y += 6;
    
    projects.slice(0, 5).forEach((proj: any) => {
      doc.setFontSize(10);
      doc.setFont("helvetica", "bold");
      doc.setTextColor(textColor);
      doc.text(proj.title || "", leftMargin, y);
      y += 5;
      
      doc.setFont("helvetica", "normal");
      doc.setTextColor(grayColor);
      if (proj.description) {
        const descLines = doc.splitTextToSize(proj.description, pageWidth);
        doc.text(descLines.slice(0, 2), leftMargin, y);
        y += descLines.slice(0, 2).length * 4;
      }
      
      if (proj.tech_stack?.length > 0) {
        doc.setFontSize(8);
        doc.setTextColor(primaryColor);
        doc.text("Tech: " + proj.tech_stack.join(", "), leftMargin, y);
      }
      y += 8;
    });
  }
  
  // Return as blob
  return doc.output("blob");
}