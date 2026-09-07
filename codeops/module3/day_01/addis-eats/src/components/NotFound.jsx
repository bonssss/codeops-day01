import React from 'react'
import { Link } from 'react-router-dom'

export function NotFound() {
  return (
    <div className="not-found-page">
      <div className="not-found-card">
        <h1>404</h1>
        <h2>Page Not Found</h2>
        <p>The page you are looking for doesn't exist or was moved.</p>
        <Link to="/" className="primary-btn">
          ← Back to Home
        </Link>
      </div>
    </div>
  )
}

export default NotFound
