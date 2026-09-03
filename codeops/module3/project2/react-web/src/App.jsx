import { useState } from 'react'
import logo from './assets/post3.jpg'
import Header from './components/Header'
import Footer from './components/Footer'
import Book from './components/Book'
function App() {
 
  

  return (
    <div className="App">
     <Header/>
     <Book />
     <Footer/>
    </div>
  )
}

export default App
