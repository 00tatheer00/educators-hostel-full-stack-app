"use client";

import React, { useState, useEffect } from "react";
import { ResidentSidebar } from "@/components/dashboard/ResidentSidebar";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { UtensilsCrossed, Coffee, Sun, Moon, Sparkles, Crown, ShieldAlert } from "lucide-react";
import {
  subscribeToMessMenu,
  MessMenuDay,
} from "@/lib/firestoreService";

export default function ResidentMessMenuPage() {
  const [menu, setMenu] = useState<MessMenuDay[]>([]);

  useEffect(() => {
    const unsub = subscribeToMessMenu(setMenu);
    return () => unsub();
  }, []);

  const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const currentDayName = daysOfWeek[new Date().getDay()];

  return (
    <div className="flex min-h-[calc(100vh-5rem)] bg-[#070709] text-slate-100">
      <ResidentSidebar />

      <main className="flex-grow p-4 sm:p-8 space-y-6 overflow-y-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-amber-500/20 pb-5">
          <div>
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-amber-500/15 text-amber-300 font-bold text-[10px] uppercase tracking-wider border border-amber-500/30 shadow-sm">
                <Crown className="w-3.5 h-3.5 text-amber-400" />
                Hostel Dining Hall
              </span>
              <Badge variant="gold" className="text-[10px]">3 Meals Daily + Tea</Badge>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold font-serif text-white mt-1.5">
              Weekly Mess & Dining Menu
            </h1>
            <p className="text-xs text-slate-400">
              Freshly prepared home-style halal meals with balanced nutrition for all residents
            </p>
          </div>
        </div>

        {/* Dining Timings Notice */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-4 rounded-2xl bg-[#0c0c10] border border-amber-500/25 flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/20 flex items-center justify-center text-amber-400 shrink-0 border border-amber-500/30">
              <Coffee className="w-5 h-5" />
            </div>
            <div className="text-xs">
              <h4 className="font-bold text-white">Breakfast Hours</h4>
              <p className="text-slate-400 text-[11px]">07:00 AM — 09:30 AM</p>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-[#0c0c10] border border-amber-500/25 flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/20 flex items-center justify-center text-amber-400 shrink-0 border border-amber-500/30">
              <Sun className="w-5 h-5" />
            </div>
            <div className="text-xs">
              <h4 className="font-bold text-white">Lunch Hours</h4>
              <p className="text-slate-400 text-[11px]">01:00 PM — 03:00 PM</p>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-[#0c0c10] border border-amber-500/25 flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/20 flex items-center justify-center text-amber-400 shrink-0 border border-amber-500/30">
              <Moon className="w-5 h-5" />
            </div>
            <div className="text-xs">
              <h4 className="font-bold text-white">Dinner Hours</h4>
              <p className="text-slate-400 text-[11px]">07:30 PM — 09:30 PM</p>
            </div>
          </div>
        </div>

        {/* 7-Day Menu Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {menu.map((item) => {
            const isToday = item.day.toLowerCase() === currentDayName.toLowerCase();
            return (
              <Card
                key={item.id}
                className={`overflow-hidden transition-all flex flex-col justify-between ${
                  isToday
                    ? "border-amber-400 bg-[#12110b] shadow-xl shadow-amber-500/10 ring-1 ring-amber-400/40"
                    : "border-amber-500/20 bg-[#0c0c10]"
                }`}
              >
                <CardHeader className="py-3.5 px-5 bg-slate-950/80 border-b border-amber-500/15 flex flex-row items-center justify-between">
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-bold font-serif text-base text-white">{item.day}</h3>
                      {isToday && <Badge variant="gold" className="text-[9px]">Today</Badge>}
                    </div>
                    <span className="text-xs text-amber-300 font-serif">{item.dayUrdu}</span>
                  </div>
                </CardHeader>

                <CardContent className="p-5 space-y-3.5 text-xs">
                  <div className="space-y-1">
                    <div className="flex items-center gap-1.5 text-amber-400 font-semibold text-[11px]">
                      <Coffee className="w-3.5 h-3.5" />
                      <span>Breakfast:</span>
                    </div>
                    <p className="text-slate-200 pl-5">{item.breakfast}</p>
                  </div>

                  <div className="space-y-1">
                    <div className="flex items-center gap-1.5 text-amber-400 font-semibold text-[11px]">
                      <Sun className="w-3.5 h-3.5" />
                      <span>Lunch:</span>
                    </div>
                    <p className="text-slate-200 pl-5">{item.lunch}</p>
                  </div>

                  <div className="space-y-1">
                    <div className="flex items-center gap-1.5 text-amber-400 font-semibold text-[11px]">
                      <Moon className="w-3.5 h-3.5" />
                      <span>Dinner:</span>
                    </div>
                    <p className="text-slate-200 pl-5">{item.dinner}</p>
                  </div>

                  {item.special && (
                    <div className="p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-[11px] text-amber-200 flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                      <span>Special: {item.special}</span>
                    </div>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>
      </main>
    </div>
  );
}
