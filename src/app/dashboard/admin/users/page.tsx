"use client";

import React from "react";
import { AdminSidebar } from "@/components/dashboard/AdminSidebar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { UserCog, Shield, Lock, Plus } from "lucide-react";

export default function AdminUsersPage() {
  const staff = [
    { name: "Mrs. Shagufta Parveen", role: "Chief Executive Warden", email: "warden@educatorhostel.pk", access: "Full Control" },
    { name: "Tehmina Khattak", role: "Receptionist & Front Desk", email: "reception@educatorhostel.pk", access: "Bookings & Check-in" },
    { name: "Chef Nusrat Begum", role: "Mess Operations Head", email: "kitchen@educatorhostel.pk", access: "Mess & Kitchen" },
    { name: "Gul Pari", role: "Head Housekeeper", email: "housekeeping@educatorhostel.pk", access: "Maintenance Tickets" },
  ];

  return (
    <div className="flex min-h-[calc(100vh-5rem)]">
      <AdminSidebar />

      <main className="flex-grow p-6 sm:p-10 space-y-8 overflow-y-auto">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-slate-200 dark:border-slate-800 pb-6">
          <div>
            <Badge variant="gold">Staff Management</Badge>
            <h1 className="text-3xl font-extrabold font-serif text-slate-900 dark:text-slate-100 mt-1">
              Admin & Staff Role Permissions
            </h1>
            <p className="text-xs text-slate-500">Manage female staff accounts, warden access levels, and security credentials</p>
          </div>
          <Button variant="emerald" size="sm" className="text-xs font-semibold">
            <Plus className="w-4 h-4 mr-1.5" />
            + Add Staff Member
          </Button>
        </div>

        <Card className="border-slate-200 dark:border-slate-800">
          <CardHeader>
            <CardTitle className="text-base font-serif">Staff Directory & Role Assignments</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left">
                <thead className="border-b border-slate-200 dark:border-slate-800 text-slate-400 uppercase tracking-wider font-semibold">
                  <tr>
                    <th className="py-3 px-4">Staff Member</th>
                    <th className="py-3 px-4">Assigned Role</th>
                    <th className="py-3 px-4">Portal Email</th>
                    <th className="py-3 px-4">Access Scope</th>
                    <th className="py-3 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                  {staff.map((s, i) => (
                    <tr key={i}>
                      <td className="py-3.5 px-4 font-bold text-slate-900 dark:text-slate-100">{s.name}</td>
                      <td className="py-3.5 px-4"><Badge variant="gold">{s.role}</Badge></td>
                      <td className="py-3.5 px-4 font-mono">{s.email}</td>
                      <td className="py-3.5 px-4"><Badge variant="outline">{s.access}</Badge></td>
                      <td className="py-3.5 px-4 text-right">
                        <Button variant="outline" size="sm" className="text-[10px]">Edit Scope</Button>
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
