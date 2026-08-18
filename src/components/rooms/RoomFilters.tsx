"use client";

import { Search, SlidersHorizontal, Check, Sparkles } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/context/LanguageContext";

interface RoomFiltersProps {
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  roomTypeFilter: string;
  setRoomTypeFilter: (type: string) => void;
  maxPrice: number;
  setMaxPrice: (price: number) => void;
  selectedAmenities: string[];
  toggleAmenity: (amenity: string) => void;
  resetFilters: () => void;
}

export function RoomFilters({
  searchQuery,
  setSearchQuery,
  roomTypeFilter,
  setRoomTypeFilter,
  maxPrice,
  setMaxPrice,
  selectedAmenities,
  toggleAmenity,
  resetFilters,
}: RoomFiltersProps) {
  const { language } = useLanguage();
  const isUrdu = language === "ur";

  return (
    <div className="bg-[#0d0d12] border border-amber-500/30 rounded-3xl p-6 shadow-2xl space-y-6">
      <div className="flex items-center justify-between border-b border-amber-500/20 pb-4">
        <div className="flex items-center gap-2 font-bold font-serif text-lg text-white">
          <SlidersHorizontal className="w-5 h-5 text-amber-400" />
          <span>{isUrdu ? "کمرے کی تلاش اور فلٹرز" : "Filter Rooms"}</span>
        </div>
        <button
          onClick={resetFilters}
          className="text-xs text-amber-400 font-bold hover:underline"
        >
          {isUrdu ? "تمام فلٹرز ری سیٹ کریں" : "Reset All"}
        </button>
      </div>

      {/* Search Input */}
      <div className="space-y-2">
        <label className="text-xs font-bold text-slate-300">
          {isUrdu ? "نام یا سہولت سے تلاش کریں" : "Search Keyword"}
        </label>
        <div className="relative">
          <Search className="w-4 h-4 text-amber-400 absolute left-3.5 top-3.5" />
          <Input
            placeholder={isUrdu ? "مثلاً: سنگل، اے سی، گیزر..." : "e.g., Single, Executive, AC..."}
            className="pl-10 rounded-2xl h-11 border-amber-500/30 bg-slate-950/80 focus-visible:ring-amber-500"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Room Type Buttons */}
      <div className="space-y-2">
        <label className="text-xs font-bold text-slate-300">
          {isUrdu ? "کمرے کی قسم:" : "Room Category:"}
        </label>
        <div className="grid grid-cols-2 gap-2">
          {[
            { id: "ALL", label: isUrdu ? "تمام کمرے" : "All Types" },
            { id: "SINGLE", label: isUrdu ? "سنگل سویٹ" : "Single Suite" },
            { id: "DOUBLE", label: isUrdu ? "ڈبل شیئرنگ" : "Double Sharing" },
            { id: "TRIPLE", label: isUrdu ? "ٹرپل شیئرنگ" : "Triple Sharing" },
            { id: "QUAD", label: isUrdu ? "کواڈ شیئرنگ" : "Quad Sharing" },
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => setRoomTypeFilter(cat.id)}
              className={`px-3 py-2 rounded-2xl text-xs font-bold transition-all ${
                roomTypeFilter === cat.id
                  ? "bg-gradient-to-r from-amber-500 to-yellow-500 text-slate-950 font-black shadow-md shadow-amber-500/25"
                  : "bg-slate-950 border border-amber-500/20 text-slate-300 hover:border-amber-400/50"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Max Price Range Slider */}
      <div className="space-y-2 pt-2 border-t border-amber-500/15">
        <div className="flex justify-between items-center text-xs">
          <span className="font-bold text-slate-300">
            {isUrdu ? "زیادہ سے زیادہ کرایہ:" : "Max Budget Limit:"}
          </span>
          <span className="font-black text-amber-400 font-mono text-sm">
            Rs. {maxPrice.toLocaleString()} / mo
          </span>
        </div>
        <input
          type="range"
          min="10000"
          max="35000"
          step="1000"
          value={maxPrice}
          onChange={(e) => setMaxPrice(Number(e.target.value))}
          className="w-full accent-amber-500 cursor-pointer h-2 bg-slate-950 rounded-lg"
        />
        <div className="flex justify-between text-[10px] text-slate-400 font-bold">
          <span>Rs. 10,000</span>
          <span>Rs. 35,000</span>
        </div>
      </div>

      {/* Must-Have Features Checkboxes */}
      <div className="space-y-3 pt-2 border-t border-amber-500/15">
        <label className="text-xs font-bold text-slate-300">
          {isUrdu ? "لازمی سہولیات:" : "Must-Have Amenities:"}
        </label>
        <div className="space-y-2 text-xs">
          {[
            { id: "AC", label: isUrdu ? "ایئر کنڈیشنر / انورٹر" : "Air Conditioner / Inverter" },
            { id: "Private Bath", label: isUrdu ? "پرائیویٹ اٹیچڈ باتھ روم" : "Private Attached Bathroom" },
            { id: "Study Desk", label: isUrdu ? "انفرادی اسٹڈی ڈیسک" : "Dedicated Study Desk" },
            { id: "Wi-Fi Router", label: isUrdu ? "ڈیڈیکیٹڈ وائی فائی" : "Dedicated Wi-Fi Router" },
          ].map((item) => {
            const isChecked = selectedAmenities.includes(item.id);
            return (
              <label
                key={item.id}
                onClick={() => toggleAmenity(item.id)}
                className="flex items-center gap-2.5 cursor-pointer select-none text-slate-300 hover:text-amber-300 font-medium"
              >
                <div
                  className={`w-4 h-4 rounded-lg border-2 flex items-center justify-center transition-all ${
                    isChecked
                      ? "bg-amber-500 border-amber-500 text-slate-950 font-black"
                      : "border-amber-500/40 bg-slate-950"
                  }`}
                >
                  {isChecked && <Check className="w-3 h-3 stroke-[3] text-slate-950" />}
                </div>
                <span>{item.label}</span>
              </label>
            );
          })}
        </div>
      </div>
    </div>
  );
}
