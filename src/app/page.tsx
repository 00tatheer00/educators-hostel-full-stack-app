"use client";

import Link from "next/link";
import { ShieldCheck, Bed, Sparkles, Utensils, Wifi, CheckCircle2, Star, ArrowRight, MapPin, Clock, Lock, Phone, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { formatPKR } from "@/lib/utils";
import { ROOMS_DATA } from "@/data/roomsData";
import { RoomCard } from "@/components/rooms/RoomCard";
import { useLanguage } from "@/context/LanguageContext";

export default function HomePage() {
  const { language, t } = useLanguage();
  const isUrdu = language === "ur";

  const testimonials = [
    {
      id: 1,
      name: "Dr. Maryam Khattak",
      role: "Medical Resident, KTH Peshawar",
      comment:
        "The peace and 24/7 security at Educator Girls Hostel allow me to study and rest after long hospital shifts without any stress.",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=150&q=80",
    },
    {
      id: 2,
      name: "Zainab Shah",
      role: "BS Computer Science, UoP",
      comment:
        "High-speed fiber Wi-Fi on every floor and generator backup during load shedding make studying for exams completely seamless.",
      image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=150&q=80",
    },
    {
      id: 3,
      name: "Ayesha Noor",
      role: "MBBS Student, KMU",
      comment:
        "Hygienic 3-time mess meals and dedicated female wardens. My family in Abbottabad rests easy knowing I am safe here.",
      image: "https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?auto=format&fit=crop&w=150&q=80",
    },
  ];

  return (
    <div className="space-y-20 pb-20">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-emerald-950 via-emerald-900 to-slate-950 text-white py-24 lg:py-32 px-4 sm:px-8">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#d4af37_1px,transparent_1px)] [background-size:16px_16px]"></div>

        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-900/60 border border-emerald-700/50 text-emerald-300 text-xs font-semibold backdrop-blur-sm">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>{isUrdu ? "پشاور کا نمبر 1 طالبات ہاسٹل" : "Peshawar&apos;s #1 Preferred Female Hostel"}</span>
            </div>

            <h1 className={`text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight text-white ${isUrdu ? "font-serif" : "font-serif"}`}>
              {t("heroTitle")}
            </h1>

            <p className="text-slate-300 text-base sm:text-lg max-w-2xl leading-relaxed">
              {t("heroSubtitle")}
            </p>

            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-4">
              <Link href="/rooms">
                <Button variant="gold" size="lg" className="font-semibold shadow-xl shadow-amber-500/20">
                  {t("exploreRooms")}
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
              <Link href="/amenities">
                <Button variant="outline" size="lg" className="border-emerald-700 text-emerald-100 hover:bg-emerald-900/50">
                  {t("virtualTour")}
                </Button>
              </Link>
            </div>

            {/* Metrics */}
            <div className="grid grid-cols-3 gap-4 pt-8 border-t border-emerald-800/60 max-w-lg">
              <div>
                <span className="text-2xl sm:text-3xl font-extrabold text-amber-400">100%</span>
                <p className="text-xs text-slate-400">Female Staffed</p>
              </div>
              <div>
                <span className="text-2xl sm:text-3xl font-extrabold text-amber-400">24/7</span>
                <p className="text-xs text-slate-400">Biometric Security</p>
              </div>
              <div>
                <span className="text-2xl sm:text-3xl font-extrabold text-amber-400">4.9/5</span>
                <p className="text-xs text-slate-400">Resident Rating</p>
              </div>
            </div>
          </div>

          {/* Hero Visual Card */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-emerald-800/40 bg-emerald-900/40 p-3 backdrop-blur-md">
              <img
                src="https://images.unsplash.com/photo-1598928506311-c55ded91a20c?auto=format&fit=crop&w=800&q=80"
                alt="Educator Girls Hostel Room Preview"
                className="w-full h-[400px] object-cover rounded-2xl"
              />
              <div className="absolute bottom-6 left-6 right-6 bg-slate-950/85 backdrop-blur-md p-4 rounded-xl border border-emerald-800/50 text-white flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-sm">University Road, Peshawar</h4>
                  <p className="text-xs text-slate-300">2 Mins from UoP & KMU Campus</p>
                </div>
                <Badge variant="emerald">Verified Safe</Badge>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <Badge variant="gold">{t("whyChooseUs")}</Badge>
          <h2 className="text-3xl font-bold font-serif text-slate-900 dark:text-slate-100">
            {t("unmatchedStandards")}
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-sm">
            We prioritize absolute safety, hygiene, and academic comfort for female students, medical interns, and professionals.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
          <Card className="border-slate-200 dark:border-slate-800">
            <CardContent className="p-8 space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-400 flex items-center justify-center">
                <Lock className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold font-serif">{t("safetyTitle")}</h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                {t("safetyDesc")}
              </p>
            </CardContent>
          </Card>

          <Card className="border-slate-200 dark:border-slate-800">
            <CardContent className="p-8 space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-400 flex items-center justify-center">
                <Utensils className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold font-serif">{t("messTitle")}</h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                {t("messDesc")}
              </p>
            </CardContent>
          </Card>

          <Card className="border-slate-200 dark:border-slate-800">
            <CardContent className="p-8 space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-400 flex items-center justify-center">
                <Wifi className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold font-serif">{t("powerTitle")}</h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                {t("powerDesc")}
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Featured Rooms */}
      <section className="bg-slate-100 dark:bg-slate-900 py-16 px-4 sm:px-8 border-y border-slate-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto space-y-12">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
            <div>
              <Badge variant="emerald">{t("accommodations")}</Badge>
              <h2 className="text-3xl font-bold font-serif text-slate-900 dark:text-slate-100 mt-2">
                Available Rooms & Suites
              </h2>
            </div>
            <Link href="/rooms">
              <Button variant="outline" className="border-emerald-800/30 text-emerald-950 dark:text-emerald-300">
                View All Categories
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {ROOMS_DATA.slice(0, 3).map((room) => (
              <RoomCard key={room.id} room={room} />
            ))}
          </div>
        </div>
      </section>

      {/* Resident Testimonials */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <Badge variant="gold">{t("testimonialsTitle")}</Badge>
          <h2 className="text-3xl font-bold font-serif text-slate-900 dark:text-slate-100">
            Trusted by Hundreds of Students & Parents
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
          {testimonials.map((test) => (
            <Card key={test.id} className="border-slate-200 dark:border-slate-800">
              <CardContent className="p-6 space-y-4">
                <div className="flex items-center gap-1 text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400" />
                  ))}
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed italic">
                  &ldquo;{test.comment}&rdquo;
                </p>
                <div className="flex items-center gap-3 pt-2 border-t border-slate-100 dark:border-slate-800">
                  <img src={test.image} alt={test.name} className="w-10 h-10 rounded-full object-cover" />
                  <div>
                    <h4 className="font-bold text-xs text-slate-900 dark:text-white">{test.name}</h4>
                    <p className="text-[10px] text-slate-500">{test.role}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Booking CTA Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="rounded-3xl bg-gradient-to-r from-emerald-900 via-emerald-800 to-slate-950 text-white p-10 sm:p-14 relative overflow-hidden shadow-2xl">
          <div className="max-w-2xl space-y-4 relative z-10">
            <h2 className="text-3xl sm:text-4xl font-extrabold font-serif">
              {t("ctaTitle")}
            </h2>
            <p className="text-slate-200 text-sm sm:text-base leading-relaxed">
              {t("ctaSubtitle")}
            </p>
            <div className="flex flex-wrap gap-4 pt-4">
              <Link href="/rooms">
                <Button variant="gold" size="lg" className="font-semibold">
                  {t("bookNow")}
                </Button>
              </Link>
              <a href="tel:+923001234567">
                <Button variant="outline" size="lg" className="border-white/30 text-white hover:bg-white/10">
                  <Phone className="w-4 h-4 mr-2" />
                  {t("callWarden")}
                </Button>
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
