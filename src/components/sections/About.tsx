"use client";

import { motion } from "framer-motion";
import { MapPin, GraduationCap, Briefcase } from "lucide-react";

interface Education {
  institution: string;
  degree?: string | null;
  field_of_study?: string | null;
  start_date?: string | null;
  end_date?: string | null;
  grade?: string | null;
  currently_studying?: boolean;
}

interface Experience {
  company: string;
  position?: string | null;
  start_date?: string | null;
  end_date?: string | null;
  description?: string | null;
  currently_working?: boolean;
}

interface AboutProps {
  profile?: {
    bio?: string | null;
    vision?: string | null;
    location?: string | null;
    coursework?: string | null;
    achievements?: string | null;
  };
  education?: Education[];
  experience?: Experience[];
}

const defaultEducation: Education[] = [
  {
    institution: "United International University",
    degree: "BSc",
    field_of_study: "Computer Science & Engineering",
    start_date: "2022",
    end_date: "Present",
    currently_studying: true,
  },
  {
    institution: "Pirganj Govt. College",
    degree: "HSC",
    start_date: "2018",
    end_date: "2020",
    grade: "GPA: 5.00 / 5.00",
  },
  {
    institution: "Pirganj Pilot High School",
    degree: "SSC",
    start_date: "2013",
    end_date: "2018",
    grade: "GPA: 5.00 / 5.00",
  },
];

const defaultExperience: Experience[] = [
  {
    company: "Freelance",
    position: "Full-Stack Developer",
    start_date: "2022",
    end_date: "Present",
    description: "Building web applications and IoT solutions for clients worldwide.",
    currently_working: true,
  },
];

export default function About({ profile, education = defaultEducation, experience = defaultExperience }: AboutProps) {
  return (
    <section id="about" className="min-h-screen py-16 sm:py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6 sm:mb-8"
        >
          About <span className="text-gradient">Me</span>
        </motion.h2>

        <div className="grid md:grid-cols-2 gap-6 sm:gap-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="space-y-4"
          >
            <p className="text-gray-300 leading-relaxed text-sm sm:text-base">
              {profile?.bio || "I'm a Computer Science and Engineering student at United International University with strong skills in programming, software development, and problem-solving."}
            </p>
            <p className="text-gray-300 leading-relaxed text-sm sm:text-base">
              {profile?.vision || "Passionate about building impactful solutions and continuously learning modern technologies."}
            </p>
            {profile?.location && (
              <div className="flex items-center gap-2 text-gray-400 text-sm sm:text-base">
                <MapPin size={16} />
                <span>{profile.location}</span>
              </div>
            )}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="space-y-6"
          >
            <div>
              <h3 className="text-lg font-semibold flex items-center gap-2 mb-4">
                <GraduationCap size={20} className="text-cyan-400" />
                <span className="hidden sm:inline">Education</span>
                <span className="sm:hidden">Education</span>
              </h3>
              <div className="space-y-3">
                {(education.length > 0 ? education : defaultEducation).map((edu, i) => (
                  <div key={i} className="glass rounded-xl p-4 cursor-pointer">
                    <div className="font-medium text-sm sm:text-base">{edu.institution}</div>
                    <div className="text-xs sm:text-sm text-gray-400">
                      {edu.degree} {edu.field_of_study && `in ${edu.field_of_study}`}
                    </div>
                    <div className="text-xs sm:text-sm text-gray-500 mt-1">
                      {edu.start_date} - {edu.currently_studying ? "Present" : edu.end_date}
                      {edu.grade && ` • ${edu.grade}`}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {experience && experience.length > 0 && (
              <div>
                <h3 className="text-lg font-semibold flex items-center gap-2 mb-4">
                  <Briefcase size={20} className="text-cyan-400" />
                  <span className="hidden sm:inline">Experience</span>
                  <span className="sm:hidden">Experience</span>
                </h3>
                <div className="space-y-3">
                  {experience.map((exp, i) => (
                    <div key={i} className="glass rounded-xl p-4 cursor-pointer">
                      <div className="font-medium text-sm sm:text-base">{exp.position}</div>
                      <div className="text-xs sm:text-sm text-gray-400">{exp.company}</div>
                      <div className="text-xs sm:text-sm text-gray-500 mt-1">
                        {exp.start_date} - {exp.currently_working ? "Present" : exp.end_date}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}