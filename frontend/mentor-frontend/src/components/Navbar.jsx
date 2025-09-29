import React from 'react'
import { Link } from 'react-router-dom'
import { SignedIn, SignedOut, UserButton } from '@clerk/clerk-react'
import "../styles/navbar.css"

function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-container gap-130">
        <div className="navbar-logo">
          <Link to="/">Virtual Cooking Mentor</Link>
        </div>
        <div className="navbar-menu ">
          <SignedOut>
            <Link to="/sign-in" className="navbar-button bg-[#4f46e5] ">Sign In</Link>
            <Link to="/sign-up" className="navbar-button primary">Sign Up</Link>
          </SignedOut>
          <SignedIn>
            <UserButton />
          </SignedIn>
          <button className="navbar-button  bg-[#4f46e5]">About us</button>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
