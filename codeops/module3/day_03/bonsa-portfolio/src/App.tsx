import { div } from 'framer-motion/client'
import { useState } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Projects from './components/Projects'
import Skills from './components/Skills'
import Process from './components/Process'
import Experience from './components/Experience'
import About from './components/About'
import Contact from './components/Contact'

function App() {
  const [count, setCount] = useState(0)

  return (
   
    <div className='min-h-screen bg-[#050505] text-white'>
      <Navbar/>
      <main>
        <Hero/>
        <Projects/>
        <Skills/>
        <Process/>
        <Experience/>
        <About/>
        <Contact/>
      </main>
      
    </div>
  )
}

export default App
