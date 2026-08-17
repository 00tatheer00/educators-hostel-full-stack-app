import { z } from "zod";

// -----------------------------------------------------------------------------
// Auth Schemas
// -----------------------------------------------------------------------------
export const registerSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  phone: z.string().min(10, "Phone number is required"),
  cnicNumber: z.string().min(10, "CNIC or B-Form number is required"),
  guardianName: z.string().min(2, "Guardian name is required"),
  guardianPhone: z.string().min(10, "Guardian phone number is required"),
  address: z.string().optional(),
});

export const forgotPasswordSchema = z.object({
  email: z.string().email("Invalid email address"),
});

// -----------------------------------------------------------------------------
// Room Schemas
// -----------------------------------------------------------------------------
export const roomCreateSchema = z.object({
  roomNumber: z.string().min(1, "Room number is required"),
  floor: z.number().int().min(0).default(1),
  roomType: z.enum(["SINGLE_EXECUTIVE", "DOUBLE_SHARING", "TRIPLE_SHARING", "QUAD_SHARING", "MASTER_SUITE"]),
  capacity: z.number().int().min(1).max(6),
  monthlyRentPKR: z.number().positive("Monthly rent must be positive"),
  securityDepositPKR: z.number().nonnegative().default(8000),
  hasAc: z.boolean().default(true),
  hasAttachedBath: z.boolean().default(true),
  hasBalcony: z.boolean().default(false),
  hasStudyDesk: z.boolean().default(true),
  hasWifi: z.boolean().default(true),
  images: z.array(z.string().url()).default([]),
  description: z.string().optional(),
});

export const roomUpdateSchema = roomCreateSchema.partial().extend({
  status: z.enum(["AVAILABLE", "FULL", "MAINTENANCE", "RESERVED"]).optional(),
});

// -----------------------------------------------------------------------------
// Booking Schemas
// -----------------------------------------------------------------------------
export const bookingCreateSchema = z.object({
  roomId: z.string().min(1, "Room ID is required"),
  bedId: z.string().optional(),
  checkInDate: z.string().or(z.date()),
  durationMonths: z.number().int().min(1).max(24).default(6),
  notes: z.string().optional(),
});

export const bookingStatusUpdateSchema = z.object({
  status: z.enum(["PENDING", "CONFIRMED", "ACTIVE", "CANCELLED", "REJECTED", "COMPLETED"]),
});

// -----------------------------------------------------------------------------
// Payment Schemas
// -----------------------------------------------------------------------------
export const paymentSessionSchema = z.object({
  bookingId: z.string().optional(),
  amountPKR: z.number().positive("Payment amount must be positive"),
  forMonth: z.string().optional(),
});

// -----------------------------------------------------------------------------
// Maintenance / Complaint Schemas
// -----------------------------------------------------------------------------
export const complaintCreateSchema = z.object({
  roomId: z.string().min(1, "Room ID is required"),
  category: z.enum(["PLUMBING", "ELECTRICAL", "WIFI_INTERNET", "FURNITURE", "AIR_CONDITIONER", "CLEANING", "SECURITY", "OTHER"]),
  title: z.string().min(3, "Title must be at least 3 characters"),
  description: z.string().min(5, "Description must be at least 5 characters"),
  priority: z.enum(["LOW", "MEDIUM", "HIGH", "URGENT"]).default("MEDIUM"),
});

export const complaintStatusSchema = z.object({
  status: z.enum(["OPEN", "IN_PROGRESS", "RESOLVED", "CLOSED"]),
});

// -----------------------------------------------------------------------------
// Gate Pass Schemas
// -----------------------------------------------------------------------------
export const gatePassCreateSchema = z.object({
  passType: z.enum(["DAY_OUT", "NIGHT_STAY", "VACATION_LEAVE"]).default("DAY_OUT"),
  departureTime: z.string().or(z.date()),
  expectedReturn: z.string().or(z.date()),
  reason: z.string().min(3, "Reason is required"),
  destination: z.string().min(3, "Destination is required"),
  guardianPhone: z.string().min(10, "Guardian phone is required"),
});

export const gatePassStatusSchema = z.object({
  status: z.enum(["PENDING", "APPROVED", "REJECTED", "EXPIRED"]),
});

// -----------------------------------------------------------------------------
// Resident Update Schema
// -----------------------------------------------------------------------------
export const residentUpdateSchema = z.object({
  name: z.string().min(2).optional(),
  phone: z.string().min(10).optional(),
  cnicNumber: z.string().optional(),
  guardianName: z.string().optional(),
  guardianPhone: z.string().optional(),
  address: z.string().optional(),
  role: z.enum(["ADMIN", "RESIDENT", "APPLICANT", "STAFF"]).optional(),
});
