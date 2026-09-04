import useFetch from '../hooks/useFetch'

function SpecialOffers() {
  // Exercise 2: Second component utilizing the reusable useFetch hook
  const { data: dishes, loading, error } = useFetch('/dishes.json')

  if (loading) return null
  if (error) return null
  if (!dishes) return null

  const specials = dishes.filter((dish) => dish.spicy)

  return (
    <div className="special-offers-banner">
      <h3>🔥 Chef&apos;s Spicy Specials</h3>
      <div className="special-chips">
        {specials.map((dish) => (
          <span key={dish.id} className="special-chip">
            {dish.name} - {dish.price} ETB
          </span>
        ))}
      </div>
    </div>
  )
}

export default SpecialOffers
