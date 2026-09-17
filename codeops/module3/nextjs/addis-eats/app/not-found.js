import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center min-h-[65vh] p-8 text-center max-w-lg mx-auto">
      <div className="text-7xl mb-4 animate-bounce">🍲</div>
      <span className="text-xs font-bold uppercase tracking-widest text-orange-700 px-3.5 py-1 bg-orange-50 border border-orange-200 rounded-full mb-3">
        404 Not Found
      </span>
      <h1 className="text-3xl sm:text-4xl font-black text-stone-900 mb-3">
        Dish or Page Not Found
      </h1>
      <p className="text-sm text-stone-500 mb-8 leading-relaxed">
        We could not find the dish or page you are looking for. It might have been taken off today&apos;s special menu or the link is incorrect.
      </p>
      <div className="flex gap-4 justify-center">
        <Link
          href="/menu"
          className="px-6 py-3.5 bg-orange-600 hover:bg-orange-700 text-white font-bold rounded-2xl shadow-md shadow-orange-600/25 transition"
        >
          Browse Our Menu 🍛
        </Link>
        <Link
          href="/"
          className="px-6 py-3.5 bg-white text-stone-800 font-bold rounded-2xl border border-stone-200 shadow-2xs hover:bg-stone-50 transition"
        >
          Return Home
        </Link>
      </div>
    </div>
  );
}
