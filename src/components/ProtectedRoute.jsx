import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return <div>Loading...</div>; // Show loading state
  }

  return isAuthenticated ? children : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
