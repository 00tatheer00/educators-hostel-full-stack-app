"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { AdminSidebar } from "@/components/dashboard/AdminSidebar";
import { RevenueChart } from "@/components/dashboard/RevenueChart";
import { OccupancyChart } from "@/components/dashboard/OccupancyChart";
import {
  Bed,
  Users,
  CreditCard,
  ShieldCheck,
  AlertCircle,
  TrendingUp,
  CheckCircle2,
  Crown,
  CalendarCheck,
  Plus,
  ArrowUpRight,
  Clock,
  Sparkles,
  Radio,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { formatPKR } from "@/lib/utils";
import {
  subscribeToBookings,
  subscribeToRooms,
  subscribeToGatePasses,
  subscribeToMaintenance,
  BookingRecord,
  GatePassRecord,
  MaintenanceRecord,
} from "@/lib/firestoreService";
import { RoomItem } from "@/data/roomsData";

export default function AdminOverviewPage() {
  const [bookings, setBookings] = useState<BookingRecord[]>([]);
  const [rooms, setRooms] = useState<RoomItem[]>([]);
  const [gatePasses, setGatePasses] = useState<GatePassRecord[]>([]);
  const [tickets, setTickets] = useState<MaintenanceRecord[]>([]);
  const [isLiveConnected, setIsLiveConnected] = useState(true);

  useEffect(() => {
    const unsubBookings = subscribeToBookings(setBookings);
    const unsubRooms = subscribeToRooms(setRooms);
    const unsubPasses = subscribeToGatePasses(setGatePasses);
    const unsubTickets = subscribeToMaintenance(setTickets);

    return () => {
      unsubBookings();
      unsubRooms();
      unsubPasses();
      unsubTickets();
    };
  }, []);

  // Compute live dynamic stats
  const totalCapacity = rooms.reduce((acc, r) => acc + (r.capacity || 0), 0) || 90;
  const availableBeds = rooms.reduce((acc, r) => acc + (r.availableBeds || 0), 0) || 6;
  const occupiedBeds = Math.max(0, totalCapacity - availableBeds);
  const occupancyPercentage = Math.round((occupiedBeds / totalCapacity) * 100) || 92;

  const pendingBookings = bookings.filter((b) => b.status === "PENDING");
  const pendingPasses = gatePasses.filter((p) => p.status === "PENDING");
  const openTickets = tickets.filter((t) => t.status === "OPEN" || t.status === "IN_PROGRESS");
  const monthlyRentCollection = 1512000;

  return (
    <div className="flex min-h-[calc(100vh-5rem)] bg-[#070709] text-slate-100">
      <AdminSidebar />

      <main className="flex-grow p-4 sm:p-8 space-y-6 overflow-y-auto">
        {/* Header with Live Signal */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-amber-500/20 pb-5">
          <div>
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-amber-500/15 text-amber-300 font-bold text-[10px] uppercase tracking-wider border border-amber-500/30 shadow-sm">
                <Crown className="w-3.5 h-3.5 text-amber-400" />
                Hostel Control Center
              </span>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/15 text-emerald-400 text-[10px] font-semibold border border-emerald-500/30">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                Firebase Real-time Sync
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold font-serif text-white mt-1.5">
              Admin & Warden Executive Dashboard
            </h1>
            <p className="text-xs text-slate-400">Educator Girls Hostel • University Road, Peshawar</p>
          </div>

          <div className="flex flex-wrap gap-2.5">
            <Link href="/dashboard/admin/rooms">
              <Button size="sm" className="text-xs font-black bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 hover:from-amber-400 shadow-md">
                <Plus className="w-3.5 h-3.5 mr-1" />
                Manage Rooms (CRUD)
              </Button>
            </Link>
            <Link href="/dashboard/admin/bookings">
              <Button variant="outline" size="sm" className="text-xs border-amber-500/30 text-amber-300 hover:bg-amber-500/10">
                <CalendarCheck className="w-3.5 h-3.5 mr-1.5 text-amber-400" />
                Live Bookings ({pendingBookings.length})
              </Button>
            </Link>
          </div>
        </div>

        {/* Live Incoming Alert Pill (If pending bookings exist) */}
        {pendingBookings.length > 0 && (
          <div className="p-3.5 rounded-2xl bg-gradient-to-r from-amber-500/20 via-amber-500/10 to-transparent border border-amber-500/40 flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-amber-500/20 flex items-center justify-center border border-amber-400/40 shrink-0">
                <Radio className="w-4 h-4 text-amber-400 animate-pulse" />
              </div>
              <div className="text-xs">
                <p className="font-bold text-amber-300">
                  {pendingBookings.length} New Online Reservation{pendingBookings.length > 1 ? "s" : ""} Pending Review
                </p>
                <p className="text-slate-400 text-[11px]">
                  Latest: {pendingBookings[0].residentName} for {pendingBookings[0].roomTitle}
                </p>
              </div>
            </div>
            <Link href="/dashboard/admin/bookings">
              <Button size="sm" className="text-[11px] font-bold h-8 px-3 bg-amber-500 text-slate-950 hover:bg-amber-400">
                Review Bookings →
              </Button>
            </Link>
          </div>
        )}

        {/* Dynamic Metric Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="border-amber-500/25 bg-[#0c0c10] shadow-md hover:border-amber-400/40 transition-colors">
            <CardContent className="p-5 space-y-1.5">
              <div className="flex justify-between items-center text-xs font-semibold text-slate-400">
                <span>Bed Occupancy</span>
                <Bed className="w-4 h-4 text-amber-400" />
              </div>
              <div className="text-2xl font-black text-white font-mono">{occupancyPercentage}%</div>
              <div className="flex justify-between text-[11px] text-amber-400 font-medium">
                <span>{occupiedBeds} of {totalCapacity} Beds</span>
                <span className="text-emerald-400 font-bold">{availableBeds} Vacant</span>
              </div>
            </CardContent>
          </Card>

          <Card className="border-amber-500/25 bg-[#0c0c10] shadow-md hover:border-amber-400/40 transition-colors">
            <CardContent className="p-5 space-y-1.5">
              <div className="flex justify-between items-center text-xs font-semibold text-slate-400">
                <span>Live Bookings Queue</span>
                <CalendarCheck className="w-4 h-4 text-amber-400" />
              </div>
              <div className="text-2xl font-black text-amber-400 font-mono">{bookings.length} Total</div>
              <p className="text-[11px] text-amber-300 font-medium">
                {pendingBookings.length} Pending Approval
              </p>
            </CardContent>
          </Card>

          <Card className="border-amber-500/25 bg-[#0c0c10] shadow-md hover:border-amber-400/40 transition-colors">
            <CardContent className="p-5 space-y-1.5">
              <div className="flex justify-between items-center text-xs font-semibold text-slate-400">
                <span>Pending Gate Passes</span>
                <ShieldCheck className="w-4 h-4 text-amber-400" />
              </div>
              <div className="text-2xl font-black text-white font-mono">{pendingPasses.length} Requests</div>
              <p className="text-[11px] text-amber-400/90 font-medium">Warden Sign-off required</p>
            </CardContent>
          </Card>

          <Card className="border-amber-500/25 bg-[#0c0c10] shadow-md hover:border-amber-400/40 transition-colors">
            <CardContent className="p-5 space-y-1.5">
              <div className="flex justify-between items-center text-xs font-semibold text-slate-400">
                <span>Maintenance Tickets</span>
                <AlertCircle className="w-4 h-4 text-amber-400" />
              </div>
              <div className="text-2xl font-black text-white font-mono">{openTickets.length} Open</div>
              <p className="text-[11px] text-amber-400/90 font-medium">AC & Plumbing servicing</p>
            </CardContent>
          </Card>
        </div>

        {/* Charts & Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <Card className="lg:col-span-8 border-amber-500/25 bg-[#0c0c10]">
            <CardHeader className="pb-3">
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle className="text-base font-serif text-white">Revenue Collection Trends (PKR)</CardTitle>
                  <CardDescription className="text-slate-400 text-xs">Monthly rent & security deposit income over 2026</CardDescription>
                </div>
                <Badge variant="gold" className="font-mono">{formatPKR(monthlyRentCollection)}/mo</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <RevenueChart />
            </CardContent>
          </Card>

          <Card className="lg:col-span-4 border-amber-500/25 bg-[#0c0c10]">
            <CardHeader className="pb-3">
              <CardTitle className="text-base font-serif text-white">Room Type Distribution</CardTitle>
              <CardDescription className="text-slate-400 text-xs">Live capacity proportion by category</CardDescription>
            </CardHeader>
            <CardContent>
              <OccupancyChart />
            </CardContent>
          </Card>
        </div>

        {/* Recent Real-time Bookings Snapshot */}
        <Card className="border-amber-500/25 bg-[#0c0c10]">
          <CardHeader className="flex flex-row items-center justify-between pb-3">
            <div>
              <CardTitle className="text-base font-serif text-white">Recent Live Bookings</CardTitle>
              <CardDescription className="text-slate-400 text-xs">Real-time incoming reservations from the web portal</CardDescription>
            </div>
            <Link href="/dashboard/admin/bookings">
              <Button variant="outline" size="sm" className="text-xs border-amber-500/30 text-amber-300">
                View All Bookings
                <ArrowUpRight className="w-3.5 h-3.5 ml-1" />
              </Button>
            </Link>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left">
                <thead className="border-b border-amber-500/20 text-amber-400/80 uppercase tracking-wider font-semibold">
                  <tr>
                    <th className="py-2.5 px-3">Ref ID</th>
                    <th className="py-2.5 px-3">Resident Name</th>
                    <th className="py-2.5 px-3">Room Selected</th>
                    <th className="py-2.5 px-3">Check-in</th>
                    <th className="py-2.5 px-3">Total (PKR)</th>
                    <th className="py-2.5 px-3">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-amber-500/10">
                  {bookings.slice(0, 4).map((b) => (
                    <tr key={b.id} className="hover:bg-slate-950/40">
                      <td className="py-3 px-3 font-mono font-bold text-amber-400">{b.id}</td>
                      <td className="py-3 px-3">
                        <span className="font-semibold text-white block">{b.residentName}</span>
                        <span className="text-[10px] text-slate-400">{b.phone}</span>
                      </td>
                      <td className="py-3 px-3 text-slate-300">{b.roomTitle}</td>
                      <td className="py-3 px-3 text-slate-400">{b.checkIn}</td>
                      <td className="py-3 px-3 font-black text-amber-400 font-mono">{formatPKR(b.totalPKR)}</td>
                      <td className="py-3 px-3">
                        <Badge
                          variant={
                            b.status === "CONFIRMED"
                              ? "gold"
                              : b.status === "CHECKED_IN"
                              ? "outline"
                              : b.status === "PENDING"
                              ? "secondary"
                              : "destructive"
                          }
                        >
                          {b.status}
                        </Badge>
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
