import React from "react";
import "./App.css"
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbars/Navbar.jsx";
import Home from "./pages/Home/Home";
import Notice from "./pages/Notice/Notice.jsx";
import Performance from "./pages/Performance/Performance.jsx";
import Student from "./pages/Students/Student.jsx/";
import Academics from "./pages/Academics/Academics.jsx";
import Login from "./pages/Login/Login.jsx";
import Register from "./pages/Register/Register.jsx";
import Logout from "./pages/Login/Logout/Logout.jsx";
import Staff from "./pages/Staff/Staff.jsx";
import NoMatchRoute from "./components/NoRoute/NoMatchRoute.jsx";
import AuthContextProvider from "./context/AuthContextProvider";
import ProtectedRoutes from "./context/ProtectedRoutes";
import LandingPage from "./pages/LandingPage/LandingPage.jsx";
import Footer from "./components/Footers/Footer.jsx";
import ContactUs from "./pages/Contactus/ContactUs.jsx";
import About from "./pages/About/About.jsx";
import TransitionWrapper from "./transitionWrapper/TransitionWrapper.jsx";
import Profile from "./pages/Profile/Profile.jsx";

const App = () => {
  return (
    <AuthContextProvider>
      <Navbar />
      <TransitionWrapper>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<ContactUs />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route element={<ProtectedRoutes />}>
          <Route path="/profile" element={<Profile />} />
            <Route path="/landingpage" element={<LandingPage />} />
            <Route path="/logout" element={<Logout />} />
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
