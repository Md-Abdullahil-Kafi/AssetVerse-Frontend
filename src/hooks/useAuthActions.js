// src/hooks/useAuthActions.js

import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export const useAuthActions = () => {
  const { login, googleLogin, register, logout } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleLogin = async (email, password) => {
    setLoading(true);
    setError(null);
    try {
      await login(email, password);
      navigate("/"); 
    } catch (err) {
      setError(err.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setLoading(true);
    setError(null);
    try {
      await googleLogin();
      navigate("/"); 
    } catch (err) {
      setError(err.message || "Google login failed");
    } finally {
      setLoading(false);
    }
  };

  const registerEmployee = async (formData) => {
    setLoading(true);
    setError(null);
    try {
      await register(formData.email, formData.password);
      navigate("/login");
    } catch (err) {
      setError(err.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  const registerHR = async (formData) => {
    setLoading(true);
    setError(null);
    try {
      await register(formData.email, formData.password);
      navigate("/login");
    } catch (err) {
      setError(err.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    setLoading(true);
    try {
      await logout();
      navigate("/");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return {
    handleLogin,
    handleGoogleLogin,
    registerEmployee,
    registerHR,
    handleLogout,
    loading,
    error,
  };
};