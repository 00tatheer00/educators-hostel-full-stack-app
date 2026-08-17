import { AdminSidebar } from "@/components/dashboard/AdminSidebar";
import { RevenueChart } from "@/components/dashboard/RevenueChart";
import { OccupancyChart } from "@/components/dashboard/OccupancyChart";
import { Bed, Users, CreditCard, ShieldCheck, AlertCircle, TrendingUp, CheckCircle2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { formatPKR } from "@/lib/utils";

export default function AdminOverviewPage() {
  return (
    <div className="flex min-h-[calc(100vh-5rem)]">
      <AdminSidebar />

      <main className="flex-grow p-6 sm:p-10 space-y-8 overflow-y-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-slate-200 dark:border-slate-800 pb-6">
          <div>
            <Badge variant="gold">Admin Control Center</Badge>
            <h1 className="text-3xl font-extrabold font-serif text-slate-900 dark:text-slate-100 mt-1">
              Hostel Overview & Metrics
            </h1>
            <p className="text-xs text-slate-500">Educator Girls Hostel • Peshawar Main Campus</p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" size="sm" className="text-xs">Download Report</Button>
            <Button variant="emerald" size="sm" className="text-xs">+ Add New Resident</Button>
          </div>
        </div>

        {/* Metrics Bar */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="border-slate-200 dark:border-slate-800">
            <CardContent className="p-6 space-y-2">
              <div className="flex justify-between items-center text-xs font-semibold text-slate-500">
                <span>Total Occupancy</span>
                <Bed className="w-5 h-5 text-emerald-600" />
              </div>
              <div className="text-2xl font-extrabold text-slate-900 dark:text-slate-100">92%</div>
              <p className="text-[11px] text-emerald-700 font-medium">84 of 90 Beds Occupied</p>
            </CardContent>
          </Card>

          <Card className="border-slate-200 dark:border-slate-800">
            <CardContent className="p-6 space-y-2">
              <div className="flex justify-between items-center text-xs font-semibold text-slate-500">
                <span>Monthly Rent Collection</span>
                <CreditCard className="w-5 h-5 text-amber-500" />
              </div>
              <div className="text-2xl font-extrabold text-slate-900 dark:text-slate-100">{formatPKR(1512000)}</div>
              <p className="text-[11px] text-amber-600 font-medium">+8.5% from last month</p>
            </CardContent>
          </Card>

          <Card className="border-slate-200 dark:border-slate-800">
            <CardContent className="p-6 space-y-2">
              <div className="flex justify-between items-center text-xs font-semibold text-slate-500">
                <span>Pending Gate Passes</span>
                <ShieldCheck className="w-5 h-5 text-blue-500" />
              </div>
              <div className="text-2xl font-extrabold text-slate-900 dark:text-slate-100">6 Passes</div>
              <p className="text-[11px] text-blue-600 font-medium">Requires Warden Sign-off</p>
            </CardContent>
          </Card>

          <Card className="border-slate-200 dark:border-slate-800">
            <CardContent className="p-6 space-y-2">
              <div className="flex justify-between items-center text-xs font-semibold text-slate-500">
                <span>Open Maintenance</span>
                <AlertCircle className="w-5 h-5 text-rose-500" />
              </div>
              <div className="text-2xl font-extrabold text-slate-900 dark:text-slate-100">3 Tickets</div>
              <p className="text-[11px] text-rose-600 font-medium">1 Urgent AC Servicing</p>
            </CardContent>
          </Card>
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <Card className="lg:col-span-8 border-slate-200 dark:border-slate-800">
            <CardHeader>
              <CardTitle className="text-base font-serif">Revenue Collection Trends (PKR)</CardTitle>
              <CardDescription>Monthly rent & security deposit income over 2026</CardDescription>
            </CardHeader>
            <CardContent>
              <RevenueChart />
            </CardContent>
          </Card>

          <Card className="lg:col-span-4 border-slate-200 dark:border-slate-800">
            <CardHeader>
              <CardTitle className="text-base font-serif">Room Type Distribution</CardTitle>
              <CardDescription>Occupancy proportion by room category</CardDescription>
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
