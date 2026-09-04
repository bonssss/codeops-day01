import Header from './components/Header'
import SpecialOffers from './components/SpecialOffers'
import Menu from './components/Menu'
import { ThemeProvider } from './context/ThemeContext'

function App() {
  return (
    <ThemeProvider>
      <div className="container">
        <Header />
        <main>
          <h1>OUR MENU</h1>
          <p className="subtitle">Come and check out our delicious menu items!</p>
          <SpecialOffers />
          <Menu />
        </main>
      </div>
    </ThemeProvider>
  )
}

export default App

