import { NavLink, Link } from 'react-router-dom'
import { useBooks } from './BookContext'

function Header() {
  const { rentals } = useBooks()

  const navLinkClass = ({ isActive }) =>
    `text-sm font-semibold px-4 py-2 rounded-xl transition-all duration-200 flex items-center gap-1.5 ${
      isActive
        ? 'bg-black text-white shadow-sm'
        : 'text-slate-600 hover:text-black hover:bg-slate-100'
    }`

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo & Brand */}
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="w-10 h-10 rounded-xl bg-black text-white flex items-center justify-center text-xl shadow-sm group-hover:scale-105 transition-transform">
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

          {/* Navigation Links */}
          <nav className="flex items-center gap-2">
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
        </div>
      </div>
    </header>
  )
}

export default Header
