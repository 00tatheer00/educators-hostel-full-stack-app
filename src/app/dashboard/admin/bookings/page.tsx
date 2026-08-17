"use client";

import React, { useState } from "react";
import { AdminSidebar } from "@/components/dashboard/AdminSidebar";
import { formatPKR } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CalendarCheck, Check, X, FileText, Printer } from "lucide-react";
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
    <div className="flex min-h-[calc(100vh-5rem)]">
      <AdminSidebar />

      <main className="flex-grow p-6 sm:p-10 space-y-8 overflow-y-auto">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-slate-200 dark:border-slate-800 pb-6">
          <div>
            <Badge variant="gold">Reservations Desk</Badge>
            <h1 className="text-3xl font-extrabold font-serif text-slate-900 dark:text-slate-100 mt-1">
              Bookings & Invoice Approvals
            </h1>
            <p className="text-xs text-slate-500">Review student applications, issue receipts, and check-in residents</p>
          </div>
        </div>

        {/* Invoice Modal */}
        {selectedInvoice && (
          <Card className="border-emerald-800/30 shadow-2xl p-6 space-y-4 max-w-lg mx-auto bg-white dark:bg-slate-900">
            <div className="flex justify-between items-center border-b border-slate-100 dark:border-slate-800 pb-3">
              <div>
                <Badge variant="emerald">Hostel Official Invoice</Badge>
                <h3 className="font-bold font-serif text-lg text-slate-900 dark:text-slate-100 mt-1">
                  Invoice #{selectedInvoice.id}
                </h3>
              </div>
              <Button variant="outline" size="sm" onClick={() => setSelectedInvoice(null)}>Close</Button>
            </div>
            <div className="space-y-2 text-xs text-slate-600 dark:text-slate-300">
              <div className="flex justify-between py-1 border-b border-slate-100">
                <span>Resident Name:</span>
                <span className="font-bold text-slate-900 dark:text-white">{selectedInvoice.residentName}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-100">
                <span>CNIC Number:</span>
                <span>{selectedInvoice.cnic}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-100">
                <span>Room Assigned:</span>
                <span>{selectedInvoice.roomTitle}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-100">
                <span>Stay Duration:</span>
                <span>{selectedInvoice.durationMonths} Months (Check-in: {selectedInvoice.checkIn})</span>
              </div>
              <div className="flex justify-between py-2 text-sm font-extrabold text-emerald-900 dark:text-emerald-400">
                <span>Total Amount Paid:</span>
                <span>{formatPKR(selectedInvoice.totalPKR)}</span>
              </div>
            </div>
            <Button onClick={() => window.print()} variant="gold" className="w-full font-semibold text-xs">
              <Printer className="w-4 h-4 mr-2" />
              Print Official Invoice Receipt
            </Button>
          </Card>
        )}

        {/* Bookings Table */}
        <Card className="border-slate-200 dark:border-slate-800">
          <CardHeader>
            <CardTitle className="text-base font-serif">All Reservations List</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left">
                <thead className="border-b border-slate-200 dark:border-slate-800 text-slate-400 uppercase tracking-wider font-semibold">
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
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                  {bookings.map((b) => (
                    <tr key={b.id}>
                      <td className="py-3.5 px-4 font-mono font-bold text-slate-900 dark:text-slate-100">{b.id}</td>
                      <td className="py-3.5 px-4 font-medium text-slate-800 dark:text-slate-200">{b.residentName}</td>
                      <td className="py-3.5 px-4">{b.cnic}</td>
                      <td className="py-3.5 px-4">{b.roomTitle}</td>
                      <td className="py-3.5 px-4">{b.checkIn}</td>
                      <td className="py-3.5 px-4 font-bold text-emerald-800 dark:text-emerald-400">{formatPKR(b.totalPKR)}</td>
                      <td className="py-3.5 px-4">
                        <Badge
                          variant={
                            b.status === "CONFIRMED"
                              ? "emerald"
                              : b.status === "CHECKED_IN"
                              ? "gold"
                              : b.status === "PENDING"
                              ? "secondary"
                              : "destructive"
                          }
                        >
                          {b.status}
                        </Badge>
                      </td>
                      <td className="py-3.5 px-4 text-right space-x-2">
                        <Button onClick={() => setSelectedInvoice(b)} variant="outline" size="sm" className="text-[10px]">
                          Invoice
                        </Button>
                        {b.status === "PENDING" && (
                          <>
                            <Button onClick={() => handleStatusChange(b.id, "CONFIRMED")} variant="emerald" size="sm" className="text-[10px]">
                              Approve
                            </Button>
                            <Button onClick={() => handleStatusChange(b.id, "REJECTED")} variant="destructive" size="sm" className="text-[10px]">
                              Reject
                            </Button>
                          </>
                        )}
                        {b.status === "CONFIRMED" && (
                          <Button onClick={() => handleStatusChange(b.id, "CHECKED_IN")} variant="gold" size="sm" className="text-[10px]">
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
