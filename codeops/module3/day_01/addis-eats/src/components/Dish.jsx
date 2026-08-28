import React from 'react'
import PropTypes from 'prop-types'


function Dish({name,price,isSpicy=false,currency="ETB",category="Fast Food"}) {
  return (
    <div className="dish">
        <h2>{name}</h2>
        <p>{price} {currency}</p>
        {Boolean(isSpicy) && <span className="spicy">Spicy</span> }
        <p>{category}</p>
    </div>
  )
}
Dish.propTypes = {
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    isSpicy: PropTypes.bool,
    currency: PropTypes.string,
    category: PropTypes.string
}
export default Dish