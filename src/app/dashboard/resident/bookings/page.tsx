"use client";

import React from "react";
import { ResidentSidebar } from "@/components/dashboard/ResidentSidebar";
import { formatPKR } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Printer, CalendarCheck, FileText } from "lucide-react";

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
    <div className="flex min-h-[calc(100vh-5rem)]">
      <ResidentSidebar />

      <main className="flex-grow p-6 sm:p-10 space-y-8 overflow-y-auto">
        <div className="border-b border-slate-200 dark:border-slate-800 pb-6">
          <Badge variant="emerald">Stay History</Badge>
          <h1 className="text-3xl font-extrabold font-serif text-slate-900 dark:text-slate-100 mt-1">
            My Bookings & Official Receipt
          </h1>
          <p className="text-xs text-slate-500">View current reservation contract details and download invoice</p>
        </div>

        <Card className="border-slate-200 dark:border-slate-800 max-w-2xl">
          <CardHeader>
            <div className="flex justify-between items-center">
              <div>
                <CardTitle className="text-lg font-serif">Current Stay Reservation</CardTitle>
                <CardDescription>Ref #: {currentBooking.refNo}</CardDescription>
              </div>
              <Badge variant="emerald">{currentBooking.status}</Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-6 text-xs text-slate-600 dark:text-slate-300">
            <div className="space-y-2 p-4 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700">
              <div className="flex justify-between py-1 border-b border-slate-200 dark:border-slate-700">
                <span className="font-semibold text-slate-900 dark:text-white">Reserved Accommodation:</span>
                <span>{currentBooking.room}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-200 dark:border-slate-700">
                <span className="font-semibold text-slate-900 dark:text-white">Check-in Date:</span>
                <span>{currentBooking.checkIn}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-200 dark:border-slate-700">
                <span className="font-semibold text-slate-900 dark:text-white">Contract Tenure:</span>
                <span>{currentBooking.duration}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-200 dark:border-slate-700">
                <span className="font-semibold text-slate-900 dark:text-white">Monthly Rent:</span>
                <span className="font-bold text-emerald-700">{formatPKR(currentBooking.monthlyRent)} / mo</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="font-semibold text-slate-900 dark:text-white">Security Deposit Held:</span>
                <span>{formatPKR(currentBooking.securityDeposit)}</span>
              </div>
            </div>

            <Button onClick={() => window.print()} variant="gold" className="w-full font-semibold text-xs">
              <Printer className="w-4 h-4 mr-2" />
              Print Official Booking Invoice
            </Button>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
