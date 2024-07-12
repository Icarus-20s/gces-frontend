import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContextProvider.jsx';
import logo from "../../assets/logo.svg";
import './Navbar.css';
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';
import MenuIcon from '@mui/icons-material/Menu';

const Navbar = () => {
  const { isAuthenticated ,role} = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <nav className='nav-bar'>
      <Link to="/landingpage" className="logo-link" onClick={closeMenu}>
        <img src={logo} alt="Logo" className="logo-img" />
      </Link>
      <div className="menu-icon" onClick={toggleMenu}>
        <MenuIcon />
      </div>
      <div className={`nav-links ${menuOpen ? 'active' : ''}`}>
        {

        }
        <Link to="/performance" onClick={closeMenu}>Performance</Link>
        <Link to="/staff" onClick={closeMenu}>Staff</Link>
        <Link to="/notice" onClick={closeMenu}>Notice</Link>
        <Link to="/student" onClick={closeMenu}>Student</Link>
        <Link to="/academics" onClick={closeMenu}>Academics</Link>
        {isAuthenticated ? (
          <Link to='/profile' className="profile-link" onClick={closeMenu}>
            <AccountCircleRoundedIcon />
          </Link>
        ) : (
          <>
            <Link to="/register" onClick={closeMenu}>Register</Link>
            <Link to="/login" onClick={closeMenu}>Login</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
