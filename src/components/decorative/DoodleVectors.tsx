"use client";

import React from "react";

/**
 * Animated Squiggle Wavy Line (Imperial Gold)
 */
export function SquiggleWave({
  className = "",
  color = "#d4af37",
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
 * Diagonal Capsule Pill Bars (Speed Gold Stripes)
 */
export function CapsulePillBar({
  className = "",
  color = "from-amber-500 to-amber-600",
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
 * Polka Dot Matrix Pattern (Gold Dust Grid)
 */
export function PolkaDotGrid({
  className = "",
  rows = 4,
  cols = 6,
  dotColor = "bg-amber-400/30",
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
  color = "border-amber-400/60",
}: {
  className?: string;
  color?: string;
}) {
  return (
    <div className={`relative flex items-center justify-center pointer-events-none ${className}`}>
      <div className={`w-16 h-16 rounded-full border-2 ${color} opacity-40`} />
      <div className={`absolute w-10 h-10 rounded-full border-2 ${color} opacity-70`} />
      <div className={`absolute w-4 h-4 rounded-full bg-amber-400`} />
    </div>
  );
}

/**
 * Starbursts & Plus/Cross Marks (Gold Accents)
 */
export function DoodleCrossMarks({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center gap-3 text-amber-400 font-bold pointer-events-none ${className}`}>
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round">
        <line x1="12" y1="4" x2="12" y2="20" />
        <line x1="4" y1="12" x2="20" y2="12" />
      </svg>
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" className="text-yellow-300 rotate-45">
        <line x1="12" y1="4" x2="12" y2="20" />
        <line x1="4" y1="12" x2="20" y2="12" />
      </svg>
      <span className="text-amber-300 text-xl select-none">✦</span>
    </div>
  );
}

/**
 * Rotating Circular Badge Ring with Curved Text
 */
export function RotatingBadgeRing({
  text = "★ EDUCATOR GIRLS HOSTEL ★ LUXURY LIVING ★",
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
        <text className="text-[8.5px] font-black uppercase tracking-[0.22em] fill-amber-400">
          <textPath href="#circlePath" startOffset="0%">
            {text}
          </textPath>
        </text>
      </svg>
      <div className="absolute w-8 h-8 rounded-full bg-gradient-to-tr from-amber-500 to-amber-600 flex items-center justify-center text-slate-950 text-xs font-black shadow-lg shadow-amber-500/30">
        ✦
      </div>
    </div>
  );
}

/**
 * Hand-Drawn Style Line Doodles (Gold Strokes)
 */
export function StudyLampDoodle({ className = "", stroke = "#d4af37" }: { className?: string; stroke?: string }) {
  return (
    <svg width="60" height="90" viewBox="0 0 60 90" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <line x1="12" y1="12" x2="6" y2="4" stroke={stroke} strokeWidth="2.5" strokeLinecap="round" strokeDasharray="3 3" />
      <line x1="30" y1="8" x2="30" y2="2" stroke={stroke} strokeWidth="2.5" strokeLinecap="round" strokeDasharray="3 3" />
      <line x1="48" y1="12" x2="54" y2="4" stroke={stroke} strokeWidth="2.5" strokeLinecap="round" strokeDasharray="3 3" />
      <path d="M12 28 C14 16, 46 16, 48 28 Z" fill="none" stroke={stroke} strokeWidth="3" strokeLinejoin="round" />
      <path d="M20 28 L40 28" stroke={stroke} strokeWidth="2.5" />
      <line x1="30" y1="28" x2="30" y2="55" stroke={stroke} strokeWidth="3" strokeLinecap="round" />
      <line x1="30" y1="55" x2="10" y2="86" stroke={stroke} strokeWidth="3" strokeLinecap="round" />
      <line x1="30" y1="55" x2="50" y2="86" stroke={stroke} strokeWidth="3" strokeLinecap="round" />
      <line x1="18" y1="72" x2="42" y2="72" stroke={stroke} strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  );
}

export function BookshelfDoodle({ className = "", stroke = "#d4af37" }: { className?: string; stroke?: string }) {
  return (
    <svg width="120" height="50" viewBox="0 0 120 50" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <line x1="5" y1="44" x2="115" y2="44" stroke={stroke} strokeWidth="3.5" strokeLinecap="round" />
      <rect x="18" y="14" width="10" height="30" rx="2" stroke={stroke} strokeWidth="2.5" />
      <rect x="31" y="8" width="12" height="36" rx="2" stroke={stroke} strokeWidth="2.5" />
      <rect x="46" y="18" width="9" height="26" rx="2" stroke={stroke} strokeWidth="2.5" />
      <path d="M58 44 L70 18 L79 22 L67 44 Z" stroke={stroke} strokeWidth="2.5" strokeLinejoin="round" />
      <rect x="86" y="12" width="22" height="32" rx="3" stroke={stroke} strokeWidth="2.5" />
      <circle cx="97" cy="24" r="5" stroke={stroke} strokeWidth="2" />
    </svg>
  );
}

export function CactusPlantDoodle({ className = "", stroke = "#d4af37" }: { className?: string; stroke?: string }) {
  return (
    <svg width="50" height="60" viewBox="0 0 50 60" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <path d="M12 36 L15 54 C15 56 35 56 35 54 L38 36 Z" stroke={stroke} strokeWidth="2.5" strokeLinejoin="round" />
      <line x1="10" y1="36" x2="40" y2="36" stroke={stroke} strokeWidth="3" strokeLinecap="round" />
      <path d="M25 10 C21 10 21 36 21 36 L29 36 C29 36 29 10 25 10 Z" stroke={stroke} strokeWidth="2.5" />
      <path d="M21 24 H14 C12 24 12 16 12 16" stroke={stroke} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M29 28 H36 C38 28 38 20 38 20" stroke={stroke} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      <line x1="23" y1="16" x2="27" y2="16" stroke={stroke} strokeWidth="2" />
      <line x1="23" y1="24" x2="27" y2="24" stroke={stroke} strokeWidth="2" />
    </svg>
  );
}

/**
 * Organic Wave Dividers (Black & Gold)
 */
export function MultiLayerWaveTop({
  colorTop = "#d4af37",
  colorMid = "#92400e",
  colorBottom = "#070709",
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
        <path
          d="M0 40C240 100 480 0 720 50C960 100 1200 20 1440 60V120H0V40Z"
          fill={colorTop}
          fillOpacity="0.15"
        />
        <path
          d="M0 65C300 10 600 110 900 45C1200 -20 1350 80 1440 70V120H0V65Z"
          fill={colorMid}
          fillOpacity="0.3"
        />
        <path
          d="M0 90C360 30 720 120 1080 60C1260 30 1380 90 1440 85V120H0V90Z"
          fill={colorBottom}
        />
      </svg>
    </div>
  );
}

export function MultiLayerWaveBottom({
  colorTop = "#070709",
  colorMid = "#d4af37",
  colorBottom = "#0c0c10",
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
        <rect width="1440" height="120" fill={colorTop} />
        <path
          d="M0 30C320 90 640 10 960 80C1280 150 1380 30 1440 40V120H0V30Z"
          fill={colorMid}
          fillOpacity="0.25"
        />
        <path
          d="M0 60C280 10 560 100 840 40C1120 -20 1320 80 1440 70V120H0V60Z"
          fill={colorBottom}
        />
      </svg>
    </div>
  );
}

/**
 * Royal Architectural Arches & Oriental Lattice Silhouette (Imperial Gold)
 */
export function ArchitecturalLuxuryArches({ className = "" }: { className?: string }) {
  return (
    <div className={`absolute inset-0 pointer-events-none overflow-hidden ${className}`}>
      <svg
        className="w-full h-full opacity-35"
        viewBox="0 0 1440 700"
        fill="none"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="goldArchGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#d4af37" stopOpacity="0.6" />
            <stop offset="50%" stopColor="#f59e0b" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#d97706" stopOpacity="0.05" />
          </linearGradient>
          <linearGradient id="rubyArchGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#fbbf24" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#d4af37" stopOpacity="0.05" />
          </linearGradient>
        </defs>

        <path
          d="M-80 700 V 320 C -80 140, 60 40, 260 40 C 460 40, 600 140, 600 320 V 700"
          stroke="url(#goldArchGrad)"
          strokeWidth="1.5"
          strokeDasharray="4 4"
        />
        <path
          d="M-20 700 V 350 C -20 200, 100 100, 260 100 C 420 100, 540 200, 540 350 V 700"
          stroke="url(#goldArchGrad)"
          strokeWidth="2"
        />

        <path
          d="M380 700 V 220 C 380 60, 520 -10, 720 -10 C 920 -10, 1060 60, 1060 220 V 700"
          stroke="url(#rubyArchGrad)"
          strokeWidth="2"
        />
        <path
          d="M440 700 V 260 C 440 120, 560 50, 720 50 C 880 50, 1000 120, 1000 260 V 700"
          stroke="url(#goldArchGrad)"
          strokeWidth="1.5"
          strokeDasharray="6 6"
        />

        <path
          d="M840 700 V 320 C 840 140, 980 40, 1180 40 C 1380 40, 1520 140, 1520 320 V 700"
          stroke="url(#goldArchGrad)"
          strokeWidth="1.5"
          strokeDasharray="4 4"
        />
        <path
          d="M900 700 V 350 C 900 200, 1020 100, 1180 100 C 1340 100, 1460 200, 1460 350 V 700"
          stroke="url(#goldArchGrad)"
          strokeWidth="2"
        />

        <circle cx="260" cy="100" r="18" stroke="url(#goldArchGrad)" strokeWidth="1.5" />
        <circle cx="720" cy="50" r="24" stroke="url(#goldArchGrad)" strokeWidth="2" />
        <circle cx="1180" cy="100" r="18" stroke="url(#goldArchGrad)" strokeWidth="1.5" />
      </svg>
    </div>
  );
}
