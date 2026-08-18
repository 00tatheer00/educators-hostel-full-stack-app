"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Lock, Mail, Sparkles, ArrowRight, ShieldCheck, Crown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const res = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (res?.error) {
        toast.error(res.error || "Invalid credentials");
      } else {
        toast.success("Successfully signed in!");
        router.push("/dashboard/resident");
      }
    } catch (err) {
      toast.error("An unexpected error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center px-4 py-12 relative overflow-hidden bg-[#070709]">
      {/* Background Gold Glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[32rem] h-[32rem] bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

      <Card className="w-full max-w-md rounded-3xl border border-amber-500/30 shadow-2xl bg-[#0c0c10]/95 backdrop-blur-xl relative z-10">
        <CardHeader className="space-y-3 text-center pb-6">
          <div className="mx-auto w-14 h-14 rounded-2xl bg-gradient-to-br from-[#1a1710] to-[#0a0a0e] text-amber-400 font-bold flex items-center justify-center text-xl shadow-xl shadow-amber-500/10 border border-amber-400/40">
            <Crown className="w-7 h-7 text-amber-400" />
          </div>
          <div>
            <span className="inline-flex items-center gap-1 px-3 py-0.5 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-300 text-[10px] font-bold uppercase tracking-wider mb-2">
              Secure Access
            </span>
            <CardTitle className="text-2xl font-bold font-serif text-white">Portal Sign In</CardTitle>
            <CardDescription className="text-xs text-slate-400 mt-1">
              Educator Girls Hostel • Resident & Admin Desk
            </CardDescription>
          </div>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-300">Email Address</label>
              <div className="relative">
                <Mail className="w-4 h-4 text-amber-400/80 absolute left-3.5 top-3.5" />
                <Input
                  type="email"
                  required
                  className="pl-10 h-11 rounded-xl bg-slate-950 border-amber-500/30 text-white placeholder:text-slate-500"
                  placeholder="resident@educatorhostel.pk"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <div className="flex justify-between items-center">
                <label className="text-xs font-semibold text-slate-300">Password</label>
                <a href="#" className="text-xs text-amber-400 hover:underline font-medium">
                  Forgot Password?
                </a>
              </div>
              <div className="relative">
                <Lock className="w-4 h-4 text-amber-400/80 absolute left-3.5 top-3.5" />
                <Input
                  type="password"
                  required
                  className="pl-10 h-11 rounded-xl bg-slate-950 border-amber-500/30 text-white placeholder:text-slate-500"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full font-black h-12 rounded-xl text-xs bg-gradient-to-r from-amber-500 via-amber-400 to-amber-600 text-slate-950 hover:from-amber-400 hover:to-amber-300 shadow-lg shadow-amber-500/25 mt-2"
            >
              {isLoading ? "Signing In..." : "Sign In to Portal"}
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </form>

          <div className="mt-6 pt-6 border-t border-amber-500/20 text-center text-xs text-slate-400">
            Don&apos;t have a resident account yet?{" "}
            <Link href="/register" className="text-amber-400 font-bold hover:underline">
              Register New Admission
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
