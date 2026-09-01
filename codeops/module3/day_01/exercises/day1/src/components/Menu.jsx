import PropTypes from 'prop-types'
import Card from './Card'
import Dish from './Dish'

function Menu({ dishes, selectedCategory = "All" }) {
  const filteredDishes = selectedCategory === "All"
    ? dishes
    : dishes.filter((dish) => dish.category === selectedCategory)

  // Early return empty state when nothing matches
  if (filteredDishes.length === 0) {
    return (
      <div className="empty-state">
        <p>No dishes found for category &quot;{selectedCategory}&quot;.</p>
      </div>
    )
  }

  // Render filtered list with map, using dish.id as key
  return (
    <div className="dishes">
      {filteredDishes.map((dish) => (
        <Card key={dish.id}>
          <Dish
            name={dish.name}
            price={dish.price}
            spicy={dish.spicy}
            currency={dish.currency}
          />
        </Card>
      ))}
    </div>
  )
}

Menu.propTypes = {
  dishes: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      name: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
      spicy: PropTypes.bool,
      currency: PropTypes.string,
      category: PropTypes.string,
    })
  ).isRequired,
  selectedCategory: PropTypes.string,
}

export default Menu
