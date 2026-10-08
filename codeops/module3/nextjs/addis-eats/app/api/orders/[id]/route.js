import { NextResponse } from "next/server";
import { getOrderById } from "@/lib/data";

export async function GET(request, { params }) {
  const { id } = await params;
  const order = getOrderById(id);

  if (!order) {
    return NextResponse.json(
      {
        error: "Not Found",
        message: `Order with ID '${id}' was not found`
      },
      { status: 404 }
    );
  }

  return NextResponse.json(order, {
    status: 200,
    headers: {
      "Content-Type": "application/json",
      "Cache-Control": "no-store"
    }
  });
}
