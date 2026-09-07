import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import Menu from './components/Menu'
import DishDetail from './pages/DishDetail'
import About from './pages/About'
import Contact from './pages/Contact'
import Login from './pages/Login'
import Checkout from './pages/Checkout'
import NotFound from './pages/NotFound'
import RequireAuth from './components/RequireAuth'
import { ThemeProvider } from './context/ThemeContext'
import { CartProvider } from './context/CartContext'
import { AuthProvider } from './context/AuthContext'

/**
 * Exercise 2: Dedicated independent providers for Theme, Auth, and Cart.
 * Splitting contexts avoids unnecessary re-renders across disparate domains
 * (e.g., changing theme does not re-render auth consumers or cart consumers).
 */
function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <CartProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Layout />}>
                <Route index element={<Home />} />
                <Route path="menu" element={<Menu />} />
                <Route path="menu/:id" element={<DishDetail />} />
                <Route path="about" element={<About />} />
                <Route path="contact" element={<Contact />} />
                <Route path="login" element={<Login />} />
                <Route
                  path="checkout"
                  element={
                    <RequireAuth>
                      <Checkout />
                    </RequireAuth>
                  }
                />
                <Route path="*" element={<NotFound />} />
              </Route>
            </Routes>
          </BrowserRouter>
        </AuthProvider>
      </CartProvider>
    </ThemeProvider>
  )
}

export default App



