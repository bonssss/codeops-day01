import { memo } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { useTheme } from '../context/ThemeContext'
import { useCartStore, selectItemQuantity } from '../store/cartStore'

/**
 * ============================================================================
 * Exercise 5: Narrow Zustand Selectors & React.memo
 * ============================================================================
 * Each Dish component subscribes exclusively to its own quantity in the cart.
 * When other dishes are added/removed, this component will NOT re-render.
 * ============================================================================
 */
function Dish({ id, name, price, spicy, currency = "ETB", onAdd }) {
  // Read theme from ThemeContext
  const { theme } = useTheme()

  // Exercise 5: Narrow atomic selectors
  const count = useCartStore(selectItemQuantity(id))
  const addItem = useCartStore((state) => state.addItem)

  const handleAdd = () => {
    addItem({ id, name, price, spicy, currency })
    if (onAdd) {
      onAdd(price)
    }
  }

  return (
    <div className={`dish dish-theme-${theme}`}>
      <h2>
        <Link to={`/menu/${id}`} className="dish-title-link">
          {name} {count > 0 && <span className="dish-count">({count})</span>}
        </Link>
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