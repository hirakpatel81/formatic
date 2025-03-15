import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Modal from "../common/Modal";
import { FormInput } from "../common/Form/FormInput";
import {
  CreateProjectInput,
  createProjectSchema,
} from "../../lib/validation/project";

interface CreateProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreateProject: (data: CreateProjectInput) => Promise<void>;
}

const CreateProjectModal: React.FC<CreateProjectModalProps> = ({
  isOpen,
  onClose,
  onCreateProject,
}) => {
  const methods = useForm<CreateProjectInput>({
    resolver: zodResolver(createProjectSchema),
    defaultValues: {
      name: "",
      description: "",
    },
  });

  const {
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = async (data: CreateProjectInput) => {
    await onCreateProject(data);
    reset();
    onClose();
  };

  // Reset form when modal is closed
  React.useEffect(() => {
    if (!isOpen) {
      reset();
    }
  }, [isOpen, reset]);

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="New project"
      primaryButtonText={
        isSubmitting ? "Creating project..." : "Create project"
      }
      onPrimaryAction={handleSubmit(onSubmit)}
      isSubmitting={isSubmitting}
    >
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormInput
            name="name"
            label="Name"
            placeholder="e.g. Marketing..."
            autoFocus
          />

          <FormInput
            name="description"
            label="Description"
            placeholder="Add a description..."
            type="textarea"
          />
        </form>
      </FormProvider>
    </Modal>
  );
};

export default CreateProjectModal;
