import React from 'react'
import { Link } from 'react-router-dom'

export function Home() {
  return (
    <div className="home-container">
      <section className="hero-section">
        <div className="hero-content">
          <span className="hero-tag">🇪🇹 Authentic Addis Flavors</span>
          <h1 className="hero-title">Experience the Heart of Ethiopian Cuisine</h1>
          <p className="hero-subtitle">
            From simmering Doro Wat and savory Tibs to fresh injera and spiced coffee,
            order directly to your door with instant TeleBirr checkout.
          </p>
          <div className="hero-actions">
            <Link to="/menu" className="primary-btn">
              Explore Full Menu →
            </Link>
            <Link to="/menu?category=Traditional" className="secondary-btn">
              Traditional Specials
            </Link>
          </div>
        </div>
      </section>

      <section className="featured-categories">
        <h2>Quick Categories</h2>
        <div className="category-cards-grid">
          <Link to="/menu?category=Traditional" className="feature-card">
            <div className="feature-icon">🍲</div>
            <h3>Traditional</h3>
            <p>Doro Wat, Tibs, Shiro & Kitfo</p>
          </Link>
          <Link to="/menu?category=Fast%20Food" className="feature-card">
            <div className="feature-icon">🍔</div>
            <h3>Fast Food</h3>
            <p>Pizza, Gourmet Burgers & Fries</p>
          </Link>
          <Link to="/menu?category=Drinks" className="feature-card">
            <div className="feature-icon">☕</div>
            <h3>Drinks</h3>
            <p>Spiced Tea & Fresh Tropical Juices</p>
          </Link>
        </div>
      </section>
    </div>
  )
}

export default Home
