import React from 'react'
import Header from './components/Header'
import Main from './components/Main'
import OrderForm from './components/OrderForm'
import Footer from './components/Footer'

function App() {
  return (
    <div className="container">
      <Header />
      <Main />
      <OrderForm />
      <Footer />
    </div>
  )
}

export default App
