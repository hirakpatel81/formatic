import React, { useEffect } from "react";
import "./Toast.css";

interface ToastProps {
  message: string;
  type?: "success" | "danger" | "warning" | "info";
  onClose: () => void;
  autoClose?: boolean;
  duration?: number;
}

export const Toast: React.FC<ToastProps> = ({
  message,
  type = "info",
  onClose,
  autoClose = true,
  duration = 3000,
}) => {
  useEffect(() => {
    if (autoClose) {
      const timer = setTimeout(() => {
        onClose();
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [autoClose, duration, onClose]);

  return (
    <div
      className={`toast-item alert alert-${type} alert-dismissible fade show`}
      role="alert"
    >
      <div className="d-flex align-items-center">
        {type === "success" && <i className="fas fa-check-circle me-2"></i>}
        {type === "danger" && (
          <i className="fas fa-exclamation-circle me-2"></i>
        )}
        {type === "warning" && (
          <i className="fas fa-exclamation-triangle me-2"></i>
        )}
        {type === "info" && <i className="fas fa-info-circle me-2"></i>}
        {message}
      </div>
      <button
        type="button"
        className="btn-close"
        onClick={onClose}
        aria-label="Close"
      ></button>
    </div>
  );
};
