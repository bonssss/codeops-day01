import { Link } from 'react-router-dom'
import SpecialOffers from '../components/SpecialOffers'

function Home() {
  const categories = [
    {
      id: 'traditional',
      name: 'Traditional Ethiopian',
      desc: 'Authentic Doro Wat, sizzling Tibs & spiced delicacies with fresh injera.',
      icon: '🍲',
      count: '5+ Dishes',
    },
    {
      id: 'main',
      name: 'Gourmet Mains',
      desc: 'Handcrafted wood-fired pizzas, hearty pastas & juicy flame-grilled burgers.',
      icon: '🍕',
      count: '8+ Dishes',
    },
    {
      id: 'breakfast',
      name: 'Hearty Breakfast',
      desc: 'Fresh sandwiches, warm pastries & Ethiopian breakfast favorites.',
      icon: '🥪',
      count: '6+ Dishes',
    },
    {
      id: 'drinks',
      name: 'Artisan Beverages',
      desc: 'Freshly roasted Ethiopian highland coffee & tropical cold-pressed juices.',
      icon: '☕',
      count: '4+ Drinks',
    },
  ]

  const features = [
    {
      icon: '⚡',
      title: '30-Minute Swift Delivery',
      desc: 'Hot & fresh food dispatched immediately across Bole, Kazanchis, Megenagna & Piassa.',
    },
    {
      icon: '🌶️',
      title: 'Authentic Local Flavors',
      desc: 'Traditional dishes cooked with farm-fresh ingredients and master-blended spices.',
    },
    {
      icon: '📱',
      title: 'Easy TeleBirr Checkout',
      desc: 'Seamless mobile payment integration with instantaneous order verification.',
    },
    {
      icon: '⭐',
      title: 'Top Rated by Foodies',
      desc: 'Over 10,000 satisfied food lovers with an average 4.9-star dining rating.',
    },
  ]

  const testimonials = [
    {
      name: 'Abebe Kebede',
      area: 'Bole, Addis Ababa',
      comment: 'The Doro Wat is rich, perfectly spiced, and the delivery arrived in 25 minutes flat. Truly the best in town!',
      rating: 5,
    },
    {
      name: 'Selamawit Tadesse',
      area: 'Kazanchis, Addis Ababa',
      comment: 'Ordering with TeleBirr is super fast and smooth. The pizza crust was crispy and the burger was juicy and delicious.',
      rating: 5,
    },
    {
      name: 'Dawit Mengistu',
      area: 'Megenagna, Addis Ababa',
      comment: 'Addis Eats has become our daily office lunch solution. Incredible quality, hot food, and friendly couriers.',
      rating: 5,
    },
  ]

  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-badge">
          <span className="badge-pulse">✨</span> Addis Ababa&apos;s #1 Gourmet & Traditional Food Delivery
        </div>

        <h1 className="hero-title">
          Savor the Rich Flavors of <span className="hero-gradient-text">Addis Ababa</span>
        </h1>

        <p className="hero-subtitle">
          From slow-simmered traditional feasts to artisanal gourmet burgers and pizzas,
          experience restaurant-quality cuisine prepared with passion and delivered hot in 30 minutes.
        </p>

        <div className="hero-cta-group">
          <Link to="/menu" className="btn-hero-primary">
            Browse Full Menu 🍕
          </Link>
          <Link to="/about" className="btn-hero-secondary">
            Our Story & Heritage ✨
          </Link>
        </div>

        {/* Quick Trust Highlights */}
        <div className="hero-stats-row">
          <div className="hero-stat-item">
            <span className="hero-stat-icon">⚡</span>
            <div>
              <strong>30 Mins</strong>
              <small>Average Delivery</small>
            </div>
          </div>
          <div className="hero-stat-item">
            <span className="hero-stat-icon">⭐</span>
            <div>
              <strong>4.9 / 5.0</strong>
              <small>10k+ Customer Reviews</small>
            </div>
          </div>
          <div className="hero-stat-item">
            <span className="hero-stat-icon">📍</span>
            <div>
              <strong>4 Key Hubs</strong>
              <small>Bole • Kazanchis • Megenagna • Piassa</small>
            </div>
          </div>
        </div>
      </section>

      {/* Chef's Special Offers Live Component */}
      <section className="home-specials-wrapper">
        <SpecialOffers />
      </section>

      {/* Culinary Categories Explorer */}
      <section className="home-categories-section">
        <div className="section-header-center">
          <span className="section-kicker">EXPLORE OUR KITCHEN</span>
          <h2>Crafted For Every Craving</h2>
          <p>Handpicked specialties prepared daily with the freshest local ingredients.</p>
        </div>

        <div className="categories-grid">
          {categories.map((cat) => (
            <Link key={cat.id} to="/menu" className="category-card">
              <div className="category-icon-circle">{cat.icon}</div>
              <div className="category-info">
                <h3>{cat.name}</h3>
                <p>{cat.desc}</p>
                <span className="category-link-cta">
                  Explore Dishes →
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Why Choose Addis Eats */}
      <section className="why-us-section">
        <div className="section-header-center">
          <span className="section-kicker">THE ADDIS EATS ADVANTAGE</span>
          <h2>Why Thousands Trust Us Every Day</h2>
          <p>We are redefining food delivery in Ethiopia with unprecedented speed, quality, and hospitality.</p>
        </div>

        <div className="features-grid">
          {features.map((feat, idx) => (
            <div key={idx} className="feature-card">
              <div className="feature-icon-wrapper">{feat.icon}</div>
              <h3>{feat.title}</h3>
              <p>{feat.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Customer Testimonials */}
      <section className="testimonials-section">
        <div className="section-header-center">
          <span className="section-kicker">LOVED BY ADDIS ABABA</span>
          <h2>What Our Foodies Say</h2>
          <p>Real experiences from our valued customers across the city.</p>
        </div>

        <div className="testimonials-grid">
          {testimonials.map((t, idx) => (
            <div key={idx} className="testimonial-card">
              <div className="testimonial-stars">
                {'★'.repeat(t.rating)}
              </div>
              <p className="testimonial-quote">&ldquo;{t.comment}&rdquo;</p>
              <div className="testimonial-author">
                <div className="author-avatar">{t.name[0]}</div>
                <div>
                  <strong>{t.name}</strong>
                  <small>{t.area}</small>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Bottom CTA Banner */}
      <section className="home-cta-banner">
        <div className="cta-banner-content">
          <h2>Craving Something Delicious Right Now?</h2>
          <p>Order your favorite meals in seconds and pay effortlessly with TeleBirr.</p>
          <div className="cta-banner-actions">
            <Link to="/menu" className="btn-cta-primary">
              Order Online Now 🚀
            </Link>
            <Link to="/contact" className="btn-cta-secondary">
              Contact Kitchen 📞
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home
