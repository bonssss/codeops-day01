"use client";

import { createContext, useContext, useSyncExternalStore } from "react";

const CartContext = createContext();

let listeners = [];
let cartState = [];

function emitChange() {
  for (const listener of listeners) {
    listener();
  }
}

const cartStore = {
  add(dish, quantity = 1) {
    const existingIndex = cartState.findIndex((item) => item.id === dish.id);
    if (existingIndex > -1) {
      cartState = cartState.map((item, idx) =>
        idx === existingIndex
          ? { ...item, quantity: item.quantity + quantity }
          : item
      );
    } else {
      cartState = [...cartState, { ...dish, quantity }];
    }
    cartStore.save();
    emitChange();
  },
  updateQuantity(dishId, newQty) {
    if (newQty <= 0) {
      cartStore.remove(dishId);
      return;
    }
    cartState = cartState.map((item) =>
      item.id === dishId ? { ...item, quantity: newQty } : item
    );
    cartStore.save();
    emitChange();
  },
  remove(dishId) {
    cartState = cartState.filter((item) => item.id !== dishId);
    cartStore.save();
    emitChange();
  },
  clear() {
    cartState = [];
    cartStore.save();
    emitChange();
  },
  save() {
    if (typeof window !== "undefined") {
      try {
        localStorage.setItem("addis_eats_cart", JSON.stringify(cartState));
      } catch (err) {
        console.error("Failed to save cart", err);
      }
    }
  },
  subscribe(listener) {
    listeners = [...listeners, listener];
    return () => {
      listeners = listeners.filter((l) => l !== listener);
    };
  },
  getSnapshot() {
    return cartState;
  },
  getServerSnapshot() {
    return [];
  },
};

// Initialize from localStorage on browser
if (typeof window !== "undefined") {
  try {
    const saved = localStorage.getItem("addis_eats_cart");
    if (saved) {
      cartState = JSON.parse(saved);
    }
  } catch (err) {
    console.error("Failed to load initial cart", err);
  }
}

export function CartProvider({ children }) {
  const cart = useSyncExternalStore(
    cartStore.subscribe,
    cartStore.getSnapshot,
    cartStore.getServerSnapshot
  );

  const totalItemsCount = cart.reduce((total, item) => total + item.quantity, 0);

  const subtotal = cart.reduce((total, item) => {
    const numericPrice =
      typeof item.price === "number"
        ? item.price
        : parseFloat(String(item.price).replace(/[^0-9.]/g, "")) || 0;
    return total + numericPrice * item.quantity;
  }, 0);

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart: cartStore.add,
        updateQuantity: cartStore.updateQuantity,
        removeFromCart: cartStore.remove,
        clearCart: cartStore.clear,
        totalItemsCount,
        subtotal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
