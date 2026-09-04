import { useTheme } from '../context/ThemeContext'
import { useCart } from '../context/CartContext'

function Header() {
  const { theme, toggleTheme } = useTheme()
  const { totalItems, orderTotal } = useCart()

  return (
    <header className="app-header">
      <nav>
        <ul>
          <li><a href="#">Home</a></li>
          <li><a href="#">About</a></li>
          <li><a href="#">Contact</a></li>
          <li><a href="#">Menu</a></li>
        </ul>
        <div className="header-actions">
          <span className="cart-badge-header">
            🛒 Cart: <strong>{totalItems}</strong> ({orderTotal} ETB)
          </span>
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