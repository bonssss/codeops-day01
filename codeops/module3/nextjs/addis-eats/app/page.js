import Link from "next/link";

export default function Home() {
  const highlights = [
    { title: "Authentic Recipes", desc: "Crafted with handpicked berbere and organic Ethiopian spices.", icon: "🌶️" },
    { title: "Fast Delivery", desc: "Fresh & hot delivery right to your door in under 35 minutes.", icon: "⚡" },
    { title: "Top Rated Chefs", desc: "4.9/5 stars from over 12,000 satisfied food lovers across Addis.", icon: "⭐" },
  ];

  return (
    <div className="flex flex-col flex-1">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-amber-500/10 via-transparent to-transparent">
        <div className="max-w-5xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-100 dark:bg-amber-950/70 border border-amber-300 dark:border-amber-800 text-amber-900 dark:text-amber-300 text-xs font-semibold mb-6 shadow-sm">
            <span>✨ Freshly Prepared Daily</span>
            <span>•</span>
            <span className="text-amber-700 dark:text-amber-400">Order Online Now</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-black tracking-tight text-stone-900 dark:text-white mb-6 leading-tight">
            Authentic Taste of Addis, <br className="hidden sm:inline" />
            <span className="bg-gradient-to-r from-amber-600 via-orange-600 to-red-600 bg-clip-text text-transparent">
              Delivered To Your Door
            </span>
          </h1>

          <p className="text-lg sm:text-xl text-stone-600 dark:text-stone-300 max-w-2xl mx-auto mb-10 leading-relaxed">
            From mouthwatering <strong>Doro Wat</strong> and sizzling <strong>Tibs</strong> to savory <strong>Shiro</strong>, experience the culinary heritage of Ethiopia.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              href="/menu"
              className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white font-bold rounded-xl shadow-lg shadow-amber-600/30 hover:shadow-amber-600/40 hover:-translate-y-0.5 transition duration-200 text-center"
            >
              Explore Full Menu 🍛
            </Link>
            <Link
              href="/cart"
              className="w-full sm:w-auto px-8 py-4 bg-white dark:bg-stone-900 text-stone-800 dark:text-stone-200 font-semibold rounded-xl border border-stone-200 dark:border-stone-800 shadow-sm hover:bg-stone-50 dark:hover:bg-stone-800/80 transition text-center flex items-center justify-center gap-2"
            >
              <span>🛒</span> View Cart (2 Items)
            </Link>
          </div>
        </div>
      </section>

      {/* Feature Highlights */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto w-full">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {highlights.map((item, idx) => (
            <div
              key={idx}
              className="p-6 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200/80 dark:border-stone-800 shadow-sm hover:shadow-md transition group"
            >
              <div className="text-3xl mb-3">{item.icon}</div>
              <h3 className="text-lg font-bold text-stone-900 dark:text-stone-100 mb-1 group-hover:text-amber-600 transition">
                {item.title}
              </h3>
              <p className="text-sm text-stone-500 dark:text-stone-400 leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
