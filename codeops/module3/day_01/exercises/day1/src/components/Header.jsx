import { Link, NavLink } from 'react-router-dom'
import { useTheme } from '../context/ThemeContext'
import { useAuth } from '../context/AuthContext'
import { useCartStore, selectTotalItems, selectOrderTotal } from '../store/cartStore'

function Header() {
  const { theme, toggleTheme } = useTheme()
  const { user, isAuthenticated, logout } = useAuth()
  
  // Exercise 5: Narrow selectors from Zustand store
  const totalItems = useCartStore(selectTotalItems)
  const orderTotal = useCartStore(selectOrderTotal)

  return (
    <header className="app-header">
      <nav>
        <ul className="nav-links">
          <li>
            <NavLink
              to="/"
              className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
              end
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/menu"
              className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
            >
              Menu
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/about"
              className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
            >
              About
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/contact"
              className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
            >
              Contact
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/checkout"
              className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
            >
              Checkout
            </NavLink>
          </li>
        </ul>
        <div className="header-actions">
          <Link to="/checkout" className="cart-badge-header" style={{ textDecoration: 'none' }}>
            🛒 Cart: <strong>{totalItems}</strong> ({orderTotal} ETB)
          </Link>

          {isAuthenticated ? (
            <div className="user-auth-badge">
              <span className="user-greeting">👤 {user.name}</span>
              <button
                type="button"
                className="theme-toggle-btn"
                onClick={() => logout()}
                style={{ fontSize: '0.8rem', padding: '0.3rem 0.6rem' }}
              >
                Sign Out
              </button>
            </div>
          ) : (
            <NavLink
              to="/login"
              className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
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
      </nav>
    </header>
  )
}

export default Header