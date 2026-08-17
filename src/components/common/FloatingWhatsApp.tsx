"use client";

import React, { useState } from "react";
import { MessageCircle, X, Send, Sparkles, ShieldCheck, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";

export function FloatingWhatsApp() {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("Hi! I'd like to check room availability and hostel mess details.");

  const handleSend = () => {
    const encoded = encodeURIComponent(message);
    window.open(`https://wa.me/923001234567?text=${encoded}`, "_blank");
    setIsOpen(false);
  };

  const quickPrompts = [
    "Book Single Executive Room",
    "Double Sharing Room Rent?",
    "Mess Menu & Food Timings",
    "Schedule Hostel Visit Today",
  ];

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      {/* Interactive Chat Popup */}
      {isOpen && (
        <div className="mb-3 w-80 sm:w-96 rounded-3xl bg-white dark:bg-slate-900 border-2 border-emerald-500/40 shadow-2xl shadow-emerald-950/20 overflow-hidden transform transition-all animate-fade-in">
          {/* Header */}
          <div className="bg-gradient-to-r from-emerald-600 via-teal-600 to-indigo-600 text-white p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center font-bold text-base border-2 border-white/40">
                  👩‍💼
                </div>
                <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-400 border-2 border-white rounded-full"></span>
              </div>
              <div>
                <h4 className="font-bold text-sm leading-tight flex items-center gap-1.5">
                  Hostel Warden Desk
                  <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                </h4>
                <p className="text-[11px] text-emerald-100 flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3" />
                  Verified Female Support • Online
                </p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1.5 rounded-full hover:bg-white/20 text-white transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Chat Body */}
          <div className="p-4 space-y-3 bg-slate-50 dark:bg-slate-950/50">
            <div className="p-3 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs text-slate-700 dark:text-slate-200 space-y-1 shadow-sm">
              <p className="font-medium text-emerald-700 dark:text-emerald-400">Assalam-o-Alaikum! 👋</p>
              <p>Welcome to Educator Girls Hostel, Peshawar. How can our warden assistance team help you today?</p>
              <span className="text-[10px] text-slate-400 block text-right">Instant Reply</span>
            </div>

            {/* Quick Prompts */}
            <div className="space-y-1.5">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Quick Inquiries:</span>
              <div className="flex flex-wrap gap-1.5">
                {quickPrompts.map((prompt, i) => (
                  <button
                    key={i}
                    onClick={() => setMessage(prompt)}
                    className="text-[11px] px-2.5 py-1 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-700/60 hover:bg-emerald-100 transition-colors font-medium text-left"
                  >
                    {prompt}
                  </button>
                ))}
              </div>
            </div>

            {/* Message Input */}
            <div className="pt-2 flex gap-2">
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type your WhatsApp message..."
                className="flex-1 rounded-2xl bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 px-3 py-2 text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                onKeyDown={(e) => e.key === "Enter" && handleSend()}
              />
              <Button
                onClick={handleSend}
                size="sm"
                className="rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white px-3 font-bold shadow-md shadow-emerald-600/30"
              >
                <Send className="w-3.5 h-3.5" />
              </Button>
            </div>
          </div>

          {/* Footer Call Option */}
          <div className="px-4 py-2 bg-slate-100 dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between text-[11px] text-slate-500">
            <span>Direct Call Available</span>
            <a
              href="tel:+923001234567"
              className="text-emerald-700 dark:text-emerald-400 font-bold hover:underline flex items-center gap-1"
            >
              <Phone className="w-3 h-3" />
              +92 300 1234567
            </a>
          </div>
        </div>
      )}

      {/* Floating Action Button with Animated Saturated Glow & Pulse */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="group relative flex items-center gap-2.5 px-4 py-3 rounded-full bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-600 text-white shadow-2xl shadow-emerald-500/50 hover:scale-105 active:scale-95 transition-all duration-300 border-2 border-white/50"
      >
        <span className="relative flex h-3 w-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-300 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3 w-3 bg-amber-400"></span>
        </span>
        <MessageCircle className="w-6 h-6 fill-white" />
        <span className="font-bold text-xs pr-1 hidden sm:inline">WhatsApp Warden Desk</span>
        <span className="absolute -top-2 -right-2 px-2 py-0.5 rounded-full bg-rose-500 text-white text-[10px] font-black border border-white shadow-md animate-bounce">
          ONLINE
        </span>
      </button>
    </div>
  );
}
