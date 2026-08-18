"use client";

import React, { useState, useEffect } from "react";
import { AdminSidebar } from "@/components/dashboard/AdminSidebar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ShieldCheck, Check, X, Clock, AlertCircle, Crown, Phone, Search } from "lucide-react";
import { toast } from "sonner";
import {
  subscribeToGatePasses,
  updateGatePassStatus,
  GatePassRecord,
} from "@/lib/firestoreService";

export default function AdminGatePassesPage() {
  const [passes, setPasses] = useState<GatePassRecord[]>([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<string>("ALL");

  useEffect(() => {
    const unsub = subscribeToGatePasses(setPasses);
    return () => unsub();
  }, []);

  const handleApprove = async (id: string) => {
    await updateGatePassStatus(id, "APPROVED");
    toast.success(`Gate pass ${id} approved by Female Warden! Guardian notified.`);
  };

  const handleReject = async (id: string) => {
    await updateGatePassStatus(id, "REJECTED");
    toast.error(`Gate pass ${id} rejected.`);
  };

  const filteredPasses = passes.filter((p) => {
    const matchesSearch =
      p.residentName.toLowerCase().includes(search.toLowerCase()) ||
      p.room.toLowerCase().includes(search.toLowerCase()) ||
      p.id.toLowerCase().includes(search.toLowerCase()) ||
      p.destination.toLowerCase().includes(search.toLowerCase());
    const matchesFilter = filter === "ALL" || p.status === filter;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="flex min-h-[calc(100vh-5rem)] bg-[#070709] text-slate-100">
      <AdminSidebar />

      <main className="flex-grow p-4 sm:p-8 space-y-6 overflow-y-auto">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-amber-500/20 pb-5">
          <div>
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-amber-500/15 text-amber-300 font-bold text-[10px] uppercase tracking-wider border border-amber-500/30 shadow-sm">
                <Crown className="w-3.5 h-3.5 text-amber-400" />
                Warden Security Desk
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold font-serif text-white mt-1.5">
              Resident Security & Gate Passes
            </h1>
            <p className="text-xs text-slate-400">Digital leave application approvals & curfew tracking for female residents</p>
          </div>
        </div>

        {/* Filter Controls */}
        <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-3">
          <div className="flex gap-2">
            {["ALL", "PENDING", "APPROVED", "REJECTED"].map((st) => (
              <button
                key={st}
                onClick={() => setFilter(st)}
                className={`px-3 py-1 rounded-xl text-xs font-semibold transition-all border ${
                  filter === st
                    ? "bg-amber-500 text-slate-950 border-amber-400 font-bold shadow-md"
                    : "bg-slate-950 border-amber-500/20 text-slate-400 hover:text-white"
                }`}
              >
                {st}
              </button>
            ))}
          </div>
        </div>

        {/* Gate Passes Table */}
        <Card className="border-amber-500/25 bg-[#0c0c10]">
          <CardHeader className="py-4">
            <CardTitle className="text-base font-serif text-white">
              Gate Pass Applications ({filteredPasses.length} Requests)
            </CardTitle>
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
                  {filteredPasses.map((p) => (
                    <tr key={p.id} className="hover:bg-slate-950/40">
                      <td className="py-3.5 px-4 font-mono font-bold text-amber-400">{p.id}</td>
                      <td className="py-3.5 px-4">
                        <span className="font-bold text-white block">{p.residentName}</span>
                        <span className="text-[10px] text-slate-400">{p.room}</span>
                      </td>
                      <td className="py-3.5 px-4"><Badge variant="outline">{p.type}</Badge></td>
                      <td className="py-3.5 px-4 text-slate-300">
                        <span className="font-medium text-white block">{p.destination}</span>
                        {p.reason && <span className="text-[10px] text-slate-400">{p.reason}</span>}
                      </td>
                      <td className="py-3.5 px-4">
                        <span className="block text-white">Out: {p.departure}</span>
                        <span className="block text-[10px] text-slate-400">In: {p.expectedReturn}</span>
                      </td>
                      <td className="py-3.5 px-4 font-mono text-amber-300">
                        <a href={`tel:${p.guardianPhone}`} className="hover:underline flex items-center gap-1">
                          <Phone className="w-3 h-3 text-amber-400" />
                          <span>{p.guardianPhone}</span>
                        </a>
                      </td>
                      <td className="py-3.5 px-4">
                        <Badge
                          variant={
                            p.status === "APPROVED"
                              ? "gold"
                              : p.status === "PENDING"
                              ? "outline"
                              : "destructive"
                          }
                        >
                          {p.status}
                        </Badge>
                      </td>
                      <td className="py-3.5 px-4 text-right space-x-1.5">
                        {p.status === "PENDING" && (
                          <>
                            <Button
                              onClick={() => handleApprove(p.id)}
                              size="sm"
                              className="text-[10px] h-7 px-2.5 font-bold bg-amber-500 text-slate-950 hover:bg-amber-400"
                            >
                              Approve
                            </Button>
                            <Button
                              onClick={() => handleReject(p.id)}
                              variant="destructive"
                              size="sm"
                              className="text-[10px] h-7 px-2"
                            >
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
