import React from 'react';
import { SlidersHorizontal, X } from 'lucide-react';
import {
  CATEGORIES,
  DIFFICULTY_LEVELS,
  PRICE_TYPES,
  CONTENT_TYPES,
  SORT_OPTIONS
} from '../data/resources';

const FilterBar = ({
  category,
  setCategory,
  level,
  setLevel,
  priceType,
  setPriceType,
  contentType,
  setContentType,
  sortBy,
  setSortBy,
  onClearAll,
  totalResults = 0
}) => {
  const hasActiveFilters =
    category !== 'all' ||
    level !== 'all' ||
    priceType !== 'all' ||
    contentType !== 'all' ||
    sortBy !== 'popularity';

  return (
    <div className="filter-bar-container">
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 700, fontSize: '0.95rem' }}>
          <SlidersHorizontal size={18} color="#818cf8" />
          <span>Filters & Sorting</span>
          <span style={{ fontSize: '0.82rem', color: 'var(--text-muted)', fontWeight: 500 }}>
            ({totalResults} {totalResults === 1 ? 'result' : 'results'})
          </span>
        </div>

        {hasActiveFilters && (
          <button type="button" onClick={onClearAll} className="clear-all-btn">
            Reset All Filters
          </button>
        )}
      </div>

      <div className="filter-grid">
        {/* Category Select */}
        <div className="filter-group">
          <label htmlFor="filter-cat" className="filter-label">Category</label>
          <select
            id="filter-cat"
            className="filter-select"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="all">All Categories</option>
            {CATEGORIES.map((cat) => (
              <option key={cat.id} value={cat.slug}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>

        {/* Difficulty Level Select */}
        <div className="filter-group">
          <label htmlFor="filter-lvl" className="filter-label">Difficulty</label>
          <select
            id="filter-lvl"
            className="filter-select"
            value={level}
            onChange={(e) => setLevel(e.target.value)}
          >
            {DIFFICULTY_LEVELS.map((lvl) => (
              <option key={lvl.value} value={lvl.value}>
                {lvl.label}
              </option>
            ))}
          </select>
        </div>

        {/* Price Select */}
        <div className="filter-group">
          <label htmlFor="filter-price" className="filter-label">Price</label>
          <select
            id="filter-price"
            className="filter-select"
            value={priceType}
            onChange={(e) => setPriceType(e.target.value)}
          >
            {PRICE_TYPES.map((pt) => (
              <option key={pt.value} value={pt.value}>
                {pt.label}
              </option>
            ))}
          </select>
        </div>

        {/* Content Type Select */}
        <div className="filter-group">
          <label htmlFor="filter-type" className="filter-label">Format Type</label>
          <select
            id="filter-type"
            className="filter-select"
            value={contentType}
            onChange={(e) => setContentType(e.target.value)}
          >
            {CONTENT_TYPES.map((ct) => (
              <option key={ct.value} value={ct.value}>
                {ct.label}
              </option>
            ))}
          </select>
        </div>

        {/* Sort By Select */}
        <div className="filter-group">
          <label htmlFor="filter-sort" className="filter-label">Sort Order</label>
          <select
            id="filter-sort"
            className="filter-select"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            {SORT_OPTIONS.map((so) => (
              <option key={so.value} value={so.value}>
                {so.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Active Filter Chips */}
      {hasActiveFilters && (
        <div className="active-filters-row">
          <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Active filters:</span>

          {category !== 'all' && (
            <span className="filter-chip-active">
              Category: {category}
              <X size={12} className="filter-chip-remove" onClick={() => setCategory('all')} />
            </span>
          )}

          {level !== 'all' && (
            <span className="filter-chip-active">
              Level: {level}
              <X size={12} className="filter-chip-remove" onClick={() => setLevel('all')} />
            </span>
          )}

          {priceType !== 'all' && (
            <span className="filter-chip-active">
              Price: {priceType === 'free' ? 'Free Only' : 'Paid Only'}
              <X size={12} className="filter-chip-remove" onClick={() => setPriceType('all')} />
            </span>
          )}

          {contentType !== 'all' && (
            <span className="filter-chip-active">
              Type: {contentType}
              <X size={12} className="filter-chip-remove" onClick={() => setContentType('all')} />
            </span>
          )}

          {sortBy !== 'popularity' && (
            <span className="filter-chip-active">
              Sorted by: {SORT_OPTIONS.find((s) => s.value === sortBy)?.label}
              <X size={12} className="filter-chip-remove" onClick={() => setSortBy('popularity')} />
            </span>
          )}
        </div>
      )}
    </div>
  );
};

export default FilterBar;
