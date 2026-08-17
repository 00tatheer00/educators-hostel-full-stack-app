import { NextRequest } from "next/server";
import prisma from "@/lib/prisma";
import { apiSuccess, apiError, requireAdmin } from "@/lib/api-auth";
import { MaintenanceStatus } from "@prisma/client";

// GET /api/admin/complaints - Get All Complaints (Admin only)
export async function GET(req: NextRequest) {
  try {
    const { error } = await requireAdmin();
    if (error) return error;

    const { searchParams } = new URL(req.url);
    const status = searchParams.get("status") as MaintenanceStatus | null;
    const page = Math.max(1, Number(searchParams.get("page") || "1"));
    const limit = Math.min(50, Math.max(1, Number(searchParams.get("limit") || "20")));
    const skip = (page - 1) * limit;

    const where: any = {};
    if (status && Object.values(MaintenanceStatus).includes(status)) {
      where.status = status;
    }

    const [complaints, totalCount] = await Promise.all([
      prisma.maintenanceRequest.findMany({
        where,
        include: {
          user: {
            select: { id: true, name: true, phone: true, cnicNumber: true },
          },
          room: {
            select: { id: true, roomNumber: true, roomType: true },
          },
        },
        skip,
        take: limit,
        orderBy: { createdAt: "desc" },
      }),
      prisma.maintenanceRequest.count({ where }),
    ]);

    return apiSuccess({
      complaints,
      pagination: {
        total: totalCount,
        page,
        limit,
        totalPages: Math.ceil(totalCount / limit),
      },
    });
  } catch (error: any) {
    console.error("GET /api/admin/complaints error:", error);
    return apiError(error.message || "Failed to fetch complaints", 500);
  }
}
