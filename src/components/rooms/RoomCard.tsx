"use client";

import Link from "next/link";
import { Bed, Users, CheckCircle2, Star, ArrowRight, ShieldCheck } from "lucide-react";
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
    <Card className="overflow-hidden border-slate-200 dark:border-slate-800 flex flex-col group hover:shadow-xl transition-all duration-300">
      {/* Image Banner */}
      <div className="relative h-60 overflow-hidden bg-slate-100">
        <img
          src={room.images[0]}
          alt={room.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute top-3 right-3 flex flex-col gap-1 items-end">
          <Badge variant="gold" className="font-semibold">
            {isUrdu ? room.badgeUrdu : room.badge}
          </Badge>
          <Badge variant="emerald" className="text-[11px]">
            {room.availableBeds} {isUrdu ? "بیڈز دستیاب" : "Beds Left"}
          </Badge>
        </div>

        {/* Capacity Tag */}
        <div className="absolute bottom-3 left-3 bg-slate-950/80 backdrop-blur-md text-white text-xs px-3 py-1 rounded-full flex items-center gap-1.5 border border-white/20">
          <Users className="w-3.5 h-3.5 text-amber-400" />
          <span>
            {room.capacity} {isUrdu ? "مقیم طالبات" : room.capacity === 1 ? "Resident" : "Residents"}
          </span>
        </div>
      </div>

      <CardContent className="p-6 flex-grow flex flex-col justify-between space-y-6">
        <div className="space-y-3">
          <h3 className={`font-bold text-xl text-slate-900 dark:text-slate-100 ${isUrdu ? "font-serif text-right" : "font-serif"}`}>
            {isUrdu ? room.titleUrdu : room.title}
          </h3>

          <p className={`text-xs text-slate-600 dark:text-slate-400 line-clamp-2 leading-relaxed ${isUrdu ? "text-right" : ""}`}>
            {isUrdu ? room.descriptionUrdu : room.description}
          </p>

          {/* Quick Specs */}
          <div className="pt-2 border-t border-slate-100 dark:border-slate-800 space-y-2">
            <h4 className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
              {isUrdu ? "شامل سہولیات:" : "Key Amenities:"}
            </h4>
            <div className="space-y-1.5">
              {(isUrdu ? room.amenitiesUrdu : room.amenities).slice(0, 4).map((amenity, idx) => (
                <div key={idx} className="flex items-center gap-2 text-xs text-slate-700 dark:text-slate-300">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>{amenity}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Pricing & CTA */}
        <div className="pt-4 border-t border-slate-100 dark:border-slate-800 space-y-3">
          <div className="flex justify-between items-baseline">
            <div>
              <span className="text-2xl font-extrabold text-emerald-900 dark:text-emerald-400">
                {formatPKR(room.monthlyRentPKR)}
              </span>
              <span className="text-xs text-slate-500"> {t("perMonth")}</span>
            </div>
            <span className="text-[11px] text-slate-500">
              {t("securityDeposit")}: {formatPKR(room.securityDepositPKR)}
            </span>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <Link href={`/rooms/${room.id}`}>
              <Button variant="outline" className="w-full text-xs font-semibold border-slate-300 dark:border-slate-700">
                {t("viewDetails")}
              </Button>
            </Link>
            <Link href={`/booking?roomId=${room.id}`}>
              <Button variant="gold" className="w-full text-xs font-semibold">
                {t("bookNow")}
              </Button>
            </Link>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
