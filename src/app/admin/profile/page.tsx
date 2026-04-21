"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase";

interface Profile {
  id?: string;
  name: string;
  role: string;
  bio: string;
  email: string;
  location: string;
  github_link: string;
  linkedin_link: string;
  facebook_link: string;
  instagram_link: string;
  profile_image: string;
}

export default function ProfilePage() {
  const [profile, setProfile] = useState<Profile>({
    name: "",
    role: "",
    bio: "",
    email: "",
    location: "",
    github_link: "",
    linkedin_link: "",
    facebook_link: "",
    instagram_link: "",
    profile_image: "",
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const supabase = createClient();
        const { data } = await supabase.from("profiles").select("*").limit(1).maybeSingle();
        if (data) {
          setProfile({
            name: data.name || "",
            role: data.role || "",
            bio: data.bio || "",
            email: data.email || "",
            location: data.location || "",
            github_link: data.github_link || "",
            linkedin_link: data.linkedin_link || "",
            facebook_link: data.facebook_link || "",
            instagram_link: data.instagram_link || "",
            profile_image: data.profile_image || "",
          });
        }
      } catch (e) {
        console.log("No profile found", e);
      }
    };
    fetchProfile();
  }, []);

  const uploadImage = async (file: File) => {
    setUploading(true);
    setMessage("");
    const supabase = createClient();
    const fileExt = file.name.split(".").pop();
    const fileName = `profile-${Date.now()}.${fileExt}`;
    
    try {
      const { data, error } = await supabase.storage
        .from("portfolio")
        .upload(fileName, file, { upsert: true });
      
      if (error) {
        if (error.message.includes("Bucket not found")) {
          setMessage("Storage bucket not configured. Please paste image URL instead.");
        } else {
          setMessage("Upload failed: " + error.message);
        }
        setUploading(false);
        return null;
      }
      
      const { data: urlData } = supabase.storage
        .from("portfolio")
        .getPublicUrl(fileName);
      
      setUploading(false);
      return urlData?.publicUrl || "";
    } catch (err: any) {
      setMessage("Storage not configured. Please paste image URL instead.");
      setUploading(false);
      return null;
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    const url = await uploadImage(file);
    if (url) {
      setProfile({ ...profile, profile_image: url });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    const supabase = createClient();
    
    const existing = await supabase.from("profiles").select("id").limit(1).maybeSingle();
    
    if (existing?.data?.id) {
      const { error } = await supabase
        .from("profiles")
        .update({
          name: profile.name,
          role: profile.role,
          bio: profile.bio,
          email: profile.email,
          location: profile.location,
          github_link: profile.github_link,
          linkedin_link: profile.linkedin_link,
          facebook_link: profile.facebook_link,
          instagram_link: profile.instagram_link,
          profile_image: profile.profile_image,
          updated_at: new Date().toISOString(),
        })
        .eq("id", existing.data.id);

      if (error) {
        setMessage("Error: " + error.message);
      } else {
        setMessage("Profile updated successfully!");
      }
    } else {
      const { error } = await supabase
        .from("profiles")
        .insert(profile);

      if (error) {
        setMessage("Error: " + error.message);
      } else {
        setMessage("Profile created successfully!");
      }
    }
    setLoading(false);
  };

  return (
    <div>
      <h1 className="font-display text-3xl font-bold mb-8">Profile Management</h1>
      
      <form onSubmit={handleSubmit} className="max-w-2xl space-y-6">
        {message && (
          <div className={`p-4 rounded-lg ${message.includes("Error") ? "bg-red-500/20 text-red-400" : "bg-green-500/20 text-green-400"}`}>
            {message}
          </div>
        )}

        <div className="glass rounded-2xl p-6 space-y-6">
          <h2 className="font-display text-xl font-semibold">Basic Information</h2>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-muted mb-2">Name *</label>
              <input
                type="text"
                required
                value={profile.name}
                onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                className="w-full px-4 py-3 bg-white/5 border border-white/5 rounded-lg text-text focus:outline-none focus:border-cyan-500/50"
              />
            </div>
            <div>
              <label className="block text-sm text-muted mb-2">Role</label>
              <input
                type="text"
                value={profile.role}
                onChange={(e) => setProfile({ ...profile, role: e.target.value })}
                className="w-full px-4 py-3 bg-white/5 border border-white/5 rounded-lg text-text focus:outline-none focus:border-cyan-500/50"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm text-muted mb-2">Bio</label>
            <textarea
              value={profile.bio}
              onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
              rows={4}
              className="w-full px-4 py-3 bg-white/5 border border-white/5 rounded-lg text-text focus:outline-none focus:border-cyan-500/50 resize-none"
            />
          </div>
        </div>

        <div className="glass rounded-2xl p-6 space-y-6">
          <h2 className="font-display text-xl font-semibold">Profile Photo</h2>
          
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              {profile.profile_image ? (
                <img src={profile.profile_image} alt="Profile" className="w-20 h-20 object-cover rounded-lg" />
              ) : (
                <div className="w-20 h-20 rounded-lg bg-white/5 flex items-center justify-center text-muted">
                  No image
                </div>
              )}
              <label className="px-4 py-2 glass rounded-lg text-sm hover:bg-white/10 transition-colors cursor-pointer">
                {uploading ? "Uploading..." : "Upload Photo"}
                <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
              </label>
              {profile.profile_image && (
                <button
                  type="button"
                  onClick={() => setProfile({ ...profile, profile_image: "" })}
                  className="px-4 py-2 text-red-400 text-sm hover:text-red-300"
                >
                  Remove
                </button>
              )}
            </div>
            
            <div>
              <label className="block text-sm text-muted mb-2">Or paste image URL</label>
              <input
                type="url"
                value={profile.profile_image}
                onChange={(e) => setProfile({ ...profile, profile_image: e.target.value })}
                placeholder="https://example.com/photo.jpg"
                className="w-full px-4 py-3 bg-white/5 border border-white/5 rounded-lg text-text focus:outline-none focus:border-cyan-500/50"
              />
            </div>
          </div>
        </div>

        <div className="glass rounded-2xl p-6 space-y-6">
          <h2 className="font-display text-xl font-semibold">Contact Information</h2>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-muted mb-2">Email</label>
              <input
                type="email"
                value={profile.email}
                onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                className="w-full px-4 py-3 bg-white/5 border border-white/5 rounded-lg text-text focus:outline-none focus:border-cyan-500/50"
              />
            </div>
            <div>
              <label className="block text-sm text-muted mb-2">Location</label>
              <input
                type="text"
                value={profile.location}
                onChange={(e) => setProfile({ ...profile, location: e.target.value })}
                className="w-full px-4 py-3 bg-white/5 border border-white/5 rounded-lg text-text focus:outline-none focus:border-cyan-500/50"
              />
            </div>
          </div>
        </div>

        <div className="glass rounded-2xl p-6 space-y-6">
          <h2 className="font-display text-xl font-semibold">Social Links</h2>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-muted mb-2">GitHub URL</label>
              <input
                type="url"
                value={profile.github_link}
                onChange={(e) => setProfile({ ...profile, github_link: e.target.value })}
                className="w-full px-4 py-3 bg-white/5 border border-white/5 rounded-lg text-text focus:outline-none focus:border-cyan-500/50"
              />
            </div>
            <div>
              <label className="block text-sm text-muted mb-2">LinkedIn URL</label>
              <input
                type="url"
                value={profile.linkedin_link}
                onChange={(e) => setProfile({ ...profile, linkedin_link: e.target.value })}
                className="w-full px-4 py-3 bg-white/5 border border-white/5 rounded-lg text-text focus:outline-none focus:border-cyan-500/50"
              />
            </div>
            <div>
              <label className="block text-sm text-muted mb-2">Facebook URL</label>
              <input
                type="url"
                value={profile.facebook_link}
                onChange={(e) => setProfile({ ...profile, facebook_link: e.target.value })}
                className="w-full px-4 py-3 bg-white/5 border border-white/5 rounded-lg text-text focus:outline-none focus:border-cyan-500/50"
              />
            </div>
            <div>
              <label className="block text-sm text-muted mb-2">Instagram URL</label>
              <input
                type="url"
                value={profile.instagram_link}
                onChange={(e) => setProfile({ ...profile, instagram_link: e.target.value })}
                className="w-full px-4 py-3 bg-white/5 border border-white/5 rounded-lg text-text focus:outline-none focus:border-cyan-500/50"
              />
            </div>
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="px-6 py-3 bg-cyan-500 text-bg font-medium rounded-lg hover:bg-cyan-400 transition-colors glow-cyan disabled:opacity-50"
        >
          {loading ? "Saving..." : "Save Profile"}
        </button>
      </form>
    </div>
  );
}