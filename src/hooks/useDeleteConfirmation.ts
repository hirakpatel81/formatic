import { useState } from "react";

interface DeleteConfig<T> {
  title: string;
  getConfirmationMessage: (item: T) => string | React.ReactNode;
  onDelete: (item: T) => Promise<void>;
}

export function useDeleteConfirmation<T>({
  title,
  getConfirmationMessage,
  onDelete,
}: DeleteConfig<T>) {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<T | null>(null);
  const [isDeleting, setIsDeleting] = useState(false); // Add loading state
  const handleDeleteClick = (item: T) => {
    setItemToDelete(item);
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    try {
      setIsDeleting(true); // Start loading
      if (!itemToDelete) return;
      await onDelete(itemToDelete);
      setIsDeleteModalOpen(false);
      setItemToDelete(null);
    } finally {
      setIsDeleting(false); // End loading
    }
  };

  const handleCancelDelete = () => {
    setIsDeleteModalOpen(false);
    setItemToDelete(null);
  };

  return {
    isDeleteModalOpen,
    itemToDelete,
    handleDeleteClick,
    handleConfirmDelete,
    handleCancelDelete,
    confirmationMessage: itemToDelete
      ? getConfirmationMessage(itemToDelete)
      : "",
    modalTitle: title,
    isDeleting,
  };
}
