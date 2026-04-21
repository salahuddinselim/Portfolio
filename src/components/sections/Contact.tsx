"use client";

import { motion } from "framer-motion";
import { Mail, Github, Linkedin, Twitter, MapPin, Send, Facebook, Instagram, ExternalLink } from "lucide-react";

interface ContactProps {
  profile?: {
    email?: string | null;
    github_link?: string | null;
    linkedin_link?: string | null;
    twitter_link?: string | null;
    facebook_link?: string | null;
    instagram_link?: string | null;
    location?: string | null;
    map_link?: string | null;
  };
}

export default function Contact({ profile }: ContactProps) {
  const socialLinks = [
    { icon: Github, href: profile?.github_link, label: "GitHub" },
    { icon: Linkedin, href: profile?.linkedin_link, label: "LinkedIn" },
    { icon: Twitter, href: profile?.twitter_link, label: "Twitter" },
    { icon: Facebook, href: profile?.facebook_link, label: "Facebook" },
    { icon: Instagram, href: profile?.instagram_link, label: "Instagram" },
  ];

  const mapUrl = profile?.map_link || "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d365.2!2d90.4!3d23.8!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.150000000000001!5e0!3m2!1sen!2sbd!4v1700000000000!5m2!1sen!2sbd";

  return (
    <section id="contact" className="min-h-screen py-16 sm:py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6 sm:mb-8"
        >
          Get In <span className="text-gradient">Touch</span>
        </motion.h2>

        <div className="grid md:grid-cols-2 gap-6 sm:gap-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="space-y-4 sm:space-y-6"
          >
            <p className="text-gray-300 text-sm sm:text-base">
              I'm always open to discussing new projects, creative ideas, or opportunities to be part of your vision. Feel free to reach out!
            </p>

            <div className="space-y-3 sm:space-y-4">
              {profile?.email && (
                <a
                  href={`mailto:${profile.email}`}
                  className="flex items-center gap-3 p-3 sm:p-4 glass rounded-xl hover:bg-white/[0.06] transition-colors cursor-pointer"
                >
                  <Mail className="text-cyan-400" size={18} />
                  <span className="text-sm sm:text-base">{profile.email}</span>
                </a>
              )}
              {profile?.location && (
                <div className="flex items-center gap-3 p-3 sm:p-4 glass rounded-xl">
                  <MapPin className="text-cyan-400" size={18} />
                  <span className="text-sm sm:text-base">{profile.location}</span>
                  {profile.map_link && (
                    <a 
                      href={profile.map_link}
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="ml-auto text-gray-400 hover:text-white cursor-pointer"
                    >
                      <ExternalLink size={14} />
                    </a>
                  )}
                </div>
              )}
            </div>

            <div className="flex gap-2 sm:gap-3">
              {socialLinks.map(
                ({ icon: Icon, href, label }) =>
                  href && (
                    <a
                      key={label}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2.5 sm:p-3 glass rounded-xl hover:bg-white/[0.06] transition-colors cursor-pointer"
                      aria-label={label}
                    >
                      <Icon size={18} />
                    </a>
                  )
              )}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="space-y-4"
          >
            {profile?.map_link && (
              <div className="glass rounded-xl overflow-hidden h-48 sm:h-64">
                <iframe
                  src={mapUrl}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Location Map"
                />
              </div>
            )}
            <motion.form
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="space-y-3 sm:space-y-4"
              onSubmit={(e) => e.preventDefault()}
            >
              <input
                type="text"
                placeholder="Your Name"
                className="w-full px-4 py-3 rounded-xl glass outline-none focus:ring-2 focus:ring-cyan-500/50 transition-all cursor-text text-sm sm:text-base"
              />
              <input
                type="email"
                placeholder="Your Email"
                className="w-full px-4 py-3 rounded-xl glass outline-none focus:ring-2 focus:ring-cyan-500/50 transition-all cursor-text text-sm sm:text-base"
              />
              <textarea
                placeholder="Your Message"
                rows={3}
                className="w-full px-4 py-3 rounded-xl glass outline-none focus:ring-2 focus:ring-cyan-500/50 transition-all resize-none cursor-text text-sm sm:text-base"
              />
              <button
                type="submit"
                className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-400 transition-colors cursor-pointer text-sm sm:text-base"
              >
                <Send size={16} className="sm:w-4 sm:h-4" />
                Send Message
              </button>
            </motion.form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}