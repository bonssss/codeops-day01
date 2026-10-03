"use server";

import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";
import { orderSchema } from "@/lib/schemas";
import { createOrderRecord, cancelOrderRecord, getOrderById } from "@/lib/data";

/**
 * Server Action for placing an order using useActionState (Exercises 5 & 6)
 * @param {object} prevState - previous form state
 * @param {FormData} formData - submitted form data
 */
export async function placeOrderAction(prevState, formData) {
  try {
    const rawItems = formData.get("items");
    let items = [];
    try {
      items = rawItems ? JSON.parse(rawItems) : [];
    } catch {
      items = [];
    }

    const payload = {
      name: formData.get("name") || "",
      address: formData.get("address") || "",
      phone: formData.get("phone") || "",
      paymentMethod: formData.get("paymentMethod") || "telebirr",
      promoCode: formData.get("promoCode") || null,
      items: items.map((item) => ({
        id: item.id,
        name: item.name,
        price: typeof item.price === "number" ? item.price : parseFloat(String(item.price).replace(/[^0-9.]/g, "")) || 0,
        quantity: Number(item.quantity) || 1
      }))
    };

    // Validate using Day 33 Zod Schema
    const result = orderSchema.safeParse(payload);

    if (!result.success) {
      const flattened = result.error.flatten();
      return {
        success: false,
        error: "Validation failed. Please check the fields below.",
        fieldErrors: flattened.fieldErrors,
        data: payload
      };
    }

    const validData = result.data;
    const cookieStore = await cookies();
    const sessionId = cookieStore.get("session_id")?.value || "demo-session-user";

    // Pricing calculation
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

    // Revalidate paths after successful write (Exercise 6)
    revalidatePath("/checkout");
    revalidatePath("/menu");
    revalidatePath("/cart");

    return {
      success: true,
      order: newOrder,
      fieldErrors: null,
      error: null
    };
  } catch (err) {
    return {
      success: false,
      error: err.message || "An unexpected error occurred while placing the order.",
      fieldErrors: null
    };
  }
}

/**
 * Server Action for cancelling an order (Exercise 7)
 * Verifies session and record ownership before cancellation
 * @param {string|FormData} orderIdOrFormData - ID of the order or FormData
 */
export async function cancelOrderAction(orderIdOrFormData) {
  try {
    let orderId = "";
    if (typeof orderIdOrFormData === "string") {
      orderId = orderIdOrFormData;
    } else if (orderIdOrFormData && typeof orderIdOrFormData.get === "function") {
      orderId = orderIdOrFormData.get("orderId");
    }

    if (!orderId) {
      return {
        success: false,
        error: "Order ID is required",
        status: 400
      };
    }

    const cookieStore = await cookies();
    const currentSessionId = cookieStore.get("session_id")?.value || "demo-session-user";

    // Check session and record ownership
    const cancellationResult = cancelOrderRecord(orderId, currentSessionId);

    if (!cancellationResult.success) {
      return {
        success: false,
        error: cancellationResult.error,
        status: cancellationResult.status
      };
    }

    // Revalidate path after successful cancellation
    revalidatePath("/checkout");

    return {
      success: true,
      message: `Order ${orderId} was successfully cancelled.`,
      order: cancellationResult.order
    };
  } catch (err) {
    return {
      success: false,
      error: err.message || "Failed to cancel order",
      status: 500
    };
  }
}

/**
 * Helper Server Action to fetch an order by ID (e.g., for viewing status)
 */
export async function fetchOrderAction(orderId) {
  const order = getOrderById(orderId);
  if (!order) {
    return { success: false, error: "Order not found" };
  }
  return { success: true, order };
}
