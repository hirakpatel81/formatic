import React from "react";
import { FormField } from "../../../../models/form/FormField";
import { PasswordFieldProperties as IPasswordFieldProperties } from "../../../../models/form/FieldProperties";
import Accordion from "../../../common/Accordion";
import Switch from "../../../common/Switch/Switch";
import {
  ValidationTypes,
  createValidationRule,
} from "../../../../models/form/ValidationRule";

interface PasswordFieldPropertiesProps {
  field: FormField;
  onUpdate: (field: FormField) => void;
}

const PasswordFieldProperties: React.FC<PasswordFieldPropertiesProps> = ({
  field,
  onUpdate,
}) => {
  const handleConfirmPasswordChange = (checked: boolean) => {
    let updatedValidations = [...field.validations];

    if (checked) {
      // Add match validation if it doesn't exist
      if (!updatedValidations.some((v) => v.type === ValidationTypes.MATCH)) {
        updatedValidations.push(
          createValidationRule(ValidationTypes.MATCH, "Passwords don't match")
        );
      }
    } else {
      // Remove match validation
      updatedValidations = updatedValidations.filter(
        (v) => v.type !== ValidationTypes.MATCH
      );
    }

    onUpdate({
      ...field,
      properties: {
        ...field.properties,
        confirmPassword: checked,
      },
      validations: updatedValidations,
    });
  };

  const properties = field.properties as IPasswordFieldProperties;

  return (
    <Accordion title="Password Options" defaultExpanded={true}>
      <div className="mb-3">
        <Switch
          label="Confirm Password"
          checked={properties.confirmPassword || false}
          onChange={handleConfirmPasswordChange}
        />
        <small className="form-text text-muted d-block mt-1">
          Adds a confirmation field to prevent typos
        </small>
      </div>

      <div className="mb-3">
        <Switch
          label="Toggle Password Visibility"
          checked={properties.togglePasswordVisibility || false}
          onChange={(checked) =>
            onUpdate({
              ...field,
              properties: {
                ...field.properties,
                togglePasswordVisibility: checked,
              },
            })
          }
        />
        <small className="form-text text-muted d-block mt-1">
          Allows users to show/hide password text
        </small>
      </div>
    </Accordion>
  );
};

export default PasswordFieldProperties;
