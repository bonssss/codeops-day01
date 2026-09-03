import React from 'react'
const Books =[
  { id: 1, title: 'Book 1', author: 'Author 1' },
  { id: 2, title: 'Book 2', author: 'Author 2' },
  { id: 3, title: 'Book 3', author: 'Author 3' }
]

function Book() {
  return (
    <div >
      <h2 className='m-4 text-center font-bold text-2xl'>Our Books</h2>
      <ul className='flex justify-around gap-4' >
        {Books.map(book => (
          <li key={book.id} className='bg-white p-4 rounded shadow cursor-pointer hover:scale-105 transition-transform duration-300'>
            <h3>{book.title}</h3>
            <p>Author: {book.author}</p>
          </li>
        ))}
        
      </ul>
    </div>
  )
}

export default Book
