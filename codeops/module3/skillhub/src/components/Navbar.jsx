import React, { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import {
  Compass,
  Search,
  Grid,
  Heart,
  Menu,
  X
} from 'lucide-react';
import { useFavorites } from '../context/FavoritesContext';

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { favoritesCount } = useFavorites();

  const closeMobileMenu = () => setMobileMenuOpen(false);

  return (
    <header className="navbar-wrapper">
      <div className="container">
        <div className="navbar-inner">
          {/* Brand Logo */}
          <Link to="/" className="brand-logo" onClick={closeMobileMenu}>
            <div className="brand-badge-box">S</div>
            <span>SkillHub</span>
          </Link>

          {/* Desktop Navigation Links */}
          <nav>
            <ul className="nav-links">
              <li>
                <NavLink to="/" end className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
                  Overview
                </NavLink>
              </li>
              <li>
                <NavLink to="/explore" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
                  <Search size={14} />
                  Explore
                </NavLink>
              </li>
              <li>
                <NavLink to="/categories" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
                  <Grid size={14} />
                  Categories
                </NavLink>
              </li>
              <li>
                <NavLink to="/favorites" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
                  <Heart size={14} fill={favoritesCount > 0 ? '#f43f5e' : 'none'} color={favoritesCount > 0 ? '#f43f5e' : 'currentColor'} />
                  Bookmarks
                  {favoritesCount > 0 && <span className="nav-badge">{favoritesCount}</span>}
                </NavLink>
              </li>
            </ul>
          </nav>

          {/* Right Action */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <Link to="/explore" className="btn btn-primary btn-sm">
              Search Catalog
            </Link>

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
            Overview
          </NavLink>
          <NavLink
            to="/explore"
            className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
            onClick={closeMobileMenu}
          >
            <Search size={14} />
            Explore All
          </NavLink>
          <NavLink
            to="/categories"
            className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
            onClick={closeMobileMenu}
          >
            <Grid size={14} />
            Categories
          </NavLink>
          <NavLink
            to="/favorites"
            className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
            onClick={closeMobileMenu}
          >
            <Heart size={14} />
            Bookmarks ({favoritesCount})
          </NavLink>
        </div>
      )}
    </header>
  );
};

export default Navbar;
