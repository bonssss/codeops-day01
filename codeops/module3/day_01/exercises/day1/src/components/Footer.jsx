import { Link } from 'react-router-dom'

function Footer() {
  return (
    <footer className="app-footer">
      <div className="footer-grid">
        <div className="footer-brand-col">
          <Link to="/" className="brand-logo footer-logo">
            <span className="brand-icon">🍽️</span>
            <span className="brand-name">Addis Eats</span>
          </Link>
          <p className="footer-description">
            Addis Ababa&apos;s premier online kitchen delivering authentic Ethiopian traditional delicacies and gourmet favorites hot in 30 minutes.
          </p>
          <div className="footer-payment-badge">
            <span>💳 Verified TeleBirr Partner</span>
          </div>
        </div>

        <div className="footer-links-col">
          <h4>Navigation</h4>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/menu">Full Menu</Link></li>
            <li><Link to="/about">Our Story</Link></li>
            <li><Link to="/contact">Contact Support</Link></li>
            <li><Link to="/checkout">Cart & Checkout</Link></li>
          </ul>
        </div>

        <div className="footer-links-col">
          <h4>Delivery Hubs</h4>
          <div className="footer-hubs-tags">
            <span className="hub-tag">📍 Bole</span>
            <span className="hub-tag">📍 Kazanchis</span>
            <span className="hub-tag">📍 Megenagna</span>
            <span className="hub-tag">📍 Piassa</span>
          </div>
          <div className="footer-hours-note">
            <strong>⏰ Operating Hours:</strong>
            <p>7:30 AM – 11:00 PM Daily</p>
          </div>
        </div>
      </div>

      <div className="footer-bottom-bar">
        <p>© {new Date().getFullYear()} Addis Eats. All rights reserved.</p>
        <p className="footer-tagline">Crafted with ❤️ in Addis Ababa, Ethiopia.</p>
      </div>
    </footer>
  )
}

export default Footer
