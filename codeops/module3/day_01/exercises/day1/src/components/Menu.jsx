import { useState, useEffect, useRef, useCallback, useMemo } from 'react'
import Card from './Card'
import Dish from './Dish'
import CategoryBar from './CategoryBar'
import DeliveryForm from './DeliveryForm'
import useFetch from '../hooks/useFetch'
import { useCart } from '../context/CartContext'

const CATEGORIES = ["All", "Main", "Breakfast", "Traditional", "Dessert"]

function Menu() {
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [searchQuery, setSearchQuery] = useState('')
  // Exercise 5: Derived orderTotal from CartContext
  const { orderTotal } = useCart()

  // Exercise 2: Fetch data using custom useFetch hook
  const { data: rawDishes, loading, error } = useFetch('/dishes.json')
  const dishes = useMemo(() => rawDishes || [], [rawDishes])

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

  // Exercise 7: Callback memoization with useCallback
  const handleSelectCategory = useCallback((category) => {
    setSelectedCategory(category)
  }, [])

  // Exercise 7: Memoize filtered dishes to prevent recalculation across unrelated re-renders
  const filteredDishes = useMemo(() => {
    const categoryFiltered =
      selectedCategory === "All"
        ? dishes
        : dishes.filter((dish) => dish.category === selectedCategory)

    return categoryFiltered.filter((dish) =>
      dish.name.toLowerCase().includes(searchQuery.toLowerCase().trim())
    )
  }, [dishes, selectedCategory, searchQuery])

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
        onSelect={handleSelectCategory}
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
                  id={dish.id}
                  name={dish.name}
                  price={dish.price}
                  spicy={dish.spicy}
                  currency={dish.currency}
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
