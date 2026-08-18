"use client";

import React, { useState, useEffect } from "react";
import { AdminSidebar } from "@/components/dashboard/AdminSidebar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Wrench, CheckCircle2, AlertTriangle, Clock, Crown, ArrowRight } from "lucide-react";
import { toast } from "sonner";
import {
  subscribeToMaintenance,
  updateMaintenanceStatus,
  MaintenanceRecord,
} from "@/lib/firestoreService";

export default function AdminMaintenancePage() {
  const [tickets, setTickets] = useState<MaintenanceRecord[]>([]);

  useEffect(() => {
    const unsub = subscribeToMaintenance(setTickets);
    return () => unsub();
  }, []);

  const handleStatus = async (id: string, status: "OPEN" | "IN_PROGRESS" | "RESOLVED") => {
    await updateMaintenanceStatus(id, status);
    toast.success(`Ticket ${id} status updated to ${status}`);
  };

  return (
    <div className="flex min-h-[calc(100vh-5rem)] bg-[#070709] text-slate-100">
      <AdminSidebar />

      <main className="flex-grow p-4 sm:p-8 space-y-6 overflow-y-auto">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-amber-500/20 pb-5">
          <div>
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-amber-500/15 text-amber-300 font-bold text-[10px] uppercase tracking-wider border border-amber-500/30 shadow-sm">
                <Crown className="w-3.5 h-3.5 text-amber-400" />
                Hostel Facilities Board
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold font-serif text-white mt-1.5">
              Maintenance & Repair Requests
            </h1>
            <p className="text-xs text-slate-400">Track resident complaints, assign technicians, and confirm resolutions in real-time</p>
          </div>
        </div>

        {/* Board Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {(["OPEN", "IN_PROGRESS", "RESOLVED"] as const).map((colStatus) => {
            const colTickets = tickets.filter((t) => t.status === colStatus);
            return (
              <Card key={colStatus} className="border-amber-500/25 bg-[#0c0c10]">
                <CardHeader className="py-3 px-4 bg-slate-950 border-b border-amber-500/15 flex flex-row items-center justify-between">
                  <CardTitle className="text-xs font-bold tracking-wider uppercase text-amber-300">
                    {colStatus.replace("_", " ")} ({colTickets.length})
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-4 space-y-4">
                  {colTickets.length === 0 && (
                    <div className="text-center py-8 text-xs text-slate-500">
                      No tickets in {colStatus.toLowerCase()}
                    </div>
                  )}
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
                        <div className="flex gap-1.5">
                          {ticket.status === "OPEN" && (
                            <Button
                              onClick={() => handleStatus(ticket.id, "IN_PROGRESS")}
                              size="sm"
                              className="text-[10px] h-6 px-2 font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30 hover:bg-amber-500 hover:text-slate-950"
                            >
                              Start Work
                            </Button>
                          )}
                          {ticket.status !== "RESOLVED" && (
                            <Button
                              onClick={() => handleStatus(ticket.id, "RESOLVED")}
                              size="sm"
                              className="text-[10px] h-6 px-2 font-bold bg-amber-500 text-slate-950 hover:bg-amber-400"
                            >
                              Resolve
                            </Button>
                          )}
                        </div>
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
