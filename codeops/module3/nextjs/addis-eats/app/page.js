import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center p-8 bg-zinc-50 font-sans dark:bg-black min-h-screen text-center">
      <h1 className="text-4xl font-extrabold mb-4 text-zinc-900 dark:text-zinc-100">
        Welcome to Addis Eats! 🍲
      </h1>
      <p className="text-lg text-zinc-600 dark:text-zinc-400 max-w-md mb-8">
        Delicious traditional and modern Ethiopian cuisine delivered to your doorstep.
      </p>
      <div className="flex flex-wrap gap-4 justify-center">
        <Link
          href="/menu"
          className="px-6 py-3 bg-amber-600 text-white font-medium rounded-lg shadow hover:bg-amber-700 transition"
        >
          Browse Menu
        </Link>
        <Link
          href="/cart"
          className="px-6 py-3 bg-zinc-200 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200 font-medium rounded-lg shadow hover:bg-zinc-300 dark:hover:bg-zinc-700 transition"
        >
          View Cart
        </Link>
      </div>
    </div>
  );
}
