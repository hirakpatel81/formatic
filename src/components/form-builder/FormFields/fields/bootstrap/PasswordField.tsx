import React, { useState } from "react";
import { PasswordFieldProperties } from "../../../../../models/form/FieldProperties";
import { BaseFieldProps } from "../types";
import { getInputClasse } from "../../utils/fieldStyles";
import BootstrapWrapper from "../../wrappers/BoostrapWrapper";
import FieldFeedback from "../../components/FieldFeedback";
import {
  ValidationTypes,
  ValidationRuleType,
  ValidationParams,
} from "../../../../../models/form/ValidationRule";

const PasswordField: React.FC<BaseFieldProps> = ({
  field,
  properties,
  mode,
  layout,
  onChange,
  error,
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const passwordProperties = properties as PasswordFieldProperties;

  const hasValidation = (type: ValidationRuleType) => {
    return field.validations.some((v) => v.type === type);
  };

  const getValidationParam = (
    type: ValidationRuleType,
    param: keyof ValidationParams
  ): any => {
    const validation = field.validations.find((v) => v.type === type);
    return validation?.params?.[param];
  };

  const calculateStrength = (password: string): number => {
    if (!password) return 0;
    let strength = 0;
    let totalValidations = 0;
    let passedValidations = 0;

    // Count active password validations
    if (hasValidation(ValidationTypes.MIN_LENGTH)) {
      totalValidations++;
      if (
        password.length >=
        (getValidationParam(ValidationTypes.MIN_LENGTH, "min") || 8)
      ) {
        passedValidations++;
      }
    }
    if (hasValidation(ValidationTypes.PASSWORD_UPPERCASE)) {
      totalValidations++;
      if (/[A-Z]/.test(password)) passedValidations++;
    }
    if (hasValidation(ValidationTypes.PASSWORD_LOWERCASE)) {
      totalValidations++;
      if (/[a-z]/.test(password)) passedValidations++;
    }
    if (hasValidation(ValidationTypes.PASSWORD_NUMBER)) {
      totalValidations++;
      if (/[0-9]/.test(password)) passedValidations++;
    }
    if (hasValidation(ValidationTypes.PASSWORD_SPECIAL)) {
      totalValidations++;
      if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) passedValidations++;
    }

    // If no validations are set, return 0
    if (totalValidations === 0) return 0;

    // Calculate strength percentage
    strength = (passedValidations / totalValidations) * 100;
    return strength;
  };

  const getStrengthProperties = (strength: number) => {
    if (strength === 100)
      return { label: "Strong", color: "success", width: "100%" };
    if (strength >= 75)
      return { label: "Medium", color: "warning", width: "75%" };
    if (strength >= 40) return { label: "Weak", color: "danger", width: "50%" };
    return { label: "Very Weak", color: "danger", width: "25%" };
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setPassword(newValue);
    onChange?.({ password: newValue, confirmPassword });
  };

  const handleConfirmPasswordChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const newValue = e.target.value;
    setConfirmPassword(newValue);
    onChange?.({ password, confirmPassword: newValue });
  };

  const strength = calculateStrength(password);
  const strengthProps = getStrengthProperties(strength);

  const passwordInput = (
    <>
      <div className="position-relative">
        <input
          id={field.fieldId}
          type={showPassword ? "text" : "password"}
          className={getInputClasse(passwordProperties, error, layout)}
          value={password}
          onChange={handlePasswordChange}
          placeholder={
            passwordProperties.confirmPassword
              ? "Create password"
              : "Enter password"
          }
          disabled={passwordProperties.disabled}
        />
        {passwordProperties.togglePasswordVisibility && (
          <button
            type="button"
            className="btn btn-link position-absolute top-50 end-0 translate-middle-y text-secondary"
            onClick={() => setShowPassword(!showPassword)}
            style={{ padding: "0.375rem 0.75rem" }}
          >
            <i
              className={`fas ${showPassword ? "fa-eye-slash" : "fa-eye"}`}
            ></i>
          </button>
        )}
      </div>

      {mode === "preview" && passwordProperties.confirmPassword && (
        <>
          {password && (
            <div className="mt-2">
              <div className="d-flex justify-content-between align-items-center mb-1">
                <small className="text-muted">Password Strength</small>
                <small className={`text-${strengthProps.color}`}>
                  {strengthProps.label}
                </small>
              </div>
              <div className="progress" style={{ height: "4px" }}>
                <div
                  className={`progress-bar bg-${strengthProps.color}`}
                  style={{
                    width: strengthProps.width,
                    transition: "all 0.3s ease",
                  }}
                />
              </div>
            </div>
          )}

          {!error && password && (
            <div className="mt-2">
              <ul className="list-unstyled mb-0">
                {hasValidation(ValidationTypes.MIN_LENGTH) && (
                  <li className="d-flex align-items-center gap-2">
                    <i
                      className={`fas fa-${
                        password.length >=
                        (getValidationParam(
                          ValidationTypes.MIN_LENGTH,
                          "min"
                        ) || 8)
                          ? "check text-success"
                          : "times text-danger"
                      }`}
                    ></i>
                    <small>
                      At least{" "}
                      {getValidationParam(ValidationTypes.MIN_LENGTH, "min") ||
                        8}{" "}
                      characters
                    </small>
                  </li>
                )}
                {hasValidation(ValidationTypes.PASSWORD_UPPERCASE) && (
                  <li className="d-flex align-items-center gap-2">
                    <i
                      className={`fas fa-${
                        /[A-Z]/.test(password)
                          ? "check text-success"
                          : "times text-danger"
                      }`}
                    ></i>
                    <small>One uppercase letter</small>
                  </li>
                )}
                {hasValidation(ValidationTypes.PASSWORD_LOWERCASE) && (
                  <li className="d-flex align-items-center gap-2">
                    <i
                      className={`fas fa-${
                        /[a-z]/.test(password)
                          ? "check text-success"
                          : "times text-danger"
                      }`}
                    ></i>
                    <small>One lowercase letter</small>
                  </li>
                )}
                {hasValidation(ValidationTypes.PASSWORD_NUMBER) && (
                  <li className="d-flex align-items-center gap-2">
                    <i
                      className={`fas fa-${
                        /\d/.test(password)
                          ? "check text-success"
                          : "times text-danger"
                      }`}
                    ></i>
                    <small>One number</small>
                  </li>
                )}
                {hasValidation(ValidationTypes.PASSWORD_SPECIAL) && (
                  <li className="d-flex align-items-center gap-2">
                    <i
                      className={`fas fa-${
                        /[!@#$%^&*(),.?":{}|<>]/.test(password)
                          ? "check text-success"
                          : "times text-danger"
                      }`}
                    ></i>
                    <small>One special character</small>
                  </li>
                )}
              </ul>
            </div>
          )}
        </>
      )}

      <FieldFeedback
        primaryHelperText={passwordProperties.helperText}
        error={error}
        mode={mode}
      />
    </>
  );

  return (
    <>
      <BootstrapWrapper field={field} mode={mode!} layout={layout}>
        {passwordInput}
      </BootstrapWrapper>

      {passwordProperties.confirmPassword && (
        <div className={`mb-3 ${layout === "horizontal" ? "row" : "mt-3"}`}>
          <label
            className={
              layout === "horizontal" ? "col-sm-2 col-form-label" : "form-label"
            }
          >
            Confirm Password
            {field.required && <span className="text-danger ms-1">*</span>}
          </label>
          <div className={layout === "horizontal" ? "col-sm-10" : ""}>
            <div className="position-relative">
              <input
                id={`${field.fieldId}-confirm`}
                type={showConfirmPassword ? "text" : "password"}
                className={getInputClasse(passwordProperties, error, layout)}
                value={confirmPassword}
                onChange={handleConfirmPasswordChange}
                placeholder="Confirm password"
                disabled={passwordProperties.disabled}
              />
              {passwordProperties.togglePasswordVisibility && (
                <button
                  type="button"
                  className="btn btn-link position-absolute top-50 end-0 translate-middle-y text-secondary"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  style={{ padding: "0.375rem 0.75rem" }}
                >
                  <i
                    className={`fas ${
                      showConfirmPassword ? "fa-eye-slash" : "fa-eye"
                    }`}
                  ></i>
                </button>
              )}
            </div>
            <FieldFeedback error={error} mode={mode} />
          </div>
        </div>
      )}
    </>
  );
};

export default PasswordField;
