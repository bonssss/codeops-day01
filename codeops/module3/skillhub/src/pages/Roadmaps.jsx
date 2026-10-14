import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search, Filter, Compass } from 'lucide-react';
import RoadmapCard from '../components/RoadmapCard';
import { RoadmapCardSkeleton } from '../components/LoadingSpinner';
import { ROADMAPS, ROADMAP_CATEGORIES } from '../data/roadmaps';

const Roadmaps = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const initialCategory = searchParams.get('category') || 'all';
  const initialSearch = searchParams.get('search') || '';
  const initialLevel = searchParams.get('level') || 'all';

  const [searchQuery, setSearchQuery] = useState(initialSearch);
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [selectedLevel, setSelectedLevel] = useState(initialLevel);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 200);
    return () => clearTimeout(timer);
  }, [selectedCategory, searchQuery, selectedLevel]);

  const updateFilters = (newParams) => {
    const updated = new URLSearchParams(searchParams);
    Object.entries(newParams).forEach(([key, val]) => {
      if (val && val !== 'all') {
        updated.set(key, val);
      } else {
        updated.delete(key);
      }
    });
    setSearchParams(updated);
  };

  const handleCategorySelect = (catId) => {
    setSelectedCategory(catId);
    updateFilters({ category: catId });
  };

  const handleSearchChange = (e) => {
    const val = e.target.value;
    setSearchQuery(val);
    updateFilters({ search: val });
  };

  const handleLevelChange = (e) => {
    const val = e.target.value;
    setSelectedLevel(val);
    updateFilters({ level: val });
  };

  const handleClearFilters = () => {
    setSearchQuery('');
    setSelectedCategory('all');
    setSelectedLevel('all');
    setSearchParams({});
  };

  const filteredRoadmaps = useMemo(() => {
    return ROADMAPS.filter((roadmap) => {
      const query = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !query ||
        roadmap.title.toLowerCase().includes(query) ||
        roadmap.tagline.toLowerCase().includes(query) ||
        roadmap.overview.toLowerCase().includes(query) ||
        roadmap.careerRoles.some((role) => role.toLowerCase().includes(query)) ||
        roadmap.stages.some((stage) =>
          stage.topics.some(
            (topic) =>
              topic.title.toLowerCase().includes(query) ||
              topic.skills.some((skill) => skill.toLowerCase().includes(query))
          )
        );

      const matchesCategory =
        selectedCategory === 'all' || roadmap.category === selectedCategory;

      const matchesLevel =
        selectedLevel === 'all' ||
        roadmap.level.toLowerCase().includes(selectedLevel.toLowerCase());

      return matchesSearch && matchesCategory && matchesLevel;
    });
  }, [searchQuery, selectedCategory, selectedLevel]);

  return (
    <div className="roadmaps-page container" style={{ paddingTop: '2rem', paddingBottom: '4rem' }}>
      {/* Clean Header */}
      <div style={{ marginBottom: '1.75rem' }}>
        <h1 className="page-hero-title" style={{ fontSize: '2.25rem', marginBottom: '0.4rem' }}>
          Developer Roadmaps
        </h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.98rem', margin: 0 }}>
          Structured learning paths with free courses, official docs, and practical projects.
        </p>
      </div>

      {/* Search and Category Filter Toolbar */}
      <div className="roadmaps-toolbar">
        <div className="roadmaps-search-box">
          <Search size={16} className="search-box-icon" />
          <input
            type="text"
            className="roadmaps-search-input"
            placeholder="Search stack or skill (React, Docker, Python, SQL)..."
            value={searchQuery}
            onChange={handleSearchChange}
          />
          {searchQuery && (
            <button
              type="button"
              className="search-clear-btn"
              onClick={() => handleSearchChange({ target: { value: '' } })}
            >
              ✕
            </button>
          )}
        </div>

        <div className="roadmaps-level-select-wrap">
          <Filter size={14} className="filter-select-icon" />
          <select
            value={selectedLevel}
            onChange={handleLevelChange}
            className="filter-level-select"
          >
            <option value="all">All Levels</option>
            <option value="beginner">Beginner Friendly</option>
            <option value="intermediate">Intermediate</option>
            <option value="advanced">Advanced</option>
          </select>
        </div>
      </div>

      {/* Category Pills */}
      <div className="category-pills-row">
        {ROADMAP_CATEGORIES.map((cat) => (
          <button
            key={cat.id}
            type="button"
            onClick={() => handleCategorySelect(cat.id)}
            className={`category-pill-btn ${selectedCategory === cat.id ? 'active' : ''}`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Results Count & Clear */}
      <div className="roadmaps-results-summary">
        <span className="results-count-text">
          {filteredRoadmaps.length} {filteredRoadmaps.length === 1 ? 'roadmap' : 'roadmaps'}
        </span>
        {(searchQuery || selectedCategory !== 'all' || selectedLevel !== 'all') && (
          <button
            type="button"
            onClick={handleClearFilters}
            className="btn btn-outline btn-xs clear-filters-btn"
          >
            Reset Filters
          </button>
        )}
      </div>

      {/* Roadmaps Grid */}
      {isLoading ? (
        <div className="roadmaps-grid">
          {[1, 2, 3, 4, 5, 6].map((n) => (
            <RoadmapCardSkeleton key={n} />
          ))}
        </div>
      ) : filteredRoadmaps.length === 0 ? (
        <div className="empty-results-box">
          <Compass size={36} className="empty-icon" />
          <h4>No roadmaps found</h4>
          <p>Try different keywords or clear your filters.</p>
          <button
            type="button"
            onClick={handleClearFilters}
            className="btn btn-primary btn-sm"
            style={{ marginTop: '0.75rem' }}
          >
            Show All
          </button>
        </div>
      ) : (
        <div className="roadmaps-grid">
          {filteredRoadmaps.map((roadmap) => (
            <RoadmapCard key={roadmap.id} roadmap={roadmap} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Roadmaps;
