"use client";

import React, { useState, useEffect } from "react";
import { AdminSidebar } from "@/components/dashboard/AdminSidebar";
import { formatPKR } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  CalendarCheck,
  Check,
  X,
  FileText,
  Printer,
  Crown,
  Search,
  CheckCircle2,
  Clock,
  Radio,
  UserCheck,
  Building,
} from "lucide-react";
import { toast } from "sonner";
import {
  subscribeToBookings,
  updateBookingStatus,
  BookingRecord,
} from "@/lib/firestoreService";
import { Logo } from "@/components/common/Logo";

export default function AdminBookingsPage() {
  const [bookings, setBookings] = useState<BookingRecord[]>([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("ALL");
  const [selectedInvoice, setSelectedInvoice] = useState<BookingRecord | null>(null);

  useEffect(() => {
    const unsub = subscribeToBookings(setBookings);
    return () => unsub();
  }, []);

  const handleStatusChange = async (
    id: string,
    newStatus: "CONFIRMED" | "REJECTED" | "CHECKED_IN"
  ) => {
    await updateBookingStatus(id, newStatus);
    toast.success(`Booking ${id} status updated to ${newStatus}`);
  };

  const filteredBookings = bookings.filter((b) => {
    const matchesSearch =
      b.residentName.toLowerCase().includes(search.toLowerCase()) ||
      b.id.toLowerCase().includes(search.toLowerCase()) ||
      b.cnic.includes(search) ||
      b.roomTitle.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === "ALL" || b.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const pendingCount = bookings.filter((b) => b.status === "PENDING").length;

  return (
    <div className="flex min-h-[calc(100vh-5rem)] bg-[#070709] text-slate-100">
      <AdminSidebar />

      <main className="flex-grow p-4 sm:p-8 space-y-6 overflow-y-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-amber-500/20 pb-5">
          <div>
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-amber-500/15 text-amber-300 font-bold text-[10px] uppercase tracking-wider border border-amber-500/30 shadow-sm">
                <Crown className="w-3.5 h-3.5 text-amber-400" />
                Live Reservations Desk
              </span>
              {pendingCount > 0 && (
                <Badge variant="gold" className="text-[10px] animate-pulse">
                  {pendingCount} Pending Review
                </Badge>
              )}
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold font-serif text-white mt-1.5">
              Live Bookings & Official Invoices
            </h1>
            <p className="text-xs text-slate-400">Review student room applications in real-time, approve admissions, and issue receipts</p>
          </div>
        </div>

        {/* Filter and Search Bar */}
        <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-3">
          <div className="relative w-full sm:w-72">
            <Search className="w-3.5 h-3.5 text-amber-400 absolute left-3 top-3" />
            <Input
              placeholder="Search by student, CNIC, ref #..."
              className="pl-8 h-9 text-xs bg-slate-950 border-amber-500/30 text-white"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <div className="flex flex-wrap gap-1.5">
            {["ALL", "PENDING", "CONFIRMED", "CHECKED_IN", "REJECTED"].map((st) => (
              <button
                key={st}
                onClick={() => setStatusFilter(st)}
                className={`px-3 py-1 rounded-xl text-xs font-semibold transition-all border ${
                  statusFilter === st
                    ? "bg-amber-500 text-slate-950 border-amber-400 font-bold shadow-md"
                    : "bg-slate-950 border-amber-500/20 text-slate-400 hover:text-white"
                }`}
              >
                {st.replace("_", " ")}
              </button>
            ))}
          </div>
        </div>

        {/* Bookings Table */}
        <Card className="border-amber-500/25 bg-[#0c0c10]">
          <CardHeader className="py-4">
            <CardTitle className="text-base font-serif text-white">
              Reservations Queue ({filteredBookings.length} Applications)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left">
                <thead className="border-b border-amber-500/20 text-amber-400/80 uppercase tracking-wider font-semibold">
                  <tr>
                    <th className="py-3 px-4">Ref #</th>
                    <th className="py-3 px-4">Student Name & CNIC</th>
                    <th className="py-3 px-4">Room Reserved</th>
                    <th className="py-3 px-4">Schedule</th>
                    <th className="py-3 px-4">Total Amount</th>
                    <th className="py-3 px-4">Payment</th>
                    <th className="py-3 px-4">Status</th>
                    <th className="py-3 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-amber-500/10">
                  {filteredBookings.map((b) => (
                    <tr key={b.id} className="hover:bg-slate-950/50">
                      <td className="py-3.5 px-4 font-mono font-bold text-amber-400">{b.id}</td>
                      <td className="py-3.5 px-4">
                        <span className="font-bold text-white block">{b.residentName}</span>
                        <span className="text-[10px] text-slate-400 font-mono">{b.cnic}</span>
                      </td>
                      <td className="py-3.5 px-4">
                        <span className="text-slate-200 font-medium block">{b.roomTitle}</span>
                        <span className="text-[10px] text-slate-400">{b.institution || "Student"}</span>
                      </td>
                      <td className="py-3.5 px-4 text-slate-300">
                        <span className="block">{b.checkIn}</span>
                        <span className="text-[10px] text-slate-400">Duration: {b.durationMonths} Mo</span>
                      </td>
                      <td className="py-3.5 px-4 font-black text-amber-400 font-mono">
                        {formatPKR(b.totalPKR)}
                      </td>
                      <td className="py-3.5 px-4">
                        <Badge variant="outline" className="text-[10px]">{b.paymentMethod}</Badge>
                      </td>
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
                      <td className="py-3.5 px-4 text-right space-x-1.5">
                        <Button
                          onClick={() => setSelectedInvoice(b)}
                          variant="outline"
                          size="sm"
                          className="text-[10px] h-7 px-2.5 border-amber-500/30 text-amber-300 hover:bg-amber-500/10"
                        >
                          <FileText className="w-3 h-3 mr-1" />
                          Invoice
                        </Button>

                        {b.status === "PENDING" && (
                          <>
                            <Button
                              onClick={() => handleStatusChange(b.id, "CONFIRMED")}
                              size="sm"
                              className="text-[10px] h-7 px-2.5 font-bold bg-amber-500 text-slate-950 hover:bg-amber-400"
                            >
                              Approve
                            </Button>
                            <Button
                              onClick={() => handleStatusChange(b.id, "REJECTED")}
                              variant="destructive"
                              size="sm"
                              className="text-[10px] h-7 px-2"
                            >
                              Reject
                            </Button>
                          </>
                        )}

                        {b.status === "CONFIRMED" && (
                          <Button
                            onClick={() => handleStatusChange(b.id, "CHECKED_IN")}
                            size="sm"
                            className="text-[10px] h-7 px-2.5 font-bold bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950"
                          >
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

        {/* OFFICIAL PRINTABLE INVOICE RECEIPT MODAL */}
        {selectedInvoice && (
          <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
            <Card className="border-amber-500/40 shadow-2xl p-6 sm:p-8 space-y-6 max-w-xl w-full bg-[#0c0c10] my-8">
              <div className="flex justify-between items-start border-b border-amber-500/20 pb-4">
                <div className="flex items-center gap-3">
                  <Logo variant="dark" size={48} showText={false} />
                  <div>
                    <span className="text-[10px] uppercase font-bold text-amber-400 tracking-wider">
                      Official Admission Receipt
                    </span>
                    <h2 className="text-xl font-bold font-serif text-white">Educator Girls Hostel</h2>
                    <p className="text-[11px] text-slate-400">Main University Road, Peshawar</p>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedInvoice(null)}
                  className="text-slate-400 hover:text-white p-1 rounded-lg"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Invoice Meta */}
              <div className="grid grid-cols-2 gap-4 p-4 rounded-xl bg-slate-950 border border-amber-500/20 text-xs">
                <div>
                  <span className="text-slate-400 block">Booking Reference:</span>
                  <span className="font-mono font-bold text-amber-400 text-sm">{selectedInvoice.id}</span>
                </div>
                <div className="text-right">
                  <span className="text-slate-400 block">Status:</span>
                  <Badge variant="gold">{selectedInvoice.status}</Badge>
                </div>
              </div>

              {/* Breakdown */}
              <div className="space-y-2.5 text-xs text-slate-300">
                <div className="flex justify-between py-1.5 border-b border-amber-500/10">
                  <span className="text-slate-400">Resident Name:</span>
                  <span className="font-bold text-white">{selectedInvoice.residentName}</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-amber-500/10">
                  <span className="text-slate-400">CNIC / B-Form:</span>
                  <span className="font-mono text-white">{selectedInvoice.cnic}</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-amber-500/10">
                  <span className="text-slate-400">Father / Guardian:</span>
                  <span className="text-white">{selectedInvoice.guardianName} ({selectedInvoice.guardianPhone})</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-amber-500/10">
                  <span className="text-slate-400">Room Assigned:</span>
                  <span className="text-amber-300 font-bold">{selectedInvoice.roomTitle}</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-amber-500/10">
                  <span className="text-slate-400">Stay Duration & Check-in:</span>
                  <span>{selectedInvoice.durationMonths} Months (From: {selectedInvoice.checkIn})</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-amber-500/10">
                  <span className="text-slate-400">Security Deposit (Refundable):</span>
                  <span className="font-mono text-white">{formatPKR(selectedInvoice.securityDepositPKR || 8000)}</span>
                </div>
                <div className="flex justify-between py-2.5 text-base font-black text-amber-400 font-mono border-t border-amber-500/25">
                  <span>Grand Total Paid:</span>
                  <span>{formatPKR(selectedInvoice.totalPKR)}</span>
                </div>
              </div>

              <div className="flex gap-3 pt-2">
                <Button
                  variant="outline"
                  onClick={() => setSelectedInvoice(null)}
                  className="w-1/3 text-xs border-amber-500/30 text-amber-300"
                >
                  Close
                </Button>
                <Button
                  onClick={() => window.print()}
                  className="w-2/3 text-xs font-black bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 hover:from-amber-400"
                >
                  <Printer className="w-4 h-4 mr-2" />
                  Print Official Invoice Receipt
                </Button>
              </div>
            </Card>
          </div>
        )}
      </main>
    </div>
  );
}
