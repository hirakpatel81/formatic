import React, { useState, useEffect } from "react";
import AppLoader from "./AppLoader";

interface AppLoadingContainerProps {
  children: React.ReactNode;
  isLoading: boolean;
  minLoadingTime?: number; // Minimum time to show loading in ms
}

const AppLoadingContainer: React.FC<AppLoadingContainerProps> = ({
  children,
  isLoading,
  minLoadingTime = 800,
}) => {
  const [shouldRender, setShouldRender] = useState(false);
  const [loadingStart, setLoadingStart] = useState<number | null>(null);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    let timerId: number | null = null;

    if (isLoading) {
      if (loadingStart === null) {
        setLoadingStart(Date.now());
        setFadeOut(false);
      }
    } else if (loadingStart !== null) {
      // Calculate how long we've been loading
      const elapsedTime = Date.now() - loadingStart;

      // If we've loaded for at least the minimum time, render content immediately
      if (elapsedTime >= minLoadingTime) {
        // Start fade out animation
        setFadeOut(true);

        // Wait for fade animation to complete before removing loader
        timerId = window.setTimeout(() => {
          setShouldRender(true);
          setLoadingStart(null);
        }, 300); // Fade out duration
      } else {
        // Otherwise, wait until the minimum time has passed
        const remainingTime = minLoadingTime - elapsedTime;

        timerId = window.setTimeout(() => {
          // Start fade out animation
          setFadeOut(true);

          // Wait for fade animation to complete before removing loader
          window.setTimeout(() => {
            setShouldRender(true);
            setLoadingStart(null);
          }, 300); // Fade out duration
        }, remainingTime);
      }
    } else {
      // If no loading has occurred yet, we can render content
      setShouldRender(true);
    }

    return () => {
      if (timerId !== null) {
        clearTimeout(timerId);
      }
    };
  }, [isLoading, loadingStart, minLoadingTime]);

  if (!shouldRender) {
    return (
      <div className={`app-loader-wrapper ${fadeOut ? "fade-out" : ""}`}>
        <AppLoader />
      </div>
    );
  }

  return <>{children}</>;
};

export default AppLoadingContainer;
