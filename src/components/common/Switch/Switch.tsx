import React from "react";
import "./Switch.css";

interface SwitchProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label?: string;
  name?: string;
  disabled?: boolean;
  id?: string;
  helperText?: string;
}

const Switch: React.FC<SwitchProps> = ({
  checked,
  onChange,
  label,
  name,
  disabled = false,
  id,
  helperText,
}) => {
  const switchId = id || `switch-${Math.random().toString(36).substr(2, 9)}`;

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.checked);
  };

  return (
    <>
      {" "}
      <div className="custom-switch-wrapper d-flex justify-content-between align-items-center">
        {label && (
          <label
            htmlFor={switchId}
            className="form-label mb-0 me-2"
            style={{ cursor: disabled ? "not-allowed" : "pointer" }}
          >
            {label}
          </label>
        )}
        <div className="custom-switch">
          <input
            type="checkbox"
            id={switchId}
            name={name}
            checked={checked}
            onChange={handleChange}
            disabled={disabled}
            className="custom-switch-input"
          />
          <label
            htmlFor={switchId}
            className="custom-switch-label"
            style={{ cursor: disabled ? "not-allowed" : "pointer" }}
          >
            <span className="custom-switch-button"></span>
          </label>
        </div>
      </div>
      {helperText && (
        <small className="form-text text-muted  d-block mt-1">
          {helperText}
        </small>
      )}
    </>
  );
};

export default Switch;
