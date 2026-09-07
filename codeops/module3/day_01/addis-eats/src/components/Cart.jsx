import React from 'react'
import { Link } from 'react-router-dom'
import { useCartStore } from '../store/useCartStore'

export function Cart() {
  // Narrow selectors: only re-render when the specific selected slice changes
  const items = useCartStore((state) => state.items)
  const removeItem = useCartStore((state) => state.remove)
  const clearCart = useCartStore((state) => state.clear)
  const total = useCartStore((state) =>
    state.items.reduce((sum, d) => sum + (d.price || 0), 0)
  )

  if (items.length === 0) {
    return (
      <div className="cart-page-container">
        <h2>Your Cart</h2>
        <div className="empty-state">
          <p>Your cart is currently empty.</p>
          <Link to="/menu" className="primary-btn mt-4">
            Browse Menu →
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="cart-page-container">
      <div className="cart-page-header">
        <h2>Your Cart ({items.length} items)</h2>
        <button type="button" className="clear-cart-btn" onClick={clearCart}>
          Clear All
        </button>
      </div>

      <div className="cart-page-card">
        <ul className="cart-item-list">
          {items.map((dish, index) => (
            <li key={`${dish.id}-${index}`} className="cart-item-row">
              <div className="cart-item-info">
                <Link to={`/menu/${dish.id}`} className="cart-item-title-link">
                  {dish.name}
                </Link>
                {dish.category && <span className="category-tag-sm">{dish.category}</span>}
              </div>
              <div className="cart-item-actions">
                <span className="cart-item-price">{dish.price} ETB</span>
                <button
                  type="button"
                  className="remove-item-btn"
                  onClick={() => removeItem(dish.id)}
                  title="Remove item"
                  aria-label={`Remove ${dish.name} from cart`}
                >
                  ✕
                </button>
              </div>
            </li>
          ))}
        </ul>

        <div className="checkout-total-row">
          <span className="total-label">Total Amount:</span>
          <span className="total-value">{total} ETB</span>
        </div>

        <div className="cart-page-actions">
          <Link to="/menu" className="secondary-btn">
            ← Continue Ordering
          </Link>
          <Link to="/checkout" className="primary-btn">
            Proceed to Checkout →
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Cart
