import React from 'react';
import { Link } from 'react-router-dom';
import {
  Layout,
  Server,
  BarChart3,
  BrainCircuit,
  ShieldCheck,
  Terminal,
  Smartphone,
  Palette,
  ArrowRight,
  Code
} from 'lucide-react';

const ICON_MAP = {
  Layout,
  Server,
  BarChart3,
  BrainCircuit,
  ShieldCheck,
  Terminal,
  Smartphone,
  Palette
};

const CategoryCard = ({ category, resourceCount = 0 }) => {
  const IconComponent = ICON_MAP[category.icon] || Code;

  return (
    <Link
      to={`/explore?category=${encodeURIComponent(category.slug)}`}
      className="category-card"
    >
      <div className="category-top-row">
        <div className="category-icon-square">
          <IconComponent size={18} />
        </div>
        <span className="category-count-badge">
          {resourceCount} {resourceCount === 1 ? 'item' : 'items'}
        </span>
      </div>

      <h3 className="category-name">{category.name}</h3>
      <p className="category-desc">{category.description}</p>

      <div className="category-footer-link">
        <span>Browse track</span>
        <ArrowRight size={13} />
      </div>
    </Link>
  );
};

export default CategoryCard;
