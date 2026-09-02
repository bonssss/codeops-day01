import Header from './components/Header'
import Menu from './components/Menu'

const Dishes = [
  {
    id: 1,
    name: "Pizza",
    price: 350,
    spicy: false,
    category: "Main",
  },
  {
    id: 2,
    name: "Pasta",
    price: 280,
    spicy: false,
    category: "Main",
  },
  {
    id: 3,
    name: "Burger",
    price: 300,
    spicy: true,
    category: "Main",
  },
  {
    id: 4,
    name: "Sandwich",
    price: 150,
    spicy: false,
    category: "Breakfast",
  },
  {
    id: 5,
    name: "Doro Wat",
    price: 450,
    spicy: true,
    category: "Traditional",
  },
]

function App() {
  return (
    <div className="container">
      <Header />
      <main>
        <h1>OUR MENU</h1>
        <p className="subtitle">Come and check out our delicious menu items!</p>
        <Menu dishes={Dishes} />
      </main>
    </div>
  )
}

export default App
