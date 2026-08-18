"use client";

import React, { useState } from "react";
import { AdminSidebar } from "@/components/dashboard/AdminSidebar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Wrench, CheckCircle2, AlertTriangle, Clock, Crown } from "lucide-react";
import { toast } from "sonner";

interface MaintenanceTicket {
  id: string;
  residentName: string;
  room: string;
  category: "PLUMBING" | "ELECTRICAL" | "WIFI" | "AC" | "OTHER";
  title: string;
  description: string;
  priority: "LOW" | "MEDIUM" | "HIGH" | "URGENT";
  status: "OPEN" | "IN_PROGRESS" | "RESOLVED";
  date: string;
}

export default function AdminMaintenancePage() {
  const [tickets, setTickets] = useState<MaintenanceTicket[]>([
    {
      id: "TKT-301",
      residentName: "Fatima Khan",
      room: "Room 204",
      category: "AC",
      title: "Inverter AC Cooling Service Needed",
      description: "AC cooling reduced over the last 2 days. Filter needs cleaning.",
      priority: "HIGH",
      status: "OPEN",
      date: "Aug 15, 2026",
    },
    {
      id: "TKT-302",
      residentName: "Ayesha Noor",
      room: "Room 108",
      category: "PLUMBING",
      title: "Bathroom Sink Tap Leakage",
      description: "Water leaking slowly under the sink.",
      priority: "MEDIUM",
      status: "IN_PROGRESS",
      date: "Aug 14, 2026",
    },
    {
      id: "TKT-303",
      residentName: "Dr. Maryam Khattak",
      room: "Room 301",
      category: "WIFI",
      title: "Wi-Fi Speed Drop",
      description: "Router restarted, speed fine now.",
      priority: "LOW",
      status: "RESOLVED",
      date: "Aug 12, 2026",
    },
  ]);

  const handleResolve = (id: string) => {
    setTickets(tickets.map((t) => (t.id === id ? { ...t, status: "RESOLVED" } : t)));
    toast.success(`Ticket ${id} marked as resolved!`);
  };

  return (
    <div className="flex min-h-[calc(100vh-5rem)] bg-[#070709] text-slate-100">
      <AdminSidebar />

      <main className="flex-grow p-6 sm:p-10 space-y-8 overflow-y-auto">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-amber-500/20 pb-6">
          <div>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/15 text-amber-300 font-bold text-xs uppercase tracking-wider border border-amber-500/30">
              <Crown className="w-3.5 h-3.5 text-amber-400" />
              Maintenance Board
            </span>
            <h1 className="text-3xl font-extrabold font-serif text-white mt-2">
              Complaints & Repair Requests
            </h1>
            <p className="text-xs text-slate-400">Track resident complaints, assign technicians, and confirm resolutions</p>
          </div>
        </div>

        {/* Board Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {["OPEN", "IN_PROGRESS", "RESOLVED"].map((colStatus) => {
            const colTickets = tickets.filter((t) => t.status === colStatus);
            return (
              <Card key={colStatus} className="border-amber-500/25 bg-[#0c0c10]">
                <CardHeader className="py-3 px-4 bg-slate-950 border-b border-amber-500/15 flex flex-row items-center justify-between">
                  <CardTitle className="text-xs font-bold tracking-wider uppercase text-amber-300">
                    {colStatus.replace("_", " ")} ({colTickets.length})
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-4 space-y-4">
                  {colTickets.map((ticket) => (
                    <div key={ticket.id} className="p-4 rounded-xl border border-amber-500/20 bg-slate-950 space-y-3 text-xs">
                      <div className="flex justify-between items-start">
                        <div>
                          <Badge variant="outline" className="text-[10px]">{ticket.category}</Badge>
                          <h4 className="font-bold text-sm text-white mt-1">{ticket.title}</h4>
                          <p className="text-[11px] text-slate-400">{ticket.residentName} ({ticket.room})</p>
                        </div>
                        <Badge variant={ticket.priority === "HIGH" ? "destructive" : "gold"}>
                          {ticket.priority}
                        </Badge>
                      </div>
                      <p className="text-slate-300">{ticket.description}</p>
                      <div className="flex justify-between items-center pt-2 border-t border-amber-500/15">
                        <span className="text-[10px] text-slate-500">{ticket.date}</span>
                        {ticket.status !== "RESOLVED" && (
                          <Button onClick={() => handleResolve(ticket.id)} size="sm" className="text-[10px] font-bold bg-amber-500 text-slate-950 hover:bg-amber-400">
                            Mark Resolved
                          </Button>
                        )}
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            );
          })}
        </div>
      </main>
    </div>
  );
}
