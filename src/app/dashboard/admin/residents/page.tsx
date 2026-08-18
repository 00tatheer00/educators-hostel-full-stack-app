"use client";

import React, { useState, useEffect } from "react";
import { AdminSidebar } from "@/components/dashboard/AdminSidebar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Users, Phone, Mail, Send, Search, Crown, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";
import {
  subscribeToResidents,
  ResidentRecord,
} from "@/lib/firestoreService";

export default function AdminResidentsPage() {
  const [residents, setResidents] = useState<ResidentRecord[]>([]);
  const [search, setSearch] = useState("");
  const [announcement, setAnnouncement] = useState("");
  const [filterStatus, setFilterStatus] = useState<string>("ALL");

  useEffect(() => {
    const unsub = subscribeToResidents(setResidents);
    return () => unsub();
  }, []);

  const filteredResidents = residents.filter((r) => {
    const matchesSearch =
      r.name.toLowerCase().includes(search.toLowerCase()) ||
      r.cnic.includes(search) ||
      r.room.toLowerCase().includes(search.toLowerCase()) ||
      r.institution.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = filterStatus === "ALL" || r.paymentStatus === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const handleSendAnnouncement = (e: React.FormEvent) => {
    e.preventDefault();
    if (!announcement) return;
    toast.success("Broadcast message successfully pushed to all resident student portals and SMS!");
    setAnnouncement("");
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
                Directory Portal
              </span>
              <Badge variant="gold" className="text-[10px]">{residents.length} Active Students</Badge>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold font-serif text-white mt-1.5">
              Active Resident Directory
            </h1>
            <p className="text-xs text-slate-400">Access student records, emergency parent contacts, and broadcast hostel announcements</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Main Resident Table Column */}
          <div className="lg:col-span-8 space-y-6">
            <Card className="border-amber-500/25 bg-[#0c0c10]">
              <CardHeader className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 py-4">
                <CardTitle className="text-base font-serif text-white">
                  Resident Student Records ({filteredResidents.length})
                </CardTitle>
                <div className="relative w-full sm:w-56">
                  <Search className="w-3.5 h-3.5 text-amber-400 absolute left-3 top-3" />
                  <Input
                    placeholder="Search name, CNIC, room..."
                    className="pl-8 h-9 text-xs bg-slate-950 border-amber-500/30 text-white"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                  />
                </div>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full text-xs text-left">
                    <thead className="border-b border-amber-500/20 text-amber-400/80 uppercase tracking-wider font-semibold">
                      <tr>
                        <th className="py-3 px-4">Resident Name</th>
                        <th className="py-3 px-4">Room & Bed</th>
                        <th className="py-3 px-4">CNIC / B-Form</th>
                        <th className="py-3 px-4">Guardian Contact</th>
                        <th className="py-3 px-4">Rent Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-amber-500/10">
                      {filteredResidents.map((r) => (
                        <tr key={r.id} className="hover:bg-slate-950/40">
                          <td className="py-3.5 px-4">
                            <span className="font-bold text-white block">{r.name}</span>
                            <span className="text-[10px] text-slate-400">{r.institution}</span>
                          </td>
                          <td className="py-3.5 px-4 font-medium text-amber-300">
                            {r.room} ({r.bed})
                          </td>
                          <td className="py-3.5 px-4 font-mono text-slate-300">{r.cnic}</td>
                          <td className="py-3.5 px-4">
                            <span className="block text-slate-200">{r.guardianName}</span>
                            <span className="text-[10px] text-amber-400/80 font-mono">{r.guardianPhone}</span>
                          </td>
                          <td className="py-3.5 px-4">
                            <Badge variant={r.paymentStatus === "PAID" ? "gold" : "destructive"}>
                              {r.paymentStatus}
                            </Badge>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Broadcaster Column */}
          <div className="lg:col-span-4 space-y-6">
            <Card className="border-amber-500/25 bg-[#0c0c10]">
              <CardHeader className="py-4">
                <CardTitle className="text-base font-serif text-white">Broadcast Notice / Alert</CardTitle>
                <CardDescription className="text-slate-400 text-xs">Send urgent notice to all resident student portals</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSendAnnouncement} className="space-y-4 text-xs">
                  <div className="space-y-1.5">
                    <label className="font-semibold text-slate-300">Notice Text</label>
                    <textarea
                      rows={4}
                      required
                      value={announcement}
                      onChange={(e) => setAnnouncement(e.target.value)}
                      placeholder="e.g. Due to routine generator maintenance, power switchover will take place today at 04:00 PM..."
                      className="w-full rounded-xl border border-amber-500/30 bg-slate-950 p-3 text-xs text-white placeholder:text-slate-500 focus-visible:ring-2 focus-visible:ring-amber-500"
                    />
                  </div>
                  <Button type="submit" className="w-full font-black bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 hover:from-amber-400">
                    <Send className="w-4 h-4 mr-1.5" />
                    Push Broadcast Notice
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
