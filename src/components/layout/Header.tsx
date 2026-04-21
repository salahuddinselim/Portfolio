"use client";

import { motion } from "framer-motion";
import { Terminal, Globe, Github, Linkedin, Mail, Facebook, Instagram } from "lucide-react";
import { usePathname } from "next/navigation";
import Link from "next/link";

interface HeaderProps {
  onToggleMode: () => void;
  isTerminalMode: boolean;
  profile?: {
    name?: string | null;
    role?: string | null;
    github_link?: string | null;
    linkedin_link?: string | null;
    email?: string | null;
    facebook_link?: string | null;
    instagram_link?: string | null;
  };
}

export default function Header({ onToggleMode, isTerminalMode, profile }: HeaderProps) {
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith("/admin");

  if (isAdmin) return null;

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-0 left-0 right-0 z-50 px-4 md:px-8 py-4"
    >
      <div className="max-w-6xl mx-auto glass rounded-2xl px-4 md:px-6 py-3 flex items-center justify-between">
        <Link href="/" className="font-semibold text-lg tracking-tight cursor-pointer">
          {profile?.name || "Portfolio"}
        </Link>

        <nav className="hidden md:flex items-center gap-6">
          <Link href="/#about" className="text-sm text-gray-400 hover:text-white transition-colors cursor-pointer">
            About
          </Link>
          <Link href="/#skills" className="text-sm text-gray-400 hover:text-white transition-colors cursor-pointer">
            Skills
          </Link>
          <Link href="/#projects" className="text-sm text-gray-400 hover:text-white transition-colors cursor-pointer">
            Projects
          </Link>
          <Link href="/#contact" className="text-sm text-gray-400 hover:text-white transition-colors cursor-pointer">
            Contact
          </Link>
        </nav>

        <div className="flex items-center gap-3">
          {profile?.github_link && (
            <a
              href={profile.github_link}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 text-gray-400 hover:text-white transition-colors cursor-pointer"
            >
              <Github size={18} />
            </a>
          )}
          {profile?.linkedin_link && (
            <a
              href={profile.linkedin_link}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 text-gray-400 hover:text-white transition-colors cursor-pointer"
            >
              <Linkedin size={18} />
            </a>
          )}
          {profile?.facebook_link && (
            <a
              href={profile.facebook_link}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 text-gray-400 hover:text-white transition-colors cursor-pointer"
            >
              <Facebook size={18} />
            </a>
          )}
          {profile?.instagram_link && (
            <a
              href={profile.instagram_link}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 text-gray-400 hover:text-white transition-colors cursor-pointer"
            >
              <Instagram size={18} />
            </a>
          )}
          {profile?.email && (
            <a
              href={`mailto:${profile.email}`}
              className="p-2 text-gray-400 hover:text-white transition-colors cursor-pointer"
            >
              <Mail size={18} />
            </a>
          )}
          
          <button
            onClick={onToggleMode}
            className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors text-sm cursor-pointer"
          >
            {isTerminalMode ? (
              <>
                <Globe size={16} />
                <span className="hidden sm:inline">Web</span>
              </>
            ) : (
              <>
                <Terminal size={16} />
                <span className="hidden sm:inline">Terminal</span>
              </>
            )}
          </button>
        </div>
      </div>
    </motion.header>
  );
}