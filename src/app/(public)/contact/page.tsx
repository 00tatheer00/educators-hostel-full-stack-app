"use client";

import { Phone, Mail, MapPin, Clock, MessageSquare, Send, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { useLanguage } from "@/context/LanguageContext";

export default function ContactPage() {
  const { language, t } = useLanguage();
  const isUrdu = language === "ur";

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Thank you! Your inquiry has been sent to Educator Girls Hostel Warden.");
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-8 py-12 space-y-12">
      {/* Title */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <Badge variant="emerald">{t("contact")}</Badge>
        <h1 className="text-4xl font-extrabold font-serif text-slate-900 dark:text-slate-100">
          {isUrdu ? "ہاسٹل انتظامیہ سے رابطہ کریں" : "Get In Touch With Administration"}
        </h1>
        <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
          {isUrdu
            ? "کمروں کی دستیابی، فیس اور والدین کے وزٹ کے لیے معلومات حاصل کریں۔"
            : "Have questions regarding room availability, mess menus, or parent visit guidelines? Contact us or visit our premises on University Road, Peshawar."}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Left Info Column */}
        <div className="lg:col-span-5 space-y-6">
          <Card className="border-slate-200 dark:border-slate-800">
            <CardHeader>
              <CardTitle className="text-lg font-serif">Hostel Contact Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-xs text-slate-600 dark:text-slate-300">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <strong className="block text-slate-900 dark:text-white">Main Address:</strong>
                  University Road, near University of Peshawar & KMU Campus, Peshawar, KPK, Pakistan
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-amber-500 shrink-0" />
                <div>
                  <strong className="block text-slate-900 dark:text-white">Phone & WhatsApp:</strong>
                  +92 300 1234567 / +92 91 5840000
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-emerald-600 shrink-0" />
                <div>
                  <strong className="block text-slate-900 dark:text-white">Email Address:</strong>
                  info@educatorgirlshostel.pk
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Clock className="w-5 h-5 text-amber-500 shrink-0" />
                <div>
                  <strong className="block text-slate-900 dark:text-white">Parent Visiting Hours:</strong>
                  10:00 AM - 06:00 PM (Daily)
                </div>
              </div>

              {/* WhatsApp Quick Action Button */}
              <div className="pt-4 border-t border-slate-100 dark:border-slate-800">
                <a
                  href="https://wa.me/923001234567?text=Hello%20Educator%20Girls%20Hostel%20Peshawar,%20I%20want%20to%20inquire%20about%20room%20availability."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 bg-emerald-800 hover:bg-emerald-900 text-white font-semibold py-3 px-4 rounded-xl text-xs shadow-md transition"
                >
                  <MessageSquare className="w-4 h-4 text-emerald-300" />
                  Chat Directly on WhatsApp
                </a>
              </div>
            </CardContent>
          </Card>

          {/* Map Location Embed Box */}
          <Card className="border-slate-200 dark:border-slate-800 overflow-hidden">
            <CardHeader className="py-3 px-4 bg-slate-50 dark:bg-slate-800/50 border-b border-slate-100 dark:border-slate-800">
              <CardTitle className="text-xs font-semibold flex items-center gap-2">
                <MapPin className="w-4 h-4 text-emerald-600" />
                <span>Peshawar Location Map</span>
              </CardTitle>
            </CardHeader>
            <div className="h-56 bg-slate-200 relative">
              <iframe
                title="Educator Girls Hostel Peshawar Location Map"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d13231.7876123456!2d71.485123!3d34.004567!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38d91723456789%3A0x123456789abcdef!2sUniversity%20Road%2C%20Peshawar!5e0!3m2!1sen!2spk!4v1700000000000"
                className="w-full h-full border-0"
                loading="lazy"
                allowFullScreen
              ></iframe>
            </div>
          </Card>
        </div>

        {/* Right Form Column */}
        <div className="lg:col-span-7">
          <Card className="border-slate-200 dark:border-slate-800 shadow-xl">
            <CardHeader>
              <CardTitle className="text-xl font-serif">Send Us An Inquiry</CardTitle>
              <CardDescription>Our warden administration will respond within 2 hours</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold">Your Full Name *</label>
                    <Input required placeholder="Fatima Khan" />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold">Phone Number *</label>
                    <Input required placeholder="+92 300 0000000" />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold">Email Address *</label>
                  <Input type="email" required placeholder="fatima@example.com" />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold">Interested Room Type</label>
                  <Input placeholder="Single Executive / Double Sharing / Triple" />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold">Message / Inquiry Details *</label>
                  <textarea
                    rows={4}
                    required
                    className="w-full rounded-xl border border-input bg-background p-3 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-700"
                    placeholder="Tell us about your university/institution, target check-in date, or questions..."
                  />
                </div>

                <Button type="submit" variant="emerald" className="w-full font-semibold h-11">
                  <Send className="w-4 h-4 mr-2" />
                  Submit Inquiry
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
