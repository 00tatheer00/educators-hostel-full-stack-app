"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { User, Mail, Phone, Lock, FileText, Sparkles, ArrowRight, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

export default function RegisterPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    cnicNumber: "",
    guardianName: "",
    guardianPhone: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.error || "Failed to register account");
      } else {
        toast.success("Account registered successfully! Please log in.");
        router.push("/login");
      }
    } catch (err) {
      toast.error("An unexpected error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center px-4 py-12 relative overflow-hidden">
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[36rem] h-[36rem] bg-emerald-600/10 dark:bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

      <Card className="w-full max-w-lg rounded-3xl border border-slate-200/80 dark:border-slate-800/80 shadow-2xl bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl relative z-10">
        <CardHeader className="space-y-3 text-center pb-6">
          <div className="mx-auto w-14 h-14 rounded-2xl bg-gradient-to-br from-emerald-800 to-emerald-950 text-amber-300 font-bold flex items-center justify-center text-xl shadow-xl shadow-emerald-950/20 border border-amber-400/30">
            <Sparkles className="w-7 h-7" />
          </div>
          <div>
            <Badge variant="gold" className="mb-1 text-[10px]">Fall 2026 Admissions</Badge>
            <CardTitle className="text-2xl font-bold font-serif text-slate-900 dark:text-white">Resident Registration</CardTitle>
            <CardDescription className="text-xs text-slate-500 mt-1">
              Create an account to book your luxury room & access hostel services
            </CardDescription>
          </div>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="font-semibold text-slate-700 dark:text-slate-200">Full Name *</label>
                <Input
                  required
                  placeholder="e.g. Fatima Khan"
                  className="h-11 rounded-xl"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>
              <div className="space-y-1.5">
                <label className="font-semibold text-slate-700 dark:text-slate-200">Resident Phone *</label>
                <Input
                  required
                  placeholder="+92 300 1234567"
                  className="h-11 rounded-xl"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="font-semibold text-slate-700 dark:text-slate-200">Email Address *</label>
                <Input
                  type="email"
                  required
                  placeholder="student@example.com"
                  className="h-11 rounded-xl"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>
              <div className="space-y-1.5">
                <label className="font-semibold text-slate-700 dark:text-slate-200">Password *</label>
                <Input
                  type="password"
                  required
                  placeholder="Minimum 6 characters"
                  className="h-11 rounded-xl"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="font-semibold text-slate-700 dark:text-slate-200">CNIC / B-Form Number *</label>
              <Input
                required
                placeholder="17301-XXXXXXX-X"
                className="h-11 rounded-xl"
                value={formData.cnicNumber}
                onChange={(e) => setFormData({ ...formData, cnicNumber: e.target.value })}
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-slate-100 dark:border-slate-800">
              <div className="space-y-1.5">
                <label className="font-semibold text-slate-700 dark:text-slate-200">Father / Guardian Name *</label>
                <Input
                  required
                  placeholder="e.g. Tariq Khan"
                  className="h-11 rounded-xl"
                  value={formData.guardianName}
                  onChange={(e) => setFormData({ ...formData, guardianName: e.target.value })}
                />
              </div>
              <div className="space-y-1.5">
                <label className="font-semibold text-slate-700 dark:text-slate-200">Guardian Emergency Phone *</label>
                <Input
                  required
                  placeholder="+92 300 7654321"
                  className="h-11 rounded-xl"
                  value={formData.guardianPhone}
                  onChange={(e) => setFormData({ ...formData, guardianPhone: e.target.value })}
                />
              </div>
            </div>

            <Button
              type="submit"
              variant="emerald"
              disabled={isLoading}
              className="w-full font-bold h-12 rounded-xl text-xs shadow-lg shadow-emerald-950/20 mt-2"
            >
              {isLoading ? "Creating Account..." : "Complete Registration"}
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </form>

          <div className="mt-6 pt-6 border-t border-slate-100 dark:border-slate-800 text-center text-xs text-slate-500">
            Already have an account?{" "}
            <Link href="/login" className="text-emerald-700 dark:text-emerald-400 font-bold hover:underline">
              Sign In Here
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
