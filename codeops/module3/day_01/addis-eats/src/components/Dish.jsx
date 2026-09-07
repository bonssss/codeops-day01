import React, { useCallback } from 'react'
import PropTypes from 'prop-types'
import { useCart } from '../context/CartContext'

function Dish({ id, name, price, currency = 'ETB', spicy = false, category, onAdd }) {
  const { items, dispatch } = useCart()

  // Derive how many instances of this dish are currently in the cart
  const count = items.filter((item) => item.id === id).length

  // Deliberate useCallback: memoize click handler to maintain reference stability
  const handleAdd = useCallback(() => {
    const dish = { id, name, price, currency, spicy, category }
    dispatch({ type: 'add', dish })
    if (onAdd) {
      onAdd(price)
    }
  }, [id, name, price, currency, spicy, category, dispatch, onAdd])

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
        <p className="dish-price">
          {price} {currency}
        </p>
        <button
          type="button"
          className="add-btn"
          onClick={handleAdd}
          aria-label={`Add ${name} to cart`}
        >
          + Add
        </button>
      </div>
    </div>
  )
}

Dish.propTypes = {
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  name: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  spicy: PropTypes.bool,
  currency: PropTypes.string,
  category: PropTypes.string,
  onAdd: PropTypes.func,
}

export default Dish