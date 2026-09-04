import React, { useState, useEffect, useRef, useMemo } from 'react'
import CategoryBar from './CategoryBar'
import DishList from './DishList'
import OrderForm from './OrderForm'
import { fetchDishes } from '../api'

const CATEGORIES = ["All", "Traditional", "Fast Food", "Drinks", "Dessert"]

function Menu() {
  const [dishes, setDishes] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [searchQuery, setSearchQuery] = useState("")
  const [orderTotal, setOrderTotal] = useState(0)

  // Search input focused on mount with useRef
  const searchInputRef = useRef(null)

  useEffect(() => {
    searchInputRef.current?.focus()
  }, [])

  // Effect to fetch dishes whenever selectedCategory changes, with AbortController cancellation
  useEffect(() => {
    const controller = new AbortController()

    async function load() {
      setLoading(true)
      setError(null)
      try {
        const data = await fetchDishes(selectedCategory, controller.signal)
        setDishes(data)
      } catch (err) {
        if (err.name !== 'AbortError') {
          setError(err.message || 'Could not load the menu')
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false)
        }
      }
    }

    load()

    // Cleanup: abort previous pending request if category changes quickly or component unmounts
    return () => {
      controller.abort()
    }
  }, [selectedCategory])

  // Filter dishes by client-side search query
  const filteredDishes = useMemo(() => {
    if (!searchQuery.trim()) return dishes
    return dishes.filter((dish) =>
      dish.name.toLowerCase().includes(searchQuery.toLowerCase().trim())
    )
  }, [dishes, searchQuery])

  // Handler to increment running order total
  const handleAddDish = (price) => {
    setOrderTotal((prevTotal) => prevTotal + price)
  }

  return (
    <div className="menu-container">
      {/* Auto-focused search bar */}
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

      {/* Filtered dish list with loading, error, and empty states */}
      <DishList
        dishes={filteredDishes}
        onAddDish={handleAddDish}
        loading={loading}
        error={error}
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

export default Menu
