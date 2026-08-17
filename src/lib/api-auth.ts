import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { NextResponse } from "next/server";
import { UserRole } from "@prisma/client";

export async function getCurrentUser() {
  const session = await getServerSession(authOptions);
  return session?.user ?? null;
}

export async function requireAuth() {
  const user = await getCurrentUser();
  if (!user) {
    return { error: apiError("Unauthorized: Please sign in to access this resource", 401), user: null };
  }
  return { error: null, user };
}

export async function requireAdmin() {
  const { error, user } = await requireAuth();
  if (error) return { error, user: null };

  if (user?.role !== "ADMIN" && (user?.role as any) !== UserRole.ADMIN) {
    return { error: apiError("Forbidden: Admin privileges required", 403), user: null };
  }

  return { error: null, user };
}

export function apiSuccess<T>(data: T, status = 200) {
  return NextResponse.json(
    {
      success: true,
      data,
      error: null,
    },
    { status }
  );
}

export function apiError(message: string, status = 400, details?: any) {
  return NextResponse.json(
    {
      success: false,
      data: null,
      error: message,
      details: details ?? null,
    },
    { status }
  );
}
