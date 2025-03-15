import React from "react";
import { useFormContext, Controller } from "react-hook-form";

interface Option {
  label: string;
  value: string;
}

interface FormSelectProps {
  name: string;
  label: string;
  options: Option[];
  helperText?: string;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
  required?: boolean;
  inputSize?: "small" | "medium" | "large";
}

export const FormSelect: React.FC<FormSelectProps> = ({
  name,
  label,
  options,
  helperText,
  placeholder = "Select an option",
  disabled = false,
  className = "",
  required = false,
  inputSize = "medium",
}) => {
  const { control } = useFormContext();
  const sizeClass = {
    small: "form-control-sm",
    medium: "",
    large: "form-control-lg",
  }[inputSize];
  return (
    <Controller
      name={name}
      control={control}
      render={({
        field: { onChange, onBlur, value, ref },
        fieldState: { error },
      }) => (
        <div className="mb-3">
          <label htmlFor={name} className="form-label">
            {label}
            {required && <span className="text-danger ms-1">*</span>}
          </label>

          <select
            id={name}
            className={`form-select formatic-form-select ${sizeClass} ${
              error ? "is-invalid" : ""
            } ${className}`}
            value={value || ""}
            onChange={onChange}
            onBlur={onBlur}
            disabled={disabled}
            ref={ref}
            aria-invalid={error ? "true" : "false"}
            aria-describedby={
              error
                ? `${name}-error`
                : helperText
                  ? `${name}-helper`
                  : undefined
            }
          >
            {placeholder && <option value="">{placeholder}</option>}

            {options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>

          {helperText && (
            <small id={`${name}-helper`} className="form-text text-muted">
              {helperText}
            </small>
          )}

          {error && (
            <div id={`${name}-error`} className="invalid-feedback">
              {error.message}
            </div>
          )}
        </div>
      )}
    />
  );
};
