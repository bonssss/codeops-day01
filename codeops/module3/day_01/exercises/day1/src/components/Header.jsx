import { Link, NavLink } from 'react-router-dom'
import { useTheme } from '../context/ThemeContext'
import { useCart } from '../context/CartContext'

function Header() {
  const { theme, toggleTheme } = useTheme()
  const { totalItems, orderTotal } = useCart()

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
        </ul>
        <div className="header-actions">
          <Link to="/checkout" className="cart-badge-header" style={{ textDecoration: 'none' }}>
            🛒 Cart: <strong>{totalItems}</strong> ({orderTotal} ETB)
          </Link>
          <button
            type="button"
            className="theme-toggle-btn"
            onClick={toggleTheme}
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? '☀️ Light Mode' : '🌙 Dark Mode'}
          </button>
        </div>
      </nav>
    </header>
  )
}

export default Header