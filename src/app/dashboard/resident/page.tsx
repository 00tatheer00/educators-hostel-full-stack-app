import { ResidentSidebar } from "@/components/dashboard/ResidentSidebar";
import { Bed, CreditCard, ShieldCheck, Wrench, CheckCircle2, Phone, Calendar } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { formatPKR } from "@/lib/utils";
import Link from "next/link";

export default function ResidentOverviewPage() {
  return (
    <div className="flex min-h-[calc(100vh-5rem)]">
      <ResidentSidebar />

      <main className="flex-grow p-6 sm:p-10 space-y-8 overflow-y-auto">
        {/* Welcome Banner */}
        <div className="rounded-3xl bg-gradient-to-r from-emerald-900 to-slate-900 text-white p-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 shadow-xl">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Badge variant="gold">Resident Portal</Badge>
              <span className="text-xs text-emerald-300">Room #204 - Deluxe Double</span>
            </div>
            <h1 className="text-3xl font-bold font-serif">Welcome back, Fatima Khan!</h1>
            <p className="text-xs text-slate-300">
              Educator Girls Hostel • Main University Road, Peshawar
            </p>
          </div>
          <div className="flex gap-3">
            <Link href="/dashboard/resident/payments">
              <Button variant="gold" size="sm" className="font-semibold text-xs">Pay Monthly Rent</Button>
            </Link>
            <Link href="/dashboard/resident/gate-pass">
              <Button variant="outline" size="sm" className="border-white/30 text-white hover:bg-white/10 text-xs">Request Gate Pass</Button>
            </Link>
          </div>
        </div>

        {/* Dashboard Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Card 1: My Room Info */}
          <Card className="border-slate-200 dark:border-slate-800">
            <CardHeader>
              <CardTitle className="text-base flex items-center justify-between">
                <span>My Room Specifications</span>
                <Bed className="w-5 h-5 text-emerald-600" />
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-xs text-slate-600 dark:text-slate-300">
              <div className="flex justify-between py-1.5 border-b border-slate-100 dark:border-slate-800">
                <span className="font-semibold text-slate-900 dark:text-white">Assigned Bed:</span>
                <span>Room 204 (Bed A)</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-slate-100 dark:border-slate-800">
                <span className="font-semibold text-slate-900 dark:text-white">Roommate:</span>
                <span>Ayesha Malik (KMU MBBS)</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-slate-100 dark:border-slate-800">
                <span className="font-semibold text-slate-900 dark:text-white">Monthly Rent:</span>
                <span className="font-bold text-emerald-700">{formatPKR(18000)} / mo</span>
              </div>
              <div className="flex justify-between py-1.5">
                <span className="font-semibold text-slate-900 dark:text-white">Check-in Date:</span>
                <span>Sep 01, 2025</span>
              </div>
            </CardContent>
          </Card>

          {/* Card 2: Rent Status */}
          <Card className="border-slate-200 dark:border-slate-800">
            <CardHeader>
              <CardTitle className="text-base flex items-center justify-between">
                <span>Rent & Payment Status</span>
                <CreditCard className="w-5 h-5 text-amber-500" />
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-xs">
              <div className="p-4 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-900 space-y-2">
                <div className="flex justify-between items-center">
                  <span className="font-semibold text-amber-900 dark:text-amber-200">August 2026 Invoice</span>
                  <Badge variant="gold">Unpaid</Badge>
                </div>
                <div className="text-2xl font-extrabold text-amber-950 dark:text-amber-100">
                  {formatPKR(18000)}
                </div>
                <p className="text-[11px] text-amber-800 dark:text-amber-300">Due by August 25, 2026</p>
              </div>
              <Link href="/dashboard/resident/payments" className="block">
                <Button variant="emerald" className="w-full font-semibold text-xs">
                  Pay Rent Online
                </Button>
              </Link>
            </CardContent>
          </Card>

          {/* Card 3: Gate Pass Status */}
          <Card className="border-slate-200 dark:border-slate-800">
            <CardHeader>
              <CardTitle className="text-base flex items-center justify-between">
                <span>Active Gate Pass</span>
                <ShieldCheck className="w-5 h-5 text-blue-500" />
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-xs">
              <div className="p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-900 space-y-1.5">
                <div className="flex justify-between items-center">
                  <span className="font-bold text-emerald-900 dark:text-emerald-200">Day Out Pass</span>
                  <Badge variant="emerald">Approved</Badge>
                </div>
                <p className="text-slate-600 dark:text-slate-300">Expected Return: Today, 07:30 PM</p>
              </div>
              <Link href="/dashboard/resident/gate-pass" className="block">
                <Button variant="outline" className="w-full font-semibold text-xs">
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
