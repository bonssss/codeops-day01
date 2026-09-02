import { useState } from 'react'
import PropTypes from 'prop-types'
import Card from './Card'
import Dish from './Dish'
import CategoryBar from './CategoryBar'
import DeliveryForm from './DeliveryForm'

const CATEGORIES = ["All", "Main", "Breakfast", "Traditional", "Dessert"]

function Menu({ dishes }) {
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [orderTotal, setOrderTotal] = useState(0)

  const handleAddDish = (price) => {
    setOrderTotal((prevTotal) => prevTotal + price)
  }

  const filteredDishes =
    selectedCategory === "All"
      ? dishes
      : dishes.filter((dish) => dish.category === selectedCategory)

  return (
    <div className="menu-container">
      {/* Category selector chips */}
      <CategoryBar
        categories={CATEGORIES}
        selected={selectedCategory}
        onSelect={setSelectedCategory}
      />

      {/* Dish list or Empty state */}
      {filteredDishes.length === 0 ? (
        <div className="empty-state">
          <p>No dishes found for category &quot;{selectedCategory}&quot;.</p>
        </div>
      ) : (
        <div className="dishes">
          {filteredDishes.map((dish) => (
            <Card key={dish.id}>
              <Dish
                name={dish.name}
                price={dish.price}
                spicy={dish.spicy}
                currency={dish.currency}
                onAdd={handleAddDish}
              />
            </Card>
          ))}
        </div>
      )}

      {/* Running Order Total below the menu */}
      <div className="order-summary-box">
        <div className="order-total-info">
          <span>Order Running Total:</span>
          <span className="total-amount">{orderTotal} ETB</span>
        </div>
      </div>

      {/* Controlled Delivery Form with TeleBirr validation */}
      <DeliveryForm orderTotal={orderTotal} />
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
  ).isRequired,
}

export default Menu
