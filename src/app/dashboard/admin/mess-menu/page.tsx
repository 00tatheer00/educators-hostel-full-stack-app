"use client";

import React, { useState, useEffect } from "react";
import { AdminSidebar } from "@/components/dashboard/AdminSidebar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { UtensilsCrossed, Edit, Sparkles, Check, Crown, Coffee, Sun, Moon } from "lucide-react";
import { toast } from "sonner";
import {
  subscribeToMessMenu,
  updateMessMenuDay,
  MessMenuDay,
} from "@/lib/firestoreService";

export default function AdminMessMenuPage() {
  const [menu, setMenu] = useState<MessMenuDay[]>([]);
  const [editingDay, setEditingDay] = useState<MessMenuDay | null>(null);

  const [formData, setFormData] = useState({
    breakfast: "",
    lunch: "",
    dinner: "",
    special: "",
  });

  useEffect(() => {
    const unsub = subscribeToMessMenu(setMenu);
    return () => unsub();
  }, []);

  const handleOpenEdit = (item: MessMenuDay) => {
    setEditingDay(item);
    setFormData({
      breakfast: item.breakfast,
      lunch: item.lunch,
      dinner: item.dinner,
      special: item.special || "",
    });
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingDay) return;

    await updateMessMenuDay(editingDay.id, formData);
    setEditingDay(null);
    toast.success(`Menu for ${editingDay.day} updated in real time for all student portals!`);
  };

  return (
    <div className="flex min-h-[calc(100vh-5rem)] bg-[#070709] text-slate-100">
      <AdminSidebar />

      <main className="flex-grow p-4 sm:p-8 space-y-6 overflow-y-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-amber-500/20 pb-5">
          <div>
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-amber-500/15 text-amber-300 font-bold text-[10px] uppercase tracking-wider border border-amber-500/30 shadow-sm">
                <Crown className="w-3.5 h-3.5 text-amber-400" />
                Hostel Dining Desk
              </span>
              <Badge variant="gold" className="text-[10px]">7-Day Nutritional Schedule</Badge>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold font-serif text-white mt-1.5">
              Mess & Weekly Meal Schedule
            </h1>
            <p className="text-xs text-slate-400">
              Manage daily breakfast, lunch, and dinner menus published directly to resident student portals
            </p>
          </div>
        </div>

        {/* Days Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {menu.map((item) => (
            <Card
              key={item.id}
              className="border-amber-500/25 bg-[#0c0c10] overflow-hidden flex flex-col justify-between"
            >
              <CardHeader className="py-3.5 px-5 bg-slate-950 border-b border-amber-500/15 flex flex-row items-center justify-between">
                <div>
                  <h3 className="font-bold font-serif text-base text-white">{item.day}</h3>
                  <span className="text-xs text-amber-300 font-serif">{item.dayUrdu}</span>
                </div>
                <Button
                  onClick={() => handleOpenEdit(item)}
                  variant="outline"
                  size="sm"
                  className="text-xs h-7 px-2.5 border-amber-500/30 text-amber-300 hover:bg-amber-500/10"
                >
                  <Edit className="w-3 h-3 mr-1" />
                  Edit Day
                </Button>
              </CardHeader>

              <CardContent className="p-5 space-y-3.5 text-xs">
                {/* Breakfast */}
                <div className="space-y-1">
                  <div className="flex items-center gap-1.5 text-amber-400 font-semibold text-[11px]">
                    <Coffee className="w-3.5 h-3.5" />
                    <span>Breakfast (07:00 AM - 09:30 AM):</span>
                  </div>
                  <p className="text-slate-300 pl-5">{item.breakfast}</p>
                </div>

                {/* Lunch */}
                <div className="space-y-1">
                  <div className="flex items-center gap-1.5 text-amber-400 font-semibold text-[11px]">
                    <Sun className="w-3.5 h-3.5" />
                    <span>Lunch (01:00 PM - 03:00 PM):</span>
                  </div>
                  <p className="text-slate-300 pl-5">{item.lunch}</p>
                </div>

                {/* Dinner */}
                <div className="space-y-1">
                  <div className="flex items-center gap-1.5 text-amber-400 font-semibold text-[11px]">
                    <Moon className="w-3.5 h-3.5" />
                    <span>Dinner (07:30 PM - 09:30 PM):</span>
                  </div>
                  <p className="text-slate-300 pl-5">{item.dinner}</p>
                </div>

                {/* Special Highlight */}
                {item.special && (
                  <div className="p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-[11px] text-amber-200 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                    <span>Highlight: {item.special}</span>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Edit Modal */}
        {editingDay && (
          <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
            <Card className="border-amber-500/40 shadow-2xl p-6 space-y-4 max-w-lg w-full bg-[#0c0c10]">
              <div className="flex justify-between items-center border-b border-amber-500/20 pb-3">
                <CardTitle className="text-lg font-serif text-white flex items-center gap-2">
                  <UtensilsCrossed className="w-4 h-4 text-amber-400" />
                  Edit Menu for {editingDay.day} ({editingDay.dayUrdu})
                </CardTitle>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setEditingDay(null)}
                  className="h-7 text-xs border-amber-500/30 text-amber-300"
                >
                  Close
                </Button>
              </div>

              <form onSubmit={handleSave} className="space-y-4 text-xs">
                <div className="space-y-1.5">
                  <label className="font-semibold text-slate-300">Breakfast Menu</label>
                  <Input
                    required
                    value={formData.breakfast}
                    onChange={(e) => setFormData({ ...formData, breakfast: e.target.value })}
                    className="bg-slate-950 border-amber-500/30 text-white"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="font-semibold text-slate-300">Lunch Menu</label>
                  <Input
                    required
                    value={formData.lunch}
                    onChange={(e) => setFormData({ ...formData, lunch: e.target.value })}
                    className="bg-slate-950 border-amber-500/30 text-white"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="font-semibold text-slate-300">Dinner Menu</label>
                  <Input
                    required
                    value={formData.dinner}
                    onChange={(e) => setFormData({ ...formData, dinner: e.target.value })}
                    className="bg-slate-950 border-amber-500/30 text-white"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="font-semibold text-slate-300">Special Highlight / Dessert</label>
                  <Input
                    value={formData.special}
                    onChange={(e) => setFormData({ ...formData, special: e.target.value })}
                    className="bg-slate-950 border-amber-500/30 text-white"
                  />
                </div>

                <div className="flex gap-3 pt-3 border-t border-amber-500/15">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setEditingDay(null)}
                    className="w-1/2 border-amber-500/30 text-amber-300"
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    className="w-1/2 font-black bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 hover:from-amber-400"
                  >
                    Save & Update Menu
                  </Button>
                </div>
              </form>
            </Card>
          </div>
        )}
      </main>
    </div>
  );
}
