import { useState } from 'react'
import logo from './assets/post3.jpg'
import Header from './components/Header'
import Footer from './components/Footer'
import Book from './components/Book'
import Card from './components/Card'
function App() {
 
  

  return (
    <div className="App">
     <Header/>
     
     <Book  />
     <Footer/>
     <Card><h3>Book Title</h3>
     <p>Description of the book.</p>

     </Card>
    </div>
  )
}

export default App
