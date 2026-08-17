import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { stripe } from "@/lib/stripe";
import { PaymentStatus, BookingStatus } from "@prisma/client";

export const dynamic = "force-dynamic";

// POST /api/payments/webhook - Stripe Webhook Handler
export async function POST(req: NextRequest) {
  try {
    const body = await req.text();
    const signature = req.headers.get("stripe-signature");

    let event;

    if (process.env.STRIPE_WEBHOOK_SECRET && signature) {
      try {
        event = stripe.webhooks.constructEvent(body, signature, process.env.STRIPE_WEBHOOK_SECRET);
      } catch (err: any) {
        console.error("Stripe signature verification failed:", err.message);
        return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
      }
    } else {
      // Fallback JSON parse in dev
      event = JSON.parse(body);
    }

    if (event.type === "payment_intent.succeeded") {
      const paymentIntent = event.data.object as any;
      const stripeId = paymentIntent.id;

      // Update payment record to COMPLETED
      const payment = await prisma.payment.updateMany({
        where: { stripePaymentIntentId: stripeId },
        data: {
          status: PaymentStatus.COMPLETED,
          receiptUrl: paymentIntent.charges?.data?.[0]?.receipt_url || undefined,
        },
      });

      // If associated with a booking, update booking payment status
      const bookingId = paymentIntent.metadata?.bookingId;
      if (bookingId) {
        await prisma.booking.update({
          where: { id: bookingId },
          data: {
            paymentStatus: PaymentStatus.COMPLETED,
            status: BookingStatus.CONFIRMED,
          },
        });
      }
    }

    return NextResponse.json({ received: true });
  } catch (error: any) {
    console.error("Stripe webhook processing error:", error);
    return NextResponse.json({ error: error.message || "Webhook error" }, { status: 500 });
  }
}
