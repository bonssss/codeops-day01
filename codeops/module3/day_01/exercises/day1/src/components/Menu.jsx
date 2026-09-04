import { useState, useEffect, useRef } from 'react'
import Card from './Card'
import Dish from './Dish'
import CategoryBar from './CategoryBar'
import DeliveryForm from './DeliveryForm'

const CATEGORIES = ["All", "Main", "Breakfast", "Traditional", "Dessert"]

function Menu() {
  const [dishes, setDishes] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [searchQuery, setSearchQuery] = useState('')
  const [orderTotal, setOrderTotal] = useState(0)

  // Exercise 7: Focus a search input on mount with useRef
  const searchInputRef = useRef(null)

  // Note: The focus() call must be placed inside an effect (useEffect) because during the initial
  // render phase, the component's JSX has not yet been mounted/attached to the actual browser DOM.
  // `searchInputRef.current` is null until React completes the DOM mutation phase.
  // useEffect runs asynchronously after the component has rendered and mounted to the DOM,
  // guaranteeing that `searchInputRef.current` points to the rendered input DOM element.
  useEffect(() => {
    searchInputRef.current?.focus()
  }, [])

  // Exercise 2, 3, 4, 5 & 6: Fetch menu array with AbortController in useEffect cleanup
  useEffect(() => {
    const controller = new AbortController()
    const { signal } = controller

    setLoading(true)
    setError(null)

    fetch('/dishes.json', { signal })
      .then((res) => {
        // Exercise 4: Check res.ok and throw a clear error message
        if (!res.ok) {
          throw new Error(`Failed to fetch dishes (Status ${res.status}: ${res.statusText || 'Not Found'})`)
        }
        return res.json()
      })
      .then((data) => {
        const result =
          selectedCategory === "All"
            ? data
            : data.filter((dish) => dish.category === selectedCategory)
        setDishes(result)
        setLoading(false)
      })
      .catch((err) => {
        // Exercise 6: Ignore AbortError when request is cancelled
        if (err.name === 'AbortError') {
          return
        }
        setError(err.message)
        setLoading(false)
      })

    // Cleanup: abort previous in-flight request when component unmounts or dependency changes
    return () => {
      controller.abort()
    }
  }, [selectedCategory])

  const handleAddDish = (price) => {
    setOrderTotal((prevTotal) => prevTotal + price)
  }

  // Filter by search query on the currently loaded category dishes
  const filteredDishes = dishes.filter((dish) =>
    dish.name.toLowerCase().includes(searchQuery.toLowerCase().trim())
  )

  // Exercise 1: Update document.title to show the number of dishes currently shown
  useEffect(() => {
    document.title = `${filteredDishes.length} dishes shown`
  }, [filteredDishes.length])

  return (
    <div className="menu-container">
      {/* Exercise 7: Search input focused on mount */}
      <div className="search-container">
        <input
          ref={searchInputRef}
          type="search"
          className="search-input"
          placeholder="🔍 Search dishes by name..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* Category selector chips */}
      <CategoryBar
        categories={CATEGORIES}
        selected={selectedCategory}
        onSelect={setSelectedCategory}
      />

      {/* Exercise 3: Render loading and error state before the list */}
      {loading && (
        <div className="status-message loading-state">
          <p>⏳ Loading dishes...</p>
        </div>
      )}

      {error && (
        <div className="status-message error-state">
          <p>⚠️ Error: {error}</p>
        </div>
      )}

      {/* Dish list or Empty state (only when not loading and no error) */}
      {!loading && !error && (
        filteredDishes.length === 0 ? (
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
        )
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
