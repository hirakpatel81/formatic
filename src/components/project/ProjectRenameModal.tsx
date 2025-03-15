import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Modal from "../common/Modal";
import { FormInput } from "../common/Form/FormInput";
import { Project } from "../../models/Project";
import {
  CreateProjectInput,
  createProjectSchema,
} from "../../lib/validation/project";

interface ProjectRenameModalProps {
  isOpen: boolean;
  onClose: () => void;
  project: Project | null;
  onSuccess: (data: CreateProjectInput) => Promise<void>;
  isSubmitting?: boolean; // Optional prop for submission state
}

const ProjectRenameModal: React.FC<ProjectRenameModalProps> = ({
  isOpen,
  onClose,
  project,
  onSuccess,
  isSubmitting = false, // Default to false
}) => {
  const methods = useForm<CreateProjectInput>({
    resolver: zodResolver(createProjectSchema),
    defaultValues: {
      name: project?.name || "",
      description: project?.description || "",
    },
  });

  const {
    handleSubmit,
    reset,
    formState: { isSubmitting: formIsSubmitting },
  } = methods;

  // Reset form when project changes
  React.useEffect(() => {
    if (project) {
      reset({
        name: project.name,
        description: project.description,
      });
    }
  }, [project, reset]);

  const onSubmit = async (data: CreateProjectInput) => {
    try {
      await onSuccess(data);
      onClose(); // Close modal on success
    } catch (error) {
      console.error("Failed to rename project:", error);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Rename project"
      primaryButtonText="Save"
      onPrimaryAction={handleSubmit(onSubmit)}
      isSubmitting={isSubmitting || formIsSubmitting}
    >
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormInput
            name="name"
            label="Name"
            placeholder="Enter project name"
            autoFocus
          />

          <FormInput
            name="description"
            label="Description"
            placeholder="Add a description..."
            type="textarea"
            rows={3}
          />
        </form>
      </FormProvider>
    </Modal>
  );
};

export default ProjectRenameModal;
