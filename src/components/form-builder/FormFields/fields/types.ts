import { FieldProperties } from "../../../../models/form/FieldProperties";
import { FieldType } from "../../../../models/form/FieldType";
import { FormField } from "../../../../models/form/FormField";

export interface BaseFieldProps {
  field: FormField;
  properties: FieldProperties;
  mode?: "builder" | "preview";
  layout?: "default" | "horizontal";
  onChange?: (value: any) => void;
  error?: string;
}

export const createDefaultFormButtons = (
  existingFieldsCount: number
): FormField => {
  const submitButton: FormField = {
    fieldId: `submitButton`,
    type: FieldType.BUTTON,
    label: "Submit",
    required: false,
    order: existingFieldsCount,
    properties: {
      buttonType: "submit",
      buttonStyle: "primary",
      buttonIcon: "fas fa-paper-plane",
      width: "half",
    },
    validations: [],
  };

  return submitButton;
};
