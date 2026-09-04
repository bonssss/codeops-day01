import { useState, useEffect } from 'react'
import Card from './Card'
import Dish from './Dish'
import CategoryBar from './CategoryBar'
import DeliveryForm from './DeliveryForm'

const CATEGORIES = ["All", "Main", "Breakfast", "Traditional", "Dessert"]

function Menu() {
  const [dishes, setDishes] = useState([])
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [orderTotal, setOrderTotal] = useState(0)

  // Exercise 2: Fetch menu array from public/dishes.json in useEffect with []
  useEffect(() => {
    fetch('/dishes.json')
      .then((res) => res.json())
      .then((data) => {
        setDishes(data)
      })
  }, [])

  const handleAddDish = (price) => {
    setOrderTotal((prevTotal) => prevTotal + price)
  }

  const filteredDishes =
    selectedCategory === "All"
      ? dishes
      : dishes.filter((dish) => dish.category === selectedCategory)

  // Exercise 1: Update document.title to show the number of dishes currently shown
  useEffect(() => {
    document.title = `${filteredDishes.length} dishes shown`
  }, [filteredDishes.length])

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

export default Menu
