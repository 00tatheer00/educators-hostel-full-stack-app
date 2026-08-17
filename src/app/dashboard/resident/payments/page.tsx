"use client";

import React, { useState } from "react";
import { ResidentSidebar } from "@/components/dashboard/ResidentSidebar";
import { formatPKR } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CreditCard, CheckCircle2, AlertCircle } from "lucide-react";
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
    <div className="flex min-h-[calc(100vh-5rem)]">
      <ResidentSidebar />

      <main className="flex-grow p-6 sm:p-10 space-y-8 overflow-y-auto">
        <div className="border-b border-slate-200 dark:border-slate-800 pb-6">
          <Badge variant="emerald">Finances</Badge>
          <h1 className="text-3xl font-extrabold font-serif text-slate-900 dark:text-slate-100 mt-1">
            Rent Invoices & Payment History
          </h1>
          <p className="text-xs text-slate-500">Pay monthly hostel rent via Stripe card or view previous receipts</p>
        </div>

        {/* Unpaid Alert Banner */}
        <Card className="border-amber-300 bg-amber-50 dark:bg-amber-950/40 dark:border-amber-800">
          <CardContent className="p-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <Badge variant="gold" className="mb-1">Payment Overdue</Badge>
              <h3 className="font-bold text-base text-amber-950 dark:text-amber-100">
                August 2026 Rent Invoice - {formatPKR(18000)}
              </h3>
              <p className="text-xs text-amber-800 dark:text-amber-300">Due Date: August 25, 2026</p>
            </div>
            <Button onClick={() => handlePay("INV-2026-08")} variant="gold" className="font-semibold text-xs shadow-md">
              <CreditCard className="w-4 h-4 mr-1.5" />
              Pay Rent Now (Stripe)
            </Button>
          </CardContent>
        </Card>

        {/* History Table */}
        <Card className="border-slate-200 dark:border-slate-800">
          <CardHeader>
            <CardTitle className="text-base font-serif">Payment Ledger History</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left">
                <thead className="border-b border-slate-200 dark:border-slate-800 text-slate-400 uppercase tracking-wider font-semibold">
                  <tr>
                    <th className="py-3 px-4">Invoice #</th>
                    <th className="py-3 px-4">Billing Month</th>
                    <th className="py-3 px-4">Rent Amount</th>
                    <th className="py-3 px-4">Due Date</th>
                    <th className="py-3 px-4">Status</th>
                    <th className="py-3 px-4 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                  {history.map((h) => (
                    <tr key={h.id}>
                      <td className="py-3.5 px-4 font-mono font-semibold">{h.id}</td>
                      <td className="py-3.5 px-4 font-medium text-slate-900 dark:text-slate-100">{h.month}</td>
                      <td className="py-3.5 px-4 font-bold text-emerald-800 dark:text-emerald-400">{formatPKR(h.amount)}</td>
                      <td className="py-3.5 px-4 text-slate-500">{h.dueDate}</td>
                      <td className="py-3.5 px-4">
                        <Badge variant={h.status === "PAID" ? "emerald" : "gold"}>
                          {h.status}
                        </Badge>
                      </td>
                      <td className="py-3.5 px-4 text-right">
                        {h.status === "UNPAID" ? (
                          <Button onClick={() => handlePay(h.id)} variant="emerald" size="sm" className="text-[10px]">
                            Pay Now
                          </Button>
                        ) : (
                          <span className="text-[10px] text-emerald-600 font-semibold">Paid</span>
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
