"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FiCalendar } from "react-icons/fi";
import { createClient } from "@/lib/supabase";

export default function Experience() {
  const [experience, setExperience] = useState<any[]>([]);

  useEffect(() => {
    const fetchExperience = async () => {
      try {
        const supabase = createClient();
        const { data } = await supabase.from("experience").select("*");
        if (data) setExperience(data);
      } catch (e) {
        console.error("Error fetching experience:", e);
      }
    };
    fetchExperience();
  }, []);

  return (
    <section id="experience" className="py-24">
      <div className="max-w-6xl mx-auto px-4 md:px-8">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-display text-4xl font-bold mb-12"
        >
          Work <span className="text-gradient">Experience</span>
        </motion.h2>
        
        {experience.length > 0 ? (
          <div className="space-y-6">
            {experience.map((exp, i) => (
              <motion.div
                key={exp.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -8 }}
                className="glass rounded-2xl p-6"
              >
                <div className="flex justify-between items-start flex-wrap gap-2">
                  <div>
                    <h3 className="font-display text-xl font-semibold text-slate-200">
                      {exp.position}
                    </h3>
                    <p className="text-cyan-400">{exp.company}</p>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-slate-500">
                    <FiCalendar className="w-4 h-4" />
                    {exp.start_date} - {exp.currently_working ? "Present" : exp.end_date}
                  </div>
                </div>
                {exp.description && (
                  <p className="text-slate-400 mt-3 text-sm">{exp.description}</p>
                )}
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 text-slate-500">
            <p>No experience added yet.</p>
          </div>
        )}
      </div>
    </section>
  );
}