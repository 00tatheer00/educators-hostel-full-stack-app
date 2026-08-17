"use client";

import React, { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { LightboxModal, GalleryItem } from "@/components/gallery/LightboxModal";
import { Maximize2, Camera, Sparkles } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { SquiggleWave, PolkaDotGrid, CapsulePillBar, RotatingBadgeRing } from "@/components/decorative/DoodleVectors";

export default function GalleryPage() {
  const { language, t } = useLanguage();
  const isUrdu = language === "ur";

  const galleryItems: GalleryItem[] = [
    {
      id: "g1",
      category: "ROOMS",
      title: "Single Executive Master Suite",
      description: "Air-conditioned single occupancy suite with private study desk and attached luxury bath.",
      image: "https://images.unsplash.com/photo-1598928506311-c55ded91a20c?auto=format&fit=crop&w=1200&q=80",
    },
    {
      id: "g2",
      category: "ROOMS",
      title: "Deluxe Double Sharing Room",
      description: "Spacious 2-resident room layout with individual locked wardrobes & dual study desks.",
      image: "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&w=1200&q=80",
    },
    {
      id: "g3",
      category: "STUDY",
      title: "Air-Conditioned Quiet Study Lounge",
      description: "Dedicated silent study hall with fiber Wi-Fi access and individual reading lamps.",
      image: "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&w=1200&q=80",
    },
    {
      id: "g4",
      category: "DINING",
      title: "Mess Dining Hall",
      description: "Clean, spacious mess dining area where 3 fresh nutritious meals are served daily.",
      image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=80",
    },
    {
      id: "g5",
      category: "SECURITY",
      title: "Biometric Security Gate Pass System",
      description: "Electronic biometric attendance and SMS alert gate pass for complete female safety.",
      image: "https://images.unsplash.com/photo-1557597774-9d273605dfa9?auto=format&fit=crop&w=1200&q=80",
    },
    {
      id: "g6",
      category: "ROOMS",
      title: "Triple Economy Room Layout",
      description: "Bright room with three study tables and attached geyser-equipped bathroom.",
      image: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1200&q=80",
    },
    {
      id: "g7",
      category: "DINING",
      title: "Hygienic Commercial Kitchen",
      description: "Stainless steel food preparation facility run with strict hygiene by female chef staff.",
      image: "https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&w=1200&q=80",
    },
    {
      id: "g8",
      category: "SECURITY",
      title: "Main Entrance & CCTV Surveillance",
      description: "24/7 high-definition CCTV coverage across entire boundary wall and corridors.",
      image: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=1200&q=80",
    },
  ];

  const [activeCategory, setActiveCategory] = useState<string>("ALL");
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [activePhotoIndex, setActivePhotoIndex] = useState(0);

  const filteredItems =
    activeCategory === "ALL"
      ? galleryItems
      : galleryItems.filter((item) => item.category === activeCategory);

  const openLightbox = (index: number) => {
    setActivePhotoIndex(index);
    setLightboxOpen(true);
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      {/* Saturated Banner */}
      <section className="relative bg-gradient-to-r from-pink-950 via-slate-950 to-indigo-950 text-white py-20 px-4 sm:px-8 overflow-hidden">
        <div className="absolute top-6 right-8 opacity-70 hidden md:block">
          <SquiggleWave color="#FF1E7A" width={140} height={28} />
        </div>
        <div className="absolute bottom-6 left-8 opacity-60 hidden md:block">
          <CapsulePillBar color="from-pink-500 to-indigo-500" width="w-28" height="h-4" rotate="-rotate-12" />
        </div>

        <div className="max-w-4xl mx-auto text-center space-y-4 relative z-10">
          <span className="px-4 py-1.5 rounded-full bg-pink-500/20 text-pink-300 font-extrabold text-xs uppercase tracking-wider border border-pink-400/40">
            ★ Visual Gallery
          </span>
          <h1 className="text-4xl sm:text-6xl font-black font-serif tracking-tight leading-tight">
            Photo Gallery & <span className="text-gradient-pink">Virtual Tour</span>
          </h1>
          <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Explore our executive bedrooms, study lounges, mess dining hall, and 24/7 security infrastructure on University Road, Peshawar.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-16 space-y-10">
        {/* Category Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2">
          {[
            { id: "ALL", label: isUrdu ? "تمام تصاویر" : "All Photos" },
            { id: "ROOMS", label: isUrdu ? "کمرے" : "Rooms & Suites" },
            { id: "STUDY", label: isUrdu ? "اسٹڈی لاؤنج" : "Study Lounge" },
            { id: "DINING", label: isUrdu ? "مائس اور کھانا" : "Mess & Kitchen" },
            { id: "SECURITY", label: isUrdu ? "سیکیورٹی" : "Security & Building" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveCategory(tab.id)}
              className={`px-5 py-2.5 rounded-2xl text-xs font-black transition-all ${
                activeCategory === tab.id
                  ? "bg-gradient-to-r from-pink-500 to-indigo-600 text-white shadow-xl shadow-pink-500/30 scale-105"
                  : "bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 border border-slate-200 dark:border-slate-700"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item, idx) => (
            <div
              key={item.id}
              onClick={() => openLightbox(idx)}
              className="group relative h-72 rounded-3xl overflow-hidden shadow-xl cursor-pointer border-2 border-slate-200 dark:border-slate-800 bg-slate-900 hover:-translate-y-1.5 transition-all duration-300"
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/25 to-transparent opacity-90 group-hover:opacity-100 transition-opacity p-6 flex flex-col justify-end text-white">
                <div className="flex justify-between items-end">
                  <div className="space-y-1">
                    <span className="px-2.5 py-0.5 rounded-full bg-pink-600 text-white font-bold text-[10px] uppercase">
                      {item.category}
                    </span>
                    <h3 className="font-bold text-lg font-serif">{item.title}</h3>
                    <p className="text-xs text-slate-300 line-clamp-1">{item.description}</p>
                  </div>
                  <div className="w-9 h-9 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center text-white group-hover:scale-110 group-hover:bg-pink-600 transition-all shadow-md">
                    <Maximize2 className="w-4 h-4" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Lightbox Modal */}
        <LightboxModal
          items={filteredItems}
          currentIndex={activePhotoIndex}
          isOpen={lightboxOpen}
          onClose={() => setLightboxOpen(false)}
          onSelectIndex={(idx) => setActivePhotoIndex(idx)}
        />
      </div>
    </div>
  );
}
