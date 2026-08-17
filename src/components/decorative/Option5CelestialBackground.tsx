"use client";

import React from "react";
import { Sparkles, ShieldCheck, Zap, Utensils } from "lucide-react";

export function Option5CelestialBackground() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden select-none" aria-hidden="true">
      {/* 1. Deep Cosmic Radial Mesh Base Canvas */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_90%_75%_at_50%_-20%,rgba(168,85,247,0.2),rgba(236,72,153,0.18),rgba(15,23,42,0.95),rgba(2,6,23,1))]" />

      {/* 2. Top Prismatic Laser Horizon Line */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-pink-500 via-amber-400 via-indigo-500 to-transparent animate-laser-glow" />

      {/* 3. 3D Concentric Gyroscope Astrolabe Rings (Behind Left Hero Content) */}
      <div className="absolute top-1/2 -translate-y-1/2 -left-20 sm:left-4 w-[460px] h-[460px] flex items-center justify-center [perspective:1000px] opacity-40 lg:opacity-50">
        {/* Ring 1 - Outer Gold Ring (X-Axis 3D Rotation) */}
        <div className="absolute w-[420px] h-[420px] rounded-full border border-amber-400/40 shadow-[0_0_25px_rgba(251,191,36,0.2)] animate-gyro-x" />
        
        {/* Ring 2 - Middle Neon Pink Ring (Y-Axis 3D Rotation) */}
        <div className="absolute w-[320px] h-[320px] rounded-full border border-pink-500/50 shadow-[0_0_20px_rgba(244,63,94,0.25)] animate-gyro-y" />
        
        {/* Ring 3 - Inner Cyan Ring (Z-Axis Counter Rotation) */}
        <div className="absolute w-[220px] h-[220px] rounded-full border border-cyan-400/60 shadow-[0_0_15px_rgba(6,182,212,0.3)] animate-gyro-z" />

        {/* Center Glowing Core */}
        <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-pink-500 via-amber-300 to-indigo-500 blur-md opacity-80 animate-pulse" />
      </div>

      {/* 4. Bioluminescent Morphing Plasma Blobs */}
      <div className="absolute top-0 left-10 w-[38rem] h-[38rem] bg-gradient-to-br from-pink-600/25 via-purple-600/15 to-transparent rounded-full blur-[110px] animate-plasma" />
      <div className="absolute top-12 right-0 w-[42rem] h-[42rem] bg-gradient-to-bl from-indigo-600/30 via-cyan-500/18 to-emerald-600/10 rounded-full blur-[120px] animate-plasma" style={{ animationDelay: "-6s" }} />
      <div className="absolute -bottom-10 left-1/3 w-[34rem] h-[34rem] bg-gradient-to-tr from-amber-500/18 via-rose-600/15 to-transparent rounded-full blur-[100px] animate-plasma" style={{ animationDelay: "-10s" }} />

      {/* 5. Harmonic Kinetic Wave Ribbons (Flowing along bottom) */}
      <div className="absolute -bottom-8 left-0 w-[200%] h-48 opacity-35 animate-harmonic-wave">
        <svg className="w-full h-full" viewBox="0 0 2880 200" fill="none" preserveAspectRatio="none">
          <path
            d="M0 80 C 480 -20, 960 160, 1440 60 C 1920 -20, 2400 160, 2880 60 L 2880 200 L 0 200 Z"
            fill="url(#celestialWave1)"
          />
          <path
            d="M0 110 C 360 30, 840 180, 1440 90 C 2040 10, 2520 180, 2880 90 L 2880 200 L 0 200 Z"
            fill="url(#celestialWave2)"
            opacity="0.6"
          />
          <defs>
            <linearGradient id="celestialWave1" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#ec4899" stopOpacity="0.5" />
              <stop offset="35%" stopColor="#8b5cf6" stopOpacity="0.4" />
              <stop offset="70%" stopColor="#06b6d4" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#f59e0b" stopOpacity="0.5" />
            </linearGradient>
            <linearGradient id="celestialWave2" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#6366f1" stopOpacity="0.6" />
              <stop offset="50%" stopColor="#ec4899" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#10b981" stopOpacity="0.4" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* 6. Subtle Cyber Constellation Grid with Radial Mask */}
      <div className="absolute inset-0 hero-cyber-grid opacity-35" />

      {/* 7. Constellation Sparkle Light Nodes */}
      <div className="absolute top-12 left-20 animate-twinkle text-pink-400 opacity-80 hidden sm:block">
        <Sparkles className="w-4 h-4" />
      </div>
      <div className="absolute top-6 right-1/3 animate-twinkle-delayed text-cyan-300 opacity-90 hidden sm:block">
        <Sparkles className="w-3.5 h-3.5" />
      </div>
      <div className="absolute top-1/3 right-10 animate-twinkle-slow text-amber-300 opacity-75 hidden sm:block">
        <Sparkles className="w-4 h-4" />
      </div>
      <div className="absolute bottom-14 left-16 animate-twinkle-delayed text-rose-300 opacity-70 hidden sm:block">
        <Sparkles className="w-3.5 h-3.5" />
      </div>
      <div className="absolute top-28 left-1/3 animate-twinkle text-indigo-300 opacity-60 hidden sm:block">
        <Sparkles className="w-3 h-3" />
      </div>
    </div>
  );
}
