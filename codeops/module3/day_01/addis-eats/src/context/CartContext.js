import { createContext, useContext } from 'react'

export const CartContext = createContext(null)

/**
 * Custom hook to safely consume the CartContext.
 * Ensures the consumer is rendered within a CartProvider tree.
 */
export function useCart() {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error('useCart must be used within a CartProvider')
  }
  return context
}

export default CartContext
