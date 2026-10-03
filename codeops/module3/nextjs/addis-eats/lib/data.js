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

// Global in-memory order store (simulated DB across requests)
globalThis.__ordersStore = globalThis.__ordersStore || [
  {
    id: "AE-10001",
    name: "Abebe Kebede",
    address: "Bole Sub-City, Near Edna Mall, Addis Ababa",
    phone: "+251 91 123 4567",
    paymentMethod: "telebirr",
    items: [
      { id: 1, name: "Doro Wat", price: 15.0, quantity: 2 }
    ],
    deliveryFee: 2.5,
    total: 32.5,
    sessionId: "demo-session-user",
    status: "confirmed",
    createdAt: new Date().toISOString()
  }
];

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
  return globalThis.__ordersStore.find((order) => order.id === id) || null;
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
