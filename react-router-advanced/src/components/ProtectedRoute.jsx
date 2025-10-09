// src/components/ProtectedRoute.jsx
import React from "react";
import { Navigate } from "react-router-dom";

// ✅ Step 1: Define useAuth hook
export const useAuth = () => {
  // Simulate authentication logic
  const user = localStorage.getItem("isAuthenticated") === "true";
  return { user };
};

// ✅ Step 2: Use it in the ProtectedRoute component
export default function ProtectedRoute({ children }) {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/" replace />;
  }

  return children;
}
