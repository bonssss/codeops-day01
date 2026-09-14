import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Toast from './components/Toast';
import Home from './pages/Home';
import Explore from './pages/Explore';
import Categories from './pages/Categories';
import ResourceDetails from './pages/ResourceDetails';
import Favorites from './pages/Favorites';
import NotFound from './pages/NotFound';
import { FavoritesProvider } from './context/FavoritesContext';
import { ThemeProvider } from './context/ThemeContext';

function App() {
  return (
    <ThemeProvider>
      <FavoritesProvider>
        <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
          <Navbar />
          <main className="main-content">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/explore" element={<Explore />} />
              <Route path="/categories" element={<Categories />} />
              <Route path="/resource/:id" element={<ResourceDetails />} />
              <Route path="/favorites" element={<Favorites />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
          <Toast />
          <Footer />
        </div>
      </FavoritesProvider>
    </ThemeProvider>
  );
}

export default App;
