import { AdminSidebar } from "@/components/dashboard/AdminSidebar";
import { RevenueChart } from "@/components/dashboard/RevenueChart";
import { OccupancyChart } from "@/components/dashboard/OccupancyChart";
import { Bed, Users, CreditCard, ShieldCheck, AlertCircle, TrendingUp, CheckCircle2, Crown } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { formatPKR } from "@/lib/utils";

export default function AdminOverviewPage() {
  return (
    <div className="flex min-h-[calc(100vh-5rem)] bg-[#070709] text-slate-100">
      <AdminSidebar />

      <main className="flex-grow p-6 sm:p-10 space-y-8 overflow-y-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-amber-500/20 pb-6">
          <div>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/15 text-amber-300 font-bold text-xs uppercase tracking-wider border border-amber-500/30">
              <Crown className="w-3.5 h-3.5 text-amber-400" />
              Admin Control Center
            </span>
            <h1 className="text-3xl font-extrabold font-serif text-white mt-2">
              Hostel Overview & Metrics
            </h1>
            <p className="text-xs text-slate-400">Educator Girls Hostel • Peshawar Main Campus</p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" size="sm" className="text-xs border-amber-500/30 text-amber-300">
              Download Report
            </Button>
            <Button size="sm" className="text-xs font-black bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 hover:from-amber-400 hover:to-amber-300 shadow-md">
              + Add New Resident
            </Button>
          </div>
        </div>

        {/* Metrics Bar */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="border-amber-500/25 bg-[#0c0c10]">
            <CardContent className="p-6 space-y-2">
              <div className="flex justify-between items-center text-xs font-semibold text-slate-400">
                <span>Total Occupancy</span>
                <Bed className="w-5 h-5 text-amber-400" />
              </div>
              <div className="text-2xl font-black text-white font-mono">92%</div>
              <p className="text-[11px] text-amber-400 font-medium">84 of 90 Beds Occupied</p>
            </CardContent>
          </Card>

          <Card className="border-amber-500/25 bg-[#0c0c10]">
            <CardContent className="p-6 space-y-2">
              <div className="flex justify-between items-center text-xs font-semibold text-slate-400">
                <span>Monthly Rent Collection</span>
                <CreditCard className="w-5 h-5 text-amber-400" />
              </div>
              <div className="text-2xl font-black text-amber-400 font-mono">{formatPKR(1512000)}</div>
              <p className="text-[11px] text-amber-300 font-medium">+8.5% from last month</p>
            </CardContent>
          </Card>

          <Card className="border-amber-500/25 bg-[#0c0c10]">
            <CardContent className="p-6 space-y-2">
              <div className="flex justify-between items-center text-xs font-semibold text-slate-400">
                <span>Pending Gate Passes</span>
                <ShieldCheck className="w-5 h-5 text-amber-400" />
              </div>
              <div className="text-2xl font-black text-white font-mono">6 Passes</div>
              <p className="text-[11px] text-amber-400/90 font-medium">Requires Warden Sign-off</p>
            </CardContent>
          </Card>

          <Card className="border-amber-500/25 bg-[#0c0c10]">
            <CardContent className="p-6 space-y-2">
              <div className="flex justify-between items-center text-xs font-semibold text-slate-400">
                <span>Open Maintenance</span>
                <AlertCircle className="w-5 h-5 text-amber-400" />
              </div>
              <div className="text-2xl font-black text-white font-mono">3 Tickets</div>
              <p className="text-[11px] text-amber-400/90 font-medium">1 Urgent AC Servicing</p>
            </CardContent>
          </Card>
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <Card className="lg:col-span-8 border-amber-500/25 bg-[#0c0c10]">
            <CardHeader>
              <CardTitle className="text-base font-serif text-white">Revenue Collection Trends (PKR)</CardTitle>
              <CardDescription className="text-slate-400">Monthly rent & security deposit income over 2026</CardDescription>
            </CardHeader>
            <CardContent>
              <RevenueChart />
            </CardContent>
          </Card>

          <Card className="lg:col-span-4 border-amber-500/25 bg-[#0c0c10]">
            <CardHeader>
              <CardTitle className="text-base font-serif text-white">Room Type Distribution</CardTitle>
              <CardDescription className="text-slate-400">Occupancy proportion by room category</CardDescription>
            </CardHeader>
            <CardContent>
              <OccupancyChart />
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
