import React, { useState, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  ArrowLeft,
  ExternalLink,
  Clock,
  User,
  BookOpen,
  Award,
  Layers,
  Sparkles,
  CheckCircle,
  Tag,
  Share2,
  Check
} from 'lucide-react';
import Rating from '../components/Rating';
import FavoriteButton from '../components/FavoriteButton';
import ResourceCard from '../components/ResourceCard';
import EmptyState from '../components/EmptyState';
import { RESOURCES } from '../data/resources';

const ResourceDetails = () => {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState('overview');
  const [copiedLink, setCopiedLink] = useState(false);

  const resource = useMemo(() => {
    return RESOURCES.find((r) => r.id === id);
  }, [id]);

  const relatedResources = useMemo(() => {
    if (!resource) return [];
    return RESOURCES.filter(
      (r) =>
        r.id !== resource.id &&
        (r.category === resource.category || r.technology === resource.technology)
    ).slice(0, 3);
  }, [resource]);

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    }
  };

  if (!resource) {
    return (
      <div className="container" style={{ paddingTop: '3rem' }}>
        <EmptyState
          title="Resource Not Found"
          message={`We couldn't locate any learning resource with ID "${id}".`}
          actionText="Back to Explore"
          actionLink="/explore"
        />
      </div>
    );
  }

  const {
    title,
    description,
    image,
    category,
    technology,
    level,
    rating,
    reviewsCount,
    duration,
    instructor,
    price,
    isFree,
    platform,
    type,
    url,
    tags,
    whatYouWillLearn,
    prerequisites
  } = resource;

  const levelClass = `level-${level.split(' ')[0]}`;

  return (
    <div className="container" style={{ paddingTop: '2rem' }}>
      <div style={{ marginBottom: '1.5rem' }}>
        <Link
          to="/explore"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
            color: 'var(--text-secondary)',
            fontSize: '0.9rem',
            fontWeight: 500
          }}
        >
          <ArrowLeft size={16} />
          Back to all resources
        </Link>
      </div>

      <div className="details-hero">
        <div>
          <div style={{ position: 'relative', marginBottom: '1.75rem' }}>
            <img
              src={image}
              alt={title}
              className="details-banner-img"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=800&q=80';
              }}
            />
            <div style={{ position: 'absolute', top: '1rem', right: '1rem' }}>
              <FavoriteButton resource={resource} size={22} />
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', flexWrap: 'wrap', marginBottom: '1rem' }}>
            <span className="category-chip" style={{ fontSize: '0.82rem', padding: '0.25rem 0.75rem' }}>
              {category}
            </span>
            <span className={`level-chip ${levelClass}`} style={{ fontSize: '0.82rem', padding: '0.25rem 0.75rem' }}>
              {level}
            </span>
            <span className="platform-badge" style={{ fontSize: '0.82rem', padding: '0.25rem 0.75rem' }}>
              {platform}
            </span>
            <span className={`price-chip ${isFree || price === 'Free' ? 'price-free' : 'price-paid'}`} style={{ fontSize: '0.82rem', padding: '0.25rem 0.75rem' }}>
              {price}
            </span>
          </div>

          <h1 style={{ fontSize: 'clamp(1.75rem, 3.5vw, 2.5rem)', marginBottom: '1rem', lineHeight: 1.25 }}>
            {title}
          </h1>

          <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', lineHeight: 1.6, marginBottom: '1.5rem' }}>
            {description}
          </p>

          <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', flexWrap: 'wrap', marginBottom: '2.5rem', paddingBottom: '1.5rem', borderBottom: '1px solid var(--border-subtle)' }}>
            <Rating rating={rating} reviewsCount={reviewsCount} size={20} />
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
              <Clock size={16} color="#818cf8" />
              <span>{duration}</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
              <User size={16} color="#38bdf8" />
              <span>{instructor}</span>
            </div>
          </div>

          <div className="details-tabs-nav">
            <button
              type="button"
              className={`tab-btn ${activeTab === 'overview' ? 'active' : ''}`}
              onClick={() => setActiveTab('overview')}
            >
              What You'll Learn
            </button>
            <button
              type="button"
              className={`tab-btn ${activeTab === 'prereqs' ? 'active' : ''}`}
              onClick={() => setActiveTab('prereqs')}
            >
              Prerequisites
            </button>
            <button
              type="button"
              className={`tab-btn ${activeTab === 'tags' ? 'active' : ''}`}
              onClick={() => setActiveTab('tags')}
            >
              Topics & Tags
            </button>
          </div>

          <div style={{ background: 'var(--bg-card)', padding: '1.75rem', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-subtle)', marginBottom: '3rem' }}>
            {activeTab === 'overview' && (
              <div>
                <h3 style={{ fontSize: '1.2rem', marginBottom: '1.25rem' }}>Learning Outcomes</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                  {(whatYouWillLearn || [
                    "Comprehensive hands-on projects and exercises",
                    "Industry standard development practices",
                    "Debugging, testing, and performance optimization"
                  ]).map((item, idx) => (
                    <div key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
                      <CheckCircle size={18} color="#34d399" style={{ flexShrink: 0, marginTop: '3px' }} />
                      <span style={{ color: 'var(--text-primary)', fontSize: '0.95rem' }}>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'prereqs' && (
              <div>
                <h3 style={{ fontSize: '1.2rem', marginBottom: '1.25rem' }}>Recommended Prerequisites</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                  {(prerequisites || ["Basic familiarity with programming"]).map((item, idx) => (
                    <div key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
                      <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--primary-light)', marginTop: '8px', flexShrink: 0 }} />
                      <span style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'tags' && (
              <div>
                <h3 style={{ fontSize: '1.2rem', marginBottom: '1.25rem' }}>Associated Technologies & Topics</h3>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.6rem' }}>
                  {(tags || [technology, category]).map((t) => (
                    <Link
                      key={t}
                      to={`/explore?search=${encodeURIComponent(t)}`}
                      className="hero-tag-chip"
                      style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem', padding: '0.4rem 0.9rem' }}
                    >
                      <Tag size={13} />
                      {t}
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        <div>
          <div className="details-card-sidebar">
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span style={{ fontSize: '1.8rem', fontWeight: 800, color: isFree || price === 'Free' ? '#34d399' : 'var(--text-primary)' }}>
                {price}
              </span>
              <span className="platform-badge">{platform}</span>
            </div>

            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary btn-lg"
              style={{ width: '100%', textDecoration: 'none' }}
            >
              <span>Start on {platform}</span>
              <ExternalLink size={18} />
            </a>

            <button
              type="button"
              onClick={handleShare}
              className="btn btn-secondary"
              style={{ width: '100%' }}
            >
              {copiedLink ? (
                <>
                  <Check size={16} color="#34d399" />
                  <span>Link Copied!</span>
                </>
              ) : (
                <>
                  <Share2 size={16} />
                  <span>Share Resource Link</span>
                </>
              )}
            </button>

            <div className="spec-list">
              <div className="spec-row">
                <span className="spec-label">
                  <Layers size={15} /> Category
                </span>
                <span className="spec-val">{category}</span>
              </div>
              <div className="spec-row">
                <span className="spec-label">
                  <Tag size={15} /> Technology
                </span>
                <span className="spec-val">{technology}</span>
              </div>
              <div className="spec-row">
                <span className="spec-label">
                  <Award size={15} /> Difficulty
                </span>
                <span className="spec-val">{level}</span>
              </div>
              <div className="spec-row">
                <span className="spec-label">
                  <BookOpen size={15} /> Format
                </span>
                <span className="spec-val">{type}</span>
              </div>
              <div className="spec-row">
                <span className="spec-label">
                  <Clock size={15} /> Duration
                </span>
                <span className="spec-val">{duration}</span>
              </div>
              <div className="spec-row">
                <span className="spec-label">
                  <User size={15} /> Instructor
                </span>
                <span className="spec-val" style={{ maxWidth: '160px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                  {instructor}
                </span>
              </div>
            </div>

            <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', textAlign: 'center' }}>
              SkillHub connects you directly to official platform hosts with no intermediary markups.
            </p>
          </div>
        </div>
      </div>

      {relatedResources.length > 0 && (
        <section style={{ marginTop: '2rem', marginBottom: '4rem', paddingTop: '3rem', borderTop: '1px solid var(--border-subtle)' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '2rem' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--primary-light)', fontSize: '0.85rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.4rem' }}>
                <Sparkles size={16} />
                <span>Recommendations</span>
              </div>
              <h2 style={{ fontSize: '1.75rem' }}>Related Resources in {category}</h2>
            </div>
            <Link to={`/explore?category=${encodeURIComponent(category)}`} className="btn btn-secondary">
              View more in {category} &rarr;
            </Link>
          </div>

          <div className="resource-grid">
            {relatedResources.map((res) => (
              <ResourceCard key={res.id} resource={res} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

export default ResourceDetails;
