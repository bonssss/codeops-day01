import { useState } from 'react'

import Dish from './components/Dish'
import Header from './components/Header'
const Dishes=[
    {
        id:1,
        name:"Pizza",
        price:10
    },
    {
        id:2,
        name:"Pasta",
        price:12
    },
    {
        id:3,
        name:"Burger",
        price:15
    },
    {
        id:4,
        name:"Sandwich",
        price:8
    }
]
function App() {
  return (
    <div>
      <Header/>
      <h1>OUR MENU</h1>
        <p>Come and check out our delicious menu items!</p>

        <div className="dishes">
            {Dishes.map((dish) => (
                <Dish key={dish.id} name={dish.name} price={dish.price}/>
            ))}
        </div>
    </div>
  )
}

export default App
