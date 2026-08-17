"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Bed, Phone, Sparkles, Menu, X, Globe, LogIn, ShieldCheck, Heart } from "lucide-react";
import { useState, useEffect } from "react";
import { useLanguage } from "@/context/LanguageContext";

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const { language, toggleLanguage, t } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 15);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: t("home"), href: "/" },
    { name: t("rooms"), href: "/rooms", badge: "Hot" },
    { name: t("amenities"), href: "/amenities" },
    { name: t("gallery"), href: "/gallery" },
    { name: t("about"), href: "/about" },
    { name: t("contact"), href: "/contact" },
  ];

  return (
    <header className="sticky top-0 z-50 transition-all duration-300 w-full px-3 sm:px-6 pt-2 pb-2">
      {/* Top Saturated Notification Ribbon */}
      <div className="max-w-7xl mx-auto mb-1.5 flex items-center justify-between text-[11px] font-semibold px-4 py-1.5 rounded-full bg-gradient-to-r from-indigo-950 via-slate-900 to-pink-950 text-white border border-pink-500/30 shadow-lg shadow-pink-950/20 backdrop-blur-md">
        <div className="flex items-center gap-2">
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-pink-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-pink-500"></span>
          </span>
          <span className="px-2 py-0.5 rounded-full bg-pink-600 text-[10px] font-extrabold uppercase tracking-wider text-white">
            Admissions Open
          </span>
          <span className="hidden md:inline text-slate-200">
            Fall 2026 Batch — Limited Seats on University Road Peshawar!
          </span>
        </div>

        <div className="flex items-center gap-4">
          <a
            href="tel:+923001234567"
            className="flex items-center gap-1 text-pink-300 hover:text-white transition-colors font-mono"
          >
            <Phone className="w-3 h-3 text-pink-400 animate-pulse" />
            <span className="hidden sm:inline">24/7 Desk:</span>
            <span>+92 300 1234567</span>
          </a>

          <button
            onClick={toggleLanguage}
            className="flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-pink-500/20 hover:bg-pink-500/30 text-amber-300 font-bold border border-pink-400/40 transition-all duration-200"
          >
            <Globe className="w-3 h-3" />
            <span>{language === "en" ? "اردو" : "English"}</span>
          </button>
        </div>
      </div>

      {/* Main Glass Navbar with Saturated Accents */}
      <nav
        className={`max-w-7xl mx-auto rounded-3xl transition-all duration-300 px-4 sm:px-6 py-3 ${
          isScrolled
            ? "bg-white/95 dark:bg-slate-950/95 shadow-2xl shadow-indigo-950/15 border-2 border-indigo-500/20 backdrop-blur-2xl"
            : "bg-white/85 dark:bg-slate-950/85 border border-slate-200/80 dark:border-slate-800/80 shadow-md backdrop-blur-xl"
        }`}
      >
        <div className="flex items-center justify-between">
          {/* Brand Logo with Saturated Gradient & Doodles */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative">
              <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-pink-500 via-indigo-600 to-cyan-400 flex items-center justify-center text-white shadow-lg shadow-pink-500/30 group-hover:scale-105 group-hover:rotate-3 transition-all duration-300">
                <Sparkles className="w-6 h-6 animate-pulse" />
              </div>
              <span className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-emerald-500 border-2 border-white flex items-center justify-center text-[8px] text-white font-black">
                ✓
              </span>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-serif text-lg sm:text-xl font-black tracking-tight text-slate-900 dark:text-white group-hover:text-pink-600 dark:group-hover:text-pink-400 transition-colors">
                  Educator Girls Hostel
                </span>
                <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded-full bg-gradient-to-r from-pink-500 to-rose-500 text-white shadow-sm">
                  ★ LUXURY
                </span>
              </div>
              <p className="text-[10px] text-slate-500 dark:text-slate-400 font-semibold flex items-center gap-1">
                <span>University Road, Peshawar</span>
                <span className="text-pink-500 font-bold">• 100% Female Safe</span>
              </p>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex items-center gap-1 bg-slate-100/70 dark:bg-slate-900/70 p-1 rounded-2xl border border-slate-200/60 dark:border-slate-800/60">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`relative px-4 py-2 rounded-xl text-xs font-bold tracking-wide transition-all duration-200 flex items-center gap-1.5 ${
                    isActive
                      ? "bg-gradient-to-r from-pink-500 to-indigo-600 text-white shadow-md shadow-pink-500/25"
                      : "text-slate-700 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white hover:bg-white dark:hover:bg-slate-800"
                  }`}
                >
                  {link.name}
                  {link.badge && (
                    <span className="text-[9px] px-1.5 py-0.2 rounded-full bg-amber-400 text-slate-950 font-black animate-pulse">
                      {link.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </div>

          {/* Action CTAs */}
          <div className="hidden md:flex items-center gap-3">
            <Link href="/login">
              <Button
                variant="ghost"
                size="sm"
                className="text-xs font-bold hover:bg-pink-50 dark:hover:bg-pink-950/40 text-slate-700 dark:text-slate-200 rounded-xl"
              >
                <LogIn className="w-3.5 h-3.5 mr-1.5 text-indigo-600 dark:text-indigo-400" />
                {t("login")}
              </Button>
            </Link>

            <Link href="/rooms">
              <Button
                size="sm"
                className="text-xs font-extrabold px-5 py-2.5 rounded-2xl bg-gradient-to-r from-pink-500 via-rose-500 to-indigo-600 hover:from-pink-600 hover:to-indigo-700 text-white shadow-xl shadow-pink-500/30 hover:scale-105 active:scale-95 transition-all duration-300 border border-white/20"
              >
                <Bed className="w-4 h-4 mr-1.5" />
                {t("book_now")}
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2.5 rounded-2xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-pink-50 dark:hover:bg-pink-950/40 transition-colors"
          >
            {mobileMenuOpen ? <X className="w-6 h-6 text-pink-500" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden pt-4 pb-3 border-t border-slate-200 dark:border-slate-800 mt-3 space-y-2 animate-fade-in">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`block px-4 py-2.5 rounded-2xl text-sm font-bold transition-all ${
                  pathname === link.href
                    ? "bg-gradient-to-r from-pink-500 to-indigo-600 text-white"
                    : "text-slate-700 dark:text-slate-200 hover:bg-pink-50 dark:hover:bg-pink-950/40"
                }`}
              >
                {link.name}
              </Link>
            ))}

            <div className="pt-2 flex flex-col gap-2">
              <Link href="/login" onClick={() => setMobileMenuOpen(false)}>
                <Button variant="outline" className="w-full text-xs font-bold rounded-2xl">
                  <LogIn className="w-4 h-4 mr-2 text-indigo-600" />
                  {t("login")}
                </Button>
              </Link>
              <Link href="/rooms" onClick={() => setMobileMenuOpen(false)}>
                <Button className="w-full text-xs font-black rounded-2xl bg-gradient-to-r from-pink-500 to-indigo-600 text-white shadow-lg shadow-pink-500/30">
                  <Bed className="w-4 h-4 mr-2" />
                  {t("book_now")}
                </Button>
              </Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
