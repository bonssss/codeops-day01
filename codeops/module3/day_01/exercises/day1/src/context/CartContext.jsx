import { createContext, useContext, useReducer } from 'react'
import PropTypes from 'prop-types'
import { cartReducer, initialCartState, CART_ACTIONS } from '../reducers/cartReducer'

const CartContext = createContext()

/**
 * Exercise 5: CartProvider component holding cartReducer state
 * and providing items, dispatch, and derived total.
 */
export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(cartReducer, initialCartState)

  // Derived state: calculate running order total and total items
  const orderTotal = state.items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  )

  const totalItems = state.items.reduce(
    (sum, item) => sum + item.quantity,
    0
  )

  // Convenience helper dispatchers
  const addToCart = (dish) => {
    dispatch({ type: CART_ACTIONS.ADD_ITEM, payload: dish })
  }

  const removeFromCart = (dishId) => {
    dispatch({ type: CART_ACTIONS.REMOVE_ITEM, payload: dishId })
  }

  const clearCart = () => {
    dispatch({ type: CART_ACTIONS.CLEAR_CART })
  }

  const value = {
    items: state.items,
    orderTotal,
    totalItems,
    dispatch,
    addToCart,
    removeFromCart,
    clearCart,
  }

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  )
}

CartProvider.propTypes = {
  children: PropTypes.node.isRequired,
}

export function useCart() {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error('useCart must be used within a CartProvider')
  }
  return context
}

export default CartContext
