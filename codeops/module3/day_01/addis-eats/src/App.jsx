import React from 'react'
import { CartProvider } from './context/CartProvider'
import Header from './components/Header'
import Menu from './components/Menu'

function App() {
  return (
    <CartProvider>
      <div className="app">
        <Header />
        <main className="main-content">
          <Menu />
        </main>
      </div>
    </CartProvider>
  )
}

export default App