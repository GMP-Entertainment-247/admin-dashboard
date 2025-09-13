import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import React from 'react';

export const ProtectedRoute = ({ children }: { children: React.JSX.Element }) => {
  const { token } = useAuth();
  console.log(token)

  if (!token) {
    return <Navigate to="/login" />;
  }

  return children;
};
