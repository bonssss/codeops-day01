import { useState, useRef } from 'react'
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

const DELIVERY_AREAS = ['Bole', 'Kazanchis', 'Megenagna', 'Piassa']

/**
 * Exercise 3: Pure validation function called during render
 * Returns an object containing validation error messages per field.
 */
export function validate(values) {
  const errors = {}

  if (!values.name || !values.name.trim()) {
    errors.name = 'Full name is required'
  }

  const cleanedPhone = (values.phone || '').trim()
  if (!cleanedPhone) {
    errors.phone = 'TeleBirr phone number is required'
  } else if (!/^(09|07)\d{8}$|^(\+251)(9|7)\d{8}$/.test(cleanedPhone)) {
    errors.phone = 'Enter a valid 10-digit TeleBirr number (starts with 09 or 07)'
  }

  if (!values.area) {
    errors.area = 'Please select a delivery area'
  }

  return errors
}

function DeliveryForm({ orderTotal = 0 }) {
  const [form, setForm] = useState(initialFormState)
  const [touched, setTouched] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [serverError, setServerError] = useState(null)
  const [simulateFailure, setSimulateFailure] = useState(true)

  // Exercise 7: Refs for focusing bad fields
  const nameInputRef = useRef(null)
  const phoneInputRef = useRef(null)
  const areaSelectRef = useRef(null)
  const notesTextareaRef = useRef(null)

  // Pure validation evaluated during render
  const errors = validate(form)
  const isValid = Object.keys(errors).length === 0

  const focusFirstBadField = (errs) => {
    if (errs.name) {
      nameInputRef.current?.focus()
    } else if (errs.phone) {
      phoneInputRef.current?.focus()
    } else if (errs.area) {
      areaSelectRef.current?.focus()
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }))
    // Clear server error upon editing input
    if (serverError) {
      setServerError(null)
    }
  }

  // Exercise 4: Track touched fields on blur
  const handleBlur = (e) => {
    const { name } = e.target
    setTouched((prev) => ({
      ...prev,
      [name]: true,
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setServerError(null)

    // Mark all fields as touched upon submission attempt
    setTouched({
      name: true,
      phone: true,
      area: true,
      notes: true,
    })

    // Exercise 7: Focus first bad field if client validation fails
    if (!isValid) {
      focusFirstBadField(errors)
      return
    }

    // Exercise 6 & 7: Submitting state & simulated server request
    setIsSubmitting(true)
    try {
      await new Promise((resolve) => setTimeout(resolve, 800))

      // Exercise 7: Simulate failed server request
      if (simulateFailure) {
        throw new Error(
          `TeleBirr transaction failed: Insufficient balance or invalid merchant authentication for ${form.phone}. Please check your number and try again.`
        )
      }

      setSubmitted(true)
    } catch (err) {
      // Exercise 7: Show reason, keep every value, and focus the first bad field
      setServerError(err.message || 'Payment simulation failed. Please try again.')
      phoneInputRef.current?.focus()
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleReset = () => {
    setForm(initialFormState)
    setTouched({})
    setIsSubmitting(false)
    setSubmitted(false)
    setServerError(null)
  }

  return (
    <section className="delivery-section">
      <div className="delivery-card">
        <h2>Delivery Details</h2>
        <p className="delivery-subtitle">Enter your details to complete the order with TeleBirr</p>

        {/* Exercise 7: Show error reason when request fails */}
        {serverError && (
          <div className="server-error-banner" role="alert">
            <h4>⚠️ Order Processing Failed</h4>
            <p>{serverError}</p>
          </div>
        )}

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
          <form onSubmit={handleSubmit} className="delivery-form" noValidate>
            {/* Full Name Field */}
            <div className="form-group">
              <label htmlFor="name">Full Name</label>
              <input
                ref={nameInputRef}
                id="name"
                type="text"
                name="name"
                placeholder="e.g. Abebe Bikila"
                value={form.name}
                onChange={handleChange}
                onBlur={handleBlur}
                aria-invalid={Boolean(touched.name && errors.name)}
                aria-describedby={touched.name && errors.name ? 'name-error' : undefined}
                className={touched.name && errors.name ? 'invalid' : touched.name && form.name ? 'valid' : ''}
              />
              {touched.name && errors.name && (
                <span id="name-error" className="error-text" role="alert">
                  {errors.name}
                </span>
              )}
            </div>

            {/* TeleBirr Phone Number Field */}
            <div className="form-group">
              <label htmlFor="phone">TeleBirr Phone Number</label>
              <input
                ref={phoneInputRef}
                id="phone"
                type="tel"
                name="phone"
                placeholder="e.g. 0911223344 or 0711223344"
                value={form.phone}
                onChange={handleChange}
                onBlur={handleBlur}
                aria-invalid={Boolean(touched.phone && errors.phone)}
                aria-describedby={touched.phone && errors.phone ? 'phone-error' : undefined}
                className={
                  touched.phone && errors.phone
                    ? 'invalid'
                    : touched.phone && !errors.phone && form.phone
                    ? 'valid'
                    : ''
                }
              />
              {touched.phone && errors.phone && (
                <span id="phone-error" className="error-text" role="alert">
                  {errors.phone}
                </span>
              )}
              {touched.phone && !errors.phone && form.phone && (
                <span className="valid-text">✓ Valid TeleBirr number</span>
              )}
            </div>

            {/* Delivery Area Dropdown */}
            <div className="form-group">
              <label htmlFor="area">Delivery Area / Sub-City</label>
              <select
                ref={areaSelectRef}
                id="area"
                name="area"
                value={form.area}
                onChange={handleChange}
                onBlur={handleBlur}
                aria-invalid={Boolean(touched.area && errors.area)}
                aria-describedby={touched.area && errors.area ? 'area-error' : undefined}
                className={
                  touched.area && errors.area
                    ? 'invalid'
                    : touched.area && !errors.area && form.area
                    ? 'valid'
                    : ''
                }
              >
                <option value="">Select an area...</option>
                {DELIVERY_AREAS.map((areaOption) => (
                  <option key={areaOption} value={areaOption}>
                    {areaOption}
                  </option>
                ))}
              </select>
              {touched.area && errors.area && (
                <span id="area-error" className="error-text" role="alert">
                  {errors.area}
                </span>
              )}
            </div>

            {/* Optional Notes Field */}
            <div className="form-group">
              <label htmlFor="notes">Delivery Notes (Optional)</label>
              <textarea
                ref={notesTextareaRef}
                id="notes"
                name="notes"
                placeholder="e.g. Near Edna Mall, 2nd floor, call upon arrival"
                value={form.notes}
                onChange={handleChange}
                onBlur={handleBlur}
                aria-invalid={false}
                rows={3}
              />
            </div>

            {/* Exercise 6: Disabled during submission with ETB total in label */}
            <button
              type="submit"
              disabled={isSubmitting || !isValid}
              className="submit-btn"
            >
              {isSubmitting
                ? `Submitting Order (${orderTotal} ETB)...`
                : `Confirm Order (${orderTotal} ETB)`}
            </button>

            {/* Exercise 7: Simulation toggle control */}
            <label className="simulation-toggle">
              <input
                type="checkbox"
                checked={simulateFailure}
                onChange={(e) => setSimulateFailure(e.target.checked)}
              />
              Simulate failed server request (Exercise 7)
            </label>
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

