import React, { Suspense } from "react";
import { BookingWizard } from "@/components/booking/BookingWizard";
import { Badge } from "@/components/ui/badge";

export default function BookingPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-8 py-12 space-y-8">
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <Badge variant="emerald">Online Room Reservation</Badge>
        <h1 className="text-3xl font-extrabold font-serif text-slate-900 dark:text-slate-100">
          Book Your Room at Educator Girls Hostel
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
          Instant reservation for female students and working professionals. University Road, Peshawar.
        </p>
      </div>

      <Suspense fallback={<div className="text-center py-10">Loading Booking Checkout...</div>}>
        <BookingWizard />
      </Suspense>
    </div>
  );
}
