import Link from "next/link";
import AddToCartButton from "./AddToCartButton";

export default async function MenuItemPage({ params }) {
  const { id } = await params;

  return (
    <div className="flex flex-col flex-1 items-center justify-center p-8 bg-zinc-50 font-sans dark:bg-black min-h-screen text-center">
      <div className="max-w-md w-full p-6 bg-white dark:bg-zinc-800 rounded-xl shadow-lg border border-zinc-200 dark:border-zinc-700">
        <span className="text-xs uppercase tracking-widest text-amber-600 font-bold">Dish Details</span>
        <h1 className="text-3xl font-extrabold mt-2 mb-2">Menu Item #{id}</h1>
        <p className="text-zinc-600 dark:text-zinc-400 mb-6">
          Delicious Ethiopian specialty prepared fresh with authentic spices.
        </p>

        <div className="mb-6">
          <AddToCartButton dishName={`Item #${id}`} />
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
