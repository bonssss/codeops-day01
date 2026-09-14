import React from 'react';
import { Link } from 'react-router-dom';
import { Compass, ArrowLeft } from 'lucide-react';

const NotFound = () => {
  return (
    <div className="container" style={{ padding: '6rem 1.5rem', textAlign: 'center' }}>
      <div style={{ width: '80px', height: '80px', borderRadius: '50%', background: 'rgba(99, 102, 241, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem', color: 'var(--primary-light)' }}>
        <Compass size={40} />
      </div>
      <h1 style={{ fontSize: '3.5rem', marginBottom: '1rem' }} className="gradient-text">
        404
      </h1>
      <h2 style={{ fontSize: '1.75rem', marginBottom: '0.75rem' }}>Page Not Found</h2>
      <p style={{ color: 'var(--text-secondary)', maxWidth: '480px', margin: '0 auto 2rem', fontSize: '1.05rem' }}>
        The page you are looking for doesn't exist or has been moved. Let's get you back to discovering great learning resources.
      </p>
      <Link to="/" className="btn btn-primary btn-lg">
        <ArrowLeft size={18} /> Return to Homepage
      </Link>
    </div>
  );
};

export default NotFound;
