// lib/data.js
import { etb } from "./format";

export const DELIVERY_ZONES = [
  { id: "bole", name: "Bole (Atlas, Edna Mall, Medhanialem, Rwanda)", fee: 50, estimatedMins: "25-35" },
  { id: "kazanchis", name: "Kazanchis / Kirkos (UNECA, Bambis, Interluxury)", fee: 50, estimatedMins: "20-30" },
  { id: "piassa", name: "Piassa / Arat Kilo / Churchill Ave", fee: 60, estimatedMins: "30-40" },
  { id: "sarbet", name: "Sarbet / Old Airport / Bisrate Gabriel", fee: 60, estimatedMins: "30-45" },
  { id: "megenagna", name: "Megenagna / Gerji / Hayahulet", fee: 65, estimatedMins: "30-40" },
  { id: "cmc", name: "CMC / Ayat / Summit (Tsehay Real Estate)", fee: 80, estimatedMins: "40-55" },
  { id: "lideta", name: "Lideta / Mexico / Gotera", fee: 60, estimatedMins: "25-35" },
];

export const PROMO_CODES = {
  "ADDIS2026": { discountType: "fixed", amount: 100, minOrder: 400, description: "100 ETB off Addis Eats launch special" },
  "HABESHA10": { discountType: "percent", amount: 10, minOrder: 300, description: "10% off your authentic feast" },
  "ENKUTATASH": { discountType: "fixed", amount: 150, minOrder: 800, description: "150 ETB off celebration orders" },
};

export const dishes = [
  {
    id: 1,
    name: "Doro Wat",
    amharicName: "ዶሮ ወጥ",
    price: 680,
    formattedPrice: "680 ETB",
    category: "Traditional",
    spice: "🌶️🌶️🌶️ Fiery",
    time: "35-45 min",
    servings: "1-2 People",
    calories: "620 kcal",
    rating: 4.9,
    reviewsCount: 194,
    emoji: "🍗",
    image: "/images/doro-wat.svg",
    dietary: ["Halal", "Traditional", "Protein-Rich"],
    ingredients: [
      "Free-range Country Chicken",
      "Authentic Berebera Chili Blend",
      "Spiced Butter (Niter Kibbeh)",
      "Slow-caramelized Shallots",
      "Farm Hard-boiled Eggs",
      "Fresh Teff Injera"
    ],
    description: "The undisputed crown jewel of Ethiopian culinary tradition. Tender country chicken slow-simmered for four hours in deeply caramelized onions, aromatic berbere, and herbal niter kibbeh, garnished with seasoned hard-boiled eggs and served with spongy teff injera.",
    chefTip: "Tear a piece of injera to wrap both a piece of tender chicken and egg with a generous scoop of the dark red sauce.",
    reviews: [
      { name: "Dawit Bekele", rating: 5, date: "Oct 10, 2026", comment: "The berbere flavor is deep, rich, and perfectly simmered like my grandmother's holiday stew!" },
      { name: "Sara Tefera", rating: 5, date: "Oct 8, 2026", comment: "Came boiling hot to Bole Atlas in 28 minutes. Eggs were thoroughly infused with the gravy." }
    ]
  },
  {
    id: 2,
    name: "Shiro Tegabino",
    amharicName: "ሽሮ ተጋቢኖ",
    price: 380,
    formattedPrice: "380 ETB",
    category: "Vegetarian",
    spice: "🌶️ Mild & Savory",
    time: "20-25 min",
    servings: "1-2 People",
    calories: "450 kcal",
    rating: 4.85,
    reviewsCount: 162,
    emoji: "🍲",
    image: "/images/shiro-wat.svg",
    dietary: ["Vegan", "Fasting / Yetsom", "Gluten-Free Teff"],
    ingredients: [
      "Sun-roasted Ground Chickpeas & Broad Beans",
      "Fresh Minced Garlic & Ginger",
      "Ethiopian Cardamom & Holy Basil",
      "Cold-pressed Niger Seed Oil",
      "Fresh Teff Injera"
    ],
    description: "Ethiopia's quintessential comfort stew. Velvety, rich chickpea flour simmered vigorously with garlic, ginger, and highland herbs. Served boiling hot in a traditional earthen clay pot with warm teff injera.",
    chefTip: "Stir gently while it's bubbling and dip fresh injera rolls directly into the clay pot center.",
    reviews: [
      { name: "Almaz Hailu", rating: 5, date: "Oct 9, 2026", comment: "Best fasting Shiro in Addis! Thick consistency and not watered down." }
    ]
  },
  {
    id: 3,
    name: "Special Beef Tibs",
    amharicName: "የበሬ ጥብስ",
    price: 620,
    formattedPrice: "620 ETB",
    category: "Sautéed",
    spice: "🌶️🌶️ Medium",
    time: "20-25 min",
    servings: "1-2 People",
    calories: "580 kcal",
    rating: 4.92,
    reviewsCount: 220,
    emoji: "🥩",
    image: "/images/beef-tibs.svg",
    dietary: ["Halal", "Keto-Friendly", "High Protein"],
    ingredients: [
      "Prime Beef Tenderloin Cubes",
      "Fresh Entoto Rosemary Sprigs",
      "Sliced Sweet Red Onions",
      "Crisp Green Jalapeños (Karia)",
      "Traditional Awaze Chili Dip"
    ],
    description: "Tender cubes of prime highland beef flash-seared over scorching heat with sweet red onions, crisp jalapeños, and fragrant freshly picked rosemary sprigs. Served with warm injera, side awaze paste, and mitmita.",
    chefTip: "Dip each piece into the side awaze paste before wrapping in injera for an explosion of peppery heat.",
    reviews: [
      { name: "Kidus Girma", rating: 5, date: "Oct 11, 2026", comment: "Tender meat, no gristle, and the rosemary aroma hit me as soon as I opened the container." }
    ]
  },
  {
    id: 4,
    name: "Kitfo Special",
    amharicName: "ልዩ ክትፎ",
    price: 750,
    formattedPrice: "750 ETB",
    category: "Delicacies",
    spice: "🌶️🌶️🌶️ Fiery",
    time: "15-20 min",
    servings: "1-2 People",
    calories: "690 kcal",
    rating: 4.95,
    reviewsCount: 275,
    emoji: "🥘",
    image: "/images/kitfo.svg",
    dietary: ["Gurage Specialty", "High Protein", "Traditional"],
    ingredients: [
      "Finely Minced Prime Lean Beef",
      "Pure Spiced Clarified Butter (Niter Kibbeh)",
      "Highland Mitmita Chili Powder",
      "Homemade Ayib (Cottage Cheese)",
      "Slow-braised Gomen (Collard Greens)",
      "Kocho (False Banana Bread) & Injera"
    ],
    description: "A celebrated Gurage delicacy of exquisite lean beef finely minced and gently warmed in fragrant spiced clarified butter and hot mitmita. Served with fluffy ayib cottage cheese, seasoned gomen, and traditional toasted kocho.",
    chefTip: "Can be ordered Leb-Leb (lightly warmed) or Yebesele (fully cooked) depending on your taste.",
    reviews: [
      { name: "Yonas Mulugeta", rating: 5, date: "Oct 10, 2026", comment: "Authentic niter kibbeh fragrance! The side ayib cuts through the mitmita spice wonderfully." }
    ]
  },
  {
    id: 5,
    name: "Misir Wot",
    amharicName: "የምስር ወጥ",
    price: 360,
    formattedPrice: "360 ETB",
    category: "Vegetarian",
    spice: "🌶️🌶️ Medium",
    time: "20-25 min",
    servings: "1 Person",
    calories: "410 kcal",
    rating: 4.8,
    reviewsCount: 118,
    emoji: "🥣",
    image: "/images/misir-wot.svg",
    dietary: ["Vegan", "Fasting / Yetsom", "Fiber-Rich"],
    ingredients: [
      "Organic Ethiopian Red Split Lentils",
      "Artisanal Berbere Chili Paste",
      "Minced Shallots & Mountain Garlic",
      "Sunflower Seed Oil",
      "Fresh Teff Injera"
    ],
    description: "Hearty red split lentils slow-simmered in a savory, aromatic berbere sauce with caramelized onions and garlic. An essential staple of Ethiopian fasting culture with satisfying texture and complex warmth.",
    chefTip: "Pairs excellently alongside Shiro and Gomen for a balanced plant-based meal.",
    reviews: [
      { name: "Bethlehem Tadesse", rating: 5, date: "Oct 7, 2026", comment: "Lentils are tender and buttery without being mushy. Great spice balance." }
    ]
  },
  {
    id: 6,
    name: "Shekla Tibs",
    amharicName: "የሸክላ ጥብስ",
    price: 690,
    formattedPrice: "690 ETB",
    category: "Sautéed",
    spice: "🌶️🌶️ Medium",
    time: "25-30 min",
    servings: "1-2 People",
    calories: "640 kcal",
    rating: 4.94,
    reviewsCount: 188,
    emoji: "🔥",
    image: "/images/shekla-tibs.svg",
    dietary: ["Halal", "High Protein", "Chef Signature"],
    ingredients: [
      "Prime Ribeye Beef Cubes",
      "Traditional Clay Pot Heating Embers",
      "Caramelized Red Onions",
      "Fresh Rosemary & Garlic",
      "Sliced Green Chilies & Awaze"
    ],
    description: "The pride of Addis Ababa evenings. Sizzling prime beef cubes served directly in a traditional earthen shekla pot kept sizzling over warm coals with onions, rosemary, and green jalapeños.",
    chefTip: "The meat continues to develop crispy edges as it sits in the clay dish.",
    reviews: [
      { name: "Tewodros Kassahun", rating: 5, date: "Oct 9, 2026", comment: "Arrived sizzling hot! You can taste the genuine clay pot sear." }
    ]
  },
  {
    id: 7,
    name: "Beyaynetu / Fasting Platter",
    amharicName: "የጾም በያይነቱ",
    price: 550,
    formattedPrice: "550 ETB",
    category: "Vegetarian",
    spice: "🌶️ Mixed Varieties",
    time: "20-25 min",
    servings: "2 People",
    calories: "680 kcal",
    rating: 4.98,
    reviewsCount: 310,
    emoji: "🍱",
    image: "/images/beyaynetu.svg",
    dietary: ["100% Vegan", "Fasting / Yetsom", "Sampler Feast"],
    ingredients: [
      "Shiro Tegabino",
      "Misir Wot (Spicy Red Lentils)",
      "Kik Alicha (Yellow Split Peas)",
      "Gomen (Braised Collards)",
      "Atkilt (Cabbage, Carrots & Potatoes)",
      "Fosolia (Green Beans)",
      "Timatim Salata (Tomato & Onion Salad)",
      "3 Rolls of 100% Pure Teff Injera"
    ],
    description: "A breathtaking colorful kaleidoscope of authentic Ethiopian fasting dishes artistically arranged on a massive teff injera. Features 7 distinct savory stews, lentils, braised greens, and crisp salads.",
    chefTip: "The ultimate sharing feast for friends or families who want to taste every vegetable creation on one platter.",
    reviews: [
      { name: "Meron Assefa", rating: 5, date: "Oct 11, 2026", comment: "Generous portions, vibrant colors, and every stew has its own unique spice profile." }
    ]
  },
  {
    id: 8,
    name: "Derek Tibs",
    amharicName: "ደረቅ ጥብስ",
    price: 640,
    formattedPrice: "640 ETB",
    category: "Sautéed",
    spice: "🌶️🌶️ Medium Hot",
    time: "20-25 min",
    servings: "1-2 People",
    calories: "610 kcal",
    rating: 4.88,
    reviewsCount: 145,
    emoji: "🥓",
    image: "/images/derek-tibs.svg",
    dietary: ["Halal", "Crispy", "High Protein"],
    ingredients: [
      "Highland Beef Sirloin Strips",
      "Clarified Niter Kibbeh",
      "Charred Sweet Red Onions",
      "Mitmita & Awaze Dips",
      "Crisp Jalapeño Rounds"
    ],
    description: "Crispy, pan-fried well-done beef cubes seasoned with sea salt, black pepper, and mitmita. Cooked until delightfully crunchy on the outside while tender inside, served with hot awaze sauce.",
    chefTip: "Perfect with cold Ethiopian draught beer or soda.",
    reviews: [
      { name: "Henok Berhanu", rating: 5, date: "Oct 6, 2026", comment: "Crispy and savory without feeling dry. The awaze dip is top tier." }
    ]
  },
  {
    id: 9,
    name: "Yebeg Wot",
    amharicName: "የበግ ወጥ",
    price: 720,
    formattedPrice: "720 ETB",
    category: "Traditional",
    spice: "🌶️🌶️ Medium-High",
    time: "35-40 min",
    servings: "1-2 People",
    calories: "670 kcal",
    rating: 4.91,
    reviewsCount: 132,
    emoji: "🍖",
    image: "/images/yebeg-wot.svg",
    dietary: ["Halal", "High Protein", "Traditional Feast"],
    ingredients: [
      "Highland Debre Berhan Lamb Chunks",
      "Slow-stewed Red Berbere Sauce",
      "Niter Kibbeh with Korarima Cardamom",
      "Braised Shallots & Garlic",
      "Fresh Teff Injera"
    ],
    description: "Tender chunks of pasture-raised highland lamb slow-braised until falling off the bone in a rich, velvety berbere sauce fragrant with korarima cardamom, ginger, and spiced butter.",
    chefTip: "The bone marrow infuses the sauce with unforgettable richness.",
    reviews: [
      { name: "Fasika Getachew", rating: 5, date: "Oct 8, 2026", comment: "Lamb is so tender it melts in your mouth. Truly restaurant-quality braise." }
    ]
  },
  {
    id: 10,
    name: "Gomen Wat",
    amharicName: "የጎመን ወጥ",
    price: 320,
    formattedPrice: "320 ETB",
    category: "Vegetarian",
    spice: "🌶️ Mild & Herby",
    time: "15-20 min",
    servings: "1 Person",
    calories: "280 kcal",
    rating: 4.78,
    reviewsCount: 96,
    emoji: "🥬",
    image: "/images/gomen-wot.svg",
    dietary: ["Vegan", "Fasting / Yetsom", "Iron-Rich"],
    ingredients: [
      "Fresh Mountain Collard Greens",
      "Ginger Root & Crushed Garlic",
      "Green Chili Peppers",
      "Cold-pressed Seed Oil",
      "Fresh Teff Injera"
    ],
    description: "Finely chopped fresh Ethiopian collard greens gently braised with minced ginger, garlic, and sliced sweet peppers. Mild, deeply nutritious, and packed with garden-fresh flavor.",
    chefTip: "A wonderful cooling contrast when eaten alongside spicy Doro Wat or Tibs.",
    reviews: [
      { name: "Selamawit Alemu", rating: 5, date: "Oct 5, 2026", comment: "Fresh, tender greens without excessive oil. Perfect light dinner." }
    ]
  },
  {
    id: 11,
    name: "Kik Alicha",
    amharicName: "የክክ አልጫ",
    price: 340,
    formattedPrice: "340 ETB",
    category: "Vegetarian",
    spice: "🌶️ Mild / Non-Spicy",
    time: "15-20 min",
    servings: "1 Person",
    calories: "380 kcal",
    rating: 4.82,
    reviewsCount: 104,
    emoji: "🍛",
    image: "/images/kik-alicha.svg",
    dietary: ["Vegan", "Fasting / Yetsom", "Mild Palate"],
    ingredients: [
      "Organic Yellow Split Peas",
      "Earthy Turmeric Root",
      "Minced Garlic & Ginger",
      "Caramelized White Onions",
      "Fresh Teff Injera"
    ],
    description: "A soothing, golden stew made from yellow split peas simmered gently with fresh turmeric, ginger, and sweet onions. Naturally mild and subtly spiced, beloved by children and adults alike.",
    chefTip: "Great choice for those who love authentic Ethiopian flavor without red chili heat.",
    reviews: [
      { name: "Rahel Mengistu", rating: 5, date: "Oct 7, 2026", comment: "Creamy, golden, and comforting. Exactly the taste of Sunday home cooking." }
    ]
  },
  {
    id: 12,
    name: "Chechebsa / Kita Firfir",
    amharicName: "ጨጨብሳ",
    price: 350,
    formattedPrice: "350 ETB",
    category: "Breakfast",
    spice: "🌶️ Mild & Sweet Spiced",
    time: "15-20 min",
    servings: "1-2 People",
    calories: "520 kcal",
    rating: 4.96,
    reviewsCount: 215,
    emoji: "🥞",
    image: "/images/chechebsa.svg",
    dietary: ["Vegetarian", "Traditional Breakfast", "Honey-Glazed"],
    ingredients: [
      "Pan-baked Shredded Flatbread (Kita)",
      "Warm Clarified Spiced Butter (Niter Kibbeh)",
      "Pure Ethiopian Forest Honey",
      "A Hint of Mild Berbere",
      "Fresh Ergo (Ethiopian Yogurt)"
    ],
    description: "Addis Ababa's favorite morning wake-up feast. Torn pan-baked wheat flatbread pan-tossed in melted herbal spiced butter, a whisper of berbere, and drizzled with golden amber honey. Served with creamy side yogurt.",
    chefTip: "Enjoy hot in the morning with a steaming cup of freshly brewed Ethiopian spiced tea or coffee.",
    reviews: [
      { name: "Biniyam Tesfaye", rating: 5, date: "Oct 11, 2026", comment: "The sweet honey and savory niter kibbeh combination is unbeatable in the morning!" }
    ]
  },
  {
    id: 13,
    name: "Buna Ceremony Set",
    amharicName: "የኢትዮጵያ ቡና",
    price: 160,
    formattedPrice: "160 ETB",
    category: "Beverages",
    spice: "☕ Aromatic Coffee",
    time: "15 min",
    servings: "1-3 People",
    calories: "15 kcal",
    rating: 4.97,
    reviewsCount: 260,
    emoji: "☕",
    image: "/images/buna-ceremony.svg",
    dietary: ["Organic Highland Arabica", "Antioxidant-Rich"],
    ingredients: [
      "Freshly Pan-roasted Yirgacheffe Arabica Beans",
      "Brewed in Black Earthenware Jebena",
      "Sprig of Rue (Tena Adam)",
      "Bowl of Hot Salted Popcorn (Fendisha)",
      "Traditional Porcelain Cups (Cini)"
    ],
    description: "An authentic mini Ethiopian coffee ceremony experience delivered to your doorstep. Freshly pan-roasted single-origin Yirgacheffe coffee brewed in a traditional black clay jebena, accompanied by fragrant tena adam and crunchy popcorn.",
    chefTip: "Pour from high above the cup for the authentic frothy highland crema.",
    reviews: [
      { name: "Ruth Solomon", rating: 5, date: "Oct 9, 2026", comment: "Arrived piping hot in a thermo flask with the popcorn still crunchy. Pure joy!" }
    ]
  },
  {
    id: 14,
    name: "Addis Spris Juice",
    amharicName: "ስፕሪስ ጁስ",
    price: 180,
    formattedPrice: "180 ETB",
    category: "Beverages",
    spice: "🍹 Fresh & Fruity",
    time: "10 min",
    servings: "1 Person",
    calories: "220 kcal",
    rating: 4.92,
    reviewsCount: 178,
    emoji: "🍹",
    image: "/images/spris-juice.svg",
    dietary: ["100% Pure Fruit", "No Added Sugar", "Vegan"],
    ingredients: [
      "Creamy Fresh Avocado Purée",
      "Ripe Hawassa Sweet Mango",
      "Sun-ripened Tropical Papaya",
      "Fresh Squeezed Lime Juice",
      "Vimto Drizzle"
    ],
    description: "The iconic multi-colored layered juice of Addis Ababa's juice houses. Decadent layers of freshly blended ripe avocado, sweet golden mango, and ruby papaya served ice-cold with fresh lime.",
    chefTip: "Eat the top layer with a spoon before sipping the mango and avocado blends together.",
    reviews: [
      { name: "Natnael Fikru", rating: 5, date: "Oct 10, 2026", comment: "Super thick and fresh, exactly like the famous juice bars in Kazanchis." }
    ]
  },
  {
    id: 15,
    name: "Pure Honey Tej",
    amharicName: "ማር ጠጅ",
    price: 350,
    formattedPrice: "350 ETB",
    category: "Beverages",
    spice: "🍯 Sweet & Fermented",
    time: "Instant",
    servings: "1 Flask (500ml)",
    calories: "320 kcal",
    rating: 4.89,
    reviewsCount: 140,
    emoji: "🍯",
    image: "/images/honey-tej.svg",
    dietary: ["Traditional Fermented", "100% Pure Honey", "Artisanal"],
    ingredients: [
      "Organic Ethiopian Highland Raw Honey",
      "Gesho Leaves & Stems (Rhamnus prinoides)",
      "Mountain Spring Water"
    ],
    description: "Centuries-old Ethiopian artisanal honey wine. Golden, slightly effervescent, and naturally fermented with gesho hops and wild mountain honey. Delivered in a sealed traditional glass flask.",
    chefTip: "Best enjoyed chilled alongside sizzling beef tibs or spicy kitfo.",
    reviews: [
      { name: "Ermias Negash", rating: 5, date: "Oct 6, 2026", comment: "Real honey sweetness with a clean herbal punch from the gesho. Top quality!" }
    ]
  }
];

// Initial seed orders dataset with realistic dates across Oct 2026 and ETB currency
const initialOrdersSeed = [
  {
    id: "AE-10025",
    name: "Abebe Kebede",
    address: "Bole Sub-City, Near Edna Mall, Addis Ababa",
    deliveryZone: "bole",
    phone: "+251 91 123 4567",
    paymentMethod: "telebirr",
    items: [
      { id: 1, name: "Doro Wat", quantity: 2, price: 680 },
      { id: 14, name: "Addis Spris Juice", quantity: 2, price: 180 }
    ],
    deliveryFee: 50,
    total: 1770,
    status: "confirmed",
    createdAt: "2026-10-12T07:45:00.000Z"
  },
  {
    id: "AE-10024",
    name: "Sara Bekele",
    address: "Kazanchis, Near UNECA Gate 1, Addis Ababa",
    deliveryZone: "kazanchis",
    phone: "+251 92 234 5678",
    paymentMethod: "cbe_birr",
    items: [
      { id: 3, name: "Special Beef Tibs", quantity: 2, price: 620 },
      { id: 13, name: "Buna Ceremony Set", quantity: 1, price: 160 }
    ],
    deliveryFee: 50,
    total: 1450,
    status: "preparing",
    createdAt: "2026-10-12T07:20:00.000Z"
  },
  {
    id: "AE-10023",
    name: "Dawit Haile",
    address: "CMC Michael, Tsehay Real Estate, Building 14",
    deliveryZone: "cmc",
    phone: "+251 93 345 6789",
    paymentMethod: "telebirr",
    items: [
      { id: 2, name: "Shiro Tegabino", quantity: 2, price: 380 },
      { id: 5, name: "Misir Wot", quantity: 1, price: 360 },
      { id: 10, name: "Gomen Wat", quantity: 1, price: 320 }
    ],
    deliveryFee: 80,
    total: 1520,
    status: "out_for_delivery",
    createdAt: "2026-10-12T06:50:00.000Z"
  },
  {
    id: "AE-10022",
    name: "Bethlehem Tadesse",
    address: "Sarbet, Near Canadian Embassy, Addis Ababa",
    deliveryZone: "sarbet",
    phone: "+251 94 456 7890",
    paymentMethod: "cash",
    items: [
      { id: 4, name: "Kitfo Special", quantity: 1, price: 750 },
      { id: 15, name: "Pure Honey Tej", quantity: 1, price: 350 }
    ],
    deliveryFee: 60,
    total: 1160,
    status: "delivered",
    createdAt: "2026-10-11T19:20:00.000Z"
  },
  {
    id: "AE-10021",
    name: "Yonas Mulugeta",
    address: "Old Airport, Near Golf Club & British Community",
    deliveryZone: "sarbet",
    phone: "+251 95 567 8901",
    paymentMethod: "telebirr",
    items: [
      { id: 7, name: "Beyaynetu / Fasting Platter", quantity: 2, price: 550 },
      { id: 14, name: "Addis Spris Juice", quantity: 3, price: 180 }
    ],
    deliveryFee: 60,
    total: 1700,
    status: "delivered",
    createdAt: "2026-10-11T18:10:00.000Z"
  },
  {
    id: "AE-10020",
    name: "Chala Demissie",
    address: "Gerji, Imperial Hotel Area, Addis Ababa",
    deliveryZone: "megenagna",
    phone: "+251 96 678 9012",
    paymentMethod: "cbe_birr",
    items: [
      { id: 6, name: "Shekla Tibs", quantity: 1, price: 690 },
      { id: 2, name: "Shiro Tegabino", quantity: 1, price: 380 }
    ],
    deliveryFee: 65,
    total: 1135,
    status: "delivered",
    createdAt: "2026-10-11T13:45:00.000Z"
  },
  {
    id: "AE-10019",
    name: "Selamawit Alemu",
    address: "Piassa, Churchill Ave, Next to Posta Bet",
    deliveryZone: "piassa",
    phone: "+251 97 789 0123",
    paymentMethod: "telebirr",
    items: [
      { id: 12, name: "Chechebsa / Kita Firfir", quantity: 2, price: 350 },
      { id: 13, name: "Buna Ceremony Set", quantity: 1, price: 160 }
    ],
    deliveryFee: 60,
    total: 920,
    status: "delivered",
    createdAt: "2026-10-10T09:15:00.000Z"
  },
  {
    id: "AE-10018",
    name: "Kidus Girma",
    address: "Bole Medhanialem, Near Camrose School",
    deliveryZone: "bole",
    phone: "+251 98 890 1234",
    paymentMethod: "cbe_birr",
    items: [
      { id: 4, name: "Kitfo Special", quantity: 2, price: 750 }
    ],
    deliveryFee: 50,
    total: 1550,
    status: "delivered",
    createdAt: "2026-10-09T18:30:00.000Z"
  },
  {
    id: "AE-10017",
    name: "Meron Assefa",
    address: "Megenagna, Marathon Building, 3rd Floor",
    deliveryZone: "megenagna",
    phone: "+251 91 234 5671",
    paymentMethod: "cash",
    items: [
      { id: 1, name: "Doro Wat", quantity: 1, price: 680 },
      { id: 6, name: "Shekla Tibs", quantity: 1, price: 690 }
    ],
    deliveryFee: 65,
    total: 1435,
    status: "delivered",
    createdAt: "2026-10-09T12:00:00.000Z"
  },
  {
    id: "AE-10016",
    name: "Tewodros Kassahun",
    address: "Hayahulet, Lex Plaza, Commercial St",
    deliveryZone: "megenagna",
    phone: "+251 92 345 6782",
    paymentMethod: "telebirr",
    items: [
      { id: 8, name: "Derek Tibs", quantity: 2, price: 640 },
      { id: 15, name: "Pure Honey Tej", quantity: 1, price: 350 }
    ],
    deliveryFee: 65,
    total: 1695,
    status: "delivered",
    createdAt: "2026-10-08T19:50:00.000Z"
  },
  {
    id: "AE-10015",
    name: "Helina Wolde",
    address: "Bisrate Gabriel, Laphto Mall Area",
    deliveryZone: "sarbet",
    phone: "+251 93 456 7893",
    paymentMethod: "cbe_birr",
    items: [
      { id: 2, name: "Shiro Tegabino", quantity: 2, price: 380 },
      { id: 11, name: "Kik Alicha", quantity: 1, price: 340 }
    ],
    deliveryFee: 60,
    total: 1160,
    status: "delivered",
    createdAt: "2026-10-08T13:20:00.000Z"
  },
  {
    id: "AE-10014",
    name: "Ermias Negash",
    address: "Gotera, Condominium Gate 2, Addis Ababa",
    deliveryZone: "lideta",
    phone: "+251 94 567 8904",
    paymentMethod: "telebirr",
    items: [
      { id: 9, name: "Yebeg Wot", quantity: 1, price: 720 },
      { id: 1, name: "Doro Wat", quantity: 1, price: 680 }
    ],
    deliveryFee: 60,
    total: 1460,
    status: "delivered",
    createdAt: "2026-10-07T20:10:00.000Z"
  },
  {
    id: "AE-10013",
    name: "Rahel Mengistu",
    address: "Summit, Fiyel Bet, Near Safari",
    deliveryZone: "cmc",
    phone: "+251 95 678 9015",
    paymentMethod: "cash",
    items: [
      { id: 5, name: "Misir Wot", quantity: 2, price: 360 },
      { id: 10, name: "Gomen Wat", quantity: 1, price: 320 }
    ],
    deliveryFee: 80,
    total: 1120,
    status: "delivered",
    createdAt: "2026-10-07T12:35:00.000Z"
  },
  {
    id: "AE-10012",
    name: "Biniyam Tesfaye",
    address: "Bole Atlas, Desalegn Hotel Area",
    deliveryZone: "bole",
    phone: "+251 96 789 0126",
    paymentMethod: "telebirr",
    items: [
      { id: 1, name: "Doro Wat", quantity: 2, price: 680 }
    ],
    deliveryFee: 50,
    total: 1410,
    status: "delivered",
    createdAt: "2026-10-06T19:00:00.000Z"
  },
  {
    id: "AE-10011",
    name: 'Tigist "Tigi" Hailu',
    address: 'Lideta, Near "Balcha" Hospital Area',
    deliveryZone: "lideta",
    phone: "+251 97 890 1237",
    paymentMethod: "cbe_birr",
    items: [
      { id: 3, name: "Special Beef Tibs", quantity: 2, price: 620 }
    ],
    deliveryFee: 60,
    total: 1300,
    status: "delivered",
    createdAt: "2026-10-06T13:15:00.000Z"
  },
  {
    id: "AE-10010",
    name: "Henok Berhanu",
    address: "Goro, Sefera Square, Addis Ababa",
    deliveryZone: "cmc",
    phone: "+251 98 901 2348",
    paymentMethod: "telebirr",
    items: [
      { id: 2, name: "Shiro Tegabino", quantity: 1, price: 380 },
      { id: 4, name: "Kitfo Special", quantity: 1, price: 750 }
    ],
    deliveryFee: 80,
    total: 1210,
    status: "delivered",
    createdAt: "2026-10-05T18:40:00.000Z"
  },
  {
    id: "AE-10009",
    name: "Liya Seyoum",
    address: "Bole Rwanda, Embassy St, Addis Ababa",
    deliveryZone: "bole",
    phone: "+251 91 345 6789",
    paymentMethod: "cash",
    items: [
      { id: 1, name: "Doro Wat", quantity: 1, price: 680 }
    ],
    deliveryFee: 50,
    total: 730,
    status: "delivered",
    createdAt: "2026-10-04T19:30:00.000Z"
  },
  {
    id: "AE-10008",
    name: "Natnael Fikru",
    address: "Arat Kilo, University Science Campus Gate",
    deliveryZone: "piassa",
    phone: "+251 92 456 7891",
    paymentMethod: "telebirr",
    items: [
      { id: 3, name: "Special Beef Tibs", quantity: 2, price: 620 },
      { id: 5, name: "Misir Wot", quantity: 1, price: 360 }
    ],
    deliveryFee: 60,
    total: 1660,
    status: "delivered",
    createdAt: "2026-10-03T18:15:00.000Z"
  },
  {
    id: "AE-10007",
    name: "Ruth Solomon",
    address: "Tor Hailoch, Total Gas Station Area",
    deliveryZone: "lideta",
    phone: "+251 93 567 8902",
    paymentMethod: "cbe_birr",
    items: [
      { id: 4, name: "Kitfo Special", quantity: 1, price: 750 }
    ],
    deliveryFee: 60,
    total: 810,
    status: "delivered",
    createdAt: "2026-10-02T13:00:00.000Z"
  },
  {
    id: "AE-10006",
    name: "Fasika Getachew",
    address: "Ayat, Zone 3 Condominium, Addis Ababa",
    deliveryZone: "cmc",
    phone: "+251 94 678 9013",
    paymentMethod: "telebirr",
    items: [
      { id: 1, name: "Doro Wat", quantity: 2, price: 680 },
      { id: 2, name: "Shiro Tegabino", quantity: 2, price: 380 }
    ],
    deliveryFee: 80,
    total: 2200,
    status: "delivered",
    createdAt: "2026-10-01T19:10:00.000Z"
  }
];

// Global in-memory order store (simulated DB across requests)
globalThis.__ordersStore = initialOrdersSeed.map((seedOrder) => {
  const existing = (globalThis.__ordersStore || []).find((o) => o.id === seedOrder.id);
  return existing ? { ...existing, ...seedOrder } : seedOrder;
});

export function getDishes() {
  return dishes;
}

export function getDishById(id) {
  const numericId = Number(id);
  return dishes.find((dish) => dish.id === numericId || String(dish.id) === String(id)) || null;
}

export function createOrderRecord(orderData, sessionId = null) {
  const newOrder = {
    id: `AE-${Math.floor(10000 + Math.random() * 90000)}`,
    ...orderData,
    sessionId: sessionId || orderData.sessionId || "guest-session",
    status: "confirmed",
    createdAt: new Date().toISOString()
  };

  globalThis.__ordersStore.unshift(newOrder);
  return newOrder;
}

export function getOrders(sessionId = null) {
  if (sessionId) {
    return globalThis.__ordersStore.filter((order) => order.sessionId === sessionId);
  }
  return globalThis.__ordersStore;
}

export function getOrderById(id) {
  const order = globalThis.__ordersStore.find((order) => order.id === id);
  if (!order) return null;

  // Realistic status progression simulation for SWR polling demonstration
  if (order.status !== "cancelled") {
    const elapsedSec = (Date.now() - new Date(order.createdAt).getTime()) / 1000;
    if (elapsedSec > 40) {
      order.status = "delivered";
    } else if (elapsedSec > 20) {
      order.status = "out_for_delivery";
    } else if (elapsedSec > 7) {
      order.status = "preparing";
    } else {
      order.status = "confirmed";
    }
  }

  return { ...order };
}

/**
 * Server-side order data aggregation.
 * Computes analytics and returns ONLY the summary to the client.
 */
export function getOrdersSummary({ forceEmpty = false } = {}) {
  if (forceEmpty) {
    return {
      totalRevenue: 0,
      totalOrders: 0,
      averageOrderValue: 0,
      currency: "ETB",
      dateRange: "No data available",
      unit: "Orders / Day",
      dailyData: [],
      ordersPerDay: [],
    };
  }

  const allOrders = [...globalThis.__ordersStore];
  if (allOrders.length === 0) {
    return {
      totalRevenue: 0,
      totalOrders: 0,
      averageOrderValue: 0,
      currency: "ETB",
      dateRange: "No data recorded yet",
      unit: "Orders / Day",
      dailyData: [],
      ordersPerDay: [],
    };
  }

  const totalRevenue = allOrders.reduce((acc, o) => acc + (Number(o.total) || 0), 0);
  const totalOrders = allOrders.length;
  const averageOrderValue = Math.round(totalRevenue / totalOrders);

  // Group by date YYYY-MM-DD
  const dateMap = {};
  allOrders.forEach((o) => {
    const dStr = o.createdAt ? o.createdAt.slice(0, 10) : "2026-10-12";
    if (!dateMap[dStr]) {
      dateMap[dStr] = { revenue: 0, count: 0 };
    }
    dateMap[dStr].revenue += Number(o.total) || 0;
    dateMap[dStr].count += 1;
  });

  // Sort ascending by date
  const sortedDates = Object.keys(dateMap).sort();
  const dailyData = sortedDates.map((dateKey) => {
    const d = new Date(dateKey);
    const label = d.toLocaleDateString("en-US", { month: "short", day: "numeric" });
    return {
      date: dateKey,
      label,
      revenue: dateMap[dateKey].revenue,
      count: dateMap[dateKey].count,
    };
  });

  const ordersPerDay = dailyData.map((d) => ({
    date: d.date,
    label: d.label,
    count: d.count,
  }));

  const firstDate = dailyData[0]?.label || "Oct 1";
  const lastDate = dailyData[dailyData.length - 1]?.label || "Oct 12";

  return {
    totalRevenue,
    totalOrders,
    averageOrderValue,
    currency: "ETB",
    dateRange: `${firstDate} – ${lastDate}, 2026`,
    unit: "Orders / Day",
    dailyData,
    ordersPerDay,
  };
}

/**
 * Server-side order sorting & pagination with forced states.
 */
export function getPaginatedOrders({
  page = 1,
  pageSize = 5,
  sortBy = "createdAt",
  sortOrder = "desc",
  forceState = null,
} = {}) {
  if (forceState === "empty") {
    return {
      orders: [],
      totalOrders: 0,
      totalPages: 0,
      currentPage: 1,
      pageSize,
      sortBy,
      sortOrder,
      forceState: "empty",
    };
  }

  let list = [...globalThis.__ordersStore];

  if (forceState === "single") {
    list = list.slice(0, 3);
  }

  // Sorting via searchParams
  list.sort((a, b) => {
    let aVal = a[sortBy];
    let bVal = b[sortBy];

    if (sortBy === "total") {
      aVal = Number(aVal) || 0;
      bVal = Number(bVal) || 0;
    } else if (sortBy === "createdAt") {
      aVal = new Date(aVal).getTime();
      bVal = new Date(bVal).getTime();
    } else {
      aVal = String(aVal || "").toLowerCase();
      bVal = String(bVal || "").toLowerCase();
    }

    if (aVal < bVal) return sortOrder === "asc" ? -1 : 1;
    if (aVal > bVal) return sortOrder === "asc" ? 1 : -1;
    return 0;
  });

  const totalOrders = list.length;
  const totalPages = Math.max(1, Math.ceil(totalOrders / pageSize));

  let currentPage = Math.max(1, Math.min(Number(page) || 1, totalPages));

  if (forceState === "first") {
    currentPage = 1;
  } else if (forceState === "last") {
    currentPage = totalPages;
  }

  const startIndex = (currentPage - 1) * pageSize;
  const paginatedOrders = list.slice(startIndex, startIndex + pageSize);

  return {
    orders: paginatedOrders,
    totalOrders,
    totalPages,
    currentPage,
    pageSize,
    sortBy,
    sortOrder,
    forceState,
  };
}

export function updateOrderStatus(orderId, newStatus) {
  const order = globalThis.__ordersStore.find((order) => order.id === orderId);
  if (!order) return null;
  order.status = newStatus;
  return { ...order };
}

export function cancelOrderRecord(orderId, sessionId) {
  const order = globalThis.__ordersStore.find((o) => o.id === orderId);
  if (!order) {
    return { success: false, error: "Order not found", status: 404 };
  }

  // Check session / owner
  if (order.sessionId && sessionId && order.sessionId !== sessionId) {
    return {
      success: false,
      error: "Unauthorized: You do not have permission to cancel this order",
      status: 403
    };
  }

  if (order.status === "cancelled") {
    return {
      success: false,
      error: "Order is already cancelled",
      status: 400
    };
  }

  order.status = "cancelled";
  order.cancelledAt = new Date().toISOString();
  return { success: true, order };
}
