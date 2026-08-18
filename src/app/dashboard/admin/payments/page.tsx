"use client";

import React, { useState } from "react";
import { AdminSidebar } from "@/components/dashboard/AdminSidebar";
import { formatPKR } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CreditCard, DollarSign, BellRing, ArrowUpRight, Crown } from "lucide-react";
import { toast } from "sonner";

interface PaymentTransaction {
  id: string;
  residentName: string;
  month: string;
  amountPKR: number;
  method: "STRIPE" | "JAZZCASH" | "CASH";
  status: "COMPLETED" | "PENDING" | "OVERDUE";
  date: string;
}

export default function AdminPaymentsPage() {
  const [transactions, setTransactions] = useState<PaymentTransaction[]>([
    { id: "TXN-8801", residentName: "Dr. Maryam Khattak", month: "August 2026", amountPKR: 28000, method: "STRIPE", status: "COMPLETED", date: "Aug 02, 2026" },
    { id: "TXN-8802", residentName: "Ayesha Malik", month: "August 2026", amountPKR: 18000, method: "JAZZCASH", status: "COMPLETED", date: "Aug 03, 2026" },
    { id: "TXN-8803", residentName: "Fatima Khan", month: "August 2026", amountPKR: 18000, method: "STRIPE", status: "OVERDUE", date: "Aug 05, 2026" },
    { id: "TXN-8804", residentName: "Hira Afridi", month: "August 2026", amountPKR: 14000, method: "CASH", status: "COMPLETED", date: "Aug 01, 2026" },
  ]);

  const handleSendReminder = () => {
    toast.success("SMS & Email payment reminders dispatched to 4 residents with overdue rent!");
  };

  return (
    <div className="flex min-h-[calc(100vh-5rem)] bg-[#070709] text-slate-100">
      <AdminSidebar />

      <main className="flex-grow p-6 sm:p-10 space-y-8 overflow-y-auto">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-amber-500/20 pb-6">
          <div>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/15 text-amber-300 font-bold text-xs uppercase tracking-wider border border-amber-500/30">
              <Crown className="w-3.5 h-3.5 text-amber-400" />
              Financial Treasury
            </span>
            <h1 className="text-3xl font-extrabold font-serif text-white mt-2">
              Payments & Financial Ledger
            </h1>
            <p className="text-xs text-slate-400">Track monthly rent collections, Stripe transactions, and overdue reminders</p>
          </div>
          <Button onClick={handleSendReminder} size="sm" className="font-black text-xs bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 hover:from-amber-400">
            <BellRing className="w-4 h-4 mr-1.5" />
            Send Overdue Rent Reminders
          </Button>
        </div>

        {/* Financial Summary */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <Card className="border-amber-500/25 bg-[#0c0c10]">
            <CardContent className="p-6 space-y-1">
              <span className="text-xs font-semibold text-slate-400">August Collections</span>
              <div className="text-2xl font-black text-amber-400 font-mono">{formatPKR(1512000)}</div>
              <p className="text-[10px] text-slate-400">84 Active Rent Payments</p>
            </CardContent>
          </Card>
          <Card className="border-amber-500/25 bg-[#0c0c10]">
            <CardContent className="p-6 space-y-1">
              <span className="text-xs font-semibold text-slate-400">Overdue Rent Total</span>
              <div className="text-2xl font-black text-rose-500 font-mono">{formatPKR(72000)}</div>
              <p className="text-[10px] text-slate-400">4 Residents Pending</p>
            </CardContent>
          </Card>
          <Card className="border-amber-500/25 bg-[#0c0c10]">
            <CardContent className="p-6 space-y-1">
              <span className="text-xs font-semibold text-slate-400">Security Deposits Held</span>
              <div className="text-2xl font-black text-amber-300 font-mono">{formatPKR(672000)}</div>
              <p className="text-[10px] text-slate-400">Refundable on Check-out</p>
            </CardContent>
          </Card>
        </div>

        {/* Ledger Table */}
        <Card className="border-amber-500/25 bg-[#0c0c10]">
          <CardHeader>
            <CardTitle className="text-base font-serif text-white">Recent Payment Transactions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left">
                <thead className="border-b border-amber-500/20 text-amber-400/80 uppercase tracking-wider font-semibold">
                  <tr>
                    <th className="py-3 px-4">Transaction ID</th>
                    <th className="py-3 px-4">Resident</th>
                    <th className="py-3 px-4">Month</th>
                    <th className="py-3 px-4">Amount</th>
                    <th className="py-3 px-4">Method</th>
                    <th className="py-3 px-4">Status</th>
                    <th className="py-3 px-4 text-right">Date</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-amber-500/10">
                  {transactions.map((t) => (
                    <tr key={t.id} className="hover:bg-slate-950/40">
                      <td className="py-3.5 px-4 font-mono font-semibold text-amber-300">{t.id}</td>
                      <td className="py-3.5 px-4 font-medium text-white">{t.residentName}</td>
                      <td className="py-3.5 px-4 text-slate-300">{t.month}</td>
                      <td className="py-3.5 px-4 font-black text-amber-400 font-mono">{formatPKR(t.amountPKR)}</td>
                      <td className="py-3.5 px-4"><Badge variant="outline">{t.method}</Badge></td>
                      <td className="py-3.5 px-4">
                        <Badge variant={t.status === "COMPLETED" ? "gold" : "destructive"}>
                          {t.status}
                        </Badge>
                      </td>
                      <td className="py-3.5 px-4 text-right text-slate-400">{t.date}</td>
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
