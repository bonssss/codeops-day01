import { getOrders } from "@/lib/data";
import { ordersToCsv } from "@/lib/csv";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const statusFilter = searchParams.get("status");

  let orders = getOrders();
  if (statusFilter) {
    orders = orders.filter((o) => o.status === statusFilter);
  }

  const csvContent = ordersToCsv(orders);

  return new Response(csvContent, {
    status: 200,
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": 'attachment; filename="addis-eats-orders.csv"',
      "Cache-Control": "no-cache, no-store, must-revalidate",
    },
  });
}
