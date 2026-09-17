export default function CategoryBar() {
  const categories = ["All", "Traditional", "Fast Food", "Beverages", "Dessert"];

  return (
    <div className="flex gap-2 p-4 bg-zinc-100 dark:bg-zinc-800 rounded-lg my-4">
      {categories.map((category) => (
        <button
          key={category}
          className="px-4 py-2 text-sm font-medium rounded-md bg-white dark:bg-zinc-700 shadow hover:bg-zinc-200 dark:hover:bg-zinc-600 transition"
        >
          {category}
        </button>
      ))}
    </div>
  );
}
