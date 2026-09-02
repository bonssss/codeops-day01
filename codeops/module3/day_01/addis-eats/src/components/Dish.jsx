import React, { useState } from 'react'
import PropTypes from 'prop-types'

function Dish({ name, price, currency = 'ETB', spicy = false, category, onAdd }) {
  const [count, setCount] = useState(0)

  const handleAdd = () => {
    setCount((prev) => prev + 1)
    if (onAdd) {
      onAdd(price)
    }
  }

  return (
    <div className="dish">
      <div className="dish-header">
        <h3>
          {name} {count > 0 && <span className="dish-count">({count})</span>}
        </h3>
        {Boolean(spicy) && <span className="spicy">🌶️ Spicy</span>}
      </div>

      <div className="dish-body">
        {category && <span className="category-tag">{category}</span>}
      </div>

      <div className="dish-footer">
        <p className="dish-price">{price} {currency}</p>
        <button type="button" className="add-btn" onClick={handleAdd}>
          + Add
        </button>
      </div>
    </div>
  )
}

Dish.propTypes = {
  name: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  spicy: PropTypes.bool,
  currency: PropTypes.string,
  category: PropTypes.string,
  onAdd: PropTypes.func,
}

export default Dish