import React, { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Toast from './components/Toast';
import ScrollToTop from './components/ScrollToTop';
import { PageLoader, TopProgressBar, InitialSplashScreen } from './components/LoadingSpinner';
import { FavoritesProvider } from './context/FavoritesContext';
import { ProgressProvider } from './context/ProgressContext';
import { ThemeProvider } from './context/ThemeContext';

// Lazy-loaded page routes for smooth loading states and optimal performance
const Home = lazy(() => import('./pages/Home'));
const Roadmaps = lazy(() => import('./pages/Roadmaps'));
const RoadmapDetails = lazy(() => import('./pages/RoadmapDetails'));
const ProgressDashboard = lazy(() => import('./pages/ProgressDashboard'));
const Explore = lazy(() => import('./pages/Explore'));
const Categories = lazy(() => import('./pages/Categories'));
const ResourceDetails = lazy(() => import('./pages/ResourceDetails'));
const Favorites = lazy(() => import('./pages/Favorites'));
const NotFound = lazy(() => import('./pages/NotFound'));

function App() {
  return (
    <ThemeProvider>
      <FavoritesProvider>
        <ProgressProvider>
          <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
            <InitialSplashScreen />
            <TopProgressBar />
            <ScrollToTop />
            <Navbar />
            <main className="main-content">
              <Suspense fallback={<PageLoader />}>
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/roadmaps" element={<Roadmaps />} />
                  <Route path="/roadmap/:id" element={<RoadmapDetails />} />
                  <Route path="/roadmaps/:id" element={<RoadmapDetails />} />
                  <Route path="/tracker" element={<ProgressDashboard />} />
                  <Route path="/explore" element={<Explore />} />
                  <Route path="/categories" element={<Categories />} />
                  <Route path="/resource/:id" element={<ResourceDetails />} />
                  <Route path="/favorites" element={<Favorites />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </Suspense>
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
