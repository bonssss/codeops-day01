import React from 'react'
import PropTypes from 'prop-types'
import Dish from './Dish'
import Card from './Card'

function DishList({ dishes, onAddDish }) {
  if (dishes.length === 0) {
    return (
      <div className="empty-state">
        <p>No dishes in this category yet.</p>
      </div>
    )
  }

  return (
    <div className="dishes">
      {dishes.map((dish) => (
        <Card key={dish.id}>
          <Dish
            name={dish.name}
            price={dish.price}
            currency={dish.currency}
            spicy={dish.spicy}
            category={dish.category}
            onAdd={onAddDish}
          />
        </Card>
      ))}
    </div>
  )
}

DishList.propTypes = {
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
  onAddDish: PropTypes.func,
}

export default DishList
