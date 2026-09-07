import React from 'react'
import { useCart } from '../context/CartContext'

/**
 * Header CartBadge component.
 * Reads cart items count directly from CartContext via useCart() without prop drilling.
 */
export function CartBadge() {
  const { items } = useCart()
  const itemCount = items.length

  return (
    <div className="cart-badge" aria-label={`Shopping cart with ${itemCount} items`}>
      <span className="cart-badge-icon" aria-hidden="true">🛒</span>
      <span className="cart-badge-text">Cart</span>
      <span className="cart-badge-count">{itemCount}</span>
    </div>
  )
}

export default CartBadge
