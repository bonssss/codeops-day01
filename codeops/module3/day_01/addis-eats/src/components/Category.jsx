import React from 'react'
import PropTypes from 'prop-types'

function Category({ selectedCategory, onSelectCategory }) {
  return (
    <div className="category-filter">
      <label htmlFor="category-select"><strong>Filter by Category: </strong></label>
      <select
        id="category-select"
        value={selectedCategory}
        onChange={(e) => onSelectCategory(e.target.value)}
      >
        <option value="All">All</option>
        <option value="Fast Food">Fast Food</option>
        <option value="Drink">Drink</option>
        <option value="Dessert">Dessert (Test Empty State)</option>
      </select>
    </div>
  )
}

Category.propTypes = {
  selectedCategory: PropTypes.string.isRequired,
  onSelectCategory: PropTypes.func.isRequired,
}

export default Category