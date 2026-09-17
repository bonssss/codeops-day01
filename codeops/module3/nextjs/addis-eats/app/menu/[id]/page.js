import Link from "next/link";
import { notFound } from "next/navigation";
import AddToCartButton from "./AddToCartButton";

const dishes = {
  "1": { name: "Doro Wat", price: "$15.00", description: "Traditional spicy chicken stew served with injera." },
  "2": { name: "Shiro Wat", price: "$11.00", description: "Spiced chickpea stew served with fresh injera." },
  "3": { name: "Tibs", price: "$16.50", description: "Sautéed beef with onions, garlic, and jalapeños." },
  "4": { name: "Kitfo", price: "$17.00", description: "Minced lean beef seasoned with mitmita and niter kibbeh." },
};

export default async function MenuItemPage({ params }) {
  const { id } = await params;
  const dish = dishes[id];

  // Call notFound() if dish does not exist
  if (!dish) {
    notFound();
  }

  return (
    <div className="flex flex-col flex-1 items-center justify-center p-8 bg-zinc-50 font-sans dark:bg-black min-h-screen text-center">
      <div className="max-w-md w-full p-6 bg-white dark:bg-zinc-800 rounded-xl shadow-lg border border-zinc-200 dark:border-zinc-700">
        <span className="text-xs uppercase tracking-widest text-amber-600 font-bold">Dish Details</span>
        <h1 className="text-3xl font-extrabold mt-2 mb-2">{dish.name}</h1>
        <p className="text-xl font-bold text-green-600 mb-2">{dish.price}</p>
        <p className="text-zinc-600 dark:text-zinc-400 mb-6">
          {dish.description}
        </p>

        <div className="mb-6">
          <AddToCartButton dishName={dish.name} />
        </div>

        <div className="flex justify-between text-sm">
          <Link href="/menu" className="text-blue-500 hover:underline">
            &larr; Back to Menu
          </Link>
          <Link href="/cart" className="text-blue-500 hover:underline">
            View Cart &rarr;
          </Link>
        </div>
      </div>
    </div>
  );
}
