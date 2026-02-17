import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, allowedRoles = [] }) => {
  const user = localStorage.getItem("campusUser");

  if (!user) {
    return <Navigate to="/" replace />;
  }

  if (allowedRoles.length > 0) {
    const userData = JSON.parse(user);
    if (!allowedRoles.includes(userData.role)) {
      return <Navigate to="/unauthorized" replace />;
    }
  }

  return children;
};

export default ProtectedRoute;
