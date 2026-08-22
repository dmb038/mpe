"use server";

import { redirect } from "next/navigation";
import { createAdminClient } from "@/lib/supabase/admin";
import Stripe from "stripe";
import type { ActionResult } from "./contact";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY ?? "", {
  apiVersion: "2026-07-29.dahlia",
});

const DUES_AMOUNT_CENTS = 12500; // $125.00

export async function createPaymentIntent(input: {
  payerName: string;
  payerEmail: string;
  amount: number;
}): Promise<{ ok: true; clientSecret: string } | ActionResult> {
  if (!process.env.STRIPE_SECRET_KEY) {
    return { ok: false, error: "Payment processing is not configured yet." };
  }

  try {
    const intent = await stripe.paymentIntents.create({
      amount: Math.round(input.amount * 100),
      currency: "usd",
      metadata: {
        payer_name: input.payerName,
        payer_email: input.payerEmail,
        type: "dues",
      },
    });

    const admin = createAdminClient();
    await admin.from("payments").insert({
      stripe_intent_id: intent.id,
      amount_cents: Math.round(input.amount * 100),
      payer_name: input.payerName,
      payer_email: input.payerEmail,
      description: "Neighborhood Association Dues Payment",
      status: "pending",
    });

    return { ok: true, clientSecret: intent.client_secret ?? "" };
  } catch (error) {
    console.error("Payment intent creation failed", error);
    return { ok: false, error: "Couldn't create a payment. Please try again." };
  }
}

export async function confirmPayment(input: {
  paymentIntentId: string;
  clientSecret: string;
}): Promise<ActionResult> {
  if (!process.env.STRIPE_SECRET_KEY) {
    return { ok: false, error: "Payment processing is not configured." };
  }

  try {
    const intent = await stripe.paymentIntents.retrieve(input.paymentIntentId);

    if (intent.status !== "succeeded") {
      return { ok: false, error: "Payment was not successful. Please try again." };
    }

    const admin = createAdminClient();
    await admin
      .from("payments")
      .update({
        status: "succeeded",
        succeeded_at: new Date().toISOString(),
      })
      .eq("stripe_intent_id", input.paymentIntentId);

    return { ok: true };
  } catch (error) {
    console.error("Payment confirmation failed", error);
    return { ok: false, error: "Couldn't confirm your payment. Please contact us." };
  }
}
