import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

/**
 * ============================================================================
 * Exercise 4 & 6: Zustand Cart Store with Persist Middleware
 * ============================================================================
 * Implements a lightweight, performant global state store for the shopping cart.
 * Persist middleware automatically saves cart items to localStorage so orders
 * survive page reloads and browser sessions.
 * ============================================================================
 */
export const useCartStore = create(
  persist(
    (set) => ({
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
    }),
    {
      name: 'addis_eats_cart_zustand', // Storage key in localStorage
      storage: createJSONStorage(() => localStorage),
    }
  )
)

// Narrow Selector Functions
export const selectTotalItems = (state) =>
  state.items.reduce((sum, item) => sum + item.quantity, 0)

export const selectOrderTotal = (state) =>
  state.items.reduce((sum, item) => sum + item.price * item.quantity, 0)

export const selectItemQuantity = (id) => (state) =>
  state.items.find((item) => item.id === id)?.quantity || 0

export default useCartStore
