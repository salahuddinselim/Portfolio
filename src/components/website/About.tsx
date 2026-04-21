"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FaGraduationCap, FaUniversity } from "react-icons/fa";
import { FiCalendar } from "react-icons/fi";
import { createClient } from "@/lib/supabase";

interface Education {
  id: string;
  institution: string;
  degree: string;
  field_of_study?: string;
  start_date: string;
  end_date?: string;
  currently_studying?: boolean;
  grade?: string;
}

export default function About() {
  const [education, setEducation] = useState<Education[]>([]);
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const supabase = createClient();
        const [profileData, eduData] = await Promise.all([
          supabase.from("profiles").select("*").limit(1).maybeSingle(),
          supabase.from("education").select("*"),
        ]);
        if (profileData.data) setProfile(profileData.data);
        if (eduData.data) setEducation(eduData.data);
      } catch (e) {
        console.error("Error:", e);
      }
      setLoading(false);
    };
    fetchData();
  }, []);

  if (loading) {
    return (
      <section id="about" className="py-24">
        <div className="max-w-6xl mx-auto px-4 md:px-8">
          <div className="animate-pulse space-y-4">
            <div className="h-8 w-48 bg-slate-800 rounded" />
            <div className="h-32 bg-slate-800 rounded-xl" />
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="about" className="py-24">
      <div className="max-w-6xl mx-auto px-4 md:px-8">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Image/Visual */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative aspect-square rounded-2xl overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/20 to-purple-500/20 rounded-2xl" />
            <div className="absolute inset-4 rounded-xl bg-slate-900/80 backdrop-blur-sm flex items-center justify-center">
              <div className="text-center">
                <FaGraduationCap className="w-20 h-20 text-cyan-400 mx-auto mb-4" />
                <p className="text-slate-400">Education</p>
              </div>
            </div>
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="font-display text-4xl font-bold mb-6">
              About <span className="text-gradient">Me</span>
            </h2>
            
            {profile?.bio && (
              <p className="text-slate-400 mb-6 leading-relaxed">
                {profile.bio}
              </p>
            )}

            {/* Education Cards */}
            <div className="space-y-4 mt-8">
              {education.slice(0, 3).map((edu, i) => (
                <motion.div
                  key={edu.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  whileHover={{ y: -8 }}
                  className="glass rounded-lg p-4"
                >
                  <div className="flex items-start gap-4">
                    <motion.div 
                      className="p-3 rounded-lg bg-cyan-500/20"
                      whileHover={{ scale: 1.1 }}
                    >
                      <FaUniversity className="w-5 h-5 text-cyan-400" />
                    </motion.div>
                    <div className="flex-1">
                      <h4 className="font-medium text-slate-200">{edu.institution}</h4>
                      <p className="text-slate-400 text-sm">
                        {edu.degree} {edu.field_of_study && `in ${edu.field_of_study}`}
                      </p>
                      <p className="text-slate-500 text-xs flex items-center gap-1 mt-1">
                        <FiCalendar className="w-3 h-3" />
                        {edu.start_date} - {edu.currently_studying ? "Present" : edu.end_date || ""}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}