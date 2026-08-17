import { NextRequest } from "next/server";
import prisma from "@/lib/prisma";
import { roomUpdateSchema } from "@/lib/validations";
import { apiSuccess, apiError, requireAdmin } from "@/lib/api-auth";

// GET /api/rooms/[id] - Get Single Room Details
export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;

    const room = await prisma.room.findUnique({
      where: { id },
      include: {
        beds: {
          include: {
            resident: {
              select: { id: true, name: true },
            },
          },
        },
        branch: true,
      },
    });

    if (!room) {
      return apiError("Room not found", 404);
    }

    return apiSuccess(room);
  } catch (error: any) {
    console.error("GET /api/rooms/[id] error:", error);
    return apiError(error.message || "Failed to fetch room", 500);
  }
}

// PUT /api/rooms/[id] - Update Room (Admin only)
export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { error } = await requireAdmin();
    if (error) return error;

    const { id } = await params;
    const body = await req.json();
    const validatedData = roomUpdateSchema.safeParse(body);

    if (!validatedData.success) {
      return apiError("Validation failed", 422, validatedData.error.flatten().fieldErrors);
    }

    const updatedRoom = await prisma.room.update({
      where: { id },
      data: validatedData.data,
      include: {
        beds: true,
      },
    });

    return apiSuccess(updatedRoom);
  } catch (error: any) {
    console.error("PUT /api/rooms/[id] error:", error);
    return apiError(error.message || "Failed to update room", 500);
  }
}

// DELETE /api/rooms/[id] - Delete Room (Admin only)
export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { error } = await requireAdmin();
    if (error) return error;

    const { id } = await params;

    await prisma.room.delete({
      where: { id },
    });

    return apiSuccess({ message: "Room deleted successfully", id });
  } catch (error: any) {
    console.error("DELETE /api/rooms/[id] error:", error);
    return apiError(error.message || "Failed to delete room", 500);
  }
}
