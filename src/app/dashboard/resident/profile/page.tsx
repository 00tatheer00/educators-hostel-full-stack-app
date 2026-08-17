"use client";

import React, { useState } from "react";
import { ResidentSidebar } from "@/components/dashboard/ResidentSidebar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { User, ShieldCheck, Save, Upload } from "lucide-react";
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
    <div className="flex min-h-[calc(100vh-5rem)]">
      <ResidentSidebar />

      <main className="flex-grow p-6 sm:p-10 space-y-8 overflow-y-auto">
        <div className="border-b border-slate-200 dark:border-slate-800 pb-6">
          <Badge variant="emerald">My Account</Badge>
          <h1 className="text-3xl font-extrabold font-serif text-slate-900 dark:text-slate-100 mt-1">
            Resident Profile & CNIC Records
          </h1>
          <p className="text-xs text-slate-500">Manage emergency contacts, university details, and identity documents</p>
        </div>

        <Card className="border-slate-200 dark:border-slate-800 max-w-3xl shadow-xl">
          <CardHeader>
            <CardTitle className="text-lg font-serif">Personal Information & Contacts</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSave} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="font-semibold">Full Name</label>
                  <Input
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="font-semibold">CNIC / B-Form Number</label>
                  <Input
                    value={formData.cnicNumber}
                    onChange={(e) => setFormData({ ...formData, cnicNumber: e.target.value })}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="font-semibold">Email Address</label>
                  <Input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="font-semibold">Resident Phone</label>
                  <Input
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="font-semibold">University / Institution</label>
                <Input
                  value={formData.institution}
                  onChange={(e) => setFormData({ ...formData, institution: e.target.value })}
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-slate-100 dark:border-slate-800">
                <div className="space-y-1.5">
                  <label className="font-semibold">Father / Guardian Name</label>
                  <Input
                    value={formData.guardianName}
                    onChange={(e) => setFormData({ ...formData, guardianName: e.target.value })}
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="font-semibold">Guardian Emergency Phone</label>
                  <Input
                    value={formData.guardianPhone}
                    onChange={(e) => setFormData({ ...formData, guardianPhone: e.target.value })}
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="font-semibold">Permanent Home Address</label>
                <Input
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                />
              </div>

              <Button type="submit" variant="emerald" className="font-semibold h-11 px-8">
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
