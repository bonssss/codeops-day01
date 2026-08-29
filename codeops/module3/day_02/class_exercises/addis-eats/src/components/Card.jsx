import React, { useState } from 'react'

function Card({title,description, price}) {
  const [count,setCount]=useState(0)

  function add(){
    setCount(count + 1)
  }
  return (
    <div>
        <h2>{title}</h2>
        <em>{description}</em>
        <p>{price}</p>
        <button onClick={add}>Add Count</button>
        <p>Count : {count}</p>
    </div>
  )
}

export default Card