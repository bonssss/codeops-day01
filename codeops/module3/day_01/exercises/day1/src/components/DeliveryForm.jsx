import { useReducer } from 'react'
import PropTypes from 'prop-types'

/**
 * ============================================================================
 * Exercise 4: useState vs useReducer Comparison
 * ============================================================================
 * 
 * 1. useState Approach:
 *    - Structure: Multiple separate useState hooks (e.g., [name, setName], [phone, setPhone],
 *      [area, setArea], [submitted, setSubmitted]).
 *    - Pros: Simple for 1-2 independent primitives with straightforward toggles.
 *    - Cons: Updating multiple related fields simultaneously requires calling multiple setters;
 *      spread operations (...prev) are scattered across event handlers; increases risk of
 *      inconsistent/impossible intermediate states during form reset or submission.
 * 
 * 2. useReducer Approach:
 *    - Structure: A single state object managed by a pure reducer function with action dispatches
 *      (e.g., UPDATE_FIELD, SUBMIT_SUCCESS, RESET_FORM).
 *    - Pros: Centralizes all state transitions in one place outside the component; simplifies
 *      complex atomic transitions (like submitting and resetting all fields at once); separates
 *      "what happened" (actions) from "how state updates" (reducer logic); scales easily for
 *      larger forms and testing.
 * ============================================================================
 */

const FORM_ACTIONS = {
  UPDATE_FIELD: 'UPDATE_FIELD',
  SUBMIT_SUCCESS: 'SUBMIT_SUCCESS',
  RESET_FORM: 'RESET_FORM',
}

const initialFormState = {
  name: '',
  phone: '',
  area: '',
  submitted: false,
}

function formReducer(state, action) {
  switch (action.type) {
    case FORM_ACTIONS.UPDATE_FIELD:
      return {
        ...state,
        [action.field]: action.value,
        submitted: false, // Reset submitted status whenever user edits input
      }
    case FORM_ACTIONS.SUBMIT_SUCCESS:
      return {
        ...state,
        submitted: true,
      }
    case FORM_ACTIONS.RESET_FORM:
      return initialFormState
    default:
      return state
  }
}

function DeliveryForm({ orderTotal = 0 }) {
  // Exercise 4: Converted from useState to useReducer
  const [formState, dispatch] = useReducer(formReducer, initialFormState)

  const handleChange = (e) => {
    const { name, value } = e.target
    dispatch({
      type: FORM_ACTIONS.UPDATE_FIELD,
      field: name,
      value,
    })
  }

  // TeleBirr phone validation: Ethiopian numbers starting with 09 or 07 (10 digits) or +251 9/7...
  const cleanedPhone = formState.phone.trim()
  const isTeleBirrValid =
    /^(09|07)\d{8}$/.test(cleanedPhone) || /^(\+251)(9|7)\d{8}$/.test(cleanedPhone)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!isTeleBirrValid) return
    dispatch({ type: FORM_ACTIONS.SUBMIT_SUCCESS })
  }

  const handleReset = () => {
    dispatch({ type: FORM_ACTIONS.RESET_FORM })
  }

  return (
    <section className="delivery-section">
      <div className="delivery-card">
        <h2>Delivery Details</h2>
        <p className="delivery-subtitle">Enter your details to complete the order with TeleBirr</p>

        {formState.submitted ? (
          <div className="order-success-message">
            <h3>🎉 Order Placed Successfully!</h3>
            <p>Thank you, <strong>{formState.name}</strong>!</p>
            <p>We will deliver to <strong>{formState.area}</strong>.</p>
            <p>Payment of <strong>{orderTotal} ETB</strong> requested via TeleBirr to <strong>{formState.phone}</strong>.</p>
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
                value={formState.name}
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
                value={formState.phone}
                onChange={handleChange}
                className={formState.phone.length > 0 ? (isTeleBirrValid ? 'valid' : 'invalid') : ''}
                required
              />
              {formState.phone.length > 0 && !isTeleBirrValid && (
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
                value={formState.area}
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

