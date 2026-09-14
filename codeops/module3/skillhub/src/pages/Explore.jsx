import React, { useState, useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { LayoutGrid, List, Sparkles } from 'lucide-react';
import SearchBar from '../components/SearchBar';
import FilterBar from '../components/FilterBar';
import ResourceGrid from '../components/ResourceGrid';
import { RESOURCES } from '../data/resources';

const Explore = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const initialSearch = searchParams.get('search') || '';
  const initialCategory = searchParams.get('category') || 'all';
  const initialLevel = searchParams.get('level') || 'all';
  const initialPrice = searchParams.get('price') || 'all';
  const initialType = searchParams.get('type') || 'all';
  const initialSort = searchParams.get('sort') || 'popularity';

  const [searchQuery, setSearchQuery] = useState(initialSearch);
  const [category, setCategory] = useState(initialCategory);
  const [level, setLevel] = useState(initialLevel);
  const [priceType, setPriceType] = useState(initialPrice);
  const [contentType, setContentType] = useState(initialType);
  const [sortBy, setSortBy] = useState(initialSort);
  const [viewMode, setViewMode] = useState('grid');

  useEffect(() => {
    setSearchQuery(searchParams.get('search') || '');
    setCategory(searchParams.get('category') || 'all');
    setLevel(searchParams.get('level') || 'all');
    setPriceType(searchParams.get('price') || 'all');
    setContentType(searchParams.get('type') || 'all');
    setSortBy(searchParams.get('sort') || 'popularity');
  }, [searchParams]);

  const updateParams = (newParams) => {
    const updated = new URLSearchParams(searchParams);
    Object.entries(newParams).forEach(([key, value]) => {
      if (value && value !== 'all') {
        updated.set(key, value);
      } else {
        updated.delete(key);
      }
    });
    setSearchParams(updated);
  };

  const handleSearchChange = (val) => {
    setSearchQuery(val);
    updateParams({ search: val });
  };

  const handleCategoryChange = (val) => {
    setCategory(val);
    updateParams({ category: val });
  };

  const handleLevelChange = (val) => {
    setLevel(val);
    updateParams({ level: val });
  };

  const handlePriceChange = (val) => {
    setPriceType(val);
    updateParams({ price: val });
  };

  const handleTypeChange = (val) => {
    setContentType(val);
    updateParams({ type: val });
  };

  const handleSortChange = (val) => {
    setSortBy(val);
    updateParams({ sort: val });
  };

  const handleResetAll = () => {
    setSearchQuery('');
    setCategory('all');
    setLevel('all');
    setPriceType('all');
    setContentType('all');
    setSortBy('popularity');
    setSearchParams({});
  };

  const filteredResources = useMemo(() => {
    let result = [...RESOURCES];

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      result = result.filter((item) => {
        const titleMatch = item.title.toLowerCase().includes(q);
        const descMatch = item.description.toLowerCase().includes(q);
        const techMatch = item.technology.toLowerCase().includes(q);
        const catMatch = item.category.toLowerCase().includes(q);
        const instructorMatch = item.instructor.toLowerCase().includes(q);
        const platformMatch = item.platform.toLowerCase().includes(q);
        const tagsMatch = item.tags?.some((t) => t.toLowerCase().includes(q));

        return titleMatch || descMatch || techMatch || catMatch || instructorMatch || platformMatch || tagsMatch;
      });
    }

    if (category !== 'all') {
      result = result.filter(
        (item) => item.category.toLowerCase() === category.toLowerCase()
      );
    }

    if (level !== 'all') {
      result = result.filter(
        (item) => item.level.toLowerCase() === level.toLowerCase()
      );
    }

    if (priceType === 'free') {
      result = result.filter((item) => item.isFree || item.price.toLowerCase().includes('free'));
    } else if (priceType === 'paid') {
      result = result.filter((item) => !item.isFree && !item.price.toLowerCase().includes('free'));
    }

    if (contentType !== 'all') {
      result = result.filter(
        (item) => item.type.toLowerCase() === contentType.toLowerCase()
      );
    }

    result.sort((a, b) => {
      if (sortBy === 'popularity') {
        return (b.popularity || 0) - (a.popularity || 0);
      }
      if (sortBy === 'rating') {
        return b.rating - a.rating;
      }
      if (sortBy === 'title_asc') {
        return a.title.localeCompare(b.title);
      }
      if (sortBy === 'duration_asc') {
        const getHours = (dur) => parseInt(dur, 10) || 999;
        return getHours(a.duration) - getHours(b.duration);
      }
      return 0;
    });

    return result;
  }, [searchQuery, category, level, priceType, contentType, sortBy]);

  return (
    <div className="container" style={{ paddingTop: '2rem' }}>
      <div style={{ marginBottom: '2.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--primary-light)', fontSize: '0.85rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.4rem' }}>
          <Sparkles size={16} />
          <span>Curated Tech Catalog</span>
        </div>
        <h1 style={{ fontSize: '2.5rem', marginBottom: '0.75rem' }}>
          Explore Learning Resources
        </h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem', maxWidth: '680px' }}>
          Search and filter across courses, tutorials, documentations, and books to find the perfect learning material.
        </p>
      </div>

      <div style={{ marginBottom: '1.5rem' }}>
        <SearchBar
          value={searchQuery}
          onChange={handleSearchChange}
          onClear={() => handleSearchChange('')}
          placeholder="Search by title, description, technology (e.g. React, Docker, Python)..."
        />
      </div>

      <FilterBar
        category={category}
        setCategory={handleCategoryChange}
        level={level}
        setLevel={handleLevelChange}
        priceType={priceType}
        setPriceType={handlePriceChange}
        contentType={contentType}
        setContentType={handleTypeChange}
        sortBy={sortBy}
        setSortBy={handleSortChange}
        onClearAll={handleResetAll}
        totalResults={filteredResources.length}
      />

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
        <div style={{ fontSize: '0.92rem', color: 'var(--text-secondary)' }}>
          Showing <span style={{ color: 'var(--text-primary)', fontWeight: 700 }}>{filteredResources.length}</span> of {RESOURCES.length} learning resources
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', background: 'var(--bg-card)', padding: '0.25rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)' }}>
          <button
            type="button"
            className={`btn btn-sm ${viewMode === 'grid' ? 'btn-primary' : 'btn-secondary'}`}
            onClick={() => setViewMode('grid')}
            title="Grid View"
            aria-label="Grid View"
            style={{ padding: '0.35rem 0.6rem' }}
          >
            <LayoutGrid size={16} />
          </button>
          <button
            type="button"
            className={`btn btn-sm ${viewMode === 'list' ? 'btn-primary' : 'btn-secondary'}`}
            onClick={() => setViewMode('list')}
            title="List View"
            aria-label="List View"
            style={{ padding: '0.35rem 0.6rem' }}
          >
            <List size={16} />
          </button>
        </div>
      </div>

      <ResourceGrid
        resources={filteredResources}
        viewMode={viewMode}
        onResetFilters={handleResetAll}
      />
    </div>
  );
};

export default Explore;
