import Header from './components/Header'
import SpecialOffers from './components/SpecialOffers'
import Menu from './components/Menu'
import { ThemeProvider } from './context/ThemeContext'
import { CartProvider } from './context/CartContext'

function App() {
  return (
    <ThemeProvider>
      <CartProvider>
        <div className="container">
          <Header />
          <main>
            <h1>OUR MENU</h1>
            <p className="subtitle">Come and check out our delicious menu items!</p>
            <SpecialOffers />
            <Menu />
          </main>
        </div>
      </CartProvider>
    </ThemeProvider>
  )
}

export default App

