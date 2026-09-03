import { useState } from 'react'
import Header from './components/Header'
import Footer from './components/Footer'
import Book from './components/Book'
import Card from './components/Card'
import RentForm from './components/RentForm'
import { books as initialBooks } from '../data/books'
function App() {
  const [books, setBooks] = useState(initialBooks)

  function rentBook(bookId) {
    const book = books.find(item => item.id === bookId)
    if (!book || !book.isAvailable) {
      return false
    }

    setBooks(currentBooks => currentBooks.map(item => (
      item.id === bookId ? { ...item, isAvailable: false } : item
    )))
    return true
  }
  

  return (
    <div className="App">
     <Header/>

    <Book books={books} onRent={rentBook} />
    <RentForm books={books} onRent={rentBook}/>
     <Footer/>
     <Card><h3>Book Title</h3>
     <p>Description of the book.</p>

     </Card>
    </div>
  )
}

export default App
