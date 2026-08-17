"use client";

import Link from "next/link";
import Image from "next/image";
import { Bed, Users, CheckCircle2, Star, ArrowRight, ShieldCheck, Zap } from "lucide-react";
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
    <Card className="overflow-hidden rounded-3xl border-2 border-slate-200 dark:border-slate-800 flex flex-col group hover:shadow-2xl shadow-slate-200/50 dark:shadow-none hover:-translate-y-2 transition-all duration-300 bg-white dark:bg-slate-900">
      {/* Image Banner */}
      <div className="relative h-64 overflow-hidden bg-slate-100 dark:bg-slate-800">
        <img
          src={room.images[0]}
          alt={room.title}
          className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent" />

        {/* Top Badges */}
        <div className="absolute top-3.5 right-3.5 flex flex-col gap-1.5 items-end">
          <span className="px-3 py-1 rounded-full bg-gradient-to-r from-pink-500 to-rose-600 text-white font-black text-xs shadow-md border border-white/20">
            {isUrdu ? room.badgeUrdu : room.badge}
          </span>
          <span className="px-2.5 py-0.5 rounded-full bg-teal-500 text-slate-950 font-black text-[10px] shadow-sm">
            {room.availableBeds} {isUrdu ? "بیڈز باقی" : "Beds Left"}
          </span>
        </div>

        {/* Capacity & Floor Tag */}
        <div className="absolute bottom-3.5 left-3.5 flex items-center gap-2">
          <div className="bg-slate-950/85 backdrop-blur-md text-white text-xs px-3 py-1 rounded-full flex items-center gap-1.5 border border-white/20">
            <Users className="w-3.5 h-3.5 text-pink-400" />
            <span className="font-bold">
              {room.capacity} {isUrdu ? "مقیم طالبات" : room.capacity === 1 ? "Resident" : "Residents"}
            </span>
          </div>
          <div className="bg-slate-950/85 backdrop-blur-md text-slate-300 text-[11px] px-2.5 py-1 rounded-full border border-white/20 font-semibold">
            Floor {room.specifications.floor}
          </div>
        </div>
      </div>

      <CardContent className="p-6 flex-grow flex flex-col justify-between space-y-5">
        <div className="space-y-3">
          <div className="flex justify-between items-start">
            <h3 className={`font-black text-xl text-slate-900 dark:text-white ${isUrdu ? "font-serif text-right" : "font-serif"}`}>
              {isUrdu ? room.titleUrdu : room.title}
            </h3>
          </div>

          <p className={`text-xs text-slate-600 dark:text-slate-400 line-clamp-2 leading-relaxed ${isUrdu ? "text-right" : ""}`}>
            {isUrdu ? room.descriptionUrdu : room.description}
          </p>

          {/* Quick Specs */}
          <div className="pt-3 border-t border-slate-100 dark:border-slate-800 space-y-2">
            <h4 className="text-[10px] font-black uppercase tracking-wider text-pink-600 dark:text-pink-400 font-mono">
              {isUrdu ? "شامل سہولیات:" : "All-Inclusive Features:"}
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
              {(isUrdu ? room.amenitiesUrdu : room.amenities).slice(0, 4).map((amenity, idx) => (
                <div key={idx} className="flex items-center gap-1.5 text-xs text-slate-700 dark:text-slate-300 font-medium">
                  <CheckCircle2 className="w-3.5 h-3.5 text-teal-600 dark:text-teal-400 shrink-0" />
                  <span className="truncate">{amenity}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Pricing & CTA */}
        <div className="pt-4 border-t border-slate-100 dark:border-slate-800 space-y-3">
          <div className="flex justify-between items-baseline bg-slate-50 dark:bg-slate-950/60 p-3 rounded-2xl border border-slate-100 dark:border-slate-800">
            <div>
              <span className="text-2xl font-black text-emerald-600 dark:text-emerald-400">
                {formatPKR(room.monthlyRentPKR)}
              </span>
              <span className="text-xs text-slate-500 font-semibold"> / mo</span>
              <span className="text-[10px] text-teal-600 dark:text-teal-400 block font-bold">3-Time Mess Included</span>
            </div>
            <span className="text-[11px] text-slate-500 font-medium">
              Deposit: {formatPKR(room.securityDepositPKR)}
            </span>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <Link href={`/rooms/${room.id}`}>
              <Button
                variant="outline"
                className="w-full text-xs font-bold rounded-2xl h-11 border-slate-300 dark:border-slate-700 hover:bg-pink-50 dark:hover:bg-pink-950/30"
              >
                {t("viewDetails")}
              </Button>
            </Link>
            <Link href={`/booking?roomId=${room.id}`}>
              <Button
                className="w-full text-xs font-black rounded-2xl h-11 bg-gradient-to-r from-pink-500 to-indigo-600 hover:from-pink-600 hover:to-indigo-700 text-white shadow-lg shadow-pink-500/25"
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
