import React from "react";
import { useFormContext, Controller } from "react-hook-form";

interface FormCheckboxProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  name: string;
  label: React.ReactNode;
}

export const FormCheckbox: React.FC<FormCheckboxProps> = ({
  name,
  label,
  ...props
}) => {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({
        field: { onChange, onBlur, value, ref },
        fieldState: { error },
      }) => (
        <div className="form-check">
          <input
            {...props}
            type="checkbox"
            className={`form-check-input ${error ? "is-invalid" : ""}`}
            id={name}
            checked={value || false}
            onChange={onChange}
            onBlur={onBlur}
            ref={ref}
            aria-invalid={error ? "true" : "false"}
            aria-describedby={error ? `${name}-feedback` : undefined}
          />
          <label className="form-check-label" htmlFor={name}>
            {label}
          </label>
          {error && (
            <div id={`${name}-feedback`} className="invalid-feedback">
              {error.message}
            </div>
          )}
        </div>
      )}
    />
  );
};
