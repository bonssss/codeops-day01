import React from 'react'
import Header from './components/Header'
import Main from './components/Main'
import OrderForm from './components/OrderForm'
import Footer from './components/Footer'
import { createContext } from 'react'

const AppContext=createContext()


function App() {

  const user =[
    {
      name:"Dawit",
      email:"test@gmail.com"
      
    },
    {
      name:"Hanan",
      email:"hana@gmail.com"
    }
  ]
  return (
    <div className="container">
      <AppContext.Provider value={user}>
        
      

      <Header />
      <Main />
      <OrderForm />
      <Footer />
      </AppContext.Provider>

    </div>
  )
}

export default App
