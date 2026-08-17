import { NextRequest } from "next/server";
import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { registerSchema } from "@/lib/validations";
import { apiSuccess, apiError } from "@/lib/api-auth";
import { UserRole } from "@prisma/client";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const validatedData = registerSchema.safeParse(body);

    if (!validatedData.success) {
      return apiError("Validation failed", 422, validatedData.error.flatten().fieldErrors);
    }

    const { email, password, name, phone, cnicNumber, guardianName, guardianPhone, address } = validatedData.data;

    // Check existing user
    const existingUser = await prisma.user.findUnique({
      where: { email: email.toLowerCase().trim() },
    });

    if (existingUser) {
      return apiError("A user with this email address already exists", 409);
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12);

    // Create user
    const newUser = await prisma.user.create({
      data: {
        email: email.toLowerCase().trim(),
        name,
        hashedPassword,
        phone,
        cnicNumber,
        guardianName,
        guardianPhone,
        address,
        role: UserRole.APPLICANT,
      },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        phone: true,
        cnicNumber: true,
        createdAt: true,
      },
    });

    return apiSuccess(newUser, 201);
  } catch (error: any) {
    console.error("Registration error:", error);
    return apiError(error.message || "Failed to register user", 500);
  }
}
