import { ThemeProvider } from './context/ThemeContext'
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
    <ThemeProvider>
      <div className="min-h-screen bg-[#f1f4f8] text-slate-800 transition-colors duration-300 dark:bg-[#0d1117] dark:text-[#e6edf3]">
        <Navbar />
        <main>
          <Hero />
          <Projects />
          <Skills />
          <Process />
          <Experience />
          <About />
          <Contact />
          <Footer />
        </main>
      </div>
    </ThemeProvider>
  )
}

export default App
