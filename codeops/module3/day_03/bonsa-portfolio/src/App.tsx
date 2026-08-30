import { useState } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Projects from './components/Projects'
import Skills from './components/Skills'
import Process from './components/Process'
import Experience from './components/Experience'
import About from './components/About'
import Contact from './components/Contact'
import Footer from './components/Footer'

function App() {

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
        <Footer/>
      </main>
      
    </div>
  )
}

export default App
