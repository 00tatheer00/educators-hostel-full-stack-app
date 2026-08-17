"use client";

import React, { useState } from "react";
import { ROOMS_DATA, RoomItem } from "@/data/roomsData";
import { RoomCard } from "@/components/rooms/RoomCard";
import { RoomFilters } from "@/components/rooms/RoomFilters";
import { Badge } from "@/components/ui/badge";
import { useLanguage } from "@/context/LanguageContext";
import { SquiggleWave, CapsulePillBar, PolkaDotGrid } from "@/components/decorative/DoodleVectors";

export default function RoomsPage() {
  const { language, t } = useLanguage();
  const isUrdu = language === "ur";

  // Filter States
  const [searchQuery, setSearchQuery] = useState("");
  const [roomTypeFilter, setRoomTypeFilter] = useState("ALL");
  const [maxPrice, setMaxPrice] = useState(35000);
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);

  const toggleAmenity = (amenity: string) => {
    if (selectedAmenities.includes(amenity)) {
      setSelectedAmenities(selectedAmenities.filter((a) => a !== amenity));
    } else {
      setSelectedAmenities([...selectedAmenities, amenity]);
    }
  };

  const resetFilters = () => {
    setSearchQuery("");
    setRoomTypeFilter("ALL");
    setMaxPrice(35000);
    setSelectedAmenities([]);
  };

  // Filter Logic
  const filteredRooms = ROOMS_DATA.filter((room) => {
    // 1. Room Type Category Filter
    if (roomTypeFilter !== "ALL" && room.roomType !== roomTypeFilter) {
      return false;
    }

    // 2. Price Filter
    if (room.monthlyRentPKR > maxPrice) {
      return false;
    }

    // 3. Search Query Filter
    if (searchQuery.trim() !== "") {
      const q = searchQuery.toLowerCase();
      const matchTitle = room.title.toLowerCase().includes(q) || room.titleUrdu.includes(q);
      const matchDesc = room.description.toLowerCase().includes(q) || room.descriptionUrdu.includes(q);
      const matchAmenity = room.amenities.some((a) => a.toLowerCase().includes(q));
      if (!matchTitle && !matchDesc && !matchAmenity) {
        return false;
      }
    }

    // 4. Must-Have Amenities Filter
    if (selectedAmenities.length > 0) {
      const hasAll = selectedAmenities.every((selected) =>
        room.amenities.some((a) => a.toLowerCase().includes(selected.toLowerCase()))
      );
      if (!hasAll) return false;
    }

    return true;
  });

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      {/* Saturated Header Banner */}
      <section className="relative bg-gradient-to-r from-pink-950 via-slate-950 to-indigo-950 text-white py-20 px-4 sm:px-8 overflow-hidden">
        <div className="absolute top-6 right-8 opacity-70 hidden md:block">
          <SquiggleWave color="#FF1E7A" width={140} height={28} />
        </div>
        <div className="absolute bottom-6 left-8 opacity-60 hidden md:block">
          <PolkaDotGrid rows={3} cols={6} dotColor="bg-teal-400/40" />
        </div>

        <div className="max-w-4xl mx-auto text-center space-y-4 relative z-10">
          <span className="px-4 py-1.5 rounded-full bg-pink-500/20 text-pink-300 font-extrabold text-xs uppercase tracking-wider border border-pink-400/40">
            ★ Available Accommodations
          </span>
          <h1 className="text-4xl sm:text-6xl font-black font-serif tracking-tight leading-tight">
            Explore Rooms & <span className="text-gradient-pink">Reserve Your Bed</span>
          </h1>
          <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto leading-relaxed">
            {isUrdu
              ? "تمام کمروں میں 3 وقت کا کھانا، یو پی ایس اور جنریٹر بیک اپ، وائی فائی اور سیکیورٹی شامل ہے۔"
              : "All monthly room rates include 3-time mess meals, generator backup, high-speed fiber internet, and 24/7 biometric security."}
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-16 space-y-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Filter Toolbar Sidebar */}
          <div className="lg:col-span-4">
            <RoomFilters
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              roomTypeFilter={roomTypeFilter}
              setRoomTypeFilter={setRoomTypeFilter}
              maxPrice={maxPrice}
              setMaxPrice={setMaxPrice}
              selectedAmenities={selectedAmenities}
              toggleAmenity={toggleAmenity}
              resetFilters={resetFilters}
            />
          </div>

          {/* Right Rooms Grid Display */}
          <div className="lg:col-span-8 space-y-6">
            <div className="flex justify-between items-center text-xs text-slate-500 font-bold border-b border-slate-200 dark:border-slate-800 pb-3">
              <span>
                {isUrdu ? "دستیاب کمرے:" : "Showing Accommodations:"} {filteredRooms.length} of {ROOMS_DATA.length}
              </span>
              <span className="text-pink-600 dark:text-pink-400">Main University Road, Peshawar</span>
            </div>

            {filteredRooms.length === 0 ? (
              <div className="bg-white dark:bg-slate-900 rounded-3xl p-12 text-center border-2 border-slate-200 dark:border-slate-800 space-y-3 shadow-md">
                <h3 className="text-lg font-bold">No Rooms Match Your Search Criteria</h3>
                <p className="text-xs text-slate-500">Try adjusting your budget range or clearing selected amenity filters.</p>
                <button
                  onClick={resetFilters}
                  className="text-xs font-bold text-pink-600 hover:underline"
                >
                  Clear All Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {filteredRooms.map((room) => (
                  <RoomCard key={room.id} room={room} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
