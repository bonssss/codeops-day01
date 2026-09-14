import { useState, useEffect } from 'react'
import { NavLink, Link, useLocation } from 'react-router-dom'
import { useBooks } from './BookContext'

function Header() {
  const { rentals } = useBooks()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const location = useLocation()

  // Close mobile menu whenever the route changes
  useEffect(() => {
    setMobileMenuOpen(false)
  }, [location.pathname])

  const navLinkClass = ({ isActive }) =>
    `text-sm font-semibold px-4 py-2 rounded-xl transition-all duration-200 flex items-center gap-2 ${
      isActive
        ? 'bg-black text-white shadow-xs'
        : 'text-slate-600 hover:text-black hover:bg-slate-100'
    }`

  const mobileNavLinkClass = ({ isActive }) =>
    `text-base font-semibold px-4 py-3 rounded-xl transition-all flex items-center justify-between ${
      isActive
        ? 'bg-black text-white'
        : 'text-slate-700 hover:bg-slate-100'
    }`

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo & Brand */}
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="w-10 h-10 rounded-xl bg-black text-white flex items-center justify-center text-xl shadow-xs group-hover:scale-105 transition-transform flex-shrink-0">
              📖
            </div>
            <div>
              <span className="text-xl font-black tracking-tight text-slate-900 block leading-none">
                Book<span className="text-black">Verse</span>
              </span>
              <span className="text-[10px] font-semibold text-slate-400 tracking-wider uppercase block">
                Rental & Library
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-2">
            <NavLink to="/" end className={navLinkClass}>
              <span>📚</span>
              <span>Catalog</span>
            </NavLink>

            <NavLink to="/rent" className={navLinkClass}>
              <span>🏷️</span>
              <span>Rent a Book</span>
            </NavLink>

            <NavLink to="/my-rentals" className={navLinkClass}>
              <span>📦</span>
              <span>My Rentals</span>
              {rentals.length > 0 && (
                <span className="ml-1 px-2 py-0.5 text-[10px] font-bold rounded-full bg-black text-white border border-slate-700">
                  {rentals.length}
                </span>
              )}
            </NavLink>
          </nav>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center gap-2">
            <NavLink
              to="/my-rentals"
              className="relative p-2 text-slate-700 hover:text-black"
              aria-label="My Rentals"
            >
              <span className="text-xl">📦</span>
              {rentals.length > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 text-[9px] font-bold bg-black text-white rounded-full flex items-center justify-center">
                  {rentals.length}
                </span>
              )}
            </NavLink>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              type="button"
              className="p-2 rounded-xl text-slate-700 hover:text-black hover:bg-slate-100 transition-colors focus:outline-none"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? (
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-slate-200 px-4 pt-2 pb-5 space-y-2 animate-fade-in shadow-lg">
          <NavLink to="/" end className={mobileNavLinkClass}>
            <div className="flex items-center gap-2">
              <span>📚</span>
              <span>Catalog</span>
            </div>
            <span className="text-xs text-slate-400">Browse books →</span>
          </NavLink>

          <NavLink to="/rent" className={mobileNavLinkClass}>
            <div className="flex items-center gap-2">
              <span>🏷️</span>
              <span>Rent a Book</span>
            </div>
            <span className="text-xs text-slate-400">Checkout →</span>
          </NavLink>

          <NavLink to="/my-rentals" className={mobileNavLinkClass}>
            <div className="flex items-center gap-2">
              <span>📦</span>
              <span>My Rentals</span>
            </div>
            {rentals.length > 0 ? (
              <span className="px-2 py-0.5 text-xs font-bold rounded-full bg-slate-900 text-white">
                {rentals.length} active
              </span>
            ) : (
              <span className="text-xs text-slate-400">0 active</span>
            )}
          </NavLink>
        </div>
      )}
    </header>
  )
}

export default Header
