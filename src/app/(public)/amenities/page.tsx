"use client";

import { ShieldCheck, Utensils, Wifi, Lock, Zap, BookOpen, Shirt, Sparkles, HeartHandshake, CheckCircle2, Coffee, Sun, Heart, Award } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { useLanguage } from "@/context/LanguageContext";
import { SquiggleWave, CapsulePillBar, PolkaDotGrid, MultiLayerWaveTop, TargetRings } from "@/components/decorative/DoodleVectors";

export default function AmenitiesPage() {
  const { language, t } = useLanguage();
  const isUrdu = language === "ur";

  const categories = [
    {
      id: "security",
      title: isUrdu ? "سیکیورٹی اور تحفظ" : "5-Star Security & Gate Control",
      icon: ShieldCheck,
      color: "from-pink-500 to-rose-600",
      textColor: "text-pink-600 dark:text-pink-400",
      borderColor: "border-pink-200 dark:border-pink-900/40",
      description: isUrdu ? "طالبات کے مکمل تحفظ کے لیے سخت سیکیورٹی انتظام" : "Strict security infrastructure engineered for female safety and parental peace of mind.",
      items: [
        "Biometric gate pass entry & exit tracking with timestamping",
        "24/7 High-definition CCTV surveillance across all corridors & gates",
        "Dedicated round-the-clock female wardens & support staff",
        "High perimeter boundary wall with security guards",
        "Digital SMS alert system for parent gate pass approvals & departures",
      ],
    },
    {
      id: "dining",
      title: isUrdu ? "کھانا اور مائس ڈائننگ" : "Nutritious 3-Time Mess Facility",
      icon: Utensils,
      color: "from-amber-500 to-orange-600",
      textColor: "text-amber-600 dark:text-amber-400",
      borderColor: "border-amber-200 dark:border-amber-900/40",
      description: isUrdu ? "گھر جیسا لذیذ اور حفظان صحت کے مطابق کھانا" : "Hygienically prepared fresh meals tailored for student health and energy.",
      items: [
        "3-Time daily nutritious fresh meals (Breakfast, Lunch, Dinner)",
        "Evening tea & fresh snacks included every single day",
        "Weekly rotatory menu (Chicken Biryani, Karahi, Pulses, Vegetables, Kheer)",
        "Filtered mineral drinking water dispenser on all floors",
        "Hygienic commercial stainless steel kitchen supervised by female chefs",
      ],
    },
    {
      id: "utilities",
      title: isUrdu ? "بجلی اور تیز ترین انٹرنیٹ" : "Uninterrupted Power & Fiber Wi-Fi",
      icon: Zap,
      color: "from-teal-500 to-emerald-600",
      textColor: "text-teal-600 dark:text-teal-400",
      borderColor: "border-teal-200 dark:border-teal-900/40",
      description: isUrdu ? "بلا تعطل بجلی اور ریسرچ کے لیے تیز رفتار انٹرنیٹ" : "Continuous electricity supply and high-speed fiber internet for uninterrupted studying.",
      items: [
        "Heavy duty automatic diesel generator & solar UPS electricity backup",
        "Dual high-speed fiber Wi-Fi routers on every floor",
        "Split Air Conditioners & DC Inverters in rooms",
        "Instant gas & electric water geysers for winter hot water",
      ],
    },
    {
      id: "common",
      title: isUrdu ? "مشترکہ مطالعہ روم اور سہولیات" : "Study Lounges & Wellness Facilities",
      icon: BookOpen,
      color: "from-indigo-500 to-purple-600",
      textColor: "text-indigo-600 dark:text-indigo-400",
      borderColor: "border-indigo-200 dark:border-indigo-900/40",
      description: isUrdu ? "پر سکون ماحول اور سہولیات" : "Academic peace, quiet library study halls, and laundry services.",
      items: [
        "Air-conditioned quiet study lounge with individual lamps & charging docks",
        "Dedicated quiet prayer & Quran recitation room",
        "Automatic washing machines, spinners & steam iron stations",
        "Daily room housekeeping & trash clearance by female cleaners",
        "Spacious rooftop sunset garden & relaxation terrace",
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      {/* Saturated Banner Header */}
      <section className="relative bg-gradient-to-r from-indigo-950 via-slate-950 to-pink-950 text-white py-20 px-4 sm:px-8 overflow-hidden">
        <div className="absolute top-6 right-10 opacity-70 hidden md:block">
          <SquiggleWave color="#FF1E7A" width={140} height={28} />
        </div>
        <div className="absolute bottom-6 left-10 opacity-60 hidden md:block">
          <PolkaDotGrid rows={3} cols={6} dotColor="bg-cyan-400/40" />
        </div>

        <div className="max-w-4xl mx-auto text-center space-y-4 relative z-10">
          <span className="px-4 py-1.5 rounded-full bg-pink-500/20 text-pink-300 font-extrabold text-xs uppercase tracking-wider border border-pink-400/40">
            ★ 5-Star Living Standard
          </span>
          <h1 className="text-4xl sm:text-6xl font-black font-serif tracking-tight leading-tight">
            Comprehensive <span className="text-gradient-pink">Hostel Amenities</span>
          </h1>
          <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto leading-relaxed">
            {isUrdu
              ? "ہمارا ہاسٹل طالبات کو پڑھائی اور رہائش کے لیے تمام تر پریمیم سہولیات فراہم کرتا ہے۔"
              : "Every single amenity at Educator Girls Hostel is designed to combine academic peace, maximum security, and homely comfort."}
          </p>
        </div>
      </section>

      {/* Categories Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8 py-16 space-y-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {categories.map((cat) => (
            <Card
              key={cat.id}
              className={`rounded-3xl border-2 ${cat.borderColor} shadow-xl hover:shadow-2xl transition-all duration-300 bg-white dark:bg-slate-900 overflow-hidden hover:-translate-y-1.5`}
            >
              <CardHeader className="flex flex-row items-center gap-4 space-y-0 p-6 sm:p-8 pb-4 border-b border-slate-100 dark:border-slate-800">
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-tr ${cat.color} text-white flex items-center justify-center shadow-lg`}>
                  <cat.icon className="w-7 h-7" />
                </div>
                <div>
                  <CardTitle className="text-xl font-black font-serif text-slate-900 dark:text-white">
                    {cat.title}
                  </CardTitle>
                  <CardDescription className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                    {cat.description}
                  </CardDescription>
                </div>
              </CardHeader>
              <CardContent className="p-6 sm:p-8 space-y-3.5">
                {cat.items.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-3 text-xs sm:text-sm text-slate-700 dark:text-slate-300 font-medium">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </div>
                ))}
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}
