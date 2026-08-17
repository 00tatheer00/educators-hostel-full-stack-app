"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Bed, Phone, ShieldCheck, Sparkles, Menu, X, Globe, User, LogIn } from "lucide-react";
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
    { name: t("home"), href: "/" },
    { name: t("rooms"), href: "/rooms" },
    { name: t("amenities"), href: "/amenities" },
    { name: t("about"), href: "/about" },
    { name: t("gallery"), href: "/gallery" },
    { name: t("contact"), href: "/contact" },
  ];

  return (
    <header className="sticky top-0 z-50 transition-all duration-300 w-full px-4 sm:px-8 pt-2 pb-2">
      {/* Top Notification / Hotline Bar */}
      <div className="max-w-7xl mx-auto mb-1 flex items-center justify-between text-[11px] font-medium text-slate-600 dark:text-slate-300 px-4 py-1 rounded-full bg-emerald-950/80 backdrop-blur-md text-emerald-100 border border-emerald-800/40">
        <div className="flex items-center gap-2">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
          </span>
          <span className="hidden sm:inline">Fall 2026 Admissions Open:</span>
          <span className="text-amber-300 font-bold">Limited Single & Double Seats Remaining</span>
        </div>
        <div className="flex items-center gap-4">
          <a href="tel:+923001234567" className="flex items-center gap-1 hover:text-amber-300 transition-colors">
            <Phone className="w-3 h-3 text-amber-400" />
            <span className="font-mono">24/7 Desk: +92 300 1234567</span>
          </a>
          <button
            onClick={toggleLanguage}
            className="flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-800/60 hover:bg-emerald-700/80 text-amber-300 font-bold transition-colors"
          >
            <Globe className="w-3 h-3" />
            <span>{language === "en" ? "اردو" : "English"}</span>
          </button>
        </div>
      </div>

      {/* Main Floating Glass Navbar */}
      <nav className={`max-w-7xl mx-auto rounded-2xl transition-all duration-300 px-5 sm:px-7 py-3 ${
        isScrolled
          ? "bg-white/95 dark:bg-slate-950/95 shadow-2xl shadow-emerald-950/10 border border-emerald-600/20 backdrop-blur-xl"
          : "bg-white/80 dark:bg-slate-950/80 border border-slate-200/60 dark:border-slate-800/60 backdrop-blur-lg"
      }`}>
        <div className="flex items-center justify-between">
          {/* Brand Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-emerald-800 to-emerald-950 flex items-center justify-center text-amber-300 shadow-md shadow-emerald-900/30 group-hover:scale-105 transition-transform border border-amber-400/30">
              <Sparkles className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-serif text-lg sm:text-xl font-black tracking-tight text-slate-900 dark:text-white group-hover:text-emerald-700 dark:group-hover:text-emerald-400 transition-colors">
                  Educator Girls Hostel
                </span>
                <span className="text-[10px] font-extrabold uppercase px-1.5 py-0.5 rounded bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-400/30">
                  Luxury
                </span>
              </div>
              <p className="text-[10px] text-slate-600 dark:text-slate-400 font-medium">
                University Road, Peshawar
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
                  className={`px-4 py-2 rounded-xl text-xs font-semibold tracking-wide transition-all ${
                    isActive
                      ? "bg-emerald-900/10 dark:bg-emerald-500/15 text-emerald-800 dark:text-emerald-300 font-bold"
                      : "text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800/60"
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </div>

          {/* Action CTAs */}
          <div className="hidden md:flex items-center gap-3">
            <Link href="/login">
              <Button variant="ghost" size="sm" className="text-xs font-semibold hover:bg-emerald-50 dark:hover:bg-emerald-950/40 text-slate-700 dark:text-slate-200">
                <LogIn className="w-3.5 h-3.5 mr-1.5 text-emerald-600" />
                {t("login")}
              </Button>
            </Link>
            <Link href="/rooms">
              <Button variant="gold" size="sm" className="text-xs font-bold shadow-lg shadow-amber-500/20 px-5">
                <Bed className="w-4 h-4 mr-1.5" />
                {t("book_now")}
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-xl text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden pt-4 pb-3 border-t border-slate-200/80 dark:border-slate-800/80 mt-3 space-y-2">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="block px-4 py-2.5 rounded-xl text-sm font-semibold text-slate-700 dark:text-slate-200 hover:bg-emerald-50 dark:hover:bg-emerald-950/50"
              >
                {link.name}
              </Link>
            ))}
            <div className="pt-2 flex flex-col gap-2">
              <Link href="/login" onClick={() => setMobileMenuOpen(false)}>
                <Button variant="outline" className="w-full text-xs font-semibold">
                  <LogIn className="w-4 h-4 mr-2" />
                  {t("login")}
                </Button>
              </Link>
              <Link href="/rooms" onClick={() => setMobileMenuOpen(false)}>
                <Button variant="gold" className="w-full text-xs font-bold">
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
