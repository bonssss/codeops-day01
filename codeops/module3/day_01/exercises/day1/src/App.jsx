import Header from './components/Header'
import Menu from './components/Menu'

function App() {
  return (
    <div className="container">
      <Header />
      <main>
        <h1>OUR MENU</h1>
        <p className="subtitle">Come and check out our delicious menu items!</p>
        <Menu />
      </main>
    </div>
  )
}

export default App

