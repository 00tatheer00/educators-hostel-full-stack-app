"use client";

import React, { useState } from "react";
import { MessageCircle, X, Send, Sparkles, ShieldCheck, Phone, Crown } from "lucide-react";
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
        <div className="mb-3 w-80 sm:w-96 rounded-3xl bg-[#0d0d12] border border-amber-500/40 shadow-2xl shadow-black overflow-hidden transform transition-all animate-fade-in">
          {/* Header */}
          <div className="bg-gradient-to-r from-amber-500 via-amber-600 to-yellow-600 text-slate-950 p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-10 h-10 rounded-full bg-slate-950/20 flex items-center justify-center font-bold text-base border-2 border-slate-950/30 text-slate-950">
                  👩‍💼
                </div>
                <span className="absolute bottom-0 right-0 w-3 h-3 bg-amber-200 border-2 border-slate-950 rounded-full"></span>
              </div>
              <div>
                <h4 className="font-black text-sm leading-tight flex items-center gap-1.5 text-slate-950">
                  Hostel Warden Desk
                  <Sparkles className="w-3.5 h-3.5 text-slate-950" />
                </h4>
                <p className="text-[11px] text-slate-900 font-semibold flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3" />
                  VIP Female Support • Online
                </p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1.5 rounded-full hover:bg-black/20 text-slate-950 transition-colors"
            >
              <X className="w-4 h-4 font-bold" />
            </button>
          </div>

          {/* Chat Body */}
          <div className="p-4 space-y-3 bg-[#0a0a0e]">
            <div className="p-3 rounded-2xl bg-slate-900 border border-amber-500/20 text-xs text-slate-200 space-y-1 shadow-sm">
              <p className="font-bold text-amber-400">Assalam-o-Alaikum! 👋</p>
              <p>Welcome to Educator Girls Hostel, Peshawar. How can our warden assistance desk help you today?</p>
              <span className="text-[10px] text-slate-400 block text-right">Instant 24/7 Reply</span>
            </div>

            {/* Quick Prompts */}
            <div className="space-y-1.5">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Quick Inquiries:</span>
              <div className="flex flex-wrap gap-1.5">
                {quickPrompts.map((prompt, i) => (
                  <button
                    key={i}
                    onClick={() => setMessage(prompt)}
                    className="text-[11px] px-2.5 py-1 rounded-xl bg-amber-500/10 text-amber-300 border border-amber-500/30 hover:bg-amber-500/20 transition-colors font-semibold text-left"
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
                className="flex-1 rounded-2xl bg-slate-950 border border-amber-500/30 px-3.5 py-2 text-xs text-white focus:outline-none focus:ring-2 focus:ring-amber-500 placeholder:text-slate-500"
                onKeyDown={(e) => e.key === "Enter" && handleSend()}
              />
              <Button
                onClick={handleSend}
                size="sm"
                className="rounded-2xl bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 hover:from-amber-400 hover:to-amber-500 px-3 font-black shadow-md shadow-amber-500/30"
              >
                <Send className="w-3.5 h-3.5" />
              </Button>
            </div>
          </div>

          {/* Footer Call Option */}
          <div className="px-4 py-2.5 bg-[#070709] border-t border-amber-500/20 flex items-center justify-between text-[11px] text-slate-400">
            <span>Direct VIP Helpline</span>
            <a
              href="tel:+923001234567"
              className="text-amber-400 font-bold hover:underline flex items-center gap-1 font-mono"
            >
              <Phone className="w-3 h-3" />
              +92 300 1234567
            </a>
          </div>
        </div>
      )}

      {/* Floating Action Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="group relative flex items-center gap-2.5 px-4 py-3 rounded-full bg-gradient-to-r from-amber-500 via-amber-400 to-amber-600 text-slate-950 shadow-2xl shadow-amber-500/40 hover:scale-105 active:scale-95 transition-all duration-300 border-2 border-amber-300 font-black"
      >
        <span className="relative flex h-3 w-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-yellow-200 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3 w-3 bg-yellow-300"></span>
        </span>
        <MessageCircle className="w-6 h-6 fill-slate-950" />
        <span className="font-extrabold text-xs pr-1 hidden sm:inline text-slate-950">WhatsApp Warden Desk</span>
        <span className="absolute -top-2 -right-2 px-2 py-0.5 rounded-full bg-slate-950 text-amber-300 text-[10px] font-black border border-amber-400 shadow-md">
          VIP
        </span>
      </button>
    </div>
  );
}
