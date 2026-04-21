"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Plus, Trash2, X, Save } from "lucide-react";

interface Education {
  id: string;
  institution: string;
  degree: string;
  field_of_study: string;
  start_date: string;
  end_date: string;
  grade: string;
  currently_studying: boolean;
}

const defaultEducation: Education[] = [
  { id: "1", institution: "United International University", degree: "BSc", field_of_study: "Computer Science & Engineering", start_date: "2022", end_date: "", grade: "", currently_studying: true },
  { id: "2", institution: "Pirganj Govt. College", degree: "HSC", field_of_study: "Science", start_date: "2018", end_date: "2020", grade: "5.00", currently_studying: false },
  { id: "3", institution: "Pirganj Pilot High School", degree: "SSC", field_of_study: "Science", start_date: "2013", end_date: "2018", grade: "5.00", currently_studying: false },
];

export default function EducationPage() {
  const [education, setEducation] = useState<Education[]>(defaultEducation);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<Education | null>(null);
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
    if (confirm("Delete this education?")) {
      setEducation((prev) => prev.filter((e) => e.id !== id));
    }
  };

  const handleEdit = (edu: Education) => {
    setEditing(edu);
    setShowForm(true);
  };

  const handleAdd = () => {
    setEditing({
      id: "",
      institution: "",
      degree: "",
      field_of_study: "",
      start_date: "",
      end_date: "",
      grade: "",
      currently_studying: false,
    });
    setShowForm(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editing) return;
    
    const newEdu: Education = {
      ...editing,
      id: editing.id || Date.now().toString(),
      institution: editing.institution || "",
      degree: editing.degree || "",
      field_of_study: editing.field_of_study || "",
      start_date: editing.start_date || "",
      end_date: editing.currently_studying ? "" : (editing.end_date || ""),
      grade: editing.grade || "",
      currently_studying: editing.currently_studying,
    };
    
    if (editing.id) {
      setEducation((prev) => prev.map((e) => (e.id === editing.id ? newEdu : e)));
    } else {
      setEducation((prev) => [...prev, newEdu]);
    }
    setShowForm(false);
    setEditing(null);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold">Education</h1>
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
            Add Education
          </button>
        </div>
      </div>

      {showForm && editing && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass rounded-xl p-6 mb-8"
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold">{editing.id ? "Edit Education" : "Add Education"}</h2>
            <button onClick={() => { setShowForm(false); setEditing(null); }} className="p-2 text-gray-400 hover:text-white transition-colors cursor-pointer">
              <X size={18} />
            </button>
          </div>
          <form onSubmit={handleSubmit} className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-gray-400 mb-2">Institution</label>
              <input
                type="text"
                value={editing.institution}
                onChange={(e) => setEditing({ ...editing, institution: e.target.value })}
                className="w-full px-4 py-3 rounded-xl glass outline-none focus:ring-2 focus:ring-cyan-500/50 cursor-text"
                required
              />
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-2">Degree/Certificate</label>
              <input
                type="text"
                value={editing.degree}
                onChange={(e) => setEditing({ ...editing, degree: e.target.value })}
                className="w-full px-4 py-3 rounded-xl glass outline-none focus:ring-2 focus:ring-cyan-500/50 cursor-text"
                required
              />
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-2">Field of Study</label>
              <input
                type="text"
                value={editing.field_of_study}
                onChange={(e) => setEditing({ ...editing, field_of_study: e.target.value })}
                className="w-full px-4 py-3 rounded-xl glass outline-none focus:ring-2 focus:ring-cyan-500/50 cursor-text"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-2">Grade/GPA</label>
              <input
                type="text"
                value={editing.grade}
                onChange={(e) => setEditing({ ...editing, grade: e.target.value })}
                placeholder="e.g., 5.00 / 5.00"
                className="w-full px-4 py-3 rounded-xl glass outline-none focus:ring-2 focus:ring-cyan-500/50 cursor-text"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-2">Start Year</label>
              <input
                type="text"
                value={editing.start_date}
                onChange={(e) => setEditing({ ...editing, start_date: e.target.value })}
                placeholder="e.g., 2022"
                className="w-full px-4 py-3 rounded-xl glass outline-none focus:ring-2 focus:ring-cyan-500/50 cursor-text"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-2">End Year</label>
              <input
                type="text"
                value={editing.end_date}
                onChange={(e) => setEditing({ ...editing, end_date: e.target.value })}
                placeholder="e.g., 2026 or leave empty if studying"
                className="w-full px-4 py-3 rounded-xl glass outline-none focus:ring-2 focus:ring-cyan-500/50 cursor-text"
                disabled={editing.currently_studying}
              />
            </div>
            <div className="sm:col-span-2 flex items-center gap-2">
              <input
                type="checkbox"
                id="currently"
                checked={editing.currently_studying}
                onChange={(e) => setEditing({ ...editing, currently_studying: e.target.checked, end_date: e.target.checked ? "" : editing.end_date })}
                className="w-4 h-4 rounded bg-white/5 border-white/10"
              />
              <label htmlFor="currently" className="text-sm text-gray-400">Currently Studying</label>
            </div>
            <div className="sm:col-span-2">
              <button type="submit" className="px-6 py-2 rounded-xl bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-400 transition-colors cursor-pointer">
                Save Education
              </button>
            </div>
          </form>
        </motion.div>
      )}

      <div className="space-y-4">
        {education.map((edu) => (
          <div key={edu.id} className="glass rounded-xl p-6 flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <h3 className="font-semibold text-lg">{edu.institution}</h3>
                {edu.currently_studying && (
                  <span className="px-2 py-0.5 rounded-full bg-green-500/20 text-green-400 text-xs">Current</span>
                )}
              </div>
              <div className="text-gray-400 text-sm">
                {edu.degree} {edu.field_of_study && `in ${edu.field_of_study}`}
              </div>
              <div className="text-gray-500 text-sm mt-1">
                {edu.start_date} - {edu.currently_studying ? "Present" : edu.end_date}
                {edu.grade && ` • GPA: ${edu.grade}/5.00`}
              </div>
            </div>
            <div className="flex gap-2">
              <button onClick={() => handleEdit(edu)} className="p-2 text-gray-400 hover:text-white transition-colors cursor-pointer">
                Edit
              </button>
              <button onClick={() => handleDelete(edu.id)} className="p-2 text-gray-400 hover:text-red-400 transition-colors cursor-pointer">
                <Trash2 size={16} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}