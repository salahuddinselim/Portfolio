"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase";

interface Experience {
  id?: string;
  company: string;
  position: string;
  location: string;
  start_date: string;
  end_date: string;
  is_current: boolean;
  description: string;
  order_index: number;
}

export default function ExperiencePage() {
  const [items, setItems] = useState<Experience[]>([]);
  const [editing, setEditing] = useState<Experience | null>(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    const supabase = createClient();
    const { data } = await supabase
      .from("experience")
      .select("*")
      ;
    if (data) setItems(data);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editing) return;
    setLoading(true);
    setMessage("");

    const supabase = createClient();
    const { error } = await supabase
      .from("experience")
      .upsert({ ...editing }, { onConflict: "id" });

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
    if (!confirm("Delete this item?")) return;
    const supabase = createClient();
    await supabase.from("experience").delete().eq("id", id);
    fetchItems();
  };

  const handleNew = () => {
    setEditing({ company: "", position: "", location: "", start_date: "", end_date: "", is_current: false, description: "", order_index: items.length });
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="font-display text-3xl font-bold">Experience</h1>
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
        <div className="text-muted">No experience added yet. Click "Add New" to add.</div>
      ) : (
        <div className="space-y-4 mb-8">
          {items.map((item) => (
            <div key={item.id} className="glass rounded-2xl p-6 flex justify-between items-start">
              <div>
                <h3 className="font-semibold text-lg">{item.position}</h3>
                <p className="text-muted">{item.company}</p>
                <p className="text-sm text-muted">{item.start_date} - {item.is_current ? "Present" : item.end_date}</p>
              </div>
              <div className="flex gap-2">
                <button onClick={() => setEditing(item)} className="p-2 hover:text-cyan-400 transition-colors">Edit</button>
                <button onClick={() => handleDelete(item.id!)} className="p-2 hover:text-red-400 transition-colors">Delete</button>
              </div>
            </div>
          ))}
        </div>
      )}

      {editing && (
        <form onSubmit={handleSubmit} className="glass rounded-2xl p-6 max-w-2xl space-y-4">
          <h2 className="font-display text-xl font-semibold mb-4">{editing.id ? "Edit" : "Add"} Experience</h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-muted mb-2">Company *</label>
              <input
                type="text"
                required
                value={editing.company}
                onChange={(e) => setEditing({ ...editing, company: e.target.value })}
                className="w-full px-4 py-3 bg-white/5 border border-white/5 rounded-lg text-text focus:outline-none focus:border-cyan-500/50"
              />
            </div>
            <div>
              <label className="block text-sm text-muted mb-2">Position *</label>
              <input
                type="text"
                required
                value={editing.position}
                onChange={(e) => setEditing({ ...editing, position: e.target.value })}
                className="w-full px-4 py-3 bg-white/5 border border-white/5 rounded-lg text-text focus:outline-none focus:border-cyan-500/50"
              />
            </div>
            <div>
              <label className="block text-sm text-muted mb-2">Location</label>
              <input
                type="text"
                value={editing.location}
                onChange={(e) => setEditing({ ...editing, location: e.target.value })}
                className="w-full px-4 py-3 bg-white/5 border border-white/5 rounded-lg text-text focus:outline-none focus:border-cyan-500/50"
              />
            </div>
            <div>
              <label className="block text-sm text-muted mb-2">Start Date</label>
              <input
                type="text"
                placeholder="e.g., Jan 2024"
                value={editing.start_date}
                onChange={(e) => setEditing({ ...editing, start_date: e.target.value })}
                className="w-full px-4 py-3 bg-white/5 border border-white/5 rounded-lg text-text focus:outline-none focus:border-cyan-500/50"
              />
            </div>
            <div>
              <label className="block text-sm text-muted mb-2">End Date</label>
              <input
                type="text"
                placeholder="e.g., Present"
                value={editing.end_date}
                onChange={(e) => setEditing({ ...editing, end_date: e.target.value })}
                disabled={editing.is_current}
                className="w-full px-4 py-3 bg-white/5 border border-white/5 rounded-lg text-text focus:outline-none focus:border-cyan-500/50 disabled:opacity-50"
              />
            </div>
            <div className="flex items-center">
              <input
                type="checkbox"
                id="is_current"
                checked={editing.is_current}
                onChange={(e) => setEditing({ ...editing, is_current: e.target.checked, end_date: e.target.checked ? "Present" : editing.end_date })}
                className="mr-2"
              />
              <label htmlFor="is_current" className="text-sm text-muted">I currently work here</label>
            </div>
          </div>
          <div>
            <label className="block text-sm text-muted mb-2">Description</label>
            <textarea
              value={editing.description}
              onChange={(e) => setEditing({ ...editing, description: e.target.value })}
              rows={3}
              className="w-full px-4 py-3 bg-white/5 border border-white/5 rounded-lg text-text focus:outline-none focus:border-cyan-500/50 resize-none"
            />
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
