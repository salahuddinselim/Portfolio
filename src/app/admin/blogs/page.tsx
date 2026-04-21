"use client";

import { useState } from "react";
import { Plus, Edit2, Trash2, Eye, EyeOff } from "lucide-react";

interface Blog {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  published: boolean;
}

const defaultBlogs: Blog[] = [];

export default function BlogsPage() {
  const [blogs, setBlogs] = useState<Blog[]>(defaultBlogs);

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this blog post?")) {
      setBlogs((prev) => prev.filter((b) => b.id !== id));
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold">Blog Posts</h1>
        <button className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-400 transition-colors">
          <Plus size={18} />
          New Post
        </button>
      </div>

      {blogs.length === 0 ? (
        <div className="glass rounded-xl p-12 text-center">
          <p className="text-gray-400 mb-4">No blog posts yet. Create your first post!</p>
        </div>
      ) : (
        <div className="space-y-4">
          {blogs.map((blog) => (
            <div key={blog.id} className="glass rounded-xl p-6 flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="font-semibold text-lg">{blog.title}</h3>
                  <span
                    className={`px-2 py-0.5 rounded-full text-xs ${
                      blog.published
                        ? "bg-green-500/20 text-green-400"
                        : "bg-yellow-500/20 text-yellow-400"
                    }`}
                  >
                    {blog.published ? "Published" : "Draft"}
                  </span>
                </div>
                <p className="text-gray-400 text-sm mb-2">{blog.excerpt}</p>
                <p className="text-gray-500 text-xs">/{blog.slug}</p>
              </div>
              <div className="flex gap-2">
                <button className="p-2 text-gray-400 hover:text-white transition-colors">
                  <Edit2 size={16} />
                </button>
                <button
                  onClick={() => handleDelete(blog.id)}
                  className="p-2 text-gray-400 hover:text-red-400 transition-colors"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}