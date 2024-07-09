import React from "react";
import "./App.css"
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Notice from "./pages/Notice";
import Performance from "./pages/Performance";
import Student from "./pages/Student";
import Academics from "./pages/Academics";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Logout from "./pages/Logout";
import Staff from "./pages/Staff";
import NoMatchRoute from "./components/NoMatchRoute";
import AuthContextProvider from "./context/AuthContextProvider";
import ProtectedRoutes from "./context/ProtectedRoutes";
import LandingPage from "./pages/LandingPage";
import Footer from "./components/Footer";
import ContactUs from "./pages/ContactUs";
import About from "./pages/About/About.jsx";
import TransitionWrapper from "./transitionWrapper/TransitionWrapper.jsx";
const App = () => {
  return (
    <AuthContextProvider>
      <Navbar />
      <TransitionWrapper >
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route element={<ProtectedRoutes />}>
          <Route path="/logout" element={<Logout />} />
          <Route path="/landingpage" element={<LandingPage />} />
          <Route path="/notice" element={<Notice />} />
          <Route path="/academics" element={<Academics />} />
          <Route path="/performance" element={<Performance />} />
          <Route path="/student" element={<Student />} />
          <Route path="/staff" element={<Staff />} />
        </Route>
        <Route path="*" element={<NoMatchRoute />} />
      </Routes>
      </TransitionWrapper>
      <Footer />
    </AuthContextProvider>
  );
};

export default App;
