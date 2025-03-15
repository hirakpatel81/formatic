import React, { useMemo } from "react";
import { FormField } from "../../../models/form/FormField";
import { Framework } from "../../../models/form/Framework";
import { FieldErrorBoundary } from "./components/FieldErrorBoundary";
import { FieldType } from "../../../models/form/FieldType";
import {
  ButtonField,
  CheckboxField,
  EmailField,
  NumberField,
  PasswordField,
  RadioField,
  SelectField,
  TextAreaField,
  TextField,
} from "./fields/bootstrap";

interface FormFieldRendererProps {
  field: FormField;
  onEdit?: () => void;
  onDelete?: () => void;
  isDragging?: boolean;
  mode: "builder" | "preview";
  layout?: "default" | "horizontal";
  onChange?: (value: any) => void;
  error?: string;
  framework?: Framework;
}

const FormFieldRenderer: React.FC<FormFieldRendererProps> = ({
  field,
  onEdit,
  onDelete,
  isDragging,
  mode,
  layout = "default",
  onChange,
  error,
}) => {
  const commonProps = {
    field,
    properties: field.properties,
    mode,
    layout,
    onChange,
    error,
  };
  const fieldComponent = () => {
    switch (field.type) {
      case FieldType.TEXT:
        return <TextField {...commonProps} />;
      case FieldType.TEXTAREA:
        return <TextAreaField {...commonProps} />;
      case FieldType.NUMBER:
        return <NumberField {...commonProps} />;
      case FieldType.EMAIL:
        return <EmailField {...commonProps} />;
      case FieldType.PASSWORD:
        return <PasswordField {...commonProps} />;
      case FieldType.CHECKBOX:
        return <CheckboxField {...commonProps} />;
      case FieldType.RADIO:
        return <RadioField {...commonProps} />;
      case FieldType.SELECT:
        return <SelectField {...commonProps} />;
      case FieldType.BUTTON:
        return <ButtonField {...commonProps} />;
      default:
        return null;
    }
  };
  const renderField = () => (
    <FieldErrorBoundary fieldName={field.label || field.type}>
      {fieldComponent()}
    </FieldErrorBoundary>
  );

  if (mode === "builder") {
    return (
      <div
        className={`${
          isDragging ? "opacity-50" : ""
        } d-flex align-items-center`}
        data-testid={`field-wrapper-${field.fieldId}`}
      >
        <div className="drag-handle">
          <i className="fas fa-grip-vertical text-secondary" />
        </div>

        <div className="flex-grow-1">{renderField()}</div>

        <div className="field-actions gap-2 pt-2">
          <button
            onClick={onEdit}
            className="btn btn-sm btn-outline-secondary"
            title="Edit field"
            style={{ width: "32px", height: "32px" }}
          >
            <i className="fas fa-gear" />
          </button>
          <button
            onClick={onDelete}
            className="btn btn-sm btn-outline-danger"
            title="Delete field"
            style={{ width: "32px", height: "32px" }}
          >
            <i className="fas fa-trash" />
          </button>
        </div>
      </div>
    );
  }

  return renderField();
};

FormFieldRenderer.displayName = "FormFieldRenderer";

export default React.memo(FormFieldRenderer);
