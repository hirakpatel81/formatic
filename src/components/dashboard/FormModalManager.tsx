import React from "react";
import Modal from "../common/Modal";
import CreateProjectModal from "../project/CreateProjectModal";
import { QuickProjectModal } from "../project/QuickProjectModal/QuickProjectModal";

import { CreateProjectInput } from "../../lib/validation/project";

interface FormModalManagerProps {
  showWelcome: boolean;
  onWelcomeClose: () => void;
  onWelcomeExploreOnOwm: () => void;
  isCreateProjectModalOpen: boolean;
  onCreateProjectModalClose: () => void;
  isQuickProjectModalOpen: boolean;
  onQuickProjectModalClose: () => void;
  onCreateProject: (data: CreateProjectInput) => Promise<void>;
}

const FormModalManager: React.FC<FormModalManagerProps> = ({
  showWelcome,
  onWelcomeClose,
  onWelcomeExploreOnOwm,
  isCreateProjectModalOpen,
  onCreateProjectModalClose,
  isQuickProjectModalOpen,
  onQuickProjectModalClose,
  onCreateProject,
}) => {
  return (
    <>
      <CreateProjectModal
        isOpen={isCreateProjectModalOpen}
        onClose={onCreateProjectModalClose}
        onCreateProject={onCreateProject}
      />

      <QuickProjectModal
        isOpen={isQuickProjectModalOpen}
        onClose={onQuickProjectModalClose}
      />
    </>
  );
};

export default FormModalManager;
