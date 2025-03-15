import React, { createContext, useContext, useState, useCallback } from "react";
import { LoadingSpinner } from "../components/common/LoadingSpinner/LoadingSpinner";

interface LoadingContextType {
  // Show full-page loading overlay
  showGlobalLoading: (message?: string) => void;
  // Hide full-page loading overlay
  hideGlobalLoading: () => void;
  // Track loading state for specific components
  setComponentLoading: (
    componentId: string,
    isLoading: boolean,
    message?: string
  ) => void;
  // Check if a specific component is loading
  isComponentLoading: (componentId: string) => boolean;
  // Get loading message for a component
  getComponentMessage: (componentId: string) => string | undefined;
}

export const LoadingContext = createContext<LoadingContextType | null>(null);

interface LoadingProviderProps {
  children: React.ReactNode;
}

export const LoadingProvider: React.FC<LoadingProviderProps> = ({
  children,
}) => {
  const [globalLoading, setGlobalLoading] = useState(false);
  const [globalMessage, setGlobalMessage] = useState<string>();
  const [componentLoadingStates, setComponentLoadingStates] = useState<
    Record<string, { loading: boolean; message?: string }>
  >({});

  const showGlobalLoading = useCallback((message?: string) => {
    setGlobalMessage(message);
    setGlobalLoading(true);
  }, []);

  const hideGlobalLoading = useCallback(() => {
    setGlobalLoading(false);
    setGlobalMessage(undefined);
  }, []);

  const setComponentLoading = useCallback(
    (componentId: string, isLoading: boolean, message?: string) => {
      setComponentLoadingStates((prev) => ({
        ...prev,
        [componentId]: { loading: isLoading, message },
      }));
    },
    []
  );

  const isComponentLoading = useCallback(
    (componentId: string) => {
      return !!componentLoadingStates[componentId]?.loading;
    },
    [componentLoadingStates]
  );

  const getComponentMessage = useCallback(
    (componentId: string) => {
      return componentLoadingStates[componentId]?.message;
    },
    [componentLoadingStates]
  );

  return (
    <LoadingContext.Provider
      value={{
        showGlobalLoading,
        hideGlobalLoading,
        setComponentLoading,
        isComponentLoading,
        getComponentMessage,
      }}
    >
      {children}
      {globalLoading && (
        <div className="loading-overlay" style={{ position: "fixed" }}>
          <LoadingSpinner contained size="large" text={globalMessage} />
        </div>
      )}
    </LoadingContext.Provider>
  );
};
