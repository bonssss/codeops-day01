import { getOrderById, getOrders } from "@/lib/data";
import OrderStatusScreen from "./OrderStatusScreen";
import Link from "next/link";

export const metadata = {
  title: "Order Status | Addis Eats",
  description: "Track your food delivery order in real-time."
};

/**
 * Server Component for /order-status root route.
 * Reads searchParams (or falls back to the most recent order or demo order)
 * and passes it in as fallbackData.
 */
export default async function OrderStatusIndexPage({ searchParams }) {
  const resolvedSearchParams = await searchParams;
  const orderId = resolvedSearchParams?.id || "AE-10001";
  const initialOrder = getOrderById(orderId) || getOrders()[0] || null;

  return (
    <div className="flex flex-col flex-1">
      {/* Quick switcher to demo different orders */}
      <div className="max-w-xl mx-auto w-full px-4 pt-4 flex items-center justify-between text-xs text-stone-500">
        <span className="font-semibold">Tracking Order: <span className="font-mono text-stone-800">{orderId}</span></span>
        <div className="flex gap-2">
          <Link href="/order-status?id=AE-10001" className="hover:text-orange-600 underline">
            Demo Order
          </Link>
          <span>•</span>
          <Link href="/menu" className="hover:text-orange-600 underline">
            Menu
          </Link>
        </div>
      </div>
      <OrderStatusScreen orderId={orderId} fallbackData={initialOrder} />
    </div>
  );
}
