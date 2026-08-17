import { NextRequest } from "next/server";
import prisma from "@/lib/prisma";
import { bookingCreateSchema } from "@/lib/validations";
import { apiSuccess, apiError, requireAuth } from "@/lib/api-auth";
import { BookingStatus, PaymentStatus } from "@prisma/client";

export const dynamic = "force-dynamic";

// GET /api/bookings - Get Personal Bookings
export async function GET(req: NextRequest) {
  try {
    const { error, user } = await requireAuth();
    if (error) return error;

    const bookings = await prisma.booking.findMany({
      where: { userId: user!.id },
      include: {
        room: {
          select: { id: true, roomNumber: true, roomType: true, floor: true },
        },
        bed: true,
        payments: true,
      },
      orderBy: { createdAt: "desc" },
    });

    return apiSuccess(bookings);
  } catch (error: any) {
    console.error("GET /api/bookings error:", error);
    return apiError(error.message || "Failed to fetch bookings", 500);
  }
}

// POST /api/bookings - Create New Reservation
export async function POST(req: NextRequest) {
  try {
    const { error, user } = await requireAuth();
    if (error) return error;

    const body = await req.json();
    const validatedData = bookingCreateSchema.safeParse(body);

    if (!validatedData.success) {
      return apiError("Validation failed", 422, validatedData.error.flatten().fieldErrors);
    }

    const { roomId, bedId, checkInDate, durationMonths, notes } = validatedData.data;

    // Check room existence
    const room = await prisma.room.findUnique({
      where: { id: roomId },
    });

    if (!room) {
      return apiError("Room not found", 404);
    }

    const checkIn = new Date(checkInDate);
    const checkOut = new Date(checkIn);
    checkOut.setMonth(checkOut.getMonth() + durationMonths);

    const monthlyRent = room.monthlyRentPKR;
    const securityDeposit = room.securityDepositPKR;
    const totalAmount = monthlyRent * durationMonths + securityDeposit;

    const newBooking = await prisma.booking.create({
      data: {
        userId: user!.id,
        roomId,
        bedId,
        checkInDate: checkIn,
        checkOutDate: checkOut,
        monthlyRentPKR: monthlyRent,
        securityDepositPKR: securityDeposit,
        totalAmountPKR: totalAmount,
        status: BookingStatus.PENDING,
        paymentStatus: PaymentStatus.PENDING,
        notes,
      },
      include: {
        room: true,
      },
    });

    return apiSuccess(newBooking, 201);
  } catch (error: any) {
    console.error("POST /api/bookings error:", error);
    return apiError(error.message || "Failed to create booking", 500);
  }
}
