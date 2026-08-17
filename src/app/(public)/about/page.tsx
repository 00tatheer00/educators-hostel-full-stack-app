"use client";

import { ShieldCheck, Users, Award, Heart, CheckCircle2, Star, Building2, MapPin, Sparkles } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { useLanguage } from "@/context/LanguageContext";
import { SquiggleWave, CapsulePillBar, PolkaDotGrid } from "@/components/decorative/DoodleVectors";

export default function AboutPage() {
  const { language, t } = useLanguage();
  const isUrdu = language === "ur";

  const stats = [
    { label: isUrdu ? "کل دستیاب نشستیں" : "Total Capacity", value: "100+ Beds", color: "from-pink-500 to-rose-600" },
    { label: isUrdu ? "کامیاب طالبات" : "Alumni Residents", value: "500+ Students", color: "from-indigo-500 to-purple-600" },
    { label: isUrdu ? "ریٹنگ اور رائے" : "Overall Rating", value: "4.9 / 5.0", color: "from-amber-500 to-orange-600" },
    { label: isUrdu ? "فی میل اسٹاف" : "Staff Structure", value: "100% Female", color: "from-teal-500 to-emerald-600" },
  ];

  const team = [
    {
      name: "Mrs. Shagufta Parveen",
      role: "Chief Executive Warden",
      bio: "Over 15 years of dedicated administrative experience in managing female student housing near University of Peshawar.",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80",
    },
    {
      name: "Dr. Tehmina Khattak",
      role: "Resident Student Counselor",
      bio: "Guidance counselor ensuring academic focus and supportive environment for medical and university residents.",
      image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=400&q=80",
    },
    {
      name: "Chef Nusrat Begum",
      role: "Mess Nutrition Head",
      bio: "Expert in hygienic commercial culinary management ensuring 3-time nutritious, fresh home-style meals daily.",
      image: "https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?auto=format&fit=crop&w=400&q=80",
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      {/* Saturated Header Banner */}
      <section className="relative bg-gradient-to-r from-indigo-950 via-slate-950 to-pink-950 text-white py-20 px-4 sm:px-8 overflow-hidden">
        <div className="absolute top-6 right-8 opacity-70 hidden md:block">
          <SquiggleWave color="#FF1E7A" width={140} height={28} />
        </div>
        <div className="absolute bottom-6 left-8 opacity-60 hidden md:block">
          <PolkaDotGrid rows={3} cols={6} dotColor="bg-pink-400/40" />
        </div>

        <div className="max-w-4xl mx-auto text-center space-y-4 relative z-10">
          <span className="px-4 py-1.5 rounded-full bg-pink-500/20 text-pink-300 font-extrabold text-xs uppercase tracking-wider border border-pink-400/40">
            ★ About Our Institution
          </span>
          <h1 className="text-4xl sm:text-6xl font-black font-serif tracking-tight leading-tight">
            Peshawar&apos;s Premier <br />
            <span className="text-gradient-pink">Female Student Residency</span>
          </h1>
          <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto leading-relaxed">
            {isUrdu
              ? "یونیورسٹی روڈ پشاور پر طالبات اور ملازمت پیشہ خواتین کے لیے ایک پرسکون اور محفوظ رہائشی ادارہ۔"
              : "Founded to combine luxury living and uncompromised security. Educator Girls Hostel provides a peaceful, female-managed living environment on Main University Road, Peshawar."}
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-16 space-y-16">
        {/* Stats Counter */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((s, i) => (
            <Card
              key={i}
              className="rounded-3xl border-2 border-slate-200 dark:border-slate-800 text-center shadow-xl hover:-translate-y-1.5 transition-transform bg-white dark:bg-slate-900"
            >
              <CardContent className="p-6 space-y-1">
                <span className={`text-3xl sm:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r ${s.color} font-serif`}>
                  {s.value}
                </span>
                <p className="text-xs font-bold text-slate-500 dark:text-slate-400">{s.label}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* History & Mission */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <span className="px-3.5 py-1 rounded-full bg-indigo-100 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 font-extrabold text-xs uppercase tracking-wider">
              Core Principles
            </span>
            <h2 className="text-3xl sm:text-4xl font-black font-serif text-slate-900 dark:text-white">
              Our Mission & Values
            </h2>
            <div className="space-y-4 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              <p>
                Educator Girls Hostel was founded with a singular mission: to provide female students coming to Peshawar from across KPK and Pakistan with a residence that feels as safe, warm, and supportive as their own home.
              </p>
              <div className="space-y-3 pt-2">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-pink-600 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-slate-900 dark:text-white block">Strict Female Staffing:</strong>
                    <span>Wardens, kitchen chefs, housekeepers, and counselors are 100% female.</span>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-indigo-600 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-slate-900 dark:text-white block">Academic Peace:</strong>
                    <span>Designated study hours, high-speed fiber routers, and air-conditioned quiet study lounge.</span>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-teal-600 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-slate-900 dark:text-white block">Parent Trust & Alerts:</strong>
                    <span>Digital SMS gate pass system keeps parents informed on all resident departures.</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="relative rounded-3xl overflow-hidden shadow-2xl border-2 border-pink-500/40 bg-slate-900">
            <img
              src="https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=800&q=80"
              alt="Educator Hostel Campus"
              className="rounded-2xl w-full h-96 object-cover"
            />
          </div>
        </div>

        {/* Leadership Team */}
        <div className="space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="px-3.5 py-1 rounded-full bg-pink-100 dark:bg-pink-950 text-pink-700 dark:text-pink-300 font-extrabold text-xs uppercase tracking-wider">
              Management
            </span>
            <h2 className="text-3xl font-black font-serif text-slate-900 dark:text-white">
              Hostel Management & Warden Desk
            </h2>
            <p className="text-xs text-slate-500">Dedicated female staff available 24 hours a day to support residents</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {team.map((t, idx) => (
              <Card
                key={idx}
                className="overflow-hidden rounded-3xl border-2 border-slate-200 dark:border-slate-800 text-center shadow-xl bg-white dark:bg-slate-900 hover:-translate-y-2 transition-transform"
              >
                <div className="h-56 overflow-hidden bg-slate-100">
                  <img src={t.image} alt={t.name} className="w-full h-full object-cover" />
                </div>
                <CardContent className="p-6 space-y-2">
                  <h3 className="font-bold text-lg text-slate-900 dark:text-white">{t.name}</h3>
                  <span className="inline-block px-3 py-1 rounded-full bg-pink-50 dark:bg-pink-950 text-pink-700 dark:text-pink-300 text-xs font-bold">
                    {t.role}
                  </span>
                  <p className="text-xs text-slate-500 dark:text-slate-400 pt-2 leading-relaxed">{t.bio}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
