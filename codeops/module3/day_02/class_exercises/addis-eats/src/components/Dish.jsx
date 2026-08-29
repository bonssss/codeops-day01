import React from 'react'

function Dish({ name, price, isspicy, catagory, onAdd }) {
  return (
    <div className="dish-card">
      <div className="dish-header">
        <h3>{name}</h3>
        {Boolean(isspicy) && <span className="spicy-tag">🌶️ Spicy</span>}
      </div>
      <p className="dish-price"><strong>{price}</strong> ETB</p>
      <p className="dish-category">Category: {catagory}</p>
      {onAdd && (
        <button className="add-btn" onClick={() => onAdd(price)}>
          + Add to Order
        </button>
      )}
    </div>
  )
}

export default Dish
