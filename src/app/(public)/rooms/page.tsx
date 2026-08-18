"use client";

import React, { useState } from "react";
import { ROOMS_DATA, RoomItem } from "@/data/roomsData";
import { RoomCard } from "@/components/rooms/RoomCard";
import { RoomFilters } from "@/components/rooms/RoomFilters";
import { Badge } from "@/components/ui/badge";
import { Crown } from "lucide-react";
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
    <div className="min-h-screen bg-[#070709] text-slate-100">
      {/* Luxury Black & Gold Header Banner */}
      <section className="relative bg-gradient-to-r from-[#0d0d12] via-[#171410] to-[#0a0a0e] text-white py-20 px-4 sm:px-8 overflow-hidden border-b border-amber-500/20">
        <div className="absolute top-6 right-8 opacity-60 hidden md:block">
          <SquiggleWave color="#d4af37" width={140} height={28} />
        </div>
        <div className="absolute bottom-6 left-8 opacity-40 hidden md:block">
          <PolkaDotGrid rows={3} cols={6} dotColor="bg-amber-400/40" />
        </div>

        <div className="max-w-4xl mx-auto text-center space-y-4 relative z-10">
          <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-amber-500/15 text-amber-300 font-extrabold text-xs uppercase tracking-wider border border-amber-400/40">
            <Crown className="w-3.5 h-3.5 text-amber-400" />
            Available Accommodations
          </span>
          <h1 className="text-4xl sm:text-6xl font-black font-serif tracking-tight leading-tight text-white">
            Explore Rooms & <span className="text-gradient-gold-pure">Reserve Your Bed</span>
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
            <div className="flex justify-between items-center text-xs text-slate-400 font-bold border-b border-amber-500/20 pb-3">
              <span>
                {isUrdu ? "دستیاب کمرے:" : "Showing Accommodations:"} <span className="text-amber-300 font-bold">{filteredRooms.length}</span> of {ROOMS_DATA.length}
              </span>
              <span className="text-amber-400">Main University Road, Peshawar</span>
            </div>

            {filteredRooms.length === 0 ? (
              <div className="bg-[#0d0d12] rounded-3xl p-12 text-center border border-amber-500/25 space-y-3 shadow-2xl">
                <h3 className="text-lg font-bold text-white">No Rooms Match Your Search Criteria</h3>
                <p className="text-xs text-slate-400">Try adjusting your budget range or clearing selected amenity filters.</p>
                <button
                  onClick={resetFilters}
                  className="text-xs font-bold text-amber-400 hover:underline"
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
