"use client";

import React from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

export interface GalleryItem {
  id: string;
  category: "ROOMS" | "DINING" | "STUDY" | "SECURITY";
  title: string;
  description: string;
  image: string;
}

interface LightboxModalProps {
  items: GalleryItem[];
  currentIndex: number;
  isOpen: boolean;
  onClose: () => void;
  onSelectIndex: (idx: number) => void;
}

export function LightboxModal({
  items,
  currentIndex,
  isOpen,
  onClose,
  onSelectIndex,
}: LightboxModalProps) {
  if (!isOpen || items.length === 0) return null;

  const currentItem = items[currentIndex];

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    const prevIdx = (currentIndex - 1 + items.length) % items.length;
    onSelectIndex(prevIdx);
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    const nextIdx = (currentIndex + 1) % items.length;
    onSelectIndex(nextIdx);
  };

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex items-center justify-center p-4 sm:p-8 animate-fade-in"
    >
      {/* Close Button */}
      <button
        onClick={onClose}
        className="absolute top-6 right-6 p-2 text-amber-300 hover:text-white bg-slate-900/80 border border-amber-500/40 rounded-full transition"
        aria-label="Close Lightbox"
      >
        <X className="w-6 h-6" />
      </button>

      {/* Main Container */}
      <div
        onClick={(e) => e.stopPropagation()}
        className="max-w-5xl w-full flex flex-col items-center justify-center relative space-y-4"
      >
        {/* Navigation Arrows */}
        <button
          onClick={handlePrev}
          className="absolute left-2 sm:-left-12 p-3 text-amber-300 hover:text-white bg-slate-900/80 border border-amber-500/30 hover:border-amber-400 rounded-full transition z-10"
          aria-label="Previous Photo"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>

        <button
          onClick={handleNext}
          className="absolute right-2 sm:-right-12 p-3 text-amber-300 hover:text-white bg-slate-900/80 border border-amber-500/30 hover:border-amber-400 rounded-full transition z-10"
          aria-label="Next Photo"
        >
          <ChevronRight className="w-6 h-6" />
        </button>

        {/* Image Display */}
        <div className="relative rounded-2xl overflow-hidden shadow-2xl border-2 border-amber-500/40 max-h-[75vh] bg-slate-950">
          <img
            src={currentItem.image}
            alt={currentItem.title}
            className="w-full max-h-[75vh] object-contain"
          />
        </div>

        {/* Caption Info */}
        <div className="text-center text-white space-y-1">
          <h3 className="font-bold text-lg font-serif text-white">{currentItem.title}</h3>
          <p className="text-xs text-slate-300">{currentItem.description}</p>
          <span className="text-[10px] text-amber-400 font-mono block pt-1 font-bold">
            Photo {currentIndex + 1} of {items.length}
          </span>
        </div>
      </div>
    </div>
  );
}
