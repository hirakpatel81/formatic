import React, { useState } from "react";
import { BaseFieldProps } from "../types";
import { getInputClasse } from "../../utils/fieldStyles";
import { EmailFieldProperties } from "../../../../../models/form/FieldProperties";
import BootstrapWrapper from "../../wrappers/BoostrapWrapper";
import FieldFeedback from "../../components/FieldFeedback";

const EmailField: React.FC<BaseFieldProps> = ({
  field,
  properties,
  mode,
  layout,
  onChange,
  error,
}) => {
  const [email, setEmail] = useState("");
  const [confirmEmail, setConfirmEmail] = useState("");
  const emailProperties = properties as EmailFieldProperties;

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setEmail(newValue);
    onChange?.({
      email: newValue,
      confirmEmail: confirmEmail,
    });
  };

  const handleConfirmEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setConfirmEmail(newValue);
    onChange?.({
      email: email,
      confirmEmail: newValue,
    });
  };

  // Create the main email input field
  const emailInput = (
    <>
      <input
        id={field.fieldId}
        type="email"
        className={getInputClasse(emailProperties, error, layout)}
        value={email}
        onChange={handleEmailChange}
        placeholder={emailProperties.placeholder || "Enter email address"}
        disabled={emailProperties.disabled}
        readOnly={emailProperties.readOnly}
        autoComplete={emailProperties.autocomplete ? "email" : "off"}
        spellCheck={false}
      />

      <FieldFeedback
        primaryHelperText={emailProperties.helperText}
        error={error}
        mode={mode}
      />
    </>
  );

  // Create the confirmation email field if enabled
  const confirmationInput = emailProperties.confirmEmail && (
    <div className={layout === "horizontal" ? "col-sm-10" : ""}>
      <>
        <input
          id={`${field.fieldId}-confirm`}
          type="email"
          className={getInputClasse(emailProperties, error, layout)}
          value={confirmEmail}
          onChange={handleConfirmEmailChange}
          placeholder="Confirm email address"
          disabled={emailProperties.disabled}
          readOnly={emailProperties.readOnly}
          autoComplete="off"
          spellCheck={false}
        />
        {confirmEmail && mode === "preview" && (
          <div className="position-absolute top-50 end-0 translate-middle-y pe-2">
            <i
              className={`fas fa-${
                email === confirmEmail
                  ? "check text-success"
                  : "times text-danger"
              }`}
            ></i>
          </div>
        )}
      </>
    </div>
  );

  return (
    <div className={layout === "horizontal" ? "row" : ""}>
      <BootstrapWrapper field={field} mode={mode!} layout={layout}>
        {emailInput}
      </BootstrapWrapper>

      {emailProperties.confirmEmail && (
        <div className={`mb-3 ${layout === "horizontal" ? "row" : "mt-3"}`}>
          <label
            className={`${
              layout === "horizontal" ? "col-sm-2 col-form-label" : "form-label"
            }`}
          >
            Confirm Email
            {field.required && <span className="text-danger ms-1">*</span>}
          </label>
          {confirmationInput}
        </div>
      )}
    </div>
  );
};

export default EmailField;
