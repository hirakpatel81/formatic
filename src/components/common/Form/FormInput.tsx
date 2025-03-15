import React, { useState } from "react";
import { useFormContext, Controller } from "react-hook-form";

interface FormInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  name: string;
  type?: string;
  defaultValue?: string;
  showPasswordToggle?: boolean;
  helperText?: string;
  rows?: number;
  inputSize?: "small" | "medium" | "large";
}

export const FormInput: React.FC<FormInputProps> = ({
  label,
  name,
  type = "text",
  defaultValue,
  showPasswordToggle = false,
  helperText,
  rows = 3,
  inputSize = "medium",
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const { control } = useFormContext();
  const sizeClass = {
    small: "form-control-sm",
    medium: "",
    large: "form-control-lg",
  }[inputSize];
  const inputType = type === "password" && showPassword ? "text" : type;

  return (
    <div className="mb-3">
      <label htmlFor={name} className="form-label">
        {label}
      </label>
      <div className="position-relative">
        <Controller
          name={name}
          control={control}
          defaultValue={defaultValue}
          render={({
            field: { onChange, onBlur, value, ref },
            fieldState: { error },
          }) => (
            <>
              {type === "textarea" ? (
                <textarea
                  {...(props as React.TextareaHTMLAttributes<HTMLTextAreaElement>)}
                  className={`form-control formatic-form-control ${sizeClass} ${
                    error ? "is-invalid" : ""
                  }`}
                  id={name}
                  ref={ref}
                  value={value ?? ""}
                  onChange={onChange}
                  onBlur={onBlur}
                  aria-invalid={error ? "true" : "false"}
                  aria-describedby={error ? `${name}-error` : undefined}
                  rows={rows}
                ></textarea>
              ) : (
                <input
                  {...props}
                  type={inputType}
                  className={`form-control formatic-form-control ${sizeClass} ${
                    error ? "is-invalid" : ""
                  }`}
                  id={name}
                  ref={ref}
                  value={value ?? ""}
                  onChange={onChange}
                  onBlur={onBlur}
                  aria-invalid={error ? "true" : "false"}
                  aria-describedby={error ? `${name}-error` : undefined}
                />
              )}
              {type === "password" && showPasswordToggle && (
                // Update the button styles in your component
                <button
                  type="button"
                  className="btn btn-link position-absolute end-0 top-50 translate-middle-y text-secondary"
                  onClick={() => setShowPassword(!showPassword)}
                  tabIndex={-1}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? (
                    <i className="fa-regular fa-eye"></i>
                  ) : (
                    <i className="fa-regular fa-eye-slash"></i>
                  )}
                </button>
              )}
              {error && (
                <div id={`${name}-error`} className="invalid-feedback">
                  {error.message}
                </div>
              )}
              {helperText && <small className="text-muted">{helperText}</small>}
            </>
          )}
        />
      </div>
    </div>
  );
};
