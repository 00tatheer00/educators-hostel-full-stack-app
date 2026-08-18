"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Lock, Mail, User, Sparkles, ArrowRight, ShieldCheck, Crown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { Logo } from "@/components/common/Logo";
import { loginWithGoogle } from "@/lib/firebase";

export default function StudentLoginPage() {
  const router = useRouter();
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);

  const handleStudentLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      toast.success("Welcome back to your resident portal!");
      router.push("/dashboard/resident");
    }, 600);
  };

  const handleGoogleSignIn = async () => {
    setIsGoogleLoading(true);
    try {
      const res = await loginWithGoogle();
      if (res.user) {
        toast.success(`Signed in as ${res.user.displayName || res.user.email}!`);
        router.push("/dashboard/resident");
      } else {
        toast.error(res.error || "Google Sign-in failed");
      }
    } catch (e: any) {
      toast.error("Google authentication error.");
    } finally {
      setIsGoogleLoading(false);
    }
  };

  const handleDemoStudent = () => {
    setIdentifier("fatima.khan@gmail.com");
    setPassword("residentPass2026");
    toast.info("Demo Student credentials loaded! Click 'Sign In' to enter.");
  };

  return (
    <div className="min-h-[88vh] flex items-center justify-center px-4 py-12 relative overflow-hidden bg-[#07070a]">
      {/* Ambient Glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[30rem] h-[30rem] bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

      <Card className="w-full max-w-md rounded-3xl border border-amber-500/30 shadow-2xl bg-[#0c0c10]/95 backdrop-blur-2xl relative z-10">
        <CardHeader className="space-y-4 text-center pb-6 border-b border-amber-500/15">
          <div className="flex justify-center">
            <Logo variant="dark" size={72} showText={false} priority />
          </div>
          <div>
            <span className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-300 text-[10px] font-bold uppercase tracking-wider mb-2">
              <User className="w-3.5 h-3.5 text-amber-400" />
              Resident Student Portal
            </span>
            <h1 className="text-2xl font-bold font-serif text-white">Student Sign In</h1>
            <p className="text-xs text-slate-400 mt-1">
              Access your room details, mess menu, gate passes & fee invoices
            </p>
          </div>
        </CardHeader>

        <CardContent className="pt-6 space-y-5">
          {/* Quick Demo Student Access */}
          <div className="p-3 rounded-2xl bg-amber-500/10 border border-amber-500/25 flex items-center justify-between gap-2 text-xs">
            <div className="flex items-center gap-2 text-amber-300">
              <Sparkles className="w-4 h-4 text-amber-400 shrink-0" />
              <span className="font-medium text-[11px]">Instant Student Demo?</span>
            </div>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={handleDemoStudent}
              className="text-[10px] font-bold h-7 px-2.5 border-amber-500/40 bg-amber-500/20 text-amber-300 hover:bg-amber-500 hover:text-slate-950"
            >
              Load Fatima Khan
            </Button>
          </div>

          {/* Google Sign-in Button */}
          <Button
            type="button"
            variant="outline"
            onClick={handleGoogleSignIn}
            disabled={isGoogleLoading}
            className="w-full h-11 rounded-xl border-slate-800 bg-slate-950/80 hover:bg-slate-900 text-white text-xs font-semibold flex items-center justify-center gap-2.5 transition-all hover:border-amber-500/40"
          >
            <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
              />
            </svg>
            <span>{isGoogleLoading ? "Connecting with Google..." : "Sign in with Google"}</span>
          </Button>

          <div className="relative my-2">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-amber-500/15" />
            </div>
            <div className="relative flex justify-center text-[10px] uppercase">
              <span className="bg-[#0c0c10] px-3 text-slate-500 font-bold tracking-wider">
                Or with hostel credentials
              </span>
            </div>
          </div>

          <form onSubmit={handleStudentLogin} className="space-y-4 text-xs">
            <div className="space-y-1.5">
              <label className="font-semibold text-slate-300 flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5 text-amber-400" />
                <span>Student Email / CNIC Number</span>
              </label>
              <Input
                type="text"
                required
                placeholder="e.g. fatima@example.com or 17301-XXXXXXX-X"
                className="h-11 rounded-xl bg-slate-950 border-amber-500/30 text-white placeholder:text-slate-500 focus-visible:ring-amber-500"
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
              />
            </div>

            <div className="space-y-1.5">
              <div className="flex justify-between items-center">
                <label className="font-semibold text-slate-300 flex items-center gap-1.5">
                  <Lock className="w-3.5 h-3.5 text-amber-400" />
                  <span>Password</span>
                </label>
                <a href="#" className="text-[11px] text-amber-400 hover:underline font-medium">
                  Forgot Password?
                </a>
              </div>
              <Input
                type="password"
                required
                placeholder="••••••••"
                className="h-11 rounded-xl bg-slate-950 border-amber-500/30 text-white placeholder:text-slate-500 focus-visible:ring-amber-500"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full font-black h-12 rounded-xl text-xs bg-gradient-to-r from-amber-500 via-amber-400 to-amber-600 text-slate-950 hover:from-amber-400 hover:to-amber-300 shadow-xl shadow-amber-500/25 mt-2"
            >
              {isLoading ? "Signing in..." : "Sign In to Resident Dashboard"}
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </form>

          {/* Additional Links & Admin Switch */}
          <div className="space-y-3 pt-4 border-t border-amber-500/15 text-xs text-slate-400">
            <div className="flex items-center justify-between">
              <span>New student admission?</span>
              <Link href="/booking" className="text-amber-400 font-bold hover:underline">
                Book Room Online →
              </Link>
            </div>
            <div className="flex items-center justify-between">
              <span>Hostel Staff / Warden?</span>
              <Link
                href="/admin/login"
                className="text-amber-300 font-bold hover:underline inline-flex items-center gap-1"
              >
                <Crown className="w-3 h-3 text-amber-400" />
                <span>Admin Login Desk →</span>
              </Link>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
