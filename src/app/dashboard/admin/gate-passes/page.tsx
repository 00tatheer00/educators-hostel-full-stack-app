"use client";

import React, { useState } from "react";
import { AdminSidebar } from "@/components/dashboard/AdminSidebar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ShieldCheck, Check, X, Clock, AlertCircle, Crown } from "lucide-react";
import { toast } from "sonner";

interface AdminGatePass {
  id: string;
  residentName: string;
  room: string;
  type: "DAY_OUT" | "NIGHT_STAY" | "VACATION";
  destination: string;
  departure: string;
  expectedReturn: string;
  guardianPhone: string;
  status: "PENDING" | "APPROVED" | "REJECTED";
}

export default function AdminGatePassesPage() {
  const [passes, setPasses] = useState<AdminGatePass[]>([
    {
      id: "GP-401",
      residentName: "Fatima Khan",
      room: "Room 204",
      type: "DAY_OUT",
      destination: "Peshawar Mall & Library",
      departure: "Today, 02:00 PM",
      expectedReturn: "Today, 07:30 PM",
      guardianPhone: "+92 300 4445566",
      status: "PENDING",
    },
    {
      id: "GP-402",
      residentName: "Ayesha Malik",
      room: "Room 204",
      type: "NIGHT_STAY",
      destination: "Islamabad (Family House)",
      departure: "Aug 18, 09:00 AM",
      expectedReturn: "Aug 20, 06:00 PM",
      guardianPhone: "+92 301 5556677",
      status: "APPROVED",
    },
    {
      id: "GP-403",
      residentName: "Laiba Gul",
      room: "Room 105",
      type: "VACATION",
      destination: "Swat (Summer Vacation)",
      departure: "Aug 22, 08:00 AM",
      expectedReturn: "Sep 01, 05:00 PM",
      guardianPhone: "+92 302 7778899",
      status: "PENDING",
    },
  ]);

  const handleApprove = (id: string) => {
    setPasses(passes.map((p) => (p.id === id ? { ...p, status: "APPROVED" } : p)));
    toast.success(`Gate pass ${id} approved by Female Warden! SMS alert sent to guardian.`);
  };

  const handleReject = (id: string) => {
    setPasses(passes.map((p) => (p.id === id ? { ...p, status: "REJECTED" } : p)));
    toast.error(`Gate pass ${id} rejected.`);
  };

  return (
    <div className="flex min-h-[calc(100vh-5rem)] bg-[#070709] text-slate-100">
      <AdminSidebar />

      <main className="flex-grow p-6 sm:p-10 space-y-8 overflow-y-auto">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-amber-500/20 pb-6">
          <div>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/15 text-amber-300 font-bold text-xs uppercase tracking-wider border border-amber-500/30">
              <Crown className="w-3.5 h-3.5 text-amber-400" />
              Warden Security Desk
            </span>
            <h1 className="text-3xl font-extrabold font-serif text-white mt-2">
              Resident Security & Gate Passes
            </h1>
            <p className="text-xs text-slate-400">Digital leave application approvals & biometric curfew tracking</p>
          </div>
        </div>

        {/* Gate Passes Table */}
        <Card className="border-amber-500/25 bg-[#0c0c10]">
          <CardHeader>
            <CardTitle className="text-base font-serif text-white">Gate Pass Applications</CardTitle>
            <CardDescription className="text-slate-400">Guardian phone verification & warden sign-off</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left">
                <thead className="border-b border-amber-500/20 text-amber-400/80 uppercase tracking-wider font-semibold">
                  <tr>
                    <th className="py-3 px-4">Pass ID</th>
                    <th className="py-3 px-4">Resident</th>
                    <th className="py-3 px-4">Type</th>
                    <th className="py-3 px-4">Destination & Reason</th>
                    <th className="py-3 px-4">Departure / Return</th>
                    <th className="py-3 px-4">Guardian Contact</th>
                    <th className="py-3 px-4">Status</th>
                    <th className="py-3 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-amber-500/10">
                  {passes.map((p) => (
                    <tr key={p.id} className="hover:bg-slate-950/40">
                      <td className="py-3.5 px-4 font-mono font-bold text-amber-400">{p.id}</td>
                      <td className="py-3.5 px-4">
                        <span className="font-bold text-white block">{p.residentName}</span>
                        <span className="text-[10px] text-slate-400">{p.room}</span>
                      </td>
                      <td className="py-3.5 px-4"><Badge variant="outline">{p.type}</Badge></td>
                      <td className="py-3.5 px-4 text-slate-300">{p.destination}</td>
                      <td className="py-3.5 px-4">
                        <span className="block text-white">Out: {p.departure}</span>
                        <span className="block text-[10px] text-slate-400">In: {p.expectedReturn}</span>
                      </td>
                      <td className="py-3.5 px-4 font-mono text-amber-300">{p.guardianPhone}</td>
                      <td className="py-3.5 px-4">
                        <Badge variant={p.status === "APPROVED" ? "gold" : p.status === "PENDING" ? "outline" : "destructive"}>
                          {p.status}
                        </Badge>
                      </td>
                      <td className="py-3.5 px-4 text-right space-x-2">
                        {p.status === "PENDING" && (
                          <>
                            <Button onClick={() => handleApprove(p.id)} size="sm" className="text-[10px] font-bold bg-amber-500 text-slate-950 hover:bg-amber-400">
                              Approve
                            </Button>
                            <Button onClick={() => handleReject(p.id)} variant="destructive" size="sm" className="text-[10px]">
                              Reject
                            </Button>
                          </>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
