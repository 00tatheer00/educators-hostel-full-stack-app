"use client";

import React from "react";
import { AdminSidebar } from "@/components/dashboard/AdminSidebar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { UserCog, Shield, Lock, Plus, Crown } from "lucide-react";

export default function AdminUsersPage() {
  const staff = [
    { name: "Mrs. Shagufta Parveen", role: "Chief Executive Warden", email: "warden@educatorhostel.pk", access: "Full Control" },
    { name: "Tehmina Khattak", role: "Receptionist & Front Desk", email: "reception@educatorhostel.pk", access: "Bookings & Check-in" },
    { name: "Chef Nusrat Begum", role: "Mess Operations Head", email: "kitchen@educatorhostel.pk", access: "Mess & Kitchen" },
    { name: "Gul Pari", role: "Head Housekeeper", email: "housekeeping@educatorhostel.pk", access: "Maintenance Tickets" },
  ];

  return (
    <div className="flex min-h-[calc(100vh-5rem)] bg-[#070709] text-slate-100">
      <AdminSidebar />

      <main className="flex-grow p-6 sm:p-10 space-y-8 overflow-y-auto">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-amber-500/20 pb-6">
          <div>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/15 text-amber-300 font-bold text-xs uppercase tracking-wider border border-amber-500/30">
              <Crown className="w-3.5 h-3.5 text-amber-400" />
              Staff Management
            </span>
            <h1 className="text-3xl font-extrabold font-serif text-white mt-2">
              Admin & Staff Role Permissions
            </h1>
            <p className="text-xs text-slate-400">Manage female staff accounts, warden access levels, and security credentials</p>
          </div>
          <Button size="sm" className="text-xs font-black bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 hover:from-amber-400">
            <Plus className="w-4 h-4 mr-1.5" />
            + Add Staff Member
          </Button>
        </div>

        <Card className="border-amber-500/25 bg-[#0c0c10]">
          <CardHeader>
            <CardTitle className="text-base font-serif text-white">Staff Directory & Role Assignments</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left">
                <thead className="border-b border-amber-500/20 text-amber-400/80 uppercase tracking-wider font-semibold">
                  <tr>
                    <th className="py-3 px-4">Staff Member</th>
                    <th className="py-3 px-4">Assigned Role</th>
                    <th className="py-3 px-4">Portal Email</th>
                    <th className="py-3 px-4">Access Scope</th>
                    <th className="py-3 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-amber-500/10">
                  {staff.map((s, i) => (
                    <tr key={i} className="hover:bg-slate-950/40">
                      <td className="py-3.5 px-4 font-bold text-white">{s.name}</td>
                      <td className="py-3.5 px-4"><Badge variant="gold">{s.role}</Badge></td>
                      <td className="py-3.5 px-4 font-mono text-amber-300">{s.email}</td>
                      <td className="py-3.5 px-4"><Badge variant="outline">{s.access}</Badge></td>
                      <td className="py-3.5 px-4 text-right">
                        <Button variant="outline" size="sm" className="text-[10px] border-amber-500/30 text-amber-300">Edit Scope</Button>
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
