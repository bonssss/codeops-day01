import React from 'react'
import PropTypes from 'prop-types'
import Card from './Card'
import Dish from './Dish'

function Menu({ dishes, selectedCategory = "All" }) {
  const filteredDishes = selectedCategory === "All"
    ? dishes
    : dishes.filter((dish) => dish.category === selectedCategory)

  // Empty state early return
  if (filteredDishes.length === 0) {
    return (
      <div className="empty-state">
        <p>No dishes found in category "{selectedCategory}".</p>
      </div>
    )
  }

  return (
    <div className="dishes">
      {filteredDishes.map((dish) => (
        <Card key={dish.id}>
          <Dish
            name={dish.name}
            price={dish.price}
            spicy={dish.spicy}
            currency={dish.currency}
            category={dish.category}
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
