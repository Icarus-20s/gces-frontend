import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContextProvider";

const Logout = () => {
  const navigate = useNavigate();
  const auth = useAuth();

  useEffect(() => {

    auth.logout();
    navigate("/login");
  }, [auth, navigate]);

  return null;
};

export default Logout;
