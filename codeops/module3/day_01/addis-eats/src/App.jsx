import React from 'react'
import Header from './components/Header'
import Menu from './components/Menu'
import { dishes } from './data'

function App() {
  return (
    <div className="app">
      <Header />
      <main className="main-content">
        <Menu dishes={dishes} />
      </main>
    </div>
  )
}

export default App