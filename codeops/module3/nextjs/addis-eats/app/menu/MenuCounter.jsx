"use client";

import { useState } from "react";

export default function MenuCounter() {
  const [count, setCount] = useState(0);

  return (
    <div className="p-3 bg-orange-50 border border-orange-200 rounded-2xl flex flex-col gap-2">
      <div className="flex items-center justify-between text-xs font-bold text-orange-900">
        <span>Layout State Counter:</span>
        <span className="px-2 py-0.5 bg-orange-500 text-white rounded-full font-mono text-sm shadow-2xs">
          {count}
        </span>
      </div>
      <p className="text-[11px] text-stone-500 leading-tight">
        Preserved when navigating between menu and dishes (Layout State Persistence).
      </p>
      <div className="flex gap-2">
        <button
          type="button"
          onClick={() => setCount((c) => c + 1)}
          className="flex-1 py-1.5 px-3 bg-orange-600 hover:bg-orange-700 text-white text-xs font-bold rounded-xl shadow-2xs transition cursor-pointer"
        >
          + Count ({count})
        </button>
        <button
          type="button"
          onClick={() => setCount(0)}
          className="py-1.5 px-2.5 bg-white border border-stone-200 hover:bg-stone-50 text-stone-600 text-xs font-semibold rounded-xl transition cursor-pointer"
        >
          Reset
        </button>
      </div>
    </div>
  );
}
