import { NextRequest } from "next/server";
import prisma from "@/lib/prisma";
import { roomCreateSchema } from "@/lib/validations";
import { apiSuccess, apiError, requireAdmin } from "@/lib/api-auth";
import { RoomType, RoomStatus } from "@prisma/client";

// GET /api/rooms - Filtered & Paginated Room Catalog
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);

    const page = Math.max(1, Number(searchParams.get("page") || "1"));
    const limit = Math.min(50, Math.max(1, Number(searchParams.get("limit") || "12")));
    const skip = (page - 1) * limit;

    const roomType = searchParams.get("roomType") as RoomType | null;
    const minPrice = searchParams.get("minPrice") ? Number(searchParams.get("minPrice")) : undefined;
    const maxPrice = searchParams.get("maxPrice") ? Number(searchParams.get("maxPrice")) : undefined;
    const status = (searchParams.get("status") as RoomStatus) || undefined;
    const search = searchParams.get("search") || "";

    const where: any = {};

    if (roomType && Object.values(RoomType).includes(roomType)) {
      where.roomType = roomType;
    }

    if (status && Object.values(RoomStatus).includes(status)) {
      where.status = status;
    }

    if (minPrice !== undefined || maxPrice !== undefined) {
      where.monthlyRentPKR = {};
      if (minPrice !== undefined) where.monthlyRentPKR.gte = minPrice;
      if (maxPrice !== undefined) where.monthlyRentPKR.lte = maxPrice;
    }

    if (search) {
      where.OR = [
        { roomNumber: { contains: search, mode: "insensitive" } },
        { description: { contains: search, mode: "insensitive" } },
      ];
    }

    const [rooms, totalCount] = await Promise.all([
      prisma.room.findMany({
        where,
        include: {
          beds: true,
          branch: {
            select: { id: true, name: true, city: true },
          },
        },
        skip,
        take: limit,
        orderBy: { roomNumber: "asc" },
      }),
      prisma.room.count({ where }),
    ]);

    return apiSuccess({
      rooms,
      pagination: {
        total: totalCount,
        page,
        limit,
        totalPages: Math.ceil(totalCount / limit),
      },
    });
  } catch (error: any) {
    console.error("GET /api/rooms error:", error);
    return apiError(error.message || "Failed to fetch rooms", 500);
  }
}

// POST /api/rooms - Create Room (Admin only)
export async function POST(req: NextRequest) {
  try {
    const { error } = await requireAdmin();
    if (error) return error;

    const body = await req.json();
    const validatedData = roomCreateSchema.safeParse(body);

    if (!validatedData.success) {
      return apiError("Validation failed", 422, validatedData.error.flatten().fieldErrors);
    }

    // Find or create default branch
    let defaultBranch = await prisma.hostelBranch.findFirst();
    if (!defaultBranch) {
      defaultBranch = await prisma.hostelBranch.create({
        data: {
          name: "Educator Girls Hostel - Peshawar Main",
          address: "University Road, Peshawar",
          city: "Peshawar",
        },
      });
    }

    const newRoom = await prisma.room.create({
      data: {
        ...validatedData.data,
        branchId: defaultBranch.id,
      },
      include: {
        beds: true,
      },
    });

    return apiSuccess(newRoom, 201);
  } catch (error: any) {
    console.error("POST /api/rooms error:", error);
    return apiError(error.message || "Failed to create room", 500);
  }
}
