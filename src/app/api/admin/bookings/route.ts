import { NextRequest } from "next/server";
import prisma from "@/lib/prisma";
import { apiSuccess, apiError, requireAdmin } from "@/lib/api-auth";
import { BookingStatus } from "@prisma/client";

// GET /api/admin/bookings - List All Bookings (Admin only)
export async function GET(req: NextRequest) {
  try {
    const { error } = await requireAdmin();
    if (error) return error;

    const { searchParams } = new URL(req.url);
    const status = searchParams.get("status") as BookingStatus | null;
    const page = Math.max(1, Number(searchParams.get("page") || "1"));
    const limit = Math.min(50, Math.max(1, Number(searchParams.get("limit") || "20")));
    const skip = (page - 1) * limit;

    const where: any = {};
    if (status && Object.values(BookingStatus).includes(status)) {
      where.status = status;
    }

    const [bookings, totalCount] = await Promise.all([
      prisma.booking.findMany({
        where,
        include: {
          user: {
            select: { id: true, name: true, email: true, phone: true, cnicNumber: true, guardianPhone: true },
          },
          room: {
            select: { id: true, roomNumber: true, roomType: true, monthlyRentPKR: true },
          },
          bed: true,
          payments: true,
        },
        skip,
        take: limit,
        orderBy: { createdAt: "desc" },
      }),
      prisma.booking.count({ where }),
    ]);

    return apiSuccess({
      bookings,
      pagination: {
        total: totalCount,
        page,
        limit,
        totalPages: Math.ceil(totalCount / limit),
      },
    });
  } catch (error: any) {
    console.error("GET /api/admin/bookings error:", error);
    return apiError(error.message || "Failed to fetch bookings", 500);
  }
}
