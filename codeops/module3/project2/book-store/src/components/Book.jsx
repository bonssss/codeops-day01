import { useState, useEffect } from 'react'
import Category from "./Category"


function Book({ onRent }) {
  const [books, setBooks] = useState([])
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [prevTotal, setTotal] = useState(0)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [availableCategories, setAvailableCategories] = useState([])  // NEW: Store real categories

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        setLoading(true)
        const response = await fetch('https://potterapi-fedeperin.vercel.app/en/books')
        const data = await response.json()
        
        const formattedBooks = data.map((book) => {
          // Create categories based on trilogy divisions
          let category = 'Early Years'
          if (book.number <= 2) category = 'Early Years'
          else if (book.number <= 5) category = 'Middle Years'
          else category = 'Final Years'
          
          return {
            id: book.number,
            title: book.title,
            author: 'J.K. Rowling',
            description: book.description,
            price: (Math.random() * 15 + 5).toFixed(2),
            currency: 'USD',
            category: category,
            isAvailable: Math.random() > 0.2,
            cover: book.cover,  // NEW: Book cover image
            pages: book.pages,  // NEW: Number of pages
            releaseDate: book.releaseDate  // NEW: Release date
          }
        })
        
        // Extract all unique categories from books
        const uniqueCategories = [...new Set(formattedBooks.map(book => book.category))]
        setAvailableCategories(uniqueCategories)
        
        setBooks(formattedBooks)
        setError(null)
      } catch (err) {
        setError('Failed to fetch books')
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    fetchBooks()
  }, [])

  const filteredBooks = selectedCategory === 'all'
    ? books
    : books.filter(book => book.category === selectedCategory)

  if(loading) {
    return <div className='flex items-center justify-center min-h-screen'><div className='text-center'><p className='text-xl font-semibold text-gray-700 mb-4'>Loading books...</p><div className='animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto'></div></div></div>
  }

  if(error) {
    return <div className='flex items-center justify-center min-h-screen'><p className='p-4 text-center text-red-600 text-xl font-semibold bg-red-50 rounded-lg border border-red-200 px-6 py-4'>{error}</p></div>
  }

  if(books.length === 0) {
    return <p>Book is not available</p>
  }

  function handleRentBook(book) {
    if (onRent(book.id)) {
      setTotal(prevTotal => prevTotal + book.price)
    }
  }

  return (
    <div className='min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100'>
      <div className='max-w-7xl mx-auto px-4 py-8'>
        <h2 className='mb-8 text-center font-bold text-4xl text-gray-800'>📚 Our Books Collection</h2>
        
        <Category
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
          availableCategories={availableCategories}
        />
        
        <div className='my-8 flex justify-center'>
          <div className='bg-white rounded-lg shadow-lg p-6 border-l-4 border-blue-600'>
            <p className='text-center font-bold text-2xl text-gray-800'>Total Rental: <span className='text-blue-600'>${prevTotal.toFixed(2)}</span> USD</p>
          </div>
        </div>
        {filteredBooks.length === 0 ? (
          <p className='p-8 text-center text-gray-600 text-lg bg-white rounded-lg shadow'>No books found in this category.</p>
        ) : (
          <ul className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4'>
            {filteredBooks.map(book => (
            <li key={book.id} className='bg-white rounded-lg shadow-lg hover:shadow-2xl cursor-pointer transition-all duration-300 hover:-translate-y-2 overflow-hidden border border-gray-200'>
              <div className='p-6 h-full flex flex-col'>
                {book.cover && (
                  <img src={book.cover} alt={book.title} className='w-full h-64 object-cover rounded-lg mb-4 shadow-md' />
                )}
                <div className='flex items-center justify-between mb-2'>
                  <h3 className='text-lg font-bold text-gray-800 flex-grow'>{book.title}</h3>
                  <span className='text-xs font-bold bg-blue-600 text-white px-3 py-1 rounded-full'>Book {book.id}</span>
                </div>
                <p className='mb-1 text-sm text-gray-600'>✍️ {book.author}</p>
                <p className='mb-2 text-xs text-gray-500'>📅 {book.releaseDate}</p>
                <p className='mb-2 text-xs text-gray-500'>📖 {book.pages} pages</p>
                <p className='mb-4 text-gray-700 text-sm flex-grow line-clamp-3'>{book.description}</p>
                <p className='font-bold text-lg text-blue-600 mb-4'>💰 ${book.price} {book.currency}</p>
                {book.isAvailable ? (
                  <button onClick={() => handleRentBook(book)} type='button' className='w-full rounded-lg bg-gradient-to-r from-green-500 to-green-600 px-4 py-3 text-white font-semibold hover:from-green-600 hover:to-green-700 transition-all duration-200 shadow-md hover:shadow-lg active:scale-95'>
                    🎁 Rent Book
                  </button>
                ) : (
                  <p className='w-full text-center font-bold text-white bg-red-500 rounded-lg py-3'>❌ Sold out</p>
                )}
              </div>
            </li>
          ))}
          </ul>
        )}
      </div>
    </div>
  )
}

export default Book
