import { getOrderById } from "@/lib/data";
import OrderStatusScreen from "../OrderStatusScreen";
import Link from "next/link";

export const metadata = {
  title: "Order Status | Addis Eats",
  description: "Track your food delivery order in real-time."
};

/**
 * Server Component rendering initial order state on the server,
 * then passing it into the client component as SWR fallbackData.
 */
export default async function OrderStatusPage({ params }) {
  const { id } = await params;
  const initialOrder = getOrderById(id);

  if (!initialOrder) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] p-8 text-center max-w-md mx-auto">
        <div className="w-16 h-16 rounded-full bg-rose-50 border border-rose-200 flex items-center justify-center text-3xl mb-4">
          🔍
        </div>
        <h2 className="text-xl font-bold text-stone-900 mb-2">Order Not Found</h2>
        <p className="text-sm text-stone-500 mb-6">
          No order was found matching ID <code className="font-mono text-stone-800">{id}</code>.
        </p>
        <Link
          href="/menu"
          className="px-5 py-2.5 bg-orange-600 text-white font-bold rounded-xl text-xs hover:bg-orange-700 transition"
        >
          View Menu
        </Link>
      </div>
    );
  }

  // Pre-rendered on server, hydrated on client with useSWR polling
  return <OrderStatusScreen orderId={id} fallbackData={initialOrder} />;
}
