"use client";

import { useState, useRef } from "react";
import { Plus, Edit2, Trash2, ExternalLink, Github, X, Save, Image } from "lucide-react";

interface Project {
  id: string;
  title: string;
  description: string;
  tech_stack: string[];
  github_link: string;
  live_link: string;
  image: string;
  featured: boolean;
}

const defaultProjects: Project[] = [
  {
    id: "1",
    title: "Automated Fish Pond",
    description: "IoT-based smart water quality monitoring system using Arduino with sensors for temperature, pH, turbidity, and gas. Automated water exchange and feeding system.",
    tech_stack: ["Arduino", "C++", "Sensors", "IoT"],
    github_link: "https://github.com/salahuddinselim",
    live_link: "",
    image: "https://images.unsplash.com/photo-1518182170546-0766ce6f6a56?w=600&h=400&fit=crop",
    featured: true,
  },
  {
    id: "2",
    title: "AI Voice Assistant",
    description: "Python-based voice assistant using SpeechRecognition and Pyttsx3 for executing commands, web search, and automation.",
    tech_stack: ["Python", "AI", "Speech Recognition"],
    github_link: "https://github.com/salahuddinselim",
    live_link: "",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=600&h=400&fit=crop",
    featured: true,
  },
  {
    id: "3",
    title: "TournyMate",
    description: "Full-stack web application using PHP and MySQL to manage tournaments, players, and live scores.",
    tech_stack: ["PHP", "MySQL", "HTML", "CSS"],
    github_link: "https://github.com/salahuddinselim",
    live_link: "",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c01f?w=600&h=400&fit=crop",
    featured: false,
  },
  {
    id: "4",
    title: "Multilevel Puzzle Game",
    description: "JavaFX-based team puzzle game with real-time chat, database tracking, and multithreading.",
    tech_stack: ["Java", "JavaFX", "Multithreading"],
    github_link: "https://github.com/salahuddinselim",
    live_link: "",
    image: "https://images.unsplash.com/photo-1551103782-8ab07afd45d1?w=600&h=400&fit=crop",
    featured: false,
  },
];

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>(defaultProjects);
  const [showForm, setShowForm] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [techInput, setTechInput] = useState("");
  const [imagePreview, setImagePreview] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDelete = (id: string) => {
    if (confirm("Delete this project?")) {
      setProjects((prev) => prev.filter((p) => p.id !== id));
    }
  };

  const handleEdit = (project: Project) => {
    setEditingProject(project);
    setTechInput(project.tech_stack.join(", "));
    setImagePreview(project.image || "");
    setShowForm(true);
  };

  const handleAdd = () => {
    setEditingProject({
      id: "",
      title: "",
      description: "",
      tech_stack: [],
      github_link: "",
      live_link: "",
      image: "",
      featured: false,
    });
    setTechInput("");
    setImagePreview("");
    setShowForm(true);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
        setEditingProject((prev) => prev ? { ...prev, image: reader.result as string } : null);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    if (!editingProject?.title) return;
    
    const updatedProject: Project = {
      ...editingProject,
      id: editingProject.id || Date.now().toString(),
      tech_stack: techInput.split(",").map(t => t.trim()).filter(Boolean),
    };

    if (editingProject.id) {
      setProjects(prev => prev.map(p => p.id === updatedProject.id ? updatedProject : p));
    } else {
      setProjects(prev => [...prev, updatedProject]);
    }

    setShowForm(false);
    setEditingProject(null);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold">Projects</h1>
        <button 
          onClick={handleAdd}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-400 transition-colors cursor-pointer"
        >
          <Plus size={18} />
          Add Project
        </button>
      </div>

      {showForm && editingProject && (
        <div className="glass rounded-xl p-6 mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold">{editingProject.id ? "Edit Project" : "Add New Project"}</h2>
            <button 
              onClick={() => setShowForm(false)}
              className="p-2 text-gray-400 hover:text-white transition-colors cursor-pointer"
            >
              <X size={18} />
            </button>
          </div>
          
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-gray-400 mb-2">Project Title</label>
              <input
                type="text"
                value={editingProject.title}
                onChange={(e) => setEditingProject({ ...editingProject, title: e.target.value })}
                className="w-full px-4 py-3 rounded-xl glass outline-none focus:ring-2 focus:ring-cyan-500/50 transition-all cursor-text"
                placeholder="Project name"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-2">Tech Stack (comma separated)</label>
              <input
                type="text"
                value={techInput}
                onChange={(e) => setTechInput(e.target.value)}
                className="w-full px-4 py-3 rounded-xl glass outline-none focus:ring-2 focus:ring-cyan-500/50 transition-all cursor-text"
                placeholder="React, Node.js, MongoDB"
              />
            </div>
            <div className="sm:col-span-2">
              <label className="block text-sm text-gray-400 mb-2">Description</label>
              <textarea
                value={editingProject.description}
                onChange={(e) => setEditingProject({ ...editingProject, description: e.target.value })}
                rows={3}
                className="w-full px-4 py-3 rounded-xl glass outline-none focus:ring-2 focus:ring-cyan-500/50 transition-all resize-none cursor-text"
                placeholder="Project description"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-2">Image URL</label>
              <input
                type="url"
                value={imagePreview}
                onChange={(e) => {
                  setImagePreview(e.target.value);
                  setEditingProject({ ...editingProject, image: e.target.value });
                }}
                className="w-full px-4 py-3 rounded-xl glass outline-none focus:ring-2 focus:ring-cyan-500/50 transition-all cursor-text"
                placeholder="https://..."
              />
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-2">Or Upload Image</label>
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleImageChange}
                accept="image/*"
                className="hidden"
              />
              <button
                onClick={() => fileInputRef.current?.click()}
                className="inline-flex items-center gap-2 px-4 py-3 rounded-xl glass hover:bg-white/10 transition-colors cursor-pointer"
              >
                <Image size={16} />
                Upload Image
              </button>
              {imagePreview && (
                <div className="mt-2 w-20 h-20 rounded-lg overflow-hidden">
                  <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                </div>
              )}
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-2">GitHub Link</label>
              <input
                type="url"
                value={editingProject.github_link}
                onChange={(e) => setEditingProject({ ...editingProject, github_link: e.target.value })}
                className="w-full px-4 py-3 rounded-xl glass outline-none focus:ring-2 focus:ring-cyan-500/50 transition-all cursor-text"
                placeholder="https://github.com/..."
              />
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-2">Live Demo Link</label>
              <input
                type="url"
                value={editingProject.live_link}
                onChange={(e) => setEditingProject({ ...editingProject, live_link: e.target.value })}
                className="w-full px-4 py-3 rounded-xl glass outline-none focus:ring-2 focus:ring-cyan-500/50 transition-all cursor-text"
                placeholder="https://..."
              />
            </div>
            <div className="sm:col-span-2 flex items-center gap-2">
              <input
                type="checkbox"
                id="featured"
                checked={editingProject.featured}
                onChange={(e) => setEditingProject({ ...editingProject, featured: e.target.checked })}
                className="w-4 h-4 rounded bg-white/5 border-white/10"
              />
              <label htmlFor="featured" className="text-sm text-gray-400">Featured Project</label>
            </div>
            <div className="sm:col-span-2">
              <button
                onClick={handleSave}
                className="px-6 py-2 rounded-xl bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-400 transition-colors cursor-pointer"
              >
                Save Project
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="space-y-4">
        {projects.map((project) => (
          <div
            key={project.id}
            className="glass rounded-xl p-6 flex items-start justify-between"
          >
            <div className="flex-1 flex gap-4">
              {project.image && (
                <div className="w-20 h-20 rounded-lg overflow-hidden flex-shrink-0">
                  <img src={project.image} alt={project.title} className="w-full h-full object-cover" />
                </div>
              )}
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="font-semibold text-lg">{project.title}</h3>
                  {project.featured && (
                    <span className="px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-400 text-xs">
                      Featured
                    </span>
                  )}
                </div>
                <p className="text-gray-400 text-sm mb-3">{project.description}</p>
                <div className="flex flex-wrap gap-2 mb-2">
                  {project.tech_stack.map((tech) => (
                    <span key={tech} className="px-2 py-1 rounded-lg bg-white/5 text-xs">
                      {tech}
                    </span>
                  ))}
                </div>
                <div className="flex gap-3">
                  {project.github_link && (
                    <a href={project.github_link} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-gray-400 hover:text-white text-sm cursor-pointer">
                      <Github size={14} /> Code
                    </a>
                  )}
                  {project.live_link && (
                    <a href={project.live_link} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-gray-400 hover:text-white text-sm cursor-pointer">
                      <ExternalLink size={14} /> Live
                    </a>
                  )}
                </div>
              </div>
            </div>
            <div className="flex gap-2 ml-4">
              <button onClick={() => handleEdit(project)} className="p-2 text-gray-400 hover:text-white transition-colors cursor-pointer">
                <Edit2 size={16} />
              </button>
              <button onClick={() => handleDelete(project.id)} className="p-2 text-gray-400 hover:text-red-400 transition-colors cursor-pointer">
                <Trash2 size={16} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}