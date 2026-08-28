import React, { useState } from 'react'
import Header from './components/Header'
import Category from './components/Category'
import Menu from './components/Menu'
import { dishes } from './data'

function App() {
  const [selectedCategory, setSelectedCategory] = useState("All")

  return (
    <div className="app">
      <Header />
      <Category
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
      />
      <section className="menu-section">
        <h2>{selectedCategory} Menu</h2>
        <Menu dishes={dishes} selectedCategory={selectedCategory} />
      </section>
    </div>
  )
}

export default App