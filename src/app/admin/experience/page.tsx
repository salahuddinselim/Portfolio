"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Plus, Trash2, X, Save } from "lucide-react";

interface Experience {
  id: string;
  company: string;
  position: string;
  location: string;
  start_date: string;
  end_date: string;
  description: string;
  currently_working: boolean;
}

const defaultExperience: Experience[] = [
  { id: "1", company: "Freelance", position: "Full-Stack Developer", location: "Remote", start_date: "2022", end_date: "", description: "Building web applications and IoT solutions for clients worldwide.", currently_working: true },
];

export default function ExperiencePage() {
  const [experience, setExperience] = useState<Experience[]>(defaultExperience);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<Experience | null>(null);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const handleSave = async () => {
    setSaving(true);
    await new Promise((r) => setTimeout(r, 1000));
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const handleDelete = (id: string) => {
    if (confirm("Delete this experience?")) {
      setExperience((prev) => prev.filter((e) => e.id !== id));
    }
  };

  const handleEdit = (exp: Experience) => {
    setEditing(exp);
    setShowForm(true);
  };

  const handleAdd = () => {
    setEditing({
      id: "",
      company: "",
      position: "",
      location: "",
      start_date: "",
      end_date: "",
      description: "",
      currently_working: false,
    });
    setShowForm(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editing) return;
    
    const newExp: Experience = {
      ...editing,
      id: editing.id || Date.now().toString(),
      company: editing.company || "",
      position: editing.position || "",
      location: editing.location || "",
      start_date: editing.start_date || "",
      end_date: editing.currently_working ? "" : (editing.end_date || ""),
      description: editing.description || "",
      currently_working: editing.currently_working,
    };
    
    if (editing.id) {
      setExperience((prev) => prev.map((ex) => (ex.id === editing.id ? newExp : ex)));
    } else {
      setExperience((prev) => [...prev, newExp]);
    }
    setShowForm(false);
    setEditing(null);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold">Experience</h1>
        <div className="flex gap-3">
          <button
            onClick={handleSave}
            disabled={saving}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-400 transition-colors disabled:opacity-50 cursor-pointer"
          >
            <Save size={18} />
            {saving ? "Saving..." : saved ? "Saved!" : "Save"}
          </button>
          <button
            onClick={handleAdd}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-400 transition-colors cursor-pointer"
          >
            <Plus size={18} />
            Add Experience
          </button>
        </div>
      </div>

      {showForm && editing && (
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="glass rounded-xl p-6 mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold">{editing.id ? "Edit Experience" : "Add Experience"}</h2>
            <button onClick={() => { setShowForm(false); setEditing(null); }} className="p-2 text-gray-400 hover:text-white transition-colors cursor-pointer">
              <X size={18} />
            </button>
          </div>
          <form onSubmit={handleSubmit} className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-gray-400 mb-2">Company</label>
              <input type="text" value={editing.company} onChange={(e) => setEditing({ ...editing, company: e.target.value })} className="w-full px-4 py-3 rounded-xl glass outline-none focus:ring-2 focus:ring-cyan-500/50 cursor-text" required />
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-2">Position/Role</label>
              <input type="text" value={editing.position} onChange={(e) => setEditing({ ...editing, position: e.target.value })} className="w-full px-4 py-3 rounded-xl glass outline-none focus:ring-2 focus:ring-cyan-500/50 cursor-text" required />
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-2">Location</label>
              <input type="text" value={editing.location} onChange={(e) => setEditing({ ...editing, location: e.target.value })} className="w-full px-4 py-3 rounded-xl glass outline-none focus:ring-2 focus:ring-cyan-500/50 cursor-text" />
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-2">Start Date</label>
              <input type="text" value={editing.start_date} onChange={(e) => setEditing({ ...editing, start_date: e.target.value })} placeholder="e.g., Jan 2022" className="w-full px-4 py-3 rounded-xl glass outline-none focus:ring-2 focus:ring-cyan-500/50 cursor-text" />
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-2">End Date</label>
              <input type="text" value={editing.end_date} onChange={(e) => setEditing({ ...editing, end_date: e.target.value })} placeholder="e.g., Present" className="w-full px-4 py-3 rounded-xl glass outline-none focus:ring-2 focus:ring-cyan-500/50 cursor-text" disabled={editing.currently_working} />
            </div>
            <div className="sm:col-span-2 flex items-center gap-2">
              <input type="checkbox" id="working" checked={editing.currently_working} onChange={(e) => setEditing({ ...editing, currently_working: e.target.checked, end_date: e.target.checked ? "" : editing.end_date })} className="w-4 h-4 rounded bg-white/5 border-white/10" />
              <label htmlFor="working" className="text-sm text-gray-400">Currently Working Here</label>
            </div>
            <div className="sm:col-span-2">
              <label className="block text-sm text-gray-400 mb-2">Description</label>
              <textarea value={editing.description} onChange={(e) => setEditing({ ...editing, description: e.target.value })} rows={3} className="w-full px-4 py-3 rounded-xl glass outline-none focus:ring-2 focus:ring-cyan-500/50 cursor-text" />
            </div>
            <div className="sm:col-span-2">
              <button type="submit" className="px-6 py-2 rounded-xl bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-400 transition-colors cursor-pointer">Save Experience</button>
            </div>
          </form>
        </motion.div>
      )}

      <div className="space-y-4">
        {experience.map((exp) => (
          <div key={exp.id} className="glass rounded-xl p-6 flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <h3 className="font-semibold text-lg">{exp.position}</h3>
                {exp.currently_working && <span className="px-2 py-0.5 rounded-full bg-green-500/20 text-green-400 text-xs">Current</span>}
              </div>
              <div className="text-gray-400 text-sm">{exp.company} {exp.location && `• ${exp.location}`}</div>
              <div className="text-gray-500 text-sm mt-1">{exp.start_date} - {exp.currently_working ? "Present" : exp.end_date}</div>
              {exp.description && <div className="text-gray-400 text-sm mt-2">{exp.description}</div>}
            </div>
            <div className="flex gap-2">
              <button onClick={() => handleEdit(exp)} className="p-2 text-gray-400 hover:text-white transition-colors cursor-pointer">Edit</button>
              <button onClick={() => handleDelete(exp.id)} className="p-2 text-gray-400 hover:text-red-400 transition-colors cursor-pointer"><Trash2 size={16} /></button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}