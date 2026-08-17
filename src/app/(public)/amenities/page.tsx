"use client";

import { ShieldCheck, Utensils, Wifi, Lock, Zap, BookOpen, Shirt, Sparkles, HeartHandshake, CheckCircle2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { useLanguage } from "@/context/LanguageContext";

export default function AmenitiesPage() {
  const { language, t } = useLanguage();
  const isUrdu = language === "ur";

  const categories = [
    {
      id: "security",
      title: isUrdu ? "سیکیورٹی اور تحفظ" : "5-Star Security & Gate Control",
      icon: ShieldCheck,
      color: "text-emerald-600",
      description: isUrdu ? "طالبات کے مکمل تحفظ کے لیے سخت سیکیورٹی انتظام" : "Strict security infrastructure engineered for female safety.",
      items: [
        "Biometric gate pass entry & exit tracking",
        "24/7 High-definition CCTV surveillance across corridors",
        "Dedicated round-the-clock female wardens & staff",
        "High perimeter boundary wall with security guards",
        "Digital SMS alert system for parent gate pass approvals",
      ],
    },
    {
      id: "dining",
      title: isUrdu ? "کھانا اور مائس ڈائننگ" : "Nutritious 3-Time Mess Facility",
      icon: Utensils,
      color: "text-amber-500",
      description: isUrdu ? "گھر جیسا لذیذ اور حفظان صحت کے مطابق کھانا" : "Hygienically prepared fresh meals tailored for student health.",
      items: [
        "3-Time daily nutritious fresh meals (Breakfast, Lunch, Dinner)",
        "Evening tea & fresh snacks included",
        "Weekly rotatory menu (Chicken Biryani, Karahi, Pulses, Vegetables)",
        "Filtered mineral drinking water dispenser on all floors",
        "Hygienic commercial stainless steel kitchen",
      ],
    },
    {
      id: "utilities",
      title: isUrdu ? "بجلی اور تیز ترین انٹرنیٹ" : "Uninterrupted Power & Fiber Wi-Fi",
      icon: Zap,
      color: "text-blue-500",
      description: isUrdu ? "بلا تعطل بجلی اور ریسرچ کے لیے تیز رفتار انٹرنیٹ" : "Continuous electricity supply and high-speed internet.",
      items: [
        "Heavy duty automatic diesel generator & UPS backup",
        "Dual high-speed fiber Wi-Fi routers on every floor",
        "Split Air Conditioners & Inverters in rooms",
        "Instant gas & electric water geysers for winter",
      ],
    },
    {
      id: "common",
      title: isUrdu ? "مشترکہ مطالعہ روم اور سہولیات" : "Study Lounge & Laundry Facilities",
      icon: BookOpen,
      color: "text-purple-500",
      description: isUrdu ? "پر سکون ماحول اور کپڑے دھلائی کی سہولت" : "Academic peace and convenience services.",
      items: [
        "Air-conditioned quiet study lounge with individual lamps",
        "Dedicated quiet prayer & Quran recitation room",
        "Automatic washing machines & clothes drying area",
        "Daily room housekeeping & trash clearance",
        "Spacious roof garden & recreation lounge",
      ],
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-8 py-12 space-y-12">
      {/* Title */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <Badge variant="gold">{t("amenities")}</Badge>
        <h1 className="text-4xl font-extrabold font-serif text-slate-900 dark:text-slate-100">
          {isUrdu ? "ایجوکیٹر گرلز ہاسٹل کی پریمیم سہولیات" : "Complete Hostel Amenities & Facilities"}
        </h1>
        <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
          {isUrdu
            ? "ہمارا ہاسٹل طالبات کو پڑھائی اور رہائش کے لیے تمام تر پریمیم سہولیات فراہم کرتا ہے۔"
            : "Every amenity at Educator Girls Hostel is designed to combine 5-star living comfort, academic peace, and total security."}
        </p>
      </div>

      {/* Categories Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {categories.map((cat) => (
          <Card key={cat.id} className="border-slate-200 dark:border-slate-800 shadow-md hover:shadow-xl transition-all">
            <CardHeader className="flex flex-row items-center gap-4 space-y-0 pb-4 border-b border-slate-100 dark:border-slate-800">
              <div className="p-3 rounded-2xl bg-slate-100 dark:bg-slate-800">
                <cat.icon className={`w-7 h-7 ${cat.color}`} />
              </div>
              <div>
                <CardTitle className="text-xl font-serif">{cat.title}</CardTitle>
                <CardDescription className="text-xs">{cat.description}</CardDescription>
              </div>
            </CardHeader>
            <CardContent className="pt-6 space-y-3">
              {cat.items.map((item, idx) => (
                <div key={idx} className="flex items-start gap-2.5 text-xs text-slate-700 dark:text-slate-300">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>{item}</span>
                </div>
              ))}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
