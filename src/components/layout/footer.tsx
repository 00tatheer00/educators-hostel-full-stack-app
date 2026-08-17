"use client";

import Link from "next/link";
import { Sparkles, Phone, Mail, MapPin, ShieldCheck, Heart, ArrowRight, Instagram, Facebook, MessageCircle } from "lucide-react";
import { MultiLayerWaveTop, SquiggleWave } from "@/components/decorative/DoodleVectors";

export function Footer() {
  return (
    <footer className="relative bg-slate-950 text-slate-300 pt-0 pb-10 overflow-hidden">
      {/* Wave Transition Top */}
      <MultiLayerWaveTop
        colorTop="#4F46E5"
        colorMid="#FF1E7A"
        colorBottom="#020617"
        className="-mt-1"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-12 relative z-10 pt-6">
        {/* Saturated Pre-Footer Banner */}
        <div className="p-8 sm:p-10 rounded-3xl bg-gradient-to-r from-pink-600 via-purple-600 to-indigo-700 text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl shadow-pink-900/40 border border-white/20">
          <div className="space-y-2 text-center md:text-left">
            <span className="inline-block px-3 py-1 rounded-full bg-white/20 text-white font-mono text-[11px] font-bold uppercase tracking-wider backdrop-blur-md">
              ⚡ Instant Response Desk
            </span>
            <h3 className="text-2xl sm:text-3xl font-extrabold font-serif">
              Have Questions Before Booking?
            </h3>
            <p className="text-pink-100 text-xs sm:text-sm max-w-xl">
              Talk directly with our resident warden desk or schedule an in-person hostel tour today.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <a
              href="https://wa.me/923001234567"
              target="_blank"
              rel="noreferrer"
              className="px-6 py-3 rounded-2xl bg-white text-slate-950 font-black text-xs hover:bg-slate-100 transition-all shadow-lg flex items-center gap-2 hover:scale-105"
            >
              <MessageCircle className="w-4 h-4 text-emerald-600 fill-emerald-600" />
              Chat on WhatsApp
            </a>
            <a
              href="tel:+923001234567"
              className="px-6 py-3 rounded-2xl bg-slate-950/70 border border-white/30 text-white font-bold text-xs hover:bg-slate-950 transition-all flex items-center gap-2"
            >
              <Phone className="w-4 h-4 text-amber-400" />
              Call Chief Warden
            </a>
          </div>
        </div>

        {/* 4-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pt-4">
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-pink-500 to-indigo-600 flex items-center justify-center text-white shadow-lg shadow-pink-500/30">
                <Sparkles className="w-6 h-6 animate-pulse" />
              </div>
              <div>
                <span className="font-serif text-xl font-black text-white tracking-tight block">
                  Educator Girls Hostel
                </span>
                <span className="text-[10px] text-pink-400 font-bold uppercase tracking-widest">
                  Peshawar, Khyber Pakhtunkhwa
                </span>
              </div>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              Peshawar&apos;s most trusted luxury residence for female university students, medical officers, and professionals. 100% female staff, 3-time nutritious mess, biometric gate security, and 24/7 power backup.
            </p>

            <div className="flex items-center gap-2 text-xs text-emerald-400 font-bold">
              <ShieldCheck className="w-4 h-4 text-pink-400" />
              <span>100% Female-Only Supervised Facility</span>
            </div>

            {/* Social Icons */}
            <div className="flex items-center gap-3 pt-2">
              <a
                href="#"
                className="w-9 h-9 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-pink-400 hover:border-pink-500 transition-all"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="#"
                className="w-9 h-9 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-indigo-400 hover:border-indigo-500 transition-all"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href="https://wa.me/923001234567"
                className="w-9 h-9 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-emerald-400 hover:border-emerald-500 transition-all"
              >
                <MessageCircle className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Rooms */}
          <div className="space-y-3">
            <h4 className="text-xs font-black uppercase tracking-wider text-pink-400 font-mono">
              Room Categories
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/rooms" className="hover:text-pink-300 transition-colors flex items-center gap-1">
                  <ArrowRight className="w-3 h-3 text-indigo-400" />
                  Single Executive Suite
                </Link>
              </li>
              <li>
                <Link href="/rooms" className="hover:text-pink-300 transition-colors flex items-center gap-1">
                  <ArrowRight className="w-3 h-3 text-indigo-400" />
                  Deluxe Double Sharing
                </Link>
              </li>
              <li>
                <Link href="/rooms" className="hover:text-pink-300 transition-colors flex items-center gap-1">
                  <ArrowRight className="w-3 h-3 text-indigo-400" />
                  Triple Economy Room
                </Link>
              </li>
              <li>
                <Link href="/rooms" className="hover:text-pink-300 transition-colors flex items-center gap-1">
                  <ArrowRight className="w-3 h-3 text-indigo-400" />
                  Quad Student Sharing
                </Link>
              </li>
              <li>
                <Link href="/amenities" className="hover:text-pink-300 transition-colors flex items-center gap-1">
                  <ArrowRight className="w-3 h-3 text-indigo-400" />
                  Weekly Mess Menu
                </Link>
              </li>
            </ul>
          </div>

          {/* Resident Portals */}
          <div className="space-y-3">
            <h4 className="text-xs font-black uppercase tracking-wider text-indigo-400 font-mono">
              Portals & Services
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/login" className="hover:text-indigo-300 transition-colors flex items-center gap-1">
                  <ArrowRight className="w-3 h-3 text-pink-400" />
                  Resident Login
                </Link>
              </li>
              <li>
                <Link href="/dashboard/resident/payments" className="hover:text-indigo-300 transition-colors flex items-center gap-1">
                  <ArrowRight className="w-3 h-3 text-pink-400" />
                  Online Rent Payment
                </Link>
              </li>
              <li>
                <Link href="/dashboard/resident/gate-pass" className="hover:text-indigo-300 transition-colors flex items-center gap-1">
                  <ArrowRight className="w-3 h-3 text-pink-400" />
                  E-Gate Pass System
                </Link>
              </li>
              <li>
                <Link href="/dashboard/resident/maintenance" className="hover:text-indigo-300 transition-colors flex items-center gap-1">
                  <ArrowRight className="w-3 h-3 text-pink-400" />
                  Repair & Maintenance
                </Link>
              </li>
              <li>
                <Link href="/dashboard/admin" className="hover:text-indigo-300 transition-colors flex items-center gap-1">
                  <ArrowRight className="w-3 h-3 text-pink-400" />
                  Admin Control Panel
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Details */}
          <div className="space-y-3">
            <h4 className="text-xs font-black uppercase tracking-wider text-amber-400 font-mono">
              Hostel Location
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-pink-400 flex-shrink-0 mt-0.5" />
                <span>Main University Road, near University of Peshawar & KMU, Peshawar, KPK</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <span className="font-mono">+92 300 1234567</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-cyan-400 flex-shrink-0" />
                <span>info@educatorhostel.pk</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="pt-8 border-t border-slate-800/80 text-center text-xs text-slate-500 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p>© 2026 Educator Girls Hostel Peshawar. All rights reserved.</p>
          <div className="flex items-center gap-2">
            <span>Built for Safety & Academic Comfort</span>
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
          </div>
        </div>
      </div>
    </footer>
  );
}
