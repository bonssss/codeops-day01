import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { useTheme } from '../context/ThemeContext'
import { useAuth } from '../context/AuthContext'
import { useCartStore, selectTotalItems, selectOrderTotal } from '../store/cartStore'

function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { theme, toggleTheme } = useTheme()
  const { user, isAuthenticated, logout } = useAuth()
  
  // Narrow selectors from Zustand store
  const totalItems = useCartStore(selectTotalItems)
  const orderTotal = useCartStore(selectOrderTotal)

  const closeMenu = () => setMobileMenuOpen(false)

  return (
    <header className="app-header">
      <nav>
        <div className="nav-brand-bar">
          <Link to="/" className="brand-logo" onClick={closeMenu} aria-label="Addis Eats Home">
            <span className="brand-icon">🍽️</span>
            <span className="brand-name">Addis Eats</span>
          </Link>

          {/* Mobile Actions: Cart counter & Hamburger Toggle */}
          <div className="mobile-header-actions">
            <Link to="/checkout" className="cart-badge-header mobile-only" onClick={closeMenu} aria-label="Cart">
              🛒 <strong>{totalItems}</strong>
            </Link>
            <button
              type="button"
              className="mobile-menu-toggle"
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? '✕' : '☰'}
            </button>
          </div>
        </div>

        <div className={`nav-content-collapsible ${mobileMenuOpen ? 'open' : ''}`}>
          <ul className="nav-links">
            <li>
              <NavLink
                to="/"
                className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
                onClick={closeMenu}
                end
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/menu"
                className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
                onClick={closeMenu}
              >
                Menu
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/about"
                className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
                onClick={closeMenu}
              >
                About
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/contact"
                className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
                onClick={closeMenu}
              >
                Contact
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/checkout"
                className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
                onClick={closeMenu}
              >
                Checkout
              </NavLink>
            </li>
          </ul>

          <div className="header-actions">
            <Link to="/checkout" className="cart-badge-header desktop-only" onClick={closeMenu}>
              🛒 Cart: <strong>{totalItems}</strong> ({orderTotal} ETB)
            </Link>

            {isAuthenticated ? (
              <div className="user-auth-badge">
                <span className="user-greeting">👤 {user.name}</span>
                <button
                  type="button"
                  className="theme-toggle-btn"
                  onClick={() => {
                    logout()
                    closeMenu()
                  }}
                  style={{ fontSize: '0.8rem', padding: '0.3rem 0.6rem' }}
                >
                  Sign Out
                </button>
              </div>
            ) : (
              <NavLink
                to="/login"
                className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
                onClick={closeMenu}
                style={{ fontWeight: 600 }}
              >
                Sign In
              </NavLink>
            )}

            <button
              type="button"
              className="theme-toggle-btn"
              onClick={toggleTheme}
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? '☀️ Light' : '🌙 Dark'}
            </button>
          </div>
        </div>
      </nav>
    </header>
  )
}

export default Header