import { ResidentSidebar } from "@/components/dashboard/ResidentSidebar";
import { Bed, CreditCard, ShieldCheck, Wrench, CheckCircle2, Phone, Calendar, Crown } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { formatPKR } from "@/lib/utils";
import Link from "next/link";

export default function ResidentOverviewPage() {
  return (
    <div className="flex min-h-[calc(100vh-5rem)] bg-[#070709] text-slate-100">
      <ResidentSidebar />

      <main className="flex-grow p-6 sm:p-10 space-y-8 overflow-y-auto">
        {/* Welcome Banner */}
        <div className="rounded-3xl bg-gradient-to-r from-[#14141a] via-[#1a1710] to-[#0c0c10] border border-amber-500/30 text-white p-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 shadow-2xl">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-300 text-[10px] font-bold uppercase tracking-wider">
                <Crown className="w-3.5 h-3.5 text-amber-400" />
                Resident Portal
              </span>
              <span className="text-xs text-amber-300 font-semibold">Room #204 - Deluxe Double</span>
            </div>
            <h1 className="text-3xl font-bold font-serif text-white">Welcome back, Fatima Khan!</h1>
            <p className="text-xs text-slate-400">
              Educator Girls Hostel • Main University Road, Peshawar
            </p>
          </div>
          <div className="flex gap-3">
            <Link href="/dashboard/resident/payments">
              <Button size="sm" className="font-black text-xs bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 hover:from-amber-400">Pay Monthly Rent</Button>
            </Link>
            <Link href="/dashboard/resident/gate-pass">
              <Button variant="outline" size="sm" className="border-amber-500/30 text-amber-300 hover:bg-amber-500/10 text-xs">Request Gate Pass</Button>
            </Link>
          </div>
        </div>

        {/* Dashboard Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Card 1: My Room Info */}
          <Card className="border-amber-500/25 bg-[#0c0c10]">
            <CardHeader>
              <CardTitle className="text-base flex items-center justify-between text-white font-serif">
                <span>My Room Specifications</span>
                <Bed className="w-5 h-5 text-amber-400" />
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-xs text-slate-300">
              <div className="flex justify-between py-1.5 border-b border-amber-500/15">
                <span className="font-semibold text-white">Assigned Bed:</span>
                <span className="text-amber-300">Room 204 (Bed A)</span>
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
                <span className="font-semibold text-white">Check-in Date:</span>
                <span>Sep 01, 2025</span>
              </div>
            </CardContent>
          </Card>

          {/* Card 2: Rent Status */}
          <Card className="border-amber-500/25 bg-[#0c0c10]">
            <CardHeader>
              <CardTitle className="text-base flex items-center justify-between text-white font-serif">
                <span>Rent & Payment Status</span>
                <CreditCard className="w-5 h-5 text-amber-400" />
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-xs">
              <div className="p-4 rounded-xl bg-slate-950 border border-amber-500/20 space-y-2">
                <div className="flex justify-between items-center">
                  <span className="font-semibold text-slate-300">August 2026 Invoice</span>
                  <Badge variant="destructive">Unpaid</Badge>
                </div>
                <div className="text-2xl font-black text-amber-400 font-mono">
                  {formatPKR(18000)}
                </div>
                <p className="text-[11px] text-amber-300/80">Due by August 25, 2026</p>
              </div>
              <Link href="/dashboard/resident/payments" className="block">
                <Button className="w-full font-black text-xs bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 hover:from-amber-400">
                  Pay Rent Online
                </Button>
              </Link>
            </CardContent>
          </Card>

          {/* Card 3: Gate Pass Status */}
          <Card className="border-amber-500/25 bg-[#0c0c10]">
            <CardHeader>
              <CardTitle className="text-base flex items-center justify-between text-white font-serif">
                <span>Active Gate Pass</span>
                <ShieldCheck className="w-5 h-5 text-amber-400" />
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-xs">
              <div className="p-4 rounded-xl bg-slate-950 border border-amber-500/20 space-y-1.5">
                <div className="flex justify-between items-center">
                  <span className="font-bold text-white">Day Out Pass</span>
                  <Badge variant="gold">Approved</Badge>
                </div>
                <p className="text-slate-300">Expected Return: Today, 07:30 PM</p>
              </div>
              <Link href="/dashboard/resident/gate-pass" className="block">
                <Button variant="outline" className="w-full font-bold text-xs border-amber-500/30 text-amber-300 hover:bg-amber-500/10">
                  + Apply for New Gate Pass
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
