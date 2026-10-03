import { NextResponse } from "next/server";
import { getDishById } from "@/lib/data";

export async function GET(request, { params }) {
  const { id } = await params;
  const dish = getDishById(id);

  if (!dish) {
    return NextResponse.json(
      {
        error: "Not Found",
        message: `Dish with ID '${id}' was not found`
      },
      { status: 404 }
    );
  }

  return NextResponse.json(dish, { status: 200 });
}
