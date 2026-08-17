"use client";

import { Search, SlidersHorizontal, Check } from "lucide-react";
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
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm space-y-6">
      <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-4">
        <div className="flex items-center gap-2 font-bold font-serif text-lg text-slate-900 dark:text-slate-100">
          <SlidersHorizontal className="w-5 h-5 text-emerald-700" />
          <span>{isUrdu ? "کمرے کی تلاش اور فلٹرز" : "Filter Accommodations"}</span>
        </div>
        <button
          onClick={resetFilters}
          className="text-xs text-amber-600 font-semibold hover:underline"
        >
          {isUrdu ? "تمام فلٹرز ری سیٹ کریں" : "Reset All"}
        </button>
      </div>

      {/* Search Input */}
      <div className="space-y-2">
        <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
          {isUrdu ? "نام یا سہولت سے تلاش کریں" : "Search Keyword"}
        </label>
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3.5" />
          <Input
            placeholder={isUrdu ? "مثلاً: سنگل، اے سی، گیزر..." : "e.g., Single, Executive, AC..."}
            className="pl-9"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Room Type Buttons */}
      <div className="space-y-2">
        <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
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
            <Button
              key={cat.id}
              variant={roomTypeFilter === cat.id ? "emerald" : "outline"}
              size="sm"
              className="text-xs justify-center"
              onClick={() => setRoomTypeFilter(cat.id)}
            >
              {cat.label}
            </Button>
          ))}
        </div>
      </div>

      {/* Max Price Range Slider */}
      <div className="space-y-2 pt-2 border-t border-slate-100 dark:border-slate-800">
        <div className="flex justify-between items-center text-xs">
          <span className="font-semibold text-slate-700 dark:text-slate-300">
            {isUrdu ? "زیادہ سے زیادہ کرایہ:" : "Max Rent limit:"}
          </span>
          <span className="font-bold text-emerald-800 dark:text-emerald-400 font-mono">
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
          className="w-full accent-emerald-700 cursor-pointer"
        />
        <div className="flex justify-between text-[10px] text-slate-400">
          <span>Rs. 10,000</span>
          <span>Rs. 35,000</span>
        </div>
      </div>

      {/* Must-Have Features Checkboxes */}
      <div className="space-y-3 pt-2 border-t border-slate-100 dark:border-slate-800">
        <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
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
                className="flex items-center gap-2 cursor-pointer select-none text-slate-700 dark:text-slate-300 hover:text-emerald-700"
              >
                <div
                  className={`w-4 h-4 rounded border flex items-center justify-center transition-colors ${
                    isChecked
                      ? "bg-emerald-700 border-emerald-700 text-white"
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
