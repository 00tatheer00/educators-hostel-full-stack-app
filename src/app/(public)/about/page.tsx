"use client";

import { ShieldCheck, Users, Award, Heart, CheckCircle2, Star, Building2, MapPin } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { useLanguage } from "@/context/LanguageContext";

export default function AboutPage() {
  const { language, t } = useLanguage();
  const isUrdu = language === "ur";

  const stats = [
    { label: isUrdu ? "کل دستیاب نشستیں" : "Total Capacity", value: "100+ Beds" },
    { label: isUrdu ? "کامیاب طالبات" : "Alumni Residents", value: "500+ Students" },
    { label: isUrdu ? "ریٹنگ اور رائے" : "Overall Rating", value: "4.9 / 5.0" },
    { label: isUrdu ? "فی میل اسٹاف" : "Staff Structure", value: "100% Female" },
  ];

  const team = [
    {
      name: "Mrs. Shagufta Parveen",
      role: "Chief Executive Warden",
      bio: "Over 15 years of administrative experience in managing female student housing near University of Peshawar.",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80",
    },
    {
      name: "Dr. Tehmina Khattak",
      role: "Resident Student Counselor",
      bio: "Guidance counselor ensuring academic environment and mental well-being for medical and university residents.",
      image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=400&q=80",
    },
    {
      name: "Chef Nusrat Begum",
      role: "Mess Nutrition Head",
      bio: "Expert in hygienic commercial cooking ensuring 3-time nutritious, fresh home-style meals daily.",
      image: "https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?auto=format&fit=crop&w=400&q=80",
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-8 py-12 space-y-16">
      {/* Title */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <Badge variant="gold">{t("about")}</Badge>
        <h1 className="text-4xl font-extrabold font-serif text-slate-900 dark:text-slate-100">
          {isUrdu ? "ایجوکیٹر گرلز ہاسٹل کے بارے میں" : "Peshawar&apos;s Premier Female Student Residency"}
        </h1>
        <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
          {isUrdu
            ? "یونیورسٹی روڈ پشاور پر طالبات اور ملازمت پیشہ خواتین کے لیے ایک پرسکون اور محفوظ رہائشی ادارہ۔"
            : "Founded to bridge the gap between luxury living and uncompromised security. Educator Girls Hostel provides a peaceful, female-managed living environment near University of Peshawar and Khyber Medical University."}
        </p>
      </div>

      {/* Stats Counter */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {stats.map((s, i) => (
          <Card key={i} className="border-slate-200 dark:border-slate-800 text-center">
            <CardContent className="p-6 space-y-1">
              <span className="text-3xl font-extrabold text-emerald-800 dark:text-emerald-400">{s.value}</span>
              <p className="text-xs font-semibold text-slate-500">{s.label}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* History & Mission */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
        <div className="space-y-6">
          <h2 className="text-3xl font-bold font-serif text-slate-900 dark:text-slate-100">
            Our Mission & Core Values
          </h2>
          <div className="space-y-4 text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
            <p>
              Educator Girls Hostel was founded with a singular mission: to provide female students coming to Peshawar from across KPK and Pakistan with a residence that feels as safe, warm, and supportive as their own home.
            </p>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <strong className="text-slate-900 dark:text-white">Strict Female Staffing:</strong> Wardens, cooks, and housekeepers are 100% female.
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <strong className="text-slate-900 dark:text-white">Academic Peace:</strong> Designated study hours and air-conditioned quiet study lounge.
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <strong className="text-slate-900 dark:text-white">Parent Trust:</strong> Digital SMS gate pass system keeps parents informed of resident leaves.
              </div>
            </div>
          </div>
        </div>

        <Card className="border-slate-200 dark:border-slate-800 p-2 overflow-hidden shadow-xl">
          <img
            src="https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=800&q=80"
            alt="Educator Hostel Campus"
            className="rounded-xl w-full h-80 object-cover"
          />
        </Card>
      </div>

      {/* Leadership & Staff Team */}
      <div className="space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <h2 className="text-2xl font-bold font-serif text-slate-900 dark:text-slate-100">
            Hostel Management Team
          </h2>
          <p className="text-xs text-slate-500">Dedicated female staff available 24 hours a day to assist residents</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {team.map((t, idx) => (
            <Card key={idx} className="overflow-hidden border-slate-200 dark:border-slate-800 text-center">
              <div className="h-48 overflow-hidden bg-slate-100">
                <img src={t.image} alt={t.name} className="w-full h-full object-cover" />
              </div>
              <CardContent className="p-6 space-y-2">
                <h3 className="font-bold text-base text-slate-900 dark:text-slate-100">{t.name}</h3>
                <Badge variant="gold" className="text-[10px]">{t.role}</Badge>
                <p className="text-xs text-slate-500 pt-2">{t.bio}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
