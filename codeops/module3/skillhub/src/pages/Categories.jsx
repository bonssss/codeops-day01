import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Grid, ArrowRight } from 'lucide-react';
import CategoryCard from '../components/CategoryCard';
import { CATEGORIES, RESOURCES } from '../data/resources';

const Categories = () => {
  const categoryCounts = useMemo(() => {
    const counts = {};
    RESOURCES.forEach((r) => {
      counts[r.category] = (counts[r.category] || 0) + 1;
    });
    return counts;
  }, []);

  return (
    <div className="container" style={{ paddingTop: '2rem' }}>
      <div style={{ marginBottom: '3rem', textAlign: 'center' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', color: 'var(--primary-light)', fontSize: '0.85rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.5rem' }}>
          <Grid size={16} />
          <span>Curated Tech Tracks</span>
        </div>
        <h1 style={{ fontSize: '2.75rem', marginBottom: '1rem' }}>
          Explore by <span className="gradient-text">Category</span>
        </h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', maxWidth: '640px', margin: '0 auto' }}>
          Dive into structured learning tracks covering frontend, cloud systems, deep learning, mobile architecture, security, and design.
        </p>
      </div>

      <div className="categories-grid" style={{ marginBottom: '4rem' }}>
        {CATEGORIES.map((cat) => (
          <div key={cat.id} style={{ display: 'flex', flexDirection: 'column' }}>
            <CategoryCard
              category={cat}
              resourceCount={categoryCounts[cat.slug] || 0}
            />

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', marginTop: '0.75rem' }}>
              {cat.featuredTech?.map((tech) => (
                <Link
                  key={tech}
                  to={`/explore?search=${encodeURIComponent(tech)}`}
                  className="hero-tag-chip"
                  style={{ fontSize: '0.75rem', padding: '0.2rem 0.6rem' }}
                >
                  {tech}
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="cta-banner" style={{ marginTop: '2rem' }}>
        <h3 style={{ fontSize: '1.75rem', marginBottom: '0.75rem' }}>
          Looking for Something Specific?
        </h3>
        <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem', maxWidth: '520px', margin: '0 auto 1.5rem' }}>
          Use our multi-parameter filter to search by price, experience level, formats, and platforms.
        </p>
        <Link to="/explore" className="btn btn-primary btn-lg">
          Browse All Learning Materials <ArrowRight size={18} />
        </Link>
      </div>
    </div>
  );
};

export default Categories;
