import React, { useState, useMemo } from 'react';
import {
  Heart,
  Trash2,
  BookmarkX,
  Layers,
  DollarSign,
  Gift
} from 'lucide-react';
import { useFavorites } from '../context/FavoritesContext';
import ResourceCard from '../components/ResourceCard';
import SearchBar from '../components/SearchBar';
import EmptyState from '../components/EmptyState';

const Favorites = () => {
  const { favorites, clearFavorites } = useFavorites();
  const [filterQuery, setFilterQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const favoriteCategories = useMemo(() => {
    const set = new Set(favorites.map((item) => item.category));
    return Array.from(set);
  }, [favorites]);

  const filteredFavorites = useMemo(() => {
    return favorites.filter((item) => {
      const matchesQuery =
        !filterQuery.trim() ||
        item.title.toLowerCase().includes(filterQuery.toLowerCase()) ||
        item.technology.toLowerCase().includes(filterQuery.toLowerCase()) ||
        item.instructor.toLowerCase().includes(filterQuery.toLowerCase());

      const matchesCat =
        selectedCategory === 'all' ||
        item.category.toLowerCase() === selectedCategory.toLowerCase();

      return matchesQuery && matchesCat;
    });
  }, [favorites, filterQuery, selectedCategory]);

  const stats = useMemo(() => {
    const freeCount = favorites.filter((f) => f.isFree || f.price === 'Free').length;
    const paidCount = favorites.length - freeCount;
    return { freeCount, paidCount };
  }, [favorites]);

  const handleClearAll = () => {
    if (window.confirm('Are you sure you want to remove all saved learning resources from your favorites?')) {
      clearFavorites();
    }
  };

  return (
    <div className="container" style={{ paddingTop: '2rem' }}>
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '2.5rem', flexWrap: 'wrap', gap: '1.5rem' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--accent-rose)', fontSize: '0.85rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.4rem' }}>
            <Heart size={16} fill="currentColor" />
            <span>Personal Bookmarks</span>
          </div>
          <h1 style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>
            My Saved Learning Resources
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem' }}>
            Review, organize, and access all your saved courses, books, and tutorials in one place.
          </p>
        </div>

        {favorites.length > 0 && (
          <button
            type="button"
            onClick={handleClearAll}
            className="btn btn-danger"
            style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}
          >
            <Trash2 size={16} />
            <span>Clear All Favorites</span>
          </button>
        )}
      </div>

      {favorites.length === 0 ? (
        <EmptyState
          icon={BookmarkX}
          title="No favorites saved yet"
          message="You haven't bookmarked any learning resources. Click the heart icon on any course or tutorial to save it for quick access here!"
          actionText="Discover Learning Resources"
          actionLink="/explore"
        />
      ) : (
        <>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
            <div className="glass-panel" style={{ padding: '1rem 1.25rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <div style={{ width: '40px', height: '40px', borderRadius: 'var(--radius-md)', background: 'rgba(99, 102, 241, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#818cf8' }}>
                <Layers size={20} />
              </div>
              <div>
                <div style={{ fontSize: '1.4rem', fontWeight: 800 }}>{favorites.length}</div>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Total Saved Items</div>
              </div>
            </div>

            <div className="glass-panel" style={{ padding: '1rem 1.25rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <div style={{ width: '40px', height: '40px', borderRadius: 'var(--radius-md)', background: 'rgba(16, 185, 129, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#34d399' }}>
                <Gift size={20} />
              </div>
              <div>
                <div style={{ fontSize: '1.4rem', fontWeight: 800, color: '#34d399' }}>{stats.freeCount}</div>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Free Resources</div>
              </div>
            </div>

            <div className="glass-panel" style={{ padding: '1rem 1.25rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <div style={{ width: '40px', height: '40px', borderRadius: 'var(--radius-md)', background: 'rgba(245, 158, 11, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fbbf24' }}>
                <DollarSign size={20} />
              </div>
              <div>
                <div style={{ fontSize: '1.4rem', fontWeight: 800, color: '#fbbf24' }}>{stats.paidCount}</div>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Paid Courses</div>
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem', flexWrap: 'wrap' }}>
            <div style={{ flex: '1', minWidth: '260px' }}>
              <SearchBar
                value={filterQuery}
                onChange={setFilterQuery}
                placeholder="Filter saved items..."
              />
            </div>

            {favoriteCategories.length > 1 && (
              <select
                className="filter-select"
                style={{ width: 'auto', minWidth: '180px' }}
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                <option value="all">All Saved Categories</option>
                {favoriteCategories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            )}
          </div>

          {filteredFavorites.length === 0 ? (
            <div className="empty-state-box" style={{ padding: '3rem 1.5rem' }}>
              <h3>No matching saved items</h3>
              <p style={{ color: 'var(--text-secondary)', margin: '0.5rem 0 1.5rem' }}>
                No items in your favorites matched "{filterQuery}".
              </p>
              <button
                type="button"
                onClick={() => {
                  setFilterQuery('');
                  setSelectedCategory('all');
                }}
                className="btn btn-secondary"
              >
                Reset Search Filter
              </button>
            </div>
          ) : (
            <div className="resource-grid" style={{ marginBottom: '4rem' }}>
              {filteredFavorites.map((res) => (
                <ResourceCard key={res.id} resource={res} />
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Favorites;
