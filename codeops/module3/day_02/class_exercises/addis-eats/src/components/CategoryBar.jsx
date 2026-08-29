import React from 'react'

function CategoryBar({ onSelectCatagory, activeCategory = "all" }) {
  const categories = [
    "all",
    "main course",
    "side dish",
    "beverage"
  ];

  return (
    <div className="category-bar">
      {categories.map((cat) => (
        <button
          key={cat}
          className={`category-btn ${activeCategory === cat ? 'active' : ''}`}
          onClick={() => onSelectCatagory && onSelectCatagory(cat)}
        >
          {cat}
        </button>
      ))}
    </div>
  )
}

export default CategoryBar;
