"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FiDownload, FiMail, FiMapPin, FiGithub, FiLinkedin, FiCalendar } from "react-icons/fi";
import { createClient } from "@/lib/supabase";
import { generateResumePDF } from "@/lib/resume";

export default function Resume() {
  const [profile, setProfile] = useState<any>(null);
  const [education, setEducation] = useState<any[]>([]);
  const [experience, setExperience] = useState<any[]>([]);
  const [skills, setSkills] = useState<any[]>([]);
  const [projects, setProjects] = useState<any[]>([]);
  const [generating, setGenerating] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const supabase = createClient();
        const [profileRes, eduRes, expRes, skillsRes, projectsRes] = await Promise.all([
          supabase.from("profiles").select("*").limit(1).maybeSingle(),
          supabase.from("education").select("*"),
          supabase.from("experience").select("*"),
          supabase.from("skills").select("*"),
          supabase.from("projects").select("*"),
        ]);
        
        if (profileRes.data) setProfile(profileRes.data);
        if (eduRes.data) setEducation(eduRes.data);
        if (expRes.data) setExperience(expRes.data);
        if (skillsRes.data) setSkills(skillsRes.data);
        if (projectsRes.data) setProjects(projectsRes.data);
      } catch (e) {
        console.error("Error fetching resume data:", e);
      }
    };
    fetchData();
  }, []);

  const handleDownload = async () => {
    setGenerating(true);
    try {
      const blob = await generateResumePDF({ profile, education, experience, skills, projects });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `${profile?.name || 'resume'}.pdf`;
      link.click();
      URL.revokeObjectURL(url);
    } catch (e) {
      console.error("Error generating PDF:", e);
    }
    setGenerating(false);
  };

  return (
    <section id="resume" className="py-24">
      <div className="max-w-4xl mx-auto px-4 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="font-display text-4xl font-bold mb-4">
            My <span className="text-gradient">Resume</span>
          </h2>
          <p className="text-slate-400">Download my resume in PDF format</p>
        </motion.div>

        {/* Resume Preview Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass rounded-2xl p-8 mb-8"
        >
          {/* Header */}
          <div className="text-center mb-6 pb-6 border-b border-white/10">
            <h3 className="font-display text-2xl font-bold text-slate-200">
              {profile?.name || "Your Name"}
            </h3>
            <p className="text-cyan-400 mt-1">{profile?.role || "Full Stack Developer"}</p>
            <div className="flex flex-wrap justify-center gap-4 mt-3 text-sm text-slate-400">
              {profile?.email && (
                <span className="flex items-center gap-1">
                  <FiMail className="w-4 h-4" /> {profile.email}
                </span>
              )}
              {profile?.location && (
                <span className="flex items-center gap-1">
                  <FiMapPin className="w-4 h-4" /> {profile.location}
                </span>
              )}
              {profile?.github_link && (
                <a href={profile.github_link} target="_blank" className="flex items-center gap-1 hover:text-cyan-400">
                  <FiGithub className="w-4 h-4" /> GitHub
                </a>
              )}
              {profile?.linkedin_link && (
                <a href={profile.linkedin_link} target="_blank" className="flex items-center gap-1 hover:text-cyan-400">
                  <FiLinkedin className="w-4 h-4" /> LinkedIn
                </a>
              )}
            </div>
          </div>

          {/* Summary */}
          {profile?.bio && (
            <div className="mb-6">
              <h4 className="font-semibold text-slate-200 mb-2">Summary</h4>
              <p className="text-slate-400 text-sm">{profile.bio}</p>
            </div>
          )}

          {/* Education */}
          {education.length > 0 && (
            <div className="mb-6">
              <h4 className="font-semibold text-slate-200 mb-2">Education</h4>
              {education.map((edu, i) => (
                <div key={i} className="mb-2">
                  <p className="text-slate-200">{edu.institution}</p>
                  <p className="text-slate-400 text-sm">{edu.degree} {edu.field_of_study && `in ${edu.field_of_study}`}</p>
                  <p className="text-slate-500 text-xs">
                    {edu.start_date} - {edu.currently_studying ? "Present" : edu.end_date}
                  </p>
                </div>
              ))}
            </div>
          )}

          {/* Experience */}
          {experience.length > 0 && (
            <div className="mb-6">
              <h4 className="font-semibold text-slate-200 mb-2">Experience</h4>
              {experience.map((exp, i) => (
                <div key={i} className="mb-2">
                  <p className="text-slate-200">{exp.position} at {exp.company}</p>
                  <p className="text-slate-500 text-xs flex items-center gap-1">
                    <FiCalendar className="w-3 h-3" />
                    {exp.start_date} - {exp.currently_working ? "Present" : exp.end_date}
                  </p>
                  {exp.description && <p className="text-slate-400 text-sm mt-1">{exp.description}</p>}
                </div>
              ))}
            </div>
          )}

          {/* Skills */}
          {skills.length > 0 && (
            <div className="mb-6">
              <h4 className="font-semibold text-slate-200 mb-2">Skills</h4>
              <div className="flex flex-wrap gap-2">
                {skills.map((skill, i) => (
                  <span key={i} className="px-3 py-1 text-xs rounded-full bg-cyan-500/20 text-cyan-300">
                    {skill.name}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Projects */}
          {projects.length > 0 && (
            <div className="mb-6">
              <h4 className="font-semibold text-slate-200 mb-2">Projects</h4>
              {projects.slice(0, 3).map((proj, i) => (
                <div key={i} className="mb-2">
                  <p className="text-slate-200">{proj.title}</p>
                  <p className="text-slate-400 text-sm">{proj.description?.slice(0, 100)}...</p>
                </div>
              ))}
            </div>
          )}
        </motion.div>

        {/* Download Button */}
        <div className="text-center">
          <motion.button
            onClick={handleDownload}
            disabled={generating}
            className="px-8 py-4 bg-cyan-500 text-slate-950 font-medium rounded-lg hover:bg-cyan-400 inline-flex items-center gap-2 disabled:opacity-50 text-lg"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <FiDownload className="w-5 h-5" />
            {generating ? "Generating PDF..." : "Download PDF Resume"}
          </motion.button>
        </div>
      </div>
    </section>
  );
}