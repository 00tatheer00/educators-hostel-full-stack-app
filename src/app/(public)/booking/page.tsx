import React, { Suspense } from "react";
import { BookingWizard } from "@/components/booking/BookingWizard";
import { Crown } from "lucide-react";

export default function BookingPage() {
  return (
    <div className="min-h-screen bg-[#070709] text-slate-100 py-12 px-4 sm:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-amber-500/15 text-amber-300 font-extrabold text-xs uppercase tracking-wider border border-amber-500/30">
            <Crown className="w-3.5 h-3.5 text-amber-400" />
            Online Room Reservation
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold font-serif text-white">
            Book Your Room at <span className="text-gradient-gold-pure">Educator Girls Hostel</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-400">
            Instant reservation for female students and working professionals. University Road, Peshawar.
          </p>
        </div>

        <Suspense fallback={<div className="text-center py-10 text-amber-400 font-bold">Loading Booking Checkout...</div>}>
          <BookingWizard />
        </Suspense>
      </div>
    </div>
  );
}
