import React, { useState } from 'react'
import { useCart } from '../context/CartContext'

function OrderForm() {
  const { items, dispatch, total } = useCart()

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    area: '',
  })
  const [submittedOrder, setSubmittedOrder] = useState(null)

  // Controlled input change handler
  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }))
    if (submittedOrder) setSubmittedOrder(null)
  }

  // TeleBirr phone validation: accepts 09xxxxxxxx, +2519xxxxxxxx, 07xxxxxxxx, +2517xxxxxxxx
  const trimmedPhone = formData.phone.trim()
  const isTeleBirrValid = /^(09\d{8}|\+2519\d{8}|07\d{8}|\+2517\d{8})$/.test(trimmedPhone)

  // Handle Order Checkout Submission
  const handleSubmit = (e) => {
    e.preventDefault()
    if (!isTeleBirrValid || items.length === 0) return

    setSubmittedOrder({
      ...formData,
      items: [...items],
      total,
      orderTime: new Date().toLocaleTimeString(),
    })

    // Clear cart upon successful order placement
    dispatch({ type: 'clear' })
  }

  const handleClearCart = () => {
    dispatch({ type: 'clear' })
  }

  const handleRemoveItem = (id) => {
    dispatch({ type: 'remove', id })
  }

  return (
    <section className="order-form-section" aria-label="Checkout and Delivery">
      <div className="order-form-card">
        <h2>Checkout & Delivery</h2>
        <p className="form-subtitle">Review your selected dishes and pay with TeleBirr</p>

        {/* Cart Item Breakdown */}
        <div className="cart-panel">
          <div className="cart-panel-header">
            <h3>Cart Items ({items.length})</h3>
            {items.length > 0 && (
              <button
                type="button"
                className="clear-cart-btn"
                onClick={handleClearCart}
              >
                Clear Cart
              </button>
            )}
          </div>

          {items.length === 0 ? (
            <p className="cart-empty-hint">Your cart is empty. Add dishes from the menu above to get started!</p>
          ) : (
            <ul className="cart-item-list">
              {items.map((dish, index) => (
                <li key={`${dish.id}-${index}`} className="cart-item-row">
                  <span className="cart-item-name">{dish.name}</span>
                  <div className="cart-item-actions">
                    <span className="cart-item-price">{dish.price} ETB</span>
                    <button
                      type="button"
                      className="remove-item-btn"
                      onClick={() => handleRemoveItem(dish.id)}
                      title="Remove item"
                      aria-label={`Remove ${dish.name} from cart`}
                    >
                      ✕
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}

          <div className="checkout-total-row">
            <span className="total-label">Total to Pay:</span>
            <span className="total-value">{total} ETB</span>
          </div>
        </div>

        {/* Order Confirmation Banner */}
        {submittedOrder ? (
          <div className="order-success-banner">
            <h3>🎉 Order Placed Successfully!</h3>
            <p>Customer: <strong>{submittedOrder.name}</strong></p>
            <p>Delivery Location: <strong>{submittedOrder.area}</strong></p>
            <p>TeleBirr Number: <strong>{submittedOrder.phone}</strong></p>
            <p>Items Ordered: <strong>{submittedOrder.items.length} items ({submittedOrder.total} ETB)</strong></p>
            <p>Time: <strong>{submittedOrder.orderTime}</strong></p>
            <button
              type="button"
              className="new-order-btn"
              onClick={() => {
                setSubmittedOrder(null)
                setFormData({ name: '', phone: '', area: '' })
              }}
            >
              Place Another Order
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="order-form">
            <div className="form-group">
              <label htmlFor="name">Full Name</label>
              <input
                id="name"
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="e.g. Abebech Gobena"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="phone">TeleBirr Phone Number</label>
              <input
                id="phone"
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="0911223344 or +251911223344"
                className={
                  formData.phone.length > 0
                    ? isTeleBirrValid
                      ? 'valid-input'
                      : 'invalid-input'
                    : ''
                }
                required
              />
              {formData.phone.length > 0 && !isTeleBirrValid && (
                <span className="validation-error">
                  Enter a valid TeleBirr number (e.g. 0911223344 or +251911223344)
                </span>
              )}
              {isTeleBirrValid && (
                <span className="validation-success">
                  ✓ Valid TeleBirr phone number
                </span>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="area">Delivery Area / Neighborhood</label>
              <input
                id="area"
                type="text"
                name="area"
                value={formData.area}
                onChange={handleChange}
                placeholder="e.g. Bole, Kazanchis, Piassa, Sarbet"
                required
              />
            </div>

            <button
              type="submit"
              disabled={!isTeleBirrValid || items.length === 0}
              className="submit-order-btn"
            >
              Pay with TeleBirr ({total} ETB)
            </button>
          </form>
        )}
      </div>
    </section>
  )
}

export default OrderForm
