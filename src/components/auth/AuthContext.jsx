// src/context/AuthContext.js
import React, { createContext, useState, useContext } from 'react';


const AuthContext  = createContext();

export const AuthProvider = ({ children }) => {
  const [authToken, setAuthToken] = useState(null);
  
  const setToken = (token) => {
    setAuthToken(token);
    localStorage.setItem('authToken', token);
  };

  const getToken = () => {
    return authToken || localStorage.getItem('authToken');
  };

  const clearToken = () => {
    setAuthToken(null);
    localStorage.removeItem('authToken');
  }

  return (
    <AuthContext.Provider value={{ authToken, setToken, getToken, clearToken }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
} 


