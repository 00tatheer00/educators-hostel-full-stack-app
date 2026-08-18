"use client";

import React, { useState, useEffect } from "react";
import { ResidentSidebar } from "@/components/dashboard/ResidentSidebar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ShieldCheck, Plus, CheckCircle2, Clock, Crown, ArrowRight } from "lucide-react";
import { toast } from "sonner";
import {
  subscribeToGatePasses,
  createGatePass,
  GatePassRecord,
} from "@/lib/firestoreService";

export default function ResidentGatePassPage() {
  const [passes, setPasses] = useState<GatePassRecord[]>([]);

  const [passType, setPassType] = useState<"DAY_OUT" | "NIGHT_STAY" | "VACATION">("DAY_OUT");
  const [destination, setDestination] = useState("");
  const [departureTime, setDepartureTime] = useState("");
  const [expectedReturn, setExpectedReturn] = useState("");
  const [guardianPhone, setGuardianPhone] = useState("+92 300 4445566");
  const [reason, setReason] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const unsub = subscribeToGatePasses(setPasses);
    return () => unsub();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!destination || !departureTime || !expectedReturn) return;
    setIsSubmitting(true);

    await createGatePass({
      residentName: "Fatima Khan",
      room: "Room 204",
      type: passType,
      destination,
      departure: departureTime,
      expectedReturn,
      guardianPhone,
      reason,
      status: "PENDING",
    });

    setIsSubmitting(false);
    setDestination("");
    setDepartureTime("");
    setExpectedReturn("");
    setReason("");
    toast.success("Gate pass application submitted in real-time! Warden alerted.");
  };

  return (
    <div className="flex min-h-[calc(100vh-5rem)] bg-[#070709] text-slate-100">
      <ResidentSidebar />

      <main className="flex-grow p-4 sm:p-8 space-y-6 overflow-y-auto">
        <div className="border-b border-amber-500/20 pb-5">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-amber-500/15 text-amber-300 font-bold text-[10px] uppercase tracking-wider border border-amber-500/30 shadow-sm">
              <Crown className="w-3.5 h-3.5 text-amber-400" />
              Security System
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold font-serif text-white mt-1.5">
            Digital Gate Pass & Leave Request
          </h1>
          <p className="text-xs text-slate-400">Apply for day out, night stay, or vacation leave. Real-time Warden sign-off tracking.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Apply Form */}
          <div className="lg:col-span-5">
            <Card className="border-amber-500/25 shadow-xl bg-[#0c0c10]">
              <CardHeader className="py-4">
                <CardTitle className="text-base font-serif text-white">Apply for Gate Pass</CardTitle>
                <CardDescription className="text-slate-400 text-xs">Guardian phone will receive an automated SMS notification</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                  <div className="space-y-1.5">
                    <label className="font-semibold text-slate-300">Pass Category</label>
                    <select
                      value={passType}
                      onChange={(e) => setPassType(e.target.value as any)}
                      className="w-full h-10 rounded-xl border border-amber-500/30 bg-slate-950 px-3 text-xs text-white"
                    >
                      <option value="DAY_OUT">Day Out (Return by 08:00 PM)</option>
                      <option value="NIGHT_STAY">Night Stay (Overnight Leave)</option>
                      <option value="VACATION">Vacation / Semester Break</option>
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label className="font-semibold text-slate-300">Destination *</label>
                    <Input
                      required
                      placeholder="e.g. Family Home / University Library"
                      value={destination}
                      onChange={(e) => setDestination(e.target.value)}
                      className="bg-slate-950 border-amber-500/30 text-white"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1.5">
                      <label className="font-semibold text-slate-300">Departure Time *</label>
                      <Input
                        required
                        placeholder="e.g. Today, 03:00 PM"
                        value={departureTime}
                        onChange={(e) => setDepartureTime(e.target.value)}
                        className="bg-slate-950 border-amber-500/30 text-white"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="font-semibold text-slate-300">Expected Return *</label>
                      <Input
                        required
                        placeholder="e.g. Today, 07:30 PM"
                        value={expectedReturn}
                        onChange={(e) => setExpectedReturn(e.target.value)}
                        className="bg-slate-950 border-amber-500/30 text-white"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="font-semibold text-slate-300">Reason / Details</label>
                    <Input
                      placeholder="e.g. Group study session at medical college"
                      value={reason}
                      onChange={(e) => setReason(e.target.value)}
                      className="bg-slate-950 border-amber-500/30 text-white"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="font-semibold text-slate-300">Guardian Phone *</label>
                    <Input
                      required
                      value={guardianPhone}
                      onChange={(e) => setGuardianPhone(e.target.value)}
                      className="bg-slate-950 border-amber-500/30 text-white font-mono"
                    />
                  </div>

                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full font-black h-11 bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 hover:from-amber-400"
                  >
                    <ShieldCheck className="w-4 h-4 mr-1.5" />
                    {isSubmitting ? "Submitting..." : "Submit Gate Pass Request"}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Pass Status History */}
          <div className="lg:col-span-7 space-y-4">
            <Card className="border-amber-500/25 bg-[#0c0c10]">
              <CardHeader className="py-4">
                <CardTitle className="text-base font-serif text-white">
                  My Gate Pass History ({passes.length})
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {passes.map((p) => (
                  <div key={p.id} className="p-4 rounded-xl border border-amber-500/20 bg-slate-950 space-y-2 text-xs">
                    <div className="flex justify-between items-center">
                      <div>
                        <Badge variant="outline">{p.type.replace("_", " ")}</Badge>
                        <h4 className="font-bold text-sm text-white mt-1">{p.destination}</h4>
                      </div>
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
                    </div>
                    <div className="text-slate-300">
                      <span className="block">Departure: {p.departure}</span>
                      <span className="block">Expected Return: {p.expectedReturn}</span>
                    </div>
                    {p.reason && <p className="text-slate-400 italic">Reason: {p.reason}</p>}
                    <span className="text-[10px] text-amber-400/80 block pt-1 font-mono">
                      Guardian Verified: {p.guardianPhone}
                    </span>
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
