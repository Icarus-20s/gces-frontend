import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContextProvider.jsx";
import Loader from "../components/Loader/Loader.jsx";

const ProtectedRoutes = () => {
  const location = useLocation()
  const auth = useAuth()
  return (
    auth.Loading ? Loader:
    auth.isAuthenticated ? 
    (
      <Outlet /> 
         )
  : <Navigate to="/login" state={{path:location.pathname}}/>
  );
};

export default ProtectedRoutes;
