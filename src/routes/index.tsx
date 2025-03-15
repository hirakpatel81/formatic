import React, { useState, useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./AppRoutes";
import { useAuth } from "../hooks/useAuth";
import AppLoadingContainer from "../components/common/AppLoadingContainer";

const AppRouter: React.FC = () => {
  const { loading } = useAuth();
  const [initialLoad, setInitialLoad] = useState(true);

  useEffect(() => {
    // Once loading is complete, mark initial load as done
    if (!loading && initialLoad) {
      setInitialLoad(false);
    }
  }, [loading, initialLoad]);

  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
};

export default AppRouter;
