import React, { useState, useEffect, useRef, useMemo } from 'react'
import { useSearchParams, Link } from 'react-router-dom'
import CategoryBar from './CategoryBar'
import DishList from './DishList'
import { useFetch } from '../hooks/useFetch'
import { useCart } from '../context/CartContext'

const CATEGORIES = ['All', 'Traditional', 'Fast Food', 'Drinks', 'Dessert']

function Menu() {
  const [searchParams, setSearchParams] = useSearchParams()
  const selectedCategory = searchParams.get('category') || 'All'
  const [searchQuery, setSearchQuery] = useState('')
  const { total, items } = useCart()

  const searchInputRef = useRef(null)

  useEffect(() => {
    searchInputRef.current?.focus()
  }, [])

  const handleSelectCategory = (category) => {
    if (category === 'All') {
      setSearchParams({})
    } else {
      setSearchParams({ category })
    }
  }

  const fetchUrl =
    selectedCategory === 'All'
      ? '/dishes.json'
      : `/dishes.json?category=${encodeURIComponent(selectedCategory)}`

  const { data: dishes, loading, error } = useFetch(fetchUrl)

  const filteredDishes = useMemo(() => {
    const list = dishes || []
    if (!searchQuery.trim()) return list
    return list.filter((dish) =>
      dish.name.toLowerCase().includes(searchQuery.toLowerCase().trim())
    )
  }, [dishes, searchQuery])

  return (
    <div className="menu-container">
      <div className="menu-header-bar">
        <h2>Our Menu</h2>
        {items.length > 0 && (
          <Link to="/cart" className="view-cart-banner-btn">
            View Cart ({items.length} items · {total} ETB) →
          </Link>
        )}
      </div>

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

      <CategoryBar
        categories={CATEGORIES}
        selected={selectedCategory}
        onSelect={handleSelectCategory}
      />

      <DishList
        dishes={filteredDishes}
        loading={loading}
        error={error}
      />
    </div>
  )
}

export default Menu
