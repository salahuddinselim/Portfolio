"use client";

import { useState } from "react";
import { Plus, Trash2, X } from "lucide-react";

interface Skill {
  id: string;
  name: string;
  category: string;
}

const defaultSkills: Skill[] = [
  { id: "1", name: "JavaScript", category: "Frontend" },
  { id: "2", name: "React", category: "Frontend" },
  { id: "3", name: "Next.js", category: "Frontend" },
  { id: "4", name: "TypeScript", category: "Frontend" },
  { id: "5", name: "Python", category: "Backend" },
  { id: "6", name: "Node.js", category: "Backend" },
  { id: "7", name: "PostgreSQL", category: "Backend" },
  { id: "8", name: "C++", category: "Languages" },
  { id: "9", name: "Java", category: "Languages" },
  { id: "10", name: "Git", category: "Tools" },
  { id: "11", name: "GitHub", category: "Tools" },
];

export default function SkillsPage() {
  const [skills, setSkills] = useState<Skill[]>(defaultSkills);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newSkill, setNewSkill] = useState({ name: "", category: "Frontend" });

  const categories = [...new Set(skills.map((s) => s.category))];

  const handleDelete = (id: string) => {
    setSkills((prev) => prev.filter((s) => s.id !== id));
  };

  const handleAdd = () => {
    if (newSkill.name.trim()) {
      setSkills((prev) => [
        ...prev,
        { id: Date.now().toString(), name: newSkill.name, category: newSkill.category },
      ]);
      setNewSkill({ name: "", category: "Frontend" });
      setShowAddForm(false);
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold">Skills</h1>
        <button 
          onClick={() => setShowAddForm(true)}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-400 transition-colors cursor-pointer"
        >
          <Plus size={18} />
          Add Skill
        </button>
      </div>

      {showAddForm && (
        <div className="glass rounded-xl p-6 mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold">Add New Skill</h2>
            <button 
              onClick={() => setShowAddForm(false)}
              className="p-2 text-gray-400 hover:text-white transition-colors cursor-pointer"
            >
              <X size={18} />
            </button>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-gray-400 mb-2">Skill Name</label>
              <input
                type="text"
                value={newSkill.name}
                onChange={(e) => setNewSkill({ ...newSkill, name: e.target.value })}
                placeholder="e.g., React, Python"
                className="w-full px-4 py-3 rounded-xl glass outline-none focus:ring-2 focus:ring-cyan-500/50 transition-all cursor-text"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-2">Category</label>
              <select
                value={newSkill.category}
                onChange={(e) => setNewSkill({ ...newSkill, category: e.target.value })}
                className="w-full px-4 py-3 rounded-xl glass outline-none focus:ring-2 focus:ring-cyan-500/50 transition-all cursor-pointer"
              >
                <option value="Frontend">Frontend</option>
                <option value="Backend">Backend</option>
                <option value="Languages">Languages</option>
                <option value="Tools">Tools</option>
              </select>
            </div>
          </div>
          <button
            onClick={handleAdd}
            className="mt-4 px-6 py-2 rounded-xl bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-400 transition-colors cursor-pointer"
          >
            Add Skill
          </button>
        </div>
      )}

      {categories.map((category) => (
        <div key={category} className="mb-8">
          <h2 className="text-lg font-semibold mb-4 text-cyan-400">{category}</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {skills
              .filter((s) => s.category === category)
              .map((skill) => (
                <div
                  key={skill.id}
                  className="glass rounded-xl p-4 flex items-center justify-between cursor-pointer"
                >
                  <span>{skill.name}</span>
                  <button
                    onClick={() => handleDelete(skill.id)}
                    className="p-1 text-gray-400 hover:text-red-400 transition-colors cursor-pointer"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              ))}
          </div>
        </div>
      ))}
    </div>
  );
}