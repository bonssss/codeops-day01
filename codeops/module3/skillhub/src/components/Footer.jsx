import React from 'react';
import { Link } from 'react-router-dom';
import { Compass, Heart, Github, Twitter, Linkedin, ExternalLink } from 'lucide-react';
import { CATEGORIES } from '../data/resources';

const Footer = () => {
  return (
    <footer className="footer-wrap">
      <div className="container">
        <div className="footer-grid">
          {/* Brand Col */}
          <div>
            <Link to="/" className="brand-logo" style={{ marginBottom: '1rem', display: 'inline-flex' }}>
              <div className="brand-icon-box" style={{ width: '32px', height: '32px' }}>
                <Compass size={18} color="#fff" />
              </div>
              <span>
                Skill<span style={{ color: 'var(--primary-light)' }}>Hub</span>
              </span>
            </Link>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', maxWidth: '340px', lineHeight: 1.6, marginBottom: '1.5rem' }}>
              The curated discovery platform for developers, data scientists, and engineers to find the best online courses, tutorials, and documentations.
            </p>
            <div style={{ display: 'flex', gap: '0.75rem' }}>
              <a
                href="https://github.com"
                target="_blank"
                rel="noreferrer"
                className="btn btn-secondary btn-sm"
                aria-label="GitHub"
              >
                <Github size={16} />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noreferrer"
                className="btn btn-secondary btn-sm"
                aria-label="Twitter"
              >
                <Twitter size={16} />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                className="btn btn-secondary btn-sm"
                aria-label="LinkedIn"
              >
                <Linkedin size={16} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="footer-col-title">Explore</h4>
            <ul className="footer-links-list">
              <li><Link to="/explore" className="footer-link-item">All Resources</Link></li>
              <li><Link to="/explore?price=free" className="footer-link-item">Free Courses</Link></li>
              <li><Link to="/explore?level=Beginner" className="footer-link-item">Beginner Friendly</Link></li>
              <li><Link to="/categories" className="footer-link-item">Browse Categories</Link></li>
              <li><Link to="/favorites" className="footer-link-item">My Saved List</Link></li>
            </ul>
          </div>

          {/* Top Categories */}
          <div>
            <h4 className="footer-col-title">Categories</h4>
            <ul className="footer-links-list">
              {CATEGORIES.slice(0, 5).map((cat) => (
                <li key={cat.id}>
                  <Link
                    to={`/explore?category=${encodeURIComponent(cat.slug)}`}
                    className="footer-link-item"
                  >
                    {cat.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Platform Information */}
          <div>
            <h4 className="footer-col-title">Platforms</h4>
            <ul className="footer-links-list">
              <li><a href="https://react.dev" target="_blank" rel="noreferrer" className="footer-link-item">Official Docs <ExternalLink size={12} style={{ display: 'inline' }} /></a></li>
              <li><a href="https://www.freecodecamp.org" target="_blank" rel="noreferrer" className="footer-link-item">freeCodeCamp <ExternalLink size={12} style={{ display: 'inline' }} /></a></li>
              <li><a href="https://www.coursera.org" target="_blank" rel="noreferrer" className="footer-link-item">Coursera <ExternalLink size={12} style={{ display: 'inline' }} /></a></li>
              <li><a href="https://www.udemy.com" target="_blank" rel="noreferrer" className="footer-link-item">Udemy <ExternalLink size={12} style={{ display: 'inline' }} /></a></li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="footer-bottom">
          <span>&copy; {new Date().getFullYear()} SkillHub Learning Discovery. Built with React & Vite.</span>
          <span style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
            Empowering developers worldwide <Heart size={14} color="#f43f5e" fill="#f43f5e" />
          </span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
