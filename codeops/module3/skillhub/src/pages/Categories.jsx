import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Grid, ArrowRight, Compass, BookOpen } from 'lucide-react';
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
    <div className="container" style={{ paddingTop: '2.5rem', paddingBottom: '4rem' }}>
      <div style={{ marginBottom: '3rem', textAlign: 'center' }}>
        <div className="section-label-chip" style={{ display: 'inline-flex', marginBottom: '0.5rem' }}>
          <Grid size={15} />
          <span>Technical Disciplines</span>
        </div>
        <h1 className="page-hero-title">
          Explore by <span className="gradient-text">Engineering Discipline</span>
        </h1>
        <p className="page-hero-subtitle">
          Discover structured learning roadmaps, verified free resources, and practical projects across all major tech specializations.
        </p>
      </div>

      <div className="categories-grid" style={{ marginBottom: '3.5rem' }}>
        {CATEGORIES.map((cat) => (
          <div key={cat.id} className="category-wrapper-block">
            <CategoryCard
              category={cat}
              resourceCount={categoryCounts[cat.slug] || 0}
            />

            {cat.roadmapId && (
              <div style={{ marginTop: '0.6rem', padding: '0 0.25rem' }}>
                <Link
                  to={`/roadmap/${cat.roadmapId}`}
                  className="btn btn-primary btn-xs w-full"
                  style={{ justifyContent: 'center' }}
                >
                  <Compass size={13} />
                  <span>Open {cat.name} Roadmap</span>
                  <ArrowRight size={12} />
                </Link>
              </div>
            )}

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', marginTop: '0.6rem' }}>
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
          Want to follow a structured roadmap instead?
        </h3>
        <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem', maxWidth: '520px', margin: '0 auto 1.5rem' }}>
          Follow our 11 step-by-step career roadmaps complete with 100% free learning resources and real-world projects.
        </p>
        <Link to="/roadmaps" className="btn btn-primary btn-lg">
          Browse All Learning Roadmaps <ArrowRight size={18} />
        </Link>
      </div>
    </div>
  );
};

export default Categories;
