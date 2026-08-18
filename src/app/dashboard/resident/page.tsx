"use client";

import { useEffect, useState } from "react";
import { ResidentSidebar } from "@/components/dashboard/ResidentSidebar";
import {
  Bed,
  CreditCard,
  ShieldCheck,
  Wrench,
  CheckCircle2,
  Phone,
  Calendar,
  Crown,
  UtensilsCrossed,
  Sparkles,
  ArrowRight,
  Coffee,
  Sun,
  Moon,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { formatPKR } from "@/lib/utils";
import Link from "next/link";
import {
  subscribeToGatePasses,
  subscribeToMessMenu,
  subscribeToMaintenance,
  GatePassRecord,
  MessMenuDay,
  MaintenanceRecord,
} from "@/lib/firestoreService";

export default function ResidentOverviewPage() {
  const [gatePasses, setGatePasses] = useState<GatePassRecord[]>([]);
  const [messMenu, setMessMenu] = useState<MessMenuDay[]>([]);
  const [tickets, setTickets] = useState<MaintenanceRecord[]>([]);

  useEffect(() => {
    const unsubPasses = subscribeToGatePasses(setGatePasses);
    const unsubMenu = subscribeToMessMenu(setMessMenu);
    const unsubTickets = subscribeToMaintenance(setTickets);

    return () => {
      unsubPasses();
      unsubMenu();
      unsubTickets();
    };
  }, []);

  // Today's Day Name
  const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const currentDayName = daysOfWeek[new Date().getDay()];
  const todaysMenu = messMenu.find((m) => m.day.toLowerCase() === currentDayName.toLowerCase()) || messMenu[0];

  const activePass = gatePasses.find((p) => p.residentName.toLowerCase().includes("fatima"));
  const myTickets = tickets.filter((t) => t.residentName.toLowerCase().includes("fatima"));

  return (
    <div className="flex min-h-[calc(100vh-5rem)] bg-[#070709] text-slate-100">
      <ResidentSidebar />

      <main className="flex-grow p-4 sm:p-8 space-y-6 overflow-y-auto">
        {/* Welcome Banner */}
        <div className="rounded-3xl bg-gradient-to-r from-[#14141a] via-[#1a1710] to-[#0c0c10] border border-amber-500/30 text-white p-6 sm:p-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 shadow-2xl">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-300 text-[10px] font-bold uppercase tracking-wider">
                <Crown className="w-3.5 h-3.5 text-amber-400" />
                Resident Student Portal
              </span>
              <span className="text-xs text-amber-300 font-semibold">Room #204 - Deluxe Double</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold font-serif text-white">Welcome back, Fatima Khan!</h1>
            <p className="text-xs text-slate-400">
              Educator Girls Hostel • University of Peshawar Route Campus
            </p>
          </div>
          <div className="flex flex-wrap gap-2.5">
            <Link href="/dashboard/resident/payments">
              <Button size="sm" className="font-black text-xs bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 hover:from-amber-400">
                Pay Rent Online
              </Button>
            </Link>
            <Link href="/dashboard/resident/gate-pass">
              <Button variant="outline" size="sm" className="border-amber-500/30 text-amber-300 hover:bg-amber-500/10 text-xs">
                Request Gate Pass
              </Button>
            </Link>
          </div>
        </div>

        {/* Dashboard Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1: My Room Info */}
          <Card className="border-amber-500/25 bg-[#0c0c10]">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm flex items-center justify-between text-white font-serif">
                <span>My Room Specifications</span>
                <Bed className="w-4 h-4 text-amber-400" />
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-xs text-slate-300">
              <div className="flex justify-between py-1.5 border-b border-amber-500/15">
                <span className="font-semibold text-white">Assigned Bed:</span>
                <span className="text-amber-300 font-bold">Room 204 (Bed A)</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-amber-500/15">
                <span className="font-semibold text-white">Roommate:</span>
                <span>Ayesha Malik (KMU MBBS)</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-amber-500/15">
                <span className="font-semibold text-white">Monthly Rent:</span>
                <span className="font-black text-amber-400 font-mono">{formatPKR(18000)} / mo</span>
              </div>
              <div className="flex justify-between py-1.5">
                <span className="font-semibold text-white">Security Warden:</span>
                <span className="text-emerald-400 font-medium">Mrs. Shagufta (24/7 on Duty)</span>
              </div>
            </CardContent>
          </Card>

          {/* Card 2: Rent Status */}
          <Card className="border-amber-500/25 bg-[#0c0c10]">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm flex items-center justify-between text-white font-serif">
                <span>Rent & Payment Status</span>
                <CreditCard className="w-4 h-4 text-amber-400" />
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-xs">
              <div className="p-3.5 rounded-xl bg-slate-950 border border-amber-500/20 space-y-1.5">
                <div className="flex justify-between items-center">
                  <span className="font-semibold text-slate-300">August 2026 Invoice</span>
                  <Badge variant="destructive">Unpaid</Badge>
                </div>
                <div className="text-xl font-black text-amber-400 font-mono">
                  {formatPKR(18000)}
                </div>
                <p className="text-[11px] text-amber-300/80">Due by August 25, 2026</p>
              </div>
              <Link href="/dashboard/resident/payments" className="block">
                <Button className="w-full font-black text-xs bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 hover:from-amber-400 h-9">
                  Pay Rent via JazzCash / Stripe →
                </Button>
              </Link>
            </CardContent>
          </Card>

          {/* Card 3: Gate Pass Status */}
          <Card className="border-amber-500/25 bg-[#0c0c10]">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm flex items-center justify-between text-white font-serif">
                <span>Active Gate Pass</span>
                <ShieldCheck className="w-4 h-4 text-amber-400" />
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-xs">
              {activePass ? (
                <div className="p-3.5 rounded-xl bg-slate-950 border border-amber-500/20 space-y-1.5">
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-white">{activePass.type.replace("_", " ")}</span>
                    <Badge variant={activePass.status === "APPROVED" ? "gold" : "outline"}>
                      {activePass.status}
                    </Badge>
                  </div>
                  <p className="text-slate-300 text-[11px]">To: {activePass.destination}</p>
                  <p className="text-[10px] text-slate-400">Return: {activePass.expectedReturn}</p>
                </div>
              ) : (
                <div className="text-center py-4 text-slate-500 text-xs">
                  No active gate pass currently requested.
                </div>
              )}
              <Link href="/dashboard/resident/gate-pass" className="block">
                <Button variant="outline" className="w-full font-bold text-xs border-amber-500/30 text-amber-300 hover:bg-amber-500/10 h-9">
                  + Apply for New Gate Pass
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>

        {/* Real-time Today's Mess Dining Menu */}
        {todaysMenu && (
          <Card className="border-amber-500/30 bg-gradient-to-r from-[#0c0c10] via-[#14120c] to-[#0c0c10] shadow-xl">
            <CardHeader className="py-4 border-b border-amber-500/15 flex flex-row items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-amber-500/20 flex items-center justify-center border border-amber-500/30">
                  <UtensilsCrossed className="w-4 h-4 text-amber-400" />
                </div>
                <div>
                  <CardTitle className="text-base font-serif text-white">
                    Today&apos;s Mess Menu ({todaysMenu.day} • {todaysMenu.dayUrdu})
                  </CardTitle>
                  <CardDescription className="text-slate-400 text-xs">
                    Fresh hygienic meals prepared daily by Executive Hostel Chef
                  </CardDescription>
                </div>
              </div>
              <Link href="/dashboard/resident/mess-menu">
                <Button variant="outline" size="sm" className="text-xs border-amber-500/30 text-amber-300">
                  View Full 7-Day Menu →
                </Button>
              </Link>
            </CardHeader>
            <CardContent className="p-5">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                <div className="p-3.5 rounded-2xl bg-slate-950 border border-amber-500/20 space-y-1">
                  <div className="flex items-center gap-1.5 text-amber-400 font-bold">
                    <Coffee className="w-3.5 h-3.5" />
                    <span>Breakfast (Morning)</span>
                  </div>
                  <p className="text-slate-200">{todaysMenu.breakfast}</p>
                </div>

                <div className="p-3.5 rounded-2xl bg-slate-950 border border-amber-500/20 space-y-1">
                  <div className="flex items-center gap-1.5 text-amber-400 font-bold">
                    <Sun className="w-3.5 h-3.5" />
                    <span>Lunch (Afternoon)</span>
                  </div>
                  <p className="text-slate-200">{todaysMenu.lunch}</p>
                </div>

                <div className="p-3.5 rounded-2xl bg-slate-950 border border-amber-500/20 space-y-1">
                  <div className="flex items-center gap-1.5 text-amber-400 font-bold">
                    <Moon className="w-3.5 h-3.5" />
                    <span>Dinner (Night)</span>
                  </div>
                  <p className="text-slate-200">{todaysMenu.dinner}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </main>
    </div>
  );
}
