import { useState } from 'react'
import PropTypes from 'prop-types'

function DeliveryForm({ orderTotal = 0 }) {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    area: '',
  })
  const [submitted, setSubmitted] = useState(false)

  // Single change handler for all form fields
  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }))
    if (submitted) setSubmitted(false)
  }

  // TeleBirr phone validation: Ethiopian numbers starting with 09 or 07 (10 digits) or +251 9/7...
  const cleanedPhone = formData.phone.trim()
  const isTeleBirrValid =
    /^(09|07)\d{8}$/.test(cleanedPhone) || /^(\+251)(9|7)\d{8}$/.test(cleanedPhone)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!isTeleBirrValid) return
    setSubmitted(true)
  }

  return (
    <section className="delivery-section">
      <div className="delivery-card">
        <h2>Delivery Details</h2>
        <p className="delivery-subtitle">Enter your details to complete the order with TeleBirr</p>

        {submitted ? (
          <div className="order-success-message">
            <h3>🎉 Order Placed Successfully!</h3>
            <p>Thank you, <strong>{formData.name}</strong>!</p>
            <p>We will deliver to <strong>{formData.area}</strong>.</p>
            <p>Payment of <strong>{orderTotal} ETB</strong> requested via TeleBirr to <strong>{formData.phone}</strong>.</p>
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
                value={formData.name}
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
                value={formData.phone}
                onChange={handleChange}
                className={formData.phone.length > 0 ? (isTeleBirrValid ? 'valid' : 'invalid') : ''}
                required
              />
              {formData.phone.length > 0 && !isTeleBirrValid && (
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
                value={formData.area}
                onChange={handleChange}
                required
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
