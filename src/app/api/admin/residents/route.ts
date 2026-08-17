import { NextRequest } from "next/server";
import prisma from "@/lib/prisma";
import { apiSuccess, apiError, requireAdmin } from "@/lib/api-auth";
import { UserRole } from "@prisma/client";

// GET /api/admin/residents - List All Residents (Admin only)
export async function GET(req: NextRequest) {
  try {
    const { error } = await requireAdmin();
    if (error) return error;

    const { searchParams } = new URL(req.url);
    const search = searchParams.get("search") || "";
    const page = Math.max(1, Number(searchParams.get("page") || "1"));
    const limit = Math.min(50, Math.max(1, Number(searchParams.get("limit") || "20")));
    const skip = (page - 1) * limit;

    const where: any = {
      role: { in: [UserRole.RESIDENT, UserRole.APPLICANT] },
    };

    if (search) {
      where.OR = [
        { name: { contains: search, mode: "insensitive" } },
        { email: { contains: search, mode: "insensitive" } },
        { cnicNumber: { contains: search, mode: "insensitive" } },
        { phone: { contains: search, mode: "insensitive" } },
      ];
    }

    const [residents, totalCount] = await Promise.all([
      prisma.user.findMany({
        where,
        select: {
          id: true,
          name: true,
          email: true,
          phone: true,
          cnicNumber: true,
          guardianName: true,
          guardianPhone: true,
          address: true,
          role: true,
          createdAt: true,
          beds: {
            include: {
              room: {
                select: { id: true, roomNumber: true, roomType: true },
              },
            },
          },
          bookings: {
            take: 1,
            orderBy: { createdAt: "desc" },
            select: { id: true, status: true, paymentStatus: true, monthlyRentPKR: true },
          },
        },
        skip,
        take: limit,
        orderBy: { createdAt: "desc" },
      }),
      prisma.user.count({ where }),
    ]);

    return apiSuccess({
      residents,
      pagination: {
        total: totalCount,
        page,
        limit,
        totalPages: Math.ceil(totalCount / limit),
      },
    });
  } catch (error: any) {
    console.error("GET /api/admin/residents error:", error);
    return apiError(error.message || "Failed to fetch residents", 500);
  }
}
