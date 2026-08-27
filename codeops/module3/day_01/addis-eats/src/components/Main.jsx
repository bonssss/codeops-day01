import React from 'react'

function Main() {
  const Dishes = [
    { id: 1, name: "kitfo", price: 200, isspcicy: true },
    { id: 2, name: "doro", price: 250, isspcicy: false },
    { id: 3, name: "tibs", price: 180, isspcicy: true },
    { id: 4, name: "beyaynetu", price: 300, isspcicy: false },



  ]
  return (
    <>
      <h1>Our Dishes</h1>
      {Dishes.map((dish) => {
        return (
          <div key={dish.id}>
            <h2>{dish.name}</h2>
            <p>{dish.price}</p>
            <p>{dish.isspcicy ? "Spicy" : "Not Spicy"}</p>
          </div>
        )
      })}
    </>
  )
}

export default Main