"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function Error({ error, reset }) {
  useEffect(() => {
    // Log the error to an error reporting service if needed
    console.error("Menu segment error:", error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[50vh] p-8 text-center">
      <div className="p-6 bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-900 rounded-xl max-w-md w-full">
        <h2 className="text-2xl font-bold text-red-600 dark:text-red-400 mb-2">
          Oops! Something went wrong
        </h2>
        <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-6">
          {error?.message || "Failed to load the menu."}
        </p>
        <div className="flex gap-4 justify-center">
          <button
            onClick={() => reset()}
            className="px-4 py-2 bg-red-600 text-white font-medium rounded-lg hover:bg-red-700 transition"
          >
            Try again
          </button>
          <Link
            href="/"
            className="px-4 py-2 bg-zinc-200 dark:bg-zinc-700 text-zinc-800 dark:text-zinc-200 font-medium rounded-lg hover:bg-zinc-300 dark:hover:bg-zinc-600 transition"
          >
            Back Home
          </Link>
        </div>
      </div>
    </div>
  );
}