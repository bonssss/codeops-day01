import { getOrderById } from "@/lib/data";

/**
 * Requirement 3: SSE Stream route handler with correct SSE framing.
 * Format:
 * event: <name>\n
 * data: <json string>\n\n
 */
export async function GET(request, props) {
  const params = await props.params;
  const orderId = params?.id;

  if (!orderId) {
    return new Response("Missing order id", { status: 400 });
  }

  const initialOrder = getOrderById(orderId);
  if (!initialOrder) {
    return new Response("Order not found", { status: 404 });
  }

  const encoder = new TextEncoder();

  // Create SSE ReadableStream
  const stream = new ReadableStream({
    start(controller) {
      let isClosed = false;

      // Helper function to send correctly framed SSE messages
      const sendEvent = (event, data) => {
        if (isClosed) return;
        try {
          const payload = `event: ${event}\ndata: ${JSON.stringify(data)}\n\n`;
          controller.enqueue(encoder.encode(payload));
        } catch {
          // Stream might have closed
        }
      };

      // 1. Send immediate initial state
      const currentOrder = getOrderById(orderId) || initialOrder;
      sendEvent("order_update", currentOrder);

      // If already delivered, close deliberately
      if (currentOrder.status === "delivered" || currentOrder.status === "cancelled") {
        sendEvent("delivered", currentOrder);
        isClosed = true;
        controller.close();
        return;
      }

      // 2. Poll/stream order status progression every 2.5 seconds
      const interval = setInterval(() => {
        if (isClosed) {
          clearInterval(interval);
          return;
        }

        const updated = getOrderById(orderId);
        if (!updated) {
          clearInterval(interval);
          isClosed = true;
          controller.close();
          return;
        }

        sendEvent("order_update", updated);

        // Requirement 5: Close stream deliberately on delivery
        if (updated.status === "delivered" || updated.status === "cancelled") {
          sendEvent("delivered", updated);
          clearInterval(interval);
          isClosed = true;
          try {
            controller.close();
          } catch {
            // Already closed
          }
        }
      }, 2500);

      // Handle client disconnect / abort signal
      request.signal.addEventListener("abort", () => {
        clearInterval(interval);
        isClosed = true;
        try {
          controller.close();
        } catch {
          // Ignore
        }
      });
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/event-stream; charset=utf-8",
      "Cache-Control": "no-cache, no-transform",
      "Connection": "keep-alive",
      "X-Accel-Buffering": "no",
    },
  });
}
