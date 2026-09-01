import Card from './components/Card'
import Dish from './components/Dish'
import Header from './components/Header'

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
]

function App() {
  return (
    <div className="container">
      <Header />
      <h1>OUR MENU</h1>
      <p className="subtitle">Come and check out our delicious menu items!</p>

      <div className="dishes">
        {Dishes.map((dish) => (
          <Card key={dish.id}>
            <Dish
              name={dish.name}
              price={dish.price}
              spicy={dish.spicy}
            />
          </Card>
        ))}
      </div>
    </div>
  )
}

export default App
