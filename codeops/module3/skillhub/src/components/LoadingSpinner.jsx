import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Loader2 } from 'lucide-react';

/**
 * Standard inline loading spinner
 */
export const LoadingSpinner = ({ message = "Loading learning resources...", size = 32 }) => {
  return (
    <div className="page-loader-wrap" style={{ minHeight: 'auto', padding: '2.5rem 0' }}>
      <Loader2
        size={size}
        style={{
          margin: '0 auto 0.75rem',
          color: 'var(--accent)',
          animation: 'spin 1s linear infinite'
        }}
      />
      {message && <p className="page-loader-msg">{message}</p>}
    </div>
  );
};

/**
 * Full page / route fallback loader with branded glowing badge
 */
export const PageLoader = ({ title = "Loading content...", message = "Fetching verified free learning paths..." }) => {
  return (
    <div className="page-loader-wrap">
      <div className="page-loader-brand-box">
        <span>S</span>
        <div className="page-loader-ring" />
      </div>
      <h3 className="page-loader-title">{title}</h3>
      <p className="page-loader-msg">{message}</p>
    </div>
  );
};

/**
 * Top thin glowing progress bar triggered whenever route location changes
 */
export const TopProgressBar = () => {
  const location = useLocation();
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(true);
    setProgress(25);

    const t1 = setTimeout(() => setProgress(65), 100);
    const t2 = setTimeout(() => setProgress(100), 220);
    const t3 = setTimeout(() => {
      setVisible(false);
      setProgress(0);
    }, 450);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, [location.pathname, location.search]);

  if (!visible) return null;

  return (
    <div className="top-route-progress-bar">
      <div
        className="top-route-progress-bar-fill"
        style={{
          width: `${progress}%`,
          opacity: progress === 100 ? 0 : 1
        }}
      />
    </div>
  );
};

/**
 * Initial Splash Screen on website first load / reload
 */
export const InitialSplashScreen = ({ onFinish }) => {
  const [visible, setVisible] = useState(true);
  const [fading, setFading] = useState(false);

  useEffect(() => {
    const fadeTimer = setTimeout(() => {
      setFading(true);
    }, 700);

    const removeTimer = setTimeout(() => {
      setVisible(false);
      if (onFinish) onFinish();
    }, 1100);

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(removeTimer);
    };
  }, [onFinish]);

  if (!visible) return null;

  return (
    <div className={`splash-loading-screen ${fading ? 'fading-out' : ''}`}>
      <div className="splash-content">
        <div className="splash-logo-wrap">
          <div className="splash-logo-box">S</div>
          <div className="splash-logo-spinner" />
        </div>
        <h1 className="splash-brand-title">
          <span>skiilhub</span>
          {/* <span className="brand-free-pill" style={{ fontSize: '0.75rem', padding: '0.15rem 0.5rem' }}>100% Free</span> */}
        </h1>
        <p className="splash-tagline">Open Technical Roadmaps & Curated Free Learning</p>
        <div className="splash-progress-track">
          <div className="splash-progress-bar" />
        </div>
        <span className="splash-hint">Loading structured paths...</span>
      </div>
    </div>
  );
};

/**
 * Resource Card Skeleton loader
 */
export const ResourceCardSkeleton = () => {
  return (
    <div className="resource-card" style={{ pointerEvents: 'none' }}>
      <div className="skeleton" style={{ width: '100%', height: '185px' }} />
      <div style={{ padding: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <div className="skeleton" style={{ width: '75px', height: '20px' }} />
          <div className="skeleton" style={{ width: '55px', height: '20px' }} />
        </div>
        <div className="skeleton" style={{ width: '90%', height: '22px' }} />
        <div className="skeleton" style={{ width: '100%', height: '15px' }} />
        <div className="skeleton" style={{ width: '65%', height: '15px' }} />
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '0.8rem', paddingTop: '0.8rem', borderTop: '1px solid var(--border-subtle)' }}>
          <div className="skeleton" style={{ width: '85px', height: '16px' }} />
          <div className="skeleton" style={{ width: '55px', height: '16px' }} />
        </div>
      </div>
    </div>
  );
};

/**
 * Roadmap Card Skeleton loader
 */
export const RoadmapCardSkeleton = () => {
  return (
    <div className="roadmap-card" style={{ pointerEvents: 'none' }}>
      <div className="roadmap-card-header">
        <div className="skeleton" style={{ width: '38px', height: '38px', borderRadius: '10px' }} />
        <div className="skeleton" style={{ width: '90px', height: '22px', borderRadius: '9999px' }} />
      </div>
      <div className="roadmap-card-body" style={{ marginTop: '1rem' }}>
        <div className="skeleton" style={{ width: '75%', height: '22px', marginBottom: '0.65rem' }} />
        <div className="skeleton" style={{ width: '100%', height: '15px', marginBottom: '0.4rem' }} />
        <div className="skeleton" style={{ width: '60%', height: '15px', marginBottom: '1.25rem' }} />
        <div className="skeleton" style={{ width: '100%', height: '18px' }} />
      </div>
      <div className="roadmap-card-footer" style={{ marginTop: '1.25rem' }}>
        <div className="skeleton" style={{ width: '100%', height: '36px', borderRadius: '8px' }} />
      </div>
    </div>
  );
};

export default LoadingSpinner;
