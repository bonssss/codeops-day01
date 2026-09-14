import React, { createContext, useContext, useState, useEffect } from 'react';
import { getStoredItem, setStoredItem, STORAGE_KEYS } from '../utils/storage';

const FavoritesContext = createContext();

export const FavoritesProvider = ({ children }) => {
  const [favorites, setFavorites] = useState(() => {
    return getStoredItem(STORAGE_KEYS.FAVORITES, []);
  });
  const [toastMessage, setToastMessage] = useState(null);

  useEffect(() => {
    setStoredItem(STORAGE_KEYS.FAVORITES, favorites);
  }, [favorites]);

  const showToast = (message, type = 'info') => {
    setToastMessage({ message, type, id: Date.now() });
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  const isFavorite = (id) => {
    return favorites.some((item) => item.id === id);
  };

  const toggleFavorite = (resource) => {
    if (!resource || !resource.id) return;

    if (isFavorite(resource.id)) {
      setFavorites((prev) => prev.filter((item) => item.id !== resource.id));
      showToast(`Removed "${resource.title.slice(0, 30)}..." from favorites`, 'remove');
    } else {
      setFavorites((prev) => [...prev, resource]);
      showToast(`Added "${resource.title.slice(0, 30)}..." to favorites! ❤️`, 'add');
    }
  };

  const removeFavorite = (id) => {
    setFavorites((prev) => prev.filter((item) => item.id !== id));
    showToast(`Removed from favorites`, 'remove');
  };

  const clearFavorites = () => {
    setFavorites([]);
    showToast('Cleared all saved resources', 'info');
  };

  return (
    <FavoritesContext.Provider
      value={{
        favorites,
        favoritesCount: favorites.length,
        isFavorite,
        toggleFavorite,
        removeFavorite,
        clearFavorites,
        toastMessage,
        setToastMessage
      }}
    >
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = () => {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error('useFavorites must be used within a FavoritesProvider');
  }
  return context;
};
