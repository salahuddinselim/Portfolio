"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase";
import { FiTrash2, FiMail, FiCheck } from "react-icons/fi";

interface Message {
  id: string;
  name: string;
  email: string;
  message: string;
  read: boolean;
  created_at: string;
}

export default function MessagesPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    try {
      const supabase = createClient();
      const { data } = await supabase
        .from("messages")
        .select("*")
        .order("created_at", { ascending: false });
      
      if (data) setMessages(data);
    } catch (e) {
      console.error("Error fetching messages:", e);
    }
    setLoading(false);
  };

  const markAsRead = async (id: string) => {
    const supabase = createClient();
    await supabase
      .from("messages")
      .update({ read: true })
      .eq("id", id);
    
    setMessages(messages.map(m => 
      m.id === id ? { ...m, read: true } : m
    ));
  };

  const deleteMessage = async (id: string) => {
    if (!confirm("Delete this message?")) return;
    
    const supabase = createClient();
    await supabase.from("messages").delete().eq("id", id);
    setMessages(messages.filter(m => m.id !== id));
  };

  const unreadCount = messages.filter(m => !m.read).length;

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-cyan-400 font-mono">Loading messages...</div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="font-display text-3xl font-bold">Messages</h1>
        {unreadCount > 0 && (
          <span className="px-3 py-1 bg-cyan-500 text-slate-950 rounded-full text-sm font-medium">
            {unreadCount} unread
          </span>
        )}
      </div>

      {messages.length === 0 ? (
        <div className="glass rounded-2xl p-12 text-center">
          <FiMail className="w-16 h-16 mx-auto text-slate-600 mb-4" />
          <p className="text-slate-500">No messages yet</p>
        </div>
      ) : (
        <div className="space-y-4">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`glass rounded-2xl p-6 ${msg.read ? "opacity-70" : "border-cyan-500/30"}`}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    {!msg.read && (
                      <span className="w-2 h-2 bg-cyan-500 rounded-full" />
                    )}
                    <h3 className="font-semibold text-slate-200">{msg.name}</h3>
                    <span className="text-sm text-slate-500">{msg.email}</span>
                  </div>
                  
                  <p className="text-slate-400 mb-3 whitespace-pre-wrap">{msg.message}</p>
                  
                  <div className="flex items-center gap-4 text-sm text-slate-500">
                    <span>{new Date(msg.created_at).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                      hour: "2-digit",
                      minute: "2-digit"
                    })}</span>
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  {!msg.read && (
                    <button
                      onClick={() => markAsRead(msg.id)}
                      className="p-2 rounded-lg bg-cyan-500/20 text-cyan-400 hover:bg-cyan-500/30 transition-colors"
                      title="Mark as read"
                    >
                      <FiCheck className="w-5 h-5" />
                    </button>
                  )}
                  <button
                    onClick={() => deleteMessage(msg.id)}
                    className="p-2 rounded-lg bg-red-500/20 text-red-400 hover:bg-red-500/30 transition-colors"
                    title="Delete"
                  >
                    <FiTrash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}