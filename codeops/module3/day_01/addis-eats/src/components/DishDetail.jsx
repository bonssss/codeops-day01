import React, { useCallback } from 'react'
import { useParams, Link } from 'react-router-dom'
import { useFetch } from '../hooks/useFetch'
import { useCartStore } from '../store/useCartStore'

export function DishDetail() {
  const { id } = useParams()
  const { data: dishes, loading, error } = useFetch('/dishes.json')

  // Narrow selectors: specific dish count and addItem action
  const count = useCartStore((state) =>
    state.items.filter((item) => String(item.id) === String(id)).length
  )
  const addItem = useCartStore((state) => state.addItem)

  const dish = dishes?.find((d) => String(d.id) === String(id))

  const handleAdd = useCallback(() => {
    if (dish) {
      addItem(dish)
    }
  }, [dish, addItem])

  if (loading) {
    return (
      <div className="status-message loading-state">
        <p>Loading dish details...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="status-message error-state">
        <p className="err">{error}</p>
        <Link to="/menu" className="back-link">
          ← Back to Menu
        </Link>
      </div>
    )
  }

  if (!dish) {
    return (
      <div className="empty-state not-found-card">
        <h2>Dish Not Found</h2>
        <p>We couldn't find any dish matching "{id}".</p>
        <Link to="/menu" className="primary-btn">
          ← Back to Menu
        </Link>
      </div>
    )
  }

  return (
    <div className="dish-detail-container">
      <Link to="/menu" className="back-link">
        ← Back to Menu
      </Link>

      <div className="dish-detail-card">
        <div className="dish-detail-header">
          <h1>{dish.name}</h1>
          {Boolean(dish.spicy) && <span className="spicy">🌶️ Spicy</span>}
        </div>

        <div className="dish-detail-meta">
          <span className="category-tag">{dish.category}</span>
          <span className="dish-detail-price">
            {dish.price} {dish.currency || 'ETB'}
          </span>
        </div>

        <p className="dish-detail-description">
          Authentic and freshly prepared using traditional Ethiopian spices and ingredients.
          Enjoy with fresh injera or side dishes.
        </p>

        <div className="dish-detail-actions">
          <button type="button" className="add-btn large-add-btn" onClick={handleAdd}>
            + Add to Cart {count > 0 && `(${count} in cart)`}
          </button>
          <Link to="/cart" className="view-cart-btn">
            Go to Cart →
          </Link>
        </div>
      </div>
    </div>
  )
}

export default DishDetail
