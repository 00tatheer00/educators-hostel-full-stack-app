import { NextRequest } from "next/server";
import prisma from "@/lib/prisma";
import { apiSuccess, apiError, requireAuth } from "@/lib/api-auth";
import { BookingStatus, UserRole } from "@prisma/client";

// DELETE /api/bookings/[id] - Cancel/Delete Booking
export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { error, user } = await requireAuth();
    if (error) return error;

    const { id } = await params;

    const booking = await prisma.booking.findUnique({
      where: { id },
    });

    if (!booking) {
      return apiError("Booking not found", 404);
    }

    // Must be booking owner or admin
    if (booking.userId !== user!.id && user!.role !== "ADMIN" && (user!.role as any) !== UserRole.ADMIN) {
      return apiError("Forbidden: You do not have permission to cancel this booking", 403);
    }

    const updatedBooking = await prisma.booking.update({
      where: { id },
      data: { status: BookingStatus.CANCELLED },
    });

    return apiSuccess({ message: "Booking cancelled successfully", booking: updatedBooking });
  } catch (error: any) {
    console.error("DELETE /api/bookings/[id] error:", error);
    return apiError(error.message || "Failed to cancel booking", 500);
  }
}
