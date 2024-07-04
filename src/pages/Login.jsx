import React, { useState } from "react";
import "../Css/Login.css";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import api from "../Apis";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await api.post("/login/", { email, password });
      if (response.status === 200) {
        Cookies.set("token", response.data.token);
        console.log("Token set in cookies:", response.data.token);
        navigate("/");
      }
    } catch (error) {
      setError("Login Failed. Please check your email and password.");
      console.error("Login Failed:", error);
    }
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {error && <div className="error-message">{error}</div>}
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
