import React from 'react';
import { Loader2 } from 'lucide-react';

const LoadingSpinner = ({ message = "Loading learning resources..." }) => {
  return (
    <div style={{ padding: '4rem 0', textAlign: 'center' }}>
      <Loader2
        size={40}
        style={{
          margin: '0 auto 1rem',
          color: 'var(--primary-light)',
          animation: 'spin 1s linear infinite'
        }}
      />
      <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>{message}</p>
      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export const ResourceCardSkeleton = () => {
  return (
    <div className="resource-card" style={{ pointerEvents: 'none' }}>
      <div className="skeleton" style={{ width: '100%', height: '190px' }} />
      <div style={{ padding: '1.35rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <div className="skeleton" style={{ width: '80px', height: '20px' }} />
          <div className="skeleton" style={{ width: '60px', height: '20px' }} />
        </div>
        <div className="skeleton" style={{ width: '90%', height: '24px' }} />
        <div className="skeleton" style={{ width: '100%', height: '16px' }} />
        <div className="skeleton" style={{ width: '70%', height: '16px' }} />
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '1rem', paddingTop: '1rem', borderTop: '1px solid var(--border-subtle)' }}>
          <div className="skeleton" style={{ width: '90px', height: '18px' }} />
          <div className="skeleton" style={{ width: '60px', height: '18px' }} />
        </div>
      </div>
    </div>
  );
};

export default LoadingSpinner;
