import React from 'react';
import { Link } from 'react-router-dom';
import { Clock, User, ArrowUpRight } from 'lucide-react';
import Rating from './Rating';
import FavoriteButton from './FavoriteButton';

const ResourceCard = ({ resource, viewMode = 'grid' }) => {
  if (!resource) return null;

  const {
    id,
    title,
    description,
    image,
    category,
    level,
    rating,
    reviewsCount,
    duration,
    instructor,
    price,
    isFree,
    platform
  } = resource;

  return (
    <div className={`resource-card ${viewMode === 'list' ? 'resource-card-list' : ''}`}>
      {/* Thumbnail */}
      <div className="resource-thumb-box">
        <Link to={`/resource/${id}`} style={{ display: 'block', height: '100%' }}>
          <img
            src={image}
            alt={title}
            className="resource-thumb-img"
            loading="lazy"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=800&q=80';
            }}
          />
        </Link>

        <div className="thumb-overlay-top">
          <span className="platform-tag">{platform}</span>
          <FavoriteButton resource={resource} className="card-fav-btn" />
        </div>
      </div>

      {/* Content */}
      <div className="resource-content">
        <div className="resource-meta-row">
          <span className="chip-tag chip-category">{category}</span>
          <span className="chip-tag">{level}</span>
          <span className={`chip-tag ${isFree || price === 'Free' ? 'chip-price-free' : 'chip-price-paid'}`}>
            {price}
          </span>
        </div>

        <Link to={`/resource/${id}`}>
          <h3 className="resource-card-title" title={title}>
            {title}
          </h3>
        </Link>

        <p className="resource-card-desc">{description}</p>

        {/* Rating & Duration */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.85rem' }}>
          <Rating rating={rating} reviewsCount={reviewsCount} />
          <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', fontSize: '0.78rem', color: 'var(--text-dim)', fontFamily: 'var(--font-mono)' }}>
            <Clock size={12} />
            {duration}
          </span>
        </div>

        {/* Info Bar */}
        <div className="resource-info-bar">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--text-muted)', fontSize: '0.8rem', maxWidth: '65%', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
            <User size={13} color="var(--text-dim)" />
            <span>{instructor}</span>
          </div>

          <Link
            to={`/resource/${id}`}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.2rem',
              fontSize: '0.8rem',
              fontWeight: 600,
              color: 'var(--accent)'
            }}
          >
            <span>View</span>
            <ArrowUpRight size={14} />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ResourceCard;
