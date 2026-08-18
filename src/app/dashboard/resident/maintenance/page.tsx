"use client";

import React, { useState, useEffect } from "react";
import { ResidentSidebar } from "@/components/dashboard/ResidentSidebar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Wrench, Plus, CheckCircle2, Clock, Crown, AlertTriangle } from "lucide-react";
import { toast } from "sonner";
import {
  subscribeToMaintenance,
  createMaintenanceTicket,
  MaintenanceRecord,
} from "@/lib/firestoreService";

export default function ResidentMaintenancePage() {
  const [tickets, setTickets] = useState<MaintenanceRecord[]>([]);

  const [category, setCategory] = useState<"AC" | "PLUMBING" | "WIFI" | "ELECTRICAL" | "OTHER">("AC");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState<"LOW" | "MEDIUM" | "HIGH" | "URGENT">("MEDIUM");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const unsub = subscribeToMaintenance(setTickets);
    return () => unsub();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !description) return;
    setIsSubmitting(true);

    await createMaintenanceTicket({
      residentName: "Fatima Khan",
      room: "Room 204",
      category,
      title,
      description,
      priority,
      status: "OPEN",
      date: new Date().toLocaleDateString("en-US", { month: "short", day: "2-digit", year: "numeric" }),
    });

    setIsSubmitting(false);
    setTitle("");
    setDescription("");
    toast.success("Complaint logged! Hostel Maintenance Team dispatched.");
  };

  return (
    <div className="flex min-h-[calc(100vh-5rem)] bg-[#070709] text-slate-100">
      <ResidentSidebar />

      <main className="flex-grow p-4 sm:p-8 space-y-6 overflow-y-auto">
        <div className="border-b border-amber-500/20 pb-5">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-amber-500/15 text-amber-300 font-bold text-[10px] uppercase tracking-wider border border-amber-500/30 shadow-sm">
              <Crown className="w-3.5 h-3.5 text-amber-400" />
              Resident Services
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold font-serif text-white mt-1.5">
            Maintenance & Complaints Helpdesk
          </h1>
          <p className="text-xs text-slate-400">Report AC cooling, plumbing, electrical, or Wi-Fi issues in your room</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Lodge Ticket Form */}
          <div className="lg:col-span-5">
            <Card className="border-amber-500/25 shadow-xl bg-[#0c0c10]">
              <CardHeader className="py-4">
                <CardTitle className="text-base font-serif text-white">Lodge Room Complaint</CardTitle>
                <CardDescription className="text-slate-400 text-xs">Hostel technical team responds within 2 hours</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1.5">
                      <label className="font-semibold text-slate-300">Category</label>
                      <select
                        value={category}
                        onChange={(e) => setCategory(e.target.value as any)}
                        className="w-full h-10 rounded-xl border border-amber-500/30 bg-slate-950 px-3 text-xs text-white"
                      >
                        <option value="AC">Inverter AC / Cooler</option>
                        <option value="PLUMBING">Plumbing / Bath</option>
                        <option value="WIFI">Wi-Fi / Internet</option>
                        <option value="ELECTRICAL">Electrical / Lighting</option>
                        <option value="OTHER">General Housekeeping</option>
                      </select>
                    </div>

                    <div className="space-y-1.5">
                      <label className="font-semibold text-slate-300">Urgency Level</label>
                      <select
                        value={priority}
                        onChange={(e) => setPriority(e.target.value as any)}
                        className="w-full h-10 rounded-xl border border-amber-500/30 bg-slate-950 px-3 text-xs text-white"
                      >
                        <option value="LOW">Low</option>
                        <option value="MEDIUM">Medium</option>
                        <option value="HIGH">High (Urgent)</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="font-semibold text-slate-300">Subject / Issue Title *</label>
                    <Input
                      required
                      placeholder="e.g. AC cooling slow / Washroom tap dripping"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      className="bg-slate-950 border-amber-500/30 text-white"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="font-semibold text-slate-300">Detailed Description *</label>
                    <textarea
                      rows={3}
                      required
                      placeholder="Please explain the issue so the technician brings the correct tools..."
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      className="w-full rounded-xl border border-amber-500/30 bg-slate-950 p-2.5 text-xs text-white placeholder:text-slate-500 focus-visible:ring-2 focus-visible:ring-amber-500"
                    />
                  </div>

                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full font-black h-11 bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 hover:from-amber-400"
                  >
                    <Wrench className="w-4 h-4 mr-1.5" />
                    {isSubmitting ? "Submitting..." : "Submit Complaint Ticket"}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Ticket History */}
          <div className="lg:col-span-7 space-y-4">
            <Card className="border-amber-500/25 bg-[#0c0c10]">
              <CardHeader className="py-4">
                <CardTitle className="text-base font-serif text-white">
                  My Complaint Tickets ({tickets.length})
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {tickets.map((t) => (
                  <div key={t.id} className="p-4 rounded-xl border border-amber-500/20 bg-slate-950 space-y-2 text-xs">
                    <div className="flex justify-between items-start">
                      <div>
                        <Badge variant="outline" className="text-[10px]">{t.category}</Badge>
                        <h4 className="font-bold text-sm text-white mt-1">{t.title}</h4>
                      </div>
                      <Badge
                        variant={
                          t.status === "RESOLVED"
                            ? "gold"
                            : t.status === "IN_PROGRESS"
                            ? "secondary"
                            : "outline"
                        }
                      >
                        {t.status.replace("_", " ")}
                      </Badge>
                    </div>
                    <p className="text-slate-300">{t.description}</p>
                    <div className="flex justify-between items-center text-[10px] text-slate-500 pt-2 border-t border-amber-500/10">
                      <span>Reported on: {t.date}</span>
                      <span className="font-bold text-amber-400">Priority: {t.priority}</span>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
