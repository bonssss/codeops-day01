import Link from "next/link";

export default function Home() {
  const highlights = [
    {
      title: "Authentic Recipes",
      desc: "Handcrafted with organic berbere, herbal niter kibbeh, and fresh spices.",
      icon: "🌶️",
      tag: "100% Traditional",
    },
    {
      title: "Fast Local Delivery",
      desc: "Hot and steaming dishes delivered across Addis Ababa in under 35 minutes.",
      icon: "🛵",
      tag: "Average 28 Mins",
    },
    {
      title: "Master Chefs",
      desc: "4.9/5 stars from over 14,000 satisfied food enthusiasts in the city.",
      icon: "👨‍🍳",
      tag: "Top Rated",
    },
  ];

  return (
    <div className="flex flex-col flex-1">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-orange-100/60 via-amber-50/40 to-transparent">
        <div className="max-w-5xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-orange-200 text-orange-800 text-xs font-bold mb-6 shadow-xs">
            <span className="text-orange-600">✨ Addis Ababa&apos;s Best Ethiopian Cuisine</span>
            <span>•</span>
            <span className="text-stone-500 font-medium">Order Online Now</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-black tracking-tight text-stone-900 mb-6 leading-tight">
            Delicious Ethiopian Food, <br className="hidden sm:inline" />
            <span className="bg-gradient-to-r from-orange-600 via-amber-600 to-red-600 bg-clip-text text-transparent">
              Fresh to Your Table
            </span>
          </h1>

          <p className="text-lg sm:text-xl text-stone-600 max-w-2xl mx-auto mb-10 leading-relaxed font-normal">
            Enjoy authentic <strong>Doro Wat</strong>, sizzling <strong>Tibs</strong>, creamy <strong>Shiro</strong>, and savory <strong>Misir</strong> made fresh with warm injera.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              href="/menu"
              className="w-full sm:w-auto px-8 py-4 bg-orange-600 hover:bg-orange-700 text-white font-bold rounded-2xl shadow-md shadow-orange-600/25 hover:shadow-orange-600/35 hover:-translate-y-0.5 transition duration-200 text-center flex items-center justify-center gap-2"
            >
              <span>Explore Our Menu</span>
              <span>🍲</span>
            </Link>
            <Link
              href="/cart"
              className="w-full sm:w-auto px-8 py-4 bg-white text-stone-800 font-bold rounded-2xl border border-stone-200/90 shadow-xs hover:bg-stone-50 hover:border-orange-300 transition text-center flex items-center justify-center gap-2"
            >
              <span>🛒</span>
              <span>View Shopping Cart</span>
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
    </div>
  );
}
