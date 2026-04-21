"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase";

interface Project {
  id?: string;
  name: string;
  description: string;
  image_url: string;
  tech_stack: string[];
  github_url: string;
  live_url: string;
  featured: boolean;
  order_index: number;
}

export default function ProjectsPage() {
  const [items, setItems] = useState<Project[]>([]);
  const [editing, setEditing] = useState<Project | null>(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    const supabase = createClient();
    const { data } = await supabase.from("projects").select("*");
    if (data) setItems(data);
  };

  const uploadImage = async (file: File) => {
    setUploading(true);
    const supabase = createClient();
    const fileExt = file.name.split(".").pop();
    const fileName = `project-${Date.now()}.${fileExt}`;
    
    const { error } = await supabase.storage.from("portfolio").upload(fileName, file);
    if (error) {
      setMessage("Upload failed: " + error.message);
      setUploading(false);
      return null;
    }
    
    const { data: { publicUrl } } = supabase.storage.from("portfolio").getPublicUrl(fileName);
    setUploading(false);
    return publicUrl;
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !editing) return;
    const url = await uploadImage(file);
    if (url) setEditing({ ...editing, image_url: url });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editing) return;
    setLoading(true);
    setMessage("");

    const supabase = createClient();
    const { error } = await supabase.from("projects").upsert({ ...editing }, { onConflict: "id" });

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
    if (!confirm("Delete this project?")) return;
    const supabase = createClient();
    await supabase.from("projects").delete().eq("id", id);
    fetchItems();
  };

  const handleNew = () => {
    setEditing({ name: "", description: "", image_url: "", tech_stack: [], github_url: "", live_url: "", featured: true, order_index: items.length });
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="font-display text-3xl font-bold">Projects</h1>
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
        <div className="text-muted">No projects added yet. Click "Add New" to add.</div>
      ) : (
        <div className="grid grid-cols-3 gap-4 mb-8">
          {items.map((item) => (
            <div key={item.id} className="glass rounded-2xl p-4">
              {item.image_url && <img src={item.image_url} alt={item.name} className="w-full h-32 object-cover rounded-lg mb-3" />}
              <h3 className="font-semibold mb-1">{item.name}</h3>
              <p className="text-sm text-muted mb-2">{item.description?.slice(0, 60)}...</p>
              <div className="flex gap-2">
                <button onClick={() => setEditing(item)} className="text-sm text-cyan-400 hover:underline">Edit</button>
                <button onClick={() => handleDelete(item.id!)} className="text-sm text-red-400 hover:underline">Delete</button>
              </div>
            </div>
          ))}
        </div>
      )}

      {editing && (
        <form onSubmit={handleSubmit} className="glass rounded-2xl p-6 max-w-2xl space-y-4">
          <h2 className="font-display text-xl font-semibold mb-4">{editing.id ? "Edit" : "Add"} Project</h2>
          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2">
              <label className="block text-sm text-muted mb-2">Project Name *</label>
              <input
                type="text"
                required
                value={editing.name}
                onChange={(e) => setEditing({ ...editing, name: e.target.value })}
                className="w-full px-4 py-3 bg-white/5 border border-white/5 rounded-lg text-text focus:outline-none focus:border-cyan-500/50"
              />
            </div>
            <div className="col-span-2">
              <label className="block text-sm text-muted mb-2">Description</label>
              <textarea
                value={editing.description}
                onChange={(e) => setEditing({ ...editing, description: e.target.value })}
                rows={3}
                className="w-full px-4 py-3 bg-white/5 border border-white/5 rounded-lg text-text focus:outline-none focus:border-cyan-500/50 resize-none"
              />
            </div>
            <div className="col-span-2">
              <label className="block text-sm text-muted mb-2">Project Image</label>
              <div className="flex items-center gap-4">
                {editing.image_url && <img src={editing.image_url} alt="Project" className="w-20 h-20 object-cover rounded-lg" />}
                <label className="px-4 py-2 glass rounded-lg text-sm cursor-pointer">
                  {uploading ? "Uploading..." : "Upload Image"}
                  <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
                </label>
              </div>
            </div>
            <div>
              <label className="block text-sm text-muted mb-2">Tech Stack (comma-separated)</label>
              <input
                type="text"
                value={editing.tech_stack?.join(", ")}
                onChange={(e) => setEditing({ ...editing, tech_stack: e.target.value.split(", ").filter(Boolean) })}
                placeholder="React, Node.js, MongoDB"
                className="w-full px-4 py-3 bg-white/5 border border-white/5 rounded-lg text-text focus:outline-none focus:border-cyan-500/50"
              />
            </div>
            <div>
              <label className="block text-sm text-muted mb-2">GitHub URL</label>
              <input
                type="url"
                value={editing.github_url}
                onChange={(e) => setEditing({ ...editing, github_url: e.target.value })}
                className="w-full px-4 py-3 bg-white/5 border border-white/5 rounded-lg text-text focus:outline-none focus:border-cyan-500/50"
              />
            </div>
            <div>
              <label className="block text-sm text-muted mb-2">Live URL</label>
              <input
                type="url"
                value={editing.live_url}
                onChange={(e) => setEditing({ ...editing, live_url: e.target.value })}
                className="w-full px-4 py-3 bg-white/5 border border-white/5 rounded-lg text-text focus:outline-none focus:border-cyan-500/50"
              />
            </div>
            <div className="flex items-center">
              <input
                type="checkbox"
                id="featured"
                checked={editing.featured}
                onChange={(e) => setEditing({ ...editing, featured: e.target.checked })}
                className="mr-2"
              />
              <label htmlFor="featured" className="text-sm text-muted">Featured project</label>
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
