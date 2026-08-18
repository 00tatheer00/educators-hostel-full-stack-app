"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { User, Mail, Phone, Lock, FileText, Sparkles, ArrowRight, ShieldCheck, Crown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { Logo } from "@/components/common/Logo";

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
    <div className="min-h-[85vh] flex items-center justify-center px-4 py-12 relative overflow-hidden bg-[#070709]">
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[36rem] h-[36rem] bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

      <Card className="w-full max-w-lg rounded-3xl border border-amber-500/30 shadow-2xl bg-[#0c0c10]/95 backdrop-blur-xl relative z-10">
        <CardHeader className="space-y-4 text-center pb-6">
          <div className="flex justify-center">
            <Logo variant="dark" size={80} showText={false} priority />
          </div>
          <div>
            <span className="inline-flex items-center gap-1 px-3 py-0.5 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-300 text-[10px] font-bold uppercase tracking-wider mb-2">
              Fall 2026 Admissions Open
            </span>
            <CardTitle className="text-2xl font-bold font-serif text-white">Resident Registration</CardTitle>
            <CardDescription className="text-xs text-slate-400 mt-1">
              Create an account to book your luxury room & access hostel services
            </CardDescription>
          </div>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="font-semibold text-slate-300">Full Name *</label>
                <Input
                  required
                  placeholder="e.g. Fatima Khan"
                  className="h-11 rounded-xl bg-slate-950 border-amber-500/30 text-white placeholder:text-slate-500"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>
              <div className="space-y-1.5">
                <label className="font-semibold text-slate-300">Resident Phone *</label>
                <Input
                  required
                  placeholder="+92 300 1234567"
                  className="h-11 rounded-xl bg-slate-950 border-amber-500/30 text-white placeholder:text-slate-500"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="font-semibold text-slate-300">Email Address *</label>
                <Input
                  type="email"
                  required
                  placeholder="student@example.com"
                  className="h-11 rounded-xl bg-slate-950 border-amber-500/30 text-white placeholder:text-slate-500"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>
              <div className="space-y-1.5">
                <label className="font-semibold text-slate-300">Password *</label>
                <Input
                  type="password"
                  required
                  placeholder="Minimum 6 characters"
                  className="h-11 rounded-xl bg-slate-950 border-amber-500/30 text-white placeholder:text-slate-500"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="font-semibold text-slate-300">CNIC / B-Form Number *</label>
              <Input
                required
                placeholder="17301-XXXXXXX-X"
                className="h-11 rounded-xl bg-slate-950 border-amber-500/30 text-white placeholder:text-slate-500"
                value={formData.cnicNumber}
                onChange={(e) => setFormData({ ...formData, cnicNumber: e.target.value })}
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-amber-500/20">
              <div className="space-y-1.5">
                <label className="font-semibold text-slate-300">Father / Guardian Name *</label>
                <Input
                  required
                  placeholder="e.g. Tariq Khan"
                  className="h-11 rounded-xl bg-slate-950 border-amber-500/30 text-white placeholder:text-slate-500"
                  value={formData.guardianName}
                  onChange={(e) => setFormData({ ...formData, guardianName: e.target.value })}
                />
              </div>
              <div className="space-y-1.5">
                <label className="font-semibold text-slate-300">Guardian Emergency Phone *</label>
                <Input
                  required
                  placeholder="+92 300 7654321"
                  className="h-11 rounded-xl bg-slate-950 border-amber-500/30 text-white placeholder:text-slate-500"
                  value={formData.guardianPhone}
                  onChange={(e) => setFormData({ ...formData, guardianPhone: e.target.value })}
                />
              </div>
            </div>

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full font-black h-12 rounded-xl text-xs bg-gradient-to-r from-amber-500 via-amber-400 to-amber-600 text-slate-950 hover:from-amber-400 hover:to-amber-300 shadow-lg shadow-amber-500/25 mt-2"
            >
              {isLoading ? "Creating Account..." : "Complete Registration"}
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </form>

          <div className="mt-6 pt-6 border-t border-amber-500/20 text-center text-xs text-slate-400">
            Already have an account?{" "}
            <Link href="/login" className="text-amber-400 font-bold hover:underline">
              Sign In Here
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
