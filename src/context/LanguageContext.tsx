"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

type Language = "en" | "ur";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  toggleLanguage: () => void;
  t: (key: string) => string;
}

const translations: Record<Language, Record<string, string>> = {
  en: {
    hostelName: "Educator Girls Hostel",
    tagline: "Peshawar Luxury Residentia",
    home: "Home",
    rooms: "Rooms & Booking",
    amenities: "Amenities",
    about: "About Us",
    contact: "Contact",
    gallery: "Gallery",
    login: "Resident Login",
    bookNow: "Book Room Now",
    heroTitle: "Luxury Living & Safe Haven for Educated Women",
    heroSubtitle: "Located on University Road, Peshawar. 24/7 biometric security, 3-time mess meals, AC rooms, and peaceful study atmosphere.",
    exploreRooms: "Explore Rooms & Reserve",
    virtualTour: "Virtual Tour & Facilities",
    whyChooseUs: "Why Choose Us",
    unmatchedStandards: "Unmatched Safety & Living Standards",
    safetyTitle: "5-Tier Security System",
    safetyDesc: "Biometric gate passes, 24/7 CCTV surveillance, boundary security, and female wardens.",
    messTitle: "3-Time Fresh Mess Menu",
    messDesc: "Hygienically prepared breakfast, lunch, and dinner with daily nutritional menu.",
    powerTitle: "UPS Power & Fiber Wi-Fi",
    powerDesc: "Heavy generator backup for continuous study and high-speed fiber internet.",
    accommodations: "Room Options & Pricing",
    perMonth: "/ month",
    securityDeposit: "Security Deposit",
    reserveRoom: "Reserve Room",
    viewDetails: "View Full Details",
    testimonialsTitle: "What Our Residents Say",
    ctaTitle: "Reserve Your Room For The Upcoming Session",
    ctaSubtitle: "Limited seats available for university students and medical residents on University Road Peshawar.",
    callWarden: "Call Hostel Warden",
    phoneDesk: "24/7 Desk: +92 300 1234567",
    addressPeshawar: "University Road, near Peshawar University, Peshawar, KPK",
  },
  ur: {
    hostelName: "ایجوکیٹر گرلز ہاسٹل",
    tagline: "پشاور کی پرتعیش رہائش گاہ",
    home: "ہوم",
    rooms: "کمرے اور بکنگ",
    amenities: "سہولیات",
    about: "ہمارے بارے میں",
    contact: "رابطہ کریں",
    gallery: "تصاویر گیلری",
    login: "مقیم لاگ ان",
    bookNow: "ابھی کمرہ بک کریں",
    heroTitle: "طالبات اور خواتین کے لیے محفوظ اور پرتعیش رہائش",
    heroSubtitle: "یونیورسٹی روڈ پشاور پر واقع۔ 24 گھنٹے بائیو میٹرک سیکیورٹی، 3 وقت کا معیاری کھانا، اے سی کمرے اور پرسکون تعلیمی ماحول۔",
    exploreRooms: "کمرے دیکھیں اور بک کریں",
    virtualTour: "سہولیات کا جائزہ لیں",
    whyChooseUs: "ہمیں کیوں منتخب کریں",
    unmatchedStandards: "بے مثال تحفظ اور اعلیٰ رہائشی معیار",
    safetyTitle: "5 درجاتی سیکیورٹی نظام",
    safetyDesc: "بائیو میٹرک گیٹ پاس، 24/7 سی سی ٹی وی کیمرے اور لیڈی وارڈن۔",
    messTitle: "3 وقت کا تازہ کھانا",
    messDesc: "صفائی ستھرائی سے تیار کردہ ناشتہ، دوپہر اور رات کا کھانا۔",
    powerTitle: "یو پی ایس پاور اور انٹرنیٹ",
    powerDesc: "بلا تعطل بجلی کے لیے جنریٹر بیک اپ اور تیز ترین وائی فائی۔",
    accommodations: "کمروں کی اقسام اور کرایہ",
    perMonth: "/ ماہانہ",
    securityDeposit: "سیکیورٹی ڈپازٹ",
    reserveRoom: "کمرہ محفوظ کریں",
    viewDetails: "مکمل تفصیلا ت دیکھیں",
    testimonialsTitle: "ہمارے ہاسٹل کی طالبات کی رائے",
    ctaTitle: "نئے تعلیمی سیشن کے لیے اپنا کمرہ ابھی بک کریں",
    ctaSubtitle: "یونیورسٹی آف پشاور اور میڈیکل طالبات کے لیے محدود نشستیں دستیاب ہیں۔",
    callWarden: "ہاسٹل وارڈن سے بات کریں",
    phoneDesk: "24/7 ہیلپ لائن: 1234567 300 92+",
    addressPeshawar: "مین یونیورسٹی روڈ، نزد پشاور یونیورسٹی، پشاور",
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>("en");

  useEffect(() => {
    const saved = localStorage.getItem("egh_language") as Language;
    if (saved && (saved === "en" || saved === "ur")) {
      setLanguageState(saved);
    }
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem("egh_language", lang);
  };

  const toggleLanguage = () => {
    const newLang = language === "en" ? "ur" : "en";
    setLanguage(newLang);
  };

  const t = (key: string): string => {
    return translations[language]?.[key] || translations["en"]?.[key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
