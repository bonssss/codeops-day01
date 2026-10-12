import Link from "next/link";
import Image from "next/image";
import { getDishes, DELIVERY_ZONES } from "@/lib/data";
import { etb } from "@/lib/format";

export const metadata = {
  title: "Authentic Ethiopian Food Delivery in Addis Ababa",
  description:
    "Order handcrafted Doro Wat, sizzling Shekla Tibs, rich Shiro, fresh Kitfo, and organic vegetarian combos delivered hot to your door in Addis Ababa in under 35 minutes.",
};

export default function Home() {
  const allDishes = getDishes();
  const popularDishes = allDishes.slice(0, 4);

  const highlights = [
    {
      title: "100% Authentic Recipes",
      desc: "Slow-simmered with organic berbere, herbal niter kibbeh, and teff injera.",
      icon: "🌶️",
      tag: "Pure Tradition",
    },
    {
      title: "Hot Doorstep Delivery",
      desc: "Dispatched from central Addis kitchen hubs across Bole, Kazanchis, CMC & beyond.",
      icon: "🛵",
      tag: "Avg. 25-35 Mins",
    },
    {
      title: "Local Mobile Payments",
      desc: "Instant seamless checkout with Telebirr, CBE Birr, or Cash on Delivery.",
      icon: "📱",
      tag: "Telebirr & CBE",
    },
  ];

  return (
    <div className="flex flex-col flex-1">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-orange-100/60 via-amber-50/40 to-transparent">
        <div className="max-w-5xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-orange-200 text-orange-800 text-xs font-bold mb-6 shadow-xs">
            <span className="text-orange-600">✨ Addis Ababa&apos;s Premier Habesha Kitchen</span>
            <span>•</span>
            <span className="text-stone-500 font-medium">Order Online with Telebirr & CBE</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-black tracking-tight text-stone-900 mb-6 leading-tight">
            Authentic Ethiopian Cuisine, <br className="hidden sm:inline" />
            <span className="bg-gradient-to-r from-orange-600 via-amber-600 to-red-600 bg-clip-text text-transparent">
              Fresh & Steaming to Your Door
            </span>
          </h1>

          <p className="text-lg sm:text-xl text-stone-600 max-w-2xl mx-auto mb-10 leading-relaxed font-normal">
            Savor slow-simmered <strong>Doro Wat</strong>, sizzling clay-pot <strong>Shekla Tibs</strong>, velvety <strong>Shiro Tegabino</strong>, and grand <strong>Beyaynetu</strong> with 100% pure teff injera.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              href="/menu"
              className="w-full sm:w-auto px-8 py-4 bg-orange-600 hover:bg-orange-700 text-white font-bold rounded-2xl shadow-md shadow-orange-600/25 hover:shadow-orange-600/35 hover:-translate-y-0.5 transition duration-200 text-center flex items-center justify-center gap-2 min-h-[44px]"
            >
              <span>Explore Our Menu</span>
              <span>🍲</span>
            </Link>
            <Link
              href="/order-status"
              className="w-full sm:w-auto px-8 py-4 bg-white text-stone-800 font-bold rounded-2xl border border-stone-200/90 shadow-xs hover:bg-stone-50 hover:border-orange-300 transition text-center flex items-center justify-center gap-2 min-h-[44px]"
            >
              <span>🛵</span>
              <span>Track Live Delivery</span>
            </Link>
          </div>

          {/* Hero Ethiopian Feast Visual */}
          <div className="relative w-full max-w-3xl mx-auto mt-12 rounded-3xl overflow-hidden shadow-xl border border-stone-200/80 bg-stone-900 group">
            <Image
              src="/images/hero-feast.svg"
              alt="Authentic Addis Ababa Ethiopian Feast"
              width={1200}
              height={800}
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 90vw, 768px"
              priority
              className="w-full h-auto object-cover group-hover:scale-102 transition-transform duration-500"
            />
          </div>
        </div>
      </section>

      {/* Feature Highlights */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto w-full">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {highlights.map((item, idx) => (
            <div
              key={idx}
              className="p-8 rounded-3xl bg-white border border-stone-200/70 shadow-xs hover:shadow-md hover:border-orange-200 transition group flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-4xl p-3 bg-orange-50 rounded-2xl border border-orange-100">
                    {item.icon}
                  </span>
                  <span className="text-[11px] font-bold uppercase tracking-wider px-3 py-1 bg-stone-100 text-stone-600 rounded-full">
                    {item.tag}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-stone-900 mb-2 group-hover:text-orange-600 transition">
                  {item.title}
                </h3>
                <p className="text-sm text-stone-500 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Popular Dishes Preview Section */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto w-full">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <span className="text-xs font-bold text-orange-600 uppercase tracking-wider">
              Chef Specials
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-stone-900 mt-1">
              Top Customer Favorites in Addis
            </h2>
          </div>
          <Link
            href="/menu"
            className="text-sm font-bold text-orange-600 hover:text-orange-700 flex items-center gap-1"
          >
            View Full Menu ({allDishes.length} Dishes) &rarr;
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {popularDishes.map((dish) => (
            <Link
              key={dish.id}
              href={`/menu/${dish.id}`}
              className="group bg-white rounded-3xl p-5 border border-stone-200/80 shadow-xs hover:shadow-lg hover:border-orange-300 transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="relative w-full h-40 rounded-2xl overflow-hidden mb-4 bg-stone-100 border border-stone-100">
                  <Image
                    src={dish.image || "/images/doro-wat.svg"}
                    alt={dish.name}
                    width={400}
                    height={300}
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <span className="absolute top-2.5 left-2.5 text-2xl p-1.5 bg-white/90 backdrop-blur-xs rounded-xl shadow-xs">
                    {dish.emoji}
                  </span>
                  {dish.rating && (
                    <span className="absolute bottom-2.5 left-2.5 text-[10px] font-bold px-2 py-0.5 rounded-md bg-stone-900/80 text-white">
                      ⭐ {dish.rating}
                    </span>
                  )}
                </div>

                <div className="flex items-start justify-between gap-2 mb-1">
                  <h3 className="text-base font-bold text-stone-900 group-hover:text-orange-600 transition truncate">
                    {dish.name}
                  </h3>
                </div>
                {dish.amharicName && (
                  <span className="text-xs text-stone-400 font-medium block mb-2">
                    {dish.amharicName}
                  </span>
                )}
                <p className="text-xs text-stone-500 line-clamp-2 leading-relaxed">
                  {dish.description}
                </p>
              </div>

              <div className="pt-3 mt-3 border-t border-stone-100 flex items-center justify-between">
                <span className="text-sm font-black text-orange-600">
                  {etb(dish.price)}
                </span>
                <span className="text-xs font-bold text-stone-700 group-hover:text-orange-600 transition">
                  Order &rarr;
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Addis Ababa Delivery Zones Badge Bar */}
      <section className="py-10 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto w-full">
        <div className="bg-stone-900 text-white rounded-3xl p-8 sm:p-10 shadow-lg">
          <div className="max-w-2xl">
            <span className="text-xs font-bold text-orange-400 uppercase tracking-widest">
              Fast Delivery Logistics
            </span>
            <h2 className="text-2xl sm:text-3xl font-black tracking-tight mt-1 mb-3">
              Serving All Major Sub-Cities in Addis Ababa
            </h2>
            <p className="text-sm text-stone-400 mb-6 leading-relaxed">
              Equipped with specialized thermal containers ensuring your injera, stews, and sizzling tibs arrive fresh and steaming hot.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
            {DELIVERY_ZONES.map((zone) => (
              <div
                key={zone.id}
                className="p-3.5 rounded-2xl bg-stone-800/80 border border-stone-700/60"
              >
                <strong className="text-stone-200 block truncate">{zone.name.split("(")[0]}</strong>
                <span className="text-orange-400 font-mono font-semibold block mt-0.5">{etb(zone.fee)} delivery</span>
                <span className="text-[10px] text-stone-400 block">Est. {zone.estimatedMins} min</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
