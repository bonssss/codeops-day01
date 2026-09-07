import { useParams, Link } from 'react-router-dom'
import useFetch from '../hooks/useFetch'
import { useCart } from '../context/CartContext'
import { useTheme } from '../context/ThemeContext'

function DishDetail() {
  const { id } = useParams()
  const { theme } = useTheme()
  const { items, addToCart } = useCart()
  const { data: dishes, loading, error } = useFetch('/dishes.json')

  const dish = dishes?.find((item) => String(item.id) === String(id))
  const cartItem = dish ? items.find((item) => item.id === dish.id) : null
  const quantityInCart = cartItem ? cartItem.quantity : 0

  if (loading) {
    return (
      <div className="status-message loading-state">
        <p>⏳ Loading dish details...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="status-message error-state">
        <p>⚠️ Error: {error}</p>
      </div>
    )
  }

  if (!dish) {
    return (
      <div className="empty-state">
        <h2>Dish Not Found</h2>
        <p>Could not find a dish with ID #{id}.</p>
        <div style={{ marginTop: '1.5rem' }}>
          <Link to="/menu" className="btn-primary">
            ← Back to Menu
          </Link>
        </div>
      </div>
    )
  }

  const handleAddToCart = () => {
    addToCart({
      id: dish.id,
      name: dish.name,
      price: dish.price,
      spicy: dish.spicy,
      currency: dish.currency || 'ETB',
    })
  }

  return (
    <div className={`dish-detail-container dish-theme-${theme}`}>
      <Link to="/menu" className="back-link">
        ← Back to Menu
      </Link>

      <div className="dish-detail-card">
        <div className="dish-detail-header">
          <div>
            <span className="dish-detail-category">{dish.category}</span>
            <h1 className="dish-detail-title">{dish.name}</h1>
          </div>
          {Boolean(dish.spicy) && (
            <span className="spicy-badge large-badge">🌶️ Spicy Hot</span>
          )}
        </div>

        <p className="dish-detail-desc">
          Freshly made-to-order dish prepared with authentic seasonings and premium ingredients.
          Enjoy the finest taste crafted to perfection.
        </p>

        <div className="dish-detail-meta">
          <div className="dish-price-large">
            {dish.price} {dish.currency || 'ETB'}
          </div>

          <div className="dish-detail-actions">
            {quantityInCart > 0 && (
              <span className="cart-count-badge">
                In Cart: {quantityInCart}
              </span>
            )}
            <button
              type="button"
              className="submit-btn"
              onClick={handleAddToCart}
            >
              + Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DishDetail
