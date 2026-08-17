import { NextRequest } from "next/server";
import prisma from "@/lib/prisma";
import { apiSuccess, apiError, requireAuth } from "@/lib/api-auth";
import { UserRole } from "@prisma/client";

export const dynamic = "force-dynamic";

// GET /api/payments/history - Get Payment Records
export async function GET(req: NextRequest) {
  try {
    const { error, user } = await requireAuth();
    if (error) return error;

    const isAdmin = user!.role === "ADMIN" || (user!.role as any) === UserRole.ADMIN;

    // If admin, return all payments; if resident, return personal payments
    const where = isAdmin ? {} : { userId: user!.id };

    const payments = await prisma.payment.findMany({
      where,
      include: {
        user: {
          select: { id: true, name: true, email: true, phone: true },
        },
        booking: {
          select: { id: true, room: { select: { roomNumber: true, roomType: true } } },
        },
      },
      orderBy: { createdAt: "desc" },
    });

    return apiSuccess(payments);
  } catch (error: any) {
    console.error("GET /api/payments/history error:", error);
    return apiError(error.message || "Failed to fetch payment history", 500);
  }
}
