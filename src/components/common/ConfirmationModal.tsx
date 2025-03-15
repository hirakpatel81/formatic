import React from "react";
import Modal from "./Modal";

interface ConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => Promise<void>;
  title: string;
  message: string | React.ReactNode;
  confirmButtonText?: string;
  isDestructive?: boolean;
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmButtonText = "Confirm",
  isDestructive = false,
}) => {
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const handleConfirm = async () => {
    try {
      setIsSubmitting(true);
      await onConfirm();
      onClose();
    } catch (error) {
      console.error("Error during confirmation:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={title}
      primaryButtonText={
        isSubmitting ? `${confirmButtonText}ing...` : confirmButtonText
      }
      onPrimaryAction={handleConfirm}
      isSubmitting={isSubmitting}
      primaryButtonClassName={
        isDestructive ? "btn-danger" : "formatic-btn-primary"
      }
    >
      <div className="mb-3">
        {typeof message === "string" ? (
          <>
            <p className="mb-2">{message}</p>
            {isDestructive && (
              <p className="text-danger mb-0">This action cannot be undone.</p>
            )}
          </>
        ) : (
          message
        )}
      </div>
    </Modal>
  );
};

export default ConfirmationModal;
