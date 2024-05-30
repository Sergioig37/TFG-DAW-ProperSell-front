// src/context/AuthContext.js
import React, { createContext, useState, useContext } from "react";
import { jwtDecode } from "jwt-decode";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authToken, setAuthToken] = useState(null);
  const [authUser, setAuthUser] = useState(null);
  const [authRol, setAuthRol] = useState(null);

  const setToken = (token) => {
    setAuthToken(token);
    decodeToken(token);
    localStorage.setItem("authToken", token);
  };

  const setRol = (rol) => {
    setAuthRol(rol);
    localStorage.setItem("rol", rol)
  }

  const setUser = (user) => {
    setAuthUser(user);
    localStorage.setItem("user", user)
  }

  const getToken = () => {
    return authToken || localStorage.getItem("authToken");
  };
  const getRol = () => {
    return authRol ||  localStorage.getItem("rol");
  };
  const clearToken = () => {
    setAuthToken(null);
    setAuthUser(null);
    setAuthRol(null);
    localStorage.removeItem("authToken");
    localStorage.removeItem("rol");
    localStorage.removeItem("user");
  };

  const decodeToken = (token) => {
    const decoded = jwtDecode(token);
    setUser(decoded.sub);
    setRol(decoded.role[0].authority);
  };

  const getUser = () => {
    return authUser ||  localStorage.getItem("user");
  };

  return (
    <AuthContext.Provider value={{ authToken, setToken, getToken, clearToken, getRol, getUser, setRol, setUser, decodeToken }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
