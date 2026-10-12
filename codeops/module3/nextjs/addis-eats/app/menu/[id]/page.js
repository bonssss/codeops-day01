import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import AddToCartButton from "./AddToCartButton";
import { getDishes, getDishById } from "@/lib/data";
import { etb } from "@/lib/format";

export async function generateStaticParams() {
  const dishes = getDishes();
  return dishes.map((dish) => ({
    id: String(dish.id)
  }));
}

export async function generateMetadata({ params }) {
  const { id } = await params;
  const dish = getDishById(id);

  if (!dish) {
    return {
      title: "Dish Not Found",
      description: "The requested Ethiopian dish could not be found.",
    };
  }

  const priceLabel = etb(dish.price);

  return {
    title: `${dish.name} - ${dish.amharicName || ""} (${priceLabel})`,
    description: dish.description,
    openGraph: {
      title: `${dish.name} - ${dish.amharicName || ""} (${priceLabel}) | Addis Eats`,
      description: dish.description,
      type: "article",
    },
  };
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
    amharicName: dish.amharicName,
    price: dish.price,
    emoji: dish.emoji,
    category: dish.category
  };

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "MenuItem",
    name: dish.name,
    alternateName: dish.amharicName,
    description: dish.description,
    image: `https://addiseats.com${dish.image || "/images/doro-wat.svg"}`,
    offers: {
      "@type": "Offer",
      price: String(dish.price),
      priceCurrency: "ETB"
    },
    suitableForDiet:
      dish.category === "Vegetarian"
        ? "https://schema.org/VegetarianDiet"
        : undefined,
    menuAddOn: dish.ingredients?.map((ing) => ({
      "@type": "MenuItem",
      name: ing
    }))
  };

  return (
    <div className="flex flex-col flex-1 px-4 sm:px-6 lg:px-8 py-10 max-w-4xl mx-auto w-full">
      {/* Schema.org MenuItem JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

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
        {/* Dish Hero Image with real dimensions, honest sizes, and route-specific priority */}
        <div className="relative w-full h-64 sm:h-84 rounded-3xl overflow-hidden mb-8 bg-stone-100 border border-stone-100 shadow-sm">
          <Image
            src={dish.image || "/images/doro-wat.svg"}
            alt={`${dish.name} - ${dish.amharicName || ""}`}
            width={800}
            height={500}
            sizes="(max-width: 768px) 100vw, 768px"
            priority
            className="w-full h-full object-cover"
          />
          <span className="absolute top-4 left-4 text-3xl p-3 bg-white/95 backdrop-blur-xs rounded-2xl shadow-sm">
            {dish.emoji}
          </span>
          {dish.rating && (
            <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-xs px-3 py-1.5 rounded-2xl shadow-sm flex items-center gap-1.5 text-xs font-black text-stone-800">
              <span className="text-amber-500">⭐</span>
              <span>{dish.rating}</span>
              <span className="text-stone-400 font-normal">({dish.reviewsCount} reviews)</span>
            </div>
          )}
        </div>

        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-6 border-b border-stone-100">
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-orange-50 border border-orange-200 text-orange-800">
                {dish.category}
              </span>
              {dish.dietary?.map((tag) => (
                <span
                  key={tag}
                  className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-stone-100 text-stone-600"
                >
                  {tag}
                </span>
              ))}
            </div>
            <h1 className="text-3xl sm:text-4xl font-black text-stone-900 mt-2">
              {dish.name}
              {dish.amharicName && (
                <span className="ml-3 text-2xl font-bold text-orange-600/80">
                  ({dish.amharicName})
                </span>
              )}
            </h1>
          </div>

          <div className="flex flex-col items-start md:items-end">
            <span className="text-xs text-stone-500 uppercase tracking-wider font-semibold">Price per order</span>
            <span className="text-3xl font-black text-orange-600 mt-1">
              {etb(dish.price)}
            </span>
          </div>
        </div>

        {/* Info Pills */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 my-6 text-center">
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
          <div className="p-4 bg-orange-50/50 rounded-2xl border border-orange-100">
            <span className="text-xs text-stone-500 font-medium block">Energy</span>
            <span className="text-sm font-bold text-stone-800 mt-0.5 block">🔥 {dish.calories || "500 kcal"}</span>
          </div>
        </div>

        {/* Description */}
        <div className="my-6">
          <h2 className="text-xs uppercase tracking-wider font-bold text-stone-400 mb-2">About This Dish</h2>
          <p className="text-stone-700 leading-relaxed text-base">
            {dish.description}
          </p>
        </div>

        {/* Chef Tip */}
        {dish.chefTip && (
          <div className="my-6 p-4 rounded-2xl bg-amber-50/70 border border-amber-200/80 flex items-start gap-3 text-sm text-amber-900">
            <span className="text-xl">👨‍🍳</span>
            <div>
              <strong className="font-bold">Addis Eats Chef Recommendation:</strong>
              <p className="mt-0.5 text-xs sm:text-sm text-amber-800/90">{dish.chefTip}</p>
            </div>
          </div>
        )}

        {/* Ingredients */}
        <div className="my-6">
          <h2 className="text-xs uppercase tracking-wider font-bold text-stone-400 mb-2">Authentic Ingredients</h2>
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

        {/* Customer Reviews Section */}
        {dish.reviews && dish.reviews.length > 0 && (
          <div className="my-8 pt-6 border-t border-stone-100">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-sm uppercase tracking-wider font-bold text-stone-700">
                Customer Reviews from Addis Ababa
              </h2>
              <span className="text-xs text-stone-500">Verified orders</span>
            </div>
            <div className="space-y-3">
              {dish.reviews.map((rev, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-2xl bg-stone-50/70 border border-stone-200/60"
                >
                  <div className="flex items-center justify-between mb-1 text-xs">
                    <span className="font-bold text-stone-800">{rev.name}</span>
                    <span className="text-stone-400">{rev.date}</span>
                  </div>
                  <div className="flex items-center gap-1 text-xs text-amber-500 mb-1.5">
                    {"★".repeat(rev.rating)}
                  </div>
                  <p className="text-xs text-stone-600 leading-relaxed italic">
                    &ldquo;{rev.comment}&rdquo;
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

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
