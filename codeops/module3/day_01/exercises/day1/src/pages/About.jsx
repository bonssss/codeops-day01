import { Link } from 'react-router-dom'

function About() {
  const stats = [
    { value: '50,000+', label: 'Delighted Customers', icon: '🍽️' },
    { value: '30 Mins', label: 'Average Delivery Time', icon: '⚡' },
    { value: '15+', label: 'Master Local Chefs', icon: '👨‍🍳' },
    { value: '99.4%', label: 'Positive Feedback', icon: '⭐' },
  ]

  const values = [
    {
      icon: '🌿',
      title: 'Authenticity & Tradition',
      desc: 'We preserve original family recipes, secret berbere formulations, and authentic slow-cooking methods that make Ethiopian cuisine world-renowned.',
    },
    {
      icon: '🌾',
      title: 'Locally Sourced Ingredients',
      desc: 'Our teff, poultry, beef, and farm-fresh organic vegetables are sourced directly from sustainable growers around Ethiopia.',
    },
    {
      icon: '🛵',
      title: 'Piping Hot Speed',
      desc: 'Equipped with custom thermal insulation delivery boxes, our couriers guarantee your meal arrives as fresh and hot as when it left the pan.',
    },
    {
      icon: '🤝',
      title: 'Community Empowerment',
      desc: 'We are proud to train and employ local culinary apprentices and provide fair, dignified wages for our dedicated dispatch couriers.',
    },
  ]

  const team = [
    {
      name: 'Chef Almaz Wolde',
      role: 'Executive Traditional Chef',
      bio: 'Over 20 years perfecting traditional Ethiopian stews, slow-braised meats, and artisanal injera.',
      avatar: '👩‍🍳',
    },
    {
      name: 'Chef Yonas Haile',
      role: 'Head of Contemporary Cuisine',
      bio: 'Trained internationally, blending gourmet wood-fired pizza techniques with vibrant local spices.',
      avatar: '👨‍🍳',
    },
    {
      name: 'Meron Bekele',
      role: 'Head of Logistics & Quality',
      bio: 'Pioneering rapid dispatch algorithms across Addis Ababa sub-cities for lightning-quick delivery.',
      avatar: '🛵',
    },
  ]

  return (
    <div className="about-page">
      {/* About Header */}
      <section className="about-hero">
        <span className="section-kicker">OUR CULINARY STORY</span>
        <h1 className="about-title">
          From Addis Ababa <span className="hero-gradient-text">With Pure Passion</span> ❤️
        </h1>
        <p className="about-subtitle">
          Addis Eats began with a shared dream: bringing authentic, heartwarming Ethiopian cuisine
          and world-class gourmet favorites to dining tables across the capital in record time.
        </p>
      </section>

      {/* Stats Counter Section */}
      <section className="about-stats-section">
        <div className="stats-grid">
          {stats.map((s, idx) => (
            <div key={idx} className="stat-card">
              <span className="stat-icon">{s.icon}</span>
              <h3 className="stat-number">{s.value}</h3>
              <p className="stat-label">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Story Narrative Section */}
      <section className="about-story-section">
        <div className="story-grid">
          <div className="story-card highlight">
            <span className="story-badge">📖 The Beginning</span>
            <h2>Where Heritage Meets Modern Gastronomy</h2>
            <p>
              Founded in the vibrant cultural heart of Addis Ababa, Addis Eats was built to bridge the gap
              between authentic kitchen mastery and modern digital convenience.
            </p>
            <p>
              Whether you are craving the deep, rich spices of an authentic Doro Wat cooked with farm-raised
              chicken and boiled eggs, or looking for a crispy artisanal pizza for family game night, our
              kitchen brings uncompromising quality to every single plate.
            </p>
          </div>

          <div className="story-card">
            <span className="story-badge">🔥 Our Kitchen Philosophy</span>
            <h2>Freshness You Can Taste, Every Bite</h2>
            <p>
              We believe food is a celebration of community. That is why we never take shortcuts—our
              sauces are simmered from scratch, our dough is freshly leavened each morning, and our
              injera is baked purely with authentic Ethiopian grain.
            </p>
            <p>
              Supported by TeleBirr digital payments and dedicated dispatch hubs in Bole, Kazanchis,
              Megenagna, and Piassa, we make exceptional dining effortless.
            </p>
          </div>
        </div>
      </section>

      {/* Core Values Section */}
      <section className="about-values-section">
        <div className="section-header-center">
          <span className="section-kicker">WHAT DRIVES US</span>
          <h2>Our Core Commitments</h2>
          <p>The culinary and operational standards that guide everything we do.</p>
        </div>

        <div className="values-grid">
          {values.map((v, idx) => (
            <div key={idx} className="value-card">
              <div className="value-icon">{v.icon}</div>
              <h3>{v.title}</h3>
              <p>{v.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Meet the Team Section */}
      <section className="about-team-section">
        <div className="section-header-center">
          <span className="section-kicker">BEHIND THE FLAVORS</span>
          <h2>Meet Our Culinary Leaders</h2>
          <p>The passionate chefs and coordinators ensuring every dish exceeds your expectations.</p>
        </div>

        <div className="team-grid">
          {team.map((member, idx) => (
            <div key={idx} className="team-card">
              <div className="team-avatar-wrapper">{member.avatar}</div>
              <h3>{member.name}</h3>
              <span className="team-role">{member.role}</span>
              <p className="team-bio">{member.bio}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Ready to Taste Section */}
      <section className="about-cta-section">
        <div className="about-cta-box">
          <h2>Experience the Flavors for Yourself</h2>
          <p>Check out our chef specials, signature dishes, and comforting breakfast selections.</p>
          <div className="about-cta-buttons">
            <Link to="/menu" className="btn-hero-primary">
              Explore Our Menu 🍽️
            </Link>
            <Link to="/contact" className="btn-hero-secondary">
              Get In Touch 💬
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

export default About
