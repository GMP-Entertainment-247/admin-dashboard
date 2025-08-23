import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import React from 'react';

export const ProtectedRoute = ({ children }: { children: React.JSX.Element }) => {
  const { isAuthenticated } = useAuth();
  console.log(isAuthenticated)

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return children;
};
