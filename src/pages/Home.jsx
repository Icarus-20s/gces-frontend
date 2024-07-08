import React from 'react';
import '../components/Navbar.css';
import '../Css/Home.css';
import { useNavigate } from 'react-router-dom';

const Home = () => {
    const navigate = useNavigate();
    return (
        <div className="home">
            <h1>Welcome to GCES App</h1>
            <div className="button-container">
                <button className="authen" onClick={() => navigate('register')}>Register</button>
                <button className="authen" onClick={() => navigate('login')}>Login</button>
            </div>
        </div>
    );
}

export default Home;
