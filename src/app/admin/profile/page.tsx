"use client";

import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { Save, Upload, X } from "lucide-react";

interface ProfileForm {
  name: string;
  role: string;
  bio: string;
  vision: string;
  location: string;
  email: string;
  phone: string;
  profile_image: string;
  status: string;
  map_link: string;
  github_link: string;
  linkedin_link: string;
  twitter_link: string;
  facebook_link: string;
  instagram_link: string;
  discord_username: string;
}

const defaultProfile: ProfileForm = {
  name: "Salah Uddin Selim",
  role: "Software Engineer",
  bio: "Computer Science and Engineering student at United International University with strong skills in programming, software development, and problem-solving.",
  vision: "Passionate about building impactful solutions and continuously learning modern technologies.",
  location: "Vatara, Dhaka, Bangladesh",
  email: "selimsalahuddin19@gmail.com",
  phone: "+880 1234 567890",
  profile_image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face",
  status: "Open to Work",
  map_link: "",
  github_link: "https://github.com/salahuddinselim",
  linkedin_link: "https://linkedin.com/in/salahuddinselim",
  twitter_link: "",
  facebook_link: "https://facebook.com/salahuddinselim",
  instagram_link: "https://instagram.com/salahuddinselim",
  discord_username: "selim#1234",
};

export default function ProfilePage() {
  const [form, setForm] = useState<ProfileForm>(defaultProfile);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [imagePreview, setImagePreview] = useState<string>(defaultProfile.profile_image);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleChange = (field: keyof ProfileForm, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    setSaved(false);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
        handleChange("profile_image", reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleImageUrlChange = (url: string) => {
    setImagePreview(url);
    handleChange("profile_image", url);
  };

  const handleSave = async () => {
    setSaving(true);
    await new Promise((r) => setTimeout(r, 1000));
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  interface FieldDef {
  key: string;
  label: string;
  type: string;
  rows?: number;
}

const fieldGroups: { title: string; fields: FieldDef[] }[] = [
    {
      title: "Basic Info",
      fields: [
        { key: "name", label: "Full Name", type: "text" },
        { key: "role", label: "Role/Title", type: "text" },
        { key: "location", label: "Location", type: "text" },
        { key: "email", label: "Email", type: "email" },
        { key: "phone", label: "Phone", type: "text" },
      ]
    },
    {
      title: "About",
      fields: [
        { key: "bio", label: "Bio", type: "textarea", rows: 4 },
        { key: "vision", label: "Vision", type: "textarea", rows: 3 },
      ]
    },
    {
      title: "Social Links",
      fields: [
        { key: "github_link", label: "GitHub URL", type: "url" },
        { key: "linkedin_link", label: "LinkedIn URL", type: "url" },
        { key: "twitter_link", label: "Twitter URL", type: "url" },
        { key: "facebook_link", label: "Facebook URL", type: "url" },
        { key: "instagram_link", label: "Instagram URL", type: "url" },
        { key: "discord_username", label: "Discord Username", type: "text" },
      ]
    }
  ];

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold">Profile Settings</h1>
        <button
          onClick={handleSave}
          disabled={saving}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-400 transition-colors disabled:opacity-50 cursor-pointer"
        >
          <Save size={18} />
          {saving ? "Saving..." : saved ? "Saved!" : "Save All"}
        </button>
      </div>

      <div className="grid lg:grid-cols-4 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="lg:col-span-1"
        >
          <h2 className="font-semibold mb-4">Profile Photo</h2>
          <div className="space-y-4">
            <div className="relative w-40 h-40 mx-auto rounded-full overflow-hidden border-4 border-cyan-500/30">
              <img
                src={imagePreview}
                alt="Profile"
                className="w-full h-full object-cover"
              />
            </div>
            
            <div className="text-center space-y-3">
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleImageChange}
                accept="image/*"
                className="hidden"
              />
              <button
                onClick={() => fileInputRef.current?.click()}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl glass hover:bg-white/10 transition-colors cursor-pointer w-full justify-center"
              >
                <Upload size={16} />
                Upload Photo
              </button>

              <input
                type="url"
                value={form.profile_image}
                onChange={(e) => handleImageUrlChange(e.target.value)}
                placeholder="Image URL"
                className="w-full px-3 py-2 rounded-xl glass outline-none focus:ring-2 focus:ring-cyan-500/50 text-sm cursor-text"
              />
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="lg:col-span-3 space-y-6"
        >
          {fieldGroups.map((group, gIdx) => (
            <div key={group.title} className="glass rounded-xl p-6">
              <h2 className="font-semibold mb-4">{group.title}</h2>
              <div className="grid sm:grid-cols-2 gap-4">
                {group.fields.map((field) => (
                  <div key={field.key} className={field.type === "textarea" ? "sm:col-span-2" : ""}>
                    <label className="block text-sm text-gray-400 mb-2">{field.label}</label>
                    {field.type === "textarea" ? (
                      <textarea
                        value={form[field.key as keyof ProfileForm] as string}
                        onChange={(e) => handleChange(field.key as keyof ProfileForm, e.target.value)}
                        rows={field.rows || 3}
                        className="w-full px-4 py-3 rounded-xl glass outline-none focus:ring-2 focus:ring-cyan-500/50 transition-all cursor-text"
                      />
                    ) : (
                      <input
                        type={field.type}
                        value={form[field.key as keyof ProfileForm] as string}
                        onChange={(e) => handleChange(field.key as keyof ProfileForm, e.target.value)}
                        className="w-full px-4 py-3 rounded-xl glass outline-none focus:ring-2 focus:ring-cyan-500/50 transition-all cursor-text"
                      />
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}