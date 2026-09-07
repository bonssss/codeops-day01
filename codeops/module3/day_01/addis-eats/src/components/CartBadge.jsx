import React from 'react'
import { useCartStore } from '../store/useCartStore'

export function CartBadge() {
  const itemCount = useCartStore((state) => state.items.length)

  return (
    <div className="cart-badge" aria-label={`Shopping cart with ${itemCount} items`}>
      <span className="cart-badge-icon" aria-hidden="true">🛒</span>
      <span className="cart-badge-text">Cart</span>
      <span className="cart-badge-count">{itemCount}</span>
    </div>
  )
}

export default CartBadge
