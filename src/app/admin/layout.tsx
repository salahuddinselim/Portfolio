"use client";

import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import { AdminProvider, useAdmin } from "@/context/AdminContext";
import { LayoutDashboard, User, FolderGit2, Code, GraduationCap, Briefcase, LogOut } from "lucide-react";

const navItems = [
  { href: "/admin/dashboard", icon: LayoutDashboard, label: "Dashboard" },
  { href: "/admin/profile", icon: User, label: "Profile" },
  { href: "/admin/education", icon: GraduationCap, label: "Education" },
  { href: "/admin/experience", icon: Briefcase, label: "Experience" },
  { href: "/admin/projects", icon: FolderGit2, label: "Projects" },
  { href: "/admin/skills", icon: Code, label: "Skills" },
];

function AdminLayoutContent({ children }: { children: React.ReactNode }) {
  const { user, loading, signOut } = useAdmin();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!loading && !user && pathname !== "/admin/login") {
      router.push("/admin/login");
    }
  }, [user, loading, router, pathname]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse text-gray-400">Loading...</div>
      </div>
    );
  }

  if (!user && pathname !== "/admin/login") {
    return null;
  }

  if (pathname === "/admin/login") {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen flex">
      <aside className="w-56 sm:w-64 glass fixed h-screen flex flex-col z-40">
        <div className="p-4 sm:p-6 border-b border-white/10">
          <h1 className="font-bold text-lg sm:text-xl">Admin Panel</h1>
          <p className="text-xs text-gray-500 mt-1">Manage portfolio</p>
        </div>
        <nav className="flex-1 p-2 sm:p-4 space-y-1 overflow-y-auto">
          {navItems.map(({ href, icon: Icon, label }) => (
            <Link
              key={href}
              href={href}
              className={`flex items-center gap-2 sm:gap-3 px-3 sm:px-4 py-2.5 sm:py-3 rounded-xl transition-colors text-sm ${
                pathname === href 
                  ? "bg-cyan-500/20 text-cyan-400" 
                  : "hover:bg-white/5 text-gray-400"
              }`}
            >
              <Icon size={16} className="sm:w-[18px] sm:h-[18px]" />
              <span className="hidden sm:inline">{label}</span>
              <span className="sm:hidden">{label.charAt(0)}</span>
            </Link>
          ))}
        </nav>
        <div className="p-2 sm:p-4 border-t border-white/10 space-y-1">
          <Link href="/" className="flex items-center gap-2 sm:gap-3 px-3 sm:px-4 py-2.5 sm:py-3 rounded-xl hover:bg-white/5 text-gray-400 transition-colors text-sm">
            <span className="hidden sm:inline">← Back to Site</span>
            <span className="sm:hidden">←</span>
          </Link>
          <button
            onClick={() => signOut()}
            className="flex items-center gap-2 sm:gap-3 px-3 sm:px-4 py-2.5 sm:py-3 rounded-xl hover:bg-white/5 text-gray-400 transition-colors w-full text-sm"
          >
            <LogOut size={16} />
            <span className="hidden sm:inline">Sign Out</span>
          </button>
        </div>
      </aside>
      <main className="flex-1 ml-14 sm:ml-16 md:ml-64 p-4 sm:p-6 lg:p-8 overflow-x-hidden">
        {children}
      </main>
    </div>
  );
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <AdminProvider>
      <AdminLayoutContent>{children}</AdminLayoutContent>
    </AdminProvider>
  );
}