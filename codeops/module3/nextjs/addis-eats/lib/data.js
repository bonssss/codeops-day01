// lib/data.js

export const dishes = [
  {
    id: 1,
    name: "Doro Wat",
    price: 15.0,
    formattedPrice: "$15.00",
    category: "Traditional",
    spice: "🌶️🌶️🌶️ High",
    time: "30-40 min",
    servings: "1-2 People",
    emoji: "🍗",
    image: "/images/doro-wat.svg",
    ingredients: [
      "Free-range Chicken",
      "Ethiopian Berbere",
      "Spiced Butter (Niter Kibbeh)",
      "Hard-boiled Eggs",
      "Injera"
    ],
    description: "The national dish of Ethiopia. Succulent chicken drumsticks slow-simmered in a dark, rich, fiery onion-and-berbere sauce, served alongside hard-boiled eggs infused with the flavorful sauce and fresh fermented teff injera."
  },
  {
    id: 2,
    name: "Shiro Wat",
    price: 11.0,
    formattedPrice: "$11.00",
    category: "Vegetarian",
    spice: "🌶️ Mild",
    time: "20-25 min",
    servings: "1 Person",
    emoji: "🍲",
    image: "/images/shiro-wat.svg",
    ingredients: [
      "Roasted Chickpea Flour",
      "Garlic & Ginger",
      "Cardamom & Herbs",
      "Olive Oil",
      "Injera"
    ],
    description: "A velvety, savory Ethiopian comfort dish made with roasted chickpea flour simmered with minced garlic, ginger, and aromatic spices. Served boiling hot in a traditional clay pot."
  },
  {
    id: 3,
    name: "Special Beef Tibs",
    price: 16.5,
    formattedPrice: "$16.50",
    category: "Sautéed",
    spice: "🌶️🌶️ Medium",
    time: "25 min",
    servings: "1-2 People",
    emoji: "🥩",
    image: "/images/beef-tibs.svg",
    ingredients: [
      "Prime Beef Tenderloin",
      "Fresh Rosemary",
      "Red Onions",
      "Jalapeños",
      "Awaze Paste"
    ],
    description: "Tender cubes of beef stir-fried quickly over high heat with sweet caramelized onions, crisp green chili peppers, fresh rosemary sprigs, and Ethiopian awaze spice paste."
  },
  {
    id: 4,
    name: "Kitfo Special",
    price: 17.0,
    formattedPrice: "$17.00",
    category: "Traditional",
    spice: "🌶️🌶️🌶️ High",
    time: "15 min",
    servings: "1 Person",
    emoji: "🥘",
    image: "/images/kitfo.svg",
    ingredients: [
      "Minced Lean Beef",
      "Clarified Spiced Butter (Niter Kibbeh)",
      "Mitmita Spice",
      "Ayib (Cottage Cheese)",
      "Gomen"
    ],
    description: "Finely minced extra-lean beef gently warmed in pure herbal clarified butter and seasoned with fiery mitmita chili blend. Served with fresh collard greens (gomen) and mild home-made ayib cheese."
  },
  {
    id: 5,
    name: "Misir Wot",
    price: 12.0,
    formattedPrice: "$12.00",
    category: "Vegetarian",
    spice: "🌶️🌶️ Medium",
    time: "25 min",
    servings: "1 Person",
    emoji: "🥣",
    image: "/images/misir-wot.svg",
    ingredients: [
      "Organic Red Lentils",
      "Ethiopian Berbere",
      "Shallots & Garlic",
      "Olive Oil",
      "Injera"
    ],
    description: "Savory red split lentils simmered gently in an aromatic berbere sauce with caramelized onions, garlic, and Ethiopian herbs. A staple vegan delicacy served with injera."
  }
];

// Initial seed orders dataset with realistic dates across Oct 2026 and ETB currency
const initialOrdersSeed = [
  { id: "AE-10025", name: "Abebe Kebede", address: "Bole Sub-City, Edna Mall", phone: "+251 91 123 4567", paymentMethod: "telebirr", items: [{ id: 1, name: "Doro Wat", quantity: 2, price: 650 }], deliveryFee: 50, total: 1350, status: "confirmed", createdAt: "2026-10-11T10:15:00.000Z" },
  { id: "AE-10024", name: "Sara Bekele", address: "Kazanchis, Near UNECA", phone: "+251 92 234 5678", paymentMethod: "cbe_birr", items: [{ id: 3, name: "Special Beef Tibs", quantity: 2, price: 750 }], deliveryFee: 50, total: 1550, status: "preparing", createdAt: "2026-10-11T09:40:00.000Z" },
  { id: "AE-10023", name: "Dawit Haile", address: "CMC Michael, Tsehay Real Estate", phone: "+251 93 345 6789", paymentMethod: "telebirr", items: [{ id: 2, name: "Shiro Wat", quantity: 2, price: 350 }, { id: 5, name: "Misir Wot", quantity: 1, price: 400 }], deliveryFee: 50, total: 1150, status: "out_for_delivery", createdAt: "2026-10-11T08:30:00.000Z" },
  { id: "AE-10022", name: "Bethlehem Tadesse", address: "Sarbet, Near Canadian Embassy", phone: "+251 94 456 7890", paymentMethod: "cash", items: [{ id: 4, name: "Kitfo Special", quantity: 1, price: 850 }], deliveryFee: 50, total: 900, status: "delivered", createdAt: "2026-10-10T19:20:00.000Z" },
  { id: "AE-10021", name: "Yonas Mulugeta", address: "Old Airport, Near Golf Club", phone: "+251 95 567 8901", paymentMethod: "telebirr", items: [{ id: 1, name: "Doro Wat", quantity: 3, price: 650 }], deliveryFee: 50, total: 2000, status: "delivered", createdAt: "2026-10-10T18:10:00.000Z" },
  { id: "AE-10020", name: "Chala Demissie", address: "Gerji, Imperial Hotel Area", phone: "+251 96 678 9012", paymentMethod: "cbe_birr", items: [{ id: 3, name: "Special Beef Tibs", quantity: 1, price: 750 }, { id: 2, name: "Shiro Wat", quantity: 1, price: 350 }], deliveryFee: 50, total: 1150, status: "delivered", createdAt: "2026-10-10T13:45:00.000Z" },
  { id: "AE-10019", name: "Selamawit Alemu", address: "Piazza, Churchhill Ave", phone: "+251 97 789 0123", paymentMethod: "telebirr", items: [{ id: 5, name: "Misir Wot", quantity: 2, price: 400 }], deliveryFee: 50, total: 850, status: "delivered", createdAt: "2026-10-09T20:15:00.000Z" },
  { id: "AE-10018", name: "Kidus Girma", address: "Bole Medhanialem, Camrose", phone: "+251 98 890 1234", paymentMethod: "cbe_birr", items: [{ id: 4, name: "Kitfo Special", quantity: 2, price: 850 }], deliveryFee: 50, total: 1750, status: "delivered", createdAt: "2026-10-09T18:30:00.000Z" },
  { id: "AE-10017", name: "Meron Assefa", address: "Megenagna, Marathon Building", phone: "+251 91 234 5671", paymentMethod: "cash", items: [{ id: 1, name: "Doro Wat", quantity: 2, price: 650 }, { id: 3, name: "Special Beef Tibs", quantity: 1, price: 750 }], deliveryFee: 50, total: 2100, status: "delivered", createdAt: "2026-10-09T12:00:00.000Z" },
  { id: "AE-10016", name: "Tewodros Kassahun", address: "Hayahulet, Lex Plaza", phone: "+251 92 345 6782", paymentMethod: "telebirr", items: [{ id: 3, name: "Special Beef Tibs", quantity: 3, price: 750 }], deliveryFee: 50, total: 2300, status: "delivered", createdAt: "2026-10-08T19:50:00.000Z" },
  { id: "AE-10015", name: "Helina Wolde", address: "Bisrate Gabriel, Laphto Mall", phone: "+251 93 456 7893", paymentMethod: "cbe_birr", items: [{ id: 2, name: "Shiro Wat", quantity: 3, price: 350 }], deliveryFee: 50, total: 1100, status: "delivered", createdAt: "2026-10-08T13:20:00.000Z" },
  { id: "AE-10014", name: "Ermias Negash", address: "Gotera, Condominium Gate 2", phone: "+251 94 567 8904", paymentMethod: "telebirr", items: [{ id: 4, name: "Kitfo Special", quantity: 1, price: 850 }, { id: 1, name: "Doro Wat", quantity: 1, price: 650 }], deliveryFee: 50, total: 1550, status: "delivered", createdAt: "2026-10-07T20:10:00.000Z" },
  { id: "AE-10013", name: "Rahel Mengistu", address: "Summit, Fiyel Bet", phone: "+251 95 678 9015", paymentMethod: "cash", items: [{ id: 5, name: "Misir Wot", quantity: 2, price: 400 }], deliveryFee: 50, total: 850, status: "delivered", createdAt: "2026-10-07T12:35:00.000Z" },
  { id: "AE-10012", name: "Biniyam Tesfaye", address: "Bole Atlas, Desalegn Hotel", phone: "+251 96 789 0126", paymentMethod: "telebirr", items: [{ id: 1, name: "Doro Wat", quantity: 2, price: 650 }], deliveryFee: 50, total: 1350, status: "delivered", createdAt: "2026-10-06T19:00:00.000Z" },
  { id: "AE-10011", name: 'Tigist "Tigi" Hailu', address: 'Lideta, Near "Balcha" Hospital Area', phone: "+251 97 890 1237", paymentMethod: "cbe_birr", items: [{ id: 3, name: 'Special "Chef\'s" Beef Tibs', quantity: 2, price: 750 }], deliveryFee: 50, total: 1550, status: "delivered", createdAt: "2026-10-06T13:15:00.000Z" },
  { id: "AE-10010", name: "Henok Berhanu", address: "Goro, Sefera Square", phone: "+251 98 901 2348", paymentMethod: "telebirr", items: [{ id: 2, name: "Shiro Wat", quantity: 1, price: 350 }, { id: 4, name: "Kitfo Special", quantity: 1, price: 850 }], deliveryFee: 50, total: 1250, status: "delivered", createdAt: "2026-10-05T18:40:00.000Z" },
  { id: "AE-10009", name: "Liya Seyoum", address: "Bole Rwanda, Embassy St", phone: "+251 91 345 6789", paymentMethod: "cash", items: [{ id: 1, name: "Doro Wat", quantity: 1, price: 650 }], deliveryFee: 50, total: 700, status: "delivered", createdAt: "2026-10-04T19:30:00.000Z" },
  { id: "AE-10008", name: "Natnael Fikru", address: "Arat Kilo, University Gate", phone: "+251 92 456 7891", paymentMethod: "telebirr", items: [{ id: 3, name: "Special Beef Tibs", quantity: 2, price: 750 }, { id: 5, name: "Misir Wot", quantity: 1, price: 400 }], deliveryFee: 50, total: 1950, status: "delivered", createdAt: "2026-10-03T18:15:00.000Z" },
  { id: "AE-10007", name: "Ruth Solomon", address: "Tor Hailoch, Total Gas Station", phone: "+251 93 567 8902", paymentMethod: "cbe_birr", items: [{ id: 4, name: "Kitfo Special", quantity: 1, price: 850 }], deliveryFee: 50, total: 900, status: "delivered", createdAt: "2026-10-02T13:00:00.000Z" },
  { id: "AE-10006", name: "Fasika Getachew", address: "Ayat, Zone 3", phone: "+251 94 678 9013", paymentMethod: "telebirr", items: [{ id: 1, name: "Doro Wat", quantity: 2, price: 650 }, { id: 2, name: "Shiro Wat", quantity: 2, price: 350 }], deliveryFee: 50, total: 2050, status: "delivered", createdAt: "2026-10-01T19:10:00.000Z" }
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
 * Requirement 1: Server-side order data aggregation.
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
    const dStr = o.createdAt ? o.createdAt.slice(0, 10) : "2026-10-11";
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
  const lastDate = dailyData[dailyData.length - 1]?.label || "Oct 11";

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
 * Requirements 5, 6, 7: Server-side order sorting & pagination with forced states.
 */
export function getPaginatedOrders({
  page = 1,
  pageSize = 5,
  sortBy = "createdAt",
  sortOrder = "desc",
  forceState = null,
} = {}) {
  // Requirement: Force each of the four states
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
    // Single page state: only 3 items total (<= pageSize)
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

  // Handle forced multi-page boundary states
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
