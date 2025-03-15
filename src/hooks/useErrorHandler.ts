import React from "react";

import { useAuth } from "./useAuth";
import { useNavigate } from "react-router-dom";
import { ApiError } from "../types/ApiError";
import { useToast } from "./useToast";
import { ROUTES } from "../constants/Routes";

export const useErrorHandler = () => {
  const [error, setError] = React.useState<Error | null>(null);
  const { showToast } = useToast();
  const { logout } = useAuth();

  const handleGlobalError = React.useCallback(
    (error: Error) => {
      setError(error);
      if (error instanceof ApiError) {
        if (error.statusCode === 401) {
          showToast(
            "Your session has expired. Please sign in again.",
            "warning"
          );
          logout();
          return;
        }

        if (error.severity === "toast" || error.severity === "both") {
          showToast(error.message, "danger");
        }
      } else {
        showToast("An unexpected error occurred. Please try again.", "danger");
      }
    },
    [showToast, logout]
  );

  const resetError = React.useCallback(() => {
    setError(null);
  }, []);

  return { error, handleGlobalError, resetError };
};
