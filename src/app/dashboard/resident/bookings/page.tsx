"use client";

import React from "react";
import { ResidentSidebar } from "@/components/dashboard/ResidentSidebar";
import { formatPKR } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Printer, CalendarCheck, FileText, Crown } from "lucide-react";

export default function ResidentBookingsPage() {
  const currentBooking = {
    refNo: "EGH-10029",
    room: "Deluxe Double Sharing (Room 204)",
    checkIn: "September 01, 2025",
    duration: "12 Months (Academic Year 2025-2026)",
    monthlyRent: 18000,
    securityDeposit: 8000,
    status: "ACTIVE",
  };

  return (
    <div className="flex min-h-[calc(100vh-5rem)] bg-[#070709] text-slate-100">
      <ResidentSidebar />

      <main className="flex-grow p-6 sm:p-10 space-y-8 overflow-y-auto">
        <div className="border-b border-amber-500/20 pb-6">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/15 text-amber-300 font-bold text-xs uppercase tracking-wider border border-amber-500/30">
            <Crown className="w-3.5 h-3.5 text-amber-400" />
            Stay History
          </span>
          <h1 className="text-3xl font-extrabold font-serif text-white mt-2">
            My Bookings & Official Receipt
          </h1>
          <p className="text-xs text-slate-400">View current reservation contract details and download invoice</p>
        </div>

        <Card className="border-amber-500/25 bg-[#0c0c10] max-w-2xl">
          <CardHeader>
            <div className="flex justify-between items-center">
              <div>
                <CardTitle className="text-lg font-serif text-white">Current Stay Reservation</CardTitle>
                <CardDescription className="text-slate-400">Ref #: {currentBooking.refNo}</CardDescription>
              </div>
              <Badge variant="gold">{currentBooking.status}</Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-6 text-xs text-slate-300">
            <div className="space-y-2 p-4 rounded-xl bg-slate-950 border border-amber-500/15">
              <div className="flex justify-between py-1 border-b border-amber-500/10">
                <span className="font-semibold text-white">Reserved Accommodation:</span>
                <span className="text-amber-300 font-bold">{currentBooking.room}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-amber-500/10">
                <span className="font-semibold text-white">Check-in Date:</span>
                <span>{currentBooking.checkIn}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-amber-500/10">
                <span className="font-semibold text-white">Contract Tenure:</span>
                <span>{currentBooking.duration}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-amber-500/10">
                <span className="font-semibold text-white">Monthly Rent:</span>
                <span className="font-black text-amber-400 font-mono">{formatPKR(currentBooking.monthlyRent)} / mo</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="font-semibold text-white">Security Deposit Held:</span>
                <span className="font-mono">{formatPKR(currentBooking.securityDeposit)}</span>
              </div>
            </div>

            <Button onClick={() => window.print()} className="w-full font-black text-xs bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 hover:from-amber-400">
              <Printer className="w-4 h-4 mr-2" />
              Print Official Booking Invoice
            </Button>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
