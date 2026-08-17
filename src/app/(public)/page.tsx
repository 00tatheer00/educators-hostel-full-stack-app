"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
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
  Coffee
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { ROOMS_DATA, RoomItem } from "@/data/roomsData";
import { formatPKR } from "@/lib/utils";
import { useLanguage } from "@/context/LanguageContext";

export default function HomePage() {
  const { t, language } = useLanguage();
  const [selectedDay, setSelectedDay] = useState("Monday");
  const [stayDuration, setStayDuration] = useState("6");
  const [selectedRoomType, setSelectedRoomType] = useState("double-deluxe");

  const weeklyMenu: Record<string, { breakfast: string; lunch: string; dinner: string }> = {
    Monday: {
      breakfast: "Halwa Puri, Chana & Milk Tea / Chai",
      lunch: "Daal Chawal with Fresh Mint Raita & Salad",
      dinner: "Chicken Karahi with Tandoori Naan & Kheer",
    },
    Tuesday: {
      breakfast: "Omelette, Paratha, Jam & Butter, Karak Tea",
      lunch: "Aloo Palak / Mix Vegetable Curry & Chapati",
      dinner: "Chicken Biryani with Raita & Salad",
    },
    Wednesday: {
      breakfast: "Fried Eggs, Toast, Butter, Tea / Coffee",
      lunch: "Lobia (Red Beans) Curry with Zeera Rice",
      dinner: "Chicken Qorma with Fresh Hot Chapati & Custard",
    },
    Thursday: {
      breakfast: "Aloo Paratha with Mint Yogurt & Chai",
      lunch: "Kadhi Pakora with Steamed Rice",
      dinner: "Chicken Nihari with Lemon, Ginger & Naan",
    },
    Friday: {
      breakfast: "Special French Toast, Boiled Eggs & Chai",
      lunch: "Special Hyderabadi Chicken Biryani with Cold Drink",
      dinner: "Chicken White Handi with Fresh Tandoori Rotis",
    },
    Saturday: {
      breakfast: "Scrambled Eggs, Paratha & Sweet Milk Tea",
      lunch: "Daal Makhani with Steamed Rice & Pickles",
      dinner: "Chicken Jalfrezi / Roast with Fried Rice",
    },
    Sunday: {
      breakfast: "Peshawari Nihari / Halwa Chana & Special Chai",
      lunch: "Chef Special Pasta & Vegetable Pulao",
      dinner: "Chicken Tikka Boti Gravy with Paratha Rolls & Sweet Dish",
    },
  };

  const getEstimatedRent = () => {
    const room = ROOMS_DATA.find((r: RoomItem) => r.id === selectedRoomType) || ROOMS_DATA[1];
    const months = Number(stayDuration);
    const rent = room.monthlyRentPKR * months;
    const total = rent + room.securityDepositPKR;
    return { rent, deposit: room.securityDepositPKR, total, monthly: room.monthlyRentPKR };
  };

  const estimate = getEstimatedRent();

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 dark:bg-slate-950">
      {/* -------------------------------------------------------------------- */}
      {/* 1. HERO SECTION (Ultra-Luxury Boutique Hotel Vibe)                    */}
      {/* -------------------------------------------------------------------- */}
      <section className="relative min-h-[92vh] flex items-center justify-center overflow-hidden bg-gradient-to-b from-emerald-950 via-slate-950 to-slate-900 text-white px-4 sm:px-8 py-16">
        {/* Ambient Glowing Orbs */}
        <div className="absolute top-10 left-1/4 w-96 h-96 bg-emerald-600/20 rounded-full blur-3xl pointer-events-none animate-float" />
        <div className="absolute bottom-10 right-1/4 w-[28rem] h-[28rem] bg-amber-500/15 rounded-full blur-3xl pointer-events-none animate-float-reverse" />

        <div className="relative max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center z-10">
          {/* Hero Left Content */}
          <div className="lg:col-span-7 space-y-8 text-center lg:text-left">
            <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-emerald-900/60 border border-amber-400/40 text-amber-300 backdrop-blur-md shadow-lg shadow-emerald-950/40">
              <Sparkles className="w-4 h-4 text-amber-400 animate-pulse" />
              <span className="text-xs font-bold tracking-wider uppercase">
                Premier Female Residence in Peshawar
              </span>
            </div>

            <div className="space-y-4">
              <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold font-serif tracking-tight leading-[1.1]">
                Academic Peace, <br />
                <span className="text-gradient-gold">5-Star Safety</span> & Homely Comfort
              </h1>
              <p className="text-base sm:text-lg text-slate-300 max-w-2xl font-light leading-relaxed">
                Peshawar&apos;s most prestigious hostel for medical interns, university students, and working women on Main University Road. 100% female-supervised with 3-time nutritious mess meals and uninterrupted power.
              </p>
            </div>

            {/* Quick Stats Strip */}
            <div className="grid grid-cols-3 gap-4 pt-2 max-w-lg mx-auto lg:mx-0">
              <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md">
                <div className="text-2xl sm:text-3xl font-extrabold text-amber-400 font-serif">100%</div>
                <div className="text-[11px] text-slate-300 font-medium">Female Staff & Wardens</div>
              </div>
              <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md">
                <div className="text-2xl sm:text-3xl font-extrabold text-emerald-400 font-serif">24/7</div>
                <div className="text-[11px] text-slate-300 font-medium">Biometrics & CCTV</div>
              </div>
              <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md">
                <div className="text-2xl sm:text-3xl font-extrabold text-amber-400 font-serif">3x</div>
                <div className="text-[11px] text-slate-300 font-medium">Daily Fresh Mess Meals</div>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap gap-4 justify-center lg:justify-start pt-2">
              <Link href="/rooms">
                <Button variant="gold" size="lg" className="font-bold text-sm px-8 shadow-xl shadow-amber-500/25 h-14 rounded-2xl">
                  <Bed className="w-5 h-5 mr-2" />
                  Explore Luxury Rooms
                </Button>
              </Link>
              <Link href="/amenities">
                <Button variant="outline" size="lg" className="border-white/20 hover:bg-white/10 text-white font-semibold text-sm px-7 h-14 rounded-2xl backdrop-blur-md">
                  <ShieldCheck className="w-5 h-5 mr-2 text-emerald-400" />
                  View Security & Facilities
                </Button>
              </Link>
            </div>
          </div>

          {/* Hero Right Visual & Interactive Booking Bar */}
          <div className="lg:col-span-5 space-y-6">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl shadow-black/80 border border-emerald-500/30 group">
              <div className="relative h-72 sm:h-80 w-full overflow-hidden">
                <Image
                  src="/images/hostel-room-luxury.jpg"
                  alt="Educator Girls Hostel Luxury Room Peshawar"
                  fill
                  priority
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />
                <div className="absolute top-4 right-4">
                  <Badge variant="gold" className="font-bold text-xs py-1 px-3 shadow-lg">
                    ⭐ 4.9/5 Rating (120+ Reviews)
                  </Badge>
                </div>
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <span className="text-xs font-semibold text-amber-400 uppercase tracking-wider block">Deluxe Living</span>
                  <h3 className="text-xl font-bold font-serif">Executive Master Bedroom with Attached Bath</h3>
                </div>
              </div>
            </div>

            {/* Live Instant Rent Estimator Card */}
            <div className="p-6 rounded-3xl bg-white/10 dark:bg-slate-900/80 border border-white/15 backdrop-blur-xl shadow-2xl text-xs space-y-4">
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <span className="font-bold text-sm text-amber-300 flex items-center gap-1.5">
                  <Zap className="w-4 h-4 text-amber-400" />
                  Live Rent & Availability Estimator
                </span>
                <span className="text-[10px] text-emerald-300 bg-emerald-950/80 px-2.5 py-1 rounded-full border border-emerald-600/40">
                  ● 4 Beds Left
                </span>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-[11px] text-slate-300 font-semibold">Select Room Type</label>
                  <select
                    value={selectedRoomType}
                    onChange={(e) => setSelectedRoomType(e.target.value)}
                    className="w-full h-10 rounded-xl bg-slate-950/70 border border-white/20 px-3 text-xs text-white"
                  >
                    <option value="single-exec">Single Executive Master</option>
                    <option value="double-deluxe">Deluxe Double Sharing</option>
                    <option value="triple-sharing">Triple Economy Sharing</option>
                    <option value="quad-sharing">Quad Student Sharing</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] text-slate-300 font-semibold">Stay Duration</label>
                  <select
                    value={stayDuration}
                    onChange={(e) => setStayDuration(e.target.value)}
                    className="w-full h-10 rounded-xl bg-slate-950/70 border border-white/20 px-3 text-xs text-white"
                  >
                    <option value="1">1 Month</option>
                    <option value="3">3 Months (Semester)</option>
                    <option value="6">6 Months (Half Year)</option>
                    <option value="12">12 Months (Full Year)</option>
                  </select>
                </div>
              </div>

              <div className="p-3 rounded-2xl bg-emerald-950/50 border border-emerald-600/30 flex justify-between items-center">
                <div>
                  <span className="text-[10px] text-slate-400 block">Monthly Rent (Meals Included)</span>
                  <span className="text-lg font-bold text-amber-300">{formatPKR(estimate.monthly)} / mo</span>
                </div>
                <Link href={`/booking?roomId=${selectedRoomType}&duration=${stayDuration}`}>
                  <Button variant="gold" size="sm" className="font-bold text-xs">
                    Reserve Online →
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* -------------------------------------------------------------------- */}
      {/* 2. THE 4 PILLARS OF EXCELLENCE                                        */}
      {/* -------------------------------------------------------------------- */}
      <section className="py-16 px-4 sm:px-8 max-w-7xl mx-auto w-full -mt-8 z-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="rounded-3xl border border-slate-200/80 dark:border-slate-800/80 shadow-xl shadow-slate-200/40 dark:shadow-none bg-white dark:bg-slate-900 hover:-translate-y-1.5 transition-all duration-300">
            <CardContent className="p-6 space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 flex items-center justify-center">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold font-serif text-slate-900 dark:text-white">5-Tier Biometric Security</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                Biometric turnstiles, 24/7 CCTV surveillance, boundary guards, and automated SMS alerts to parents on entry/exit.
              </p>
            </CardContent>
          </Card>

          <Card className="rounded-3xl border border-slate-200/80 dark:border-slate-800/80 shadow-xl shadow-slate-200/40 dark:shadow-none bg-white dark:bg-slate-900 hover:-translate-y-1.5 transition-all duration-300">
            <CardContent className="p-6 space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-amber-100 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300 flex items-center justify-center">
                <Utensils className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold font-serif text-slate-900 dark:text-white">3-Time Nutritious Mess</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                Hygienically prepared halal breakfast, lunch, and dinner cooked fresh daily by experienced female chefs with rotatory menus.
              </p>
            </CardContent>
          </Card>

          <Card className="rounded-3xl border border-slate-200/80 dark:border-slate-800/80 shadow-xl shadow-slate-200/40 dark:shadow-none bg-white dark:bg-slate-900 hover:-translate-y-1.5 transition-all duration-300">
            <CardContent className="p-6 space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-blue-100 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 flex items-center justify-center">
                <Zap className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold font-serif text-slate-900 dark:text-white">Continuous Generator Power</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                Heavy diesel generator and solar UPS power ensure seamless exam preparation without any load shedding disruptions.
              </p>
            </CardContent>
          </Card>

          <Card className="rounded-3xl border border-slate-200/80 dark:border-slate-800/80 shadow-xl shadow-slate-200/40 dark:shadow-none bg-white dark:bg-slate-900 hover:-translate-y-1.5 transition-all duration-300">
            <CardContent className="p-6 space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-purple-100 dark:bg-purple-950/60 text-purple-700 dark:text-purple-300 flex items-center justify-center">
                <Wifi className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold font-serif text-slate-900 dark:text-white">Dual Fiber Wi-Fi Mesh</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                Dedicated Wi-Fi access points on every floor for online university lectures, Zoom meetings, and research study.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* -------------------------------------------------------------------- */}
      {/* 3. FEATURED ROOMS SHOWCASE                                            */}
      {/* -------------------------------------------------------------------- */}
      <section className="py-16 px-4 sm:px-8 max-w-7xl mx-auto w-full space-y-12">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 border-b border-slate-200 dark:border-slate-800 pb-6">
          <div>
            <Badge variant="emerald" className="mb-2">Accommodations</Badge>
            <h2 className="text-3xl sm:text-4xl font-extrabold font-serif text-slate-900 dark:text-white">
              Tailored Living Spaces
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              Fully furnished executive and shared rooms with inverter ACs, study desks, and 3-time mess included
            </p>
          </div>
          <Link href="/rooms">
            <Button variant="outline" className="text-xs font-semibold">
              View All 4 Categories →
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {ROOMS_DATA.slice(0, 3).map((room: RoomItem) => (
            <Card key={room.id} className="rounded-3xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-xl bg-white dark:bg-slate-900 hover:-translate-y-2 transition-all duration-300 flex flex-col justify-between">
              <div>
                <div className="relative h-60 w-full overflow-hidden">
                  <Image
                    src={room.images[0] || "/images/hostel-room-luxury.jpg"}
                    alt={room.title}
                    fill
                    className="object-cover hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-4 left-4">
                    <Badge variant={room.roomType === "SINGLE" ? "gold" : "emerald"} className="font-bold text-[11px]">
                      {room.roomType} ROOM
                    </Badge>
                  </div>
                  <div className="absolute bottom-4 right-4 bg-slate-950/80 backdrop-blur-md px-3 py-1 rounded-xl text-white font-bold text-xs border border-white/20">
                    {room.availableBeds} Beds Left
                  </div>
                </div>

                <div className="p-6 space-y-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-lg font-bold font-serif text-slate-900 dark:text-white">{language === "ur" ? room.titleUrdu : room.title}</h3>
                      <p className="text-xs text-slate-500">{room.roomType} Occupancy • Floor {room.specifications.floor}</p>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-extrabold text-emerald-700 dark:text-emerald-400">{formatPKR(room.monthlyRentPKR)}</div>
                      <span className="text-[10px] text-slate-400 block">/ Month</span>
                    </div>
                  </div>

                  <p className="text-xs text-slate-600 dark:text-slate-300 line-clamp-2">
                    {language === "ur" ? room.descriptionUrdu : room.description}
                  </p>

                  <div className="flex flex-wrap gap-1.5 pt-2">
                    {(language === "ur" ? room.amenitiesUrdu : room.amenities).slice(0, 4).map((amenity: string, i: number) => (
                      <span key={i} className="text-[10px] px-2 py-0.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 font-medium">
                        ✓ {amenity}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="p-6 pt-0 flex gap-3">
                <Link href={`/rooms/${room.id}`} className="flex-1">
                  <Button variant="outline" className="w-full text-xs font-semibold">
                    Details
                  </Button>
                </Link>
                <Link href={`/booking?roomId=${room.id}`} className="flex-1">
                  <Button variant="emerald" className="w-full text-xs font-bold">
                    Book Now
                  </Button>
                </Link>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* -------------------------------------------------------------------- */}
      {/* 4. WEEKLY MESS DINING MENU SHOWCASE                                  */}
      {/* -------------------------------------------------------------------- */}
      <section className="py-20 px-4 sm:px-8 bg-emerald-950 text-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto w-full space-y-10 relative z-10">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <Badge variant="gold">Nutritious Mess Experience</Badge>
            <h2 className="text-3xl sm:text-4xl font-extrabold font-serif">
              Chef-Crafted Weekly Dining Menu
            </h2>
            <p className="text-xs sm:text-sm text-emerald-200">
              Prepared 3 times daily with fresh ingredients, filtered water, and hygienic female kitchen staff
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
                    ? "bg-amber-400 text-slate-950 shadow-lg shadow-amber-400/30 scale-105"
                    : "bg-emerald-900/60 text-emerald-200 hover:bg-emerald-800/80 border border-emerald-700/50"
                }`}
              >
                {day}
              </button>
            ))}
          </div>

          {/* Meals Grid for Selected Day */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            <div className="p-6 rounded-3xl bg-white/10 border border-white/15 backdrop-blur-md space-y-3">
              <div className="flex items-center gap-2 text-amber-300 font-bold text-sm">
                <Coffee className="w-4 h-4" />
                <span>Breakfast (07:00 AM - 09:30 AM)</span>
              </div>
              <p className="text-sm font-serif text-slate-100">{weeklyMenu[selectedDay].breakfast}</p>
              <span className="text-[11px] text-emerald-300 block">Served with Fresh Milk Tea & Eggs</span>
            </div>

            <div className="p-6 rounded-3xl bg-white/10 border border-white/15 backdrop-blur-md space-y-3">
              <div className="flex items-center gap-2 text-amber-300 font-bold text-sm">
                <Utensils className="w-4 h-4" />
                <span>Lunch (01:00 PM - 03:00 PM)</span>
              </div>
              <p className="text-sm font-serif text-slate-100">{weeklyMenu[selectedDay].lunch}</p>
              <span className="text-[11px] text-emerald-300 block">Served with Seasonal Salad & Mint Raita</span>
            </div>

            <div className="p-6 rounded-3xl bg-white/10 border border-white/15 backdrop-blur-md space-y-3">
              <div className="flex items-center gap-2 text-amber-300 font-bold text-sm">
                <Sparkles className="w-4 h-4" />
                <span>Dinner (07:30 PM - 09:30 PM)</span>
              </div>
              <p className="text-sm font-serif text-slate-100">{weeklyMenu[selectedDay].dinner}</p>
              <span className="text-[11px] text-emerald-300 block">Includes Sweet Dish or Hot Green Tea</span>
            </div>
          </div>
        </div>
      </section>

      {/* -------------------------------------------------------------------- */}
      {/* 5. PESHAWAR CAMPUS PROXIMITY & LOCATION GUIDE                        */}
      {/* -------------------------------------------------------------------- */}
      <section className="py-20 px-4 sm:px-8 max-w-7xl mx-auto w-full space-y-12">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <Badge variant="emerald">Prime Location</Badge>
          <h2 className="text-3xl sm:text-4xl font-extrabold font-serif text-slate-900 dark:text-white">
            Minutes Away From Peshawar&apos;s Top Institutions
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Situated right on Main University Road with effortless access to campuses, hospitals, and BRT stations
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl space-y-2 text-center">
            <div className="text-3xl font-extrabold text-emerald-700 dark:text-emerald-400 font-serif">2 Mins</div>
            <h4 className="font-bold text-sm text-slate-900 dark:text-white">University of Peshawar</h4>
            <p className="text-xs text-slate-500">Walkable distance via Main Campus Gate</p>
          </div>

          <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl space-y-2 text-center">
            <div className="text-3xl font-extrabold text-amber-600 dark:text-amber-400 font-serif">4 Mins</div>
            <h4 className="font-bold text-sm text-slate-900 dark:text-white">Khyber Medical University (KMU)</h4>
            <p className="text-xs text-slate-500">Direct shuttle & walking connectivity</p>
          </div>

          <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl space-y-2 text-center">
            <div className="text-3xl font-extrabold text-blue-600 dark:text-blue-400 font-serif">5 Mins</div>
            <h4 className="font-bold text-sm text-slate-900 dark:text-white">Khyber Teaching Hospital (KTH)</h4>
            <p className="text-xs text-slate-500">Ideal for medical officers and doctors</p>
          </div>

          <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl space-y-2 text-center">
            <div className="text-3xl font-extrabold text-purple-600 dark:text-purple-400 font-serif">1 Min</div>
            <h4 className="font-bold text-sm text-slate-900 dark:text-white">Peshawar BRT Station</h4>
            <p className="text-xs text-slate-500">Fast transit across the entire city</p>
          </div>
        </div>
      </section>

      {/* -------------------------------------------------------------------- */}
      {/* 6. CALL TO ACTION BANNER                                              */}
      {/* -------------------------------------------------------------------- */}
      <section className="py-16 px-4 sm:px-8 max-w-7xl mx-auto w-full mb-12">
        <div className="rounded-3xl bg-gradient-to-r from-emerald-900 via-slate-950 to-emerald-950 text-white p-8 sm:p-14 relative overflow-hidden shadow-2xl border border-amber-400/30">
          <div className="relative z-10 max-w-2xl space-y-6">
            <Badge variant="gold">Limited Fall 2026 Seats</Badge>
            <h2 className="text-3xl sm:text-5xl font-extrabold font-serif leading-tight">
              Ready to Experience Peshawar&apos;s Best Female Living?
            </h2>
            <p className="text-slate-300 text-sm leading-relaxed">
              Book your room online with instant confirmation or contact our chief warden desk for a guided hostel tour.
            </p>
            <div className="flex flex-wrap gap-4 pt-2">
              <Link href="/rooms">
                <Button variant="gold" size="lg" className="font-bold text-xs h-12 px-8 shadow-xl">
                  <Bed className="w-4 h-4 mr-2" />
                  Book Your Bed Now
                </Button>
              </Link>
              <a href="tel:+923001234567">
                <Button variant="outline" size="lg" className="border-white/30 text-white hover:bg-white/10 text-xs h-12 px-7">
                  <Phone className="w-4 h-4 mr-2 text-emerald-400" />
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
