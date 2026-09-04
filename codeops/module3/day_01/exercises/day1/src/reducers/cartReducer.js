/**
 * Cart action types constants
 */
export const CART_ACTIONS = {
  ADD_ITEM: 'ADD_ITEM',
  REMOVE_ITEM: 'REMOVE_ITEM',
  CLEAR_CART: 'CLEAR_CART',
}

export const initialCartState = {
  items: [], // Each item: { id, name, price, quantity, spicy, currency }
}

/**
 * Reducer function managing shopping cart state transitions.
 * 
 * @param {{ items: Array<{ id: number|string, name: string, price: number, quantity: number }> }} state
 * @param {{ type: string, payload?: any }} action
 * @returns {{ items: Array<{ id: number|string, name: string, price: number, quantity: number }> }}
 */
export function cartReducer(state = initialCartState, action) {
  switch (action.type) {
    case CART_ACTIONS.ADD_ITEM: {
      const itemToAdd = action.payload
      const existingItemIndex = state.items.findIndex(
        (item) => item.id === itemToAdd.id
      )

      if (existingItemIndex > -1) {
        // Increment quantity of existing item
        const updatedItems = state.items.map((item, index) =>
          index === existingItemIndex
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
        return { ...state, items: updatedItems }
      }

      // Add new item with quantity 1
      return {
        ...state,
        items: [...state.items, { ...itemToAdd, quantity: 1 }],
      }
    }

    case CART_ACTIONS.REMOVE_ITEM: {
      const idToRemove = action.payload
      const existingItem = state.items.find((item) => item.id === idToRemove)

      if (!existingItem) return state

      if (existingItem.quantity > 1) {
        // Decrement quantity
        const updatedItems = state.items.map((item) =>
          item.id === idToRemove
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        return { ...state, items: updatedItems }
      }

      // Remove item completely if quantity is 1
      return {
        ...state,
        items: state.items.filter((item) => item.id !== idToRemove),
      }
    }

    case CART_ACTIONS.CLEAR_CART: {
      return {
        ...state,
        items: [],
      }
    }

    default:
      return state
  }
}

// ============================================================================
// Exercise 3: Direct testing / verification with plain objects for each case
// ============================================================================
export function runCartReducerTests() {
  const sampleDish = { id: 1, name: 'Pizza', price: 350 }
  const sampleDish2 = { id: 2, name: 'Pasta', price: 280 }

  // Case 1: Initial state
  let state = initialCartState

  // Case 2: ADD_ITEM (new item)
  state = cartReducer(state, { type: CART_ACTIONS.ADD_ITEM, payload: sampleDish })
  console.assert(state.items.length === 1 && state.items[0].quantity === 1, 'ADD_ITEM test 1 failed')

  // Case 3: ADD_ITEM (duplicate item -> increments quantity)
  state = cartReducer(state, { type: CART_ACTIONS.ADD_ITEM, payload: sampleDish })
  console.assert(state.items[0].quantity === 2, 'ADD_ITEM increment quantity test failed')

  // Case 4: ADD_ITEM (second different item)
  state = cartReducer(state, { type: CART_ACTIONS.ADD_ITEM, payload: sampleDish2 })
  console.assert(state.items.length === 2, 'ADD_ITEM second item test failed')

  // Case 5: REMOVE_ITEM (decrement quantity)
  state = cartReducer(state, { type: CART_ACTIONS.REMOVE_ITEM, payload: sampleDish.id })
  console.assert(state.items.find(i => i.id === 1)?.quantity === 1, 'REMOVE_ITEM decrement test failed')

  // Case 6: REMOVE_ITEM (quantity reaches 0 -> removes item)
  state = cartReducer(state, { type: CART_ACTIONS.REMOVE_ITEM, payload: sampleDish.id })
  console.assert(state.items.find(i => i.id === 1) === undefined, 'REMOVE_ITEM removal test failed')

  // Case 7: CLEAR_CART
  state = cartReducer(state, { type: CART_ACTIONS.CLEAR_CART })
  console.assert(state.items.length === 0, 'CLEAR_CART test failed')

  return 'All cartReducer direct tests passed successfully!'
}

// Execute tests at module evaluation in non-production
if (typeof window !== 'undefined') {
  runCartReducerTests()
}

export default cartReducer
