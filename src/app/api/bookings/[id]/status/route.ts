import { NextRequest } from "next/server";
import prisma from "@/lib/prisma";
import { bookingStatusUpdateSchema } from "@/lib/validations";
import { apiSuccess, apiError, requireAdmin } from "@/lib/api-auth";
import { BookingStatus, UserRole } from "@prisma/client";

// PUT /api/bookings/[id]/status - Update Status (Admin only)
export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { error } = await requireAdmin();
    if (error) return error;

    const { id } = await params;
    const body = await req.json();
    const validatedData = bookingStatusUpdateSchema.safeParse(body);

    if (!validatedData.success) {
      return apiError("Validation failed", 422, validatedData.error.flatten().fieldErrors);
    }

    const { status } = validatedData.data;

    const booking = await prisma.booking.findUnique({
      where: { id },
      include: { user: true },
    });

    if (!booking) {
      return apiError("Booking not found", 404);
    }

    const updatedBooking = await prisma.booking.update({
      where: { id },
      data: { status },
      include: {
        user: { select: { id: true, name: true, email: true } },
        room: true,
      },
    });

    // If confirmed/active, upgrade user role to RESIDENT
    if ((status === BookingStatus.CONFIRMED || status === BookingStatus.ACTIVE) && booking.user.role === UserRole.APPLICANT) {
      await prisma.user.update({
        where: { id: booking.userId },
        data: { role: UserRole.RESIDENT },
      });
    }

    return apiSuccess(updatedBooking);
  } catch (error: any) {
    console.error("PUT /api/bookings/[id]/status error:", error);
    return apiError(error.message || "Failed to update booking status", 500);
  }
}
