import React from "react";
import "./Checkbox.css";

interface CheckboxProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label: string;
  name?: string;
  disabled?: boolean;
  id?: string;
}

const Checkbox: React.FC<CheckboxProps> = ({
  checked,
  onChange,
  label,
  name,
  disabled = false,
  id,
}) => {
  const checkboxId =
    id || `checkbox-${Math.random().toString(36).substr(2, 9)}`;

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.checked);
  };

  return (
    <div className="custom-checkbox-wrapper d-flex align-items-center">
      <div className="custom-checkbox">
        <input
          type="checkbox"
          id={checkboxId}
          name={name}
          checked={checked}
          onChange={handleChange}
          disabled={disabled}
          className="custom-checkbox-input"
        />
        <label
          htmlFor={checkboxId}
          className="custom-checkbox-label"
          style={{ cursor: disabled ? "not-allowed" : "pointer" }}
        >
          <span className="custom-checkbox-button">
            <i className="fas fa-check"></i>
          </span>
          <span className="custom-checkbox-text">{label}</span>
        </label>
      </div>
    </div>
  );
};

export default Checkbox;
