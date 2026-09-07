import { Link } from 'react-router-dom'

function NotFound() {
  return (
    <div className="not-found-container">
      <div className="not-found-card">
        <span className="not-found-code">404</span>
        <h1>Page Not Found</h1>
        <p className="subtitle">
          Oops! The page you are looking for does not exist or has been moved.
        </p>
        <div className="not-found-actions">
          <Link to="/" className="btn-primary">
            🏠 Back to Home
          </Link>
          <Link to="/menu" className="btn-secondary">
            🍽️ Explore Menu
          </Link>
        </div>
      </div>
    </div>
  )
}

export default NotFound
