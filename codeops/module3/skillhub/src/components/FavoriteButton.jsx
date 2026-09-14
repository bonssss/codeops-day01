import React from 'react';
import { Heart } from 'lucide-react';
import { useFavorites } from '../context/FavoritesContext';

const FavoriteButton = ({ resource, className = '', size = 18 }) => {
  const { isFavorite, toggleFavorite } = useFavorites();
  const favorited = isFavorite(resource?.id);

  const handleClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    toggleFavorite(resource);
  };

  return (
    <button
      type="button"
      className={`fav-btn ${favorited ? 'is-favorite' : ''} ${className}`}
      onClick={handleClick}
      aria-label={favorited ? 'Remove from favorites' : 'Add to favorites'}
      title={favorited ? 'Remove from saved favorites' : 'Save to favorites'}
    >
      <Heart
        size={size}
        fill={favorited ? '#f43f5e' : 'none'}
        stroke={favorited ? '#f43f5e' : 'currentColor'}
        strokeWidth={2}
      />
    </button>
  );
};

export default FavoriteButton;
