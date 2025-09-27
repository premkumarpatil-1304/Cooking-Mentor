import React from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar.jsx'
import Hero from '../components/Hero.jsx'
import Marquee from '../components/Marquee.jsx'
import About from '../components/About.jsx'

function LandingPage() {
  return (
    <div>
      <Navbar />
      <Hero />
      <Marquee />
      <About />
    </div>
  )
}

export default LandingPage