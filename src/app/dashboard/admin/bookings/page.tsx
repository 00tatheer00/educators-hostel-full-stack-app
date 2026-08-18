"use client";

import React, { useState } from "react";
import { AdminSidebar } from "@/components/dashboard/AdminSidebar";
import { formatPKR } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CalendarCheck, Check, X, FileText, Printer, Crown } from "lucide-react";
import { toast } from "sonner";

interface AdminBooking {
  id: string;
  residentName: string;
  cnic: string;
  roomTitle: string;
  checkIn: string;
  durationMonths: number;
  totalPKR: number;
  status: "PENDING" | "CONFIRMED" | "CHECKED_IN" | "REJECTED";
}

export default function AdminBookingsPage() {
  const [bookings, setBookings] = useState<AdminBooking[]>([
    {
      id: "EGH-10029",
      residentName: "Fatima Khan",
      cnic: "17301-1234567-8",
      roomTitle: "Deluxe Double (Room 204)",
      checkIn: "2026-09-01",
      durationMonths: 6,
      totalPKR: 116000,
      status: "CONFIRMED",
    },
    {
      id: "EGH-10030",
      residentName: "Sobia Afridi",
      cnic: "17301-9876543-1",
      roomTitle: "Single Executive (Room 301)",
      checkIn: "2026-09-05",
      durationMonths: 12,
      totalPKR: 346000,
      status: "PENDING",
    },
    {
      id: "EGH-10031",
      residentName: "Mahnoor Khattak",
      cnic: "17301-5554443-2",
      roomTitle: "Triple Sharing (Room 105)",
      checkIn: "2026-08-20",
      durationMonths: 6,
      totalPKR: 90000,
      status: "CHECKED_IN",
    },
  ]);

  const [selectedInvoice, setSelectedInvoice] = useState<AdminBooking | null>(null);

  const handleStatusChange = (id: string, newStatus: "CONFIRMED" | "REJECTED" | "CHECKED_IN") => {
    setBookings(
      bookings.map((b) => (b.id === id ? { ...b, status: newStatus } : b))
    );
    toast.success(`Booking ${id} updated to ${newStatus}`);
  };

  return (
    <div className="flex min-h-[calc(100vh-5rem)] bg-[#070709] text-slate-100">
      <AdminSidebar />

      <main className="flex-grow p-6 sm:p-10 space-y-8 overflow-y-auto">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-amber-500/20 pb-6">
          <div>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/15 text-amber-300 font-bold text-xs uppercase tracking-wider border border-amber-500/30">
              <Crown className="w-3.5 h-3.5 text-amber-400" />
              Reservations Desk
            </span>
            <h1 className="text-3xl font-extrabold font-serif text-white mt-2">
              Bookings & Invoice Approvals
            </h1>
            <p className="text-xs text-slate-400">Review student applications, issue receipts, and check-in residents</p>
          </div>
        </div>

        {/* Invoice Modal */}
        {selectedInvoice && (
          <Card className="border-amber-500/35 shadow-2xl p-6 space-y-4 max-w-lg mx-auto bg-[#0c0c10]">
            <div className="flex justify-between items-center border-b border-amber-500/20 pb-3">
              <div>
                <Badge variant="gold">Hostel Official Invoice</Badge>
                <h3 className="font-bold font-serif text-lg text-white mt-1">
                  Invoice #{selectedInvoice.id}
                </h3>
              </div>
              <Button variant="outline" size="sm" onClick={() => setSelectedInvoice(null)} className="border-amber-500/30 text-amber-300">Close</Button>
            </div>
            <div className="space-y-2 text-xs text-slate-300">
              <div className="flex justify-between py-1 border-b border-amber-500/10">
                <span>Resident Name:</span>
                <span className="font-bold text-white">{selectedInvoice.residentName}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-amber-500/10">
                <span>CNIC Number:</span>
                <span>{selectedInvoice.cnic}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-amber-500/10">
                <span>Room Assigned:</span>
                <span className="text-amber-300 font-bold">{selectedInvoice.roomTitle}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-amber-500/10">
                <span>Stay Duration:</span>
                <span>{selectedInvoice.durationMonths} Months (Check-in: {selectedInvoice.checkIn})</span>
              </div>
              <div className="flex justify-between py-2 text-sm font-black text-amber-400 font-mono">
                <span>Total Amount Paid:</span>
                <span>{formatPKR(selectedInvoice.totalPKR)}</span>
              </div>
            </div>
            <Button onClick={() => window.print()} className="w-full font-black text-xs bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950">
              <Printer className="w-4 h-4 mr-2" />
              Print Official Invoice Receipt
            </Button>
          </Card>
        )}

        {/* Bookings Table */}
        <Card className="border-amber-500/25 bg-[#0c0c10]">
          <CardHeader>
            <CardTitle className="text-base font-serif text-white">All Reservations List</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left">
                <thead className="border-b border-amber-500/20 text-amber-400/80 uppercase tracking-wider font-semibold">
                  <tr>
                    <th className="py-3 px-4">Ref #</th>
                    <th className="py-3 px-4">Resident</th>
                    <th className="py-3 px-4">CNIC</th>
                    <th className="py-3 px-4">Room Reserved</th>
                    <th className="py-3 px-4">Check-in</th>
                    <th className="py-3 px-4">Total Fee</th>
                    <th className="py-3 px-4">Status</th>
                    <th className="py-3 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-amber-500/10">
                  {bookings.map((b) => (
                    <tr key={b.id} className="hover:bg-slate-950/40">
                      <td className="py-3.5 px-4 font-mono font-bold text-amber-400">{b.id}</td>
                      <td className="py-3.5 px-4 font-medium text-white">{b.residentName}</td>
                      <td className="py-3.5 px-4 text-slate-400">{b.cnic}</td>
                      <td className="py-3.5 px-4 text-slate-300">{b.roomTitle}</td>
                      <td className="py-3.5 px-4 text-slate-400">{b.checkIn}</td>
                      <td className="py-3.5 px-4 font-black text-amber-400 font-mono">{formatPKR(b.totalPKR)}</td>
                      <td className="py-3.5 px-4">
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
                      <td className="py-3.5 px-4 text-right space-x-2">
                        <Button onClick={() => setSelectedInvoice(b)} variant="outline" size="sm" className="text-[10px] border-amber-500/30 text-amber-300">
                          Invoice
                        </Button>
                        {b.status === "PENDING" && (
                          <>
                            <Button onClick={() => handleStatusChange(b.id, "CONFIRMED")} size="sm" className="text-[10px] font-bold bg-amber-500 text-slate-950 hover:bg-amber-400">
                              Approve
                            </Button>
                            <Button onClick={() => handleStatusChange(b.id, "REJECTED")} variant="destructive" size="sm" className="text-[10px]">
                              Reject
                            </Button>
                          </>
                        )}
                        {b.status === "CONFIRMED" && (
                          <Button onClick={() => handleStatusChange(b.id, "CHECKED_IN")} size="sm" className="text-[10px] font-bold bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950">
                            Check-in
                          </Button>
                        )}
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
