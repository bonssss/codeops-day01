import React, { useState } from 'react'
import PropTypes from 'prop-types'

function OrderForm({ orderTotal = 0 }) {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    area: '',
  })
  const [submitted, setSubmitted] = useState(false)

  // Single change handler using spread syntax to update state object
  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }))
    if (submitted) setSubmitted(false)
  }

  // TeleBirr phone validation: accepts 0911223344, +251911223344 (and 07/ +2517)
  const trimmedPhone = formData.phone.trim()
  const isTeleBirrValid = /^(09\d{8}|\+2519\d{8}|07\d{8}|\+2517\d{8})$/.test(trimmedPhone)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!isTeleBirrValid) return
    setSubmitted(true)
  }

  return (
    <section className="order-form-section">
      <div className="order-form-card">
        <h2>Delivery & Payment</h2>
        <p className="form-subtitle">Complete your delivery details with TeleBirr</p>

        {submitted ? (
          <div className="order-success-banner">
            <h3>🎉 Order Received!</h3>
            <p>Customer: <strong>{formData.name}</strong></p>
            <p>Delivery Location: <strong>{formData.area}</strong></p>
            <p>TeleBirr Number: <strong>{formData.phone}</strong></p>
            <p>Total Amount: <strong>{orderTotal} ETB</strong></p>
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
              disabled={!isTeleBirrValid}
              className="submit-order-btn"
            >
              Pay with TeleBirr ({orderTotal} ETB)
            </button>
          </form>
        )}
      </div>
    </section>
  )
}

OrderForm.propTypes = {
  orderTotal: PropTypes.number,
}

export default OrderForm
