"use client";

import React, { useState } from "react";
import { useSearchParams } from "next/navigation";
import { ROOMS_DATA, RoomItem } from "@/data/roomsData";
import { formatPKR } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, Calendar, CreditCard, ShieldCheck, User, Phone, FileText, Download, Printer, Crown, Sparkles } from "lucide-react";
import { toast } from "sonner";
import { useLanguage } from "@/context/LanguageContext";
import { Logo } from "@/components/common/Logo";

export function BookingWizard() {
  const searchParams = useSearchParams();
  const initialRoomId = searchParams.get("roomId") || "single-exec";

  const { language, t } = useLanguage();
  const isUrdu = language === "ur";

  // Step 1: Selected Room & Dates
  const [selectedRoomId, setSelectedRoomId] = useState(initialRoomId);
  const [checkInDate, setCheckInDate] = useState("2026-09-01");
  const [durationMonths, setDurationMonths] = useState(6);

  // Step 2: Resident & Guardian Info
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    cnicNumber: "",
    institution: "",
    guardianName: "",
    guardianPhone: "",
  });

  // Step 3: Payment Method
  const [paymentMethod, setPaymentMethod] = useState<"STRIPE" | "JAZZCASH" | "BANK_TRANSFER">("STRIPE");
  const [cardNumber, setCardNumber] = useState("");
  const [cardExpiry, setCardExpiry] = useState("");
  const [cardCvc, setCardCvc] = useState("");

  // Wizard state
  const [currentStep, setCurrentStep] = useState(1);
  const [bookingRef, setBookingRef] = useState("");

  const currentRoom = ROOMS_DATA.find((r) => r.id === selectedRoomId) || ROOMS_DATA[0];

  // Financial Calculations
  const rentTotal = currentRoom.monthlyRentPKR * durationMonths;
  const securityDeposit = currentRoom.securityDepositPKR;
  const grandTotalPKR = rentTotal + securityDeposit;

  const handleNextStep = (e: React.FormEvent) => {
    e.preventDefault();
    if (currentStep === 1) {
      setCurrentStep(2);
    } else if (currentStep === 2) {
      if (!formData.fullName || !formData.cnicNumber || !formData.phone || !formData.guardianPhone) {
        toast.error("Please fill in all mandatory resident and guardian information.");
        return;
      }
      setCurrentStep(3);
    } else if (currentStep === 3) {
      const ref = `EGH-${Math.floor(100000 + Math.random() * 900000)}`;
      setBookingRef(ref);
      setCurrentStep(4);
      toast.success("Booking confirmed! Your reservation reference is " + ref);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Wizard Progress Stepper */}
      <div className="grid grid-cols-4 gap-2 sm:gap-4 text-center">
        {[
          { step: 1, label: isUrdu ? "کمرہ اور تاریخ" : "Room & Dates" },
          { step: 2, label: isUrdu ? "طالبہ کی معلومات" : "Personal Details" },
          { step: 3, label: isUrdu ? "ادائیگی" : "Payment" },
          { step: 4, label: isUrdu ? "تصدیق" : "Confirmation" },
        ].map((s) => (
          <div
            key={s.step}
            className={`p-3 rounded-2xl border transition-all ${
              currentStep === s.step
                ? "bg-gradient-to-r from-amber-500 to-yellow-500 border-amber-300 text-slate-950 font-black shadow-lg shadow-amber-500/25 scale-105"
                : currentStep > s.step
                ? "bg-amber-500/15 border-amber-500/40 text-amber-300"
                : "bg-slate-950 border-amber-500/15 text-slate-500"
            }`}
          >
            <span className="text-[10px] uppercase font-bold tracking-wider block">Step 0{s.step}</span>
            <span className="text-xs font-semibold block mt-0.5">{s.label}</span>
          </div>
        ))}
      </div>

      {/* STEP 1: Room & Duration Selection */}
      {currentStep === 1 && (
        <Card className="border-amber-500/30 shadow-2xl bg-[#0d0d12]">
          <CardHeader>
            <CardTitle className="text-xl font-serif text-white">
              {isUrdu ? "کمرے اور درکار مدت کا انتخاب:" : "Select Accommodation & Duration"}
            </CardTitle>
            <CardDescription>Choose your room category and check-in schedule</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Room Selector Cards */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-slate-300">
                {isUrdu ? "کمرے کی قسم منتخب کریں:" : "Choose Room Category:"}
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {ROOMS_DATA.map((room) => (
                  <div
                    key={room.id}
                    onClick={() => setSelectedRoomId(room.id)}
                    className={`p-4 rounded-2xl border cursor-pointer transition-all flex items-center justify-between ${
                      selectedRoomId === room.id
                        ? "border-amber-400 bg-amber-500/15 shadow-lg shadow-amber-500/10 text-white"
                        : "border-amber-500/20 bg-slate-950 hover:border-amber-400/50"
                    }`}
                  >
                    <div>
                      <h4 className="font-bold text-sm text-white">{room.title}</h4>
                      <p className="text-xs font-bold text-amber-400 mt-1 font-mono">
                        {formatPKR(room.monthlyRentPKR)} / month
                      </p>
                    </div>
                    <Badge variant={selectedRoomId === room.id ? "gold" : "outline"}>
                      {room.capacity} Bed
                    </Badge>
                  </div>
                ))}
              </div>
            </div>

            {/* Date & Duration */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-amber-500/20">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-300">Expected Check-in Date</label>
                <Input
                  type="date"
                  value={checkInDate}
                  onChange={(e) => setCheckInDate(e.target.value)}
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-300">Stay Duration (Months)</label>
                <select
                  value={durationMonths}
                  onChange={(e) => setDurationMonths(Number(e.target.value))}
                  className="w-full h-11 rounded-xl border border-amber-500/30 bg-slate-950 px-3 text-sm text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500"
                >
                  <option value={3}>3 Months (Short Term)</option>
                  <option value={6}>6 Months (Semester Package)</option>
                  <option value={12}>12 Months (Annual Academic Year)</option>
                </select>
              </div>
            </div>

            {/* Summary Box */}
            <div className="p-4 rounded-2xl bg-slate-950 border border-amber-500/25 space-y-2 text-xs">
              <div className="flex justify-between text-slate-300">
                <span>Monthly Rent x {durationMonths} Months:</span>
                <span className="font-bold text-white font-mono">{formatPKR(rentTotal)}</span>
              </div>
              <div className="flex justify-between text-slate-300">
                <span>Security Deposit (Refundable):</span>
                <span className="font-bold text-white font-mono">{formatPKR(securityDeposit)}</span>
              </div>
              <div className="flex justify-between pt-2 border-t border-amber-500/20 text-sm font-black text-amber-400 font-mono">
                <span>Grand Total:</span>
                <span>{formatPKR(grandTotalPKR)}</span>
              </div>
            </div>

            <Button onClick={() => setCurrentStep(2)} className="w-full font-black h-11 bg-gradient-to-r from-amber-500 via-amber-400 to-amber-600 text-slate-950 hover:from-amber-400 hover:to-amber-300 shadow-lg shadow-amber-500/25">
              Continue to Personal Details →
            </Button>
          </CardContent>
        </Card>
      )}

      {/* STEP 2: Personal Details Form */}
      {currentStep === 2 && (
        <Card className="border-amber-500/30 shadow-2xl bg-[#0d0d12]">
          <CardHeader>
            <CardTitle className="text-xl font-serif text-white">
              {isUrdu ? "طالبہ اور سرپرست کی معلومات:" : "Resident & Guardian Information"}
            </CardTitle>
            <CardDescription>CNIC details are required for female hostel gate security</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <form onSubmit={handleNextStep} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-300">Resident Full Name *</label>
                  <Input
                    required
                    placeholder="e.g. Fatima Khan"
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-300">CNIC / B-Form Number *</label>
                  <Input
                    required
                    placeholder="17301-XXXXXXX-X"
                    value={formData.cnicNumber}
                    onChange={(e) => setFormData({ ...formData, cnicNumber: e.target.value })}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-300">Email Address *</label>
                  <Input
                    type="email"
                    required
                    placeholder="fatima@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-300">Resident Phone *</label>
                  <Input
                    required
                    placeholder="+92 300 0000000"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-300">University / Institution / Organization Name</label>
                <Input
                  placeholder="e.g., University of Peshawar / KMU / KTH"
                  value={formData.institution}
                  onChange={(e) => setFormData({ ...formData, institution: e.target.value })}
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-amber-500/20">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-300">Father / Guardian Full Name *</label>
                  <Input
                    required
                    placeholder="Guardian Name"
                    value={formData.guardianName}
                    onChange={(e) => setFormData({ ...formData, guardianName: e.target.value })}
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-300">Guardian Emergency Phone *</label>
                  <Input
                    required
                    placeholder="+92 300 0000000"
                    value={formData.guardianPhone}
                    onChange={(e) => setFormData({ ...formData, guardianPhone: e.target.value })}
                  />
                </div>
              </div>

              <div className="flex gap-3 pt-4">
                <Button type="button" variant="outline" onClick={() => setCurrentStep(1)} className="w-1/3 border-amber-500/30 text-amber-300">
                  Back
                </Button>
                <Button type="submit" className="w-2/3 font-black h-11 bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 hover:from-amber-400 hover:to-amber-500 shadow-lg shadow-amber-500/25">
                  Proceed to Payment →
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      {/* STEP 3: Payment Selection */}
      {currentStep === 3 && (
        <Card className="border-amber-500/30 shadow-2xl bg-[#0d0d12]">
          <CardHeader>
            <CardTitle className="text-xl font-serif text-white">
              {isUrdu ? "ادائیگی کا طریقہ منتخب کریں:" : "Payment Gateway & Deposit"}
            </CardTitle>
            <CardDescription>Secure payment integration for Educator Girls Hostel</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Options Tabs */}
            <div className="grid grid-cols-3 gap-3">
              {[
                { id: "STRIPE", label: "Credit/Debit Card (Stripe)", icon: CreditCard },
                { id: "JAZZCASH", label: "JazzCash / EasyPaisa", icon: Phone },
                { id: "BANK_TRANSFER", label: "Direct Bank Transfer", icon: FileText },
              ].map((opt) => (
                <button
                  key={opt.id}
                  onClick={() => setPaymentMethod(opt.id as any)}
                  className={`p-4 rounded-2xl border text-xs font-bold flex flex-col items-center gap-2 transition-all ${
                    paymentMethod === opt.id
                      ? "border-amber-400 bg-amber-500/20 text-amber-300 shadow-lg shadow-amber-500/15"
                      : "border-amber-500/20 bg-slate-950 text-slate-400 hover:border-amber-400/50"
                  }`}
                >
                  <opt.icon className="w-5 h-5 text-amber-400" />
                  <span className="text-center">{opt.label}</span>
                </button>
              ))}
            </div>

            {/* Payment Details Form */}
            {paymentMethod === "STRIPE" && (
              <div className="space-y-3 p-4 rounded-2xl border border-amber-500/25 bg-slate-950">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-300">Card Number</label>
                  <Input
                    placeholder="4242 •••• •••• 4242"
                    value={cardNumber}
                    onChange={(e) => setCardNumber(e.target.value)}
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-300">Expiry Date</label>
                    <Input
                      placeholder="MM/YY"
                      value={cardExpiry}
                      onChange={(e) => setCardExpiry(e.target.value)}
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-300">CVC / CVV</label>
                    <Input
                      placeholder="123"
                      value={cardCvc}
                      onChange={(e) => setCardCvc(e.target.value)}
                    />
                  </div>
                </div>
              </div>
            )}

            {paymentMethod === "JAZZCASH" && (
              <div className="p-4 rounded-2xl border border-amber-500/30 bg-amber-500/10 text-xs text-amber-200 space-y-2">
                <h4 className="font-bold text-sm text-amber-400">JazzCash Till ID: 03001234567</h4>
                <p>Transfer the security deposit of {formatPKR(securityDeposit)} to the till ID above and bring the SMS transaction ID to the hostel desk.</p>
              </div>
            )}

            {paymentMethod === "BANK_TRANSFER" && (
              <div className="p-4 rounded-2xl border border-amber-500/30 bg-amber-500/10 text-xs text-amber-200 space-y-2">
                <h4 className="font-bold text-sm text-amber-400">Bank Al Habib - University Road Branch</h4>
                <p>Account Title: Educator Girls Hostel Peshawar</p>
                <p>IBAN: PK36BAHL0001009988776655</p>
              </div>
            )}

            <div className="flex gap-3 pt-4">
              <Button type="button" variant="outline" onClick={() => setCurrentStep(2)} className="w-1/3 border-amber-500/30 text-amber-300">
                Back
              </Button>
              <Button onClick={handleNextStep} className="w-2/3 font-black h-11 bg-gradient-to-r from-amber-500 via-amber-400 to-amber-600 text-slate-950 shadow-lg shadow-amber-500/25">
                Confirm & Pay {formatPKR(grandTotalPKR)}
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* STEP 4: Booking Confirmation Receipt */}
      {currentStep === 4 && (
        <Card className="border-amber-500/40 shadow-2xl overflow-hidden bg-[#0d0d12] text-center">
          <div className="bg-gradient-to-r from-[#14141a] via-[#201a10] to-[#0c0c10] text-white p-8 space-y-4 border-b border-amber-500/30">
            <div className="flex justify-center">
              <Logo variant="dark" size="lg" showBadge={false} subtext="" />
            </div>
            <h2 className="text-2xl font-bold font-serif text-white">Booking Confirmed!</h2>
            <p className="text-xs text-slate-300">
              Reference #: <span className="font-mono font-bold text-amber-400">{bookingRef}</span>
            </p>
          </div>

          <CardContent className="p-8 space-y-6 max-w-lg mx-auto text-xs text-slate-300">
            <div className="space-y-3 text-left border border-amber-500/20 p-5 rounded-2xl bg-slate-950">
              <div className="flex justify-between border-b border-amber-500/15 py-1.5">
                <span className="font-semibold text-white">Resident Name:</span>
                <span>{formData.fullName}</span>
              </div>
              <div className="flex justify-between border-b border-amber-500/15 py-1.5">
                <span className="font-semibold text-white">CNIC Number:</span>
                <span>{formData.cnicNumber}</span>
              </div>
              <div className="flex justify-between border-b border-amber-500/15 py-1.5">
                <span className="font-semibold text-white">Room Reserved:</span>
                <span className="text-amber-300 font-bold">{currentRoom.title}</span>
              </div>
              <div className="flex justify-between border-b border-amber-500/15 py-1.5">
                <span className="font-semibold text-white">Check-in Schedule:</span>
                <span>{checkInDate} ({durationMonths} Months)</span>
              </div>
              <div className="flex justify-between py-1.5 font-bold text-amber-400 text-sm font-mono">
                <span>Total Amount Paid:</span>
                <span>{formatPKR(grandTotalPKR)}</span>
              </div>
            </div>

            <div className="flex gap-4">
              <Button variant="outline" onClick={() => window.print()} className="w-1/2 text-xs border-amber-500/30 text-amber-300">
                <Printer className="w-4 h-4 mr-2 text-amber-400" />
                Print Receipt
              </Button>
              <Button onClick={() => (window.location.href = "/dashboard/resident")} className="w-1/2 text-xs font-black bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 hover:from-amber-400 hover:to-amber-500 shadow-md">
                Go to Resident Portal
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
