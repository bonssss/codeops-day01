import React from 'react'
import Header from './components/Header'
import Dish from './components/Dish'

const Dishes = [
  { id: 1, name: "Pizza", price: 1000 },
  { id: 2, name: "Pasta", price: 1500 },
  { id: 3, name: "Burger", price: 2000 },
  { id: 4, name: "Fries", price: 500 },
]
function App() {
  return (
    <div>
      <Header />
      <div className='dishes'>
        {Dishes.map((dish) => (
          <Dish
            key={dish.id}
            name={dish.name}
            price={dish.price}/>

          
        ))}
      </div>
    </div>
  )
}

export default App