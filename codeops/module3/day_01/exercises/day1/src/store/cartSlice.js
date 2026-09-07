import { createSlice, createSelector } from '@reduxjs/toolkit'

/**
 * ============================================================================
 * Exercise 7: Redux Toolkit (RTK) Cart Slice (Rebuilt for Comparison)
 * ============================================================================
 * Implements the equivalent cart logic using Redux Toolkit's createSlice.
 * Redux Toolkit uses Immer internally, allowing direct "mutating" syntax
 * within reducers while guaranteeing immutable state updates underneath.
 * ============================================================================
 */

const initialState = {
  items: [],
}

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem: (state, action) => {
      const dish = action.payload
      const existingItem = state.items.find((item) => item.id === dish.id)

      if (existingItem) {
        existingItem.quantity = (existingItem.quantity || 1) + 1
      } else {
        state.items.push({ ...dish, quantity: 1 })
      }
    },

    remove: (state, action) => {
      const dishId = action.payload
      const existingItemIndex = state.items.findIndex(
        (item) => item.id === dishId
      )

      if (existingItemIndex > -1) {
        const currentItem = state.items[existingItemIndex]
        if (currentItem.quantity > 1) {
          currentItem.quantity -= 1
        } else {
          state.items.splice(existingItemIndex, 1)
        }
      }
    },

    removeItem: (state, action) => {
      state.items = state.items.filter((item) => item.id !== action.payload)
    },

    clear: (state) => {
      state.items = []
    },

    clearCart: (state) => {
      state.items = []
    },
  },
})

// Action creators generated automatically
export const { addItem, remove, removeItem, clear, clearCart } =
  cartSlice.actions

// Selectors
export const selectCartItems = (state) => state.cart.items

export const selectTotalItems = createSelector([selectCartItems], (items) =>
  items.reduce((sum, item) => sum + item.quantity, 0)
)

export const selectOrderTotal = createSelector([selectCartItems], (items) =>
  items.reduce((sum, item) => sum + item.price * item.quantity, 0)
)

export const selectItemQuantity = (id) =>
  createSelector(
    [selectCartItems],
    (items) => items.find((item) => item.id === id)?.quantity || 0
  )

export default cartSlice.reducer
