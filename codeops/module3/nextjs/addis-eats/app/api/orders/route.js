import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { orderSchema } from "@/lib/schemas";
import { createOrderRecord } from "@/lib/data";

export async function POST(request) {
  let body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      {
        error: "Invalid JSON",
        message: "Request body must be a valid JSON object"
      },
      { status: 400 }
    );
  }

  // Idempotency guard: Double tap returns the existing order (handles in-flight concurrent requests)
  globalThis.__idempotencyStore = globalThis.__idempotencyStore || new Map();
  const idempotencyKey = body.idempotencyKey || request.headers.get("x-idempotency-key");
  let resolvePending;

  if (idempotencyKey) {
    if (globalThis.__idempotencyStore.has(idempotencyKey)) {
      const existing = await globalThis.__idempotencyStore.get(idempotencyKey);
      return NextResponse.json(
        {
          success: true,
          message: "Order placed successfully (idempotent replay)",
          order: existing
        },
        { status: 200 }
      );
    }
    // Set in-flight lock promise for parallel requests
    const inFlightPromise = new Promise((resolve) => {
      resolvePending = resolve;
    });
    globalThis.__idempotencyStore.set(idempotencyKey, inFlightPromise);
  }

  const result = orderSchema.safeParse(body);

  if (!result.success) {
    const errorDetails = result.error.flatten();
    return NextResponse.json(
      {
        error: "Unprocessable Entity",
        message: "Order validation failed",
        fieldErrors: errorDetails.fieldErrors
      },
      { status: 422 }
    );
  }

  const validData = result.data;
  const cookieStore = await cookies();
  const sessionId = cookieStore.get("session_id")?.value || "guest-session";

  // Calculate order pricing
  const subtotal = validData.items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const deliveryFee = validData.items.length > 0 ? 2.5 : 0;
  const total = Number((subtotal + deliveryFee).toFixed(2));

  const newOrder = createOrderRecord(
    {
      ...validData,
      subtotal,
      deliveryFee,
      total
    },
    sessionId
  );

  if (idempotencyKey) {
    globalThis.__idempotencyStore.set(idempotencyKey, newOrder);
    if (resolvePending) {
      resolvePending(newOrder);
    }
  }

  return NextResponse.json(
    {
      success: true,
      message: "Order placed successfully",
      order: newOrder
    },
    { status: 201 }
  );
}
