import React, { createContext, useContext, useState, useCallback } from "react";
import { Toast } from "../components/common/Toast/Toast";

interface ToastContextType {
  showToast: (
    message: string,
    type?: "success" | "danger" | "warning" | "info",
    duration?: number
  ) => void;
}

export const ToastContext = createContext<ToastContextType | null>(null);

interface ToastItem {
  id: number;
  message: string;
  type: "success" | "danger" | "warning" | "info";
  duration?: number;
}

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const showToastMessage = useCallback(
    (
      message: string,
      type: "success" | "danger" | "warning" | "info" = "info",
      duration?: number
    ) => {
      const id = Date.now();
      setToasts((current) => [...current, { id, message, type }]);
    },
    []
  );

  const removeToast = useCallback((id: number) => {
    setToasts((current) => current.filter((toast) => toast.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ showToast: showToastMessage }}>
      {children}
      <div className="toast-container">
        {toasts.map((toast) => (
          <Toast
            key={toast.id}
            message={toast.message}
            type={toast.type}
            onClose={() => removeToast(toast.id)}
            duration={toast.duration}
          />
        ))}
      </div>
    </ToastContext.Provider>
  );
};
