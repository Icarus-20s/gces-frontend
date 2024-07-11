import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import FacebookRoundedIcon from '@mui/icons-material/FacebookRounded';
import InstagramIcon from '@mui/icons-material/Instagram';
import YouTubeIcon from '@mui/icons-material/YouTube';
import XIcon from '@mui/icons-material/X';
import "../Footers/Footer.css";

const Footer = () => {
    const location = useLocation();
    if (location.pathname !== '/') {
        return null;
    }
    return (
        <footer className="footer">
            <nav>
                <ul>
                    <li><Link to="/about">About</Link></li>
                    <li><Link to="/contact">Contact us</Link></li>
                </ul>
                <div className="social-icons">
                  <h1>Follow Us</h1>
                  <ul>
                    <li>
                        <a href="https://www.facebook.com/gces.pokhara" target="_blank" rel="noopener noreferrer">
                            <FacebookRoundedIcon />
                        </a>
                    </li>
                    <li>
                        <a href="https://www.instagram.com/gcesitclub/" target="_blank" rel="noopener noreferrer">
                            <InstagramIcon />
                        </a>
                    </li>
                    <li>
                        <a href="https://twitter.com/GCES_College" target="_blank" rel="noopener noreferrer">
                            <XIcon />
                        </a>
                    </li>
                    <li>
                        <a href="https://www.youtube.com/@GCES.Pokhara" target="_blank" rel="noopener noreferrer">
                            <YouTubeIcon />
                        </a>
                    </li>
                  </ul>
                </div>
            </nav>
            <p>&copy; GCES App. All rights reserved.</p>
        </footer>
    );
};

export default Footer;
