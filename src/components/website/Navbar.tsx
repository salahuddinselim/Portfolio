"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase";

export default function Navbar() {
  const [profile, setProfile] = useState<any>(null);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const supabase = createClient();
        const { data } = await supabase.from("profiles").select("*").limit(1).maybeSingle();
        if (data) setProfile(data);
      } catch (e) {
        // ignore
      }
    };
    fetchProfile();
  }, []);

  const name = profile?.name || "Portfolio";

  const navItems = [
    { name: "Home", href: "#hero" },
    { name: "About", href: "#about" },
    { name: "Skills", href: "#skills" },
    { name: "Experience", href: "#experience" },
    { name: "Projects", href: "#projects" },
    { name: "Resume", href: "#resume" },
    { name: "Contact", href: "#contact" },
  ];

  return (
    <nav 
      className="fixed top-0 left-0 right-0 z-50 glass" 
      role="navigation" 
      aria-label="Main navigation"
    >
      <div className="max-w-6xl mx-auto px-4 md:px-8 py-4 flex items-center justify-between">
        <Link 
          href="#hero" 
          className="font-display text-xl font-bold text-slate-200"
          aria-label={`${name} - Go to top`}
        >
          {name}
        </Link>
        
        <div className="hidden md:flex items-center gap-8" role="list">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="text-slate-400 hover:text-cyan-400 transition-colors text-sm"
              role="listitem"
            >
              {item.name}
            </Link>
          ))}
        </div>

        {/* Mobile menu button */}
        <button
          className="md:hidden p-2 text-slate-400 hover:text-cyan-400"
          onClick={() => setIsOpen(!isOpen)}
          aria-expanded={isOpen}
          aria-controls="mobile-menu"
          aria-label={isOpen ? "Close menu" : "Open menu"}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {isOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div 
          id="mobile-menu" 
          className="md:hidden glass border-t border-white/5"
          role="menu"
        >
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              onClick={() => setIsOpen(false)}
              className="block px-4 py-3 text-slate-400 hover:text-cyan-400 hover:bg-white/5"
              role="menuitem"
            >
              {item.name}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
}