"use client";

import React, { useState } from "react";
import { ResidentSidebar } from "@/components/dashboard/ResidentSidebar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { User, ShieldCheck, Save, Upload, Crown } from "lucide-react";
import { toast } from "sonner";

export default function ResidentProfilePage() {
  const [formData, setFormData] = useState({
    fullName: "Fatima Khan",
    email: "fatima@example.com",
    phone: "+92 300 1112233",
    cnicNumber: "17301-1234567-8",
    institution: "University of Peshawar",
    guardianName: "Tariq Khan",
    guardianPhone: "+92 300 4445566",
    address: "House 45, Sector F-3, Phase 6, Hayatabad, Peshawar",
  });

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Resident profile updated successfully!");
  };

  return (
    <div className="flex min-h-[calc(100vh-5rem)] bg-[#070709] text-slate-100">
      <ResidentSidebar />

      <main className="flex-grow p-6 sm:p-10 space-y-8 overflow-y-auto">
        <div className="border-b border-amber-500/20 pb-6">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/15 text-amber-300 font-bold text-xs uppercase tracking-wider border border-amber-500/30">
            <Crown className="w-3.5 h-3.5 text-amber-400" />
            My Account
          </span>
          <h1 className="text-3xl font-extrabold font-serif text-white mt-2">
            Resident Profile & CNIC Records
          </h1>
          <p className="text-xs text-slate-400">Manage emergency contacts, university details, and identity documents</p>
        </div>

        <Card className="border-amber-500/25 bg-[#0c0c10] max-w-3xl shadow-2xl">
          <CardHeader>
            <CardTitle className="text-lg font-serif text-white">Personal Information & Contacts</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSave} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="font-semibold text-slate-300">Full Name</label>
                  <Input
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    className="bg-slate-950 border-amber-500/30 text-white"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="font-semibold text-slate-300">CNIC / B-Form Number</label>
                  <Input
                    value={formData.cnicNumber}
                    onChange={(e) => setFormData({ ...formData, cnicNumber: e.target.value })}
                    className="bg-slate-950 border-amber-500/30 text-white font-mono"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="font-semibold text-slate-300">Email Address</label>
                  <Input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="bg-slate-950 border-amber-500/30 text-white"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="font-semibold text-slate-300">Resident Phone</label>
                  <Input
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="bg-slate-950 border-amber-500/30 text-white font-mono"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="font-semibold text-slate-300">University / Institution</label>
                <Input
                  value={formData.institution}
                  onChange={(e) => setFormData({ ...formData, institution: e.target.value })}
                  className="bg-slate-950 border-amber-500/30 text-white"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-amber-500/15">
                <div className="space-y-1.5">
                  <label className="font-semibold text-slate-300">Father / Guardian Name</label>
                  <Input
                    value={formData.guardianName}
                    onChange={(e) => setFormData({ ...formData, guardianName: e.target.value })}
                    className="bg-slate-950 border-amber-500/30 text-white"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="font-semibold text-slate-300">Guardian Emergency Phone</label>
                  <Input
                    value={formData.guardianPhone}
                    onChange={(e) => setFormData({ ...formData, guardianPhone: e.target.value })}
                    className="bg-slate-950 border-amber-500/30 text-white font-mono"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="font-semibold text-slate-300">Permanent Home Address</label>
                <Input
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  className="bg-slate-950 border-amber-500/30 text-white"
                />
              </div>

              <Button type="submit" className="font-black h-11 px-8 bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 hover:from-amber-400">
                <Save className="w-4 h-4 mr-2" />
                Save Profile Changes
              </Button>
            </form>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
