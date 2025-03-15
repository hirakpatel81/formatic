import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useApiMutation } from "../../../hooks/useQueryUtils";
import { projectService } from "../../../services/ProjectService";

import { useToast } from "../../../hooks/useToast";
import { formsService } from "../../../services/FormService";
import { ROUTES } from "../../../constants/Routes";

export interface QuickProjectData {
  projectName: string;
  projectDescription?: string;
  formName: string;
}

export const useQuickProject = (onClose: () => void) => {
  const [step, setStep] = useState(1);
  const navigate = useNavigate();
  const { showToast } = useToast();

  const createProjectAndForm = useApiMutation(
    async (data: QuickProjectData) => {
      // First create project
      const projectResponse = await projectService.createProject({
        name: data.projectName,
        description: data.projectDescription,
      });

      // Then create form
      const formResponse = await formsService.createMinimalForm(
        projectResponse.data!.id,
        data.formName
      );

      return {
        isSuccess: true,
        message: "Project and form created successfully",
        errors: null,
        data: {
          project: projectResponse.data,
          form: formResponse.data,
        },
        statusCode: 200,
      };
    },
    {
      onSuccess: (result) => {
        showToast("Project and form created successfully", "success");
        onClose();

        navigate(
          ROUTES.PROJECTS.FORMS.EDIT(result.project!.id, result.form!.id)
        );
      },
      onError: (error) => {
        showToast("Failed to create project and form", "danger");
      },
    }
  );

  return {
    step,
    setStep,
    createProjectAndForm,
  };
};
