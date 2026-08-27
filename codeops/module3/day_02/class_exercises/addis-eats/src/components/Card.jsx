import React from 'react'

function Card({title,description, price}) {
  return (
    <div>
        <h2>{title}</h2>
        <em>{description}</em>
        <p>{price}</p>
    </div>
  )
}

export default Card