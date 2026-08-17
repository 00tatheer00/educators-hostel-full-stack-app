import { NextRequest } from "next/server";
import prisma from "@/lib/prisma";
import { residentUpdateSchema } from "@/lib/validations";
import { apiSuccess, apiError, requireAdmin } from "@/lib/api-auth";

// GET /api/admin/residents/[id] - Get Resident Details (Admin only)
export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { error } = await requireAdmin();
    if (error) return error;

    const { id } = await params;

    const resident = await prisma.user.findUnique({
      where: { id },
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
            room: true,
          },
        },
        bookings: {
          include: { room: true },
          orderBy: { createdAt: "desc" },
        },
        payments: {
          orderBy: { createdAt: "desc" },
        },
        gatePasses: {
          orderBy: { createdAt: "desc" },
        },
      },
    });

    if (!resident) {
      return apiError("Resident not found", 404);
    }

    return apiSuccess(resident);
  } catch (error: any) {
    console.error("GET /api/admin/residents/[id] error:", error);
    return apiError(error.message || "Failed to fetch resident", 500);
  }
}

// PUT /api/admin/residents/[id] - Update Resident Profile (Admin only)
export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { error } = await requireAdmin();
    if (error) return error;

    const { id } = await params;
    const body = await req.json();
    const validatedData = residentUpdateSchema.safeParse(body);

    if (!validatedData.success) {
      return apiError("Validation failed", 422, validatedData.error.flatten().fieldErrors);
    }

    const updatedUser = await prisma.user.update({
      where: { id },
      data: validatedData.data,
      select: {
        id: true,
        name: true,
        email: true,
        phone: true,
        cnicNumber: true,
        guardianName: true,
        guardianPhone: true,
        role: true,
      },
    });

    return apiSuccess(updatedUser);
  } catch (error: any) {
    console.error("PUT /api/admin/residents/[id] error:", error);
    return apiError(error.message || "Failed to update resident", 500);
  }
}
