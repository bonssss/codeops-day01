"use server";

import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";
import { orderSchema } from "@/lib/schemas";
import { createOrderRecord, cancelOrderRecord, getOrderById, DELIVERY_ZONES, PROMO_CODES } from "@/lib/data";

/**
 * Server Action for placing an order using useActionState
 * @param {object} prevState - previous form state
 * @param {FormData} formData - submitted form data
 */
export async function placeOrderAction(prevState, formData) {
  try {
    // Idempotency check: Confirm a double tap places exactly one order
    globalThis.__idempotencyStore = globalThis.__idempotencyStore || new Map();
    const idempotencyKey = formData.get("idempotencyKey");
    if (idempotencyKey && globalThis.__idempotencyStore.has(idempotencyKey)) {
      const existing = globalThis.__idempotencyStore.get(idempotencyKey);
      return {
        success: true,
        order: existing,
        fieldErrors: null,
        error: null,
      };
    }

    const rawItems = formData.get("items");
    let items = [];
    try {
      items = rawItems ? JSON.parse(rawItems) : [];
    } catch {
      items = [];
    }

    const deliveryZoneKey = formData.get("deliveryZone") || "bole";
    const promoCodeKey = (formData.get("promoCode") || "").trim().toUpperCase();

    const payload = {
      name: formData.get("name") || "",
      address: formData.get("address") || "",
      deliveryZone: deliveryZoneKey,
      phone: formData.get("phone") || "",
      paymentMethod: formData.get("paymentMethod") || "telebirr",
      promoCode: promoCodeKey || null,
      notes: formData.get("notes") || null,
      items: items.map((item) => ({
        id: item.id,
        name: item.name,
        price: typeof item.price === "number" ? item.price : parseFloat(String(item.price).replace(/[^0-9.]/g, "")) || 0,
        quantity: Number(item.quantity) || 1
      }))
    };

    // Validate using Zod Schema
    const result = orderSchema.safeParse(payload);

    if (!result.success) {
      const flattened = result.error.flatten();
      return {
        success: false,
        error: "Validation failed. Please verify your delivery details.",
        fieldErrors: flattened.fieldErrors,
        data: payload
      };
    }

    const validData = result.data;
    const cookieStore = await cookies();
    const sessionId = cookieStore.get("session_id")?.value || "demo-session-user";

    // Pricing calculation in ETB
    const subtotal = validData.items.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );

    // Dynamic zone delivery fee
    const matchedZone = DELIVERY_ZONES.find((z) => z.id === validData.deliveryZone);
    const deliveryFee = validData.items.length > 0 ? (matchedZone ? matchedZone.fee : 50) : 0;

    // Promo calculation
    let discount = 0;
    if (validData.promoCode && PROMO_CODES[validData.promoCode]) {
      const promo = PROMO_CODES[validData.promoCode];
      if (subtotal >= promo.minOrder) {
        if (promo.discountType === "fixed") {
          discount = Math.min(subtotal, promo.amount);
        } else if (promo.discountType === "percent") {
          discount = Math.round((subtotal * promo.amount) / 100);
        }
      }
    }

    const total = Math.max(0, subtotal - discount + deliveryFee);

    const newOrder = createOrderRecord(
      {
        ...validData,
        subtotal,
        deliveryFee,
        discount,
        total,
        currency: "ETB"
      },
      sessionId
    );

    if (idempotencyKey) {
      globalThis.__idempotencyStore.set(idempotencyKey, newOrder);
    }

    // Revalidate paths after successful write
    revalidatePath("/checkout");
    revalidatePath("/menu");
    revalidatePath("/cart");
    revalidatePath("/dashboard");

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
 * Server Action for cancelling an order
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
      return { success: false, error: "Order ID is required to cancel." };
    }

    const cookieStore = await cookies();
    const sessionId = cookieStore.get("session_id")?.value;

    const result = cancelOrderRecord(orderId, sessionId);
    if (!result.success) {
      return result;
    }

    revalidatePath(`/order-status/${orderId}`);
    revalidatePath("/order-status");
    revalidatePath("/dashboard");

    return { success: true, order: result.order };
  } catch (err) {
    return {
      success: false,
      error: err.message || "Failed to cancel order"
    };
  }
}
