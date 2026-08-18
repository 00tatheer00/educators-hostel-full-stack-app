"use client";

import React, { useState } from "react";
import { Phone, Mail, MapPin, Clock, MessageSquare, Send, CheckCircle2, Sparkles, MessageCircle, Crown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { useLanguage } from "@/context/LanguageContext";
import { SquiggleWave, CapsulePillBar, PolkaDotGrid } from "@/components/decorative/DoodleVectors";

export default function ContactPage() {
  const { language, t } = useLanguage();
  const isUrdu = language === "ur";

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    roomType: "Double Sharing",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Thank you! Your inquiry has been sent to the Chief Warden desk at Educator Girls Hostel.");
    setFormData({ name: "", phone: "", email: "", roomType: "Double Sharing", message: "" });
  };

  return (
    <div className="min-h-screen bg-[#070709] text-slate-100">
      {/* Luxury Black & Gold Header */}
      <section className="relative bg-gradient-to-r from-[#0d0d12] via-[#171410] to-[#0a0a0e] text-white py-20 px-4 sm:px-8 overflow-hidden border-b border-amber-500/20">
        <div className="absolute top-6 right-8 opacity-60 hidden md:block">
          <SquiggleWave color="#d4af37" width={140} height={28} />
        </div>
        <div className="absolute bottom-6 left-8 opacity-40 hidden md:block">
          <PolkaDotGrid rows={3} cols={6} dotColor="bg-amber-400/40" />
        </div>

        <div className="max-w-4xl mx-auto text-center space-y-4 relative z-10">
          <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-amber-500/15 text-amber-300 font-extrabold text-xs uppercase tracking-wider border border-amber-400/40">
            <Crown className="w-3.5 h-3.5 text-amber-400" />
            24/7 VIP Warden Assistance
          </span>
          <h1 className="text-4xl sm:text-6xl font-black font-serif tracking-tight leading-tight text-white">
            Get In Touch With <span className="text-gradient-gold-pure">Administration</span>
          </h1>
          <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Have questions regarding room availability, mess menus, or parent visit guidelines? Contact us or visit our premises on Main University Road, Peshawar.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-16 space-y-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Left Info Column */}
          <div className="lg:col-span-5 space-y-6">
            <Card className="rounded-3xl border border-amber-500/25 shadow-2xl bg-[#0c0c10]">
              <CardHeader className="p-6 pb-4 border-b border-amber-500/15">
                <CardTitle className="text-xl font-bold font-serif text-white">
                  Hostel Contact Information
                </CardTitle>
                <CardDescription className="text-xs text-slate-400">Main University Road, Peshawar, KPK</CardDescription>
              </CardHeader>
              <CardContent className="p-6 space-y-5 text-xs text-slate-300">
                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-amber-500/15 border border-amber-500/30 text-amber-300 flex items-center justify-center shrink-0 mt-0.5">
                    <MapPin className="w-5 h-5 text-amber-400" />
                  </div>
                  <div>
                    <strong className="block text-white text-sm">Hostel Address:</strong>
                    <span>Main University Road, near University of Peshawar & KMU Campus, Peshawar, KPK, Pakistan</span>
                  </div>
                </div>

                <div className="flex items-center gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-amber-500/15 border border-amber-500/30 text-amber-300 flex items-center justify-center shrink-0">
                    <Phone className="w-5 h-5 text-amber-400" />
                  </div>
                  <div>
                    <strong className="block text-white text-sm">Phone & 24/7 Hotline:</strong>
                    <span className="font-mono text-xs text-amber-300">+92 300 1234567 / +92 91 5840000</span>
                  </div>
                </div>

                <div className="flex items-center gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-amber-500/15 border border-amber-500/30 text-amber-300 flex items-center justify-center shrink-0">
                    <Mail className="w-5 h-5 text-amber-400" />
                  </div>
                  <div>
                    <strong className="block text-white text-sm">Email Address:</strong>
                    <span className="text-amber-200">info@educatorhostel.pk</span>
                  </div>
                </div>

                <div className="flex items-center gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-amber-500/15 border border-amber-500/30 text-amber-300 flex items-center justify-center shrink-0">
                    <Clock className="w-5 h-5 text-amber-400" />
                  </div>
                  <div>
                    <strong className="block text-white text-sm">Parent Visiting Hours:</strong>
                    <span>10:00 AM - 06:00 PM (Daily)</span>
                  </div>
                </div>

                {/* WhatsApp Action */}
                <div className="pt-3 border-t border-amber-500/15">
                  <a
                    href="https://wa.me/923001234567?text=Hello%20Educator%20Girls%20Hostel,%20I%20want%20to%20inquire%20about%20room%20availability."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full inline-flex items-center justify-center gap-2 bg-gradient-to-r from-amber-500 via-amber-400 to-amber-600 hover:from-amber-400 hover:to-amber-300 text-slate-950 font-black py-3.5 px-4 rounded-2xl text-xs shadow-lg shadow-amber-500/25 transition-all hover:scale-102"
                  >
                    <MessageCircle className="w-4 h-4 fill-slate-950" />
                    Chat Directly with Chief Warden on WhatsApp
                  </a>
                </div>
              </CardContent>
            </Card>

            {/* Google Map Box */}
            <Card className="rounded-3xl border border-amber-500/30 overflow-hidden shadow-xl bg-slate-950">
              <div className="h-64 bg-slate-950 relative">
                <iframe
                  title="Educator Girls Hostel Peshawar Location Map"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d13231.7876123456!2d71.485123!3d34.004567!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38d91723456789%3A0x123456789abcdef!2sUniversity%20Road%2C%20Peshawar!5e0!3m2!1sen!2spk!4v1700000000000"
                  className="w-full h-full border-0 grayscale invert opacity-80 contrast-125"
                  loading="lazy"
                  allowFullScreen
                ></iframe>
              </div>
            </Card>
          </div>

          {/* Right Form Column */}
          <div className="lg:col-span-7">
            <Card className="rounded-3xl border border-amber-500/25 shadow-2xl bg-[#0c0c10]">
              <CardHeader className="p-6 sm:p-8 pb-4 border-b border-amber-500/15">
                <span className="px-3 py-1 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-300 text-[11px] font-extrabold uppercase tracking-wider w-fit">
                  Online Inquiry Desk
                </span>
                <CardTitle className="text-2xl font-black font-serif text-white mt-1">
                  Send Us A Direct Message
                </CardTitle>
                <CardDescription className="text-xs text-slate-400">Our warden administration will respond within 2 hours</CardDescription>
              </CardHeader>
              <CardContent className="p-6 sm:p-8">
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-300">Your Full Name *</label>
                      <Input
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="e.g. Fatima Khan"
                        className="rounded-2xl h-11 border-amber-500/30 bg-slate-950 text-white"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-300">Phone Number *</label>
                      <Input
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="+92 300 1234567"
                        className="rounded-2xl h-11 border-amber-500/30 bg-slate-950 text-white"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-300">Email Address</label>
                      <Input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="fatima@example.com"
                        className="rounded-2xl h-11 border-amber-500/30 bg-slate-950 text-white"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-300">Interested Room Type</label>
                      <select
                        value={formData.roomType}
                        onChange={(e) => setFormData({ ...formData, roomType: e.target.value })}
                        className="w-full h-11 rounded-2xl border border-amber-500/30 bg-slate-950 text-white px-3 text-xs focus:outline-none focus:ring-2 focus:ring-amber-500"
                      >
                        <option value="Single Executive">Single Executive Master Suite</option>
                        <option value="Double Sharing">Deluxe Double Sharing</option>
                        <option value="Triple Economy">Triple Economy Room</option>
                        <option value="Quad Student">Quad Student Sharing</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-300">Message / Inquiry Details *</label>
                    <textarea
                      rows={5}
                      required
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full rounded-2xl border border-amber-500/30 bg-slate-950 p-3.5 text-xs text-white focus:outline-none focus:ring-2 focus:ring-amber-500 placeholder:text-slate-500"
                      placeholder="Tell us about your university/institution, intended move-in date, or any questions..."
                    />
                  </div>

                  <Button
                    type="submit"
                    className="w-full font-black text-xs h-12 rounded-2xl bg-gradient-to-r from-amber-500 via-amber-400 to-amber-600 text-slate-950 hover:from-amber-400 hover:to-amber-300 shadow-xl shadow-amber-500/25"
                  >
                    <Send className="w-4 h-4 mr-2" />
                    Submit Inquiry to Warden Desk
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
