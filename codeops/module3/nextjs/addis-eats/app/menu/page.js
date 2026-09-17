import CategoryBar from "./CategoryBar";
import DishList from "./DishList";
import Link from "next/link";

export default function Menu() {
  return (
    <div className="flex flex-col flex-1 items-center p-6 bg-zinc-50 font-sans dark:bg-black min-h-screen">
      <h1 className="text-3xl font-bold mb-2">Our Menu</h1>
      <p className="text-zinc-600 dark:text-zinc-400 mb-4">
        Explore authentic Ethiopian cuisine
      </p>
      <CategoryBar />
      <DishList />
      <div className="flex gap-4 mt-6">
        <Link href="/" className="text-blue-500 hover:underline">
          &larr; Back to Home
        </Link>
        <Link href="/cart" className="text-blue-500 hover:underline">
          Go to Cart &rarr;
        </Link>
      </div>
    </div>
  );
}
