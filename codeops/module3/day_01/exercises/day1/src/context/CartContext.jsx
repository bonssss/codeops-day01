import { createContext, useContext, useReducer, useMemo, useCallback } from 'react'
import PropTypes from 'prop-types'
import { cartReducer, initialCartState, CART_ACTIONS } from '../reducers/cartReducer'

const CartContext = createContext()

/**
 * Exercise 5 & 6: CartProvider component holding cartReducer state
 * and providing a memoized items, dispatch, and derived total context value.
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

  // Convenience helper dispatchers wrapped in useCallback for stable references
  const addToCart = useCallback((dish) => {
    dispatch({ type: CART_ACTIONS.ADD_ITEM, payload: dish })
  }, [dispatch])

  const removeFromCart = useCallback((dishId) => {
    dispatch({ type: CART_ACTIONS.REMOVE_ITEM, payload: dishId })
  }, [dispatch])

  const clearCart = useCallback(() => {
    dispatch({ type: CART_ACTIONS.CLEAR_CART })
  }, [dispatch])

  /**
   * ============================================================================
   * Exercise 6: Memoizing the Provider Value with useMemo
   * ============================================================================
   * Why memoize the Context value object?
   * 
   * In JavaScript, object literals create a new reference in memory on every render.
   * 
   * Without `useMemo`:
   * Whenever `CartProvider` or its parent tree re-renders for any reason, a new
   * object reference is passed to `<CartContext.Provider value={value}>`. React uses
   * `Object.is` reference equality to detect context value changes. As a result,
   * EVERY component consuming `useCart()` (Header, Dish, Menu, DeliveryForm, etc.)
   * would be forced to re-render, even if the actual items or totals never changed!
   * 
   * With `useMemo`:
   * The context value object maintains reference stability and is ONLY recomputed
   * when its actual dependencies (`state.items`, `orderTotal`, `totalItems`) change.
   * This completely prevents unnecessary cascading re-renders across all consumer
   * components down the component tree.
   * ============================================================================
   */
  const value = useMemo(
    () => ({
      items: state.items,
      orderTotal,
      totalItems,
      dispatch,
      addToCart,
      removeFromCart,
      clearCart,
    }),
    [state.items, orderTotal, totalItems, addToCart, removeFromCart, clearCart]
  )

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
