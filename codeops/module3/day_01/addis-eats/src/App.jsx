import React, { useState } from 'react'
import Header from './components/Header'
import Dish from './components/Dish'
import Card from './components/Card'
import Category from './components/Category'

const Dishes = [
  { id: 1, name: "Pizza", price: 1000, isSpicy: true, currency: "USD", category: "Fast Food" },
  { id: 2, name: "Pasta", price: 1500, isSpicy: false, currency: "EUR", category: "Fast Food" },
  { id: 3, name: "Burger", price: 2000, isSpicy: true, currency: "ETB", category: "Fast Food" },
  { id: 4, name: "Fries", price: 500, isSpicy: false, currency: "USD", category: "Fast Food" },
  { id: 5, name: "Coca-Cola", price: 100, isSpicy: false, currency: "USD", category: "Drink" },
  { id: 6, name: "Water", price: 50, isSpicy: false, currency: "EUR", category: "Drink" },
  { id: 7, name: "Juice", price: 200, isSpicy: false, currency: "ETB", category: "Drink" },
  { id: 8, name: "Smoothie", price: 300, isSpicy: false, currency: "USD", category: "Drink" },
]

function App() {
  const [selectedCategory, setSelectedCategory] = useState("All")

  // Filter dishes: if "All", show all; otherwise filter by category
  const filteredDishes = selectedCategory === "All"
    ? Dishes
    : Dishes.filter((dish) => dish.category === selectedCategory)

  return (
    <div>
      <Header />
      <Category
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
      />

      <section className="card-container">
        <h2>{selectedCategory} Dishes</h2>

        {/* Early return / Empty state check */}
        {filteredDishes.length === 0 ? (
          <div className="empty-state">
            <p>No dishes found for "{selectedCategory}".</p>
          </div>
        ) : (
          <div className="dishes">
            {filteredDishes.map((dish) => (
              <Card key={dish.id}>
                <Dish
                  name={dish.name}
                  price={dish.price}
                  isSpicy={dish.isSpicy}
                  currency={dish.currency}
                  category={dish.category}
                />
              </Card>
            ))}
          </div>
        )}
      </section>
    </div>
  )
}

export default App