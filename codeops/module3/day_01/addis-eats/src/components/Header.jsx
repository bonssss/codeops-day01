import React from 'react'
import CartBadge from './CartBadge'

function Header() {
  return (
    <header className="header">
      <div className="header-info">
        <h1 className="title">Addis Eats</h1>
        <p className="description">Authentic Ethiopian Cuisine & Fast Delivery</p>
      </div>
      <CartBadge />
    </header>
  )
}

export default Header