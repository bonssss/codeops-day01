import Link from "next/link";
import { notFound } from "next/navigation";
import AddToCartButton from "./AddToCartButton";
import { getDishes, getDishById } from "@/lib/data";

export async function generateStaticParams() {
  const dishes = getDishes();
  return dishes.map((dish) => ({
    id: String(dish.id)
  }));
}

export default async function MenuItemPage({ params }) {
  const { id } = await params;
  const dish = getDishById(id);

  if (!dish) {
    notFound();
  }

  const dishPayload = {
    id: Number(dish.id),
    name: dish.name,
    price: dish.price,
    emoji: dish.emoji,
    category: dish.category
  };

  return (
    <div className="flex flex-col flex-1 px-4 sm:px-6 lg:px-8 py-10 max-w-4xl mx-auto w-full">
      {/* Breadcrumbs */}
      <nav className="flex items-center gap-2 text-xs font-semibold text-stone-500 mb-6">
        <Link href="/" className="hover:text-orange-600 transition">Home</Link>
        <span>/</span>
        <Link href="/menu" className="hover:text-orange-600 transition">Menu</Link>
        <span>/</span>
        <span className="text-stone-900 font-bold">{dish.name}</span>
      </nav>

      {/* Main Detail Card */}
      <div className="bg-white border border-stone-200/80 rounded-3xl p-6 sm:p-10 shadow-lg">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-6 border-b border-stone-100">
          <div className="flex items-center gap-4">
            <span className="text-5xl sm:text-6xl p-4 bg-orange-50 border border-orange-100 rounded-3xl shadow-2xs">
              {dish.emoji}
            </span>
            <div>
              <span className="text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-orange-50 border border-orange-200 text-orange-800">
                {dish.category}
              </span>
              <h1 className="text-3xl sm:text-4xl font-black text-stone-900 mt-2">
                {dish.name}
              </h1>
            </div>
          </div>

          <div className="flex flex-col items-start md:items-end">
            <span className="text-xs text-stone-500 uppercase tracking-wider font-semibold">Price per order</span>
            <span className="text-3xl font-black text-orange-600 mt-1">
              {dish.formattedPrice}
            </span>
          </div>
        </div>

        {/* Info Pills */}
        <div className="grid grid-cols-3 gap-3 my-6 text-center">
          <div className="p-4 bg-orange-50/50 rounded-2xl border border-orange-100">
            <span className="text-xs text-stone-500 font-medium block">Spice Level</span>
            <span className="text-sm font-bold text-stone-800 mt-0.5 block">{dish.spice}</span>
          </div>
          <div className="p-4 bg-orange-50/50 rounded-2xl border border-orange-100">
            <span className="text-xs text-stone-500 font-medium block">Est. Prep Time</span>
            <span className="text-sm font-bold text-stone-800 mt-0.5 block">⏱️ {dish.time}</span>
          </div>
          <div className="p-4 bg-orange-50/50 rounded-2xl border border-orange-100">
            <span className="text-xs text-stone-500 font-medium block">Portion</span>
            <span className="text-sm font-bold text-stone-800 mt-0.5 block">👥 {dish.servings}</span>
          </div>
        </div>

        {/* Description */}
        <div className="my-6">
          <h2 className="text-xs uppercase tracking-wider font-bold text-stone-400 mb-2">About This Dish</h2>
          <p className="text-stone-700 leading-relaxed text-base">
            {dish.description}
          </p>
        </div>

        {/* Ingredients */}
        <div className="my-6">
          <h2 className="text-xs uppercase tracking-wider font-bold text-stone-400 mb-2">Key Ingredients</h2>
          <div className="flex flex-wrap gap-2">
            {dish.ingredients?.map((ing, idx) => (
              <span
                key={idx}
                className="px-3.5 py-1.5 bg-stone-100 text-stone-700 rounded-xl text-xs font-semibold"
              >
                🌿 {ing}
              </span>
            ))}
          </div>
        </div>

        {/* Action Button & Router Push */}
        <div className="pt-6 border-t border-stone-100 flex flex-col sm:flex-row items-center justify-between gap-4">
          <AddToCartButton dish={dishPayload} />
          <Link
            href="/menu"
            className="text-sm font-semibold text-stone-500 hover:text-stone-900 transition"
          >
            &larr; Back to Menu
          </Link>
        </div>
      </div>
    </div>
  );
}
