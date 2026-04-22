"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FiMail, FiMapPin, FiGithub, FiLinkedin, FiSend } from "react-icons/fi";
import { FaFacebook, FaInstagram } from "react-icons/fa";
import { createClient } from "@/lib/supabase";

export default function Contact() {
  const [profile, setProfile] = useState<any>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const supabase = createClient();
        const { data } = await supabase.from("profiles").select("*").limit(1).maybeSingle();
        if (data) setProfile(data);
      } catch (e) {
        console.error("Error fetching profile:", e);
      }
    };
    fetchProfile();
  }, []);

  const email = profile?.email || "email@example.com";
  const location = profile?.location || "Your Location";
  const github = profile?.github_link;
  const linkedin = profile?.linkedin_link;
  const facebook = profile?.facebook_link;
  const instagram = profile?.instagram_link;

  return (
    <section id="contact" className="py-24">
      <div className="max-w-6xl mx-auto px-4 md:px-8">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-display text-4xl font-bold mb-12 text-center"
        >
          Get In <span className="text-gradient">Touch</span>
        </motion.h2>
        
        <div className="grid md:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <motion.div className="glass rounded-2xl p-6" whileHover={{ scale: 1.02 }} transition={{ type: "spring", stiffness: 300 }}>
              <h3 className="font-display text-xl font-semibold mb-6">Contact Information</h3>
              
              <div className="space-y-4">
                <motion.a
                  href={`mailto:${email}`}
                  className="flex items-center gap-4 text-slate-400 hover:text-cyan-400 transition-colors"
                  whileHover={{ x: 5 }}
                >
                  <motion.div 
                    className="w-12 h-12 rounded-lg bg-cyan-500/10 flex items-center justify-center"
                    whileHover={{ scale: 1.1 }}
                    transition={{ type: "spring", stiffness: 400 }}
                  >
                    <FiMail className="w-5 h-5 text-cyan-400" />
                  </motion.div>
                  <div>
                    <p className="text-sm text-slate-500">Email</p>
                    <p className="text-slate-200">{email}</p>
                  </div>
                </motion.a>
                
                {location && (
                  <motion.a
                    href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(location)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-4 text-slate-400 hover:text-violet-400 transition-colors"
                    whileHover={{ x: 5 }}
                  >
                    <motion.div 
                      className="w-12 h-12 rounded-lg bg-violet-500/10 flex items-center justify-center"
                      whileHover={{ scale: 1.1 }}
                      transition={{ type: "spring", stiffness: 400 }}
                    >
                      <FiMapPin className="w-5 h-5 text-violet-400" />
                    </motion.div>
                    <div>
                      <p className="text-sm text-slate-500">Location</p>
                      <p className="text-slate-200">{location}</p>
                    </div>
                  </motion.a>
                )}
              </div>
              
              {/* Social Links */}
              <motion.div className="flex items-center gap-3 mt-6 pt-6 border-t border-white/5">
                {github && (
<motion.a
                  href={github}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub Profile"
                  className="w-12 h-12 rounded-lg bg-white/5 flex items-center justify-center text-slate-500 hover:text-cyan-400 hover:bg-white/10 transition-colors"
                  whileHover={{ scale: 1.1, y: -3 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <FiGithub className="w-5 h-5" aria-hidden="true" />
                </motion.a>
              )}
              {linkedin && (
                <motion.a
                  href={linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn Profile"
                  className="w-12 h-12 rounded-lg bg-white/5 flex items-center justify-center text-slate-500 hover:text-cyan-400 hover:bg-white/10 transition-colors"
                  whileHover={{ scale: 1.1, y: -3 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <FiLinkedin className="w-5 h-5" aria-hidden="true" />
                </motion.a>
              )}
              {facebook && (
                <motion.a
                  href={facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook Profile"
                  className="w-12 h-12 rounded-lg bg-white/5 flex items-center justify-center text-slate-500 hover:text-blue-400 hover:bg-white/10 transition-colors"
                  whileHover={{ scale: 1.1, y: -3 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <FaFacebook className="w-5 h-5" aria-hidden="true" />
                </motion.a>
              )}
              {instagram && (
                <motion.a
                  href={instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram Profile"
                  className="w-12 h-12 rounded-lg bg-white/5 flex items-center justify-center text-slate-500 hover:text-pink-400 hover:bg-white/10 transition-colors"
                  whileHover={{ scale: 1.1, y: -3 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <FaInstagram className="w-5 h-5" aria-hidden="true" />
                </motion.a>
              )}
              </motion.div>
            </motion.div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="glass rounded-2xl p-6"
          >
            <h3 className="font-display text-xl font-semibold mb-6">Send a Message</h3>
            
            <form className="space-y-4" aria-label="Contact form">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <label htmlFor="contact-name" className="sr-only">Your Name</label>
                <input
                  id="contact-name"
                  type="text"
                  placeholder="Your Name"
                  autoComplete="name"
                  className="w-full px-4 py-3 bg-white/5 border border-white/5 rounded-lg text-slate-200 placeholder-slate-600 focus:outline-none focus:border-cyan-500/50 transition-colors"
                />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
              >
                <label htmlFor="contact-email" className="sr-only">Your Email</label>
                <input
                  id="contact-email"
                  type="email"
                  placeholder="Your Email"
                  autoComplete="email"
                  className="w-full px-4 py-3 bg-white/5 border border-white/5 rounded-lg text-slate-200 placeholder-slate-600 focus:outline-none focus:border-cyan-500/50 transition-colors"
                />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
              >
                <label htmlFor="contact-message" className="sr-only">Your Message</label>
                <textarea
                  id="contact-message"
                  placeholder="Your Message"
                  rows={4}
                  className="w-full px-4 py-3 bg-white/5 border border-white/5 rounded-lg text-slate-200 placeholder-slate-600 focus:outline-none focus:border-cyan-500/50 transition-colors resize-none"
                />
              </motion.div>
              <motion.button
                type="submit"
                className="w-full px-6 py-3 bg-cyan-500 text-slate-950 font-medium rounded-lg hover:bg-cyan-400 transition-all flex items-center justify-center gap-2 glow-primary"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <FiSend className="w-4 h-4" aria-hidden="true" />
                Send Message
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}