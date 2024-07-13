import React, { useContext, useState, useEffect } from "react";
import Cookies from "js-cookie";

const AuthContext = React.createContext(null);

const AuthContextProvider = ({ children }) => {
  const [Loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null);

  const login = (userData, token, role) => {
    setUser(userData);
    Cookies.set("token", token);
    setRole(role);
    setIsAuthenticated(true);
    localStorage.setItem("user", JSON.stringify(userData));
    localStorage.setItem("role", JSON.stringify(role));
  };

  const logout = () => {
    Cookies.remove("token");
    setIsAuthenticated(false);
    setUser(null);
    localStorage.removeItem("user");
    localStorage.removeItem("role");
  };

  useEffect(() => {
    const accessToken = Cookies.get("token");
    const storedUser = localStorage.getItem("user");
    const storedRole = localStorage.getItem("role");
    if (storedUser && accessToken) {
      setUser(JSON.parse(storedUser));
      setRole(JSON.parse(storedRole));
      setIsAuthenticated(true);
    }
    setLoading(false);
  }, []);

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, login, logout, user, role, Loading}}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};

export default AuthContextProvider;
