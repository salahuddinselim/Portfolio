"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase";

interface Education {
  id?: string;
  institution: string;
  degree: string;
  field_of_study: string;
  start_date: string;
  end_date: string;
  location: string;
  description: string;
  order_index: number;
}

export default function EducationPage() {
  const [items, setItems] = useState<Education[]>([]);
  const [editing, setEditing] = useState<Education | null>(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    const supabase = createClient();
    const { data } = await supabase
      .from("education")
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
      .from("education")
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
    await supabase.from("education").delete().eq("id", id);
    fetchItems();
  };

  const handleNew = () => {
    setEditing({ institution: "", degree: "", field_of_study: "", start_date: "", end_date: "", location: "", description: "", order_index: items.length });
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="font-display text-3xl font-bold">Education</h1>
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
        <div className="text-muted">No education added yet. Click "Add New" to add.</div>
      ) : (
        <div className="space-y-4 mb-8">
          {items.map((item) => (
            <div key={item.id} className="glass rounded-2xl p-6 flex justify-between items-start">
              <div>
                <h3 className="font-semibold text-lg">{item.institution}</h3>
                <p className="text-muted">{item.degree}</p>
                <p className="text-sm text-muted">{item.start_date} - {item.end_date}</p>
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
          <h2 className="font-display text-xl font-semibold mb-4">{editing.id ? "Edit" : "Add"} Education</h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-muted mb-2">Institution *</label>
              <input
                type="text"
                required
                value={editing.institution}
                onChange={(e) => setEditing({ ...editing, institution: e.target.value })}
                className="w-full px-4 py-3 bg-white/5 border border-white/5 rounded-lg text-text focus:outline-none focus:border-cyan-500/50"
              />
            </div>
            <div>
              <label className="block text-sm text-muted mb-2">Degree *</label>
              <input
                type="text"
                required
                value={editing.degree}
                onChange={(e) => setEditing({ ...editing, degree: e.target.value })}
                className="w-full px-4 py-3 bg-white/5 border border-white/5 rounded-lg text-text focus:outline-none focus:border-cyan-500/50"
              />
            </div>
            <div>
              <label className="block text-sm text-muted mb-2">Field of Study</label>
              <input
                type="text"
                value={editing.field_of_study}
                onChange={(e) => setEditing({ ...editing, field_of_study: e.target.value })}
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
                placeholder="e.g., 2022"
                value={editing.start_date}
                onChange={(e) => setEditing({ ...editing, start_date: e.target.value })}
                className="w-full px-4 py-3 bg-white/5 border border-white/5 rounded-lg text-text focus:outline-none focus:border-cyan-500/50"
              />
            </div>
            <div>
              <label className="block text-sm text-muted mb-2">End Date</label>
              <input
                type="text"
                placeholder="e.g., 2026 or Present"
                value={editing.end_date}
                onChange={(e) => setEditing({ ...editing, end_date: e.target.value })}
                className="w-full px-4 py-3 bg-white/5 border border-white/5 rounded-lg text-text focus:outline-none focus:border-cyan-500/50"
              />
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
