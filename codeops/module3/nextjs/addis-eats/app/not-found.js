import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] p-8 text-center">
      <h1 className="text-6xl font-extrabold text-amber-600 mb-2">404</h1>
      <h2 className="text-2xl font-bold mb-4">Page or Dish Not Found</h2>
      <p className="text-zinc-600 dark:text-zinc-400 max-w-md mb-6">
        Sorry, the dish or page you are looking for does not exist in Addis Eats.
      </p>
      <div className="flex gap-4">
        <Link
          href="/menu"
          className="px-5 py-2.5 bg-amber-600 text-white font-medium rounded-lg hover:bg-amber-700 transition"
        >
          View Menu
        </Link>
        <Link
          href="/"
          className="px-5 py-2.5 bg-zinc-200 dark:bg-zinc-700 text-zinc-800 dark:text-zinc-200 font-medium rounded-lg hover:bg-zinc-300 dark:hover:bg-zinc-600 transition"
        >
          Go Home
        </Link>
      </div>
    </div>
  );
}
