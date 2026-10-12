import React, { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import {
  Compass,
  Search,
  Heart,
  Trophy,
  Menu,
  X,
  Sun,
  Moon
} from 'lucide-react';
import { useFavorites } from '../context/FavoritesContext';
import { useTheme } from '../context/ThemeContext';
import { useProgress } from '../hooks/useProgress';

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { favoritesCount } = useFavorites();
  const { toggleTheme, isDark } = useTheme();
  const { overallStats } = useProgress();

  const closeMobileMenu = () => setMobileMenuOpen(false);

  return (
    <header className="navbar-wrapper">
      <div className="container">
        <div className="navbar-inner">
          {/* Brand Logo */}
          <Link to="/" className="brand-logo" onClick={closeMobileMenu}>
            <div className="brand-badge-box">S</div>
            <div className="brand-text-group">
              <span className="brand-name">skiilhub</span>
              <span className="brand-free-pill">100% Free</span>
            </div>
          </Link>

          {/* Desktop Navigation Links - Clean, uncluttered essential links */}
          <nav>
            <ul className="nav-links">
              <li>
                <NavLink to="/roadmaps" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
                  <Compass size={15} />
                  <span>Roadmaps</span>
                </NavLink>
              </li>
              <li>
                <NavLink to="/explore" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
                  <Search size={14} />
                  <span>Library</span>
                </NavLink>
              </li>
              <li>
                <NavLink to="/tracker" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
                  <Trophy size={15} />
                  <span>Tracker</span>
                  {overallStats.completedTopicsCount > 0 && (
                    <span className="nav-badge emerald">{overallStats.completedTopicsCount}</span>
                  )}
                </NavLink>
              </li>
              <li>
                <NavLink to="/favorites" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
                  <Heart
                    size={14}
                    fill={favoritesCount > 0 ? '#f43f5e' : 'none'}
                    color={favoritesCount > 0 ? '#f43f5e' : 'currentColor'}
                  />
                  <span>Bookmarks</span>
                  {favoritesCount > 0 && <span className="nav-badge">{favoritesCount}</span>}
                </NavLink>
              </li>
            </ul>
          </nav>

          {/* Right Controls: Theme Toggle */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
            <button
              type="button"
              className="theme-toggle-btn"
              onClick={toggleTheme}
              aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
              title={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            >
              {isDark ? <Sun size={17} /> : <Moon size={17} />}
            </button>

            <button
              type="button"
              className="mobile-nav-toggle"
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
            >
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="mobile-menu-drawer open">
          <NavLink
            to="/"
            end
            className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
            onClick={closeMobileMenu}
          >
            Home
          </NavLink>
          <NavLink
            to="/roadmaps"
            className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
            onClick={closeMobileMenu}
          >
            <Compass size={15} />
            <span>Roadmaps</span>
          </NavLink>
          <NavLink
            to="/explore"
            className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
            onClick={closeMobileMenu}
          >
            <Search size={14} />
            <span>Library</span>
          </NavLink>
          <NavLink
            to="/tracker"
            className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
            onClick={closeMobileMenu}
          >
            <Trophy size={15} />
            <span>Tracker ({overallStats.completedTopicsCount})</span>
          </NavLink>
          <NavLink
            to="/favorites"
            className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
            onClick={closeMobileMenu}
          >
            <Heart size={14} />
            <span>Bookmarks ({favoritesCount})</span>
          </NavLink>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: '0.75rem', marginTop: '0.5rem', borderTop: '1px solid var(--border-subtle)' }}>
            <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Theme: {isDark ? 'Dark Mode' : 'Light Mode'}</span>
            <button
              type="button"
              className="theme-toggle-btn"
              onClick={toggleTheme}
              aria-label="Toggle theme"
            >
              {isDark ? <Sun size={17} /> : <Moon size={17} />}
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
