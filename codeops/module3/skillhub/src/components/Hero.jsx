import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ArrowRight, Search } from 'lucide-react';

const POPULAR_TRACKS = [
  { label: 'Frontend', path: '/roadmap/frontend-development' },
  { label: 'Backend', path: '/roadmap/backend-development' },
  { label: 'Full-Stack', path: '/roadmap/fullstack-development' },
  { label: 'DevOps', path: '/roadmap/devops-cloud' },
  { label: 'AI / ML', path: '/roadmap/ai-machine-learning' },
  { label: 'Cybersecurity', path: '/roadmap/cybersecurity' },
  { label: 'QA', path: '/roadmap/qa-test-automation' }
];

const Hero = () => {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  const handleSearchSubmit = (e) => {
    if (e) e.preventDefault();
    if (query.trim()) {
      navigate(`/roadmaps?search=${encodeURIComponent(query.trim())}`);
    } else {
      navigate('/roadmaps');
    }
  };

  return (
    <section className="hero-section">
      <div className="container">
        {/* Headline */}
        <h1 className="hero-title">
          Developer Roadmaps. <span className="gradient-text">100% Free.</span>
        </h1>

        {/* Crisp Subtitle */}
        <p className="hero-subtitle">
          Step-by-step learning paths, verified free resources, and practical projects from beginner to job-ready.
        </p>

        {/* Clean Search Bar */}
        <form onSubmit={handleSearchSubmit} className="hero-search-wrapper">
          <div className="hero-search-input-box">
            <Search size={18} className="hero-search-icon" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search tech stack, skill, or tool (e.g. React, Docker, Python)..."
              className="hero-search-field"
            />
            <button type="submit" className="btn btn-primary btn-sm hero-search-btn">
              <span>Explore</span>
              <ArrowRight size={14} />
            </button>
          </div>
        </form>

        {/* Clean Quick Tracks */}
        <div className="hero-pills-row">
          {POPULAR_TRACKS.map((track) => (
            <Link key={track.label} to={track.path} className="pill-item">
              {track.label}
            </Link>
          ))}
        </div>

        {/* Compact stats bar */}
        <div className="metrics-strip compact">
          <div className="metric-cell">
            <span className="metric-val">11</span>
            <span className="metric-label">Roadmaps</span>
          </div>
          <div className="metric-cell">
            <span className="metric-val">30+</span>
            <span className="metric-label">Projects</span>
          </div>
          <div className="metric-cell">
            <span className="metric-val" style={{ color: 'var(--emerald)' }}>Free</span>
            <span className="metric-label">No Paywalls</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
