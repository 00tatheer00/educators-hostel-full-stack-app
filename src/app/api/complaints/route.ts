import { NextRequest } from "next/server";
import prisma from "@/lib/prisma";
import { complaintCreateSchema } from "@/lib/validations";
import { apiSuccess, apiError, requireAuth } from "@/lib/api-auth";
import { MaintenanceStatus } from "@prisma/client";

export const dynamic = "force-dynamic";

// GET /api/complaints - Get Personal Complaints
export async function GET(req: NextRequest) {
  try {
    const { error, user } = await requireAuth();
    if (error) return error;

    const complaints = await prisma.maintenanceRequest.findMany({
      where: { userId: user!.id },
      include: {
        room: { select: { roomNumber: true, roomType: true } },
      },
      orderBy: { createdAt: "desc" },
    });

    return apiSuccess(complaints);
  } catch (error: any) {
    console.error("GET /api/complaints error:", error);
    return apiError(error.message || "Failed to fetch complaints", 500);
  }
}

// POST /api/complaints - Submit New Complaint
export async function POST(req: NextRequest) {
  try {
    const { error, user } = await requireAuth();
    if (error) return error;

    const body = await req.json();
    const validatedData = complaintCreateSchema.safeParse(body);

    if (!validatedData.success) {
      return apiError("Validation failed", 422, validatedData.error.flatten().fieldErrors);
    }

    const complaint = await prisma.maintenanceRequest.create({
      data: {
        ...validatedData.data,
        userId: user!.id,
        status: MaintenanceStatus.OPEN,
      },
      include: {
        room: true,
      },
    });

    return apiSuccess(complaint, 201);
  } catch (error: any) {
    console.error("POST /api/complaints error:", error);
    return apiError(error.message || "Failed to create complaint", 500);
  }
}
