import React, { useState, useEffect } from 'react';
import '../components/Navbar.css';
import '../Css/Home.css';
import { useNavigate } from 'react-router-dom';
import photo1 from '../assets/photo1.jpg';
import photo2 from '../assets/photo2.jpg';
import photo3 from '../assets/photo3.jpg';
import photo4 from '../assets/photo4.jpg';

const Home = () => {
    const navigate = useNavigate();
    const photos = [photo1, photo2, photo3, photo4];
    const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentPhotoIndex((prevIndex) => (prevIndex + 1) % photos.length);
        }, 3000);
        return () => clearInterval(interval);
    }, [photos.length]);

    return (
        <div className="home" style={{ backgroundImage: `url(${photos[currentPhotoIndex]})` }}>
            <div className="home-content">
                <h1>Welcome to GCES     App</h1>
                <div className="button-container">
                    <button className="authen" onClick={() => navigate('register')}>Register</button>
                    <button className="authen" onClick={() => navigate('login')}>Login</button>
                </div>
            </div>
        </div>
    );
}

export default Home;
