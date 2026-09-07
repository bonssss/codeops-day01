import { create } from 'zustand'

/**
 * ============================================================================
 * Exercise 4: Zustand Cart Store
 * ============================================================================
 * Implements a lightweight, performant global state store for the shopping cart.
 * Provides atomic state actions: addItem, removeItem (remove), and clearCart (clear).
 * ============================================================================
 */
export const useCartStore = create((set) => ({
  items: [],

  // Add item or increment quantity if already present
  addItem: (dish) =>
    set((state) => {
      const existingItemIndex = state.items.findIndex(
        (item) => item.id === dish.id
      )

      if (existingItemIndex > -1) {
        const updatedItems = [...state.items]
        const currentItem = updatedItems[existingItemIndex]
        updatedItems[existingItemIndex] = {
          ...currentItem,
          quantity: (currentItem.quantity || 1) + 1,
        }
        return { items: updatedItems }
      }

      return {
        items: [...state.items, { ...dish, quantity: 1 }],
      }
    }),

  // Remove one quantity or remove entirely if quantity is 1
  remove: (dishId) =>
    set((state) => {
      const existingItemIndex = state.items.findIndex(
        (item) => item.id === dishId
      )

      if (existingItemIndex === -1) return state

      const currentItem = state.items[existingItemIndex]
      if (currentItem.quantity > 1) {
        const updatedItems = [...state.items]
        updatedItems[existingItemIndex] = {
          ...currentItem,
          quantity: currentItem.quantity - 1,
        }
        return { items: updatedItems }
      }

      return {
        items: state.items.filter((item) => item.id !== dishId),
      }
    }),

  // Alias for removeItem
  removeItem: (dishId) =>
    set((state) => ({
      items: state.items.filter((item) => item.id !== dishId),
    })),

  // Clear all items in cart
  clear: () => set({ items: [] }),
  clearCart: () => set({ items: [] }),
}))

export default useCartStore
