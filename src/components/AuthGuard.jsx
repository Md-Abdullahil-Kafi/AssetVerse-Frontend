// src/components/AuthGuard.jsx

import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export default function AuthGuard({ children }) {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-base-200">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  // Logged in থাকলে home-এ redirect
  if (user) {
    return <Navigate to="/" replace />;
  }

  return children;
}