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
    <div className="bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-xl space-y-6">
      <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-4">
        <div className="flex items-center gap-2 font-bold font-serif text-lg text-slate-900 dark:text-white">
          <SlidersHorizontal className="w-5 h-5 text-pink-600" />
          <span>{isUrdu ? "کمرے کی تلاش اور فلٹرز" : "Filter Rooms"}</span>
        </div>
        <button
          onClick={resetFilters}
          className="text-xs text-pink-600 dark:text-pink-400 font-bold hover:underline"
        >
          {isUrdu ? "تمام فلٹرز ری سیٹ کریں" : "Reset All"}
        </button>
      </div>

      {/* Search Input */}
      <div className="space-y-2">
        <label className="text-xs font-bold text-slate-700 dark:text-slate-200">
          {isUrdu ? "نام یا سہولت سے تلاش کریں" : "Search Keyword"}
        </label>
        <div className="relative">
          <Search className="w-4 h-4 text-pink-500 absolute left-3.5 top-3.5" />
          <Input
            placeholder={isUrdu ? "مثلاً: سنگل، اے سی، گیزر..." : "e.g., Single, Executive, AC..."}
            className="pl-10 rounded-2xl h-11 border-slate-300 dark:border-slate-700 focus-visible:ring-pink-500"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Room Type Buttons */}
      <div className="space-y-2">
        <label className="text-xs font-bold text-slate-700 dark:text-slate-200">
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
                  ? "bg-gradient-to-r from-pink-500 to-indigo-600 text-white shadow-md shadow-pink-500/25"
                  : "bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 border border-slate-200 dark:border-slate-700"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Max Price Range Slider */}
      <div className="space-y-2 pt-2 border-t border-slate-100 dark:border-slate-800">
        <div className="flex justify-between items-center text-xs">
          <span className="font-bold text-slate-700 dark:text-slate-300">
            {isUrdu ? "زیادہ سے زیادہ کرایہ:" : "Max Budget Limit:"}
          </span>
          <span className="font-black text-pink-600 dark:text-pink-400 font-mono text-sm">
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
          className="w-full accent-pink-600 cursor-pointer h-2 bg-slate-200 dark:bg-slate-700 rounded-lg"
        />
        <div className="flex justify-between text-[10px] text-slate-400 font-bold">
          <span>Rs. 10,000</span>
          <span>Rs. 35,000</span>
        </div>
      </div>

      {/* Must-Have Features Checkboxes */}
      <div className="space-y-3 pt-2 border-t border-slate-100 dark:border-slate-800">
        <label className="text-xs font-bold text-slate-700 dark:text-slate-200">
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
                className="flex items-center gap-2.5 cursor-pointer select-none text-slate-700 dark:text-slate-300 hover:text-pink-600 font-medium"
              >
                <div
                  className={`w-4 h-4 rounded-lg border-2 flex items-center justify-center transition-all ${
                    isChecked
                      ? "bg-pink-600 border-pink-600 text-white"
                      : "border-slate-300 dark:border-slate-700 bg-background"
                  }`}
                >
                  {isChecked && <Check className="w-3 h-3 stroke-[3]" />}
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
