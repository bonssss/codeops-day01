import { useState } from 'react'
import PropTypes from 'prop-types'

/**
 * Exercise 1: Single State Object for Checkout Form
 * Form values (name, phone, area, notes) are maintained in one coherent state object.
 */
const initialFormState = {
  name: '',
  phone: '',
  area: '',
  notes: '',
}

function DeliveryForm({ orderTotal = 0 }) {
  const [form, setForm] = useState(initialFormState)
  const [submitted, setSubmitted] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  // TeleBirr phone validation helper
  const cleanedPhone = form.phone.trim()
  const isTeleBirrValid =
    /^(09|07)\d{8}$/.test(cleanedPhone) || /^(\+251)(9|7)\d{8}$/.test(cleanedPhone)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!isTeleBirrValid) return
    setSubmitted(true)
  }

  const handleReset = () => {
    setForm(initialFormState)
    setSubmitted(false)
  }

  return (
    <section className="delivery-section">
      <div className="delivery-card">
        <h2>Delivery Details</h2>
        <p className="delivery-subtitle">Enter your details to complete the order with TeleBirr</p>

        {submitted ? (
          <div className="order-success-message">
            <h3>🎉 Order Placed Successfully!</h3>
            <p>Thank you, <strong>{form.name}</strong>!</p>
            <p>We will deliver to <strong>{form.area}</strong>.</p>
            {form.notes && <p>Delivery Notes: <em>{form.notes}</em></p>}
            <p>Payment of <strong>{orderTotal} ETB</strong> requested via TeleBirr to <strong>{form.phone}</strong>.</p>
            <button
              type="button"
              className="submit-btn"
              onClick={handleReset}
              style={{ marginTop: '1rem', backgroundColor: '#2563eb' }}
            >
              Place Another Order
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="delivery-form">
            <div className="form-group">
              <label htmlFor="name">Full Name</label>
              <input
                id="name"
                type="text"
                name="name"
                placeholder="e.g. Abebe Bikila"
                value={form.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="phone">TeleBirr Phone Number</label>
              <input
                id="phone"
                type="tel"
                name="phone"
                placeholder="e.g. 0911223344 or 0711223344"
                value={form.phone}
                onChange={handleChange}
                className={form.phone.length > 0 ? (isTeleBirrValid ? 'valid' : 'invalid') : ''}
                required
              />
              {form.phone.length > 0 && !isTeleBirrValid && (
                <span className="error-text">
                  Must be a valid 10-digit TeleBirr number (starts with 09 or 07)
                </span>
              )}
              {isTeleBirrValid && (
                <span className="valid-text">✓ Valid TeleBirr number</span>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="area">Delivery Area / Sub-City</label>
              <input
                id="area"
                type="text"
                name="area"
                placeholder="e.g. Bole, Kazanchis, Piassa"
                value={form.area}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="notes">Delivery Notes (Optional)</label>
              <textarea
                id="notes"
                name="notes"
                placeholder="e.g. Near Edna Mall, 2nd floor, call upon arrival"
                value={form.notes}
                onChange={handleChange}
                rows={3}
              />
            </div>

            <button
              type="submit"
              disabled={!isTeleBirrValid}
              className="submit-btn"
            >
              Confirm Order {orderTotal > 0 ? `(${orderTotal} ETB)` : ''}
            </button>
          </form>
        )}
      </div>
    </section>
  )
}

DeliveryForm.propTypes = {
  orderTotal: PropTypes.number,
}

export default DeliveryForm

