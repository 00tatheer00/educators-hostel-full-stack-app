"use client";

import React, { useState } from "react";
import { useParams, notFound } from "next/navigation";
import Link from "next/link";
import { ROOMS_DATA } from "@/data/roomsData";
import { formatPKR } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, Star, ShieldCheck, Users, Bed, Wifi, Utensils, ArrowLeft, Phone, Calendar, Crown, Sparkles } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export default function RoomDetailPage() {
  const params = useParams();
  const roomId = params.id as string;
  const room = ROOMS_DATA.find((r) => r.id === roomId);

  const { language, t } = useLanguage();
  const isUrdu = language === "ur";

  const [activeImageIndex, setActiveImageIndex] = useState(0);

  if (!room) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center space-y-4 bg-[#070709] text-white">
        <h1 className="text-3xl font-bold">Room Not Found</h1>
        <p className="text-slate-400">The requested room type does not exist or has been updated.</p>
        <Link href="/rooms">
          <Button variant="gold">Return to Rooms Catalog</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#070709] text-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-10 space-y-10">
        {/* Back Button */}
        <Link href="/rooms" className="inline-flex items-center text-xs font-bold text-amber-400 hover:text-amber-300 transition">
          <ArrowLeft className="w-4 h-4 mr-1.5" />
          {isUrdu ? "تمام کمروں کی فہرست پر واپس جائیں" : "Back to Room Listings"}
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Left Column: Photo Gallery & Details */}
          <div className="lg:col-span-8 space-y-8">
            {/* Main Selected Image */}
            <div className="space-y-4">
              <div className="relative h-[380px] sm:h-[460px] rounded-3xl overflow-hidden shadow-2xl border border-amber-500/30 bg-slate-950">
                <img
                  src={room.images[activeImageIndex]}
                  alt={room.title}
                  className="w-full h-full object-cover transition-all duration-300"
                />
                <div className="absolute top-4 right-4 flex gap-2">
                  <Badge variant="gold" className="text-xs px-3 py-1 font-black">
                    {isUrdu ? room.badgeUrdu : room.badge}
                  </Badge>
                  <Badge variant="outline" className="text-xs px-3 py-1 font-bold border-amber-400/50 bg-black/70 text-amber-300">
                    {room.availableBeds} {isUrdu ? "بیڈز دستیاب" : "Beds Left"}
                  </Badge>
                </div>
              </div>

              {/* Thumbnail Selectors */}
              {room.images.length > 1 && (
                <div className="flex items-center gap-3 overflow-x-auto pb-2">
                  {room.images.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveImageIndex(idx)}
                      className={`relative w-24 h-20 rounded-xl overflow-hidden border-2 transition-all shrink-0 ${
                        activeImageIndex === idx ? "border-amber-400 scale-95 shadow-md shadow-amber-500/20" : "border-transparent opacity-70 hover:opacity-100"
                      }`}
                    >
                      <img src={img} alt={`Thumbnail ${idx}`} className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Title & Description */}
            <div className="space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-amber-500/20 pb-4">
                <div>
                  <h1 className="text-3xl font-bold font-serif text-white">
                    {isUrdu ? room.titleUrdu : room.title}
                  </h1>
                  <p className="text-xs text-slate-400 mt-1">
                    Educator Girls Hostel • Main University Road, Peshawar
                  </p>
                </div>
                <div className="text-right">
                  <span className="text-3xl font-black text-amber-400 font-mono">
                    {formatPKR(room.monthlyRentPKR)}
                  </span>
                  <span className="text-xs text-slate-400"> {t("perMonth")}</span>
                </div>
              </div>

              <p className="text-sm text-slate-300 leading-relaxed">
                {isUrdu ? room.descriptionUrdu : room.description}
              </p>
            </div>

            {/* Specifications Grid */}
            <Card className="border-amber-500/25 bg-[#0c0c10]">
              <CardHeader>
                <CardTitle className="text-base font-serif text-white">
                  {isUrdu ? "کمرے کی تکنیکی تفصیلات:" : "Room Specifications"}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-slate-300">
                  <div className="p-3.5 rounded-2xl bg-slate-950 border border-amber-500/15 space-y-1">
                    <span className="font-semibold text-white">Floor Location:</span>
                    <p className="text-amber-300">{room.specifications.floor}</p>
                  </div>
                  <div className="p-3.5 rounded-2xl bg-slate-950 border border-amber-500/15 space-y-1">
                    <span className="font-semibold text-white">Bathroom Setup:</span>
                    <p className="text-amber-300">{room.specifications.bathType}</p>
                  </div>
                  <div className="p-3.5 rounded-2xl bg-slate-950 border border-amber-500/15 space-y-1">
                    <span className="font-semibold text-white">Air Conditioning:</span>
                    <p className="text-amber-300">{room.specifications.acType}</p>
                  </div>
                  <div className="p-3.5 rounded-2xl bg-slate-950 border border-amber-500/15 space-y-1">
                    <span className="font-semibold text-white">Internet & Wi-Fi:</span>
                    <p className="text-amber-300">{room.specifications.wifiSpeed}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Full Amenities Checklist */}
            <div className="space-y-4">
              <h3 className="text-lg font-bold font-serif text-white">
                {isUrdu ? "تمام شامل سہولیات:" : "Included Amenities & Services"}
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {(isUrdu ? room.amenitiesUrdu : room.amenities).map((item, idx) => (
                  <div key={idx} className="flex items-center gap-2.5 p-3 rounded-2xl border border-amber-500/20 bg-[#0c0c10] text-xs text-slate-200 shadow-sm">
                    <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Resident Reviews */}
            <div className="space-y-4 pt-4 border-t border-amber-500/20">
              <h3 className="text-lg font-bold font-serif text-white">
                {isUrdu ? "طالبات کی آراء:" : "Resident Reviews & Feedback"}
              </h3>
              <div className="space-y-4">
                {room.reviews.map((rev) => (
                  <Card key={rev.id} className="border-amber-500/20 bg-[#0c0c10]">
                    <CardContent className="p-5 space-y-2">
                      <div className="flex justify-between items-center">
                        <div>
                          <h4 className="font-bold text-sm text-white">{rev.residentName}</h4>
                          <p className="text-[11px] text-slate-400">{rev.institution}</p>
                        </div>
                        <div className="flex items-center gap-1 text-amber-400">
                          {[...Array(rev.rating)].map((_, i) => (
                            <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                          ))}
                        </div>
                      </div>
                      <p className="text-xs text-slate-300 leading-relaxed">
                        &ldquo;{rev.comment}&rdquo;
                      </p>
                      <span className="text-[10px] text-slate-500 block pt-1">{rev.date}</span>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>

          {/* Right Sidebar: Instant Booking Panel */}
          <div className="lg:col-span-4">
            <Card className="sticky top-28 border-amber-500/35 shadow-2xl overflow-hidden bg-[#0d0d12]">
              <div className="bg-gradient-to-r from-[#14141a] via-[#1a1710] to-[#0c0c10] text-white p-5 space-y-1 border-b border-amber-500/25">
                <span className="text-xs text-amber-400 font-bold uppercase tracking-wider flex items-center gap-1">
                  <Crown className="w-3.5 h-3.5 text-amber-400" />
                  VIP Reservation
                </span>
                <h3 className="font-bold font-serif text-lg text-white">Reserve {room.title}</h3>
              </div>
              <CardContent className="p-6 space-y-6">
                <div className="space-y-3 text-xs text-slate-300">
                  <div className="flex justify-between py-2 border-b border-amber-500/15">
                    <span>Monthly Rent:</span>
                    <span className="font-black text-amber-400 text-sm font-mono">{formatPKR(room.monthlyRentPKR)}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-amber-500/15">
                    <span>Security Deposit (Refundable):</span>
                    <span className="font-bold text-white font-mono">{formatPKR(room.securityDepositPKR)}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-amber-500/15">
                    <span>Capacity & Beds:</span>
                    <span>{room.capacity} Resident ({room.availableBeds} Available)</span>
                  </div>
                  <div className="flex justify-between py-2">
                    <span>Mess & Utilities:</span>
                    <span className="text-amber-400 font-bold">Included in Rent</span>
                  </div>
                </div>

                <Link href={`/booking?roomId=${room.id}`} className="block">
                  <Button size="lg" className="w-full font-black text-xs h-12 bg-gradient-to-r from-amber-500 via-amber-400 to-amber-600 text-slate-950 hover:from-amber-400 hover:to-amber-300 shadow-xl shadow-amber-500/25">
                    Proceed to Booking →
                  </Button>
                </Link>

                <div className="pt-4 border-t border-amber-500/15 text-center space-y-2">
                  <p className="text-[11px] text-slate-400">Need help or a physical visit first?</p>
                  <a href="tel:+923001234567" className="inline-flex items-center gap-1.5 text-xs text-amber-400 font-bold hover:underline font-mono">
                    <Phone className="w-3.5 h-3.5 text-amber-400" />
                    Call Hostel Warden: +92 300 1234567
                  </a>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
