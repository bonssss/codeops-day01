import React, { useState } from 'react'
import Dish from './Dish'
import CategoryBar from './CategoryBar'

function Main() {
  const [total, setTotal] = useState(0);
  const [catagory, setCatagory] = useState("all");

  const dishes = [
    { id: 1, name: "Misir Wot", price: 120, catagory: "main course", isspicy: false },
    { id: 2, name: "Shiro Wot", price: 200, catagory: "main course", isspicy: false },
    { id: 3, name: "Kitfo", price: 350, catagory: "main course", isspicy: true },
    { id: 4, name: "Dorowot", price: 300, catagory: "main course", isspicy: true },
    { id: 5, name: "Tibs", price: 250, catagory: "main course", isspicy: true },
    { id: 6, name: "Gored Gored", price: 380, catagory: "main course", isspicy: false },
    { id: 7, name: "Atakilt", price: 220, catagory: "side dish", isspicy: false },
    { id: 8, name: "Salad", price: 100, catagory: "side dish", isspicy: false },
    { id: 9, name: "Spiced Tea", price: 40, catagory: "beverage", isspicy: true },
    { id: 10, name: "Fresh Juice", price: 90, catagory: "beverage", isspicy: false },
    { id: 11, name: "Water", price: 30, catagory: "beverage", isspicy: false },
  ];

  const shown = catagory === "all"
    ? dishes
    : dishes.filter(dish => dish.catagory.toLowerCase().trim() === catagory.toLowerCase().trim());

  function addToOrder(price) {
    setTotal(prevTotal => prevTotal + price);
  }

  return (
    <main className="main-section">
      <div className="menu-header-bar">
        <h2>Menu Items</h2>
        <div className="total-box">
          <span>Total Order: <strong>{total} ETB</strong></span>
          {total > 0 && (
            <button className="reset-btn" onClick={() => setTotal(0)}>
              Reset
            </button>
          )}
        </div>
      </div>

      <CategoryBar onSelectCatagory={setCatagory} activeCategory={catagory} />

      <p className="category-status">Showing: <strong style={{ textTransform: 'capitalize' }}>{catagory}</strong> ({shown.length} items)</p>

      <div className="dishes-grid">
        {shown.map((item) => (
          <Dish
            key={item.id}
            {...item}
            onAdd={addToOrder}
          />
        ))}
      </div>
    </main>
  )
}

export default Main;