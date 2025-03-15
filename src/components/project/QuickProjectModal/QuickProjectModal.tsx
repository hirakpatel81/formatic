import React, { useState } from "react";
import Modal from "../../common/Modal";
import { ProjectStep } from "./ProjectStep";
import { FormStep } from "./FormStep";
import { useQuickProject, QuickProjectData } from "./useQuickProject";

interface QuickProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const QuickProjectModal: React.FC<QuickProjectModalProps> = ({
  isOpen,
  onClose,
}) => {
  const { step, setStep, createProjectAndForm } = useQuickProject(onClose);
  const [formData, setFormData] = useState<Partial<QuickProjectData>>({});

  const handleProjectStep = (
    data: Pick<QuickProjectData, "projectName" | "projectDescription">
  ) => {
    setFormData((prev) => ({ ...prev, ...data }));
    setStep(2);
  };

  const handleFormStep = (data: Pick<QuickProjectData, "formName">) => {
    const finalData = { ...formData, ...data } as QuickProjectData;
    createProjectAndForm.mutateAsync(finalData);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={step === 1 ? "Create a New Project" : "Name Your Form"}
      hideFooter
    >
      {step === 1 ? (
        <ProjectStep onNext={handleProjectStep} />
      ) : (
        <FormStep
          onBack={() => setStep(1)}
          onSubmit={handleFormStep}
          isSubmitting={createProjectAndForm.isPending}
        />
      )}
    </Modal>
  );
};
