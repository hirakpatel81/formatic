import React, { useState, useEffect } from "react";
import { RadioFieldProperties } from "../../../../../models/form/FieldProperties";
import { BaseFieldProps } from "../types";
import BootstrapWrapper from "../../wrappers/BoostrapWrapper";
import FieldFeedback from "../../components/FieldFeedback";

const RadioField: React.FC<BaseFieldProps> = ({
  field,
  properties,
  mode,
  layout,
  onChange,
  error,
}) => {
  const radioProperties = properties as RadioFieldProperties;
  const [selectedValue, setSelectedValue] = useState<string | undefined>(
    radioProperties.defaultValue
  );

  // Update local state when default value changes
  useEffect(() => {
    if (radioProperties.defaultValue) {
      setSelectedValue(radioProperties.defaultValue);
    }
  }, [radioProperties.defaultValue]);

  const handleRadioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setSelectedValue(newValue);
    onChange?.(newValue);
  };

  const radioInput = (
    <>
      <div className="radio-group">
        {radioProperties.options.map((option, index) => (
          <div
            key={index}
            className={`form-check ${
              radioProperties.displayInline ? "form-check-inline" : ""
            }`}
          >
            <input
              type="radio"
              id={`${field.fieldId}-${index}`}
              name={field.fieldId}
              value={option.value}
              className={`form-check-input ${error ? "is-invalid" : ""}`}
              checked={selectedValue === option.value}
              onChange={handleRadioChange}
              disabled={radioProperties.disabled}
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
        mode={mode}
        primaryHelperText={radioProperties.helperText}
      />
    </>
  );

  return (
    <BootstrapWrapper field={field} mode={mode!} layout={layout}>
      {radioInput}
    </BootstrapWrapper>
  );
};

export default RadioField;
