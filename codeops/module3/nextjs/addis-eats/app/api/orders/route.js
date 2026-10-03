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

  return NextResponse.json(
    {
      success: true,
      message: "Order placed successfully",
      order: newOrder
    },
    { status: 201 }
  );
}
