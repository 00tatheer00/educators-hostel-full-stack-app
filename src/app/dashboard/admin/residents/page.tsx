"use client";

import React, { useState } from "react";
import { AdminSidebar } from "@/components/dashboard/AdminSidebar";
import { formatPKR } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Users, Phone, Mail, Send, Search, FileText } from "lucide-react";
import { toast } from "sonner";

interface ResidentRecord {
  id: string;
  name: string;
  cnic: string;
  room: string;
  institution: string;
  phone: string;
  guardianName: string;
  guardianPhone: string;
  paymentStatus: "PAID" | "OVERDUE" | "PARTIAL";
}

export default function AdminResidentsPage() {
  const [search, setSearch] = useState("");
  const [announcement, setAnnouncement] = useState("");

  const residents: ResidentRecord[] = [
    {
      id: "RES-101",
      name: "Fatima Khan",
      cnic: "17301-1234567-8",
      room: "Room 204 (Bed A)",
      institution: "University of Peshawar",
      phone: "+92 300 1112233",
      guardianName: "Tariq Khan",
      guardianPhone: "+92 300 4445566",
      paymentStatus: "OVERDUE",
    },
    {
      id: "RES-102",
      name: "Ayesha Malik",
      cnic: "17301-9988776-5",
      room: "Room 204 (Bed B)",
      institution: "KMU Peshawar",
      phone: "+92 301 2223344",
      guardianName: "Malik Akbar",
      guardianPhone: "+92 301 5556677",
      paymentStatus: "PAID",
    },
    {
      id: "RES-103",
      name: "Dr. Maryam Khattak",
      cnic: "17301-4433221-9",
      room: "Room 301 (Single)",
      institution: "Khyber Teaching Hospital",
      phone: "+92 333 9998877",
      guardianName: "Dr. Khattak",
      guardianPhone: "+92 333 1112233",
      paymentStatus: "PAID",
    },
  ];

  const filteredResidents = residents.filter(
    (r) =>
      r.name.toLowerCase().includes(search.toLowerCase()) ||
      r.cnic.includes(search) ||
      r.room.toLowerCase().includes(search.toLowerCase())
  );

  const handleSendAnnouncement = (e: React.FormEvent) => {
    e.preventDefault();
    if (!announcement) return;
    toast.success("Broadcast message sent to all resident SMS & email portals!");
    setAnnouncement("");
  };

  return (
    <div className="flex min-h-[calc(100vh-5rem)]">
      <AdminSidebar />

      <main className="flex-grow p-6 sm:p-10 space-y-8 overflow-y-auto">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-slate-200 dark:border-slate-800 pb-6">
          <div>
            <Badge variant="gold">Directory Portal</Badge>
            <h1 className="text-3xl font-extrabold font-serif text-slate-900 dark:text-slate-100 mt-1">
              Active Resident Directory
            </h1>
            <p className="text-xs text-slate-500">Access resident CNIC records, emergency contacts, and broadcast notices</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Main Resident Table Column */}
          <div className="lg:col-span-8 space-y-6">
            <Card className="border-slate-200 dark:border-slate-800">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="text-base font-serif">Resident Records ({filteredResidents.length})</CardTitle>
                <div className="relative w-56">
                  <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-3" />
                  <Input
                    placeholder="Search name, CNIC, room..."
                    className="pl-8 h-9 text-xs"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                  />
                </div>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full text-xs text-left">
                    <thead className="border-b border-slate-200 dark:border-slate-800 text-slate-400 uppercase tracking-wider font-semibold">
                      <tr>
                        <th className="py-3 px-4">Resident Name</th>
                        <th className="py-3 px-4">Room & Bed</th>
                        <th className="py-3 px-4">CNIC / B-Form</th>
                        <th className="py-3 px-4">Guardian Contact</th>
                        <th className="py-3 px-4">Rent Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                      {filteredResidents.map((r) => (
                        <tr key={r.id}>
                          <td className="py-3.5 px-4">
                            <span className="font-bold text-slate-900 dark:text-slate-100 block">{r.name}</span>
                            <span className="text-[10px] text-slate-400">{r.institution}</span>
                          </td>
                          <td className="py-3.5 px-4 font-medium">{r.room}</td>
                          <td className="py-3.5 px-4 font-mono">{r.cnic}</td>
                          <td className="py-3.5 px-4">
                            <span className="block">{r.guardianName}</span>
                            <span className="text-[10px] text-slate-400">{r.guardianPhone}</span>
                          </td>
                          <td className="py-3.5 px-4">
                            <Badge variant={r.paymentStatus === "PAID" ? "emerald" : "gold"}>
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
            <Card className="border-slate-200 dark:border-slate-800">
              <CardHeader>
                <CardTitle className="text-base font-serif">Broadcast Notice / Announcement</CardTitle>
                <CardDescription>Send SMS & portal alert to all active residents</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSendAnnouncement} className="space-y-4 text-xs">
                  <div className="space-y-1.5">
                    <label className="font-semibold">Notice Content</label>
                    <textarea
                      rows={4}
                      required
                      value={announcement}
                      onChange={(e) => setAnnouncement(e.target.value)}
                      placeholder="e.g. Dinner timing for Friday mess will be 8:00 PM due to maintenance..."
                      className="w-full rounded-xl border border-input bg-background p-3 text-xs focus-visible:ring-2 focus-visible:ring-emerald-700"
                    />
                  </div>
                  <Button type="submit" variant="emerald" className="w-full font-semibold">
                    <Send className="w-4 h-4 mr-1.5" />
                    Send Broadcast Notice
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
