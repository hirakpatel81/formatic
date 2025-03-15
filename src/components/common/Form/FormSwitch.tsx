import React from "react";
import { useFormContext, Controller } from "react-hook-form";
import Switch from "../Switch/Switch";

interface FormSwitchProps {
  name: string;
  label: string;
  helperText?: string;
  disabled?: boolean;
  onChange?: (checked: boolean) => void;
}

export const FormSwitch: React.FC<FormSwitchProps> = ({
  name,
  label,
  helperText,
  disabled = false,
  onChange,
}) => {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({
        field: { onChange: fieldOnChange, value, ref },
        fieldState: { error },
      }) => (
        <div className="mb-3">
          <Switch
            checked={value || false}
            onChange={(checked) => {
              fieldOnChange(checked);
              onChange?.(checked);
            }}
            label={label}
            disabled={disabled}
            id={`switch-${name}`}
          />

          {helperText && (
            <small className="form-text text-muted  d-block mt-1">
              {helperText}
            </small>
          )}

          {error && (
            <div className="invalid-feedback d-block ms-4">{error.message}</div>
          )}
        </div>
      )}
    />
  );
};
