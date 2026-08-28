import React from 'react'



function Dish({name,price}) {
  return (
    <div>
        <h2>{name}</h2>
        <p>{price}</p>
    </div>
  )
}

export default Dish