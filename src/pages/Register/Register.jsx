import React, { useState } from "react";
import axios from "axios";
import "../../pages/Register/Register.css";
import { useNavigate } from "react-router-dom";
import KeyboardBackspaceRoundedIcon from '@mui/icons-material/KeyboardBackspaceRounded';

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    username: "",
    password: "",
    confirm_password: "",
    branch: "",
    role: "student",
  });

  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post("http://localhost:8000/register/", formData);

      if (response.status === 201) {
        navigate("/login");
      }
    } catch (error) {
      console.error("Error registering user:", error);
    }
  };

  return (
    <div className="form-controller">
      <form onSubmit={onSubmitHandler}>
        <div className="form-group">
          <label htmlFor="first_name">First Name:</label>
          <input
            type="text"
            name="first_name"
            value={formData.first_name}
            onChange={onChangeHandler}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="last_name">Last Name:</label>
          <input
            type="text"
            name="last_name"
            value={formData.last_name}
            onChange={onChangeHandler}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={onChangeHandler}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={onChangeHandler}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={onChangeHandler}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="confirm_password">Confirm Password:</label>
          <input
            type="password"
            name="confirm_password"
            value={formData.confirm_password}
            onChange={onChangeHandler}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="branch">Branch:</label>
          <input
            type="text"
            name="branch"
            value={formData.branch}
            onChange={onChangeHandler}
          />
        </div>
        <div className="form-group">
          <label htmlFor="role">Role:</label>
          <select name="role" value={formData.role} onChange={onChangeHandler}>
            <option value="teacher">Teacher</option>
            <option value="student">Student</option>
            <option value="staff">Staff</option>
          </select>
        </div>
        <button type="submit" className="submit">
          Register
        </button>
      </form>
      <button className="home-screen" onClick={()=>{
        navigate('/')
      }}>Go Back To Home Screen <KeyboardBackspaceRoundedIcon /></button>
    </div>
  );
};

export default Register;
