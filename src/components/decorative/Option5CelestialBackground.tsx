"use client";

import React from "react";
import { Sparkles } from "lucide-react";

export function Option5CelestialBackground() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden select-none" aria-hidden="true">
      {/* 1. Deep Obsidian & Gold Radial Mesh Base Canvas */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_90%_75%_at_50%_-20%,rgba(212,175,55,0.16),rgba(245,158,11,0.08),rgba(15,15,20,0.95),rgba(4,4,6,1))]" />

      {/* 2. Top Golden Shimmer Horizon Line */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-amber-400/80 via-yellow-200 via-amber-500/80 to-transparent animate-laser-glow" />

      {/* 3. 3D Concentric Imperial Gold Astrolabe Rings (Behind Left Hero Content) */}
      <div className="absolute top-1/2 -translate-y-1/2 -left-20 sm:left-4 w-[460px] h-[460px] flex items-center justify-center [perspective:1000px] opacity-40 lg:opacity-50">
        {/* Ring 1 - Outer Gold Ring (X-Axis 3D Rotation) */}
        <div className="absolute w-[420px] h-[420px] rounded-full border border-amber-400/50 shadow-[0_0_25px_rgba(251,191,36,0.25)] animate-gyro-x" />
        
        {/* Ring 2 - Middle Champagne Gold Ring (Y-Axis 3D Rotation) */}
        <div className="absolute w-[320px] h-[320px] rounded-full border border-yellow-300/40 shadow-[0_0_20px_rgba(253,224,71,0.2)] animate-gyro-y" />
        
        {/* Ring 3 - Inner Antique Gold Ring (Z-Axis Counter Rotation) */}
        <div className="absolute w-[220px] h-[220px] rounded-full border border-amber-500/60 shadow-[0_0_15px_rgba(217,119,6,0.3)] animate-gyro-z" />

        {/* Center Glowing Core */}
        <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-amber-500 via-yellow-200 to-amber-600 blur-md opacity-80 animate-pulse" />
      </div>

      {/* 4. Imperial Gold Bioluminescent Plasma Blobs */}
      <div className="absolute top-0 left-10 w-[38rem] h-[38rem] bg-gradient-to-br from-amber-500/18 via-yellow-600/10 to-transparent rounded-full blur-[110px] animate-plasma" />
      <div className="absolute top-12 right-0 w-[42rem] h-[42rem] bg-gradient-to-bl from-amber-600/20 via-yellow-500/12 to-transparent rounded-full blur-[120px] animate-plasma" style={{ animationDelay: "-6s" }} />
      <div className="absolute -bottom-10 left-1/3 w-[34rem] h-[34rem] bg-gradient-to-tr from-amber-400/15 via-yellow-600/10 to-transparent rounded-full blur-[100px] animate-plasma" style={{ animationDelay: "-10s" }} />

      {/* 5. Harmonic Kinetic Gold Wave Ribbons */}
      <div className="absolute -bottom-8 left-0 w-[200%] h-48 opacity-35 animate-harmonic-wave">
        <svg className="w-full h-full" viewBox="0 0 2880 200" fill="none" preserveAspectRatio="none">
          <path
            d="M0 80 C 480 -20, 960 160, 1440 60 C 1920 -20, 2400 160, 2880 60 L 2880 200 L 0 200 Z"
            fill="url(#celestialGoldWave1)"
          />
          <path
            d="M0 110 C 360 30, 840 180, 1440 90 C 2040 10, 2520 180, 2880 90 L 2880 200 L 0 200 Z"
            fill="url(#celestialGoldWave2)"
            opacity="0.6"
          />
          <defs>
            <linearGradient id="celestialGoldWave1" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#d4af37" stopOpacity="0.4" />
              <stop offset="35%" stopColor="#f59e0b" stopOpacity="0.3" />
              <stop offset="70%" stopColor="#fde047" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#b45309" stopOpacity="0.4" />
            </linearGradient>
            <linearGradient id="celestialGoldWave2" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#b45309" stopOpacity="0.5" />
              <stop offset="50%" stopColor="#d4af37" stopOpacity="0.35" />
              <stop offset="100%" stopColor="#fef08a" stopOpacity="0.3" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* 6. Subtle Cyber Gold Grid */}
      <div className="absolute inset-0 hero-cyber-grid opacity-40" />

      {/* 7. Golden Sparkle Light Nodes */}
      <div className="absolute top-12 left-20 animate-twinkle text-amber-300 opacity-90 hidden sm:block">
        <Sparkles className="w-4 h-4" />
      </div>
      <div className="absolute top-6 right-1/3 animate-twinkle-delayed text-yellow-200 opacity-95 hidden sm:block">
        <Sparkles className="w-3.5 h-3.5" />
      </div>
      <div className="absolute top-1/3 right-10 animate-twinkle-slow text-amber-400 opacity-85 hidden sm:block">
        <Sparkles className="w-4 h-4" />
      </div>
      <div className="absolute bottom-14 left-16 animate-twinkle-delayed text-amber-200 opacity-80 hidden sm:block">
        <Sparkles className="w-3.5 h-3.5" />
      </div>
      <div className="absolute top-28 left-1/3 animate-twinkle text-yellow-300 opacity-70 hidden sm:block">
        <Sparkles className="w-3 h-3" />
      </div>
    </div>
  );
}
