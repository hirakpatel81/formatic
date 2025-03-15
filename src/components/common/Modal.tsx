import { useEffect } from "react";
import GlobalErrorBoundary from "./ErrorBoundry/GlobalErrorBoundary";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  primaryButtonText?: string;
  onPrimaryAction?: () => void | Promise<void>;
  isSubmitting?: boolean;
  primaryButtonClassName?: string;
  isDialogCentered?: boolean;
  fullscreen?: boolean;
  hideHeader?: boolean;
  hideFooter?: boolean;
  modalSize?: "small" | "medium" | "large";
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
  primaryButtonText,
  onPrimaryAction,
  isSubmitting = false,
  primaryButtonClassName = "formatic-btn-primary",
  isDialogCentered = true,
  fullscreen = false,
  hideHeader = false,
  hideFooter = false,
  modalSize = "medium",
}) => {
  const sizeClass = {
    small: "modal-sm",
    medium: "",
    large: "modal-lg",
  }[modalSize];
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.classList.add("modal-open");
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.classList.remove("modal-open");
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <>
      <div className="modal-backdrop fade show"></div>
      <div
        className={`modal fade ${isOpen ? "show" : ""}`}
        tabIndex={-1}
        role="dialog"
        style={{ display: isOpen ? "block" : "none" }}
      >
        <div
          className={`modal-dialog slide-down-animation ${
            fullscreen ? "modal-fullscreen" : "modal-dialog-centered"
          } ${sizeClass}`}
          role="document"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="modal-content">
            <GlobalErrorBoundary>
              {/* Conditionally render header */}
              {!hideHeader && (
                <div className="modal-header">
                  <h5 className="modal-title">{title}</h5>
                  <button
                    type="button"
                    className="btn-close"
                    onClick={onClose}
                    aria-label="Close"
                  />
                </div>
              )}

              <div className="modal-body">{children}</div>

              {/* Conditionally render footer */}
              {!hideFooter && primaryButtonText && (
                <div className="modal-footer border-0 pt-0">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={onClose}
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    className={`btn ${primaryButtonClassName}`}
                    onClick={onPrimaryAction}
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <i className="fas fa-spinner fa-spin me-2"></i>
                        {primaryButtonText}
                      </>
                    ) : (
                      primaryButtonText
                    )}
                  </button>
                </div>
              )}
            </GlobalErrorBoundary>
          </div>
        </div>
      </div>
    </>
  );
};

export default Modal;
