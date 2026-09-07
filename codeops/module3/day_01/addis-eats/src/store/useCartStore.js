import { create } from 'zustand'
import { persist } from 'zustand/middleware'

/**
 * Zustand Cart Store with persistence middleware.
 * Exposes narrow actions (addItem, remove, clear) and persistent items state.
 */
export const useCartStore = create(
  persist(
    (set) => ({
      items: [],
      addItem: (dish) =>
        set((state) => ({
          items: [...state.items, dish],
        })),
      remove: (id) =>
        set((state) => ({
          items: state.items.filter((dish) => String(dish.id) !== String(id)),
        })),
      clear: () => set({ items: [] }),
    }),
    {
      name: 'addis_eats_cart_store',
    }
  )
)

export default useCartStore
