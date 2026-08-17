import { NextRequest } from "next/server";
import prisma from "@/lib/prisma";
import { gatePassCreateSchema } from "@/lib/validations";
import { apiSuccess, apiError, requireAuth } from "@/lib/api-auth";
import { PassStatus, UserRole } from "@prisma/client";

// GET /api/gate-passes - Get Gate Passes
export async function GET(req: NextRequest) {
  try {
    const { error, user } = await requireAuth();
    if (error) return error;

    const isAdmin = user!.role === "ADMIN" || (user!.role as any) === UserRole.ADMIN;
    const where = isAdmin ? {} : { userId: user!.id };

    const gatePasses = await prisma.gatePass.findMany({
      where,
      include: {
        user: {
          select: { id: true, name: true, phone: true, cnicNumber: true },
        },
      },
      orderBy: { createdAt: "desc" },
    });

    return apiSuccess(gatePasses);
  } catch (error: any) {
    console.error("GET /api/gate-passes error:", error);
    return apiError(error.message || "Failed to fetch gate passes", 500);
  }
}

// POST /api/gate-passes - Apply for Gate Pass
export async function POST(req: NextRequest) {
  try {
    const { error, user } = await requireAuth();
    if (error) return error;

    const body = await req.json();
    const validatedData = gatePassCreateSchema.safeParse(body);

    if (!validatedData.success) {
      return apiError("Validation failed", 422, validatedData.error.flatten().fieldErrors);
    }

    const { passType, departureTime, expectedReturn, reason, destination, guardianPhone } = validatedData.data;

    const newPass = await prisma.gatePass.create({
      data: {
        userId: user!.id,
        passType,
        departureTime: new Date(departureTime),
        expectedReturn: new Date(expectedReturn),
        reason,
        destination,
        guardianPhone,
        status: PassStatus.PENDING,
      },
      include: {
        user: { select: { id: true, name: true } },
      },
    });

    return apiSuccess(newPass, 201);
  } catch (error: any) {
    console.error("POST /api/gate-passes error:", error);
    return apiError(error.message || "Failed to create gate pass", 500);
  }
}
