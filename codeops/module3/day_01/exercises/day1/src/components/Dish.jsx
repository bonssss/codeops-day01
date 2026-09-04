import { memo } from 'react'
import PropTypes from 'prop-types'
import { useTheme } from '../context/ThemeContext'
import { useCart } from '../context/CartContext'

/**
 * ============================================================================
 * Exercise 7: React.memo Component Optimization & Profiling
 * ============================================================================
 * Before memoization:
 * When typing into the search input or selecting a category in Menu.jsx, the entire
 * list rendered all Dish items on every single keystroke/render, even when their
 * individual properties (name, price, spicy) never changed.
 * 
 * After React.memo + useCallback:
 * React performs shallow prop comparison before re-rendering each Dish card. Unaffected
 * Dish components skip re-rendering completely, minimizing Virtual DOM reconciliation
 * cost and significantly improving frame rates on large dish lists.
 * ============================================================================
 */
function Dish({ id, name, price, spicy, currency = "ETB", onAdd }) {
  // Exercise 1: Read theme from deeply nested component via ThemeContext
  const { theme } = useTheme()
  // Exercise 5: Use CartContext to dispatch addToCart and read item quantity
  const { items, addToCart } = useCart()

  const cartItem = items.find((item) => item.id === id)
  const count = cartItem ? cartItem.quantity : 0

  const handleAdd = () => {
    addToCart({ id, name, price, spicy, currency })
    if (onAdd) {
      onAdd(price)
    }
  }

  return (
    <div className={`dish dish-theme-${theme}`}>
      <h2>
        <span>
          {name} {count > 0 && <span className="dish-count">({count})</span>}
        </span>
        {Boolean(spicy) && <span className="spicy-badge">🌶️ Spicy</span>}
      </h2>
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
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  name: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  spicy: PropTypes.bool,
  currency: PropTypes.string,
  onAdd: PropTypes.func,
}

// Exercise 7: Memoize Dish component to prevent redundant list re-renders
export default memo(Dish)