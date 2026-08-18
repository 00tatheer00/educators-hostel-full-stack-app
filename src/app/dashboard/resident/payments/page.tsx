"use client";

import React, { useState } from "react";
import { ResidentSidebar } from "@/components/dashboard/ResidentSidebar";
import { formatPKR } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CreditCard, CheckCircle2, AlertCircle, Crown } from "lucide-react";
import { toast } from "sonner";

export default function ResidentPaymentsPage() {
  const [history, setHistory] = useState([
    { id: "INV-2026-08", month: "August 2026", amount: 18000, status: "UNPAID", dueDate: "Aug 25, 2026" },
    { id: "INV-2026-07", month: "July 2026", amount: 18000, status: "PAID", dueDate: "Jul 25, 2026" },
    { id: "INV-2026-06", month: "June 2026", amount: 18000, status: "PAID", dueDate: "Jun 25, 2026" },
  ]);

  const handlePay = (id: string) => {
    setHistory(history.map((h) => (h.id === id ? { ...h, status: "PAID" } : h)));
    toast.success("Rent payment of Rs. 18,000 successfully processed via Stripe!");
  };

  return (
    <div className="flex min-h-[calc(100vh-5rem)] bg-[#070709] text-slate-100">
      <ResidentSidebar />

      <main className="flex-grow p-6 sm:p-10 space-y-8 overflow-y-auto">
        <div className="border-b border-amber-500/20 pb-6">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/15 text-amber-300 font-bold text-xs uppercase tracking-wider border border-amber-500/30">
            <Crown className="w-3.5 h-3.5 text-amber-400" />
            Finances
          </span>
          <h1 className="text-3xl font-extrabold font-serif text-white mt-2">
            Rent Invoices & Payment History
          </h1>
          <p className="text-xs text-slate-400">Pay monthly hostel rent via Stripe card or view previous receipts</p>
        </div>

        {/* Unpaid Alert Banner */}
        <Card className="border-amber-500/40 bg-[#0c0c10]">
          <CardContent className="p-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <Badge variant="destructive" className="mb-1">Payment Overdue</Badge>
              <h3 className="font-bold text-base text-white">
                August 2026 Rent Invoice - <span className="text-amber-400 font-mono">{formatPKR(18000)}</span>
              </h3>
              <p className="text-xs text-slate-400">Due Date: August 25, 2026</p>
            </div>
            <Button onClick={() => handlePay("INV-2026-08")} className="font-black text-xs bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 hover:from-amber-400 shadow-md">
              <CreditCard className="w-4 h-4 mr-1.5 text-slate-950" />
              Pay Rent Now (Stripe)
            </Button>
          </CardContent>
        </Card>

        {/* History Table */}
        <Card className="border-amber-500/25 bg-[#0c0c10]">
          <CardHeader>
            <CardTitle className="text-base font-serif text-white">Payment Ledger History</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left">
                <thead className="border-b border-amber-500/20 text-amber-400/80 uppercase tracking-wider font-semibold">
                  <tr>
                    <th className="py-3 px-4">Invoice #</th>
                    <th className="py-3 px-4">Billing Month</th>
                    <th className="py-3 px-4">Rent Amount</th>
                    <th className="py-3 px-4">Due Date</th>
                    <th className="py-3 px-4">Status</th>
                    <th className="py-3 px-4 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-amber-500/10">
                  {history.map((h) => (
                    <tr key={h.id} className="hover:bg-slate-950/40">
                      <td className="py-3.5 px-4 font-mono font-semibold text-amber-300">{h.id}</td>
                      <td className="py-3.5 px-4 font-medium text-white">{h.month}</td>
                      <td className="py-3.5 px-4 font-black text-amber-400 font-mono">{formatPKR(h.amount)}</td>
                      <td className="py-3.5 px-4 text-slate-400">{h.dueDate}</td>
                      <td className="py-3.5 px-4">
                        <Badge variant={h.status === "PAID" ? "gold" : "destructive"}>
                          {h.status}
                        </Badge>
                      </td>
                      <td className="py-3.5 px-4 text-right">
                        {h.status === "UNPAID" ? (
                          <Button onClick={() => handlePay(h.id)} size="sm" className="text-[10px] font-bold bg-amber-500 text-slate-950 hover:bg-amber-400">
                            Pay Now
                          </Button>
                        ) : (
                          <span className="text-[10px] text-amber-400 font-bold">Paid</span>
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
