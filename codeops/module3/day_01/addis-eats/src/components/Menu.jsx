import React, { useState } from 'react'
import PropTypes from 'prop-types'
import CategoryBar from './CategoryBar'
import DishList from './DishList'
import OrderForm from './OrderForm'
import { dishes as defaultDishes } from '../data'

const CATEGORIES = ["All", "Traditional", "Fast Food", "Drinks", "Dessert"]

function Menu({ dishes = defaultDishes }) {
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [orderTotal, setOrderTotal] = useState(0)

  // Derived filtered dish list from category state
  const filteredDishes =
    selectedCategory === "All"
      ? dishes
      : dishes.filter((dish) => dish.category === selectedCategory)

  // Handler to increment running order total
  const handleAddDish = (price) => {
    setOrderTotal((prevTotal) => prevTotal + price)
  }

  return (
    <div className="menu-container">
      {/* Category selector chips */}
      <CategoryBar
        categories={CATEGORIES}
        selected={selectedCategory}
        onSelect={setSelectedCategory}
      />

      {/* Filtered dish list with empty state */}
      <DishList
        dishes={filteredDishes}
        onAddDish={handleAddDish}
      />

      {/* Running Order Total in ETB */}
      <div className="order-summary-panel">
        <span className="summary-label">Order Total:</span>
        <span className="summary-amount">{orderTotal} ETB</span>
      </div>

      {/* Controlled Order and Delivery Form */}
      <OrderForm orderTotal={orderTotal} />
    </div>
  )
}

Menu.propTypes = {
  dishes: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      name: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
      spicy: PropTypes.bool,
      currency: PropTypes.string,
      category: PropTypes.string,
    })
  ),
}

export default Menu
