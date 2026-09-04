import { useState } from 'react'
import PropTypes from 'prop-types'
import { useTheme } from '../context/ThemeContext'

function Dish({ name, price, spicy, currency = "ETB", onAdd }) {
  const [count, setCount] = useState(0)
  // Exercise 1: Read theme from deeply nested component via ThemeContext
  const { theme } = useTheme()

  const handleAdd = () => {
    setCount((prevCount) => prevCount + 1)
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
  name: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  spicy: PropTypes.bool,
  currency: PropTypes.string,
  onAdd: PropTypes.func,
}

export default Dish