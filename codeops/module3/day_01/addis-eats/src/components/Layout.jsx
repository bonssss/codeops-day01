import React from 'react'
import { NavLink, Link, Outlet } from 'react-router-dom'
import CartBadge from './CartBadge'
import { useAuth } from '../context/AuthContext'

export function Layout() {
  const { user, logout } = useAuth()

  return (
    <div className="app">
      <header className="navbar">
        <div className="nav-brand">
          <Link to="/" className="brand-logo">
            <span className="brand-icon">🇪🇹</span>
            <span className="brand-title">Addis Eats</span>
          </Link>
        </div>

        <nav className="nav-links" aria-label="Main Navigation">
          <NavLink
            to="/"
            end
            className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
          >
            Home
          </NavLink>
          <NavLink
            to="/menu"
            className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
          >
            Menu
          </NavLink>
          <NavLink
            to="/cart"
            className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
          >
            <CartBadge />
          </NavLink>
          <NavLink
            to="/checkout"
            className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
          >
            Checkout
          </NavLink>
          {user ? (
            <div className="auth-nav-user">
              <span className="user-greeting">Hi, {user.name}</span>
              <button type="button" onClick={logout} className="logout-btn">
                Logout
              </button>
            </div>
          ) : (
            <NavLink
              to="/login"
              className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
            >
              Login
            </NavLink>
          )}
        </nav>
      </header>

      <main className="main-content">
        <Outlet />
      </main>

      <footer className="footer">
        <p>© 2026 Addis Eats · Authentic Ethiopian Flavors & Delivery</p>
      </footer>
    </div>
  )
}

export default Layout
