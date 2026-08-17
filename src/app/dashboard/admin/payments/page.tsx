"use client";

import React, { useState } from "react";
import { AdminSidebar } from "@/components/dashboard/AdminSidebar";
import { formatPKR } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CreditCard, DollarSign, BellRing, ArrowUpRight } from "lucide-react";
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
    <div className="flex min-h-[calc(100vh-5rem)]">
      <AdminSidebar />

      <main className="flex-grow p-6 sm:p-10 space-y-8 overflow-y-auto">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-slate-200 dark:border-slate-800 pb-6">
          <div>
            <Badge variant="gold">Financial Treasury</Badge>
            <h1 className="text-3xl font-extrabold font-serif text-slate-900 dark:text-slate-100 mt-1">
              Payments & Financial Ledger
            </h1>
            <p className="text-xs text-slate-500">Track monthly rent collections, Stripe transactions, and overdue reminders</p>
          </div>
          <Button onClick={handleSendReminder} variant="gold" size="sm" className="font-semibold text-xs">
            <BellRing className="w-4 h-4 mr-1.5" />
            Send Overdue Rent Reminders
          </Button>
        </div>

        {/* Financial Summary */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <Card className="border-slate-200 dark:border-slate-800">
            <CardContent className="p-6 space-y-1">
              <span className="text-xs font-semibold text-slate-500">August Collections</span>
              <div className="text-2xl font-extrabold text-emerald-900 dark:text-emerald-400">{formatPKR(1512000)}</div>
              <p className="text-[10px] text-slate-400">84 Active Rent Payments</p>
            </CardContent>
          </Card>
          <Card className="border-slate-200 dark:border-slate-800">
            <CardContent className="p-6 space-y-1">
              <span className="text-xs font-semibold text-slate-500">Overdue Rent Total</span>
              <div className="text-2xl font-extrabold text-rose-600">{formatPKR(72000)}</div>
              <p className="text-[10px] text-slate-400">4 Residents Pending</p>
            </CardContent>
          </Card>
          <Card className="border-slate-200 dark:border-slate-800">
            <CardContent className="p-6 space-y-1">
              <span className="text-xs font-semibold text-slate-500">Security Deposits Held</span>
              <div className="text-2xl font-extrabold text-amber-500">{formatPKR(672000)}</div>
              <p className="text-[10px] text-slate-400">Refundable on Check-out</p>
            </CardContent>
          </Card>
        </div>

        {/* Ledger Table */}
        <Card className="border-slate-200 dark:border-slate-800">
          <CardHeader>
            <CardTitle className="text-base font-serif">Recent Payment Transactions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left">
                <thead className="border-b border-slate-200 dark:border-slate-800 text-slate-400 uppercase tracking-wider font-semibold">
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
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                  {transactions.map((t) => (
                    <tr key={t.id}>
                      <td className="py-3.5 px-4 font-mono font-semibold">{t.id}</td>
                      <td className="py-3.5 px-4 font-medium text-slate-900 dark:text-slate-100">{t.residentName}</td>
                      <td className="py-3.5 px-4">{t.month}</td>
                      <td className="py-3.5 px-4 font-bold text-emerald-800 dark:text-emerald-400">{formatPKR(t.amountPKR)}</td>
                      <td className="py-3.5 px-4"><Badge variant="outline">{t.method}</Badge></td>
                      <td className="py-3.5 px-4">
                        <Badge variant={t.status === "COMPLETED" ? "emerald" : "destructive"}>
                          {t.status}
                        </Badge>
                      </td>
                      <td className="py-3.5 px-4 text-right text-slate-500">{t.date}</td>
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
