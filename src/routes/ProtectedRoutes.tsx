import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import AppLoadingContainer from "../components/common/AppLoadingContainer";

interface ProtectedRoutesProps {
  children: React.ReactNode;
}

const ProtectedRoutes: React.FC<ProtectedRoutesProps> = ({ children }) => {
  const { appUser, loading } = useAuth();
  const location = useLocation();

  // Only show loading spinner on initial load
  if (loading) {
    return null;
  }

  if (!appUser) {
    return <Navigate to="/auth/signin" state={{ from: location }} replace />;
  }

  return (
    <>
      <AppLoadingContainer isLoading={loading} minLoadingTime={2000}>
        {children}
      </AppLoadingContainer>
    </>
  );
};

export default ProtectedRoutes;
