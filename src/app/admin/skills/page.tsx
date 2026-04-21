"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase";

interface Skill {
  id?: string;
  name: string;
  category: string;
  icon: string;
  color: string;
  order_index: number;
}

export default function SkillsPage() {
  const [items, setItems] = useState<Skill[]>([]);
  const [editing, setEditing] = useState<Skill | null>(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const categories = ["Frontend", "Backend", "Tools", "Other"];
  const colorOptions = ["#61dafb", "#339933", "#3776ab", "#f05032", "#ff9900", "#7c3aed", "#06b6d4", "#f59e0b"];

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    const supabase = createClient();
    const { data } = await supabase.from("skills").select("*");
    if (data) setItems(data);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editing) return;
    setLoading(true);
    setMessage("");

    const supabase = createClient();
    const { error } = await supabase.from("skills").upsert({ ...editing }, { onConflict: "id" });

    if (error) {
      setMessage("Error: " + error.message);
    } else {
      setMessage("Saved successfully!");
      setEditing(null);
      fetchItems();
    }
    setLoading(false);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this skill?")) return;
    const supabase = createClient();
    await supabase.from("skills").delete().eq("id", id);
    fetchItems();
  };

  const handleNew = () => {
    setEditing({ name: "", category: "Frontend", icon: "", color: "#61dafb", order_index: items.length });
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="font-display text-3xl font-bold">Skills</h1>
        <button onClick={handleNew} className="px-4 py-2 bg-cyan-500 text-bg rounded-lg hover:bg-cyan-400 transition-colors">
          Add New
        </button>
      </div>

      {message && (
        <div className={`p-4 rounded-lg mb-4 ${message.includes("Error") ? "bg-red-500/20 text-red-400" : "bg-green-500/20 text-green-400"}`}>
          {message}
        </div>
      )}

      {items.length === 0 && !editing ? (
        <div className="text-muted">No skills added yet. Click "Add New" to add.</div>
      ) : (
        <div className="flex flex-wrap gap-3 mb-8">
          {items.map((item) => (
            <div key={item.id} className="glass rounded-full px-4 py-2 flex items-center gap-3">
              <span style={{ color: item.color }}>{item.name}</span>
              <button onClick={() => setEditing(item)} className="text-muted hover:text-cyan-400 text-sm">Edit</button>
              <button onClick={() => handleDelete(item.id!)} className="text-muted hover:text-red-400 text-sm">×</button>
            </div>
          ))}
        </div>
      )}

      {editing && (
        <form onSubmit={handleSubmit} className="glass rounded-2xl p-6 max-w-2xl space-y-4">
          <h2 className="font-display text-xl font-semibold mb-4">{editing.id ? "Edit" : "Add"} Skill</h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-muted mb-2">Skill Name *</label>
              <input
                type="text"
                required
                value={editing.name}
                onChange={(e) => setEditing({ ...editing, name: e.target.value })}
                placeholder="e.g., React"
                className="w-full px-4 py-3 bg-white/5 border border-white/5 rounded-lg text-text focus:outline-none focus:border-cyan-500/50"
              />
            </div>
            <div>
              <label className="block text-sm text-muted mb-2">Category</label>
              <select
                value={editing.category}
                onChange={(e) => setEditing({ ...editing, category: e.target.value })}
                className="w-full px-4 py-3 bg-white/5 border border-white/5 rounded-lg text-text focus:outline-none focus:border-cyan-500/50"
              >
                {categories.map((cat) => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm text-muted mb-2">Color</label>
              <div className="flex gap-2">
                {colorOptions.map((color) => (
                  <button
                    key={color}
                    type="button"
                    onClick={() => setEditing({ ...editing, color })}
                    className={`w-8 h-8 rounded-full ${editing.color === color ? "ring-2 ring-white" : ""}`}
                    style={{ backgroundColor: color }}
                  />
                ))}
              </div>
            </div>
          </div>
          <div className="flex gap-4">
            <button type="submit" disabled={loading} className="px-6 py-2 bg-cyan-500 text-bg rounded-lg hover:bg-cyan-400 transition-colors disabled:opacity-50">
              {loading ? "Saving..." : "Save"}
            </button>
            <button type="button" onClick={() => setEditing(null)} className="px-6 py-2 glass rounded-lg hover:bg-white/10 transition-colors">
              Cancel
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
