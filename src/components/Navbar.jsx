import React from 'react'
import { Link } from 'react-router-dom'
import './Navbar.css'
const Navbar = () => {
  return (
    <nav className='nav-bar'>
        <Link to="/">Home</Link>
        <Link to="/performance">Performance</Link>
        <Link to="/staff">Staff</Link>
        <Link to="/notice">Notice</Link>
        <Link to="/student">Student</Link>
        <Link to="/academics">Academics</Link>
        <Link to="/register">Register</Link>
        <Link to="/login">Login</Link>
        <Link to="/logout">Logout</Link>
    </nav>
  )
}

export default Navbar
