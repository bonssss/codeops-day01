import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useCartStore } from '../store/useCartStore'
import { useAuth } from '../context/AuthContext'

export function Checkout() {
  // Narrow selectors: cart items, clear action, and total
  const items = useCartStore((state) => state.items)
  const clearCart = useCartStore((state) => state.clear)
  const total = useCartStore((state) =>
    state.items.reduce((sum, d) => sum + (d.price || 0), 0)
  )

  const { user } = useAuth()

  const [formData, setFormData] = useState({
    name: user?.name || '',
    phone: user?.phone || '',
    area: '',
  })
  const [submittedOrder, setSubmittedOrder] = useState(null)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }))
    if (submittedOrder) setSubmittedOrder(null)
  }

  const trimmedPhone = formData.phone.trim()
  const isTeleBirrValid = /^(09\d{8}|\+2519\d{8}|07\d{8}|\+2517\d{8})$/.test(trimmedPhone)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!isTeleBirrValid || items.length === 0) return

    setSubmittedOrder({
      ...formData,
      items: [...items],
      total,
      orderTime: new Date().toLocaleTimeString(),
    })

    clearCart()
  }

  if (items.length === 0 && !submittedOrder) {
    return (
      <div className="checkout-page-container">
        <h2>Checkout</h2>
        <div className="empty-state">
          <p>You don't have any items to checkout.</p>
          <Link to="/menu" className="primary-btn mt-4">
            Add Dishes to Cart →
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="checkout-page-container">
      <div className="checkout-card">
        <h2>Checkout & TeleBirr Payment</h2>
        <p className="form-subtitle">Complete your delivery details (Logged in as {user?.name})</p>

        {submittedOrder ? (
          <div className="order-success-banner">
            <h3>🎉 Order Placed Successfully!</h3>
            <p>Customer: <strong>{submittedOrder.name}</strong></p>
            <p>Delivery Location: <strong>{submittedOrder.area}</strong></p>
            <p>TeleBirr Number: <strong>{submittedOrder.phone}</strong></p>
            <p>Items Ordered: <strong>{submittedOrder.items.length} items ({submittedOrder.total} ETB)</strong></p>
            <p>Time: <strong>{submittedOrder.orderTime}</strong></p>
            <div className="mt-4">
              <Link to="/menu" className="primary-btn">
                Order More Food
              </Link>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="order-form">
            <div className="checkout-summary-box">
              <div className="checkout-summary-header">
                <strong>Order Summary:</strong> {items.length} dishes
              </div>
              <div className="checkout-total-row">
                <span className="total-label">Total to Pay:</span>
                <span className="total-value">{total} ETB</span>
              </div>
            </div>

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
    </div>
  )
}

export default Checkout
