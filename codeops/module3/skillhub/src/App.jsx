import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Toast from './components/Toast';
import Home from './pages/Home';
import Roadmaps from './pages/Roadmaps';
import RoadmapDetails from './pages/RoadmapDetails';
import ProgressDashboard from './pages/ProgressDashboard';
import Explore from './pages/Explore';
import Categories from './pages/Categories';
import ResourceDetails from './pages/ResourceDetails';
import Favorites from './pages/Favorites';
import NotFound from './pages/NotFound';
import { FavoritesProvider } from './context/FavoritesContext';
import { ProgressProvider } from './context/ProgressContext';
import { ThemeProvider } from './context/ThemeContext';

function App() {
  return (
    <ThemeProvider>
      <FavoritesProvider>
        <ProgressProvider>
          <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
            <Navbar />
            <main className="main-content">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/roadmaps" element={<Roadmaps />} />
                <Route path="/roadmap/:id" element={<RoadmapDetails />} />
                <Route path="/tracker" element={<ProgressDashboard />} />
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
        </ProgressProvider>
      </FavoritesProvider>
    </ThemeProvider>
  );
}

export default App;
