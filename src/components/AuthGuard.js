// src/components/AuthGuard.js
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const AuthGuard = ({ element: Component }) => {
  const { isAuthenticated, role } = useAuth();

  if (isAuthenticated) {
    // Redirect based on user role
    switch (role) {
      case 'Admin':
        return <Navigate to="/admin/home" />;
      case 'Employee':
        return <Navigate to="/employee/home" />;
      case 'Client':
        return <Navigate to="/client/home" />;
      case 'HR':
        return <Navigate to="/hr/home" />;
      default:
        return <Navigate to="/" />;
    }
  }

  return <Component />;
};

export default AuthGuard;
