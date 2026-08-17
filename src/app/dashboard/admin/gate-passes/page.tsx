"use client";

import React, { useState } from "react";
import { AdminSidebar } from "@/components/dashboard/AdminSidebar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ShieldCheck, Check, X, Clock, AlertCircle } from "lucide-react";
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
    <div className="flex min-h-[calc(100vh-5rem)]">
      <AdminSidebar />

      <main className="flex-grow p-6 sm:p-10 space-y-8 overflow-y-auto">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-slate-200 dark:border-slate-800 pb-6">
          <div>
            <Badge variant="gold">Warden Security Desk</Badge>
            <h1 className="text-3xl font-extrabold font-serif text-slate-900 dark:text-slate-100 mt-1">
              Resident Security & Gate Passes
            </h1>
            <p className="text-xs text-slate-500">Digital leave application approvals & biometric curfew tracking</p>
          </div>
        </div>

        {/* Gate Passes Table */}
        <Card className="border-slate-200 dark:border-slate-800">
          <CardHeader>
            <CardTitle className="text-base font-serif">Gate Pass Applications</CardTitle>
            <CardDescription>Guardian phone verification & warden sign-off</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left">
                <thead className="border-b border-slate-200 dark:border-slate-800 text-slate-400 uppercase tracking-wider font-semibold">
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
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                  {passes.map((p) => (
                    <tr key={p.id}>
                      <td className="py-3.5 px-4 font-mono font-bold text-slate-900 dark:text-slate-100">{p.id}</td>
                      <td className="py-3.5 px-4">
                        <span className="font-bold block">{p.residentName}</span>
                        <span className="text-[10px] text-slate-400">{p.room}</span>
                      </td>
                      <td className="py-3.5 px-4"><Badge variant="outline">{p.type}</Badge></td>
                      <td className="py-3.5 px-4">{p.destination}</td>
                      <td className="py-3.5 px-4">
                        <span className="block text-slate-800 dark:text-slate-200">Out: {p.departure}</span>
                        <span className="block text-[10px] text-slate-400">In: {p.expectedReturn}</span>
                      </td>
                      <td className="py-3.5 px-4 font-mono">{p.guardianPhone}</td>
                      <td className="py-3.5 px-4">
                        <Badge variant={p.status === "APPROVED" ? "emerald" : p.status === "PENDING" ? "gold" : "destructive"}>
                          {p.status}
                        </Badge>
                      </td>
                      <td className="py-3.5 px-4 text-right space-x-2">
                        {p.status === "PENDING" && (
                          <>
                            <Button onClick={() => handleApprove(p.id)} variant="emerald" size="sm" className="text-[10px]">
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
