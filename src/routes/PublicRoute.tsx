import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import React from "react";

interface PublicRouteProps {
  children: React.ReactNode;
}

const PublicRoute: React.FC<PublicRouteProps> = ({ children }) => {
  const { appUser, loading } = useAuth();
  const location = useLocation();

  // Only show loading spinner on initial load
  if (loading) {
    return null;
  }

  if (appUser) {
    // Redirect to the page they came from or dashboard
    const from = location.state?.from?.pathname || "/dashboard";
    return <Navigate to={from} replace />;
  }

  return <>{children}</>;
};

export default PublicRoute;
