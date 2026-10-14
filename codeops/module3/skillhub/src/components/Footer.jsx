import React from 'react';
import { Link } from 'react-router-dom';
import { Compass, Heart, Github, Twitter, Linkedin, ExternalLink, ShieldCheck } from 'lucide-react';
import { ROADMAPS } from '../data/roadmaps';

const Footer = () => {
  return (
    <footer className="footer-wrap">
      <div className="container">
        <div className="footer-grid">
          {/* Brand Col */}
          <div>
            <Link to="/" className="brand-logo" style={{ marginBottom: '1rem', display: 'inline-flex' }}>
              <div className="brand-badge-box">S</div>
              <div className="brand-text-group">
                <span className="brand-name">skiilhub</span>
                <span className="brand-free-pill">100% Free</span>
              </div>
            </Link>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', maxWidth: '340px', lineHeight: 1.6, marginBottom: '1.25rem' }}>
              Free, community-accessible learning roadmaps and curated materials for developers, data analysts, security specialists, and engineers worldwide.
            </p>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', color: 'var(--emerald)', fontSize: '0.85rem', fontWeight: 600, marginBottom: '1rem' }}>
              <ShieldCheck size={16} />
              <span>100% Free Verified Resources</span>
            </div>

            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
              <a
                href="https://github.com/bonssss/codeops-day01"
                target="_blank"
                rel="noreferrer"
                className="btn btn-outline btn-xs"
                aria-label="GitHub Repository"
                title="GitHub Repository"
              >
                <Github size={13} />
                <span>GitHub</span>
                <ExternalLink size={11} />
              </a>

              <Link
                to="/tracker"
                className="btn btn-outline btn-xs"
                title="Backup or sync progress across devices"
              >
                <span>Sync Devices</span>
              </Link>
            </div>
          </div>

          {/* Roadmaps */}
          <div>
            <h4 className="footer-col-title">Career Roadmaps</h4>
            <ul className="footer-links-list">
              <li><Link to="/roadmap/frontend-development" className="footer-link-item">Frontend Developer</Link></li>
              <li><Link to="/roadmap/backend-development" className="footer-link-item">Backend Developer</Link></li>
              <li><Link to="/roadmap/fullstack-development" className="footer-link-item">Full-Stack Developer</Link></li>
              <li><Link to="/roadmap/devops-cloud" className="footer-link-item">DevOps & Cloud</Link></li>
              <li><Link to="/roadmap/cybersecurity" className="footer-link-item">Cybersecurity</Link></li>
              <li><Link to="/roadmaps" className="footer-link-item" style={{ color: 'var(--accent)', fontWeight: 600 }}>View All 11 Tracks →</Link></li>
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="footer-col-title">Learning Tools</h4>
            <ul className="footer-links-list">
              <li><Link to="/roadmaps" className="footer-link-item">All Roadmaps Catalog</Link></li>
              <li><Link to="/tracker" className="footer-link-item">My Progress Tracker</Link></li>
              <li><Link to="/explore" className="footer-link-item">Free Resource Library</Link></li>
              <li><Link to="/categories" className="footer-link-item">Browse Disciplines</Link></li>
              <li><Link to="/favorites" className="footer-link-item">Saved Bookmarks</Link></li>
            </ul>
          </div>

          {/* Trusted Free Providers */}
          <div>
            <h4 className="footer-col-title">Free Providers</h4>
            <ul className="footer-links-list">
              <li><a href="https://developer.mozilla.org" target="_blank" rel="noreferrer" className="footer-link-item">Mozilla MDN <ExternalLink size={11} style={{ display: 'inline', marginLeft: '0.2rem' }} /></a></li>
              <li><a href="https://www.freecodecamp.org" target="_blank" rel="noreferrer" className="footer-link-item">freeCodeCamp <ExternalLink size={11} style={{ display: 'inline', marginLeft: '0.2rem' }} /></a></li>
              <li><a href="https://www.theodinproject.com" target="_blank" rel="noreferrer" className="footer-link-item">The Odin Project <ExternalLink size={11} style={{ display: 'inline', marginLeft: '0.2rem' }} /></a></li>
              <li><a href="https://cs50.harvard.edu" target="_blank" rel="noreferrer" className="footer-link-item">Harvard CS50 <ExternalLink size={11} style={{ display: 'inline', marginLeft: '0.2rem' }} /></a></li>
              <li><a href="https://fullstackopen.com/en/" target="_blank" rel="noreferrer" className="footer-link-item">Full Stack Open <ExternalLink size={11} style={{ display: 'inline', marginLeft: '0.2rem' }} /></a></li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="footer-bottom">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.3rem' }}>
            <span>&copy; {new Date().getFullYear()} skiilhub — 100% Free Open Technical Education.</span>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}>
              Developed by{' '}
              <a
                href="https://github.com/bonssss"
                target="_blank"
                rel="noreferrer"
                style={{ color: 'var(--accent)', fontWeight: 600, textDecoration: 'none' }}
              >
                Bonsa
              </a>
              <Heart size={12} color="#f43f5e" fill="#f43f5e" />
            </span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem', flexWrap: 'wrap' }}>
            <Link to="/roadmaps" className="footer-link-item" style={{ fontSize: '0.8rem' }}>Roadmaps</Link>
            <Link to="/explore" className="footer-link-item" style={{ fontSize: '0.8rem' }}>Library</Link>
            <Link to="/tracker" className="footer-link-item" style={{ fontSize: '0.8rem' }}>Tracker</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
