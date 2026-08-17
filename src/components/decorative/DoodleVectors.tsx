"use client";

import React from "react";

/**
 * Animated Squiggle Wavy Line (Inspired by vibrant modern vector graphics)
 */
export function SquiggleWave({
  className = "",
  color = "#FF1E7A",
  width = 120,
  height = 24,
}: {
  className?: string;
  color?: string;
  width?: number;
  height?: number;
}) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 120 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`inline-block ${className}`}
    >
      <path
        d="M2 12C12 2 18 22 28 12C38 2 44 22 54 12C64 2 70 22 80 12C90 2 96 22 106 12C112 6 116 8 118 12"
        stroke={color}
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/**
 * Diagonal Capsule Pill Bars (Speed Stripes)
 */
export function CapsulePillBar({
  className = "",
  color = "from-pink-500 to-rose-500",
  width = "w-28",
  height = "h-5",
  rotate = "-rotate-45",
}: {
  className?: string;
  color?: string;
  width?: string;
  height?: string;
  rotate?: string;
}) {
  return (
    <div
      className={`${width} ${height} rounded-full bg-gradient-to-r ${color} ${rotate} shadow-lg pointer-events-none transform transition-transform ${className}`}
    />
  );
}

/**
 * Polka Dot Matrix Pattern
 */
export function PolkaDotGrid({
  className = "",
  rows = 4,
  cols = 6,
  dotColor = "bg-indigo-500/30",
}: {
  className?: string;
  rows?: number;
  cols?: number;
  dotColor?: string;
}) {
  return (
    <div
      className={`grid gap-2.5 pointer-events-none ${className}`}
      style={{
        gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))`,
        gridTemplateRows: `repeat(${rows}, minmax(0, 1fr))`,
      }}
    >
      {Array.from({ length: rows * cols }).map((_, i) => (
        <div key={i} className={`w-2 h-2 rounded-full ${dotColor}`} />
      ))}
    </div>
  );
}

/**
 * Concentric Target Rings / Outline Circles
 */
export function TargetRings({
  className = "",
  color = "border-pink-500",
}: {
  className?: string;
  color?: string;
}) {
  return (
    <div className={`relative flex items-center justify-center pointer-events-none ${className}`}>
      <div className={`w-16 h-16 rounded-full border-2 ${color} opacity-40`} />
      <div className={`absolute w-10 h-10 rounded-full border-2 ${color} opacity-70`} />
      <div className={`absolute w-4 h-4 rounded-full bg-current`} />
    </div>
  );
}

/**
 * Starbursts & Plus/Cross Marks
 */
export function DoodleCrossMarks({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center gap-3 text-pink-500 font-bold pointer-events-none ${className}`}>
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round">
        <line x1="12" y1="4" x2="12" y2="20" />
        <line x1="4" y1="12" x2="20" y2="12" />
      </svg>
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" className="text-indigo-500 rotate-45">
        <line x1="12" y1="4" x2="12" y2="20" />
        <line x1="4" y1="12" x2="20" y2="12" />
      </svg>
      <span className="text-amber-400 text-xl select-none">✦</span>
    </div>
  );
}

/**
 * Rotating Circular Badge Ring with Curved Text
 */
export function RotatingBadgeRing({
  text = "★ EDUCATOR GIRLS HOSTEL ★ LUXURY RESIDENCE ★",
  className = "",
  size = 110,
}: {
  text?: string;
  className?: string;
  size?: number;
}) {
  return (
    <div
      className={`relative flex items-center justify-center pointer-events-none ${className}`}
      style={{ width: size, height: size }}
    >
      <svg
        className="w-full h-full animate-spin-slow"
        viewBox="0 0 100 100"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          id="circlePath"
          d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0"
          fill="transparent"
        />
        <text className="text-[8.5px] font-black uppercase tracking-[0.22em] fill-pink-500 dark:fill-pink-400">
          <textPath href="#circlePath" startOffset="0%">
            {text}
          </textPath>
        </text>
      </svg>
      <div className="absolute w-8 h-8 rounded-full bg-gradient-to-tr from-pink-500 to-indigo-600 flex items-center justify-center text-white text-xs font-black shadow-lg">
        ✦
      </div>
    </div>
  );
}

/**
 * Hand-Drawn Style Line Doodles (Desk Lamp, Bookshelf, Plant, Camera, Clock)
 */
export function StudyLampDoodle({ className = "", stroke = "#4F46E5" }: { className?: string; stroke?: string }) {
  return (
    <svg width="60" height="90" viewBox="0 0 60 90" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      {/* Light Rays */}
      <line x1="12" y1="12" x2="6" y2="4" stroke={stroke} strokeWidth="2.5" strokeLinecap="round" strokeDasharray="3 3" />
      <line x1="30" y1="8" x2="30" y2="2" stroke={stroke} strokeWidth="2.5" strokeLinecap="round" strokeDasharray="3 3" />
      <line x1="48" y1="12" x2="54" y2="4" stroke={stroke} strokeWidth="2.5" strokeLinecap="round" strokeDasharray="3 3" />
      {/* Lamp Head */}
      <path d="M12 28 C14 16, 46 16, 48 28 Z" fill="none" stroke={stroke} strokeWidth="3" strokeLinejoin="round" />
      <path d="M20 28 L40 28" stroke={stroke} strokeWidth="2.5" />
      {/* Lamp Stand Tripod */}
      <line x1="30" y1="28" x2="30" y2="55" stroke={stroke} strokeWidth="3" strokeLinecap="round" />
      <line x1="30" y1="55" x2="10" y2="86" stroke={stroke} strokeWidth="3" strokeLinecap="round" />
      <line x1="30" y1="55" x2="50" y2="86" stroke={stroke} strokeWidth="3" strokeLinecap="round" />
      <line x1="18" y1="72" x2="42" y2="72" stroke={stroke} strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  );
}

export function BookshelfDoodle({ className = "", stroke = "#10B981" }: { className?: string; stroke?: string }) {
  return (
    <svg width="120" height="50" viewBox="0 0 120 50" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      {/* Shelf line */}
      <line x1="5" y1="44" x2="115" y2="44" stroke={stroke} strokeWidth="3.5" strokeLinecap="round" />
      {/* Books standing */}
      <rect x="18" y="14" width="10" height="30" rx="2" stroke={stroke} strokeWidth="2.5" />
      <rect x="31" y="8" width="12" height="36" rx="2" stroke={stroke} strokeWidth="2.5" />
      <rect x="46" y="18" width="9" height="26" rx="2" stroke={stroke} strokeWidth="2.5" />
      {/* Leaning Book */}
      <path d="M58 44 L70 18 L79 22 L67 44 Z" stroke={stroke} strokeWidth="2.5" strokeLinejoin="round" />
      {/* Photo frame on shelf */}
      <rect x="86" y="12" width="22" height="32" rx="3" stroke={stroke} strokeWidth="2.5" />
      <circle cx="97" cy="24" r="5" stroke={stroke} strokeWidth="2" />
    </svg>
  );
}

export function CactusPlantDoodle({ className = "", stroke = "#06B6D4" }: { className?: string; stroke?: string }) {
  return (
    <svg width="50" height="60" viewBox="0 0 50 60" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      {/* Pot */}
      <path d="M12 36 L15 54 C15 56 35 56 35 54 L38 36 Z" stroke={stroke} strokeWidth="2.5" strokeLinejoin="round" />
      <line x1="10" y1="36" x2="40" y2="36" stroke={stroke} strokeWidth="3" strokeLinecap="round" />
      {/* Cactus Body */}
      <path d="M25 10 C21 10 21 36 21 36 L29 36 C29 36 29 10 25 10 Z" stroke={stroke} strokeWidth="2.5" />
      {/* Left arm */}
      <path d="M21 24 H14 C12 24 12 16 12 16" stroke={stroke} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      {/* Right arm */}
      <path d="M29 28 H36 C38 28 38 20 38 20" stroke={stroke} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      {/* Spikes */}
      <line x1="23" y1="16" x2="27" y2="16" stroke={stroke} strokeWidth="2" />
      <line x1="23" y1="24" x2="27" y2="24" stroke={stroke} strokeWidth="2" />
    </svg>
  );
}

/**
 * Organic Wave Dividers
 */
export function MultiLayerWaveTop({
  colorTop = "#4F46E5",
  colorMid = "#FF1E7A",
  colorBottom = "#0f172a",
  className = "",
}: {
  colorTop?: string;
  colorMid?: string;
  colorBottom?: string;
  className?: string;
}) {
  return (
    <div className={`w-full overflow-hidden leading-none ${className}`}>
      <svg
        className="w-full h-16 sm:h-24 block"
        viewBox="0 0 1440 120"
        fill="none"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Layer 1 */}
        <path
          d="M0 40C240 100 480 0 720 50C960 100 1200 20 1440 60V120H0V40Z"
          fill={colorTop}
          fillOpacity="0.25"
        />
        {/* Layer 2 */}
        <path
          d="M0 65C300 10 600 110 900 45C1200 -20 1350 80 1440 70V120H0V65Z"
          fill={colorMid}
          fillOpacity="0.5"
        />
        {/* Main Solid Layer */}
        <path
          d="M0 90C360 30 720 120 1080 60C1260 30 1380 90 1440 85V120H0V90Z"
          fill={colorBottom}
        />
      </svg>
    </div>
  );
}

export function MultiLayerWaveBottom({
  colorTop = "#0f172a",
  colorMid = "#FF1E7A",
  colorBottom = "#ffffff",
  className = "",
}: {
  colorTop?: string;
  colorMid?: string;
  colorBottom?: string;
  className?: string;
}) {
  return (
    <div className={`w-full overflow-hidden leading-none ${className}`}>
      <svg
        className="w-full h-16 sm:h-24 block"
        viewBox="0 0 1440 120"
        fill="none"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Solid Top Backing */}
        <rect width="1440" height="120" fill={colorTop} />
        {/* Layer 1 Wave */}
        <path
          d="M0 30C320 90 640 10 960 80C1280 150 1380 30 1440 40V120H0V30Z"
          fill={colorMid}
          fillOpacity="0.4"
        />
        {/* Layer 2 Main Wave */}
        <path
          d="M0 60C280 10 560 100 840 40C1120 -20 1320 80 1440 70V120H0V60Z"
          fill={colorBottom}
        />
      </svg>
    </div>
  );
}
