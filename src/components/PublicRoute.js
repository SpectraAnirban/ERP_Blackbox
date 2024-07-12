// src/components/PublicRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const PublicRoute = ({ element: Component }) => {
  const isLoggedIn = useSelector((state) => !!state.auth.accessToken);

  return isLoggedIn ? <Navigate to="/" /> : <Component />;
};

export default PublicRoute;