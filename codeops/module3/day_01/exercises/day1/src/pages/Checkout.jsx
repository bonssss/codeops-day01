import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useCart } from '../context/CartContext'
import DeliveryForm from '../components/DeliveryForm'

function Checkout() {
  const { user } = useAuth()
  const { items, orderTotal, totalItems, dispatch } = useCart()

  return (
    <div className="checkout-page">
      <div className="checkout-header">
        <h1>Order Checkout</h1>
        <p className="subtitle">
          Signed in as <strong>{user?.name}</strong> ({user?.email})
        </p>
      </div>

      <div className="checkout-grid">
        <div className="checkout-summary-card">
          <h2>Cart Summary ({totalItems} items)</h2>

          {items.length === 0 ? (
            <div className="empty-state" style={{ margin: '1rem 0' }}>
              <p>Your cart is empty.</p>
              <div style={{ marginTop: '1rem' }}>
                <Link to="/menu" className="btn-primary">
                  Browse Menu & Add Dishes
                </Link>
              </div>
            </div>
          ) : (
            <div className="checkout-items-list">
              {items.map((item) => (
                <div key={item.id} className="checkout-item-row">
                  <div className="checkout-item-details">
                    <span className="checkout-item-name">{item.name}</span>
                    <span className="checkout-item-price">
                      {item.price} {item.currency || 'ETB'} × {item.quantity}
                    </span>
                  </div>
                  <div className="checkout-item-subtotal">
                    {item.price * item.quantity} {item.currency || 'ETB'}
                  </div>
                </div>
              ))}

              <div className="checkout-total-row">
                <span>Total Amount:</span>
                <span className="total-amount">{orderTotal} ETB</span>
              </div>

              <button
                type="button"
                className="btn-secondary"
                style={{ width: '100%', marginTop: '1rem' }}
                onClick={() => dispatch({ type: 'CLEAR_CART' })}
              >
                🗑️ Clear Cart
              </button>
            </div>
          )}
        </div>

        <div className="checkout-form-container">
          <DeliveryForm orderTotal={orderTotal} />
        </div>
      </div>
    </div>
  )
}

export default Checkout
