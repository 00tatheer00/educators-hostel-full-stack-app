import { NextRequest } from "next/server";
import prisma from "@/lib/prisma";
import { gatePassStatusSchema } from "@/lib/validations";
import { apiSuccess, apiError, requireAdmin } from "@/lib/api-auth";

// PUT /api/gate-passes/[id]/status - Approve/Reject Gate Pass (Admin only)
export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { error, user } = await requireAdmin();
    if (error) return error;

    const { id } = await params;
    const body = await req.json();
    const validatedData = gatePassStatusSchema.safeParse(body);

    if (!validatedData.success) {
      return apiError("Validation failed", 422, validatedData.error.flatten().fieldErrors);
    }

    const { status } = validatedData.data;

    const updatedPass = await prisma.gatePass.update({
      where: { id },
      data: {
        status,
        approvedBy: user!.id,
      },
      include: {
        user: { select: { id: true, name: true, phone: true } },
      },
    });

    return apiSuccess(updatedPass);
  } catch (error: any) {
    console.error("PUT /api/gate-passes/[id]/status error:", error);
    return apiError(error.message || "Failed to update gate pass status", 500);
  }
}
