import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center min-h-[65vh] p-8 text-center max-w-lg mx-auto">
      <div className="text-7xl mb-4 animate-bounce">🍲</div>
      <span className="text-xs font-bold uppercase tracking-widest text-amber-600 px-3 py-1 bg-amber-100 dark:bg-amber-950/70 rounded-full mb-3">
        404 Not Found
      </span>
      <h1 className="text-3xl sm:text-4xl font-black text-stone-900 dark:text-stone-100 mb-3">
        Dish or Page Missing
      </h1>
      <p className="text-sm text-stone-600 dark:text-stone-400 mb-8 leading-relaxed">
        We could not find the dish or page you are looking for. It might have been taken off today&apos;s special menu or the link is incorrect.
      </p>
      <div className="flex gap-4 justify-center">
        <Link
          href="/menu"
          className="px-6 py-3 bg-amber-600 hover:bg-amber-700 text-white font-bold rounded-xl shadow-md shadow-amber-600/30 transition"
        >
          Browse Our Menu 🍛
        </Link>
        <Link
          href="/"
          className="px-6 py-3 bg-stone-200 dark:bg-stone-800 text-stone-800 dark:text-stone-200 font-semibold rounded-xl hover:bg-stone-300 dark:hover:bg-stone-700 transition"
        >
          Return Home
        </Link>
      </div>
    </div>
  );
}
