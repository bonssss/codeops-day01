import { Routes, Route, Navigate } from 'react-router-dom'
import { BookProvider } from './components/BookContext'
import Header from './components/Header'
import Footer from './components/Footer'
import Book from './components/Book'
import RentForm from './components/RentForm'
import MyRentals from './components/MyRentals'

function App() {
  return (
    <BookProvider>
      <div className="App flex flex-col min-h-screen bg-slate-50 font-sans antialiased text-slate-800">
        <Header />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Book />} />
            <Route path="/book" element={<Book />} />
            <Route path="/books" element={<Book />} />
            <Route path="/rent" element={<RentForm />} />
            <Route path="/my-rentals" element={<MyRentals />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BookProvider>
  )
}

export default App
