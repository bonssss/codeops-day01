"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function Error({ error, reset }) {
  useEffect(() => {
    console.error("Menu segment error:", error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[50vh] p-8 text-center">
      <div className="p-8 bg-white border border-red-200 rounded-3xl max-w-md w-full shadow-xs">
        <div className="text-4xl mb-3">⚠️</div>
        <h2 className="text-2xl font-black text-stone-900 mb-2">
          Something went wrong
        </h2>
        <p className="text-sm text-stone-500 mb-6">
          {error?.message || "Failed to load the menu items."}
        </p>
        <div className="flex gap-3 justify-center">
          <button
            onClick={() => reset()}
            className="px-5 py-2.5 bg-orange-600 text-white font-bold rounded-xl hover:bg-orange-700 transition cursor-pointer shadow-xs"
          >
            Try again
          </button>
          <Link
            href="/"
            className="px-5 py-2.5 bg-stone-100 text-stone-800 font-bold rounded-xl hover:bg-stone-200 transition"
          >
            Back Home
          </Link>
        </div>
      </div>
    </div>
  );
}