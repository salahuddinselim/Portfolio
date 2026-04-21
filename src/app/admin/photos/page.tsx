"use client";

import { useState } from "react";
import { Plus, Trash2 } from "lucide-react";

interface Photo {
  id: string;
  url: string;
  caption: string;
  category: string;
}

const defaultPhotos: Photo[] = [];

export default function PhotosPage() {
  const [photos, setPhotos] = useState<Photo[]>(defaultPhotos);

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this photo?")) {
      setPhotos((prev) => prev.filter((p) => p.id !== id));
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold">Photos</h1>
        <button className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-400 transition-colors">
          <Plus size={18} />
          Upload Photo
        </button>
      </div>

      {photos.length === 0 ? (
        <div className="glass rounded-xl p-12 text-center">
          <p className="text-gray-400 mb-4">No photos yet. Upload your first photo!</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {photos.map((photo) => (
            <div key={photo.id} className="glass rounded-xl overflow-hidden group">
              <div className="aspect-square bg-white/5 flex items-center justify-center">
                <img src={photo.url} alt={photo.caption} className="w-full h-full object-cover" />
              </div>
              <div className="p-3 flex items-center justify-between">
                <span className="text-sm truncate">{photo.caption}</span>
                <button
                  onClick={() => handleDelete(photo.id)}
                  className="p-1 text-gray-400 hover:text-red-400 transition-colors"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}