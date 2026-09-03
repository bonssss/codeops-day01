import { useState } from 'react'
import Category from "./Category"


function Book({ books, onRent }) {
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [prevTotal, setTotal] = useState(0)
  const filteredBooks = selectedCategory === 'all'
    ? books
    : books.filter(book => book.category === selectedCategory)

  if(books.length === 0) {
    return <p>Book is not available</p>
  }

  function handleRentBook(book) {
    if (onRent(book.id)) {
      setTotal(prevTotal => prevTotal + book.price)
    }
  }

  return (
    <div >
      <h2 className='m-4 text-center font-bold text-2xl'>Our Books</h2>
      <Category
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
      />
      <p className='p-4 text-center font-semibold'>Total: {prevTotal.toFixed(2)} USD</p>
      {filteredBooks.length === 0 ? (
        <p className='p-4 text-center'>No books found in this category.</p>
      ) : (
        <ul className='flex flex-wrap justify-center gap-4 p-4' >
          {filteredBooks.map(book => (
          <li key={book.id} className='w-64 rounded bg-white p-4 shadow cursor-pointer transition-transform duration-300 hover:scale-105'>
            <h3 className='mb-2 text-lg font-bold'>{book.title}</h3>
            <p className='mb-1'>Author: {book.author}</p>
            <p className='mb-2'>{book.description}</p>
            <p className='font-semibold'>Price: {book.price} {book.currency}</p>
            {book.isAvailable ? (
              <button onClick={() => handleRentBook(book)} type='button' className='mt-3 rounded bg-green-600 px-3 py-2 text-white hover:bg-green-700'>
                Rent book
              </button>
            ) : (
              <p className='mt-3 font-bold text-red-600'>Sold out</p>
            )}
          </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default Book
