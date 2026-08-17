"use client";

import React, { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { LightboxModal, GalleryItem } from "@/components/gallery/LightboxModal";
import { Maximize2 } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export default function GalleryPage() {
  const { language, t } = useLanguage();
  const isUrdu = language === "ur";

  const galleryItems: GalleryItem[] = [
    {
      id: "g1",
      category: "ROOMS",
      title: "Single Executive Suite",
      description: "Air-conditioned single occupancy suite with private study desk and attached bath.",
      image: "https://images.unsplash.com/photo-1598928506311-c55ded91a20c?auto=format&fit=crop&w=1200&q=80",
    },
    {
      id: "g2",
      category: "ROOMS",
      title: "Deluxe Double Sharing Room",
      description: "Spacious 2-resident room layout with individual locked wardrobes.",
      image: "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&w=1200&q=80",
    },
    {
      id: "g3",
      category: "STUDY",
      title: "Air-Conditioned Quiet Study Lounge",
      description: "Dedicated study hall with fiber Wi-Fi and individual desk lamps.",
      image: "https://images.unsplash.com/photo-1521587760476-6c12a4b040da?auto=format&fit=crop&w=1200&q=80",
    },
    {
      id: "g4",
      category: "DINING",
      title: "Mess Dining Hall",
      description: "Clean, spacious mess dining area where 3 fresh meals are served daily.",
      image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1200&q=80",
    },
    {
      id: "g5",
      category: "SECURITY",
      title: "Biometric Security Gate Pass System",
      description: "Electronic biometric attendance and SMS alert gate pass for female safety.",
      image: "https://images.unsplash.com/photo-1557597774-9d273605dfa9?auto=format&fit=crop&w=1200&q=80",
    },
    {
      id: "g6",
      category: "ROOMS",
      title: "Triple Economy Room Layout",
      description: "Bright room with study tables and attached bathroom.",
      image: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1200&q=80",
    },
    {
      id: "g7",
      category: "DINING",
      title: "Hygienic Commercial Kitchen",
      description: "Stainless steel food preparation facility run by female chef staff.",
      image: "https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&w=1200&q=80",
    },
    {
      id: "g8",
      category: "SECURITY",
      title: "Main Entrance & CCTV Surveillance",
      description: "24/7 high-definition CCTV coverage around boundary wall and corridors.",
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
    <div className="max-w-7xl mx-auto px-4 sm:px-8 py-12 space-y-10">
      {/* Title */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <Badge variant="gold">{t("gallery")}</Badge>
        <h1 className="text-4xl font-extrabold font-serif text-slate-900 dark:text-slate-100">
          {isUrdu ? "ایجوکیٹر گرلز ہاسٹل کی تصاویر" : "Photo Gallery & Virtual Tour"}
        </h1>
        <p className="text-sm text-slate-600 dark:text-slate-400">
          Explore our rooms, study lounges, mess dining facilities, and 24/7 security infrastructure on University Road, Peshawar.
        </p>
      </div>

      {/* Category Tabs */}
      <div className="flex flex-wrap items-center justify-center gap-2">
        {[
          { id: "ALL", label: isUrdu ? "تمام تصاویر" : "All Photos" },
          { id: "ROOMS", label: isUrdu ? "کمرے" : "Rooms & Suites" },
          { id: "STUDY", label: isUrdu ? "اسٹڈی لاؤنج" : "Study Lounge" },
          { id: "DINING", label: isUrdu ? "مائس اور کھانا" : "Mess & Kitchen" },
          { id: "SECURITY", label: isUrdu ? "سیکیورٹی" : "Security & Building" },
        ].map((tab) => (
          <Button
            key={tab.id}
            variant={activeCategory === tab.id ? "emerald" : "outline"}
            size="sm"
            className="text-xs"
            onClick={() => setActiveCategory(tab.id)}
          >
            {tab.label}
          </Button>
        ))}
      </div>

      {/* Gallery Masonry Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredItems.map((item, idx) => (
          <div
            key={item.id}
            onClick={() => openLightbox(idx)}
            className="group relative h-72 rounded-2xl overflow-hidden shadow-md cursor-pointer border border-slate-200 dark:border-slate-800 bg-slate-100"
          >
            <img
              src={item.image}
              alt={item.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent opacity-90 group-hover:opacity-100 transition-opacity p-6 flex flex-col justify-end text-white">
              <div className="flex justify-between items-end">
                <div>
                  <Badge variant="gold" className="text-[10px] mb-1">
                    {item.category}
                  </Badge>
                  <h3 className="font-bold text-base font-serif">{item.title}</h3>
                  <p className="text-xs text-slate-300 line-clamp-1">{item.description}</p>
                </div>
                <div className="p-2 rounded-xl bg-white/20 backdrop-blur-md text-white group-hover:scale-110 transition-transform">
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
  );
}
