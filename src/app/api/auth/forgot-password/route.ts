import { NextRequest } from "next/server";
import prisma from "@/lib/prisma";
import { forgotPasswordSchema } from "@/lib/validations";
import { apiSuccess, apiError } from "@/lib/api-auth";
import crypto from "crypto";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const validatedData = forgotPasswordSchema.safeParse(body);

    if (!validatedData.success) {
      return apiError("Invalid email address", 422);
    }

    const { email } = validatedData.data;

    const user = await prisma.user.findUnique({
      where: { email: email.toLowerCase().trim() },
    });

    if (!user) {
      // Don't leak user existence for security
      return apiSuccess({ message: "If this email exists in our records, a password reset link has been dispatched." });
    }

    // Generate reset token
    const token = crypto.randomBytes(32).toString("hex");
    const expires = new Date(Date.now() + 3600 * 1000); // 1 hour

    await prisma.verificationToken.create({
      data: {
        identifier: email.toLowerCase().trim(),
        token,
        expires,
      },
    });

    return apiSuccess({
      message: "If this email exists in our records, a password reset link has been dispatched.",
      resetToken: process.env.NODE_ENV === "development" ? token : undefined,
    });
  } catch (error: any) {
    console.error("Forgot password error:", error);
    return apiError(error.message || "Failed to process forgot password request", 500);
  }
}
