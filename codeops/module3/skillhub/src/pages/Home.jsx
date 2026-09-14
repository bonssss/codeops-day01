import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Layers, Flame, CheckCircle, Compass } from 'lucide-react';
import Hero from '../components/Hero';
import CategoryCard from '../components/CategoryCard';
import ResourceCard from '../components/ResourceCard';
import { CATEGORIES, RESOURCES } from '../data/resources';

const Home = () => {
  const trendingResources = useMemo(() => {
    return RESOURCES.filter((r) => r.featured || r.popularity >= 95).slice(0, 6);
  }, []);

  const freeResources = useMemo(() => {
    return RESOURCES.filter((r) => r.isFree || r.price === 'Free').slice(0, 3);
  }, []);

  const categoryCounts = useMemo(() => {
    const counts = {};
    RESOURCES.forEach((r) => {
      counts[r.category] = (counts[r.category] || 0) + 1;
    });
    return counts;
  }, []);

  return (
    <div className="home-page">
      {/* Hero */}
      <Hero />

      {/* Categories */}
      <section style={{ padding: '3.5rem 0' }}>
        <div className="container">
          <div className="section-header">
            <div>
              <div className="section-label">Disciplines</div>
              <h2 className="section-title">Browse by Technical Domain</h2>
            </div>
            <Link to="/categories" className="btn btn-secondary btn-sm">
              All 8 Tracks <ArrowRight size={14} />
            </Link>
          </div>

          <div className="categories-grid">
            {CATEGORIES.map((cat) => (
              <CategoryCard
                key={cat.id}
                category={cat}
                resourceCount={categoryCounts[cat.slug] || 0}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Trending Resources */}
      <section style={{ padding: '3.5rem 0', background: 'var(--bg-surface)', borderTop: '1px solid var(--border-subtle)', borderBottom: '1px solid var(--border-subtle)' }}>
        <div className="container">
          <div className="section-header">
            <div>
              <div className="section-label" style={{ color: 'var(--amber)' }}>Trending</div>
              <h2 className="section-title">Popular Learning Materials</h2>
            </div>
            <Link to="/explore" className="btn btn-secondary btn-sm">
              Explore All {RESOURCES.length} Resources <ArrowRight size={14} />
            </Link>
          </div>

          <div className="resource-grid">
            {trendingResources.map((res) => (
              <ResourceCard key={res.id} resource={res} />
            ))}
          </div>
        </div>
      </section>

      {/* Free Resources Section */}
      <section style={{ padding: '3.5rem 0' }}>
        <div className="container">
          <div className="section-header">
            <div>
              <div className="section-label" style={{ color: 'var(--emerald)' }}>Open Access</div>
              <h2 className="section-title">Recommended Free Resources</h2>
            </div>
            <Link to="/explore?price=free" className="btn btn-secondary btn-sm">
              View All Free <ArrowRight size={14} />
            </Link>
          </div>

          <div className="resource-grid">
            {freeResources.map((res) => (
              <ResourceCard key={res.id} resource={res} />
            ))}
          </div>
        </div>
      </section>

      {/* Call To Action Box */}
      <section className="container">
        <div className="cta-box">
          <h2 style={{ fontSize: '1.85rem', marginBottom: '0.75rem' }}>
            Start discovering verified learning tracks today.
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.98rem', maxWidth: '540px', margin: '0 auto 1.75rem' }}>
            Filter across difficulty levels, formats, and verified platforms to streamline your learning journey.
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
            <Link to="/explore" className="btn btn-primary">
              Explore Catalog
            </Link>
            <Link to="/categories" className="btn btn-secondary">
              Browse Categories
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
