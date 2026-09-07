import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Home from './pages/Home'
import Menu from './components/Menu'
import About from './pages/About'
import { ThemeProvider } from './context/ThemeContext'
import { CartProvider } from './context/CartContext'

function App() {
  return (
    <ThemeProvider>
      <CartProvider>
        <BrowserRouter>
          <div className="container">
            <Header />
            <main>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/menu" element={<Menu />} />
                <Route path="/about" element={<About />} />
              </Routes>
            </main>
          </div>
        </BrowserRouter>
      </CartProvider>
    </ThemeProvider>
  )
}

export default App

