"use client";

import { motion } from "framer-motion";
import { FolderGit2, Code, FileText, Image, User } from "lucide-react";

const stats = [
  { label: "Projects", value: 4, icon: FolderGit2, color: "text-cyan-400" },
  { label: "Skills", value: 16, icon: Code, color: "text-purple-400" },
  { label: "Blog Posts", value: 0, icon: FileText, color: "text-pink-400" },
  { label: "Photos", value: 0, icon: Image, color: "text-yellow-400" },
];

export default function DashboardPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-8">Dashboard</h1>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {stats.map(({ label, value, icon: Icon, color }, i) => (
          <motion.div
            key={label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="glass rounded-xl p-6"
          >
            <Icon className={color} size={24} />
            <div className="text-2xl font-bold mt-2">{value}</div>
            <div className="text-gray-400 text-sm">{label}</div>
          </motion.div>
        ))}
      </div>

      <div className="glass rounded-xl p-6">
        <h2 className="font-semibold mb-4 flex items-center gap-2">
          <User className="text-cyan-400" size={18} />
          Quick Actions
        </h2>
        <div className="grid md:grid-cols-3 gap-4">
          <a
            href="/admin/profile"
            className="p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-colors"
          >
            <div className="font-medium">Edit Profile</div>
            <div className="text-gray-400 text-sm">Update your personal information</div>
          </a>
          <a
            href="/admin/projects"
            className="p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-colors"
          >
            <div className="font-medium">Manage Projects</div>
            <div className="text-gray-400 text-sm">Add or edit portfolio projects</div>
          </a>
          <a
            href="/admin/skills"
            className="p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-colors"
          >
            <div className="font-medium">Manage Skills</div>
            <div className="text-gray-400 text-sm">Update your skills</div>
          </a>
        </div>
      </div>
    </div>
  );
}