"use client";

import React, { useState } from "react";
import { ResidentSidebar } from "@/components/dashboard/ResidentSidebar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ShieldCheck, Plus, CheckCircle2, Clock } from "lucide-react";
import { toast } from "sonner";

interface ResidentGatePass {
  id: string;
  passType: "DAY_OUT" | "NIGHT_STAY" | "VACATION";
  destination: string;
  departureTime: string;
  expectedReturn: string;
  guardianPhone: string;
  status: "PENDING" | "APPROVED" | "REJECTED";
}

export default function ResidentGatePassPage() {
  const [passes, setPasses] = useState<ResidentGatePass[]>([
    {
      id: "GP-401",
      passType: "DAY_OUT",
      destination: "Peshawar Mall & Library",
      departureTime: "Today, 02:00 PM",
      expectedReturn: "Today, 07:30 PM",
      guardianPhone: "+92 300 4445566",
      status: "APPROVED",
    },
  ]);

  const [passType, setPassType] = useState<"DAY_OUT" | "NIGHT_STAY" | "VACATION">("DAY_OUT");
  const [destination, setDestination] = useState("");
  const [departureTime, setDepartureTime] = useState("");
  const [expectedReturn, setExpectedReturn] = useState("");
  const [guardianPhone, setGuardianPhone] = useState("+92 300 4445566");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!destination || !departureTime || !expectedReturn) return;

    const newPass: ResidentGatePass = {
      id: `GP-${Math.floor(400 + Math.random() * 500)}`,
      passType,
      destination,
      departureTime,
      expectedReturn,
      guardianPhone,
      status: "PENDING",
    };

    setPasses([newPass, ...passes]);
    setDestination("");
    toast.success("Gate pass application submitted! Female Warden notified for approval.");
  };

  return (
    <div className="flex min-h-[calc(100vh-5rem)]">
      <ResidentSidebar />

      <main className="flex-grow p-6 sm:p-10 space-y-8 overflow-y-auto">
        <div className="border-b border-slate-200 dark:border-slate-800 pb-6">
          <Badge variant="emerald">Security System</Badge>
          <h1 className="text-3xl font-extrabold font-serif text-slate-900 dark:text-slate-100 mt-1">
            Digital Gate Pass & Leave Request
          </h1>
          <p className="text-xs text-slate-500">Apply for day out, night stay, or vacation leave. Warden approval required.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Apply Form */}
          <div className="lg:col-span-5">
            <Card className="border-slate-200 dark:border-slate-800 shadow-xl">
              <CardHeader>
                <CardTitle className="text-lg font-serif">Apply for Gate Pass</CardTitle>
                <CardDescription>Guardian phone will receive an automated SMS alert</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                  <div className="space-y-1.5">
                    <label className="font-semibold">Pass Category</label>
                    <select
                      value={passType}
                      onChange={(e) => setPassType(e.target.value as any)}
                      className="w-full h-11 rounded-xl border border-input bg-background px-3 text-xs"
                    >
                      <option value="DAY_OUT">Day Out (Return by 08:00 PM)</option>
                      <option value="NIGHT_STAY">Night Stay (Overnight Leave)</option>
                      <option value="VACATION">Vacation / Semester Break</option>
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label className="font-semibold">Destination / Purpose *</label>
                    <Input
                      required
                      placeholder="e.g. Islamabad Family Home / University Library"
                      value={destination}
                      onChange={(e) => setDestination(e.target.value)}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1.5">
                      <label className="font-semibold">Departure Date/Time *</label>
                      <Input
                        required
                        placeholder="e.g. Aug 18, 02:00 PM"
                        value={departureTime}
                        onChange={(e) => setDepartureTime(e.target.value)}
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="font-semibold">Expected Return *</label>
                      <Input
                        required
                        placeholder="e.g. Aug 18, 07:30 PM"
                        value={expectedReturn}
                        onChange={(e) => setExpectedReturn(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="font-semibold">Guardian Phone Number *</label>
                    <Input
                      required
                      value={guardianPhone}
                      onChange={(e) => setGuardianPhone(e.target.value)}
                    />
                  </div>

                  <Button type="submit" variant="emerald" className="w-full font-semibold h-11">
                    <ShieldCheck className="w-4 h-4 mr-1.5" />
                    Submit Gate Pass Request
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Pass Status History */}
          <div className="lg:col-span-7 space-y-4">
            <Card className="border-slate-200 dark:border-slate-800">
              <CardHeader>
                <CardTitle className="text-base font-serif">Gate Pass Applications History</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {passes.map((p) => (
                  <div key={p.id} className="p-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 space-y-2 text-xs">
                    <div className="flex justify-between items-center">
                      <div>
                        <Badge variant="outline">{p.passType}</Badge>
                        <h4 className="font-bold text-sm text-slate-900 dark:text-slate-100 mt-1">{p.destination}</h4>
                      </div>
                      <Badge variant={p.status === "APPROVED" ? "emerald" : "gold"}>
                        {p.status}
                      </Badge>
                    </div>
                    <div className="text-slate-600 dark:text-slate-300">
                      <span className="block">Departure: {p.departureTime}</span>
                      <span className="block">Return: {p.expectedReturn}</span>
                    </div>
                    <span className="text-[10px] text-slate-400 block pt-1">Guardian Contact: {p.guardianPhone}</span>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
