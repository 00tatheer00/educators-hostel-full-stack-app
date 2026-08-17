"use client";

import Link from "next/link";
import Image from "next/image";
import React, { useState } from "react";
import { 
  ShieldCheck, 
  Utensils, 
  Zap, 
  Wifi, 
  Star, 
  ArrowRight, 
  CheckCircle2, 
  Clock, 
  MapPin, 
  Sparkles, 
  Bed, 
  Users, 
  Phone, 
  ChevronRight,
  Heart,
  FileCheck,
  Coffee,
  Check,
  HelpCircle,
  Camera,
  Play,
  Calendar,
  Lock,
  MessageCircle,
  Layers,
  Award,
  Sun,
  BookOpen
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { ROOMS_DATA, RoomItem } from "@/data/roomsData";
import { formatPKR } from "@/lib/utils";
import { useLanguage } from "@/context/LanguageContext";
import { 
  SquiggleWave, 
  CapsulePillBar, 
  PolkaDotGrid, 
  TargetRings, 
  DoodleCrossMarks, 
  RotatingBadgeRing, 
  StudyLampDoodle, 
  BookshelfDoodle, 
  CactusPlantDoodle, 
  MultiLayerWaveTop, 
  MultiLayerWaveBottom 
} from "@/components/decorative/DoodleVectors";

export default function HomePage() {
  const { t, language } = useLanguage();
  const isUrdu = language === "ur";

  // Interactive State
  const [selectedDay, setSelectedDay] = useState("Monday");
  const [stayDuration, setStayDuration] = useState("6");
  const [selectedRoomType, setSelectedRoomType] = useState("double-deluxe");
  const [activeGalleryTab, setActiveGalleryTab] = useState("all");
  const [selectedRoomFilter, setSelectedRoomFilter] = useState("ALL");
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [selectedPhoto, setSelectedPhoto] = useState<string | null>(null);

  // 7-Day Delicious Mess Menu
  const weeklyMenu: Record<string, { breakfast: string; lunch: string; dinner: string; special: string }> = {
    Monday: {
      breakfast: "Halwa Puri, Crispy Chana Masala, Milk Tea / Karak Chai",
      lunch: "Daal Chawal with Fresh Mint Raita, Salad & Pickles",
      dinner: "Chicken Karahi with Tandoori Naan, Salad & Special Kheer",
      special: "Fresh Fruit Bowl",
    },
    Tuesday: {
      breakfast: "Desi Ghee Omelette, Crispy Paratha, Butter, Karak Chai",
      lunch: "Aloo Palak / Mix Vegetable Curry & Whole Wheat Chapati",
      dinner: "Special Chicken Biryani with Mint Raita & Fresh Salad",
      special: "Cold Mint Margarita",
    },
    Wednesday: {
      breakfast: "Fried Eggs, Toast, Jam, Butter, Milk Tea / Nescafe Coffee",
      lunch: "Lobia (Red Kidney Beans) Curry with Steamed Zeera Rice",
      dinner: "Chicken Qorma with Fresh Hot Chapati & Fruit Custard",
      special: "Custard Dessert",
    },
    Thursday: {
      breakfast: "Aloo Cheese Paratha with Mint Yogurt & Karak Chai",
      lunch: "Kadhi Pakora with Steamed Basmati Rice & Salad",
      dinner: "Special Peshawari Chicken Nihari with Lemon, Ginger & Naan",
      special: "Green Tea & Gurr",
    },
    Friday: {
      breakfast: "Special French Toast, Boiled Eggs & Cardamom Tea",
      lunch: "Special Hyderabadi Chicken Biryani with Raita & Soft Drink",
      dinner: "Chicken White Handi with Fresh Tandoori Naan & Salad",
      special: "Friday Juma Special Soda",
    },
    Saturday: {
      breakfast: "Scrambled Eggs with Herbs, Paratha & Sweet Milk Tea",
      lunch: "Daal Makhani with Steamed Rice, Salad & Mixed Pickles",
      dinner: "Chicken Jalfrezi / Roast with Vegetable Fried Rice",
      special: "Ice Cream Scoop",
    },
    Sunday: {
      breakfast: "Peshawari Nihari / Halwa Chana & Special Karak Chai",
      lunch: "Chef Special Pasta, Vegetable Pulao & Salad",
      dinner: "Chicken Tikka Boti Gravy with Hot Paratha Rolls & Sweet Dish",
      special: "Chef's Surprise Dessert",
    },
  };

  // Gallery Photos
  const galleryItems = [
    {
      id: 1,
      category: "rooms",
      title: "Single Executive Suite",
      tag: "Master Bedroom",
      src: "https://images.unsplash.com/photo-1598928506311-c55ded91a20c?auto=format&fit=crop&w=800&q=80",
    },
    {
      id: 2,
      category: "rooms",
      title: "Deluxe Double Sharing",
      tag: "Spacious Layout",
      src: "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&w=800&q=80",
    },
    {
      id: 3,
      category: "study",
      title: "24/7 Silent Study Lounge",
      tag: "High Speed WiFi",
      src: "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&w=800&q=80",
    },
    {
      id: 4,
      category: "dining",
      title: "Hygienic Mess Dining Hall",
      tag: "Fresh Meals 3x Daily",
      src: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80",
    },
    {
      id: 5,
      category: "rooms",
      title: "Triple Economy Room",
      tag: "Budget Friendly",
      src: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=800&q=80",
    },
    {
      id: 6,
      category: "lifestyle",
      title: "Rooftop Sunset Terrace",
      tag: "Recreation Area",
      src: "https://images.unsplash.com/photo-1540518614846-7eded433c457?auto=format&fit=crop&w=800&q=80",
    },
  ];

  const filteredGallery = activeGalleryTab === "all" 
    ? galleryItems 
    : galleryItems.filter(item => item.category === activeGalleryTab);

  // FAQs
  const faqs = [
    {
      q: "What is included in the monthly hostel rent?",
      a: "Everything is fully covered! Your monthly rent includes 3-time freshly cooked mess meals, continuous generator and UPS backup electricity (zero load shedding), high-speed fiber Wi-Fi on every floor, 24/7 biometric security, daily room cleaning, and hot water geysers.",
    },
    {
      q: "What are the hostel gate timings and security protocols?",
      a: "For the safety of all residents, main hostel gates open at 06:00 AM and close at 09:30 PM (extended for medical officers/doctors on night hospital duties with prior authorization). Electronic gate passes send instant SMS confirmations to parents upon check-in and check-out.",
    },
    {
      q: "How far is Educator Girls Hostel from University of Peshawar & KMU?",
      a: "We are located directly on Main University Road! We are a 2-minute walk from University of Peshawar campus, 4 minutes from Khyber Medical University (KMU), 5 minutes from Khyber Teaching Hospital (KTH), and 1 minute from the nearest BRT station.",
    },
    {
      q: "Are the kitchen mess and hostel staff entirely female?",
      a: "Yes, 100%! All resident wardens, supervisors, and internal mess cooks are dedicated female staff. Boundary security is maintained by licensed 24/7 guards outside the main gate with full CCTV monitoring.",
    },
    {
      q: "Can I book a room online and what is the security deposit?",
      a: "Yes, you can easily reserve your bed online by choosing your room type and duration. A refundable security deposit is submitted upon check-in and returned in full at the conclusion of your stay.",
    },
  ];

  // Testimonials
  const testimonials = [
    {
      id: 1,
      name: "Dr. Maryam Khattak",
      role: "Medical Resident, KTH Peshawar",
      badge: "Verified Resident (1.5 Years)",
      comment:
        "The peace, quiet study environment, and 24/7 security at Educator Girls Hostel allow me to study and rest after intense hospital shifts without any anxiety. Mess food is hygienic and tastes just like home.",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80",
    },
    {
      id: 2,
      name: "Zainab Shah",
      role: "BS Computer Science, UoP",
      badge: "CS Student (2nd Year)",
      comment:
        "High-speed fiber Wi-Fi in every room and seamless generator backup during load shedding make studying for exams and remote coding assignments completely uninterrupted!",
      image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=200&q=80",
    },
    {
      id: 3,
      name: "Mrs. Farzana Tariq",
      role: "Parent from Abbottabad",
      badge: "Parent Review",
      comment:
        "As a mother sending her daughter to Peshawar for MBBS, safety was my #1 concern. The biometric SMS alert system and loving female wardens give our entire family total peace of mind.",
      image: "https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?auto=format&fit=crop&w=200&q=80",
    },
  ];

  // Rent Estimator Logic
  const getEstimatedRent = () => {
    const room = ROOMS_DATA.find((r: RoomItem) => r.id === selectedRoomType) || ROOMS_DATA[1];
    const months = Number(stayDuration);
    const rent = room.monthlyRentPKR * months;
    const total = rent + room.securityDepositPKR;
    return { rent, deposit: room.securityDepositPKR, total, monthly: room.monthlyRentPKR };
  };

  const estimate = getEstimatedRent();

  // Filtered Rooms
  const displayedRooms = selectedRoomFilter === "ALL" 
    ? ROOMS_DATA 
    : ROOMS_DATA.filter(r => r.roomType === selectedRoomFilter);

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 overflow-hidden selection:bg-pink-500 selection:text-white">
      {/* -------------------------------------------------------------------- */}
      {/* 1. HERO SECTION (High-Energy, Saturated Vector Doodles & Waves)       */}
      {/* -------------------------------------------------------------------- */}
      <section className="relative overflow-hidden bg-gradient-to-b from-indigo-950 via-slate-950 to-slate-900 text-white pt-10 pb-20 px-4 sm:px-8">
        {/* Ambient Glowing Orbs */}
        <div className="absolute top-12 left-10 w-96 h-96 bg-pink-500/20 rounded-full blur-3xl pointer-events-none animate-float" />
        <div className="absolute bottom-10 right-10 w-[30rem] h-[30rem] bg-indigo-500/25 rounded-full blur-3xl pointer-events-none animate-float-reverse" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-teal-500/15 rounded-full blur-3xl pointer-events-none" />

        {/* Decorative Vector Doodles floating in background */}
        <div className="absolute top-8 right-12 hidden lg:block opacity-80">
          <SquiggleWave color="#FF1E7A" width={140} height={28} className="animate-pulse" />
        </div>
        <div className="absolute top-24 left-8 hidden lg:block opacity-60">
          <PolkaDotGrid rows={4} cols={5} dotColor="bg-cyan-400/40" />
        </div>
        <div className="absolute bottom-28 left-16 hidden lg:block opacity-70">
          <CapsulePillBar color="from-pink-500 to-rose-500" width="w-32" height="h-4" rotate="-rotate-12" />
        </div>
        <div className="absolute bottom-36 right-20 hidden lg:block opacity-70">
          <DoodleCrossMarks />
        </div>

        <div className="relative max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center z-10">
          {/* Hero Left Content */}
          <div className="lg:col-span-7 space-y-7 text-center lg:text-left">
            {/* Saturated Announcement Pill */}
            <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-gradient-to-r from-pink-500/20 via-indigo-500/20 to-teal-500/20 border-2 border-pink-400/50 text-pink-300 backdrop-blur-xl shadow-lg shadow-pink-950/40">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-pink-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-pink-500"></span>
              </span>
              <span className="text-xs font-black tracking-wider uppercase text-white">
                ★ Peshawar&apos;s #1 Luxury Female Hostel
              </span>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-pink-600 text-white font-bold">
                Fall 2026 Open
              </span>
            </div>

            {/* Main Punchy Display Headline */}
            <div className="space-y-3">
              <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black font-serif tracking-tight leading-[1.08] text-white">
                Academic Peace, <br className="hidden sm:inline" />
                <span className="highlight-pill-pink px-4 py-1 rounded-2xl mx-1 inline-block rotate-[-1.5deg] shadow-2xl">
                  5-Star Safety
                </span>
                <br />
                <span className="text-gradient-cyan">& Homely Comfort.</span>
              </h1>

              <p className="text-base sm:text-lg text-slate-300 max-w-2xl font-normal leading-relaxed pt-2">
                Peshawar&apos;s most prestigious hostel for medical interns, university students, and working women on <span className="text-amber-300 font-semibold underline decoration-wavy">Main University Road</span>. 100% female-supervised with 3-time nutritious mess meals and zero load shedding.
              </p>
            </div>

            {/* Quick Metrics Bar with Saturated Badges */}
            <div className="grid grid-cols-3 gap-3 sm:gap-4 pt-2 max-w-lg mx-auto lg:mx-0">
              <div className="p-3.5 rounded-2xl bg-white/10 border-2 border-pink-500/30 backdrop-blur-xl hover:scale-105 transition-transform">
                <div className="text-2xl sm:text-3xl font-black text-pink-400 font-serif">100%</div>
                <div className="text-[11px] text-slate-200 font-bold">Female Staff & Wardens</div>
              </div>
              <div className="p-3.5 rounded-2xl bg-white/10 border-2 border-teal-500/30 backdrop-blur-xl hover:scale-105 transition-transform">
                <div className="text-2xl sm:text-3xl font-black text-teal-300 font-serif">24/7</div>
                <div className="text-[11px] text-slate-200 font-bold">Biometrics & CCTV</div>
              </div>
              <div className="p-3.5 rounded-2xl bg-white/10 border-2 border-amber-500/30 backdrop-blur-xl hover:scale-105 transition-transform">
                <div className="text-2xl sm:text-3xl font-black text-amber-300 font-serif">3x Daily</div>
                <div className="text-[11px] text-slate-200 font-bold">Fresh Mess Meals</div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-4 justify-center lg:justify-start pt-2">
              <Link href="/rooms">
                <Button
                  size="lg"
                  className="font-black text-sm px-8 h-14 rounded-2xl bg-gradient-to-r from-pink-500 via-rose-500 to-indigo-600 hover:from-pink-600 hover:to-indigo-700 text-white shadow-2xl shadow-pink-500/40 hover:scale-105 active:scale-95 transition-all duration-300 border border-white/30"
                >
                  <Bed className="w-5 h-5 mr-2" />
                  Explore Luxury Rooms
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>

              <Link href="/amenities">
                <Button
                  variant="outline"
                  size="lg"
                  className="border-2 border-white/30 hover:bg-white/15 text-white font-bold text-sm px-7 h-14 rounded-2xl backdrop-blur-xl hover:scale-105 transition-all"
                >
                  <ShieldCheck className="w-5 h-5 mr-2 text-teal-300" />
                  View Facilities & Security
                </Button>
              </Link>
            </div>
          </div>

          {/* Hero Right Visual Showcase & Live Rent Estimator Card */}
          <div className="lg:col-span-5 space-y-6 relative">
            {/* 360° Rotating Badge Ring Top Right */}
            <div className="absolute -top-10 -right-6 z-20 hidden sm:block">
              <RotatingBadgeRing size={120} />
            </div>

            {/* Doodle Lamp & Bookshelf Decor around visual */}
            <div className="absolute -top-12 -left-6 z-20 hidden sm:block opacity-90">
              <StudyLampDoodle className="text-cyan-400" stroke="#38BDF8" />
            </div>

            {/* Main Visual Image Card */}
            <div className="relative rounded-3xl overflow-hidden shadow-2xl shadow-black/80 border-2 border-pink-500/40 group bg-slate-900">
              <div className="relative h-72 sm:h-80 w-full overflow-hidden">
                <Image
                  src="/images/hostel-room-luxury.jpg"
                  alt="Educator Girls Hostel Peshawar Luxury Suite"
                  fill
                  priority
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/25 to-transparent" />
                
                {/* Floating Badges on Photo */}
                <div className="absolute top-4 right-4 z-10">
                  <span className="px-3 py-1.5 rounded-full bg-pink-600 text-white font-black text-xs shadow-lg flex items-center gap-1 border border-white/30 animate-pulse">
                    ⭐ 4.9/5 Rating (120+ Reviews)
                  </span>
                </div>

                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded-full bg-teal-500 text-slate-950">
                      Verified Safety
                    </span>
                    <span className="text-xs text-amber-300 font-semibold">
                      Main University Road, Peshawar
                    </span>
                  </div>
                  <h3 className="text-xl font-bold font-serif mt-1">
                    Executive Master Bedroom with Attached Bath
                  </h3>
                </div>
              </div>
            </div>

            {/* Live Instant Rent Estimator Card */}
            <div className="p-6 rounded-3xl bg-white/10 dark:bg-slate-900/90 border-2 border-indigo-500/40 backdrop-blur-2xl shadow-2xl space-y-4">
              <div className="flex items-center justify-between border-b border-white/15 pb-3">
                <span className="font-black text-sm text-pink-300 flex items-center gap-2">
                  <Zap className="w-4 h-4 text-pink-400 animate-pulse" />
                  Live Rent & Availability Estimator
                </span>
                <span className="text-[11px] text-teal-300 bg-teal-950/80 px-3 py-1 rounded-full border border-teal-500/40 font-bold">
                  ● 4 Beds Remaining
                </span>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-[11px] text-slate-300 font-bold">Select Room Type</label>
                  <select
                    value={selectedRoomType}
                    onChange={(e) => setSelectedRoomType(e.target.value)}
                    className="w-full h-11 rounded-2xl bg-slate-950/80 border border-white/20 px-3 text-xs text-white focus:outline-none focus:ring-2 focus:ring-pink-500"
                  >
                    <option value="single-exec">Single Executive Master</option>
                    <option value="double-deluxe">Deluxe Double Sharing</option>
                    <option value="triple-sharing">Triple Economy Sharing</option>
                    <option value="quad-budget">Quad Student Sharing</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] text-slate-300 font-bold">Stay Duration</label>
                  <select
                    value={stayDuration}
                    onChange={(e) => setStayDuration(e.target.value)}
                    className="w-full h-11 rounded-2xl bg-slate-950/80 border border-white/20 px-3 text-xs text-white focus:outline-none focus:ring-2 focus:ring-pink-500"
                  >
                    <option value="1">1 Month</option>
                    <option value="3">3 Months (Semester)</option>
                    <option value="6">6 Months (Half Year)</option>
                    <option value="12">12 Months (Full Year)</option>
                  </select>
                </div>
              </div>

              <div className="p-3.5 rounded-2xl bg-gradient-to-r from-indigo-950/80 to-pink-950/80 border border-pink-500/30 flex justify-between items-center">
                <div>
                  <span className="text-[10px] text-slate-300 block font-medium">Monthly Rent (3x Mess Included)</span>
                  <span className="text-xl font-black text-amber-300">{formatPKR(estimate.monthly)} / mo</span>
                </div>
                <Link href={`/booking?roomId=${selectedRoomType}&duration=${stayDuration}`}>
                  <Button
                    size="sm"
                    className="font-black text-xs rounded-xl bg-pink-600 hover:bg-pink-700 text-white shadow-lg shadow-pink-600/30"
                  >
                    Reserve Online →
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Wave Transition Bottom of Hero */}
      <MultiLayerWaveBottom
        colorTop="#0f172a"
        colorMid="#FF1E7A"
        colorBottom="#f8fafc"
        className="-mt-1"
      />

      {/* -------------------------------------------------------------------- */}
      {/* 2. THE 4 PILLARS OF EXCELLENCE (Vibrant Cards with Saturated Glow)    */}
      {/* -------------------------------------------------------------------- */}
      <section className="py-12 px-4 sm:px-8 max-w-7xl mx-auto w-full -mt-10 z-20">
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-10">
          <span className="px-4 py-1.5 rounded-full bg-pink-100 dark:bg-pink-950/60 text-pink-700 dark:text-pink-300 font-extrabold text-xs uppercase tracking-wider border border-pink-300 dark:border-pink-800">
            ★ Why Hundreds of Families Trust Us
          </span>
          <h2 className="text-3xl sm:text-4xl font-black font-serif text-slate-900 dark:text-white">
            Unmatched Standards in Female Living
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
            Engineered to provide medical residents, scholars, and undergraduate students the perfect balance of security, hygiene, and academic serenity.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Card 1: Security */}
          <Card className="rounded-3xl border-2 border-pink-200 dark:border-pink-900/40 shadow-xl hover:shadow-2xl shadow-pink-500/10 bg-white dark:bg-slate-900 hover:-translate-y-2 transition-all duration-300 group">
            <CardContent className="p-6 space-y-4">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-pink-500 to-rose-600 text-white flex items-center justify-center shadow-lg shadow-pink-500/30 group-hover:scale-110 transition-transform">
                <Lock className="w-7 h-7" />
              </div>
              <h3 className="text-lg font-black font-serif text-slate-900 dark:text-white">
                5-Tier Biometric Security
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Biometric turnstiles, 24/7 CCTV cameras, perimeter guards, and automated SMS alerts sent directly to parents on entry & exit.
              </p>
              <div className="text-[11px] font-bold text-pink-600 dark:text-pink-400 flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>100% Female Supervised</span>
              </div>
            </CardContent>
          </Card>

          {/* Card 2: Mess Food */}
          <Card className="rounded-3xl border-2 border-amber-200 dark:border-amber-900/40 shadow-xl hover:shadow-2xl shadow-amber-500/10 bg-white dark:bg-slate-900 hover:-translate-y-2 transition-all duration-300 group">
            <CardContent className="p-6 space-y-4">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-amber-500 to-orange-600 text-white flex items-center justify-center shadow-lg shadow-amber-500/30 group-hover:scale-110 transition-transform">
                <Utensils className="w-7 h-7" />
              </div>
              <h3 className="text-lg font-black font-serif text-slate-900 dark:text-white">
                3-Time Nutritious Mess
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Hygienically prepared halal breakfast, lunch, and dinner cooked fresh daily by experienced female chefs with rotatory menus.
              </p>
              <div className="text-[11px] font-bold text-amber-600 dark:text-amber-400 flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Mineral Filtered Water</span>
              </div>
            </CardContent>
          </Card>

          {/* Card 3: Continuous Power */}
          <Card className="rounded-3xl border-2 border-teal-200 dark:border-teal-900/40 shadow-xl hover:shadow-2xl shadow-teal-500/10 bg-white dark:bg-slate-900 hover:-translate-y-2 transition-all duration-300 group">
            <CardContent className="p-6 space-y-4">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-teal-500 to-emerald-600 text-white flex items-center justify-center shadow-lg shadow-teal-500/30 group-hover:scale-110 transition-transform">
                <Zap className="w-7 h-7" />
              </div>
              <h3 className="text-lg font-black font-serif text-slate-900 dark:text-white">
                Continuous Generator Backup
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Heavy diesel generator and solar UPS power ensure seamless exam preparation without any load shedding disruptions.
              </p>
              <div className="text-[11px] font-bold text-teal-600 dark:text-teal-400 flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Zero Load Shedding</span>
              </div>
            </CardContent>
          </Card>

          {/* Card 4: Dual WiFi */}
          <Card className="rounded-3xl border-2 border-indigo-200 dark:border-indigo-900/40 shadow-xl hover:shadow-2xl shadow-indigo-500/10 bg-white dark:bg-slate-900 hover:-translate-y-2 transition-all duration-300 group">
            <CardContent className="p-6 space-y-4">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-indigo-500 to-purple-600 text-white flex items-center justify-center shadow-lg shadow-indigo-500/30 group-hover:scale-110 transition-transform">
                <Wifi className="w-7 h-7" />
              </div>
              <h3 className="text-lg font-black font-serif text-slate-900 dark:text-white">
                Dual Fiber Wi-Fi Mesh
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Dedicated Wi-Fi access points on every floor for uninterrupted online university lectures, Zoom meetings, and research.
              </p>
              <div className="text-[11px] font-bold text-indigo-600 dark:text-indigo-400 flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>High-Speed Access Points</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* -------------------------------------------------------------------- */}
      {/* 3. FEATURED ROOMS & SUITES (Interactive Filters & Visual Cards)       */}
      {/* -------------------------------------------------------------------- */}
      <section className="py-16 px-4 sm:px-8 max-w-7xl mx-auto w-full space-y-10">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 border-b border-slate-200 dark:border-slate-800 pb-6">
          <div>
            <span className="px-3.5 py-1 rounded-full bg-indigo-100 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 font-extrabold text-xs uppercase tracking-wider">
              Accommodations
            </span>
            <h2 className="text-3xl sm:text-4xl font-black font-serif text-slate-900 dark:text-white mt-2">
              Available Rooms & Suites
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              Fully furnished executive and shared rooms with ACs, study desks, and 3-time mess included
            </p>
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap gap-2">
            {["ALL", "SINGLE", "DOUBLE", "TRIPLE", "QUAD"].map((type) => (
              <button
                key={type}
                onClick={() => setSelectedRoomFilter(type)}
                className={`px-4 py-2 rounded-2xl text-xs font-black transition-all ${
                  selectedRoomFilter === type
                    ? "bg-gradient-to-r from-pink-500 to-indigo-600 text-white shadow-lg shadow-pink-500/25 scale-105"
                    : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200"
                }`}
              >
                {type === "ALL" ? "All Categories" : `${type} Room`}
              </button>
            ))}
          </div>
        </div>

        {/* Rooms Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayedRooms.slice(0, 3).map((room: RoomItem) => (
            <Card
              key={room.id}
              className="rounded-3xl border-2 border-slate-200/90 dark:border-slate-800/90 overflow-hidden shadow-xl bg-white dark:bg-slate-900 hover:-translate-y-2.5 transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                <div className="relative h-64 w-full overflow-hidden bg-slate-100">
                  <Image
                    src={room.images[0] || "/images/hostel-room-luxury.jpg"}
                    alt={room.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-4 left-4 flex gap-1.5">
                    <span className="px-3 py-1 rounded-full bg-pink-600 text-white font-black text-xs shadow-md">
                      {room.badge}
                    </span>
                  </div>
                  <div className="absolute bottom-4 right-4 bg-slate-950/85 backdrop-blur-md px-3.5 py-1.5 rounded-2xl text-white font-black text-xs border border-white/20 shadow-lg">
                    {room.availableBeds} Beds Left
                  </div>
                  <div className="absolute bottom-4 left-4 bg-slate-950/85 backdrop-blur-md px-3 py-1 rounded-2xl text-white text-[11px] font-bold border border-white/20">
                    Floor {room.specifications.floor}
                  </div>
                </div>

                <div className="p-6 space-y-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-xl font-bold font-serif text-slate-900 dark:text-white">
                        {isUrdu ? room.titleUrdu : room.title}
                      </h3>
                      <p className="text-xs text-slate-500 mt-0.5">
                        {room.capacity} {room.capacity === 1 ? "Resident" : "Residents"} • {room.specifications.bathType}
                      </p>
                    </div>
                    <div className="text-right">
                      <div className="text-xl font-black text-emerald-600 dark:text-emerald-400">
                        {formatPKR(room.monthlyRentPKR)}
                      </div>
                      <span className="text-[10px] text-slate-400 block font-semibold">/ Month (Mess Inc.)</span>
                    </div>
                  </div>

                  <p className="text-xs text-slate-600 dark:text-slate-300 line-clamp-2 leading-relaxed">
                    {isUrdu ? room.descriptionUrdu : room.description}
                  </p>

                  <div className="space-y-1.5 pt-2 border-t border-slate-100 dark:border-slate-800">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                      Included Comforts:
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {(isUrdu ? room.amenitiesUrdu : room.amenities).slice(0, 4).map((amenity: string, i: number) => (
                        <span
                          key={i}
                          className="text-[10px] px-2.5 py-1 rounded-xl bg-pink-50 dark:bg-pink-950/40 text-pink-700 dark:text-pink-300 font-semibold border border-pink-200 dark:border-pink-900/40"
                        >
                          ✓ {amenity}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-6 pt-0 flex gap-3">
                <Link href={`/rooms/${room.id}`} className="flex-1">
                  <Button variant="outline" className="w-full text-xs font-bold rounded-2xl h-11 border-slate-300 dark:border-slate-700">
                    View Details
                  </Button>
                </Link>
                <Link href={`/booking?roomId=${room.id}`} className="flex-1">
                  <Button className="w-full text-xs font-black rounded-2xl h-11 bg-gradient-to-r from-pink-500 to-indigo-600 hover:from-pink-600 hover:to-indigo-700 text-white shadow-lg shadow-pink-500/25">
                    Book Now →
                  </Button>
                </Link>
              </div>
            </Card>
          ))}
        </div>

        <div className="text-center pt-4">
          <Link href="/rooms">
            <Button size="lg" className="rounded-2xl font-black text-xs px-8 bg-slate-900 dark:bg-white text-white dark:text-slate-900 hover:bg-slate-800 shadow-xl">
              View All Room Categories & Pricing →
            </Button>
          </Link>
        </div>
      </section>

      {/* -------------------------------------------------------------------- */}
      {/* 4. STUDENT LIFE & AMENITIES (Illustrations & Saturated Doodle Style) */}
      {/* -------------------------------------------------------------------- */}
      <section className="py-20 px-4 sm:px-8 bg-gradient-to-b from-indigo-50/60 via-purple-50/30 to-pink-50/50 dark:from-slate-900/60 dark:to-slate-950 relative overflow-hidden border-y border-indigo-100 dark:border-slate-800">
        {/* Vector Doodles */}
        <div className="absolute top-10 right-10 opacity-70 hidden md:block">
          <BookshelfDoodle stroke="#EC4899" />
        </div>
        <div className="absolute bottom-12 left-8 opacity-70 hidden md:block">
          <CactusPlantDoodle stroke="#6366F1" />
        </div>

        <div className="max-w-7xl mx-auto w-full space-y-12 relative z-10">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="px-4 py-1.5 rounded-full bg-teal-100 dark:bg-teal-950 text-teal-800 dark:text-teal-300 font-extrabold text-xs uppercase tracking-wider border border-teal-300 dark:border-teal-800">
              ★ Campus Life at Educator
            </span>
            <h2 className="text-3xl sm:text-5xl font-black font-serif text-slate-900 dark:text-white">
              More Than Just a Room, <br />
              <span className="text-gradient-pink">A Thriving Female Community</span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
              Thoughtfully curated spaces designed for academic excellence, wellness, and lifelong sisterhood.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="p-8 rounded-3xl bg-white dark:bg-slate-900 border-2 border-indigo-200 dark:border-indigo-900/40 shadow-xl space-y-4 hover:-translate-y-2 transition-transform">
              <div className="w-12 h-12 rounded-2xl bg-indigo-100 dark:bg-indigo-950 text-indigo-600 flex items-center justify-center font-black text-xl">
                📚
              </div>
              <h3 className="text-xl font-bold font-serif text-slate-900 dark:text-white">
                24/7 Silent Study Lounges
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Soundproofed study halls with individual study pods, power outlets, LED study lamps, and high-speed fiber internet for exam preparation.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="p-8 rounded-3xl bg-white dark:bg-slate-900 border-2 border-pink-200 dark:border-pink-900/40 shadow-xl space-y-4 hover:-translate-y-2 transition-transform">
              <div className="w-12 h-12 rounded-2xl bg-pink-100 dark:bg-pink-950 text-pink-600 flex items-center justify-center font-black text-xl">
                ☕
              </div>
              <h3 className="text-xl font-bold font-serif text-slate-900 dark:text-white">
                Rooftop Sunset Tea Terrace
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Panoramic rooftop garden with comfortable lounge seating where residents can relax, sip evening karak chai, and unwind after classes.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="p-8 rounded-3xl bg-white dark:bg-slate-900 border-2 border-teal-200 dark:border-teal-900/40 shadow-xl space-y-4 hover:-translate-y-2 transition-transform">
              <div className="w-12 h-12 rounded-2xl bg-teal-100 dark:bg-teal-950 text-teal-600 flex items-center justify-center font-black text-xl">
                🧘‍♀️
              </div>
              <h3 className="text-xl font-bold font-serif text-slate-900 dark:text-white">
                Yoga & Wellness Corner
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Dedicated indoor exercise and yoga space with yoga mats, light fitness gear, and relaxing environment for physical wellbeing.
              </p>
            </div>

            {/* Feature 4 */}
            <div className="p-8 rounded-3xl bg-white dark:bg-slate-900 border-2 border-amber-200 dark:border-amber-900/40 shadow-xl space-y-4 hover:-translate-y-2 transition-transform">
              <div className="w-12 h-12 rounded-2xl bg-amber-100 dark:bg-amber-950 text-amber-600 flex items-center justify-center font-black text-xl">
                🧺
              </div>
              <h3 className="text-xl font-bold font-serif text-slate-900 dark:text-white">
                Modern Laundry Lounge
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Automatic washing machines, spin dryers, and dedicated steam ironing stations available for all residents weekly.
              </p>
            </div>

            {/* Feature 5 */}
            <div className="p-8 rounded-3xl bg-white dark:bg-slate-900 border-2 border-purple-200 dark:border-purple-900/40 shadow-xl space-y-4 hover:-translate-y-2 transition-transform">
              <div className="w-12 h-12 rounded-2xl bg-purple-100 dark:bg-purple-950 text-purple-600 flex items-center justify-center font-black text-xl">
                👩‍⚕️
              </div>
              <h3 className="text-xl font-bold font-serif text-slate-900 dark:text-white">
                On-Call First Aid & Medical Desk
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                First aid support, basic emergency medicines, BP monitors, and direct 2-minute emergency dispatch to KTH Hospital.
              </p>
            </div>

            {/* Feature 6 */}
            <div className="p-8 rounded-3xl bg-white dark:bg-slate-900 border-2 border-rose-200 dark:border-rose-900/40 shadow-xl space-y-4 hover:-translate-y-2 transition-transform">
              <div className="w-12 h-12 rounded-2xl bg-rose-100 dark:bg-rose-950 text-rose-600 flex items-center justify-center font-black text-xl">
                🛡️
              </div>
              <h3 className="text-xl font-bold font-serif text-slate-900 dark:text-white">
                24/7 Female Warden Desk
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Caring resident wardens on every floor offering guidance, parcel receiving, curfew management, and 24/7 student support.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* -------------------------------------------------------------------- */}
      {/* 5. CHEF'S 7-DAY LIVE MESS DINING EXPERIENCE                          */}
      {/* -------------------------------------------------------------------- */}
      <section className="py-20 px-4 sm:px-8 bg-slate-950 text-white relative overflow-hidden">
        {/* Top Wave */}
        <MultiLayerWaveTop
          colorTop="#FF1E7A"
          colorMid="#4F46E5"
          colorBottom="#020617"
          className="-mt-20 mb-8"
        />

        <div className="max-w-7xl mx-auto w-full space-y-10 relative z-10">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="px-4 py-1.5 rounded-full bg-pink-500/20 text-pink-300 font-extrabold text-xs uppercase tracking-wider border border-pink-400/40">
              ★ Nutritious Gourmet Dining
            </span>
            <h2 className="text-3xl sm:text-5xl font-black font-serif">
              Chef-Crafted Weekly Dining Menu
            </h2>
            <p className="text-xs sm:text-sm text-slate-300">
              Prepared 3 times daily with fresh ingredients, filtered water, and loving female kitchen staff.
            </p>
          </div>

          {/* Days Switcher */}
          <div className="flex flex-wrap gap-2 justify-center">
            {Object.keys(weeklyMenu).map((day) => (
              <button
                key={day}
                onClick={() => setSelectedDay(day)}
                className={`px-5 py-2.5 rounded-2xl text-xs font-black transition-all ${
                  selectedDay === day
                    ? "bg-gradient-to-r from-pink-500 to-indigo-600 text-white shadow-xl shadow-pink-500/30 scale-105 border border-white/30"
                    : "bg-white/10 text-slate-300 hover:bg-white/20 border border-white/10"
                }`}
              >
                {day}
              </button>
            ))}
          </div>

          {/* Meals Grid for Selected Day */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {/* Breakfast */}
            <div className="p-6 rounded-3xl bg-white/10 border-2 border-pink-500/30 backdrop-blur-xl space-y-3 shadow-xl">
              <div className="flex items-center justify-between text-pink-300 font-black text-sm">
                <span className="flex items-center gap-2">
                  <Coffee className="w-5 h-5 text-pink-400" />
                  Breakfast
                </span>
                <span className="text-[10px] bg-pink-500/20 px-2.5 py-0.5 rounded-full border border-pink-400/40">
                  07:00 - 09:30 AM
                </span>
              </div>
              <p className="text-base font-serif font-bold text-white leading-snug">
                {weeklyMenu[selectedDay].breakfast}
              </p>
              <div className="text-[11px] text-pink-200 font-semibold pt-2 border-t border-white/10 flex items-center gap-1">
                <span>✦ Special Add-on:</span>
                <span className="text-amber-300">{weeklyMenu[selectedDay].special}</span>
              </div>
            </div>

            {/* Lunch */}
            <div className="p-6 rounded-3xl bg-white/10 border-2 border-indigo-500/30 backdrop-blur-xl space-y-3 shadow-xl">
              <div className="flex items-center justify-between text-indigo-300 font-black text-sm">
                <span className="flex items-center gap-2">
                  <Utensils className="w-5 h-5 text-indigo-400" />
                  Lunch
                </span>
                <span className="text-[10px] bg-indigo-500/20 px-2.5 py-0.5 rounded-full border border-indigo-400/40">
                  01:00 - 03:00 PM
                </span>
              </div>
              <p className="text-base font-serif font-bold text-white leading-snug">
                {weeklyMenu[selectedDay].lunch}
              </p>
              <div className="text-[11px] text-indigo-200 font-semibold pt-2 border-t border-white/10 flex items-center gap-1">
                <span>✦ Fresh Salad & Mint Raita Included</span>
              </div>
            </div>

            {/* Dinner */}
            <div className="p-6 rounded-3xl bg-white/10 border-2 border-teal-500/30 backdrop-blur-xl space-y-3 shadow-xl">
              <div className="flex items-center justify-between text-teal-300 font-black text-sm">
                <span className="flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-teal-400" />
                  Dinner
                </span>
                <span className="text-[10px] bg-teal-500/20 px-2.5 py-0.5 rounded-full border border-teal-400/40">
                  07:30 - 09:30 PM
                </span>
              </div>
              <p className="text-base font-serif font-bold text-white leading-snug">
                {weeklyMenu[selectedDay].dinner}
              </p>
              <div className="text-[11px] text-teal-200 font-semibold pt-2 border-t border-white/10 flex items-center gap-1">
                <span>✦ Hot Green Tea / Dessert Included</span>
              </div>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-white/5 border border-white/10 text-center max-w-2xl mx-auto text-xs text-slate-300 flex items-center justify-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-400 flex-shrink-0" />
            <span>Need late mess plate due to clinical duty or evening university classes? Just inform the mess warden!</span>
          </div>
        </div>
      </section>

      {/* -------------------------------------------------------------------- */}
      {/* 6. CAMPUS PROXIMITY & LOCATION ADVANTAGE                             */}
      {/* -------------------------------------------------------------------- */}
      <section className="py-20 px-4 sm:px-8 max-w-7xl mx-auto w-full space-y-12">
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="px-4 py-1.5 rounded-full bg-pink-100 dark:bg-pink-950 text-pink-700 dark:text-pink-300 font-extrabold text-xs uppercase tracking-wider border border-pink-300 dark:border-pink-800">
            ★ Prime Location
          </span>
          <h2 className="text-3xl sm:text-5xl font-black font-serif text-slate-900 dark:text-white">
            Minutes Away From Peshawar&apos;s Top Campuses
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
            Situated right on Main University Road with effortless access to universities, hospitals, and public transit.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border-2 border-indigo-200 dark:border-indigo-900/40 shadow-xl space-y-2 text-center hover:scale-105 transition-transform">
            <div className="text-4xl font-black text-indigo-600 dark:text-indigo-400 font-serif">2 Mins</div>
            <h4 className="font-bold text-base text-slate-900 dark:text-white">University of Peshawar</h4>
            <p className="text-xs text-slate-500">Walkable distance via Main Campus Gate</p>
          </div>

          <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border-2 border-pink-200 dark:border-pink-900/40 shadow-xl space-y-2 text-center hover:scale-105 transition-transform">
            <div className="text-4xl font-black text-pink-600 dark:text-pink-400 font-serif">4 Mins</div>
            <h4 className="font-bold text-base text-slate-900 dark:text-white">Khyber Medical University (KMU)</h4>
            <p className="text-xs text-slate-500">Direct shuttle & walking connectivity</p>
          </div>

          <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border-2 border-teal-200 dark:border-teal-900/40 shadow-xl space-y-2 text-center hover:scale-105 transition-transform">
            <div className="text-4xl font-black text-teal-600 dark:text-teal-400 font-serif">5 Mins</div>
            <h4 className="font-bold text-base text-slate-900 dark:text-white">Khyber Teaching Hospital (KTH)</h4>
            <p className="text-xs text-slate-500">Ideal for medical officers and doctors</p>
          </div>

          <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border-2 border-amber-200 dark:border-amber-900/40 shadow-xl space-y-2 text-center hover:scale-105 transition-transform">
            <div className="text-4xl font-black text-amber-500 dark:text-amber-400 font-serif">1 Min</div>
            <h4 className="font-bold text-base text-slate-900 dark:text-white">Peshawar BRT Station</h4>
            <p className="text-xs text-slate-500">Direct transit across the entire city</p>
          </div>
        </div>
      </section>

      {/* -------------------------------------------------------------------- */}
      {/* 7. INTERACTIVE PHOTO LIGHTBOX & VIRTUAL TOUR                         */}
      {/* -------------------------------------------------------------------- */}
      <section className="py-20 px-4 sm:px-8 bg-slate-100 dark:bg-slate-900/80 border-y border-slate-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto w-full space-y-10">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4">
            <div>
              <span className="px-3.5 py-1 rounded-full bg-pink-100 dark:bg-pink-950 text-pink-700 dark:text-pink-300 font-extrabold text-xs uppercase tracking-wider">
                Photo Tour
              </span>
              <h2 className="text-3xl sm:text-4xl font-black font-serif text-slate-900 dark:text-white mt-2">
                Explore Inside Educator Girls Hostel
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                Click any photograph to view high resolution gallery view
              </p>
            </div>

            {/* Gallery Tabs */}
            <div className="flex flex-wrap gap-2">
              {[
                { id: "all", label: "All Photos" },
                { id: "rooms", label: "Rooms & Suites" },
                { id: "dining", label: "Mess Hall" },
                { id: "study", label: "Study Lounges" },
                { id: "lifestyle", label: "Terrace & Lifestyle" },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveGalleryTab(tab.id)}
                  className={`px-4 py-2 rounded-2xl text-xs font-black transition-all ${
                    activeGalleryTab === tab.id
                      ? "bg-gradient-to-r from-pink-500 to-indigo-600 text-white shadow-md shadow-pink-500/25 scale-105"
                      : "bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Photo Gallery Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredGallery.map((photo) => (
              <div
                key={photo.id}
                onClick={() => setSelectedPhoto(photo.src)}
                className="group relative h-64 rounded-3xl overflow-hidden shadow-lg border-2 border-slate-200 dark:border-slate-800 cursor-pointer bg-slate-950"
              >
                <Image
                  src={photo.src}
                  alt={photo.title}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded-full bg-pink-600 text-white inline-block mb-1">
                    {photo.tag}
                  </span>
                  <h4 className="text-base font-bold font-serif">{photo.title}</h4>
                </div>
                <div className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity">
                  <Camera className="w-4 h-4" />
                </div>
              </div>
            ))}
          </div>

          {/* Lightbox Modal */}
          {selectedPhoto && (
            <div
              onClick={() => setSelectedPhoto(null)}
              className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 animate-fade-in"
            >
              <div className="relative max-w-4xl w-full max-h-[85vh] rounded-3xl overflow-hidden border-2 border-pink-500/40 shadow-2xl">
                <img src={selectedPhoto} alt="Gallery view" className="w-full h-full object-contain" />
                <button
                  onClick={() => setSelectedPhoto(null)}
                  className="absolute top-4 right-4 w-10 h-10 rounded-full bg-pink-600 text-white font-black flex items-center justify-center shadow-lg"
                >
                  ✕
                </button>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* -------------------------------------------------------------------- */}
      {/* 8. VERIFIED TESTIMONIALS & PARENT REVIEWS                             */}
      {/* -------------------------------------------------------------------- */}
      <section className="py-20 px-4 sm:px-8 max-w-7xl mx-auto w-full space-y-12">
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="px-4 py-1.5 rounded-full bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300 font-extrabold text-xs uppercase tracking-wider border border-amber-300 dark:border-amber-800">
            ★ Real Resident Stories
          </span>
          <h2 className="text-3xl sm:text-5xl font-black font-serif text-slate-900 dark:text-white">
            Trusted by Hundreds of Students & Parents
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
            Read authentic reviews from medical interns, university students, and parents across KPK and Pakistan.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((test) => (
            <Card
              key={test.id}
              className="rounded-3xl border-2 border-slate-200 dark:border-slate-800 shadow-xl bg-white dark:bg-slate-900 flex flex-col justify-between hover:-translate-y-2 transition-transform duration-300"
            >
              <CardContent className="p-8 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1 text-amber-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400" />
                    ))}
                  </div>
                  <span className="text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full bg-pink-100 dark:bg-pink-950 text-pink-700 dark:text-pink-300">
                    {test.badge}
                  </span>
                </div>

                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed italic">
                  &ldquo;{test.comment}&rdquo;
                </p>

                <div className="flex items-center gap-3 pt-4 border-t border-slate-100 dark:border-slate-800">
                  <img
                    src={test.image}
                    alt={test.name}
                    className="w-12 h-12 rounded-2xl object-cover border-2 border-pink-500/30"
                  />
                  <div>
                    <h4 className="font-bold text-sm text-slate-900 dark:text-white">{test.name}</h4>
                    <p className="text-xs text-slate-500">{test.role}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* -------------------------------------------------------------------- */}
      {/* 9. FREQUENTLY ASKED QUESTIONS (Interactive Accordion)                */}
      {/* -------------------------------------------------------------------- */}
      <section className="py-16 px-4 sm:px-8 max-w-4xl mx-auto w-full space-y-8">
        <div className="text-center space-y-3">
          <span className="px-4 py-1.5 rounded-full bg-indigo-100 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 font-extrabold text-xs uppercase tracking-wider">
            ★ Common Inquiries
          </span>
          <h2 className="text-3xl sm:text-4xl font-black font-serif text-slate-900 dark:text-white">
            Frequently Asked Questions
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Have questions about timings, mess, or payment? We have got you covered!
          </p>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, index) => {
            const isOpen = openFaq === index;
            return (
              <div
                key={index}
                className="rounded-3xl border-2 border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden transition-all shadow-sm"
              >
                <button
                  onClick={() => setOpenFaq(isOpen ? null : index)}
                  className="w-full p-6 text-left font-bold text-sm sm:text-base flex items-center justify-between gap-4 text-slate-900 dark:text-white hover:text-pink-600 dark:hover:text-pink-400 transition-colors"
                >
                  <span className="flex items-center gap-3">
                    <HelpCircle className="w-5 h-5 text-pink-500 shrink-0" />
                    {faq.q}
                  </span>
                  <span className={`w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-sm font-black transition-transform ${isOpen ? "rotate-180 bg-pink-500 text-white" : ""}`}>
                    ↓
                  </span>
                </button>
                {isOpen && (
                  <div className="px-6 pb-6 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed border-t border-slate-100 dark:border-slate-800 pt-4 animate-fade-in">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* -------------------------------------------------------------------- */}
      {/* 10. HIGH-ENERGY MULTI-LAYER WAVE FINAL CTA BANNER                    */}
      {/* -------------------------------------------------------------------- */}
      <section className="py-16 px-4 sm:px-8 max-w-7xl mx-auto w-full mb-8">
        <div className="rounded-3xl bg-gradient-to-r from-pink-600 via-purple-600 to-indigo-800 text-white p-8 sm:p-14 relative overflow-hidden shadow-2xl border-2 border-white/30">
          {/* Background Vector Doodles */}
          <div className="absolute top-6 right-8 hidden lg:block opacity-60">
            <SquiggleWave color="#FFFFFF" width={160} height={30} />
          </div>
          <div className="absolute bottom-6 left-8 hidden lg:block opacity-50">
            <TargetRings color="border-white" />
          </div>

          <div className="relative z-10 max-w-2xl space-y-6">
            <span className="px-4 py-1.5 rounded-full bg-white/20 text-white font-extrabold text-xs uppercase tracking-wider backdrop-blur-md">
              ★ Limited Fall 2026 Seats Available
            </span>
            <h2 className="text-3xl sm:text-5xl font-black font-serif leading-tight">
              Ready to Experience Peshawar&apos;s Best Female Living?
            </h2>
            <p className="text-pink-100 text-sm leading-relaxed">
              Reserve your room online with instant digital confirmation or contact our chief warden desk for a guided hostel tour.
            </p>
            <div className="flex flex-wrap gap-4 pt-2">
              <Link href="/rooms">
                <Button
                  size="lg"
                  className="font-black text-xs h-14 px-8 rounded-2xl bg-white text-slate-950 hover:bg-slate-100 shadow-2xl hover:scale-105 transition-all"
                >
                  <Bed className="w-4 h-4 mr-2 text-pink-600" />
                  Book Your Bed Now
                </Button>
              </Link>
              <a href="tel:+923001234567">
                <Button
                  variant="outline"
                  size="lg"
                  className="border-2 border-white/40 text-white hover:bg-white/15 text-xs h-14 px-7 rounded-2xl backdrop-blur-md"
                >
                  <Phone className="w-4 h-4 mr-2 text-amber-300" />
                  Call Warden (+92 300 1234567)
                </Button>
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
