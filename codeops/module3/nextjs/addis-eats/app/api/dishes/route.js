import { NextResponse } from "next/server";
import { getDishes } from "@/lib/data";

export async function GET() {
  const menu = getDishes();
  return NextResponse.json(menu, {
    status: 200,
    headers: {
      "Content-Type": "application/json"
    }
  });
}
