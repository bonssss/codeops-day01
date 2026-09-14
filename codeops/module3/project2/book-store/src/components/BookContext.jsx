import { useState, useEffect, createContext, useContext } from 'react'
import { books as fallbackBooks } from '../../data/books'

const BookContext = createContext()

const API_URL = 'https://potterapi-fedeperin.vercel.app/en/books'

export function BookProvider({ children }) {
  const [books, setBooks] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [rentals, setRentals] = useState([])

  // Fetch live books from API on mount
  useEffect(() => {
    async function fetchBooks() {
      try {
        setLoading(true)
        setError(null)
        const response = await fetch(API_URL)
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }
        const data = await response.json()

        const formatted = data.map((book) => {
          let category = 'Fantasy'
          if (book.number <= 2) category = 'Early Adventures'
          else if (book.number <= 5) category = 'Hogwarts Mysteries'
          else category = 'Epic Climax'

          // Deterministic pricing & ratings
          const price = (3.50 + (book.number * 0.45)).toFixed(2)
          const rating = (4.7 + ((book.number % 3) * 0.1)).toFixed(1)

          return {
            id: book.number,
            title: book.title,
            author: 'J.K. Rowling',
            description: book.description,
            price: Number(price),
            currency: 'USD',
            category: category,
            isAvailable: true,
            rating: Number(rating),
            pages: book.pages,
            releaseDate: book.releaseDate,
            cover: book.cover
          }
        })

        setBooks(formatted)
      } catch (err) {
        console.warn('API fetch failed, falling back to local dataset:', err)
        setError('Failed to fetch from live API. Showing cached catalog.')
        setBooks(fallbackBooks)
      } finally {
        setLoading(false)
      }
    }

    fetchBooks()
  }, [])

  function rentBook({ bookId, fullName, phone, rentalPeriod, deliveryType = 'pickup' }) {
    const numericId = Number(bookId)
    const targetBook = books.find(b => b.id === numericId)

    if (!targetBook || !targetBook.isAvailable) {
      return { success: false, message: 'This book is not available for rent.' }
    }

    const duration = Number(rentalPeriod) || 1
    const total = (targetBook.price * duration).toFixed(2)
    const today = new Date()
    const dueDate = new Date()
    dueDate.setDate(today.getDate() + duration)

    const newRental = {
      id: `RNT-${Math.floor(1000 + Math.random() * 9000)}`,
      bookId: targetBook.id,
      bookTitle: targetBook.title,
      author: targetBook.author,
      cover: targetBook.cover,
      fullName: fullName.trim(),
      phone: phone.trim(),
      rentalPeriod: duration,
      rentalDate: today.toISOString().split('T')[0],
      returnDueDate: dueDate.toISOString().split('T')[0],
      totalPrice: total,
      currency: targetBook.currency || 'USD',
      deliveryType,
      status: 'Active'
    }

    // Mark book unavailable in live state
    setBooks(prev => prev.map(b => b.id === numericId ? { ...b, isAvailable: false } : b))

    // Add to active rentals
    setRentals(prev => [newRental, ...prev])

    return { success: true, rental: newRental }
  }

  function returnBook(rentalId) {
    const rental = rentals.find(r => r.id === rentalId)
    if (!rental) return

    // Restore book availability in live state
    setBooks(prev => prev.map(b => b.id === rental.bookId ? { ...b, isAvailable: true } : b))

    // Remove from active rentals
    setRentals(prev => prev.filter(r => r.id !== rentalId))
  }

  return (
    <BookContext.Provider value={{ books, loading, error, rentals, rentBook, returnBook }}>
      {children}
    </BookContext.Provider>
  )
}

export function useBooks() {
  const context = useContext(BookContext)
  if (!context) {
    throw new Error('useBooks must be used within a BookProvider')
  }
  return context
}
