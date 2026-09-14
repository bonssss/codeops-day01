import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Terminal } from 'lucide-react';
import SearchBar from './SearchBar';

const QUICK_TOPICS = [
  'React',
  'Next.js',
  'Python',
  'Docker',
  'Deep Learning',
  'Figma',
  'PostgreSQL',
  'Kubernetes'
];

const Hero = () => {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  const handleSearchSubmit = (e) => {
    if (e) e.preventDefault();
    if (query.trim()) {
      navigate(`/explore?search=${encodeURIComponent(query.trim())}`);
    } else {
      navigate('/explore');
    }
  };

  const handleTagClick = (tag) => {
    navigate(`/explore?search=${encodeURIComponent(tag)}`);
  };

  return (
    <section className="hero-section">
      <div className="container">
        {/* Status Tag */}
        <div className="hero-tagline-chip">
          <span className="hero-tagline-dot" />
          <span>Curated Index of Technical Learning Resources</span>
        </div>

        {/* Headline */}
        <h1 className="hero-title">
          Learn. Build. Grow.
        </h1>

        {/* Subtitle */}
        <p className="hero-subtitle">
          An open discovery directory for developers and engineers. Find battle-tested courses, official docs, tutorials, and books across modern software stacks.
        </p>

        {/* Search Bar Form */}
        <form onSubmit={handleSearchSubmit} className="hero-search-wrapper">
          <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
            <div style={{ flex: 1 }}>
              <SearchBar
                value={query}
                onChange={setQuery}
                onClear={() => setQuery('')}
                placeholder="Search by skill, framework, or topic (e.g. React, Python, Docker)..."
              />
            </div>
            <button type="submit" className="btn btn-primary" style={{ padding: '0.85rem 1.4rem' }}>
              <span>Search</span>
              <ArrowRight size={15} />
            </button>
          </div>
        </form>

        {/* Quick Topic Pills */}
        <div className="hero-pills-row">
          <span style={{ fontSize: '0.8rem', color: 'var(--text-dim)', marginRight: '0.25rem' }}>
            Quick index:
          </span>
          {QUICK_TOPICS.map((topic) => (
            <button
              key={topic}
              type="button"
              className="pill-item"
              onClick={() => handleTagClick(topic)}
            >
              {topic}
            </button>
          ))}
        </div>

        {/* Structured Metrics Grid */}
        <div className="metrics-strip">
          <div className="metric-cell">
            <div className="metric-val">500+</div>
            <div className="metric-label">Verified Tech Resources</div>
          </div>
          <div className="metric-cell">
            <div className="metric-val">8</div>
            <div className="metric-label">Engineering Domains</div>
          </div>
          <div className="metric-cell">
            <div className="metric-val" style={{ color: 'var(--emerald)' }}>100%</div>
            <div className="metric-label">Free & Paid Transparency</div>
          </div>
          <div className="metric-cell">
            <div className="metric-val">4.9/5</div>
            <div className="metric-label">Average Community Score</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
