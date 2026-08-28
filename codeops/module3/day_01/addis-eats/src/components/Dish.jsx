import React from 'react'
import PropTypes from 'prop-types'

function Dish({ name, price, currency = "ETB", spicy = false, category }) {
  return (
    <div className="dish">
      <h3>
        {name} {Boolean(spicy) && <span className="spicy">• Spicy</span>}
      </h3>
      <p>{price} {currency}</p>
      {category && <span className="category-tag">{category}</span>}
    </div>
  )
}

Dish.propTypes = {
  name: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  spicy: PropTypes.bool,
  currency: PropTypes.string,
  category: PropTypes.string,
}

export default Dish