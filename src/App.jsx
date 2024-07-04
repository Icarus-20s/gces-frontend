import React from "react";
import Navbar from "./components/Navbar";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Notice from "./pages/Notice.jsx";
import Performance from "./pages/Performance.jsx";
import Student from "./pages/Student.jsx";
import Academics from "./pages/Academics.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import Logout from "./pages/Logout.jsx";
import Staff from "./pages/Staff.jsx";
import NoMatchRoute from "./components/NoMatchRoute.jsx";


const App = () => {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="register" element={<Register />} />
        <Route path="*" element={<NoMatchRoute />} />
        <Route path="login" element={<Login />} />
        <Route path="/" element={<Home />} />
        <Route path="notice" element={<Notice />} />
        <Route path="performance" element={<Performance />} />
        <Route path="Academics" element={<Academics />} />
        <Route path="student" element={<Student />} />
        <Route path="staff" element={<Staff />} />
        <Route path="logout" element={<Logout />} />
       
      </Routes>
    </div>
  );
};

export default App;
