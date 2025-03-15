import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import { FormInput } from "../../common/Form/FormInput";

interface FormStepProps {
  onBack: () => void;
  onSubmit: (data: { formName: string }) => void;
  isSubmitting: boolean;
}

export const FormStep: React.FC<FormStepProps> = ({
  onBack,
  onSubmit,
  isSubmitting,
}) => {
  const methods = useForm({
    defaultValues: {
      formName: "",
    },
  });

  const { handleSubmit } = methods;

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormInput name="formName" label="Form Name" autoFocus />
        <div className="d-flex justify-content-between mt-4">
          <button
            type="button"
            className="btn btn-outline-secondary"
            onClick={onBack}
          >
            Back
          </button>
          <button
            type="submit"
            className="btn formatic-btn-primary"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <span className="spinner-border spinner-border-sm me-2" />
                Creating...
              </>
            ) : (
              "Create"
            )}
          </button>
        </div>
      </form>
    </FormProvider>
  );
};
