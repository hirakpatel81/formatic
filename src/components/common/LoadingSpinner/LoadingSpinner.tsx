import React from "react";
import "./LoadingSpinner.css";

interface LoadingSpinnerProps {
  size?: "small" | "medium" | "large";
  overlay?: boolean;
  text?: string;
  contained?: boolean;
  minHeight?: string;
  className?: string;
}

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  size = "medium",
  overlay = false,
  text,
  contained = false,
  minHeight = "200px",
  className = "",
}) => {
  const sizeClasses = {
    small: {
      spinner: "w-4 h-4",
      text: "text-sm",
    },
    medium: {
      spinner: "w-8 h-8",
      text: "text-base",
    },
    large: {
      spinner: "w-12 h-12",
      text: "text-lg",
    },
  };

  const spinnerContent = (
    <div className={`spinner-content ${contained ? "contained" : ""}`}>
      <div
        className={`loading-spinner ${sizeClasses[size].spinner}`}
        style={{
          borderColor: "var(--color-500)",
          borderRightColor: "transparent",
        }}
      >
        <span className="visually-hidden">Loading...</span>
      </div>

      {text && (
        <span className={`text-secondary ${sizeClasses[size].text}`}>
          {text}
        </span>
      )}
    </div>
  );

  if (overlay) {
    return (
      <div className={`loading-container ${className}`} style={{ minHeight }}>
        <div className="loading-overlay">{spinnerContent}</div>
      </div>
    );
  }

  return spinnerContent;
};
