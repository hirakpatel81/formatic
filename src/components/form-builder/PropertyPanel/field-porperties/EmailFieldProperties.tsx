import React from "react";
import { FormField } from "../../../../models/form/FormField";
import { EmailFieldProperties as IEmailFieldProperties } from "../../../../models/form/FieldProperties";
import Accordion from "../../../common/Accordion";
import Switch from "../../../common/Switch/Switch";
import {
  ValidationTypes,
  createValidationRule,
} from "../../../../models/form/ValidationRule";

interface EmailFieldPropertiesProps {
  field: FormField;
  onUpdate: (field: FormField) => void;
}

const EmailFieldProperties: React.FC<EmailFieldPropertiesProps> = ({
  field,
  onUpdate,
}) => {
  const handleConfirmEmailChange = (checked: boolean) => {
    let updatedValidations = [...field.validations];

    if (checked) {
      // Add match validation if it doesn't exist
      if (!updatedValidations.some((v) => v.type === ValidationTypes.MATCH)) {
        updatedValidations.push(
          createValidationRule(
            ValidationTypes.MATCH,
            "Email addresses don't match"
          )
        );
      }
    } else {
      // Remove match validation
      updatedValidations = updatedValidations.filter(
        (v) => v.type !== ValidationTypes.MATCH
      );
    }

    onUpdate({
      ...field,
      properties: {
        ...field.properties,
        confirmEmail: checked,
      },
      validations: updatedValidations,
    });
  };

  const handleDomainChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const domainsText = e.target.value;
    const domains = domainsText
      .split("\n")
      .map((d) => d.trim())
      .filter((d) => d.length > 0);

    // Find or create EMAIL_DOMAIN validation
    let updatedValidations = [...field.validations];
    const domainValidationIndex = updatedValidations.findIndex(
      (v) => v.type === ValidationTypes.EMAIL_DOMAIN
    );

    if (domains.length > 0) {
      const domainValidation = createValidationRule(
        ValidationTypes.EMAIL_DOMAIN,
        "Email must be from an allowed domain",
        { allowedDomains: domains }
      );

      if (domainValidationIndex >= 0) {
        updatedValidations[domainValidationIndex] = domainValidation;
      } else {
        updatedValidations.push(domainValidation);
      }
    } else {
      // Remove domain validation if no domains specified
      if (domainValidationIndex >= 0) {
        updatedValidations.splice(domainValidationIndex, 1);
      }
    }

    onUpdate({
      ...field,
      validations: updatedValidations,
    });
  };

  // Get current domains from validations
  const getCurrentDomains = () => {
    const domainValidation = field.validations.find(
      (v) => v.type === ValidationTypes.EMAIL_DOMAIN
    );
    return domainValidation?.params?.allowedDomains?.join("\n") || "";
  };

  const properties = field.properties as IEmailFieldProperties;

  return (
    <>
      <Accordion title="Email Options" defaultExpanded={true}>
        <div className="mb-3">
          <Switch
            label="Confirm Email"
            checked={properties.confirmEmail || false}
            onChange={handleConfirmEmailChange}
          />
          <small className="form-text text-muted d-block mt-1">
            Add a confirmation field to prevent typos
          </small>
        </div>

        <div>
          <label className="form-label">Allowed Domains</label>
          <textarea
            className="form-control formatic-form-control"
            value={getCurrentDomains()}
            onChange={handleDomainChange}
            placeholder="Enter domains (one per line)&#10;example.com&#10;company.org"
            rows={4}
          />
          <small className="form-text text-muted">
            Leave empty to allow all domains
          </small>
        </div>
      </Accordion>
    </>
  );
};

export default EmailFieldProperties;
