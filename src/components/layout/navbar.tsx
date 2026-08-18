"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Bed, Phone, Menu, X, Globe, LogIn, MapPin, ChevronRight, Crown } from "lucide-react";
import { useState, useEffect } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { Logo } from "@/components/common/Logo";

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const { language, toggleLanguage, t } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: t("home") || "Home", href: "/" },
    { name: t("rooms") || "Rooms & Booking", href: "/rooms", badge: "Exclusive" },
    { name: t("amenities") || "Amenities", href: "/amenities" },
    { name: t("gallery") || "Gallery", href: "/gallery" },
    { name: t("about") || "About Us", href: "/about" },
    { name: t("contact") || "Contact", href: "/contact" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full transition-all duration-300">
      {/* 1. Ultra-Luxury Top Announcement Bar (Obsidian & Gold) */}
      <div className="bg-[#050507] text-slate-300 border-b border-amber-500/20 text-[11px] sm:text-xs py-1.5 px-4 sm:px-8 backdrop-blur-md">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-2">
          {/* Left: Admissions & Location */}
          <div className="flex items-center gap-2.5 truncate">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-amber-500/15 border border-amber-400/40 text-amber-300 font-bold text-[10px] sm:text-[11px] shadow-sm">
              <Crown className="h-3 w-3 text-amber-400" />
              <span>Admissions Open Fall 2026</span>
            </span>
            <span className="hidden md:inline-flex items-center gap-1 text-slate-400 font-normal truncate">
              <MapPin className="w-3 h-3 text-amber-400 shrink-0" />
              <span>Main University Road, Peshawar (Near UoP & KMU)</span>
            </span>
          </div>

          {/* Right: Desk Hotline & Language Switcher */}
          <div className="flex items-center gap-3 sm:gap-4 shrink-0">
            <a
              href="tel:+923001234567"
              className="flex items-center gap-1.5 text-slate-300 hover:text-amber-300 transition-colors group"
            >
              <div className="w-5 h-5 rounded-full bg-amber-500/20 border border-amber-500/40 flex items-center justify-center group-hover:bg-amber-500/40 transition-colors">
                <Phone className="w-2.5 h-2.5 text-amber-300" />
              </div>
              <span className="hidden sm:inline text-slate-400">24/7 VIP Helpline:</span>
              <span className="font-bold text-amber-300 tracking-wide font-mono">+92 300 1234567</span>
            </a>

            <div className="h-3 w-px bg-amber-500/25 hidden sm:block" />

            <button
              onClick={toggleLanguage}
              className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md bg-white/5 hover:bg-amber-500/15 text-slate-200 hover:text-amber-300 border border-amber-500/30 text-[11px] font-semibold transition-all"
              title="Switch Language"
            >
              <Globe className="w-3 h-3 text-amber-400" />
              <span>{language === "en" ? "اردو" : "English"}</span>
            </button>
          </div>
        </div>
      </div>

      {/* 2. Main Luxury Navigation Bar (Obsidian Glass & Gold Accents) */}
      <nav
        className={`w-full transition-all duration-300 px-4 sm:px-8 border-b ${
          isScrolled
            ? "py-2.5 bg-[#09090c]/95 backdrop-blur-2xl shadow-2xl border-amber-500/30 shadow-black/80"
            : "py-3.5 bg-[#0a0a0e]/90 backdrop-blur-xl border-amber-500/20"
        }`}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Brand Logo & Royal Emblem (Prominent Standalone) */}
          <Logo variant="dark" size={56} showText={false} priority className="hover:scale-105 transition-transform" />

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`relative px-3.5 py-2 rounded-xl text-xs font-bold tracking-wide transition-all duration-200 flex items-center gap-1.5 ${
                    isActive
                      ? "text-amber-300 bg-amber-500/15 border border-amber-500/30 font-black shadow-sm"
                      : "text-slate-300 hover:text-white hover:bg-white/5 hover:border-amber-500/20 border border-transparent"
                  }`}
                >
                  {link.name}
                  {link.badge && (
                    <span className="text-[9px] px-1.5 py-0.2 rounded-full bg-gradient-to-r from-amber-500 to-yellow-500 text-slate-950 font-black uppercase shadow-sm">
                      {link.badge}
                    </span>
                  )}
                  {isActive && (
                    <span className="absolute bottom-0 left-3.5 right-3.5 h-0.5 bg-gradient-to-r from-amber-400 via-yellow-200 to-amber-500 rounded-full" />
                  )}
                </Link>
              );
            })}
          </div>

          {/* Right Action CTAs */}
          <div className="hidden sm:flex items-center gap-2.5">
            <Link href="/login">
              <Button
                variant="outline"
                size="sm"
                className="text-xs font-bold h-9 px-3.5 rounded-xl border-amber-500/30 text-slate-200 hover:text-amber-300 hover:border-amber-400/60 bg-black/40 transition-colors"
              >
                <LogIn className="w-3.5 h-3.5 mr-1.5 text-amber-400" />
                {t("login") || "Resident Login"}
              </Button>
            </Link>

            <Link href="/rooms">
              <Button
                size="sm"
                className="text-xs font-black h-9 px-4 rounded-xl bg-gradient-to-r from-amber-500 via-amber-400 to-amber-600 hover:from-amber-400 hover:to-amber-300 text-slate-950 shadow-lg shadow-amber-500/25 active:scale-[0.98] transition-all"
              >
                <Bed className="w-3.5 h-3.5 mr-1.5" />
                {t("bookNow") || "Book a Room"}
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Toggle Button */}
          <div className="flex items-center gap-2 lg:hidden">
            <Link href="/rooms" className="sm:hidden">
              <Button
                size="sm"
                className="text-[11px] font-black h-8 px-2.5 rounded-lg bg-amber-500 text-slate-950 shadow-sm"
              >
                Book
              </Button>
            </Link>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl border border-amber-500/30 text-slate-200 hover:bg-amber-500/10 transition-colors"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5 text-amber-400" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu Sheet */}
        {mobileMenuOpen && (
          <div className="lg:hidden mt-3 pt-3 pb-2 border-t border-amber-500/20 space-y-1.5 animate-in fade-in slide-in-from-top-2 duration-200 bg-[#09090c] rounded-2xl p-3 border border-amber-500/30 mt-2">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all ${
                    isActive
                      ? "bg-amber-500/20 text-amber-300 border border-amber-500/40"
                      : "text-slate-300 hover:bg-white/5"
                  }`}
                >
                  <span className="flex items-center gap-2">
                    {link.name}
                    {link.badge && (
                      <span className="text-[9px] px-1.5 py-0.2 rounded-full bg-amber-500 text-slate-950 font-black uppercase">
                        {link.badge}
                      </span>
                    )}
                  </span>
                  <ChevronRight className="w-3.5 h-3.5 opacity-60 text-amber-400" />
                </Link>
              );
            })}

            <div className="pt-2 grid grid-cols-2 gap-2 border-t border-amber-500/20 mt-2">
              <Link href="/login" onClick={() => setMobileMenuOpen(false)}>
                <Button variant="outline" size="sm" className="w-full text-xs font-bold h-9 rounded-xl border-amber-500/30 text-amber-300">
                  <LogIn className="w-3.5 h-3.5 mr-1.5 text-amber-400" />
                  {t("login") || "Login"}
                </Button>
              </Link>
              <Link href="/rooms" onClick={() => setMobileMenuOpen(false)}>
                <Button size="sm" className="w-full text-xs font-black h-9 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 shadow-sm">
                  <Bed className="w-3.5 h-3.5 mr-1.5" />
                  {t("bookNow") || "Book Room"}
                </Button>
              </Link>
            </div>

            <div className="pt-2 text-center">
              <a
                href="tel:+923001234567"
                className="inline-flex items-center gap-1.5 text-xs text-amber-400 font-bold py-1"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>Call Warden: +92 300 1234567</span>
              </a>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
