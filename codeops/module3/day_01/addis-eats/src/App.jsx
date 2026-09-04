import React from 'react'
import Header from './components/Header'
import Menu from './components/Menu'

function App() {
  return (
    <div className="app">
      <Header />
      <main className="main-content">
        <Menu />
      </main>
    </div>
  )
}

export default App