import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContextProvider.jsx';
import logo from "../assets/logo.svg";
import './Navbar.css'; // Import your CSS file for Navbar styles

const Navbar = () => {
  const { isAuthenticated } = useAuth();

  return (
    <nav className='nav-bar'>
      <Link to="/landingpage" className="logo-link">
        <img src={logo} alt="Logo" className="logo-img" />
      </Link>
      <Link to="/performance">Performance</Link>
      <Link to="/staff">Staff</Link>
      <Link to="/notice">Notice</Link>
      <Link to="/student">Student</Link>
      <Link to="/academics">Academics</Link>
      {isAuthenticated ? (
        <Link to='/logout'>Logout</Link>
      ) : (
        <>
          <Link to="/register">Register</Link>
          <Link to="/login">Login</Link>
        </>
      )}
    </nav>
  );
};

export default Navbar;
