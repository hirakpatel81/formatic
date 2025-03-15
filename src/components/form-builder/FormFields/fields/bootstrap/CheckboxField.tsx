import React, { useState, useEffect } from "react";
import { CheckboxFieldProperties } from "../../../../../models/form/FieldProperties";
import { BaseFieldProps } from "../types";
import BootstrapWrapper from "../../wrappers/BoostrapWrapper";
import FieldFeedback from "../../components/FieldFeedback";

const CheckboxField: React.FC<BaseFieldProps> = ({
  field,
  properties,
  mode,
  layout,
  onChange,
  error,
}) => {
  const checkboxProperties = properties as CheckboxFieldProperties;

  // Initialize state with default values
  const [selectedValues, setSelectedValues] = useState<string[]>(
    checkboxProperties.defaultValue || []
  );

  // Update local state when default value changes
  useEffect(() => {
    if (checkboxProperties.defaultValue) {
      setSelectedValues(checkboxProperties.defaultValue);
    }
  }, [checkboxProperties.defaultValue]);

  const handleCheckboxChange = (value: string) => {
    const newSelectedValues = selectedValues.includes(value)
      ? selectedValues.filter((v) => v !== value) // Remove if already selected
      : [...selectedValues, value]; // Add if not selected

    setSelectedValues(newSelectedValues);
    onChange?.(newSelectedValues);
  };

  const checkboxInput = (
    <>
      <div className="checkbox-group">
        {checkboxProperties.options.map((option, index) => (
          <div
            key={index}
            className={`form-check ${
              checkboxProperties.displayInline ? "form-check-inline" : ""
            }`}
          >
            <input
              type="checkbox"
              id={`${field.fieldId}-${index}`}
              name={field.fieldId}
              value={option.value}
              className={`form-check-input ${error ? "is-invalid" : ""}`}
              checked={selectedValues.includes(option.value)}
              onChange={() => handleCheckboxChange(option.value)}
              disabled={checkboxProperties.disabled}
            />
            <label
              className="form-check-label"
              htmlFor={`${field.fieldId}-${index}`}
            >
              {option.label}
            </label>
          </div>
        ))}
      </div>

      <FieldFeedback
        error={error}
        mode={mode || "builder"}
        primaryHelperText={checkboxProperties.helperText}
      />
    </>
  );

  return (
    <BootstrapWrapper field={field} mode={mode!} layout={layout}>
      {checkboxInput}
    </BootstrapWrapper>
  );
};

export default CheckboxField;
