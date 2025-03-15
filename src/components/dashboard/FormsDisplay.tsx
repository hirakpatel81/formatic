import React from "react";
import { Form } from "../../models/form/Form";
import FormCard from "./FormCard";
import FormList from "./FormList";
import { useDeleteConfirmation } from "../../hooks/useDeleteConfirmation";
import { useToast } from "../../hooks/useToast";
import { useQueryClient } from "@tanstack/react-query";
import { useApiMutation } from "../../hooks/useQueryUtils";
import { formsService } from "../../services/FormService";
import ConfirmationModal from "../common/ConfirmationModal";
import FormRenameModal from "../forms/common/FormRenameModal";

interface FormsDisplayProps {
  forms: Form[];
  viewMode: "grid" | "list";
  openDropdownId: string | null;
  onEdit: (formId: string) => void;
  onDropdownToggle: (formId: string) => void;
  projectId: string;
}

const FormsDisplay: React.FC<FormsDisplayProps> = ({
  forms,
  viewMode,
  openDropdownId,
  onEdit,
  onDropdownToggle,
  projectId,
}) => {
  const queryClient = useQueryClient();
  const { showToast } = useToast();
  const [selectedForm, setSelectedForm] = React.useState<Form | null>(null);
  const [isRenameModalOpen, setIsRenameModalOpen] = React.useState(false);

  // Delete form mutation
  const deleteFormMutation = useApiMutation<void, string>(
    (formId) => formsService.archiveForm(projectId, formId),
    {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["forms", projectId] });
        showToast("Form deleted successfully", "success");
      },
      onError: () => {
        showToast("Failed to delete form", "danger");
      },
    }
  );

  // Delete confirmation hook
  const {
    isDeleteModalOpen,
    itemToDelete,
    handleDeleteClick,
    handleConfirmDelete,
    handleCancelDelete,
    confirmationMessage,
    modalTitle,
  } = useDeleteConfirmation<Form>({
    title: "Delete Form",
    getConfirmationMessage: (form) =>
      `Are you sure you want to delete "${form.title}"?`,
    onDelete: async (form) => {
      await deleteFormMutation.mutateAsync(form.id);
    },
  });

  const handleRenameClick = (form: Form) => {
    setSelectedForm(form);
    setIsRenameModalOpen(true);
    onDropdownToggle(form.id); // Close dropdown
  };

  const handleRenameSuccess = () => {
    queryClient.invalidateQueries({ queryKey: ["forms", projectId] });
    showToast("Form renamed successfully", "success");
    setIsRenameModalOpen(false);
    setSelectedForm(null);
  };

  return (
    <>
      <div className="mt-4">
        <div className="row">
          {forms.map((form) =>
            viewMode === "grid" ? (
              <FormCard
                key={form.id}
                form={form}
                onEdit={() => onEdit(form.id)}
                onDelete={handleDeleteClick}
                onRename={() => handleRenameClick(form)}
                isDropdownOpen={openDropdownId === form.id}
                onDropdownToggle={onDropdownToggle}
              />
            ) : (
              <FormList
                key={form.id}
                form={form}
                onEdit={() => onEdit(form.id)}
                onDelete={handleDeleteClick}
                onRename={() => handleRenameClick(form)}
                isDropdownOpen={openDropdownId === form.id}
                onDropdownToggle={onDropdownToggle}
              />
            )
          )}
        </div>
      </div>

      {/* Modals */}
      <ConfirmationModal
        isOpen={isDeleteModalOpen}
        onClose={handleCancelDelete}
        onConfirm={handleConfirmDelete}
        title={modalTitle}
        message={confirmationMessage}
        confirmButtonText="Delete"
        isDestructive={true}
      />

      <FormRenameModal
        isOpen={isRenameModalOpen}
        onClose={() => {
          setIsRenameModalOpen(false);
          setSelectedForm(null);
        }}
        form={selectedForm}
        onSuccess={handleRenameSuccess}
      />
    </>
  );
};

export default FormsDisplay;
