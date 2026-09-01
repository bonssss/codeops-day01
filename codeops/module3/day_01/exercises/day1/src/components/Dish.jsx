import PropTypes from 'prop-types'

function Dish({ name, price, spicy, currency = "ETB" }) {
  return (
    <div className="dish">
      <h2>
        {name} {Boolean(spicy) && <span className="spicy-badge">🌶️ Spicy</span>}
      </h2>
      <p>{price} {currency}</p>
    </div>
  )
}

Dish.propTypes = {
  name: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  spicy: PropTypes.bool,
  currency: PropTypes.string,
}

export default Dish