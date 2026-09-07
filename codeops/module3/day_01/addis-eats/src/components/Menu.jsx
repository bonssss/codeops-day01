import React, { useState, useEffect, useRef, useMemo } from 'react'
import CategoryBar from './CategoryBar'
import DishList from './DishList'
import OrderForm from './OrderForm'
import { useFetch } from '../hooks/useFetch'
import { useCart } from '../context/CartContext'

const CATEGORIES = ['All', 'Traditional', 'Fast Food', 'Drinks', 'Dessert']

function Menu() {
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [searchQuery, setSearchQuery] = useState('')

  // Read total from context for display
  const { total } = useCart()

  // Search input auto-focused on mount using useRef
  const searchInputRef = useRef(null)

  useEffect(() => {
    searchInputRef.current?.focus()
  }, [])

  // The category filter dynamically drives the fetch URL
  const fetchUrl =
    selectedCategory === 'All'
      ? '/dishes.json'
      : `/dishes.json?category=${encodeURIComponent(selectedCategory)}`

  // Custom hook providing data, loading, and error states with AbortController cancellation
  const { data: dishes, loading, error } = useFetch(fetchUrl)

  // Deliberate useMemo: memoize search-filtered list of dishes so it is only recomputed
  // when the fetched dishes array or the searchQuery string changes
  const filteredDishes = useMemo(() => {
    const list = dishes || []
    if (!searchQuery.trim()) return list
    return list.filter((dish) =>
      dish.name.toLowerCase().includes(searchQuery.toLowerCase().trim())
    )
  }, [dishes, searchQuery])

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
          aria-label="Search dishes"
        />
      </div>

      {/* Category selector chips */}
      <CategoryBar
        categories={CATEGORIES}
        selected={selectedCategory}
        onSelect={setSelectedCategory}
      />

      {/* All 3 states: Loading, Error, and Dish Data List / Empty state */}
      <DishList
        dishes={filteredDishes}
        loading={loading}
        error={error}
      />

      {/* Derived Running Order Total in ETB */}
      <div className="order-summary-panel">
        <span className="summary-label">Order Total:</span>
        <span className="summary-amount">{total} ETB</span>
      </div>

      {/* Checkout and Order Form with Cart Context */}
      <OrderForm />
    </div>
  )
}

export default Menu
