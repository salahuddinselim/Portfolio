"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase";

const navItems = [
  { name: "Dashboard", href: "/admin", icon: "grid" },
  { name: "Profile", href: "/admin/profile", icon: "user" },
  { name: "Education", href: "/admin/education", icon: "book" },
  { name: "Experience", href: "/admin/experience", icon: "briefcase" },
  { name: "Skills", href: "/admin/skills", icon: "code" },
  { name: "Projects", href: "/admin/projects", icon: "folder" },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      const supabase = createClient();
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        router.push("/login");
      } else {
        setLoading(false);
      }
    };
    checkAuth();
  }, [router]);

  const handleLogout = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/login");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="text-cyan-400 font-mono">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-bg">
      <nav className="fixed left-0 top-0 w-64 h-screen bg-surface border-r border-white/5 p-4">
        <div className="mb-8">
          <Link href="/admin" className="font-display text-xl font-bold">
            <span className="text-gradient">Admin</span>
          </Link>
        </div>

        <div className="space-y-2">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="block px-4 py-2 rounded-lg text-muted hover:text-text hover:bg-white/5 transition-colors"
            >
              {item.name}
            </Link>
          ))}
        </div>

        <div className="absolute bottom-4 left-4 right-4">
          <Link
            href="/"
            className="block px-4 py-2 rounded-lg text-muted hover:text-cyan-400 transition-colors mb-2"
          >
            View Website
          </Link>
          <button
            onClick={handleLogout}
            className="w-full px-4 py-2 rounded-lg text-muted hover:text-red-400 transition-colors text-left"
          >
            Logout
          </button>
        </div>
      </nav>

      <main className="ml-64 p-8">{children}</main>
    </div>
  );
}
