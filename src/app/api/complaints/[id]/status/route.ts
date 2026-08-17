import { NextRequest } from "next/server";
import prisma from "@/lib/prisma";
import { complaintStatusSchema } from "@/lib/validations";
import { apiSuccess, apiError, requireAdmin } from "@/lib/api-auth";
import { MaintenanceStatus } from "@prisma/client";

// PUT /api/complaints/[id]/status - Update Ticket Status (Admin only)
export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { error } = await requireAdmin();
    if (error) return error;

    const { id } = await params;
    const body = await req.json();
    const validatedData = complaintStatusSchema.safeParse(body);

    if (!validatedData.success) {
      return apiError("Validation failed", 422, validatedData.error.flatten().fieldErrors);
    }

    const { status } = validatedData.data;

    const updatedComplaint = await prisma.maintenanceRequest.update({
      where: { id },
      data: {
        status,
        resolvedAt: status === MaintenanceStatus.RESOLVED ? new Date() : undefined,
      },
      include: {
        user: { select: { id: true, name: true, phone: true } },
        room: true,
      },
    });

    return apiSuccess(updatedComplaint);
  } catch (error: any) {
    console.error("PUT /api/complaints/[id]/status error:", error);
    return apiError(error.message || "Failed to update complaint status", 500);
  }
}
