"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase";
import Link from "next/link";

export default function DashboardPage() {
  const [stats, setStats] = useState({
    projects: 0,
    skills: 0,
    education: 0,
    experience: 0,
  });

  useEffect(() => {
    const fetchStats = async () => {
      const supabase = createClient();
      const [projects, skills, education, experience] = await Promise.all([
        supabase.from("projects").select("id", { count: "exact", head: true }),
        supabase.from("skills").select("id", { count: "exact", head: true }),
        supabase.from("education").select("id", { count: "exact", head: true }),
        supabase.from("experience").select("id", { count: "exact", head: true }),
      ]);
      setStats({
        projects: projects.count || 0,
        skills: skills.count || 0,
        education: education.count || 0,
        experience: experience.count || 0,
      });
    };
    fetchStats();
  }, []);

  const cards = [
    { name: "Projects", count: stats.projects, href: "/admin/projects", color: "cyan" },
    { name: "Skills", count: stats.skills, href: "/admin/skills", color: "violet" },
    { name: "Education", count: stats.education, href: "/admin/education", color: "amber" },
    { name: "Experience", count: stats.experience, href: "/admin/experience", color: "green" },
  ];

  return (
    <div>
      <h1 className="font-display text-3xl font-bold mb-8">Dashboard</h1>
      <div className="grid grid-cols-4 gap-6">
        {cards.map((card) => (
          <Link
            key={card.name}
            href={card.href}
            className="glass rounded-2xl p-6 hover:scale-105 transition-transform"
          >
            <p className="text-muted text-sm mb-2">{card.name}</p>
            <p className={`text-4xl font-bold text-${card.color}-400`}>{card.count}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
