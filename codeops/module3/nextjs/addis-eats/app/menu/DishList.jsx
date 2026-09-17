import Link from "next/link";

const dishes = [
  { id: 1, name: "Doro Wat", price: "$15.00", description: "Traditional spicy chicken stew served with injera." },
  { id: 2, name: "Shiro Wat", price: "$11.00", description: "Spiced chickpea stew served with fresh injera." },
  { id: 3, name: "Tibs", price: "$16.50", description: "Sautéed beef with onions, garlic, and jalapeños." },
  { id: 4, name: "Kitfo", price: "$17.00", description: "Minced lean beef seasoned with mitmita and niter kibbeh." },
];

export default function DishList() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-4 w-full max-w-2xl">
      {dishes.map((dish) => (
        <div
          key={dish.id}
          className="p-4 border border-zinc-200 dark:border-zinc-700 rounded-lg shadow-sm bg-white dark:bg-zinc-800 flex flex-col justify-between"
        >
          <div>
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-semibold">{dish.name}</h2>
              <span className="font-bold text-green-600">{dish.price}</span>
            </div>
            <p className="text-sm text-zinc-600 dark:text-zinc-400 mt-1">
              {dish.description}
            </p>
          </div>
          <Link
            href={`/menu/${dish.id}`}
            className="mt-4 text-center text-sm font-medium text-blue-600 hover:underline"
          >
            View Details &rarr;
          </Link>
        </div>
      ))}
    </div>
  );
}
