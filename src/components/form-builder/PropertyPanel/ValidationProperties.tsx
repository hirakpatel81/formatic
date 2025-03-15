import React from "react";
import { FormField } from "../../../models/form/FormField";
import { FIELD_VALIDATIONS } from "../../../models/form/ValidationConfig";
import {
  createValidationRule,
  ValidationRule,
  ValidationRuleType,
  ValidationTypes,
} from "../../../models/form/ValidationRule";
import Accordion from "../../common/Accordion";
import Switch from "../../common/Switch/Switch";

interface ValidationPropertiesProps {
  field: FormField;
  onUpdate: (field: FormField) => void;
}

const ValidationProperties: React.FC<ValidationPropertiesProps> = ({
  field,
  onUpdate,
}) => {
  // Get available validations for this field type
  const availableValidations = FIELD_VALIDATIONS[field.type];

  const addValidation = (type: ValidationRuleType) => {
    // Only add if this validation isn't already present
    if (!field.validations.some((v) => v.type === type)) {
      const newValidation = createValidationRule(type);
      const newValidations = [...field.validations, newValidation];

      // If adding required validation, also update the required property
      const updatedField = {
        ...field,
        validations: newValidations,
        required: type === ValidationTypes.REQUIRED ? true : field.required,
      };

      onUpdate(updatedField);
    }
  };

  const removeValidation = (index: number) => {
    const newValidations = [...field.validations];
    const removedValidation = newValidations[index];
    newValidations.splice(index, 1);

    // If removing required validation, also update the required property
    const updatedField = {
      ...field,
      validations: newValidations,
      required:
        removedValidation.type === ValidationTypes.REQUIRED
          ? false
          : field.required,
    };

    onUpdate(updatedField);
  };

  const updateValidation = (
    index: number,
    updates: Partial<ValidationRule>
  ) => {
    const newValidations = [...field.validations];
    newValidations[index] = { ...newValidations[index], ...updates };
    onUpdate({
      ...field,
      validations: newValidations,
    });
  };

  const renderValidationConfig = (
    validation: ValidationRule,
    index: number
  ) => {
    switch (validation.type) {
      case ValidationTypes.MIN_LENGTH:
      case ValidationTypes.MAX_LENGTH:
      case ValidationTypes.MIN:
      case ValidationTypes.MAX:
        const isLength = validation.type.includes("Length");
        return (
          <div className="mb-2">
            <label className="form-label">
              {validation.type.includes("min") ? "Minimum" : "Maximum"}{" "}
              {isLength ? "Length" : "Value"}
            </label>
            <input
              type="number"
              className="form-control formatic-form-control"
              value={validation.params?.min || validation.params?.max || ""}
              onChange={(e) =>
                updateValidation(index, {
                  params: {
                    ...validation.params,
                    [validation.type.includes("min") ? "min" : "max"]:
                      e.target.value === ""
                        ? undefined
                        : Number(e.target.value),
                  },
                })
              }
              placeholder={`Enter ${
                validation.type.includes("min") ? "minimum" : "maximum"
              } ${isLength ? "length" : "value"}`}
            />
          </div>
        );
      case ValidationTypes.EMAIL_DOMAIN:
        return (
          <div className="mb-2">
            <label className="form-label">Allowed Domains</label>
            <textarea
              className="form-control formatic-form-control"
              value={validation.params?.allowedDomains?.join("\n") || ""}
              onChange={(e) => {
                let newDomain = e.target.value;
                const parsedOptions = newDomain
                  .split("\n")
                  .map((option) => option.trim());
                updateValidation(index, {
                  params: {
                    ...validation.params,
                    allowedDomains: parsedOptions,
                  },
                });
              }}
              placeholder="Enter one domain per line&#10;example.com&#10;company.org"
              rows={3}
            />
          </div>
        );

      case ValidationTypes.EMAIL_DISPOSABLE:
        return (
          <div className="mb-2">
            <Switch
              label="Prevent Disposable Emails"
              checked={validation.params?.preventDisposable || false}
              onChange={(checked) =>
                updateValidation(index, {
                  params: {
                    ...validation.params,
                    preventDisposable: checked,
                  },
                })
              }
            />
          </div>
        );

      case ValidationTypes.PATTERN:
        return (
          <div className="mb-2">
            <label className="form-label">Regular Expression Pattern</label>
            <input
              type="text"
              className="form-control formatic-form-control"
              value={validation.params?.pattern || ""}
              onChange={(e) =>
                updateValidation(index, {
                  params: {
                    ...validation.params,
                    pattern: e.target.value,
                  },
                })
              }
            />
            <small className="form-text text-muted">
              Enter a regular expression to validate the input.
              <br />
              Examples:
              <ul className="mt-1 mb-0">
                <li>^[a-zA-Z0-9]+$ - Letters and numbers only</li>
                <li>^[0-9]{5}$ - Exactly 5 digits</li>
                <li>^[a-zA-Z\s]+$ - Letters and spaces only</li>
              </ul>
            </small>
          </div>
        );
    }

    return null;
  };

  return (
    <Accordion title="Validation & Constraints">
      <div className="mb-3">
        {/* Existing validations */}
        {field.validations.map((validation, index) => (
          <div key={index} className="mb-3 p-3 border rounded">
            <div className="d-flex justify-content-between align-items-center mb-2">
              <span className="validation-badge">
                {validation.type
                  .replace(/([A-Z])/g, " $1")
                  .replace(/^\w/, (c) => c.toUpperCase())}
              </span>
              <button
                className="btn btn-sm btn-outline-danger"
                onClick={() => removeValidation(index)}
              >
                <i className="fas fa-times"></i>
              </button>
            </div>

            {/* Validation-specific configuration */}
            {renderValidationConfig(validation, index)}

            {/* Error message */}
            <div className="mb-2">
              <label className="form-label">Error Message</label>
              <input
                type="text"
                className="form-control formatic-form-control"
                value={validation.message}
                onChange={(e) =>
                  updateValidation(index, { message: e.target.value })
                }
              />
            </div>
          </div>
        ))}

        <div className="dropdown">
          <button
            className="btn btn-outline-secondary dropdown-toggle"
            type="button"
            data-bs-toggle="dropdown"
          >
            Add Validation
          </button>
          <ul className="dropdown-menu">
            {availableValidations.map((type) => (
              <li key={type}>
                <button
                  className="dropdown-item"
                  onClick={() => addValidation(type)}
                  disabled={field.validations.some((v) => v.type === type)}
                >
                  {type.replace(/([A-Z])/g, " $1").toLowerCase()}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Accordion>
  );
};

export default ValidationProperties;
