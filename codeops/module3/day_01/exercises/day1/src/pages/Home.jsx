import SpecialOffers from '../components/SpecialOffers'

function Home() {
  return (
    <div className="home-page">
      <div className="hero-section">
        <h1>Welcome to Addis Eats 🍽️</h1>
        <p className="subtitle">
          Authentic Ethiopian cuisine & modern favorites delivered fresh to your door.
        </p>
      </div>
      <SpecialOffers />
    </div>
  )
}

export default Home
