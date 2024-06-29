import React, { useState } from "react";
import axios from "axios";
import "../Css/Register.css";

const Register = () => {
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    username: "",
    password: "",
    confirm_password: "",
    branch: "", // Assuming branch is selected in your form
    role: "student", // Default role, adjust as needed
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
      const response = await axios.post('http://localhost:8000/register/', formData);

      console.log('User registered successfully:', response.data);

      
    } catch (error) {
      console.error('Error registering user:', error);
      // Handle error as needed
    }
  };

  return (
    <div className="form-controller">
      <form onSubmit={onSubmitHandler}>
        <label htmlFor="first_name">First Name:</label>
        <input
          type="text"
          name="first_name"
          value={formData.first_name}
          onChange={onChangeHandler}
        />
        <br />
        <label htmlFor="last_name">Last Name:</label>
        <input
          type="text"
          name="last_name"
          value={formData.last_name}
          onChange={onChangeHandler}
        />
        <br />
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={onChangeHandler}
        />
        <br />
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          name="username"
          value={formData.username}
          onChange={onChangeHandler}
        />
        <br />
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={onChangeHandler}
        />
        <br />
        <label htmlFor="confirm_password">Confirm Password:</label>
        <input
          type="password"
          name="confirm_password"
          value={formData.confirm_password}
          onChange={onChangeHandler}
        />
        <br />
        <label htmlFor="branch">Branch:</label>
        <input
          type="text"
          name="branch"
          value={formData.branch}
          onChange={onChangeHandler}
        />
        <br />
        <label htmlFor="role">Role:</label>
        <select
          name="role"
          value={formData.role}
          onChange={onChangeHandler}
        >
          <option value="teacher">Teacher</option>
          <option value="student">Student</option>
          <option value="staff">Staff</option>
        </select>
        <br />
        <button type="submit" className="submit">Register</button>
      </form>
    </div>
  );
};

export default Register;
