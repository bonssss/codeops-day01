import { NextResponse } from "next/server";
import { getDishes } from "@/lib/data";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const search = searchParams.get("search") || searchParams.get("q") || "";
  const category = searchParams.get("category");
  const pageParam = searchParams.get("page");
  const limitParam = searchParams.get("limit");

  let allDishes = getDishes();

  // Filter by category if provided
  if (category && category !== "All") {
    const normalize = (str) =>
      str ? str.toLowerCase().replace(/[^a-z0-9]/g, "") : "";
    allDishes = allDishes.filter(
      (dish) =>
        normalize(dish.category).includes(normalize(category)) ||
        normalize(category).includes(normalize(dish.category))
    );
  }

  // Filter by search query if provided
  if (search.trim()) {
    const q = search.trim().toLowerCase();
    allDishes = allDishes.filter(
      (dish) =>
        dish.name.toLowerCase().includes(q) ||
        dish.description.toLowerCase().includes(q) ||
        dish.category.toLowerCase().includes(q) ||
        (dish.ingredients && dish.ingredients.some((ing) => ing.toLowerCase().includes(q)))
    );
  }

  const total = allDishes.length;
  // If page is explicitly provided (or default limit 3 for paginated views)
  const page = Math.max(1, parseInt(pageParam || "1", 10));
  const limit = Math.max(1, parseInt(limitParam || "3", 10));
  const totalPages = Math.max(1, Math.ceil(total / limit));

  const startIndex = (page - 1) * limit;
  const paginatedDishes = allDishes.slice(startIndex, startIndex + limit);

  return NextResponse.json(
    {
      dishes: paginatedDishes,
      total,
      page,
      totalPages,
      limit,
      query: search,
      category: category || "All"
    },
    {
      status: 200,
      headers: {
        "Content-Type": "application/json"
      }
    }
  );
}
