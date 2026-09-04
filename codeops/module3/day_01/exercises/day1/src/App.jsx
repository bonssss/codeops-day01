import Header from './components/Header'
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
          <Menu />
        </main>
      </div>
    </ThemeProvider>
  )
}

export default App

