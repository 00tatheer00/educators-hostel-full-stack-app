"use client";

import React, { useState } from "react";
import { ROOMS_DATA, RoomItem } from "@/data/roomsData";
import { RoomCard } from "@/components/rooms/RoomCard";
import { RoomFilters } from "@/components/rooms/RoomFilters";
import { Badge } from "@/components/ui/badge";
import { useLanguage } from "@/context/LanguageContext";

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
    <div className="max-w-7xl mx-auto px-4 sm:px-8 py-12 space-y-10">
      {/* Title */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <Badge variant="emerald">{t("accommodations")}</Badge>
        <h1 className="text-4xl font-extrabold font-serif text-slate-900 dark:text-slate-100">
          {isUrdu ? "کمروں کی فہرست اور آن لائن بکنگ" : "Explore Rooms & Reserve Your Seat"}
        </h1>
        <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
          {isUrdu
            ? "تمام کمروں میں 3 وقت کا کھانا، یو پی ایس اور جنریٹر بیک اپ، وائی فائی اور سیکیورٹی شامل ہے۔"
            : "All monthly room rates include 3-time mess meals, generator electricity backup, high-speed fiber internet, and biometric gate pass access."}
        </p>
      </div>

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
          <div className="flex justify-between items-center text-xs text-slate-500 font-semibold border-b border-slate-100 dark:border-slate-800 pb-3">
            <span>
              {isUrdu ? "دستیاب کمرے:" : "Showing Accommodations:"} {filteredRooms.length} of {ROOMS_DATA.length}
            </span>
            <span>University Road, Peshawar</span>
          </div>

          {filteredRooms.length === 0 ? (
            <div className="bg-slate-50 dark:bg-slate-900 rounded-2xl p-12 text-center border border-slate-200 dark:border-slate-800 space-y-3">
              <h3 className="text-lg font-bold">No Rooms Match Your Search Criteria</h3>
              <p className="text-xs text-slate-500">Try adjusting your price range or clearing amenity filters.</p>
              <button
                onClick={resetFilters}
                className="text-xs font-semibold text-emerald-800 dark:text-emerald-400 hover:underline"
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
  );
}
