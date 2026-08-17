"use client";

import React, { useState } from "react";
import { ResidentSidebar } from "@/components/dashboard/ResidentSidebar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Wrench, Plus, CheckCircle2, Clock } from "lucide-react";
import { toast } from "sonner";

interface ResidentTicket {
  id: string;
  category: string;
  title: string;
  description: string;
  priority: string;
  status: "OPEN" | "IN_PROGRESS" | "RESOLVED";
  date: string;
}

export default function ResidentMaintenancePage() {
  const [tickets, setTickets] = useState<ResidentTicket[]>([
    {
      id: "TKT-301",
      category: "AC",
      title: "Inverter AC Cooling Service",
      description: "AC cooling reduced over the last 2 days. Filter needs cleaning.",
      priority: "HIGH",
      status: "OPEN",
      date: "Aug 15, 2026",
    },
  ]);

  const [category, setCategory] = useState("AIR_CONDITIONER");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("MEDIUM");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !description) return;

    const newTicket: ResidentTicket = {
      id: `TKT-${Math.floor(100 + Math.random() * 900)}`,
      category,
      title,
      description,
      priority,
      status: "OPEN",
      date: "Aug 16, 2026",
    };

    setTickets([newTicket, ...tickets]);
    setTitle("");
    setDescription("");
    toast.success("Maintenance ticket submitted! Housekeeping staff notified.");
  };

  return (
    <div className="flex min-h-[calc(100vh-5rem)]">
      <ResidentSidebar />

      <main className="flex-grow p-6 sm:p-10 space-y-8 overflow-y-auto">
        <div className="border-b border-slate-200 dark:border-slate-800 pb-6">
          <Badge variant="emerald">Helpdesk</Badge>
          <h1 className="text-3xl font-extrabold font-serif text-slate-900 dark:text-slate-100 mt-1">
            Maintenance & Repairs
          </h1>
          <p className="text-xs text-slate-500">Report room issues (AC, Plumbing, Wi-Fi, Electrical) to female staff</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Submit Form */}
          <div className="lg:col-span-5">
            <Card className="border-slate-200 dark:border-slate-800 shadow-xl">
              <CardHeader>
                <CardTitle className="text-lg font-serif">Submit Maintenance Ticket</CardTitle>
                <CardDescription>Female housekeeping team will address within 24h</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                  <div className="space-y-1.5">
                    <label className="font-semibold">Issue Category</label>
                    <select
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      className="w-full h-11 rounded-xl border border-input bg-background px-3 text-xs"
                    >
                      <option value="AIR_CONDITIONER">Air Conditioner / Heating</option>
                      <option value="PLUMBING">Plumbing & Bathroom Tap</option>
                      <option value="WIFI_INTERNET">Wi-Fi & Internet</option>
                      <option value="ELECTRICAL">Electrical & Lighting</option>
                      <option value="FURNITURE">Furniture & Wardrobe</option>
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label className="font-semibold">Issue Title *</label>
                    <Input
                      required
                      placeholder="e.g. Bathroom light bulb needs replacement"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="font-semibold">Priority Level</label>
                    <select
                      value={priority}
                      onChange={(e) => setPriority(e.target.value)}
                      className="w-full h-11 rounded-xl border border-input bg-background px-3 text-xs"
                    >
                      <option value="LOW">Low</option>
                      <option value="MEDIUM">Medium</option>
                      <option value="HIGH">High</option>
                      <option value="URGENT">Urgent</option>
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label className="font-semibold">Detailed Description *</label>
                    <textarea
                      rows={3}
                      required
                      placeholder="Describe the issue and preferred room entry time..."
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      className="w-full rounded-xl border border-input bg-background p-3 text-xs focus-visible:ring-2 focus-visible:ring-emerald-700"
                    />
                  </div>

                  <Button type="submit" variant="emerald" className="w-full font-semibold h-11">
                    <Wrench className="w-4 h-4 mr-1.5" />
                    Submit Maintenance Ticket
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Ticket History */}
          <div className="lg:col-span-7 space-y-4">
            <Card className="border-slate-200 dark:border-slate-800">
              <CardHeader>
                <CardTitle className="text-base font-serif">My Active & Past Tickets</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {tickets.map((t) => (
                  <div key={t.id} className="p-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 space-y-2 text-xs">
                    <div className="flex justify-between items-center">
                      <div>
                        <Badge variant="outline">{t.category}</Badge>
                        <h4 className="font-bold text-sm text-slate-900 dark:text-slate-100 mt-1">{t.title}</h4>
                      </div>
                      <Badge variant={t.status === "OPEN" ? "gold" : "emerald"}>
                        {t.status}
                      </Badge>
                    </div>
                    <p className="text-slate-600 dark:text-slate-300">{t.description}</p>
                    <span className="text-[10px] text-slate-400 block pt-1">Submitted on: {t.date}</span>
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
