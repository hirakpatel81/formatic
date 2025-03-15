import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import { FormInput } from "../../common/Form/FormInput";

interface ProjectStepProps {
  onNext: (data: { projectName: string; projectDescription?: string }) => void;
  defaultValues?: {
    projectName: string;
    projectDescription?: string;
  };
}

export const ProjectStep: React.FC<ProjectStepProps> = ({
  onNext,
  defaultValues,
}) => {
  const methods = useForm({
    defaultValues: {
      projectName: defaultValues?.projectName || "My First Project",
      projectDescription: defaultValues?.projectDescription || "",
    },
  });

  const { handleSubmit } = methods;

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onNext)}>
        <div className="mb-4">
          <p className="text-secondary">
            Give your first project a name - you can always change it later.
          </p>
        </div>
        <FormInput name="projectName" label="Project Name" autoFocus />
        <FormInput
          name="projectDescription"
          label="Description (Optional)"
          type="textarea"
          placeholder="What kind of forms will you create in this project?"
        />
        <p className="text-secondary small mt-4">
          Projects help you organize related forms together. You can create more
          projects later.
        </p>
        <div className="d-flex justify-content-end mt-4">
          <button type="submit" className="btn formatic-btn-primary">
            Next
          </button>
        </div>
      </form>
    </FormProvider>
  );
};
