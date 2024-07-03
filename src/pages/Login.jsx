import React, { useState } from "react";
import "../Css/Login.css";
import axios from "axios";
import bcrypt from "bcryptjs"; // Import bcryptjs for hashing
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate= useNavigate()
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post("http://127.0.0.1:8000/login/", {
        email,
        password
      });
      
      if (response.status===202){
        navigate('/')
      }
    } catch (error) {
      console.log("Login Failed:", error);
      // Handle login failure
    }
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <button type="submit" className="login-button">
            Login
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
