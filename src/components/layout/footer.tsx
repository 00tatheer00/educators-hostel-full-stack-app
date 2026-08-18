"use client";

import Link from "next/link";
import { Sparkles, Phone, Mail, MapPin, ShieldCheck, Heart, ArrowRight, Instagram, Facebook, MessageCircle, Crown } from "lucide-react";
import { MultiLayerWaveTop } from "@/components/decorative/DoodleVectors";
import { Logo } from "@/components/common/Logo";

export function Footer() {
  return (
    <footer className="relative bg-[#050507] text-slate-300 pt-0 pb-10 overflow-hidden border-t border-amber-500/20">
      {/* Wave Transition Top */}
      <MultiLayerWaveTop
        colorTop="#d4af37"
        colorMid="#78350f"
        colorBottom="#050507"
        className="-mt-1"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-12 relative z-10 pt-6">
        {/* Luxury Black & Gold Pre-Footer Banner */}
        <div className="p-8 sm:p-10 rounded-3xl bg-gradient-to-r from-[#121218] via-[#1a1820] to-[#0e0e14] text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl shadow-black/80 border border-amber-500/30">
          <div className="space-y-2 text-center md:text-left">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/15 border border-amber-400/40 text-amber-300 font-mono text-[11px] font-bold uppercase tracking-wider backdrop-blur-md">
              <Crown className="w-3.5 h-3.5 text-amber-400" />
              VIP Fast-Track Admissions
            </span>
            <h3 className="text-2xl sm:text-3xl font-extrabold font-serif text-white">
              Have Questions Before Booking?
            </h3>
            <p className="text-slate-300 text-xs sm:text-sm max-w-xl">
              Talk directly with our resident warden desk or schedule an in-person hostel tour today.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <a
              href="https://wa.me/923001234567"
              target="_blank"
              rel="noreferrer"
              className="px-6 py-3 rounded-2xl bg-gradient-to-r from-amber-500 via-amber-400 to-amber-600 text-slate-950 font-black text-xs hover:from-amber-400 hover:to-amber-300 transition-all shadow-lg shadow-amber-500/25 flex items-center gap-2 hover:scale-105"
            >
              <MessageCircle className="w-4 h-4 fill-slate-950" />
              Chat on WhatsApp
            </a>
            <a
              href="tel:+923001234567"
              className="px-6 py-3 rounded-2xl bg-[#09090c] border border-amber-500/40 text-amber-300 font-bold text-xs hover:bg-amber-500/10 transition-all flex items-center gap-2"
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
            <Logo variant="dark" size="lg" badgeText="Peshawar" subtext="Main University Road, Peshawar" />

            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              Peshawar&apos;s most trusted luxury residence for female university students, medical officers, and professionals. 100% female staff, 3-time nutritious mess, biometric gate security, and 24/7 power backup.
            </p>

            <div className="flex items-center gap-2 text-xs text-amber-300 font-bold">
              <ShieldCheck className="w-4 h-4 text-amber-400" />
              <span>100% Female-Only Supervised Facility</span>
            </div>

            {/* Social Icons */}
            <div className="flex items-center gap-3 pt-2">
              <a
                href="#"
                className="w-9 h-9 rounded-xl bg-slate-900/90 border border-amber-500/25 flex items-center justify-center text-slate-400 hover:text-amber-300 hover:border-amber-400 transition-all shadow-sm"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="#"
                className="w-9 h-9 rounded-xl bg-slate-900/90 border border-amber-500/25 flex items-center justify-center text-slate-400 hover:text-amber-300 hover:border-amber-400 transition-all shadow-sm"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href="https://wa.me/923001234567"
                className="w-9 h-9 rounded-xl bg-slate-900/90 border border-amber-500/25 flex items-center justify-center text-slate-400 hover:text-amber-300 hover:border-amber-400 transition-all shadow-sm"
              >
                <MessageCircle className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Rooms */}
          <div className="space-y-3">
            <h4 className="text-xs font-black uppercase tracking-wider text-amber-400 font-mono">
              Room Categories
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/rooms" className="hover:text-amber-300 transition-colors flex items-center gap-1">
                  <ArrowRight className="w-3 h-3 text-amber-400" />
                  Single Executive Suite
                </Link>
              </li>
              <li>
                <Link href="/rooms" className="hover:text-amber-300 transition-colors flex items-center gap-1">
                  <ArrowRight className="w-3 h-3 text-amber-400" />
                  Deluxe Double Sharing
                </Link>
              </li>
              <li>
                <Link href="/rooms" className="hover:text-amber-300 transition-colors flex items-center gap-1">
                  <ArrowRight className="w-3 h-3 text-amber-400" />
                  Triple Economy Room
                </Link>
              </li>
              <li>
                <Link href="/rooms" className="hover:text-amber-300 transition-colors flex items-center gap-1">
                  <ArrowRight className="w-3 h-3 text-amber-400" />
                  Quad Student Sharing
                </Link>
              </li>
              <li>
                <Link href="/amenities" className="hover:text-amber-300 transition-colors flex items-center gap-1">
                  <ArrowRight className="w-3 h-3 text-amber-400" />
                  Weekly Mess Menu
                </Link>
              </li>
            </ul>
          </div>

          {/* Resident Portals */}
          <div className="space-y-3">
            <h4 className="text-xs font-black uppercase tracking-wider text-amber-400 font-mono">
              Portals & Services
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/login" className="hover:text-amber-300 transition-colors flex items-center gap-1">
                  <ArrowRight className="w-3 h-3 text-amber-400" />
                  Resident Login
                </Link>
              </li>
              <li>
                <Link href="/dashboard/resident/payments" className="hover:text-amber-300 transition-colors flex items-center gap-1">
                  <ArrowRight className="w-3 h-3 text-amber-400" />
                  Online Rent Payment
                </Link>
              </li>
              <li>
                <Link href="/dashboard/resident/gate-pass" className="hover:text-amber-300 transition-colors flex items-center gap-1">
                  <ArrowRight className="w-3 h-3 text-amber-400" />
                  E-Gate Pass System
                </Link>
              </li>
              <li>
                <Link href="/dashboard/resident/maintenance" className="hover:text-amber-300 transition-colors flex items-center gap-1">
                  <ArrowRight className="w-3 h-3 text-amber-400" />
                  Repair & Maintenance
                </Link>
              </li>
              <li>
                <Link href="/dashboard/admin" className="hover:text-amber-300 transition-colors flex items-center gap-1">
                  <ArrowRight className="w-3 h-3 text-amber-400" />
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
                <MapPin className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
                <span>Main University Road, near University of Peshawar & KMU, Peshawar, KPK</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-amber-400 flex-shrink-0" />
                <span className="font-mono text-amber-300">+92 300 1234567</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-amber-400 flex-shrink-0" />
                <span>info@educatorhostel.pk</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="pt-8 border-t border-amber-500/20 text-center text-xs text-slate-500 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p>© 2026 Educator Girls Hostel Peshawar. All rights reserved.</p>
          <div className="flex items-center gap-2">
            <span>Crafted for Safety & Academic Excellence</span>
            <Heart className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
          </div>
        </div>
      </div>
    </footer>
  );
}
