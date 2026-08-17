"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Bed, Phone, Sparkles, Menu, X, Globe, LogIn, ShieldCheck, MapPin, ChevronRight } from "lucide-react";
import { useState, useEffect } from "react";
import { useLanguage } from "@/context/LanguageContext";

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
    { name: t("rooms") || "Rooms & Booking", href: "/rooms", badge: "Hot" },
    { name: t("amenities") || "Amenities", href: "/amenities" },
    { name: t("gallery") || "Gallery", href: "/gallery" },
    { name: t("about") || "About Us", href: "/about" },
    { name: t("contact") || "Contact", href: "/contact" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full transition-all duration-300">
      {/* 1. Ultra-Sleek Top Luxury Announcement & Quick Contact Bar */}
      <div className="bg-slate-950/95 text-slate-300 border-b border-white/10 text-[11px] sm:text-xs py-1.5 px-4 sm:px-8 backdrop-blur-md">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-2">
          {/* Left: Admissions & Location */}
          <div className="flex items-center gap-2.5 truncate">
            <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 font-semibold text-[10px] sm:text-[11px]">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-ping" />
              <span>Admissions Open 2026</span>
            </span>
            <span className="hidden md:inline-flex items-center gap-1 text-slate-400 font-normal truncate">
              <MapPin className="w-3 h-3 text-pink-400 shrink-0" />
              <span>Main University Road, Peshawar (Near UoP & KMU)</span>
            </span>
          </div>

          {/* Right: Desk Hotline & Language Switcher */}
          <div className="flex items-center gap-3 sm:gap-4 shrink-0">
            <a
              href="tel:+923001234567"
              className="flex items-center gap-1.5 text-slate-300 hover:text-white transition-colors group"
            >
              <div className="w-5 h-5 rounded-full bg-pink-500/20 flex items-center justify-center group-hover:bg-pink-500/40 transition-colors">
                <Phone className="w-2.5 h-2.5 text-pink-400" />
              </div>
              <span className="hidden sm:inline text-slate-400">24/7 Helpline:</span>
              <span className="font-semibold text-white tracking-wide font-mono">+92 300 1234567</span>
            </a>

            <div className="h-3 w-px bg-white/20 hidden sm:block" />

            <button
              onClick={toggleLanguage}
              className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md bg-white/5 hover:bg-white/15 text-slate-200 hover:text-white border border-white/15 text-[11px] font-medium transition-all"
              title="Switch Language"
            >
              <Globe className="w-3 h-3 text-amber-400" />
              <span>{language === "en" ? "اردو" : "English"}</span>
            </button>
          </div>
        </div>
      </div>

      {/* 2. Main Luxury Navigation Bar */}
      <nav
        className={`w-full transition-all duration-300 px-4 sm:px-8 border-b ${
          isScrolled
            ? "py-2.5 bg-white/95 dark:bg-slate-950/95 backdrop-blur-2xl shadow-md border-slate-200/80 dark:border-slate-800/80"
            : "py-3.5 bg-white/90 dark:bg-slate-950/90 backdrop-blur-xl border-slate-200/50 dark:border-slate-800/50"
        }`}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Brand Logo & Emblem */}
          <Link href="/" className="flex items-center gap-3 group shrink-0">
            <div className="relative">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-pink-600 via-rose-500 to-indigo-600 p-0.5 shadow-md shadow-pink-500/20 group-hover:scale-105 group-hover:shadow-pink-500/30 transition-all duration-300">
                <div className="w-full h-full bg-slate-950/30 rounded-[10px] flex items-center justify-center backdrop-blur-sm text-white">
                  <Sparkles className="w-5 h-5 text-amber-300" />
                </div>
              </div>
              <span className="absolute -bottom-1 -right-1 w-3.5 h-3.5 rounded-full bg-emerald-500 border-2 border-white dark:border-slate-950 flex items-center justify-center text-[7px] text-white font-bold">
                ✓
              </span>
            </div>

            <div>
              <div className="flex items-center gap-2">
                <span className="font-serif text-base sm:text-lg font-bold tracking-tight text-slate-900 dark:text-white group-hover:text-pink-600 dark:group-hover:text-pink-400 transition-colors">
                  Educator Girls Hostel
                </span>
                <span className="hidden sm:inline-block text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded bg-pink-50 dark:bg-pink-950/50 text-pink-600 dark:text-pink-400 border border-pink-200 dark:border-pink-900/50">
                  Luxury Living
                </span>
              </div>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 font-normal flex items-center gap-1.5">
                <span>University Road, Peshawar</span>
                <span className="text-pink-500 font-medium">• 100% Female Safe</span>
              </p>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`relative px-3.5 py-2 rounded-lg text-xs font-semibold tracking-wide transition-all duration-200 flex items-center gap-1.5 ${
                    isActive
                      ? "text-pink-600 dark:text-pink-400 bg-pink-50/80 dark:bg-pink-950/40 font-bold"
                      : "text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100/70 dark:hover:bg-slate-900/70"
                  }`}
                >
                  {link.name}
                  {link.badge && (
                    <span className="text-[9px] px-1.5 py-0.2 rounded-full bg-gradient-to-r from-pink-500 to-rose-500 text-white font-bold uppercase">
                      {link.badge}
                    </span>
                  )}
                  {isActive && (
                    <span className="absolute bottom-0 left-3.5 right-3.5 h-0.5 bg-gradient-to-r from-pink-500 to-indigo-600 rounded-full" />
                  )}
                </Link>
              );
            })}
          </div>

          {/* Right Action CTAs */}
          <div className="hidden sm:flex items-center gap-2.5">
            <Link href="/login">
              <Button
                variant="ghost"
                size="sm"
                className="text-xs font-semibold h-9 px-3.5 rounded-lg text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-900 transition-colors"
              >
                <LogIn className="w-3.5 h-3.5 mr-1.5 text-indigo-600 dark:text-indigo-400" />
                {t("login") || "Resident Login"}
              </Button>
            </Link>

            <Link href="/rooms">
              <Button
                size="sm"
                className="text-xs font-semibold h-9 px-4 rounded-lg bg-gradient-to-r from-pink-600 via-rose-500 to-indigo-600 hover:from-pink-500 hover:to-indigo-500 text-white shadow-md shadow-pink-500/20 hover:shadow-pink-500/30 active:scale-[0.98] transition-all"
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
                className="text-[11px] font-semibold h-8 px-2.5 rounded-lg bg-pink-600 text-white shadow-sm"
              >
                Book
              </Button>
            </Link>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-900 transition-colors"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5 text-pink-600" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu Sheet */}
        {mobileMenuOpen && (
          <div className="lg:hidden mt-3 pt-3 pb-2 border-t border-slate-200 dark:border-slate-800 space-y-1.5 animate-in fade-in slide-in-from-top-2 duration-200">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center justify-between px-3.5 py-2.5 rounded-lg text-xs font-semibold transition-all ${
                    isActive
                      ? "bg-pink-50 dark:bg-pink-950/50 text-pink-600 dark:text-pink-400 font-bold"
                      : "text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-900"
                  }`}
                >
                  <span className="flex items-center gap-2">
                    {link.name}
                    {link.badge && (
                      <span className="text-[9px] px-1.5 py-0.2 rounded-full bg-pink-600 text-white font-bold uppercase">
                        {link.badge}
                      </span>
                    )}
                  </span>
                  <ChevronRight className="w-3.5 h-3.5 opacity-50" />
                </Link>
              );
            })}

            <div className="pt-2 grid grid-cols-2 gap-2 border-t border-slate-200/60 dark:border-slate-800/60 mt-2">
              <Link href="/login" onClick={() => setMobileMenuOpen(false)}>
                <Button variant="outline" size="sm" className="w-full text-xs font-semibold h-9 rounded-lg">
                  <LogIn className="w-3.5 h-3.5 mr-1.5 text-indigo-600" />
                  {t("login") || "Login"}
                </Button>
              </Link>
              <Link href="/rooms" onClick={() => setMobileMenuOpen(false)}>
                <Button size="sm" className="w-full text-xs font-semibold h-9 rounded-lg bg-pink-600 text-white shadow-sm">
                  <Bed className="w-3.5 h-3.5 mr-1.5" />
                  {t("bookNow") || "Book Room"}
                </Button>
              </Link>
            </div>

            <div className="pt-2 text-center">
              <a
                href="tel:+923001234567"
                className="inline-flex items-center gap-1.5 text-xs text-pink-600 dark:text-pink-400 font-medium py-1"
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
