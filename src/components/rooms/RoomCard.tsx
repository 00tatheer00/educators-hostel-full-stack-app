"use client";

import Link from "next/link";
import { Bed, Users, CheckCircle2, Star, ArrowRight, ShieldCheck, Zap, Crown } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { formatPKR } from "@/lib/utils";
import { RoomItem } from "@/data/roomsData";
import { useLanguage } from "@/context/LanguageContext";

export function RoomCard({ room }: { room: RoomItem }) {
  const { language, t } = useLanguage();
  const isUrdu = language === "ur";

  return (
    <Card className="overflow-hidden rounded-3xl border border-amber-500/25 flex flex-col group hover:border-amber-400/60 hover:shadow-2xl hover:shadow-amber-500/10 hover:-translate-y-2 transition-all duration-300 bg-[#0c0c10]">
      {/* Image Banner */}
      <div className="relative h-64 overflow-hidden bg-slate-950">
        <img
          src={room.images[0]}
          alt={room.title}
          className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0c0c10] via-slate-950/30 to-transparent" />

        {/* Top Badges */}
        <div className="absolute top-3.5 right-3.5 flex flex-col gap-1.5 items-end">
          <span className="px-3 py-1 rounded-full bg-gradient-to-r from-amber-500 to-yellow-500 text-slate-950 font-black text-xs shadow-md border border-amber-300/40">
            {isUrdu ? room.badgeUrdu : room.badge}
          </span>
          <span className="px-2.5 py-0.5 rounded-full bg-slate-950/90 text-amber-300 border border-amber-500/40 font-bold text-[10px] shadow-sm">
            {room.availableBeds} {isUrdu ? "بیڈز باقی" : "Beds Left"}
          </span>
        </div>

        {/* Capacity & Floor Tag */}
        <div className="absolute bottom-3.5 left-3.5 flex items-center gap-2">
          <div className="bg-slate-950/90 backdrop-blur-md text-white text-xs px-3 py-1 rounded-full flex items-center gap-1.5 border border-amber-500/30">
            <Users className="w-3.5 h-3.5 text-amber-400" />
            <span className="font-bold">
              {room.capacity} {isUrdu ? "مقیم طالبات" : room.capacity === 1 ? "Resident" : "Residents"}
            </span>
          </div>
          <div className="bg-slate-950/90 backdrop-blur-md text-slate-300 text-[11px] px-2.5 py-1 rounded-full border border-amber-500/20 font-semibold">
            Floor {room.specifications.floor}
          </div>
        </div>
      </div>

      <CardContent className="p-6 flex-grow flex flex-col justify-between space-y-5">
        <div className="space-y-3">
          <div className="flex justify-between items-start">
            <h3 className={`font-black text-xl text-white ${isUrdu ? "font-serif text-right" : "font-serif"}`}>
              {isUrdu ? room.titleUrdu : room.title}
            </h3>
          </div>

          <p className={`text-xs text-slate-300 line-clamp-2 leading-relaxed ${isUrdu ? "text-right" : ""}`}>
            {isUrdu ? room.descriptionUrdu : room.description}
          </p>

          {/* Quick Specs */}
          <div className="pt-3 border-t border-amber-500/15 space-y-2">
            <h4 className="text-[10px] font-black uppercase tracking-wider text-amber-400 font-mono">
              {isUrdu ? "شامل سہولیات:" : "All-Inclusive Features:"}
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
              {(isUrdu ? room.amenitiesUrdu : room.amenities).slice(0, 4).map((amenity, idx) => (
                <div key={idx} className="flex items-center gap-1.5 text-xs text-slate-200 font-medium">
                  <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                  <span className="truncate">{amenity}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Pricing & CTA */}
        <div className="pt-4 border-t border-amber-500/15 space-y-3">
          <div className="flex justify-between items-baseline bg-slate-950/80 p-3 rounded-2xl border border-amber-500/20">
            <div>
              <span className="text-2xl font-black text-amber-400 font-mono">
                {formatPKR(room.monthlyRentPKR)}
              </span>
              <span className="text-xs text-slate-400 font-semibold"> / mo</span>
              <span className="text-[10px] text-amber-300 block font-bold">3-Time Mess Included</span>
            </div>
            <span className="text-[11px] text-slate-400 font-medium">
              Deposit: {formatPKR(room.securityDepositPKR)}
            </span>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <Link href={`/rooms/${room.id}`}>
              <Button
                variant="outline"
                className="w-full text-xs font-bold rounded-2xl h-11 border-amber-500/30 text-amber-300 hover:bg-amber-500/10"
              >
                {t("viewDetails")}
              </Button>
            </Link>
            <Link href={`/booking?roomId=${room.id}`}>
              <Button
                className="w-full text-xs font-black rounded-2xl h-11 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 shadow-lg shadow-amber-500/25"
              >
                {t("bookNow")} →
              </Button>
            </Link>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
