import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

// Helper function to get a specific cookie by name
export const getCookie = (name) => {
  const nameEQ = name + "=";
  const cookiesArray = document.cookie.split(';');
  for (let i = 0; i < cookiesArray.length; i++) {
    let cookie = cookiesArray[i].trim();
    if (cookie.indexOf(nameEQ) === 0) {
      return cookie.substring(nameEQ.length, cookie.length);
    }
  }
  return null;
};

export const ProtectedRoute = () => {
  const token = getCookie('Auth'); // Check if the Auth cookie exists
  return token ? <Outlet /> : <Navigate to="/signup" />;
};

