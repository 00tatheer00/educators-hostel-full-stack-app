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
  ChevronDown,
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
  BookOpen,
  Crown
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
  MultiLayerWaveBottom,
  ArchitecturalLuxuryArches
} from "@/components/decorative/DoodleVectors";
import { Option5CelestialBackground } from "@/components/decorative/Option5CelestialBackground";

export default function HomePage() {
  const { t, language } = useLanguage();
  const isUrdu = language === "ur";

  // Interactive State
  const [selectedDay, setSelectedDay] = useState("Monday");
  const [stayDuration, setStayDuration] = useState("6");
  const [selectedRoomType, setSelectedRoomType] = useState("double-deluxe");
  const [isRoomDropdownOpen, setIsRoomDropdownOpen] = useState(false);
  const [isDurationDropdownOpen, setIsDurationDropdownOpen] = useState(false);
  const [activeGalleryTab, setActiveGalleryTab] = useState("all");
  const [selectedRoomFilter, setSelectedRoomFilter] = useState("ALL");
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [selectedPhoto, setSelectedPhoto] = useState<string | null>(null);

  const DURATION_OPTIONS = [
    { value: "1", label: "1 Month (Flexible)", badge: "Monthly", desc: "Short-term trial stay" },
    { value: "3", label: "3 Months (Semester)", badge: "Semester", desc: "Exam & academic session" },
    { value: "6", label: "6 Months (Half Year)", badge: "Popular", desc: "Most chosen by students" },
    { value: "12", label: "12 Months (Full Year)", badge: "Best Value", desc: "Long term guaranteed bed" },
  ];

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
    <div className="flex flex-col min-h-screen bg-[#070709] text-slate-100 overflow-hidden selection:bg-amber-500/30 selection:text-amber-200">
      {/* -------------------------------------------------------------------- */}
      {/* 1. HERO SECTION (Celestial 3D Gold Gyroscope & Royal Black Canvas)   */}
      {/* -------------------------------------------------------------------- */}
      <section className="relative overflow-hidden bg-[#070709] text-white pt-6 sm:pt-10 pb-12 sm:pb-16 px-4 sm:px-6 lg:px-8">
        {/* Advanced Gold Celestial Background */}
        <Option5CelestialBackground />

        <div className="relative max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center z-10">
          {/* Hero Left Content */}
          <div className="lg:col-span-7 space-y-5 text-center lg:text-left z-10">
            {/* Top Row with Gold Announcement Pill & 3D Floating Security Chip */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2.5">
              {/* Luxury Gold Announcement Pill */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-500/15 border border-amber-400/40 text-amber-300 backdrop-blur-md shadow-md">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-400"></span>
                </span>
                <span className="text-[11px] font-bold tracking-wider uppercase text-amber-200">
                  ★ Peshawar&apos;s Premier Female Hostel
                </span>
                <span className="text-[9px] px-1.5 py-0.2 rounded-full bg-amber-500 text-slate-950 font-black">
                  Fall 2026 Open
                </span>
              </div>

              {/* 3D Floating Chip 1: Biometric Female Security */}
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-xl bg-[#0d0d12]/90 border-2 border-amber-500/50 shadow-[0_6px_20px_rgba(212,175,55,0.25)] backdrop-blur-2xl text-white animate-orbit-1 hover:scale-105 transition-all">
                <div className="w-5 h-5 rounded-md bg-gradient-to-tr from-amber-500 to-yellow-600 flex items-center justify-center text-slate-950 font-bold shadow-sm">
                  <ShieldCheck className="w-3.5 h-3.5 text-slate-950" />
                </div>
                <span className="text-[11px] font-bold text-slate-100">100% Female Safe</span>
                <span className="text-[9px] font-bold uppercase px-1.5 py-0.2 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30">
                  Biometrics
                </span>
              </div>
            </div>

            {/* Main Punchy Display Headline (Black & Gold) */}
            <div className="space-y-2">
              <h1 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold font-serif tracking-tight leading-[1.2] text-white">
                Academic Peace, <br className="hidden sm:inline" />
                <span className="relative inline-block mx-1.5 my-1 transform -rotate-2 hover:rotate-0 transition-transform duration-300">
                  <span className="inline-block px-3.5 py-0.5 sm:px-4 sm:py-1 rounded-xl bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-600 text-slate-950 font-black shadow-[0_5px_0_0_#78350f,0_10px_20px_rgba(212,175,55,0.35)] border-t border-yellow-200">
                    5-Star Luxury
                  </span>
                </span>
                <br />
                <span className="text-gradient-gold-pure">& Homely Comfort.</span>
              </h1>

              <p className="text-xs sm:text-sm md:text-base text-slate-300/90 max-w-xl font-normal leading-relaxed pt-1">
                Peshawar&apos;s most prestigious hostel for medical interns, university students, and working women on <span className="text-amber-300 font-semibold underline decoration-amber-500/50">Main University Road</span>. 100% female-supervised with 3-time nutritious mess meals and zero load shedding.
              </p>
            </div>

            {/* Quick Metrics Bar with Gold Accents */}
            <div className="grid grid-cols-3 gap-2.5 sm:gap-3 pt-1 max-w-lg mx-auto lg:mx-0">
              <div className="p-2.5 sm:p-3 rounded-2xl bg-slate-900/80 border border-amber-500/30 backdrop-blur-md hover:border-amber-400/60 transition-all shadow-md">
                <div className="text-lg sm:text-xl font-extrabold text-amber-400 font-serif">100%</div>
                <div className="text-[10px] sm:text-[11px] text-slate-300 font-medium">Female Staff</div>
              </div>
              <div className="p-2.5 sm:p-3 rounded-2xl bg-slate-900/80 border border-amber-500/30 backdrop-blur-md hover:border-amber-400/60 transition-all shadow-md">
                <div className="text-lg sm:text-xl font-extrabold text-amber-300 font-serif">24/7</div>
                <div className="text-[10px] sm:text-[11px] text-slate-300 font-medium">Biometrics & CCTV</div>
              </div>
              <div className="p-2.5 sm:p-3 rounded-2xl bg-slate-900/80 border border-amber-500/30 backdrop-blur-md hover:border-amber-400/60 transition-all shadow-md">
                <div className="text-lg sm:text-xl font-extrabold text-yellow-300 font-serif">3x Daily</div>
                <div className="text-[10px] sm:text-[11px] text-slate-300 font-medium">Fresh Mess Meals</div>
              </div>
            </div>

            {/* 3D Floating Chip 3: 3-Time Gourmet Mess Ribbon */}
            <div className="flex justify-center lg:justify-start">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-xl bg-[#0d0d12]/90 border-2 border-amber-400/60 shadow-[0_6px_20px_rgba(251,191,36,0.25)] backdrop-blur-2xl text-white animate-orbit-2 hover:scale-105 transition-all">
                <div className="w-5 h-5 rounded-md bg-gradient-to-tr from-amber-500 to-yellow-600 flex items-center justify-center text-slate-950 font-bold shadow-sm">
                  <Utensils className="w-3 h-3 text-slate-950" />
                </div>
                <span className="text-[11px] font-bold text-slate-100">3x Daily Fresh Mess Included</span>
                <span className="text-[9px] font-bold text-amber-300 bg-amber-500/20 px-1.5 py-0.2 rounded border border-amber-500/30">
                  Nutritious
                </span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-3 justify-center lg:justify-start pt-1">
              <Link href="/rooms">
                <Button
                  size="default"
                  className="font-black text-xs sm:text-sm px-5 sm:px-6 h-10 sm:h-11 rounded-xl bg-gradient-to-r from-amber-500 via-amber-400 to-amber-600 hover:from-amber-400 hover:to-amber-300 text-slate-950 shadow-lg shadow-amber-500/25 active:scale-95 transition-all"
                >
                  <Bed className="w-4 h-4 mr-1.5 text-slate-950" />
                  Explore Luxury Rooms
                  <ArrowRight className="w-4 h-4 ml-1.5 text-slate-950" />
                </Button>
              </Link>

              <Link href="/amenities">
                <Button
                  variant="outline"
                  size="default"
                  className="bg-black/50 hover:bg-amber-500/10 text-white border border-amber-500/35 hover:border-amber-400/70 font-semibold text-xs sm:text-sm px-4 sm:px-5 h-10 sm:h-11 rounded-xl backdrop-blur-md transition-all shadow-sm flex items-center"
                >
                  <ShieldCheck className="w-4 h-4 mr-1.5 text-amber-400" />
                  <span className="text-white font-semibold">Facilities & Security</span>
                </Button>
              </Link>
            </div>
          </div>

          {/* Hero Right Visual Showcase & Live Rent Estimator */}
          <div className="lg:col-span-5 relative z-10">
            {/* Prominent 3D Floating Chip 2: Power */}
            <div className="absolute -top-3.5 -right-2 sm:-top-4 sm:-right-3 z-30 flex items-center gap-1.5 px-3 py-1 rounded-xl bg-[#0c0c10]/95 border-2 border-amber-400/70 shadow-[0_8px_25px_rgba(212,175,55,0.3)] backdrop-blur-2xl text-white animate-orbit-2 hover:scale-105 transition-all">
              <div className="w-4.5 h-4.5 rounded-md bg-gradient-to-tr from-amber-500 to-yellow-600 flex items-center justify-center text-slate-950 shadow-sm p-1">
                <Zap className="w-3 h-3 text-slate-950 font-bold" />
              </div>
              <span className="text-[10px] sm:text-[11px] font-bold text-slate-100">Zero Load Shedding</span>
              <span className="text-[8px] font-black text-slate-950 bg-amber-400 px-1 py-0.2 rounded">
                24/7 ON
              </span>
            </div>

            {/* Prominent 3D Floating Chip 4: Fiber Wi-Fi */}
            <div className="absolute -bottom-3.5 -left-2 sm:-bottom-4 sm:-left-3 z-30 flex items-center gap-1.5 px-3 py-1 rounded-xl bg-[#0c0c10]/95 border-2 border-amber-400/70 shadow-[0_8px_25px_rgba(212,175,55,0.3)] backdrop-blur-2xl text-white animate-orbit-1 hover:scale-105 transition-all">
              <div className="w-4.5 h-4.5 rounded-md bg-gradient-to-tr from-amber-500 to-yellow-600 flex items-center justify-center text-slate-950 shadow-sm p-1">
                <Wifi className="w-3 h-3 text-slate-950 font-bold" />
              </div>
              <span className="text-[10px] sm:text-[11px] font-bold text-slate-100">50 Mbps Fiber Wi-Fi</span>
              <span className="text-[8px] font-black text-slate-950 bg-amber-400 px-1 py-0.2 rounded">
                Fast
              </span>
            </div>

            {/* Unified Card Container with Ambient Glow */}
            <div className="relative rounded-2xl sm:rounded-3xl border border-amber-500/35 bg-[#0d0d12]/95 backdrop-blur-2xl shadow-2xl overflow-hidden ring-1 ring-amber-400/20 group">
              {/* 1. Dynamic Room Showcase Photo */}
              <div className="relative h-44 sm:h-52 w-full overflow-hidden bg-slate-950">
                {(() => {
                  const activeRoom = ROOMS_DATA.find((r) => r.id === selectedRoomType) || ROOMS_DATA[1];
                  return (
                    <>
                      <Image
                        src={activeRoom.images[0] || "/images/hostel-room-luxury.jpg"}
                        alt={activeRoom.title}
                        fill
                        priority
                        className="object-cover transition-all duration-700 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0d0d12] via-slate-950/40 to-transparent" />
                      
                      {/* Badges on Photo */}
                      <div className="absolute top-3 left-3 right-3 flex items-center justify-between gap-2 z-10">
                        <span className="px-2.5 py-1 rounded-full bg-gradient-to-r from-amber-500 to-yellow-500 text-slate-950 font-black text-[10px] sm:text-[11px] backdrop-blur-md shadow-md flex items-center gap-1 border border-amber-300/40">
                          <Crown className="w-3 h-3 text-slate-950" />
                          <span>{activeRoom.badge}</span>
                        </span>
                        <span className="px-2.5 py-1 rounded-full bg-slate-950/85 border border-amber-500/30 text-amber-300 font-bold text-[10px] sm:text-[11px] backdrop-blur-md flex items-center gap-1 shadow-md">
                          ⭐ 4.9/5 (120+ Reviews)
                        </span>
                      </div>

                      <div className="absolute bottom-3 left-3.5 right-3.5 text-white">
                        <div className="flex items-center justify-between gap-2 mb-0.5">
                          <span className="text-[10px] text-amber-300 font-medium flex items-center gap-1">
                            <MapPin className="w-3 h-3 text-amber-400" />
                            <span>Main University Road, Peshawar</span>
                          </span>
                          <span className="text-[10px] text-amber-300 font-bold bg-black/80 px-2 py-0.5 rounded-full border border-amber-500/40 flex items-center gap-1">
                            <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-ping" />
                            <span>{activeRoom.availableBeds} Beds Left</span>
                          </span>
                        </div>
                        <h3 className="text-sm sm:text-base font-bold font-serif text-white tracking-tight line-clamp-1">
                          {activeRoom.title}
                        </h3>
                      </div>
                    </>
                  );
                })()}
              </div>

              {/* 2. Interactive Calculator Section with Custom Dropdowns */}
              <div className="p-4 sm:p-5 space-y-3.5 bg-[#0a0a0e] border-t border-amber-500/20">
                <div className="flex items-center justify-between pb-1 border-b border-amber-500/15">
                  <span className="font-bold text-xs text-amber-300 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                    Instant Rent & Booking Estimator
                  </span>
                  <span className="text-[10px] text-slate-400 font-medium">
                    Fall 2026 Batch
                  </span>
                </div>

                {/* Custom Designed Dropdowns Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {/* Custom Dropdown 1: Room Type */}
                  <div className="relative space-y-1">
                    <label className="text-[10px] text-slate-300 font-medium flex items-center gap-1">
                      <Bed className="w-3 h-3 text-amber-400" />
                      <span>Select Room Type</span>
                    </label>

                    {(() => {
                      const activeRoom = ROOMS_DATA.find((r) => r.id === selectedRoomType) || ROOMS_DATA[1];
                      return (
                        <div className="relative">
                          <button
                            type="button"
                            onClick={() => {
                              setIsRoomDropdownOpen(!isRoomDropdownOpen);
                              setIsDurationDropdownOpen(false);
                            }}
                            className={`w-full h-10 rounded-xl bg-slate-950 border px-2.5 sm:px-3 flex items-center justify-between text-xs text-white transition-all shadow-inner group ${
                              isRoomDropdownOpen ? "border-amber-400 ring-2 ring-amber-500/20" : "border-amber-500/30 hover:border-amber-400/60"
                            }`}
                          >
                            <span className="font-medium truncate text-[11px] sm:text-xs">
                              {activeRoom.title.replace(" Suite", "").replace(" Room", "")}
                            </span>
                            <div className="flex items-center gap-1 shrink-0 ml-1.5">
                              <span className="text-[10px] font-bold text-amber-300 bg-amber-400/10 px-1.5 py-0.5 rounded border border-amber-400/30">
                                {formatPKR(activeRoom.monthlyRentPKR)}
                              </span>
                              <ChevronDown className={`w-3.5 h-3.5 text-slate-400 transition-transform duration-200 ${isRoomDropdownOpen ? "rotate-180 text-amber-400" : ""}`} />
                            </div>
                          </button>

                          {/* Custom Popover Menu for Room Types */}
                          {isRoomDropdownOpen && (
                            <>
                              <div
                                className="fixed inset-0 z-40"
                                onClick={() => setIsRoomDropdownOpen(false)}
                              />
                              <div className="absolute left-0 right-0 bottom-full mb-2 z-50 rounded-xl bg-[#0a0a0e] border border-amber-500/40 shadow-2xl backdrop-blur-2xl p-1.5 space-y-1 animate-in fade-in zoom-in-95 duration-150">
                                <div className="px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-amber-400/80 border-b border-amber-500/20">
                                  Available Room Types
                                </div>
                                {ROOMS_DATA.map((room) => {
                                  const isSelected = room.id === selectedRoomType;
                                  return (
                                    <button
                                      key={room.id}
                                      type="button"
                                      onClick={() => {
                                        setSelectedRoomType(room.id);
                                        setIsRoomDropdownOpen(false);
                                      }}
                                      className={`w-full text-left p-2 rounded-lg text-xs transition-all flex items-center justify-between gap-2 ${
                                        isSelected
                                          ? "bg-amber-500/20 border border-amber-500/40 text-amber-300 font-semibold"
                                          : "hover:bg-white/5 text-slate-300 hover:text-white"
                                      }`}
                                    >
                                      <div className="flex items-center gap-2 truncate">
                                        <div className={`w-6 h-6 rounded-md flex items-center justify-center shrink-0 ${isSelected ? "bg-amber-500 text-slate-950" : "bg-white/10 text-slate-400"}`}>
                                          <Bed className="w-3.5 h-3.5" />
                                        </div>
                                        <div className="truncate">
                                          <p className="font-semibold text-white truncate text-[11px]">
                                            {room.title}
                                          </p>
                                          <p className="text-[10px] text-slate-400 font-normal">
                                            {room.capacity} Person • {room.badge}
                                          </p>
                                        </div>
                                      </div>
                                      <div className="flex items-center gap-1.5 shrink-0">
                                        <span className="font-bold text-amber-300 text-[11px] font-mono">
                                          {formatPKR(room.monthlyRentPKR)}
                                        </span>
                                        {isSelected && <Check className="w-3.5 h-3.5 text-amber-400" />}
                                      </div>
                                    </button>
                                  );
                                })}
                              </div>
                            </>
                          )}
                        </div>
                      );
                    })()}
                  </div>

                  {/* Custom Dropdown 2: Duration */}
                  <div className="relative space-y-1">
                    <label className="text-[10px] text-slate-300 font-medium flex items-center gap-1">
                      <Calendar className="w-3 h-3 text-amber-400" />
                      <span>Stay Duration</span>
                    </label>

                    {(() => {
                      const activeDur = DURATION_OPTIONS.find((d) => d.value === stayDuration) || DURATION_OPTIONS[2];
                      return (
                        <div className="relative">
                          <button
                            type="button"
                            onClick={() => {
                              setIsDurationDropdownOpen(!isDurationDropdownOpen);
                              setIsRoomDropdownOpen(false);
                            }}
                            className={`w-full h-10 rounded-xl bg-slate-950 border px-2.5 sm:px-3 flex items-center justify-between text-xs text-white transition-all shadow-inner group ${
                              isDurationDropdownOpen ? "border-amber-400 ring-2 ring-amber-500/20" : "border-amber-500/30 hover:border-amber-400/60"
                            }`}
                          >
                            <span className="font-medium truncate text-[11px] sm:text-xs">
                              {activeDur.label}
                            </span>
                            <div className="flex items-center gap-1 shrink-0 ml-1.5">
                              <span className="text-[10px] font-medium text-amber-300 bg-amber-400/10 px-1.5 py-0.5 rounded border border-amber-400/20">
                                {activeDur.badge}
                              </span>
                              <ChevronDown className={`w-3.5 h-3.5 text-slate-400 transition-transform duration-200 ${isDurationDropdownOpen ? "rotate-180 text-amber-400" : ""}`} />
                            </div>
                          </button>

                          {/* Custom Popover Menu for Duration */}
                          {isDurationDropdownOpen && (
                            <>
                              <div
                                className="fixed inset-0 z-40"
                                onClick={() => setIsDurationDropdownOpen(false)}
                              />
                              <div className="absolute left-0 right-0 bottom-full mb-2 z-50 rounded-xl bg-[#0a0a0e] border border-amber-500/40 shadow-2xl backdrop-blur-2xl p-1.5 space-y-1 animate-in fade-in zoom-in-95 duration-150">
                                <div className="px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-amber-400/80 border-b border-amber-500/20">
                                  Select Stay Term
                                </div>
                                {DURATION_OPTIONS.map((opt) => {
                                  const isSelected = opt.value === stayDuration;
                                  return (
                                    <button
                                      key={opt.value}
                                      type="button"
                                      onClick={() => {
                                        setStayDuration(opt.value);
                                        setIsDurationDropdownOpen(false);
                                      }}
                                      className={`w-full text-left p-2 rounded-lg text-xs transition-all flex items-center justify-between gap-2 ${
                                        isSelected
                                          ? "bg-amber-500/20 border border-amber-500/40 text-amber-300 font-semibold"
                                          : "hover:bg-white/5 text-slate-300 hover:text-white"
                                      }`}
                                    >
                                      <div className="flex items-center gap-2">
                                        <div className={`w-6 h-6 rounded-md flex items-center justify-center shrink-0 ${isSelected ? "bg-amber-500 text-slate-950" : "bg-white/10 text-slate-400"}`}>
                                          <Calendar className="w-3.5 h-3.5" />
                                        </div>
                                        <div>
                                          <p className="font-semibold text-white text-[11px]">{opt.label}</p>
                                          <p className="text-[10px] text-slate-400 font-normal">{opt.desc}</p>
                                        </div>
                                      </div>
                                      <div className="flex items-center gap-1.5">
                                        <span className="text-[10px] font-semibold text-amber-300 bg-amber-500/20 px-2 py-0.5 rounded border border-amber-500/30">
                                          {opt.badge}
                                        </span>
                                        {isSelected && <Check className="w-3.5 h-3.5 text-amber-400" />}
                                      </div>
                                    </button>
                                  );
                                })}
                              </div>
                            </>
                          )}
                        </div>
                      );
                    })()}
                  </div>
                </div>

                {/* 3. Monthly Rent Summary & Gold Reserve Action */}
                <div className="p-3.5 rounded-2xl bg-gradient-to-r from-[#14141a] via-[#1a1820] to-[#101015] border border-amber-500/30 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2.5">
                  <div>
                    <div className="flex items-center gap-1.5">
                      <span className="text-[10px] text-slate-300 font-medium">All-Inclusive Monthly Rent:</span>
                      <span className="text-[9px] text-amber-300 font-bold bg-amber-500/20 px-1.5 py-0.2 rounded border border-amber-500/30">3x Mess Included</span>
                    </div>
                    <span className="text-lg sm:text-xl font-black text-amber-400 font-mono tracking-tight">
                      {formatPKR(estimate.monthly)} <span className="text-xs text-slate-400 font-sans font-normal">/ month</span>
                    </span>
                  </div>

                  <Link href={`/booking?roomId=${selectedRoomType}&duration=${stayDuration}`} className="w-full sm:w-auto">
                    <Button
                      size="sm"
                      className="w-full sm:w-auto font-black text-xs h-9 px-4 rounded-xl bg-gradient-to-r from-amber-500 via-amber-400 to-amber-600 hover:from-amber-400 hover:to-amber-300 text-slate-950 shadow-lg shadow-amber-500/30 hover:scale-[1.02] active:scale-[0.98] transition-all"
                    >
                      Reserve Now →
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Wave Transition Bottom of Hero */}
      <MultiLayerWaveBottom
        colorTop="#070709"
        colorMid="#d4af37"
        colorBottom="#0b0b0f"
        className="-mt-1"
      />

      {/* -------------------------------------------------------------------- */}
      {/* 2. THE 4 PILLARS OF EXCELLENCE (Obsidian & Gold Luxury Cards)         */}
      {/* -------------------------------------------------------------------- */}
      <section className="py-12 px-4 sm:px-8 max-w-7xl mx-auto w-full -mt-10 z-20">
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-10">
          <span className="px-4 py-1.5 rounded-full bg-amber-500/15 text-amber-300 font-extrabold text-xs uppercase tracking-wider border border-amber-400/40">
            ★ Why Hundreds of Families Trust Us
          </span>
          <h2 className="text-3xl sm:text-4xl font-black font-serif text-white">
            Unmatched Standards in Female Living
          </h2>
          <p className="text-xs sm:text-sm text-slate-400">
            Engineered to provide medical residents, scholars, and undergraduate students the perfect balance of security, hygiene, and academic serenity.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Card 1: Security */}
          <Card className="rounded-3xl border border-amber-500/25 shadow-xl hover:border-amber-400/60 bg-[#0d0d12] hover:-translate-y-2 transition-all duration-300 group">
            <CardContent className="p-6 space-y-4">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-amber-500 to-yellow-600 text-slate-950 flex items-center justify-center shadow-lg shadow-amber-500/25 group-hover:scale-110 transition-transform font-black">
                <Lock className="w-7 h-7 text-slate-950" />
              </div>
              <h3 className="text-lg font-bold font-serif text-white">
                5-Tier Biometric Security
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Biometric turnstiles, 24/7 CCTV cameras, perimeter guards, and automated SMS alerts sent directly to parents on entry & exit.
              </p>
              <div className="text-[11px] font-bold text-amber-400 flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>100% Female Supervised</span>
              </div>
            </CardContent>
          </Card>

          {/* Card 2: Mess Food */}
          <Card className="rounded-3xl border border-amber-500/25 shadow-xl hover:border-amber-400/60 bg-[#0d0d12] hover:-translate-y-2 transition-all duration-300 group">
            <CardContent className="p-6 space-y-4">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-amber-500 to-yellow-600 text-slate-950 flex items-center justify-center shadow-lg shadow-amber-500/25 group-hover:scale-110 transition-transform font-black">
                <Utensils className="w-7 h-7 text-slate-950" />
              </div>
              <h3 className="text-lg font-bold font-serif text-white">
                3-Time Nutritious Mess
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Hygienically prepared halal breakfast, lunch, and dinner cooked fresh daily by experienced female chefs with rotatory menus.
              </p>
              <div className="text-[11px] font-bold text-amber-400 flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Mineral Filtered Water</span>
              </div>
            </CardContent>
          </Card>

          {/* Card 3: Continuous Power */}
          <Card className="rounded-3xl border border-amber-500/25 shadow-xl hover:border-amber-400/60 bg-[#0d0d12] hover:-translate-y-2 transition-all duration-300 group">
            <CardContent className="p-6 space-y-4">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-amber-500 to-yellow-600 text-slate-950 flex items-center justify-center shadow-lg shadow-amber-500/25 group-hover:scale-110 transition-transform font-black">
                <Zap className="w-7 h-7 text-slate-950" />
              </div>
              <h3 className="text-lg font-bold font-serif text-white">
                Continuous Generator Backup
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Heavy diesel generator and solar UPS power ensure seamless exam preparation without any load shedding disruptions.
              </p>
              <div className="text-[11px] font-bold text-amber-400 flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Zero Load Shedding</span>
              </div>
            </CardContent>
          </Card>

          {/* Card 4: Dual WiFi */}
          <Card className="rounded-3xl border border-amber-500/25 shadow-xl hover:border-amber-400/60 bg-[#0d0d12] hover:-translate-y-2 transition-all duration-300 group">
            <CardContent className="p-6 space-y-4">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-amber-500 to-yellow-600 text-slate-950 flex items-center justify-center shadow-lg shadow-amber-500/25 group-hover:scale-110 transition-transform font-black">
                <Wifi className="w-7 h-7 text-slate-950" />
              </div>
              <h3 className="text-lg font-bold font-serif text-white">
                Dual Fiber Wi-Fi Mesh
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Dedicated Wi-Fi access points on every floor for uninterrupted online university lectures, Zoom meetings, and research.
              </p>
              <div className="text-[11px] font-bold text-amber-400 flex items-center gap-1">
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
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 border-b border-amber-500/20 pb-6">
          <div>
            <span className="px-3.5 py-1 rounded-full bg-amber-500/15 text-amber-300 font-extrabold text-xs uppercase tracking-wider border border-amber-500/30">
              Accommodations
            </span>
            <h2 className="text-3xl sm:text-4xl font-black font-serif text-white mt-2">
              Available Rooms & Suites
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              Fully furnished executive and shared rooms with ACs, study desks, and 3-time mess included
            </p>
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap gap-2">
            {["ALL", "SINGLE", "DOUBLE", "TRIPLE", "QUAD"].map((type) => (
              <button
                key={type}
                onClick={() => setSelectedRoomFilter(type)}
                className={`px-4 py-2 rounded-2xl text-xs font-bold transition-all ${
                  selectedRoomFilter === type
                    ? "bg-gradient-to-r from-amber-500 to-yellow-500 text-slate-950 font-black shadow-lg shadow-amber-500/25 scale-105"
                    : "bg-slate-900 border border-amber-500/20 text-slate-300 hover:border-amber-400/50 hover:bg-slate-800"
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
              className="rounded-3xl border border-amber-500/25 overflow-hidden shadow-xl bg-[#0c0c10] hover:border-amber-400/60 hover:-translate-y-2.5 transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                <div className="relative h-64 w-full overflow-hidden bg-slate-950">
                  <Image
                    src={room.images[0] || "/images/hostel-room-luxury.jpg"}
                    alt={room.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-4 left-4 flex gap-1.5">
                    <span className="px-3 py-1 rounded-full bg-gradient-to-r from-amber-500 to-yellow-500 text-slate-950 font-black text-xs shadow-md border border-amber-300/40">
                      {room.badge}
                    </span>
                  </div>
                  <div className="absolute bottom-4 right-4 bg-slate-950/90 backdrop-blur-md px-3.5 py-1.5 rounded-2xl text-amber-300 font-bold text-xs border border-amber-500/30 shadow-lg">
                    {room.availableBeds} Beds Left
                  </div>
                  <div className="absolute bottom-4 left-4 bg-slate-950/90 backdrop-blur-md px-3 py-1 rounded-2xl text-white text-[11px] font-bold border border-white/20">
                    Floor {room.specifications.floor}
                  </div>
                </div>

                <div className="p-6 space-y-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-xl font-bold font-serif text-white">
                        {isUrdu ? room.titleUrdu : room.title}
                      </h3>
                      <p className="text-xs text-slate-400 mt-0.5">
                        {room.capacity} {room.capacity === 1 ? "Resident" : "Residents"} • {room.specifications.bathType}
                      </p>
                    </div>
                    <div className="text-right">
                      <div className="text-xl font-black text-amber-400 font-mono">
                        {formatPKR(room.monthlyRentPKR)}
                      </div>
                      <span className="text-[10px] text-slate-400 block font-semibold">/ Month (Mess Inc.)</span>
                    </div>
                  </div>

                  <p className="text-xs text-slate-300 line-clamp-2 leading-relaxed">
                    {isUrdu ? room.descriptionUrdu : room.description}
                  </p>

                  <div className="space-y-1.5 pt-2 border-t border-amber-500/15">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400/70 block">
                      Included Comforts:
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {(isUrdu ? room.amenitiesUrdu : room.amenities).slice(0, 4).map((amenity: string, i: number) => (
                        <span
                          key={i}
                          className="text-[10px] px-2.5 py-1 rounded-xl bg-amber-500/10 text-amber-300 font-semibold border border-amber-500/25"
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
                  <Button variant="outline" className="w-full text-xs font-bold rounded-2xl h-11 border-amber-500/30 text-amber-300 hover:bg-amber-500/10">
                    View Details
                  </Button>
                </Link>
                <Link href={`/booking?roomId=${room.id}`} className="flex-1">
                  <Button className="w-full text-xs font-black rounded-2xl h-11 bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 hover:from-amber-400 hover:to-amber-500 shadow-lg shadow-amber-500/25">
                    Book Now →
                  </Button>
                </Link>
              </div>
            </Card>
          ))}
        </div>

        <div className="text-center pt-4">
          <Link href="/rooms">
            <Button size="lg" className="rounded-2xl font-black text-xs px-8 bg-gradient-to-r from-amber-500 to-yellow-500 text-slate-950 hover:from-amber-400 hover:to-amber-300 shadow-xl shadow-amber-500/20">
              View All Room Categories & Pricing →
            </Button>
          </Link>
        </div>
      </section>

      {/* -------------------------------------------------------------------- */}
      {/* 4. STUDENT LIFE & AMENITIES (Black & Gold Premium Life)              */}
      {/* -------------------------------------------------------------------- */}
      <section className="py-20 px-4 sm:px-8 bg-[#09090d] relative overflow-hidden border-y border-amber-500/20">
        {/* Vector Doodles */}
        <div className="absolute top-10 right-10 opacity-70 hidden md:block">
          <BookshelfDoodle stroke="#d4af37" />
        </div>
        <div className="absolute bottom-12 left-8 opacity-70 hidden md:block">
          <CactusPlantDoodle stroke="#d4af37" />
        </div>

        <div className="max-w-7xl mx-auto w-full space-y-12 relative z-10">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="px-4 py-1.5 rounded-full bg-amber-500/15 text-amber-300 font-extrabold text-xs uppercase tracking-wider border border-amber-500/30">
              ★ Campus Life at Educator
            </span>
            <h2 className="text-3xl sm:text-5xl font-black font-serif text-white">
              More Than Just a Room, <br />
              <span className="text-gradient-gold">A Thriving Female Community</span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-400">
              Thoughtfully curated spaces designed for academic excellence, wellness, and lifelong sisterhood.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="p-8 rounded-3xl bg-[#0d0d12] border border-amber-500/25 shadow-xl space-y-4 hover:-translate-y-2 transition-transform hover:border-amber-400/50">
              <div className="w-12 h-12 rounded-2xl bg-amber-500/15 border border-amber-500/30 text-amber-300 flex items-center justify-center font-black text-xl">
                📚
              </div>
              <h3 className="text-xl font-bold font-serif text-white">
                24/7 Silent Study Lounges
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Soundproofed study halls with individual study pods, power outlets, LED study lamps, and high-speed fiber internet for exam preparation.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="p-8 rounded-3xl bg-[#0d0d12] border border-amber-500/25 shadow-xl space-y-4 hover:-translate-y-2 transition-transform hover:border-amber-400/50">
              <div className="w-12 h-12 rounded-2xl bg-amber-500/15 border border-amber-500/30 text-amber-300 flex items-center justify-center font-black text-xl">
                ☕
              </div>
              <h3 className="text-xl font-bold font-serif text-white">
                Rooftop Sunset Tea Terrace
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Panoramic rooftop garden with comfortable lounge seating where residents can relax, sip evening karak chai, and unwind after classes.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="p-8 rounded-3xl bg-[#0d0d12] border border-amber-500/25 shadow-xl space-y-4 hover:-translate-y-2 transition-transform hover:border-amber-400/50">
              <div className="w-12 h-12 rounded-2xl bg-amber-500/15 border border-amber-500/30 text-amber-300 flex items-center justify-center font-black text-xl">
                🧘‍♀️
              </div>
              <h3 className="text-xl font-bold font-serif text-white">
                Yoga & Wellness Corner
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Dedicated indoor exercise and yoga space with yoga mats, light fitness gear, and relaxing environment for physical wellbeing.
              </p>
            </div>

            {/* Feature 4 */}
            <div className="p-8 rounded-3xl bg-[#0d0d12] border border-amber-500/25 shadow-xl space-y-4 hover:-translate-y-2 transition-transform hover:border-amber-400/50">
              <div className="w-12 h-12 rounded-2xl bg-amber-500/15 border border-amber-500/30 text-amber-300 flex items-center justify-center font-black text-xl">
                🧺
              </div>
              <h3 className="text-xl font-bold font-serif text-white">
                Modern Laundry Lounge
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Automatic washing machines, spin dryers, and dedicated steam ironing stations available for all residents weekly.
              </p>
            </div>

            {/* Feature 5 */}
            <div className="p-8 rounded-3xl bg-[#0d0d12] border border-amber-500/25 shadow-xl space-y-4 hover:-translate-y-2 transition-transform hover:border-amber-400/50">
              <div className="w-12 h-12 rounded-2xl bg-amber-500/15 border border-amber-500/30 text-amber-300 flex items-center justify-center font-black text-xl">
                👩‍⚕️
              </div>
              <h3 className="text-xl font-bold font-serif text-white">
                On-Call First Aid & Medical Desk
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                First aid support, basic emergency medicines, BP monitors, and direct 2-minute emergency dispatch to KTH Hospital.
              </p>
            </div>

            {/* Feature 6 */}
            <div className="p-8 rounded-3xl bg-[#0d0d12] border border-amber-500/25 shadow-xl space-y-4 hover:-translate-y-2 transition-transform hover:border-amber-400/50">
              <div className="w-12 h-12 rounded-2xl bg-amber-500/15 border border-amber-500/30 text-amber-300 flex items-center justify-center font-black text-xl">
                🛡️
              </div>
              <h3 className="text-xl font-bold font-serif text-white">
                24/7 Female Warden Desk
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Caring resident wardens on every floor offering guidance, parcel receiving, curfew management, and 24/7 student support.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* -------------------------------------------------------------------- */}
      {/* 5. CHEF'S 7-DAY LIVE MESS DINING EXPERIENCE                          */}
      {/* -------------------------------------------------------------------- */}
      <section className="py-20 px-4 sm:px-8 bg-[#050507] text-white relative overflow-hidden">
        {/* Top Wave */}
        <MultiLayerWaveTop
          colorTop="#d4af37"
          colorMid="#78350f"
          colorBottom="#050507"
          className="-mt-20 mb-8"
        />

        <div className="max-w-7xl mx-auto w-full space-y-10 relative z-10">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="px-4 py-1.5 rounded-full bg-amber-500/15 text-amber-300 font-extrabold text-xs uppercase tracking-wider border border-amber-400/40">
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
                className={`px-5 py-2.5 rounded-2xl text-xs font-bold transition-all ${
                  selectedDay === day
                    ? "bg-gradient-to-r from-amber-500 to-yellow-500 text-slate-950 font-black shadow-xl shadow-amber-500/25 scale-105 border border-amber-300/40"
                    : "bg-[#0d0d12] text-slate-300 hover:bg-white/10 border border-amber-500/20"
                }`}
              >
                {day}
              </button>
            ))}
          </div>

          {/* Meals Grid for Selected Day */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {/* Breakfast */}
            <div className="p-6 rounded-3xl bg-[#0d0d12] border border-amber-500/30 backdrop-blur-xl space-y-3 shadow-xl">
              <div className="flex items-center justify-between text-amber-300 font-black text-sm">
                <span className="flex items-center gap-2">
                  <Coffee className="w-5 h-5 text-amber-400" />
                  Breakfast
                </span>
                <span className="text-[10px] bg-amber-500/20 text-amber-300 px-2.5 py-0.5 rounded-full border border-amber-400/40 font-mono">
                  07:00 - 09:30 AM
                </span>
              </div>
              <p className="text-base font-serif font-bold text-white leading-snug">
                {weeklyMenu[selectedDay].breakfast}
              </p>
              <div className="text-[11px] text-amber-200 font-semibold pt-2 border-t border-white/10 flex items-center gap-1">
                <span>✦ Special Add-on:</span>
                <span className="text-amber-400 font-bold">{weeklyMenu[selectedDay].special}</span>
              </div>
            </div>

            {/* Lunch */}
            <div className="p-6 rounded-3xl bg-[#0d0d12] border border-amber-500/30 backdrop-blur-xl space-y-3 shadow-xl">
              <div className="flex items-center justify-between text-amber-300 font-black text-sm">
                <span className="flex items-center gap-2">
                  <Utensils className="w-5 h-5 text-amber-400" />
                  Lunch
                </span>
                <span className="text-[10px] bg-amber-500/20 text-amber-300 px-2.5 py-0.5 rounded-full border border-amber-400/40 font-mono">
                  01:00 - 03:00 PM
                </span>
              </div>
              <p className="text-base font-serif font-bold text-white leading-snug">
                {weeklyMenu[selectedDay].lunch}
              </p>
              <div className="text-[11px] text-amber-200 font-semibold pt-2 border-t border-white/10 flex items-center gap-1">
                <span>✦ Fresh Salad & Mint Raita Included</span>
              </div>
            </div>

            {/* Dinner */}
            <div className="p-6 rounded-3xl bg-[#0d0d12] border border-amber-500/30 backdrop-blur-xl space-y-3 shadow-xl">
              <div className="flex items-center justify-between text-amber-300 font-black text-sm">
                <span className="flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-amber-400" />
                  Dinner
                </span>
                <span className="text-[10px] bg-amber-500/20 text-amber-300 px-2.5 py-0.5 rounded-full border border-amber-400/40 font-mono">
                  07:30 - 09:30 PM
                </span>
              </div>
              <p className="text-base font-serif font-bold text-white leading-snug">
                {weeklyMenu[selectedDay].dinner}
              </p>
              <div className="text-[11px] text-amber-200 font-semibold pt-2 border-t border-white/10 flex items-center gap-1">
                <span>✦ Hot Green Tea / Dessert Included</span>
              </div>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-slate-900 border border-amber-500/20 text-center max-w-2xl mx-auto text-xs text-slate-300 flex items-center justify-center gap-2">
            <ShieldCheck className="w-4 h-4 text-amber-400 flex-shrink-0" />
            <span>Need late mess plate due to clinical duty or evening university classes? Just inform the mess warden!</span>
          </div>
        </div>
      </section>

      {/* -------------------------------------------------------------------- */}
      {/* 6. CAMPUS PROXIMITY & LOCATION ADVANTAGE                             */}
      {/* -------------------------------------------------------------------- */}
      <section className="py-20 px-4 sm:px-8 max-w-7xl mx-auto w-full space-y-12">
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="px-4 py-1.5 rounded-full bg-amber-500/15 text-amber-300 font-extrabold text-xs uppercase tracking-wider border border-amber-400/40">
            ★ Prime Location
          </span>
          <h2 className="text-3xl sm:text-5xl font-black font-serif text-white">
            Minutes Away From Peshawar&apos;s Top Campuses
          </h2>
          <p className="text-xs sm:text-sm text-slate-400">
            Situated right on Main University Road with effortless access to universities, hospitals, and public transit.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="p-6 rounded-3xl bg-[#0c0c10] border border-amber-500/25 shadow-xl space-y-2 text-center hover:scale-105 transition-transform hover:border-amber-400/50">
            <div className="text-4xl font-black text-amber-400 font-serif">2 Mins</div>
            <h4 className="font-bold text-base text-white">University of Peshawar</h4>
            <p className="text-xs text-slate-400">Walkable distance via Main Campus Gate</p>
          </div>

          <div className="p-6 rounded-3xl bg-[#0c0c10] border border-amber-500/25 shadow-xl space-y-2 text-center hover:scale-105 transition-transform hover:border-amber-400/50">
            <div className="text-4xl font-black text-amber-400 font-serif">4 Mins</div>
            <h4 className="font-bold text-base text-white">Khyber Medical University (KMU)</h4>
            <p className="text-xs text-slate-400">Direct shuttle & walking connectivity</p>
          </div>

          <div className="p-6 rounded-3xl bg-[#0c0c10] border border-amber-500/25 shadow-xl space-y-2 text-center hover:scale-105 transition-transform hover:border-amber-400/50">
            <div className="text-4xl font-black text-amber-400 font-serif">5 Mins</div>
            <h4 className="font-bold text-base text-white">Khyber Teaching Hospital (KTH)</h4>
            <p className="text-xs text-slate-400">Ideal for medical officers and doctors</p>
          </div>

          <div className="p-6 rounded-3xl bg-[#0c0c10] border border-amber-500/25 shadow-xl space-y-2 text-center hover:scale-105 transition-transform hover:border-amber-400/50">
            <div className="text-4xl font-black text-amber-400 font-serif">1 Min</div>
            <h4 className="font-bold text-base text-white">Peshawar BRT Station</h4>
            <p className="text-xs text-slate-400">Direct transit across the entire city</p>
          </div>
        </div>
      </section>

      {/* -------------------------------------------------------------------- */}
      {/* 7. INTERACTIVE PHOTO LIGHTBOX & VIRTUAL TOUR                         */}
      {/* -------------------------------------------------------------------- */}
      <section className="py-20 px-4 sm:px-8 bg-[#09090d] border-y border-amber-500/20">
        <div className="max-w-7xl mx-auto w-full space-y-10">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4">
            <div>
              <span className="px-3.5 py-1 rounded-full bg-amber-500/15 text-amber-300 font-extrabold text-xs uppercase tracking-wider border border-amber-500/30">
                Photo Tour
              </span>
              <h2 className="text-3xl sm:text-4xl font-black font-serif text-white mt-2">
                Explore Inside Educator Girls Hostel
              </h2>
              <p className="text-xs text-slate-400 mt-1">
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
                  className={`px-4 py-2 rounded-2xl text-xs font-bold transition-all ${
                    activeGalleryTab === tab.id
                      ? "bg-gradient-to-r from-amber-500 to-yellow-500 text-slate-950 font-black shadow-md shadow-amber-500/25 scale-105"
                      : "bg-slate-900 border border-amber-500/20 text-slate-300 hover:border-amber-400/50 hover:bg-slate-800"
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
                className="group relative h-64 rounded-3xl overflow-hidden shadow-lg border border-amber-500/25 hover:border-amber-400/60 cursor-pointer bg-slate-950 transition-all duration-300"
              >
                <Image
                  src={photo.src}
                  alt={photo.title}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded-full bg-amber-500 text-slate-950 inline-block mb-1">
                    {photo.tag}
                  </span>
                  <h4 className="text-base font-bold font-serif text-white">{photo.title}</h4>
                </div>
                <div className="absolute top-4 right-4 w-9 h-9 rounded-full bg-slate-950/80 border border-amber-500/40 backdrop-blur-md flex items-center justify-center text-amber-400 opacity-0 group-hover:opacity-100 transition-opacity shadow-md">
                  <Camera className="w-4 h-4" />
                </div>
              </div>
            ))}
          </div>

          {/* Lightbox Modal */}
          {selectedPhoto && (
            <div
              onClick={() => setSelectedPhoto(null)}
              className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex items-center justify-center p-4 animate-fade-in"
            >
              <div className="relative max-w-4xl w-full max-h-[85vh] rounded-3xl overflow-hidden border-2 border-amber-500/40 shadow-2xl shadow-black">
                <img src={selectedPhoto} alt="Gallery view" className="w-full h-full object-contain" />
                <button
                  onClick={() => setSelectedPhoto(null)}
                  className="absolute top-4 right-4 w-10 h-10 rounded-full bg-amber-500 text-slate-950 font-black flex items-center justify-center shadow-lg hover:bg-amber-400"
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
          <span className="px-4 py-1.5 rounded-full bg-amber-500/15 text-amber-300 font-extrabold text-xs uppercase tracking-wider border border-amber-400/40">
            ★ Real Resident Stories
          </span>
          <h2 className="text-3xl sm:text-5xl font-black font-serif text-white">
            Trusted by Hundreds of Students & Parents
          </h2>
          <p className="text-xs sm:text-sm text-slate-400">
            Read authentic reviews from medical interns, university students, and parents across KPK and Pakistan.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((test) => (
            <Card
              key={test.id}
              className="rounded-3xl border border-amber-500/25 shadow-xl bg-[#0c0c10] flex flex-col justify-between hover:-translate-y-2 hover:border-amber-400/60 transition-transform duration-300"
            >
              <CardContent className="p-8 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1 text-amber-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400" />
                    ))}
                  </div>
                  <span className="text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30">
                    {test.badge}
                  </span>
                </div>

                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed italic">
                  &ldquo;{test.comment}&rdquo;
                </p>

                <div className="flex items-center gap-3 pt-4 border-t border-amber-500/15">
                  <img
                    src={test.image}
                    alt={test.name}
                    className="w-12 h-12 rounded-2xl object-cover border-2 border-amber-500/40"
                  />
                  <div>
                    <h4 className="font-bold text-sm text-white">{test.name}</h4>
                    <p className="text-xs text-slate-400">{test.role}</p>
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
          <span className="px-4 py-1.5 rounded-full bg-amber-500/15 text-amber-300 font-extrabold text-xs uppercase tracking-wider border border-amber-500/30">
            ★ Common Inquiries
          </span>
          <h2 className="text-3xl sm:text-4xl font-black font-serif text-white">
            Frequently Asked Questions
          </h2>
          <p className="text-xs text-slate-400">
            Have questions about timings, mess, or payment? We have got you covered!
          </p>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, index) => {
            const isOpen = openFaq === index;
            return (
              <div
                key={index}
                className="rounded-3xl border border-amber-500/25 bg-[#0c0c10] overflow-hidden transition-all shadow-sm"
              >
                <button
                  onClick={() => setOpenFaq(isOpen ? null : index)}
                  className="w-full p-6 text-left font-bold text-sm sm:text-base flex items-center justify-between gap-4 text-white hover:text-amber-300 transition-colors"
                >
                  <span className="flex items-center gap-3">
                    <HelpCircle className="w-5 h-5 text-amber-400 shrink-0" />
                    {faq.q}
                  </span>
                  <span className={`w-8 h-8 rounded-full bg-slate-900 border border-amber-500/30 flex items-center justify-center text-sm font-black transition-transform ${isOpen ? "rotate-180 bg-amber-500 text-slate-950" : "text-amber-300"}`}>
                    ↓
                  </span>
                </button>
                {isOpen && (
                  <div className="px-6 pb-6 text-xs sm:text-sm text-slate-300 leading-relaxed border-t border-amber-500/15 pt-4 animate-fade-in">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* -------------------------------------------------------------------- */}
      {/* 10. ROYAL BLACK & GOLD FINAL CTA BANNER                              */}
      {/* -------------------------------------------------------------------- */}
      <section className="py-16 px-4 sm:px-8 max-w-7xl mx-auto w-full mb-8">
        <div className="rounded-3xl bg-gradient-to-r from-[#14141a] via-[#1a1710] to-[#0c0c10] text-white p-8 sm:p-14 relative overflow-hidden shadow-2xl border-2 border-amber-500/35">
          {/* Background Vector Doodles */}
          <div className="absolute top-6 right-8 hidden lg:block opacity-60">
            <SquiggleWave color="#d4af37" width={160} height={30} />
          </div>
          <div className="absolute bottom-6 left-8 hidden lg:block opacity-40">
            <TargetRings color="border-amber-400" />
          </div>

          <div className="relative z-10 max-w-2xl space-y-6">
            <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-amber-500/20 text-amber-300 font-extrabold text-xs uppercase tracking-wider backdrop-blur-md border border-amber-400/40">
              <Crown className="w-3.5 h-3.5 text-amber-400" />
              Limited Fall 2026 Seats Available
            </span>
            <h2 className="text-3xl sm:text-5xl font-black font-serif leading-tight text-white">
              Ready to Experience Peshawar&apos;s Best Female Living?
            </h2>
            <p className="text-slate-300 text-sm leading-relaxed">
              Reserve your room online with instant digital confirmation or contact our chief warden desk for a guided hostel tour.
            </p>
            <div className="flex flex-wrap gap-4 pt-2">
              <Link href="/rooms">
                <Button
                  size="lg"
                  className="font-black text-xs h-14 px-8 rounded-2xl bg-gradient-to-r from-amber-500 via-amber-400 to-amber-600 text-slate-950 hover:from-amber-400 hover:to-amber-300 shadow-2xl hover:scale-105 transition-all"
                >
                  <Bed className="w-4 h-4 mr-2 text-slate-950" />
                  Book Your Bed Now
                </Button>
              </Link>
              <a href="tel:+923001234567">
                <Button
                  variant="outline"
                  size="lg"
                  className="border-2 border-amber-500/40 text-amber-300 hover:bg-amber-500/10 text-xs h-14 px-7 rounded-2xl backdrop-blur-md"
                >
                  <Phone className="w-4 h-4 mr-2 text-amber-400" />
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
