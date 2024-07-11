import React from 'react';
import { Link, useLocation } from 'react-router-dom';

import "../Footers/Footer.css"

const Footer = () => {
    const location = useLocation()
    if (location.pathname!='/'){
        return null;
    }
  return (
    <footer className="footer">
      <nav>
        <ul>
          <li><Link to="/about">About</Link></li>
          <li><Link to="/contact">Contact us</Link></li>
        </ul>
      </nav>
      <p>&copy; GCES App. All rights reserved.</p>
    </footer>
  );
};

export default Footer;
